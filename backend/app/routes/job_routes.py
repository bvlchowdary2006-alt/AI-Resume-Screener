from fastapi import APIRouter, HTTPException
from typing import List
from app.models.schemas import JobDescription, ScoringResult, RankingResponse
from app.services.matching import candidate_scorer
from app.utils.supabase_client import supabase_client
from loguru import logger
import uuid
import datetime

router = APIRouter()

@router.post("/match_job")
async def match_job(job: JobDescription):
    job_id = str(uuid.uuid4())
    
    # 1. Store job description
    try:
        job_data = {
            "id": job_id,
            "title": job.title,
            "description": job.description,
            "required_skills": job.required_skills,
            "min_experience_years": job.min_experience_years,
            "created_at": datetime.datetime.now().isoformat()
        }
        supabase_client.table("jobs").insert(job_data).execute()
    except Exception as e:
        logger.error(f"Error saving job: {str(e)}")
        raise HTTPException(status_code=500, detail="Database error saving job")
        
    # 2. Fetch all candidates
    try:
        candidates_response = supabase_client.table("candidates").select("*").execute()
        candidates = candidates_response.data
    except Exception as e:
        logger.error(f"Error fetching candidates: {str(e)}")
        raise HTTPException(status_code=500, detail="Database error fetching candidates")
        
    # 3. Rank candidates
    rankings = []
    for candidate in candidates:
        parsed_data = candidate.get("parsed_data")
        resume_text = candidate.get("resume_text")
        
        scoring_result = candidate_scorer.score_candidate(
            candidate_id=candidate.get("id"),
            candidate_name=candidate.get("name", "Unknown"),
            candidate_data=parsed_data,
            job=job,
            resume_text=resume_text
        )
        rankings.append(scoring_result)
        
        # Store individual scores in the 'scores' table
        try:
            score_data = {
                "id": str(uuid.uuid4()),
                "job_id": job_id,
                "candidate_id": candidate.get("id"),
                "overall_score": scoring_result.overall_score,
                "skill_score": scoring_result.skill_match_score,
                "experience_score": scoring_result.experience_score,
                "semantic_score": scoring_result.semantic_similarity_score,
                "created_at": datetime.datetime.now().isoformat()
            }
            supabase_client.table("scores").insert(score_data).execute()
        except Exception as e:
            logger.error(f"Error saving score: {str(e)}")

    # 4. Sort rankings by overall score
    rankings.sort(key=lambda x: x.overall_score, reverse=True)
    
    return RankingResponse(job_id=job_id, rankings=rankings)

@router.get("/jobs")
async def get_jobs():
    try:
        response = supabase_client.table("jobs").select("*").execute()
        return response.data
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
