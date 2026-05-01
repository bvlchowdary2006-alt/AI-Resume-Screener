import os
from pydantic_settings import BaseSettings, SettingsConfigDict
from dotenv import load_dotenv

# Load .env from multiple possible locations
load_dotenv(os.path.join(os.getcwd(), ".env"))
load_dotenv(os.path.join(os.path.dirname(os.path.dirname(os.path.dirname(__file__))), ".env"))

class Settings(BaseSettings):
    model_config = SettingsConfigDict(env_file=".env", extra="ignore")

    PROJECT_NAME: str = "AI.Screen"
    API_V1_STR: str = "/api/v1"

    # Supabase config (optional)
    SUPABASE_URL: str = os.getenv("SUPABASE_URL", "")
    SUPABASE_KEY: str = os.getenv("SUPABASE_KEY", "")

    # NLP Model config
    NLP_MODEL: str = os.getenv("NLP_MODEL", "en_core_web_sm")
    EMBEDDING_MODEL: str = os.getenv("EMBEDDING_MODEL", "all-MiniLM-L6-v2")

    # Matching weights
    SKILL_WEIGHT: float = 0.4
    EXPERIENCE_WEIGHT: float = 0.3
    SEMANTIC_WEIGHT: float = 0.3

    # Paths
    BASE_DIR: str = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
    ML_MODELS_DIR: str = os.path.join(BASE_DIR, "ml_models")
    DATASETS_DIR: str = os.path.join(os.path.dirname(BASE_DIR), "datasets")

    SKILL_TAXONOMY_PATH: str = os.path.join(ML_MODELS_DIR, "skill_taxonomy.pkl")
    RANKING_MODEL_PATH: str = os.path.join(ML_MODELS_DIR, "ranking_model.pkl")
    RESUME_EMBEDDINGS_PATH: str = os.path.join(ML_MODELS_DIR, "resume_embeddings.npy")
    BIAS_MODEL_PATH: str = os.path.join(ML_MODELS_DIR, "bias_model.pkl")
    SCALER_PATH: str = os.path.join(ML_MODELS_DIR, "scaler.pkl")

settings = Settings()
