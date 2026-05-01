import pandas as pd
import random
from faker import Faker
import os

fake = Faker()
Faker.seed(42)
random.seed(42)

def generate_datasets():
    if not os.path.exists('datasets'):
        os.makedirs('datasets')

    skills_pool = [
        "Python", "JavaScript", "React", "FastAPI", "PostgreSQL", "Docker", 
        "AWS", "TypeScript", "Node.js", "SQL", "Machine Learning", "NLP", 
        "PyTorch", "TensorFlow", "Kubernetes", "Redis", "NoSQL", "Go", "Java"
    ]

    # 1. Candidates Dataset
    candidates = []
    for i in range(500):
        skills = random.sample(skills_pool, k=random.randint(3, 7))
        candidates.append({
            "id": i + 1,
            "name": fake.name(),
            "email": fake.email(),
            "skills": ", ".join(skills),
            "experience": random.randint(0, 15),
            "education": random.choice(["B.S. Computer Science", "M.S. Data Science", "PhD AI", "B.Tech IT"]),
            "resume_text": f"Professional with {random.randint(0, 15)} years experience. Skilled in {', '.join(skills)}. Worked at {fake.company()}."
        })
    
    pd.DataFrame(candidates).to_csv('datasets/candidates.csv', index=False)
    print("Created datasets/candidates.csv")

    # 2. Jobs Dataset
    jobs = []
    job_titles = ["Senior Frontend Engineer", "Backend Developer", "ML Engineer", "DevOps Specialist", "Full Stack Developer"]
    for i in range(50):
        req_skills = random.sample(skills_pool, k=random.randint(4, 8))
        jobs.append({
            "id": i + 1,
            "title": random.choice(job_titles),
            "required_skills": ", ".join(req_skills),
            "min_experience": random.randint(1, 10),
            "description": f"We are looking for a {random.choice(job_titles)} proficient in {', '.join(req_skills)}."
        })
    
    pd.DataFrame(jobs).to_csv('datasets/jobs.csv', index=False)
    print("Created datasets/jobs.csv")

    # 3. Bias Samples
    bias_samples = []
    biased_terms = ["rockstar", "ninja", "aggressive", "dominant", "young", "recent graduate"]
    neutral_terms = ["collaborative", "experienced", "proficient", "skilled", "dedicated"]
    
    for i in range(200):
        is_biased = random.choice([True, False])
        text = f"Seeking a {random.choice(biased_terms if is_biased else neutral_terms)} professional."
        bias_samples.append({"text": text, "label": 1 if is_biased else 0})
    
    pd.DataFrame(bias_samples).to_csv('datasets/bias_samples.csv', index=False)
    print("Created datasets/bias_samples.csv")

if __name__ == "__main__":
    generate_datasets()
