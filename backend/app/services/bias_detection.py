import re

class BiasDetector:
    """Detects potential bias in job descriptions and resume text."""

    MASCULINE_TERMS = {
        "aggressive", "dominant", "competitive", "assertive", "ninja",
        "rockstar", "guru", "alpha", "maverick", "warrior", "hacker",
        "crush", "kill", "destroy", "execute", "heavy lifting",
    }

    FEMININE_TERMS = {
        "collaborative", "supportive", "nurturing", "compassionate",
        "interpersonal", "understanding", "loyal", "honest",
    }

    ELITE_UNIVERSITIES = {
        "harvard", "mit", "stanford", "yale", "princeton",
        "cambridge", "oxford", "caltech", "columbia", "cornell",
        "dartmouth", "brown", "penn", "ivy league",
    }

    def detect_gender_bias(self, text):
        """Detect gendered language in text."""
        text_lower = text.lower()
        masculine_found = [t for t in self.MASCULINE_TERMS if t in text_lower]
        feminine_found = [t for t in self.FEMININE_TERMS if t in text_lower]

        total = len(masculine_found) + len(feminine_found)
        if total == 0:
            return False, 0.0, []

        is_biased = len(masculine_found) > len(feminine_found) or len(feminine_found) > 0
        confidence = min(1.0, total / 5)
        flagged = masculine_found + feminine_found

        return is_biased, confidence, flagged

    def detect_university_bias(self, text):
        """Detect elite university preference."""
        text_lower = text.lower()
        found_unis = [u for u in self.ELITE_UNIVERSITIES if u in text_lower]

        has_bias = len(found_unis) > 0
        uni_name = found_unis[0].title() if found_unis else None

        return has_bias, uni_name

    def calculate_fairness_score(self, gender_biased, uni_biased, flagged_terms):
        """Calculate overall fairness score."""
        score = 100.0
        if gender_biased:
            score -= 15
        if uni_biased:
            score -= 10
        # Additional penalty for many flagged terms
        score -= min(20, len(flagged_terms) * 3)
        return max(0.0, score)

    def get_bias_report(self, text):
        """Generate a full bias report for the given text."""
        if not text:
            return {
                "gender_bias": False,
                "gender_confidence": 0.0,
                "university_bias": False,
                "university_name": None,
                "fairness_score": 100.0,
                "flagged_terms": [],
            }

        gender_bias, gender_confidence, flagged_terms = self.detect_gender_bias(text)
        uni_bias, uni_name = self.detect_university_bias(text)
        fairness = self.calculate_fairness_score(gender_bias, uni_bias, flagged_terms)

        return {
            "gender_bias": gender_bias,
            "gender_confidence": round(gender_confidence, 2),
            "university_bias": uni_bias,
            "university_name": uni_name,
            "fairness_score": round(fairness, 1),
            "flagged_terms": flagged_terms,
        }
