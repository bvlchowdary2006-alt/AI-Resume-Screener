import csv
import os
import random
from faker import Faker

fake = Faker()
Faker.seed(42)
random.seed(42)

os.makedirs('datasets', exist_ok=True)

tech_skills = [
    "Python", "JavaScript", "TypeScript", "React", "Node.js", "FastAPI",
    "Django", "Flask", "PostgreSQL", "MySQL", "MongoDB", "Redis",
    "Docker", "Kubernetes", "AWS", "GCP", "Azure", "CI/CD",
    "Git", "Linux", "REST API", "GraphQL", "Microservices",
    "Machine Learning", "NLP", "Deep Learning", "PyTorch", "TensorFlow",
    "Scikit-learn", "Pandas", "NumPy", "Data Visualization",
    "HTML", "CSS", "Tailwind CSS", "Sass", "Vue.js", "Angular",
    "Spring Boot", "Java", "C#", ".NET", "Go", "Rust",
    "Agile", "Scrum", "JIRA", "Testing", "TDD", "BDD",
    "Elasticsearch", "Kafka", "RabbitMQ", "Terraform", "Ansible"
]

job_titles = [
    "Software Engineer", "Senior Software Engineer", "Staff Engineer",
    "Frontend Developer", "Backend Developer", "Full Stack Developer",
    "ML Engineer", "Data Scientist", "Data Engineer", "DevOps Engineer",
    "Solutions Architect", "Technical Lead", "Engineering Manager",
    "Product Manager", "UX Designer", "UI Designer", "Product Designer",
    "QA Engineer", "Security Engineer", "Cloud Engineer",
    "Site Reliability Engineer", "Platform Engineer", "Research Scientist"
]

universities = [
    "MIT", "Stanford University", "UC Berkeley", "Carnegie Mellon",
    "Georgia Tech", "University of Washington", "University of Texas",
    "University of Michigan", "Cornell University", "Columbia University",
    "University of Toronto", "Imperial College", "ETH Zurich",
    "IIT Delhi", "IIT Bombay", "NUS Singapore", "Tsinghua University",
    "State University", "City College", "Regional Technical Institute"
]

companies = [
    "Google", "Microsoft", "Amazon", "Meta", "Apple", "Netflix",
    "Tesla", "Stripe", "Shopify", "Airbnb", "Uber", "Lyft",
    "Spotify", "Salesforce", "Adobe", "Oracle", "IBM", "Intel",
    "NVIDIA", "Databricks", "Snowflake", "Palantir", "Figma",
    "Notion", "Vercel", "Cloudflare", "Goldman Sachs", "JPMorgan"
]

role_levels = ["Junior", "Mid-Level", "Senior", "Lead", "Staff", "Principal"]

educations = [
    "B.S. Computer Science", "B.S. Software Engineering",
    "B.S. Information Technology", "B.S. Data Science",
    "M.S. Computer Science", "M.S. Data Science",
    "M.S. Machine Learning", "M.S. Artificial Intelligence",
    "PhD Computer Science", "PhD Machine Learning",
    "B.Tech Computer Science", "B.Tech Information Technology",
    "M.Tech Computer Science", "B.S. Mathematics",
    "B.S. Statistics", "M.S. Statistics"
]

# Generate candidates
candidates = []
for i in range(500):
    name = fake.name()
    initials = "".join([n[0] for n in name.split()])
    email = f"{name.split()[0].lower()}.{name.split()[-1].lower()}{random.randint(1,99)}@example.com"
    skills = random.sample(tech_skills, k=random.randint(3, 10))
    exp = random.randint(0, 20)
    edu = random.choice(educations)
    uni = random.choice(universities)
    company = random.choice(companies)
    role = random.choice(job_titles)

    resume_text = (
        f"{name} is a {role} with {exp} years of experience. "
        f"Education: {edu} from {uni}. "
        f"Previously worked at {company} as a {random.choice(role_levels)} {role}. "
        f"Key skills include {', '.join(skills)}. "
        f"Led multiple projects involving {' and '.join(random.sample(skills, min(3, len(skills))))}. "
        f"Passionate about building scalable systems and mentoring junior developers."
    )

    candidates.append({
        "id": i + 1,
        "name": name,
        "initials": initials,
        "email": email,
        "skills": ", ".join(skills),
        "experience": exp,
        "education": edu,
        "company": company,
        "role": role,
        "resume_text": resume_text
    })

