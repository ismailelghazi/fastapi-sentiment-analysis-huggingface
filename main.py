from fastapi import FastAPI
from starlette.middleware.cors import CORSMiddleware

from core.database import Base, engine
from routes import auth, predict
app = FastAPI()
# Add CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],
    allow_methods=["*"],
    allow_headers=["*"],
)
# Create tables
Base.metadata.create_all(bind=engine)

# Include routes
app.include_router(auth.router)
app.include_router(predict.router)

@app.get("/")
def root():
    return {"message": "Sentiment API running"}
