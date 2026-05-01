import os
import datetime
import uvicorn
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from loguru import logger
from app.routes import resume_routes, job_routes, analytics_routes
from app.utils.config import settings

def create_app() -> FastAPI:
    app = FastAPI(
        title="AI.Screen API",
        description="AI-powered ATS for resume parsing, matching, and ranking.",
        version="2.0.0",
    )

    # Configure CORS
    app.add_middleware(
        CORSMiddleware,
        allow_origins=["*"],
        allow_credentials=True,
        allow_methods=["*"],
        allow_headers=["*"],
    )

    # Include routes
    app.include_router(resume_routes.router, prefix="/api/v1", tags=["Resumes"])
    app.include_router(job_routes.router, prefix="/api/v1", tags=["Jobs"])
    app.include_router(analytics_routes.router, prefix="/api/v1", tags=["Analytics"])

    @app.get("/")
    async def root():
        return {
            "message": "Welcome to the AI.Screen API",
            "version": "2.0.0",
        }

    @app.get("/health")
    async def health():
        from app.utils.supabase_client import supabase_client

        db_status = "connected" if supabase_client else "disconnected"

        models_loaded = True
        model_paths = [
            settings.SKILL_TAXONOMY_PATH,
            settings.RANKING_MODEL_PATH,
        ]
        for path in model_paths:
            if not os.path.exists(path):
                models_loaded = False
                break

        return {
            "backend": "ok",
            "database": db_status,
            "models_loaded": models_loaded,
            "timestamp": datetime.datetime.now().isoformat(),
        }

    @app.on_event("startup")
    async def startup_event():
        logger.info("Starting up AI.Screen...")
        os.makedirs(settings.ML_MODELS_DIR, exist_ok=True)
        os.makedirs(settings.DATASETS_DIR, exist_ok=True)

    return app

app = create_app()

if __name__ == "__main__":
    uvicorn.run("app.main:app", host="0.0.0.0", port=8000, reload=True)
