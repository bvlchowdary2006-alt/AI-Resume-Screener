import os
import csv
import random
from fastapi import APIRouter, HTTPException
from app.models.schemas import JobDescription, RankingResponse, ScoringResult
from app.services.matching import CandidateScorer
from app.utils.config import settings

router = APIRouter()

# In-memory store for job matches
active_matches = []

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
                    "email": row["email"],
                    "skills": [s.strip() for s in row["skills"].split(",")],
                    "experience": int(row["experience"]),
                    "education": row["education"],
                    "role": row.get("role", ""),
                })
    return candidates

@router.post("/jobs/match", response_model=RankingResponse)
async def match_job(job: JobDescription):
    """Match candidates against a job description."""
    candidates = load_candidates()

    if not candidates:
        raise HTTPException(status_code=404, detail="No candidates found. Upload some resumes first.")

    scorer = CandidateScorer()
    rankings = []

    for candidate in candidates:
        score_result = scorer.score_candidate(
            candidate_skills=candidate["skills"],
            candidate_experience=candidate["experience"],
            candidate_text=candidate.get("role", "") + " " + candidate.get("education", ""),
            required_skills=job.required_skills,
            min_experience=job.min_experience,
        )

        rankings.append(ScoringResult(
            candidate_id=candidate["id"],
            candidate_name=candidate["name"],
            overall_score=round(score_result["overall"], 1),
            skill_score=round(score_result["skill"], 1),
            experience_score=round(score_result["experience"], 1),
            semantic_score=round(score_result["semantic"], 1),
        ))

    # Sort by overall score descending
    rankings.sort(key=lambda x: x.overall_score, reverse=True)

    match_result = {
        "job_title": job.title,
        "total_candidates": len(rankings),
        "rankings": rankings[:20],  # Top 20
    }

    active_matches.append(match_result)
    return match_result

@router.get("/jobs", response_model=list)
async def get_jobs():
    """Get all job descriptions from CSV."""
    csv_path = os.path.join(settings.DATASETS_DIR, "jobs.csv")
    jobs = []
    if os.path.exists(csv_path):
        with open(csv_path, "r", encoding="utf-8") as f:
            reader = csv.DictReader(f)
            for row in reader:
                jobs.append({
                    "id": int(row["id"]),
                    "title": row["title"],
                    "required_skills": [s.strip() for s in row["required_skills"].split(",")],
                    "min_experience": int(row["min_experience"]),
                    "description": row["description"],
                })
    return jobs[:20]
