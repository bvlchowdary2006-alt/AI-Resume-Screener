import os
import csv
from fastapi import APIRouter, HTTPException
from app.models.schemas import AnalyticsSummary, BiasReport
from app.services.bias_detection import BiasDetector
from app.utils.config import settings

router = APIRouter()

def load_candidates():
    """Load candidates from CSV."""
    csv_path = os.path.join(settings.DATASETS_DIR, "candidates.csv")
    candidates = []
    if os.path.exists(csv_path):
        with open(csv_path, "r", encoding="utf-8") as f:
            reader = csv.DictReader(f)
            for row in reader:
                candidates.append({
                    "id": int(row["id"]),
                    "name": row["name"],
                    "skills": [s.strip() for s in row["skills"].split(",")],
                    "experience": int(row["experience"]),
                    "resume_text": row.get("resume_text", ""),
                })
    return candidates

@router.get("/analytics/summary", response_model=AnalyticsSummary)
async def get_analytics_summary():
    """Get overall analytics summary."""
    candidates = load_candidates()
    total = len(candidates)

    if total == 0:
        return AnalyticsSummary(
            total_resumes=0,
            avg_score=0,
            fairness_index=0,
            active_jobs=0,
            model_confidence=0,
            skill_distribution={},
            bias_insights={},
        )

    # Calculate skill distribution
    skill_counts = {}
    for c in candidates:
        for skill in c["skills"]:
            skill_counts[skill] = skill_counts.get(skill, 0) + 1

    # Sort by count and take top 15
    top_skills = dict(sorted(skill_counts.items(), key=lambda x: x[1], reverse=True)[:15])

    # Calculate average experience-based score (proxy)
    avg_exp = sum(c["experience"] for c in candidates) / total
    avg_score = min(100, max(0, avg_exp * 5 + 40))

    # Bias detection on a sample
    detector = BiasDetector()
    gender_flags = 0
    uni_flags = 0
    sample_size = min(50, total)

    for c in candidates[:sample_size]:
        report = detector.get_bias_report(c.get("resume_text", ""))
        if report.get("gender_bias"):
            gender_flags += 1
        if report.get("university_bias"):
            uni_flags += 1

    fairness_score = 100 - ((gender_flags + uni_flags) / sample_size * 100) if sample_size > 0 else 100

    # Load jobs count
    jobs_count = 0
    jobs_path = os.path.join(settings.DATASETS_DIR, "jobs.csv")
    if os.path.exists(jobs_path):
        with open(jobs_path, "r") as f:
            jobs_count = sum(1 for _ in f) - 1  # minus header

    return AnalyticsSummary(
        total_resumes=total,
        avg_score=round(avg_score, 1),
        fairness_index=round(fairness_score, 1),
        active_jobs=jobs_count,
        model_confidence=87.5,
        skill_distribution=top_skills,
        bias_insights={
            "gender_bias_count": gender_flags,
            "university_bias_count": uni_flags,
            "avg_fairness_score": round(fairness_score, 1),
        },
    )

@router.get("/analytics/bias/{resume_id}", response_model=BiasReport)
async def get_bias_report(resume_id: int):
    """Get bias report for a specific candidate."""
    candidates = load_candidates()
    candidate = None
    for c in candidates:
        if c["id"] == resume_id:
            candidate = c
            break

    if not candidate:
        raise HTTPException(status_code=404, detail="Candidate not found")

    detector = BiasDetector()
    report = detector.get_bias_report(candidate.get("resume_text", ""))

    return BiasReport(
        resume_id=resume_id,
        gender_bias=report.get("gender_bias", False),
        gender_confidence=report.get("gender_confidence", 0.0),
        university_bias=report.get("university_bias", False),
        university_name=report.get("university_name"),
        fairness_score=report.get("fairness_score", 100.0),
        flagged_terms=report.get("flagged_terms", []),
    )
