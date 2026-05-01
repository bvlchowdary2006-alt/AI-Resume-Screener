import os
import joblib
from loguru import logger
from app.utils.config import settings

class ModelManager:
    """Singleton manager for ML models."""

    _instance = None

    def __new__(cls):
        if cls._instance is None:
            cls._instance = super().__new__(cls)
            cls._instance._initialized = False
        return cls._instance

    def __init__(self):
        if self._initialized:
            return
        self._initialized = True
        self.models = {}
        self._load_models()

    def _load_models(self):
        """Load all ML models from disk."""
        model_files = {
            "ranking_model": settings.RANKING_MODEL_PATH,
            "skill_extractor": settings.SKILL_TAXONOMY_PATH,
            "bias_model": settings.BIAS_MODEL_PATH,
            "scaler": settings.SCALER_PATH,
        }

        for name, path in model_files.items():
            if os.path.exists(path):
                try:
                    self.models[name] = joblib.load(path)
                    logger.info(f"Loaded model: {name}")
                except Exception as e:
                    logger.warning(f"Failed to load {name}: {e}")
            else:
                logger.info(f"Model not found (will use fallback): {name}")

    def get_model(self, name):
        """Get a loaded model by name."""
        return self.models.get(name)

    def is_model_loaded(self, name):
        """Check if a specific model is loaded."""
        return name in self.models

    def get_all_status(self):
        """Get status of all models."""
        status = {}
        model_files = {
            "ranking_model": settings.RANKING_MODEL_PATH,
            "skill_extractor": settings.SKILL_TAXONOMY_PATH,
            "bias_model": settings.BIAS_MODEL_PATH,
            "scaler": settings.SCALER_PATH,
        }
        for name, path in model_files.items():
            status[name] = {
                "loaded": name in self.models,
                "path": path,
                "exists": os.path.exists(path),
            }
        return status
