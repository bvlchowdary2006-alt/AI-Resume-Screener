# AI RESUME SCANNER

AI-powered resume screening, candidate ranking, and bias detection for modern hiring teams.

## Features

- **Resume Parsing** — Upload PDF, DOCX, or TXT resumes and automatically extract skills, experience, education, and contact info
- **Candidate Ranking** — Define a job role and get an instant ranked shortlist with skill overlap, experience fit, and semantic similarity scores
- **Bias Detection** — Identify gendered language and elite-university preferences in job descriptions
- **Hiring Analytics** — Track your pipeline with skill distribution charts, quality trends, and hiring funnel visualizations



---

#  Tech Stack

## Frontend
- React.js  
- Vite  
- JavaScript  
- Tailwind CSS  
- Framer Motion  
- Recharts  
- Lucide React  

## Backend
- FastAPI  
- Python  
- PyMuPDF  
- python-docx  
- spaCy  
- sentence-transformers  
- scikit-learn  
- loguru  

## Database
- Supabase (PostgreSQL)

## AI / ML
- Resume Parsing using NLP  
- BERT Semantic Similarity Matching  
- Candidate Ranking Engine  
- Fairness / Bias Detection Models  

## Deployment & DevOps
- Docker  
- Docker Compose  
- Nginx  

---


#  Project Overview

The AI-Powered Intelligent Resume Screening System helps recruiters and organizations streamline their hiring process by automatically screening, evaluating, and ranking resumes against job descriptions.

Instead of manually reviewing hundreds of applications, recruiters can upload resumes and instantly receive:


- Structured candidate profiles  
- AI-based compatibility scores  
- Skill gap analysis  
- Ranked candidate lists  
- Bias detection reports  
- Hiring analytics dashboard  


- Frontend: `http://localhost:3000`
- Backend Swagger: `http://localhost:8000/docs`

## Project Structure

```
AI_RESUME_SCREENER/
├── backend/
│   ├── app/
│   │   ├── main.py              # FastAPI app
│   │   ├── models/schemas.py    # Pydantic models
│   │   ├── routes/              # API routes
│   │   ├── services/            # Business logic
│   │   ├── pipelines/           # NLP pipeline
│   │   └── utils/               # Config, helpers
│   ├── ml_models/               # Trained .pkl models
│   ├── Dockerfile
│   └── requirements.txt
├── frontend/
│   ├── src/
│   │   ├── pages/               # Page components
│   │   ├── components/          # Shared components
│   │   └── services/api.js      # API client
│   ├── Dockerfile
│   └── package.json
├── datasets/
│   ├── candidates.csv           # 500 synthetic candidates
│   ├── jobs.csv                 # 50 job descriptions
│   └── bias_samples.csv         # 500 labeled bias samples
├── notebooks/
│   ├── 01_data_cleaning.ipynb
│   ├── 02_skill_extraction.ipynb
│   ├── 03_embeddings.ipynb
│   ├── 04_ranking_model.ipynb
│   ├── 05_bias_detection.ipynb
│   └── 06_pipeline_demo.ipynb
├── scripts/
│   └── generate_datasets.py     # Regenerate datasets
├── docker-compose.yml
└── README.md
```

## Datasets

All datasets are auto-generated using Faker with a fixed seed for reproducibility:

| File | Rows | Description |
|------|------|-------------|
| `candidates.csv` | 500 | Synthetic candidate profiles with skills, experience, education |
| `jobs.csv` | 50 | Job descriptions with required skills and experience levels |
| `bias_samples.csv` | 500 | Text samples labeled for gender and university bias |

Regenerate with: `python scripts/generate_datasets.py`

## ML Pipeline

The notebooks walk through the full ML pipeline:

1. **Data Cleaning** — Text preprocessing, stopword removal, lemmatization
2. **Skill Extraction** — Regex and spaCy PhraseMatcher skill identification
3. **Embeddings** — BERT-based semantic embeddings via SentenceTransformer
4. **Ranking Model** — XGBoost classifier for hire/reject predictions
5. **Bias Detection** — Heuristic-based gendered language and university bias detection
6. **Pipeline Demo** — End-to-end candidate screening demonstration

## Tech Stack

| Layer | Technology |
|-------|-----------|
| Frontend | React 19, Vite 6, Tailwind CSS 4, Framer Motion, Recharts, Lucide Icons |
| Backend | FastAPI, Pydantic, Uvicorn |
| ML/NLP | spaCy, SentenceTransformers, Scikit-learn, XGBoost |
| Data | Pandas, Faker |
| Infra | Docker, Docker Compose, Nginx |

## API Endpoints

| Method | Path | Description |
|--------|------|-------------|
| GET | `/health` | Health check with model status |
| POST | `/api/v1/resumes/upload` | Upload and parse a resume |
| GET | `/api/v1/resumes` | List all candidates |
| GET | `/api/v1/resumes/{id}` | Get a specific candidate |
| POST | `/api/v1/jobs/match` | Match candidates against a job |
| GET | `/api/v1/jobs` | List all job descriptions |
| GET | `/api/v1/analytics/summary` | Get analytics summary |
| GET | `/api/v1/analytics/bias/{id}` | Get bias report for a candidate |


---

#  Core Features

##  AI Resume Parsing

Automatically extracts important candidate information from uploaded PDF and DOCX resumes:

- Full Name  
- Email Address  
- Phone Number  
- Skills  
- Work Experience  
- Education  
- Certifications  
- Projects  

---


##  Smart Candidate Matching

Uses BERT embeddings and semantic similarity models to understand meaning beyond keywords.

This enables:

- Better JD-to-resume matching  
- Contextual skill understanding  
- Relevant candidate recommendations  
- Accurate ranking system  

---

##  Candidate Ranking Engine

Every uploaded resume is scored against the job description based on:

- Skill Match Percentage  
- Experience Relevance  
- Education Fit  
- Semantic Similarity Score  
- Overall ATS Score  

Candidates are automatically sorted from best to least fit.

---

##  Fairness Audit System

Built-in bias detection module checks for unfair patterns such as:

- Gender-based bias  
- University preference bias  
- Name-origin bias  
- Shortlisting imbalance  

Helps organizations ensure ethical and inclusive hiring.

---

##  Real-Time Analytics Dashboard

Interactive dashboards provide hiring intelligence such as:

- Top Skills Across Applicants  
- Resume Funnel Metrics  
- Match Score Distribution  
- Candidate Pipeline Status  
- Screening Efficiency Reports  

---

##  Premium SaaS UI

Modern enterprise-grade interface featuring:

- Dark Theme Dashboard  
- Glassmorphism Cards  
- Smooth Animations  
- Responsive Layout  
- Elegant Data Visualizations  
- Clean Recruiter Workflow  

---

#  Supported File Uploads

- PDF Resume Files  
- DOCX Resume Files  

### Validation Rules

- Max File Size: 10MB  
- Secure File Type Validation  
- Optimized Parsing Performance  

---


#  Project Architecture

```text
Frontend (React + Tailwind)
        ↓
REST API (FastAPI Backend)
        ↓
AI Processing Engine
        ↓
Supabase PostgreSQL Database
        ↓
Analytics + Dashboard
