# AI.Screen — Hiring Intelligence

AI-powered resume screening, candidate ranking, and bias detection for modern hiring teams.

## Features

- **Resume Parsing** — Upload PDF, DOCX, or TXT resumes and automatically extract skills, experience, education, and contact info
- **Candidate Ranking** — Define a job role and get an instant ranked shortlist with skill overlap, experience fit, and semantic similarity scores
- **Bias Detection** — Identify gendered language and elite-university preferences in job descriptions
- **Hiring Analytics** — Track your pipeline with skill distribution charts, quality trends, and hiring funnel visualizations

## Quick Start

### Without Docker

#### 1. Backend

```bash
cd backend
python -m venv venv
venv\Scripts\activate    # Windows
# source venv/bin/activate  # Mac/Linux
pip install -r requirements.txt
python -m spacy download en_core_web_sm
uvicorn app.main:app --reload
```

Backend runs at `http://localhost:8000`
Swagger docs at `http://localhost:8000/docs`

#### 2. Frontend

```bash
cd frontend
npm install
npm run dev
```

Frontend runs at `http://localhost:3000`

#### 3. Jupyter Notebooks

```bash
pip install notebook jupyter
jupyter notebook
```

Open `notebooks/` and run cells in order (01 through 06).

### With Docker

```bash
docker-compose up --build
```

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

## License

MIT
