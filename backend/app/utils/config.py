import os
from pydantic_settings import BaseSettings, SettingsConfigDict
from dotenv import load_dotenv
from typing import Optional

# Load .env from multiple possible locations
load_dotenv(os.path.join(os.getcwd(), ".env"))
load_dotenv(os.path.join(os.path.dirname(os.path.dirname(os.path.dirname(__file__))), ".env"))

class Settings(BaseSettings):
    model_config = SettingsConfigDict(env_file=".env", extra="ignore")

    PROJECT_NAME: str = "Intelligent Resume Screening System"
    API_V1_STR: str = "/api/v1"
    
    # Supabase config
    SUPABASE_URL: str = os.getenv("SUPABASE_URL", "")
    SUPABASE_KEY: str = os.getenv("SUPABASE_KEY", "")
    SUPABASE_BUCKET: str = os.getenv("SUPABASE_BUCKET", "resumes")
    
    # NLP Model config
    # Use 'en_core_web_sm' for better performance on CPU
    NLP_MODEL: str = os.getenv("NLP_MODEL", "en_core_web_sm")
    EMBEDDING_MODEL: str = os.getenv("EMBEDDING_MODEL", "all-MiniLM-L6-v2")
    
    # Matching config
    SKILL_WEIGHT: float = 0.4
    EXPERIENCE_WEIGHT: float = 0.3
    SEMANTIC_WEIGHT: float = 0.3

settings = Settings()
