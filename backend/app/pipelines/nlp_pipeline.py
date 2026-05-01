import re
import os

class NLPPipeline:
    """NLP pipeline for resume parsing and skill extraction."""

    # Built-in skill taxonomy
    SKILL_TAXONOMY = {
        "languages": [
            "python", "javascript", "typescript", "java", "c++", "c#",
            "go", "rust", "ruby", "php", "swift", "kotlin", "scala",
            "r", "matlab", "perl", "haskell", "clojure", "dart",
        ],
        "frameworks": [
            "react", "angular", "vue", "django", "flask", "fastapi",
            "spring boot", "express", "next.js", "nuxt", "svelte",
            "node.js", "jquery", "bootstrap", "tailwind", "sass",
        ],
        "databases": [
            "postgresql", "mysql", "mongodb", "redis", "elasticsearch",
            "sqlite", "oracle", "sql server", "cassandra", "dynamodb",
            "firebase", "supabase", "neo4j", "mariadb",
        ],
        "tools": [
            "docker", "kubernetes", "aws", "gcp", "azure", "git",
            "jenkins", "terraform", "ansible", "linux", "ci/cd",
            "github", "gitlab", "jira", "confluence",
        ],
        "ml_ai": [
            "machine learning", "deep learning", "nlp", "pytorch",
            "tensorflow", "scikit-learn", "pandas", "numpy", "keras",
            "computer vision", "reinforcement learning", "llm",
            "transformers", "bert", "data science",
        ],
        "concepts": [
            "rest api", "graphql", "microservices", "agile", "scrum",
            "tdd", "bdd", "devops", "system design", "oop",
            "functional programming", "distributed systems",
        ],
    }

    # Flatten taxonomy for easy lookup
    ALL_SKILLS = []
    for category, skills in SKILL_TAXONOMY.items():
        ALL_SKILLS.extend(skills)

    def __init__(self):
        self._spacy_loaded = False
        self._nlp = None
        self._try_load_spacy()

    def _try_load_spacy(self):
        """Try to load spaCy, fall back to regex-only if not available."""
        try:
            import spacy
            self._nlp = spacy.load("en_core_web_sm")
            self._spacy_loaded = True
        except Exception:
            pass

    def extract_entities(self, text):
        """Extract entities from resume text."""
        result = {
            "name": self._extract_name(text),
            "email": self._extract_email(text),
            "phone": self._extract_phone(text),
            "skills": self.extract_skills(text),
            "experience_years": self._extract_experience_years(text),
            "education": self._extract_education(text),
        }
        return result

    def _extract_name(self, text):
        """Try to extract a person's name."""
        # Look for common name patterns at the start
        lines = text.strip().split("\n")
        for line in lines[:5]:
            line = line.strip()
            # Pattern: "Name" or "FirstName LastName"
            match = re.match(r'^([A-Z][a-z]+(?:\s+[A-Z][a-z]+){1,3})$', line)
            if match and len(line) < 40:
                return match.group(1)
        return None

    def _extract_email(self, text):
        """Extract email address."""
        match = re.search(r'[\w.+-]+@[\w-]+\.[\w.]+', text)
        return match.group(0) if match else None

    def _extract_phone(self, text):
        """Extract phone number."""
        patterns = [
            r'\+?1?[-.\s]?\(?\d{3}\)?[-.\s]?\d{3}[-.\s]?\d{4}',
            r'\b\d{3}[-.\s]\d{3}[-.\s]\d{4}\b',
        ]
        for pattern in patterns:
            match = re.search(pattern, text)
            if match:
                return match.group(0)
        return None

    def _extract_experience_years(self, text):
        """Extract years of experience."""
        patterns = [
            r'(\d+)\+?\s*(?:years?|yrs?|yr)\s*(?:of\s+)?(?:experience|exp)',
            r'(?:experience|exp)(?:d)?\s*:?[\s\w]*(\d+)\+?\s*(?:years?|yrs?)',
            r'(\d+)\+?\s*(?:years?|yrs?)\s*(?:of\s+)?(?:experience|exp)',
        ]
        for pattern in patterns:
            match = re.search(pattern, text, re.IGNORECASE)
            if match:
                return int(match.group(1))
        return 0

    def _extract_education(self, text):
        """Extract education information."""
        patterns = [
            r'((?:B\.?S\.?|M\.?S\.?|Ph\.?D\.?|B\.?Tech|M\.?Tech|B\.?A\.?|M\.?A\.?|B\.?E\.?|M\.?E\.?)[\s\w.]+(?:Computer\s+Science|Software\s+Engineering|Data\s+Science|Information\s+Technology|Machine\s+Learning|Artificial\s+Intelligence|Mathematics|Statistics|Engineering|Business))',
            r'((?:Bachelors|Masters|PhD|Doctorate)[\s\w.]+(?:in|of)\s+[\w\s]+)',
        ]
        for pattern in patterns:
            match = re.search(pattern, text, re.IGNORECASE)
            if match:
                return match.group(1).strip()
        return None

    def extract_skills(self, text):
        """Extract skills from text using taxonomy matching."""
        text_lower = text.lower()
        found_skills = []

        for skill in self.ALL_SKILLS:
            if skill.lower() in text_lower:
                found_skills.append(skill.title() if skill.islower() else skill)

        return list(set(found_skills))

    def generate_embeddings(self, text):
        """Generate text embeddings using SentenceTransformer."""
        try:
            from sentence_transformers import SentenceTransformer
            model = SentenceTransformer("all-MiniLM-L6-v2")
            embedding = model.encode(text)
            return embedding.tolist()
        except Exception:
            return [0.0] * 384  # Fallback zero vector

    def cosine_similarity(self, vec1, vec2):
        """Calculate cosine similarity between two vectors."""
        import numpy as np
        v1 = np.array(vec1)
        v2 = np.array(vec2)
        if np.linalg.norm(v1) == 0 or np.linalg.norm(v2) == 0:
            return 0.0
        return float(np.dot(v1, v2) / (np.linalg.norm(v1) * np.linalg.norm(v2)))
