from typing import List, Dict, Any
from app.models.schemas import ScoringResult, JobDescription, ParsedData
from app.pipelines.nlp_pipeline import nlp_pipeline
from app.utils.config import settings

class CandidateScorer:
    @staticmethod
    def calculate_skill_match(candidate_skills: List[str], required_skills: List[str]) -> float:
        if not required_skills:
            return 1.0
        
        matches = [skill for skill in required_skills if skill.lower() in [s.lower() for s in candidate_skills]]
        return len(matches) / len(required_skills)

    @staticmethod
    def calculate_experience_score(candidate_years: float, required_years: float) -> float:
        if required_years == 0:
            return 1.0
        
        # Penalize slightly if below required, reward if above (up to a point)
        score = candidate_years / required_years
        return min(1.2, score)  # Max score 1.2 if significantly over-experienced

    @staticmethod
    def calculate_overall_score(
        skill_score: float, 
        experience_score: float, 
        semantic_score: float
    ) -> float:
        return (
            skill_score * settings.SKILL_WEIGHT +
            experience_score * settings.EXPERIENCE_WEIGHT +
            semantic_score * settings.SEMANTIC_WEIGHT
        )

    @classmethod
    def score_candidate(
        cls, 
        candidate_id: str, 
        candidate_name: str,
        candidate_data: ParsedData, 
        job: JobDescription,
        resume_text: str
    ) -> ScoringResult:
        skill_score = cls.calculate_skill_match(candidate_data.skills, job.required_skills)
        experience_score = cls.calculate_experience_score(candidate_data.total_experience_years, job.min_experience_years)
        
        # Compute semantic similarity using embeddings
        semantic_score = nlp_pipeline.compute_similarity(resume_text, job.description)
        
        overall_score = cls.calculate_overall_score(skill_score, experience_score, semantic_score)
        
        # Generate explanation
        explanation = f"Matches {skill_score*100:.0f}% of required skills. "
        explanation += f"Has {candidate_data.total_experience_years} years of experience vs {job.min_experience_years} required. "
        explanation += f"Semantic similarity: {semantic_score*100:.1f}%."

        return ScoringResult(
            candidate_id=candidate_id,
            candidate_name=candidate_name,
            overall_score=round(overall_score * 100, 2),
            skill_match_score=round(skill_score * 100, 2),
            experience_score=round(experience_score * 100, 2),
            semantic_similarity_score=round(semantic_score * 100, 2),
            explanation=explanation
        )

candidate_scorer = CandidateScorer()
