import uvicorn
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from loguru import logger
from app.routes import resume_routes, job_routes, analytics_routes
from app.utils.config import settings

def create_app() -> FastAPI:
    app = FastAPI(
        title="Intelligent Resume Screening System",
        description="AI-powered ATS for resume parsing, matching, and ranking.",
        version="1.0.0",
    )

    # Configure CORS
    app.add_middleware(
        CORSMiddleware,
        allow_origins=["*"],  # In production, specify exact origins
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
        return {"message": "Welcome to the AI Resume Screening API"}

    @app.on_event("startup")
    async def startup_event():
        logger.info("Starting up the AI Resume Screening System...")

    return app

app = create_app()

if __name__ == "__main__":
    uvicorn.run("main:app", host="0.0.0.0", port=8000, reload=True)
