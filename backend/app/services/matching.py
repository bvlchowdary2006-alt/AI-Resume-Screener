from app.utils.config import settings
import os
import joblib
import numpy as np

class CandidateScorer:
    """Scores candidates based on skill match, experience, and semantic similarity."""

    def __init__(self):
        self.skill_weight = settings.SKILL_WEIGHT
        self.exp_weight = settings.EXPERIENCE_WEIGHT
        self.semantic_weight = settings.SEMANTIC_WEIGHT

        # Try to load ranking model if available
        self.ranking_model = None
        if os.path.exists(settings.RANKING_MODEL_PATH):
            try:
                self.ranking_model = joblib.load(settings.RANKING_MODEL_PATH)
            except Exception:
                pass

    def calculate_skill_match(self, candidate_skills, required_skills):
        """Calculate skill match percentage."""
        if not required_skills:
            return 0.0

        candidate_set = {s.lower().strip() for s in candidate_skills}
        required_set = {s.lower().strip() for s in required_skills}

        matches = candidate_set & required_set
        return (len(matches) / len(required_set)) * 100

    def calculate_experience_score(self, candidate_exp, min_exp):
        """Calculate experience match score."""
        if min_exp == 0:
            return 100.0
        if candidate_exp >= min_exp:
            # Bonus for having more experience, capped at 100
            return min(100.0, 70 + (candidate_exp - min_exp) * 5)
        else:
            # Penalty for less experience
            return max(0.0, (candidate_exp / min_exp) * 70)

    def calculate_semantic_score(self, candidate_text, required_skills):
        """Simple keyword-based semantic score."""
        if not candidate_text:
            return 50.0

        text_lower = candidate_text.lower()
        matches = sum(1 for skill in required_skills if skill.lower() in text_lower)
        base = (matches / len(required_skills)) * 80 if required_skills else 50
        return min(100.0, base + 20)

    def score_candidate(self, candidate_skills, candidate_experience, candidate_text, required_skills, min_experience):
        """Score a candidate and return detailed results."""
        skill_score = self.calculate_skill_match(candidate_skills, required_skills)
        exp_score = self.calculate_experience_score(candidate_experience, min_experience)
        semantic_score = self.calculate_semantic_score(candidate_text, required_skills)

        # Weighted overall score
        overall = (
            skill_score * self.skill_weight +
            exp_score * self.exp_weight +
            semantic_score * self.semantic_weight
        )

        # If ranking model is available, use it for final prediction
        if self.ranking_model is not None:
            try:
                features = np.array([[skill_score, exp_score, semantic_score]])
                prediction = self.ranking_model.predict(features)[0]
                # Scale prediction to 0-100
                overall = min(100, max(0, prediction * 100))
            except Exception:
                pass

        return {
            "overall": round(overall, 1),
            "skill": round(skill_score, 1),
            "experience": round(exp_score, 1),
            "semantic": round(semantic_score, 1),
        }
