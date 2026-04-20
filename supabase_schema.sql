-- Create candidates table
CREATE TABLE IF NOT EXISTS candidates (
    id UUID PRIMARY KEY,
    name TEXT,
    email TEXT,
    phone TEXT,
    parsed_data JSONB,
    resume_text TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Create jobs table
CREATE TABLE IF NOT EXISTS jobs (
    id UUID PRIMARY KEY,
    title TEXT,
    description TEXT,
    required_skills JSONB,
    min_experience_years FLOAT,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Create scores table for candidate-job matching
CREATE TABLE IF NOT EXISTS scores (
    id UUID PRIMARY KEY,
    job_id UUID REFERENCES jobs(id) ON DELETE CASCADE,
    candidate_id UUID REFERENCES candidates(id) ON DELETE CASCADE,
    overall_score FLOAT,
    skill_score FLOAT,
    experience_score FLOAT,
    semantic_score FLOAT,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Enable vector extensions for semantic search (if needed)
-- CREATE EXTENSION IF NOT EXISTS vector;
-- ALTER TABLE candidates ADD COLUMN embedding vector(384); 
