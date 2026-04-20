# AI-Powered Intelligent Resume Screening System

A production-grade, full-stack Applicant Tracking System (ATS) that uses NLP and Machine Learning to parse, match, and rank resumes against job descriptions.

## 🚀 Features

- **Premium SaaS UI**: Modern, dark-themed dashboard with glassmorphism and smooth animations.
- **AI Resume Parsing**: Extracts structured data (Name, Email, Phone, Skills, Education, Experience) from PDF and DOCX files.
- **BERT Semantic Matching**: Uses BERT embeddings for precise, non-keyword-based candidate ranking.
- **Fairness Audit**: Automated bias detection (gender, university, name-based) to ensure equitable hiring.
- **Real-time Analytics**: Visual insights into skill distributions and pipeline performance.
- **Production Infrastructure**: Optimized Docker builds with CPU-only PyTorch support.

## 🛠️ Tech Stack

- **Backend**: FastAPI, PyMuPDF, python-docx, spaCy, sentence-transformers, scikit-learn, loguru.
- **Frontend**: React (JavaScript), Vite, Tailwind CSS, Lucide React, Recharts, Framer Motion.
- **Database**: Supabase (PostgreSQL).
- **Deployment**: Docker, Docker Compose, Nginx.

## 📦 Quick Start

### 1. Prerequisites

- Docker & Docker Compose
- A Supabase account and project

### 2. Database Setup

1. Create a project in [Supabase](https://supabase.com/).
2. Run `supabase_schema.sql` in the Supabase SQL Editor.
3. Obtain your `SUPABASE_URL` and `SUPABASE_KEY` (anon key).

### 3. Configuration

Create a `.env` file in the root directory:

```bash
SUPABASE_URL=your_project_url
SUPABASE_KEY=your_anon_key
VITE_API_URL=http://localhost:8000/api/v1
```

### 4. Launch

```bash
docker-compose up --build
```

- **Frontend**: `http://localhost:3000`
- **Backend API**: `http://localhost:8000`
- **Interactive API Docs**: `http://localhost:8000/docs`

## 🏗️ Folder Structure

```
.
├── backend/                # FastAPI Application
│   ├── app/
│   │   ├── routes/         # API Endpoints
│   │   ├── services/       # Parsing & Logic
│   │   └── utils/          # Config & Supabase
├── frontend/               # React + Tailwind
│   ├── src/
│   │   ├── components/     # UI Library
│   │   └── pages/          # Premium Pages
├── docker-compose.yml      # Optimized Orchestration
└── supabase_schema.sql     # Database Schema
```

### 📝 Important Notes

- **PyTorch (CPU-Only)**: Optimized for container stability and size.
- **DNS Resolution**: Backend includes retry logic for Supabase connectivity.
- **File Validation**: Supports PDF and DOCX up to 10MB.

## 📄 License

MIT
