import os
import csv
import random
from fastapi import APIRouter, UploadFile, File, HTTPException
from app.models.schemas import ResumeResponse, ParsedData
from app.services.parser import ResumeParser
from app.pipelines.nlp_pipeline import NLPPipeline
from app.utils.config import settings

router = APIRouter()

# In-memory store for uploaded resumes
uploaded_resumes = []
candidate_id_counter = 0

def load_candidates_from_csv():
    """Load candidates from the datasets CSV file."""
    csv_path = os.path.join(settings.DATASETS_DIR, "candidates.csv")
    candidates = []
    if os.path.exists(csv_path):
        with open(csv_path, "r", encoding="utf-8") as f:
            reader = csv.DictReader(f)
            for row in reader:
                candidates.append({
                    "id": int(row["id"]),
                    "name": row["name"],
                    "email": row["email"],
                    "skills": [s.strip() for s in row["skills"].split(",")],
                    "experience": int(row["experience"]),
                    "education": row["education"],
                    "role": row.get("role", ""),
                    "resume_text": row.get("resume_text", ""),
                })
    return candidates

@router.post("/resumes/upload", response_model=dict)
async def upload_resume(file: UploadFile = File(...)):
    """Upload and parse a resume file."""
    global candidate_id_counter

    # Validate file type
    allowed_types = [
        "application/pdf",
        "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
        "application/msword",
        "text/plain",
    ]
    if file.content_type not in allowed_types and not file.filename.endswith((".pdf", ".docx", ".doc", ".txt")):
        raise HTTPException(status_code=400, detail="Invalid file type. Use PDF, DOCX, or TXT.")

    # Validate file size (10MB)
    contents = await file.read()
    if len(contents) > 10 * 1024 * 1024:
        raise HTTPException(status_code=400, detail="File too large. Max 10MB.")

    # Parse resume text
    file_ext = file.filename.split(".")[-1].lower()
    if file_ext == "pdf":
        text = ResumeParser.extract_text_from_pdf(contents)
    elif file_ext in ["docx", "doc"]:
        text = ResumeParser.extract_text_from_docx(contents)
    else:
        text = contents.decode("utf-8", errors="ignore")

    # Extract entities using NLP pipeline
    nlp = NLPPipeline()
    parsed = nlp.extract_entities(text)

    candidate_id_counter += 1
    candidate = {
        "id": candidate_id_counter,
        "name": parsed.get("name", file.filename),
        "email": parsed.get("email", ""),
        "skills": parsed.get("skills", []),
        "experience": parsed.get("experience_years", 0),
        "education": parsed.get("education", ""),
        "role": "",
        "resume_text": text[:500],
    }
    uploaded_resumes.append(candidate)

    return {
        "message": "Resume uploaded successfully",
        "candidate": candidate,
    }

@router.get("/resumes", response_model=list)
async def get_resumes():
    """Get all candidates (from CSV + uploads)."""
    csv_candidates = load_candidates_from_csv()
    # Limit to first 50 from CSV for performance
    return csv_candidates[:50] + uploaded_resumes

@router.get("/resumes/{resume_id}", response_model=dict)
async def get_resume(resume_id: int):
    """Get a specific candidate."""
    csv_candidates = load_candidates_from_csv()
    all_candidates = csv_candidates + uploaded_resumes

    for c in all_candidates:
        if c["id"] == resume_id:
            return c

    raise HTTPException(status_code=404, detail="Candidate not found")
