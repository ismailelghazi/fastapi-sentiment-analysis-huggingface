# Sentiment Analysis Backend API

This project is a **FastAPI backend** for a sentiment analysis application. It uses **PostgreSQL** for data storage and **JWT authentication** for secure endpoints. The API can analyze text sentiments using an external model (e.g., Hugging Face API).

---

## Table of Contents

- [Features](#features)  
- [Tech Stack](#tech-stack)  
- [Environment Variables](#environment-variables)  
- [Docker Setup](#docker-setup)  
- [Running Tests](#running-tests)  
- [API Endpoints](#api-endpoints)  
- [Contributing](#contributing)  
- [License](#license)  

---

## Features

- User registration and login with JWT authentication  
- PostgreSQL database integration  
- Password hashing with bcrypt  
- Sentiment analysis endpoint  
- Fully Dockerized backend  

---

## Tech Stack

- **Backend:** Python 3.11, FastAPI  
- **Database:** PostgreSQL  
- **Authentication:** JWT  
- **ORM:** SQLAlchemy  
- **Password Hashing:** bcrypt  
- **Containerization:** Docker & Docker Compose  
- **Testing:** pytest, FastAPI TestClient  

---
2. Create and activate virtual environment
```
python -m venv .venv
source .venv/bin/activate  # Linux / Mac
.venv\Scripts\activate     # Windows
```
3. Install dependencies:
```
pip install -r requirements.txt
```
4. Create a .env file in the root directory:
```
POSTGRES_USER=postgres
POSTGRES_PASSWORD=yourpassword
POSTGRES_SERVER=db
POSTGRES_PORT=5432
POSTGRES_DB=sentimentdb

SECRET_KEY=your_secret_key
ALGORITHM=HS256
ACCESS_TOKEN_EXPIRE_MINUTES=60

HF_API_KEY=your_huggingface_api_key
```
## Docker Setup

   1. Build and run containers:
  ```
  docker-compose up --build
  ```
  2. Access backend API:
    FastAPI will run on ```http://localhost:8000```.

  3. Stop containers:
  ```
  docker-compose down
  ```
