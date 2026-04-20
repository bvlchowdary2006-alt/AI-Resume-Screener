FROM python:3.10-slim

WORKDIR /app

# Install system dependencies
RUN apt-get update && apt-get install -y \
    build-essential \
    libssl-dev \
    libffi-dev \
    python3-dev \
    curl \
    && rm -rf /var/lib/apt/lists/*

# Copy only requirements to leverage Docker cache
COPY requirements.txt .

# Upgrade pip and install CPU-only PyTorch + requirements
RUN pip install --no-cache-dir --upgrade pip && \
    pip install --no-cache-dir --default-timeout=100 torch --index-url https://download.pytorch.org/whl/cpu && \
    pip install --no-cache-dir --default-timeout=100 -r requirements.txt

# Download spacy model
RUN python -m spacy download en_core_web_sm

# Copy project files
COPY . .

EXPOSE 8000

# Use uvicorn with workers for better performance
CMD ["uvicorn", "app.main:app", "--host", "0.0.0.0", "--port", "8000", "--workers", "1"]
