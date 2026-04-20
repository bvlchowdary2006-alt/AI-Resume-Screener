from pydantic import BaseModel, EmailStr
from typing import List, Optional, Dict, Any
from datetime import datetime

class ResumeBase(BaseModel):
    filename: str
    content_type: str

class ParsedData(BaseModel):
    name: Optional[str] = None
    email: Optional[str] = None
    phone: Optional[str] = None
    skills: List[str] = []
    education: List[Dict[str, Any]] = []
    experience: List[Dict[str, Any]] = []
    total_experience_years: float = 0.0

class ResumeResponse(BaseModel):
    id: str
    filename: str
    parsed_data: ParsedData
    created_at: datetime

class JobDescription(BaseModel):
    title: str
    description: str
    required_skills: List[str]
    min_experience_years: float

class ScoringResult(BaseModel):
    candidate_id: str
    candidate_name: str
    overall_score: float
    skill_match_score: float
    experience_score: float
    semantic_similarity_score: float
    explanation: str

class RankingResponse(BaseModel):
    job_id: str
    rankings: List[ScoringResult]

class BiasReport(BaseModel):
    gender_bias_detected: bool
    university_bias_detected: bool
    name_bias_detected: bool
    fairness_score: float
    recommendations: List[str]

class AnalyticsResponse(BaseModel):
    total_resumes: int
    avg_score: float
    skill_distribution: Dict[str, int]
    bias_insights: Dict[str, Any]