with open('datasets/candidates.csv', 'w', newline='', encoding='utf-8') as f:
    writer = csv.DictWriter(f, fieldnames=["id", "name", "initials", "email", "skills", "experience", "education", "company", "role", "resume_text"])
    writer.writeheader()
    writer.writerows(candidates)

print(f"Created candidates.csv with {len(candidates)} rows")

# Generate jobs
jobs = []
for i in range(50):
    title = random.choice(job_titles)
    req_skills = random.sample(tech_skills, k=random.randint(4, 12))
    min_exp = random.randint(0, 10)

    description = (
        f"We are seeking a talented {title} to join our growing team. "
        f"The ideal candidate has {min_exp}+ years of experience and proficiency in {', '.join(req_skills[:5])}. "
        f"You will work on building scalable systems, collaborating with cross-functional teams, "
        f"and delivering high-quality software solutions. "
        f"Experience with {' and '.join(random.sample(req_skills, min(3, len(req_skills))))} is a plus."
    )

    jobs.append({
        "id": i + 1,
        "title": title,
        "required_skills": ", ".join(req_skills),
        "min_experience": min_exp,
        "description": description
    })

with open('datasets/jobs.csv', 'w', newline='', encoding='utf-8') as f:
    writer = csv.DictWriter(f, fieldnames=["id", "title", "required_skills", "min_experience", "description"])
    writer.writeheader()
    writer.writerows(jobs)

print(f"Created jobs.csv with {len(jobs)} rows")

# Generate bias samples
biased_masculine = [
    "aggressive", "dominant", "competitive", "assertive", "ninja",
    "rockstar", "guru", "alpha", "maverick", "warrior",
    "he", "his", "him", "man", "men"
]

biased_feminine = [
    "collaborative", "supportive", "nurturing", "compassionate",
    "she", "her", "hers", "woman", "women"
]

neutral_terms = [
    "skilled", "experienced", "proficient", "dedicated", "motivated",
    "analytical", "creative", "detail-oriented", "organized",
    "they", "their", "them", "person", "individual", "candidate",
    "professional", "talented", "capable", "qualified"
]

elite_unis = ["Harvard", "MIT", "Stanford", "Yale", "Princeton", "Cambridge", "Oxford", "Caltech"]
regular_unis = ["State University", "City College", "Regional University", "Technical Institute"]

bias_samples = []
for i in range(500):
    bias_type = random.choice(["gender", "university", "neutral"])

    if bias_type == "gender":
        if random.random() < 0.5:
            word = random.choice(biased_masculine)
            text = f"Looking for an {word} team member to join our engineering group."
            label = 1
        else:
            word = random.choice(biased_feminine)
            text = f"Seeking a {word} professional for our collaborative team."
            label = 1
    elif bias_type == "university":
        if random.random() < 0.5:
            uni = random.choice(elite_unis)
            text = f"Preference for candidates from {uni} or similar top-tier institutions."
            label = 1
        else:
            uni = random.choice(regular_unis)
            text = f"Degree from {uni} or equivalent practical experience required."
            label = 0
    else:
        term = random.choice(neutral_terms)
        text = f"We are looking for a {term} individual to contribute to our projects."
        label = 0

    bias_samples.append({"text": text, "label": label})

with open('datasets/bias_samples.csv', 'w', newline='', encoding='utf-8') as f:
    writer = csv.DictWriter(f, fieldnames=["text", "label"])
    writer.writeheader()
    writer.writerows(bias_samples)

print(f"Created bias_samples.csv with {len(bias_samples)} rows")
print("All datasets generated successfully!")
