# AI-Powered Intelligent Resume Screening System

A production-ready, full-stack Applicant Tracking System (ATS) designed to automate hiring workflows using Artificial Intelligence, Natural Language Processing, and Machine Learning. This platform intelligently parses resumes, compares them with job descriptions, ranks candidates, and provides hiring insights through a modern SaaS dashboard.

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

###  Sample Frontend Link made by EmergentAI:
https://resume-screener-pro.preview.emergentagent.com/

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

#  AI Workflow

## Step 1: Upload Resume

Recruiters upload candidate resumes.

## Step 2: Parse Resume

System extracts structured data using NLP.

## Step 3: Add Job Description

Paste or upload job description.

## Step 4: Semantic Matching

BERT compares candidate profile with JD.

## Step 5: Candidate Ranking

Applicants receive ATS score and ranking.

## Step 6: Review Insights

Recruiters view analytics and fairness reports.

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
