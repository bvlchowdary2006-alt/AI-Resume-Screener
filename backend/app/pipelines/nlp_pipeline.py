import spacy
import re
from typing import List, Dict, Any, Optional
from loguru import logger
from sentence_transformers import SentenceTransformer
from sklearn.metrics.pairwise import cosine_similarity
from app.utils.config import settings

class NLPPipeline:
    def __init__(self):
        try:
            # Use a smaller model for development if needed, e.g., "en_core_web_sm"
            self.nlp = spacy.load(settings.NLP_MODEL)
        except OSError:
            logger.warning(f"Spacy model {settings.NLP_MODEL} not found. Downloading...")
            spacy.cli.download(settings.NLP_MODEL)
            self.nlp = spacy.load(settings.NLP_MODEL)
            
        self.embedder = SentenceTransformer(settings.EMBEDDING_MODEL)
        
        # Predefined skill taxonomy for normalization
        self.skill_taxonomy = [
            "python", "javascript", "react", "fastapi", "sql", "postgresql", "docker", 
            "kubernetes", "aws", "azure", "machine learning", "deep learning", 
            "natural language processing", "pytorch", "tensorflow", "scikit-learn",
            "pandas", "numpy", "matplotlib", "seaborn", "java", "c++", "go", "rust",
            "typescript", "nodejs", "express", "flask", "django", "mongodb", "redis"
        ]

    def extract_entities(self, text: str) -> Dict[str, Any]:
        doc = self.nlp(text)
        
        entities = {
            "name": None,
            "email": None,
            "phone": None,
            "skills": [],
            "education": [],
            "experience": [],
            "total_experience_years": 0.0
        }
        
        # Extract name using PERSON entity
        for ent in doc.ents:
            if ent.label_ == "PERSON" and not entities["name"]:
                entities["name"] = ent.text
            elif ent.label_ == "ORG":
                # Basic education/experience extraction
                if any(keyword in ent.text.lower() for keyword in ["university", "college", "institute", "school"]):
                    entities["education"].append({"institution": ent.text, "degree": "Degree (Extracted)"})
                else:
                    entities["experience"].append({"company": ent.text, "role": "Role (Extracted)"})
        
        # Extract email and phone using regex
        email_regex = r'[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}'
        phone_regex = r'(\d{3}[-\.\s]??\d{3}[-\.\s]??\d{4}|\(\d{3}\)\s*\d{3}[-\.\s]??\d{4}|\d{10})'
        
        emails = re.findall(email_regex, text)
        phones = re.findall(phone_regex, text)
        
        if emails:
            entities["email"] = emails[0]
        if phones:
            entities["phone"] = phones[0]
            
        # Extract skills using keyword matching + normalization
        text_lower = text.lower()
        extracted_skills = []
        for skill in self.skill_taxonomy:
            if skill in text_lower:
                extracted_skills.append(skill)
        
        entities["skills"] = list(set(extracted_skills))
        
        # Basic experience estimation (years)
        # Look for patterns like "X years of experience" or "2018 - 2022"
        year_patterns = re.findall(r'(\d+)\+?\s*years?', text_lower)
        if year_patterns:
            try:
                entities["total_experience_years"] = max([float(y) for y in year_patterns])
            except ValueError:
                pass
                
        return entities

    def get_embeddings(self, text: str) -> List[float]:
        return self.embedder.encode(text).tolist()

    def compute_similarity(self, text1: str, text2: str) -> float:
        embeddings = self.embedder.encode([text1, text2])
        return cosine_similarity([embeddings[0]], [embeddings[1]])[0][0]

nlp_pipeline = NLPPipeline()
