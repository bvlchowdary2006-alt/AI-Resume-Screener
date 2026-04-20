from typing import List, Dict, Any
import re
from app.models.schemas import BiasReport

class BiasDetector:
    def __init__(self):
        # List of common gendered words
        self.gendered_words = {
            "masculine": ["competitive", "aggressive", "dominant", "leader", "expert", "senior"],
            "feminine": ["collaborative", "cooperative", "supportive", "nurturing", "junior", "assistant"]
        }
        
        # List of elite universities (for university bias detection)
        self.elite_universities = ["Harvard", "Stanford", "MIT", "Oxford", "Cambridge", "Yale", "Princeton"]

    def detect_gender_bias(self, text: str) -> bool:
        text_lower = text.lower()
        masculine_count = sum(1 for word in self.gendered_words["masculine"] if word in text_lower)
        feminine_count = sum(1 for word in self.gendered_words["feminine"] if word in text_lower)
        
        # Simple heuristic: if masculine words significantly outweigh feminine words
        return masculine_count > 3 and feminine_count < 1

    def detect_university_bias(self, text: str) -> bool:
        # Check for presence of elite universities
        return any(univ in text for univ in self.elite_universities)

    def detect_name_bias(self, name: str) -> bool:
        # Placeholder for more complex name-based bias detection (ethnicity, origin, etc.)
        # For now, let's just mark it as false unless specific conditions are met
        return False

    def get_bias_report(self, text: str, name: str) -> BiasReport:
        gender_bias = self.detect_gender_bias(text)
        univ_bias = self.detect_university_bias(text)
        name_bias = self.detect_name_bias(name)
        
        # Calculate fairness score (0-100)
        fairness_score = 100
        recommendations = []
        
        if gender_bias:
            fairness_score -= 20
            recommendations.append("The resume contains a high density of masculine-coded language.")
        if univ_bias:
            fairness_score -= 15
            recommendations.append("The resume mentions elite universities which can lead to unconscious bias.")
        if name_bias:
            fairness_score -= 10
            recommendations.append("The candidate name may trigger unconscious name-based bias.")
            
        if fairness_score == 100:
            recommendations.append("No significant bias indicators detected.")

        return BiasReport(
            gender_bias_detected=gender_bias,
            university_bias_detected=univ_bias,
            name_bias_detected=name_bias,
            fairness_score=float(fairness_score),
            recommendations=recommendations
        )

bias_detector = BiasDetector()
