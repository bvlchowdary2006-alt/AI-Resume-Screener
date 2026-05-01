from pydantic import BaseModel, Field
from typing import Optional, List, Dict, Any
from datetime import datetime

class ResumeBase(BaseModel):
    name: str
    email: str
    phone: Optional[str] = None
    skills: Optional[List[str]] = []
    experience: Optional[int] = 0
    education: Optional[str] = None
    role: Optional[str] = None

class ParsedData(BaseModel):
    name: Optional[str] = None
    email: Optional[str] = None
    phone: Optional[str] = None
    skills: List[str] = []
    experience: Optional[int] = 0
    education: Optional[str] = None
    experience_text: Optional[str] = None
    summary: Optional[str] = None

class ResumeResponse(BaseModel):
    id: int
    name: str
    email: str
    skills: List[str]
    experience: int
    education: Optional[str]
    role: Optional[str]
    score: Optional[float] = None
    created_at: Optional[str] = None

class JobDescription(BaseModel):
    title: str
    description: str
    required_skills: List[str]
    min_experience: int = 0

class ScoringResult(BaseModel):
    candidate_id: int
    candidate_name: str
    overall_score: float
    skill_score: float
    experience_score: float
    semantic_score: float

class RankingResponse(BaseModel):
    job_title: str
    total_candidates: int
    rankings: List[ScoringResult]

class BiasReport(BaseModel):
    resume_id: int
    gender_bias: bool
    gender_confidence: float
    university_bias: bool
    university_name: Optional[str] = None
    fairness_score: float
    flagged_terms: List[str] = []

class AnalyticsSummary(BaseModel):
    total_resumes: int
    avg_score: float
    fairness_index: float
    active_jobs: int
    model_confidence: float
    skill_distribution: Dict[str, int]
    bias_insights: Dict[str, Any]
