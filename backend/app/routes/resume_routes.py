from fastapi import APIRouter, UploadFile, File, HTTPException, BackgroundTasks
from typing import List, Optional
from app.models.schemas import ResumeResponse, ParsedData
from app.services.parser import ResumeParser
from app.pipelines.nlp_pipeline import nlp_pipeline
from app.utils.supabase_client import supabase_client
from loguru import logger
import uuid
import datetime

router = APIRouter()

MAX_FILE_SIZE = 10 * 1024 * 1024  # 10MB
ALLOWED_EXTENSIONS = {".pdf", ".docx"}

@router.post("/upload_resume")
async def upload_resume(file: UploadFile = File(...)):
    # 1. Validate file extension
    import os
    ext = os.path.splitext(file.filename)[1].lower()
    if ext not in ALLOWED_EXTENSIONS:
        logger.warning(f"Unsupported file format: {file.filename}")
        raise HTTPException(status_code=400, detail=f"Unsupported file format. Allowed: {ALLOWED_EXTENSIONS}")

    # 2. Read file and validate size
    content = await file.read()
    if len(content) > MAX_FILE_SIZE:
        logger.warning(f"File too large: {file.filename} ({len(content)} bytes)")
        raise HTTPException(status_code=400, detail="File too large. Maximum size is 10MB.")

    if not supabase_client:
        logger.error("Supabase client is not initialized.")
        raise HTTPException(status_code=500, detail="Database connection error.")

    try:
        # 3. Parse text
        logger.info(f"Parsing resume: {file.filename}")
        text = ResumeParser.parse(content, file.filename)
        if not text or not text.strip():
            logger.warning(f"Could not extract text from: {file.filename}")
            raise HTTPException(status_code=400, detail="Could not extract text from the file.")
            
        # 4. Extract entities
        logger.info(f"Extracting entities from: {file.filename}")
        parsed_data_dict = nlp_pipeline.extract_entities(text)
        parsed_data = ParsedData(**parsed_data_dict)
        
        # 5. Store in Supabase
        resume_id = str(uuid.uuid4())
        candidate_data = {
            "id": resume_id,
            "name": parsed_data.name or "Unknown Candidate",
            "email": parsed_data.email,
            "phone": parsed_data.phone,
            "parsed_data": parsed_data.dict(),
            "resume_text": text,
            "created_at": datetime.datetime.now().isoformat()
        }
        
        logger.info(f"Saving candidate to Supabase: {resume_id}")
        supabase_client.table("candidates").insert(candidate_data).execute()
        
        return {
            "id": resume_id,
            "filename": file.filename,
            "parsed_data": parsed_data,
            "message": "Resume uploaded and parsed successfully"
        }
    except HTTPException as he:
        raise he
    except Exception as e:
        logger.error(f"Error during resume upload/parse: {str(e)}")
        raise HTTPException(status_code=500, detail=f"Processing error: {str(e)}")

@router.get("/resumes")
async def get_resumes():
    if not supabase_client:
        raise HTTPException(status_code=500, detail="Database connection error.")
    try:
        response = supabase_client.table("candidates").select("*").execute()
        return response.data
    except Exception as e:
        logger.error(f"Error fetching resumes: {str(e)}")
        raise HTTPException(status_code=500, detail="Could not fetch resumes.")

@router.get("/resumes/{resume_id}")
async def get_resume(resume_id: str):
    if not supabase_client:
        raise HTTPException(status_code=500, detail="Database connection error.")
    try:
        response = supabase_client.table("candidates").select("*").eq("id", resume_id).single().execute()
        if not response.data:
            raise HTTPException(status_code=404, detail="Resume not found")
        return response.data
    except HTTPException as he:
        raise he
    except Exception as e:
        logger.error(f"Error fetching resume {resume_id}: {str(e)}")
        raise HTTPException(status_code=404, detail="Resume not found")
