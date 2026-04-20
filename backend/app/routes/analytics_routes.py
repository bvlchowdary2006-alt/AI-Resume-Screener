from fastapi import APIRouter, HTTPException
from typing import List, Dict, Any
from app.utils.supabase_client import supabase_client
from app.services.bias_detection import bias_detector
from loguru import logger
import collections

router = APIRouter()

@router.get("/analytics")
async def get_analytics():
    if not supabase_client:
        logger.error("Supabase client not initialized for analytics")
        raise HTTPException(status_code=500, detail="Database connection error")

    try:
        # 1. Fetch resumes count
        resumes_response = supabase_client.table("candidates").select("id, name, parsed_data, resume_text").execute()
        resumes = resumes_response.data or []
        total_resumes = len(resumes)
        
        # 2. Fetch scores and average
        try:
            scores_response = supabase_client.table("scores").select("overall_score").execute()
            scores = [s.get("overall_score") for s in (scores_response.data or [])]
            avg_score = sum(scores) / len(scores) if scores else 0.0
        except Exception as se:
            logger.warning(f"Could not fetch scores: {se}")
            avg_score = 0.0
        
        # 3. Aggregate skill distribution
        all_skills = []
        for resume in resumes:
            parsed_data = resume.get("parsed_data", {}) or {}
            all_skills.extend(parsed_data.get("skills", []))
        
        skill_counts = collections.Counter(all_skills)
        top_skills = dict(skill_counts.most_common(10))
        
        # 4. Aggregate bias insights
        bias_reports = []
        for resume in resumes[:10]: # Analyze up to 10 for performance
            try:
                report = bias_detector.get_bias_report(
                    resume.get("resume_text", ""),
                    resume.get("name", "Unknown")
                )
                bias_reports.append(report.dict())
            except Exception as be:
                logger.warning(f"Bias detection failed for resume {resume.get('id')}: {be}")
            
        return {
            "total_resumes": total_resumes,
            "avg_score": round(avg_score, 2),
            "skill_distribution": top_skills,
            "bias_insights": {
                "total_analyzed": len(bias_reports),
                "gender_bias_detected_count": sum(1 for r in bias_reports if r.get("gender_bias_detected")),
                "university_bias_detected_count": sum(1 for r in bias_reports if r.get("university_bias_detected")),
                "avg_fairness_score": round(sum(r.get("fairness_score", 100) for r in bias_reports) / len(bias_reports), 2) if bias_reports else 100.0
            }
        }
    except Exception as e:
        logger.error(f"Error generating analytics: {str(e)}")
        # Return a fallback empty analytics object instead of 500 if possible, 
        # or a descriptive error
        raise HTTPException(status_code=500, detail=f"Analytics generation failed: {str(e)}")

@router.get("/bias_report/{resume_id}")
async def get_bias_report(resume_id: str):
    if not supabase_client:
        raise HTTPException(status_code=500, detail="Database connection error")
        
    try:
        response = supabase_client.table("candidates").select("name, resume_text").eq("id", resume_id).single().execute()
        if not response.data:
            raise HTTPException(status_code=404, detail="Candidate not found")
            
        candidate = response.data
        report = bias_detector.get_bias_report(
            candidate.get("resume_text", ""),
            candidate.get("name", "Unknown")
        )
        return report
    except HTTPException as he:
        raise he
    except Exception as e:
        logger.error(f"Error fetching bias report for {resume_id}: {str(e)}")
        raise HTTPException(status_code=404, detail="Candidate not found or report failed")
