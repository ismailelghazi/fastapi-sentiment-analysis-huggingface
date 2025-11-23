from fastapi import APIRouter, Depends, HTTPException
from fastapi.security import OAuth2PasswordBearer
import os
import requests
from dotenv import load_dotenv
from core.auth import verify_token

load_dotenv()

router = APIRouter(prefix="/predict", tags=["Predict"])
oauth2_scheme = OAuth2PasswordBearer(tokenUrl="auth/login")

# HuggingFace configuration
HF_API_KEY = os.getenv("HF_API_KEY")
HF_URL = "https://router.huggingface.co/hf-inference/models/nlptown/bert-base-multilingual-uncased-sentiment"

headers = {
    "Authorization": f"Bearer {HF_API_KEY}"
}


def query(payload: dict):
    """ Simple wrapper to call HuggingFace API """
    response = requests.post(HF_URL, headers=headers, json=payload)
    return response.json()


@router.post("/")
async def predict_sentiment(text: str, token: str = Depends(oauth2_scheme)):
    """Analyse le sentiment du texte donné"""

    # Vérifier le token JWT
    username = verify_token(token)
    if not username:
        raise HTTPException(status_code=401, detail="Token invalide ou expiré")

    # Vérifier la clé API
    if not HF_API_KEY:
        raise HTTPException(status_code=500, detail="HF_API_KEY manquante dans .env")

    # Appel HuggingFace
    result = query({"inputs": text})

    return {
        "user": username,
        "text": text,
        "huggingface_raw": result
    }