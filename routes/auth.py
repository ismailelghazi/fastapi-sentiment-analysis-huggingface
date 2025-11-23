from fastapi import APIRouter, Depends, HTTPException, Form
from sqlalchemy.orm import Session
import bcrypt
from core.database import get_db
from core.auth import create_access_token
from models.user import User
from schemas.user import UserCreate

router = APIRouter(prefix="/auth", tags=["Auth"])


def hash_password(password: str) -> str:
    """Hash le password avec bcrypt"""
    return bcrypt.hashpw(password.encode('utf-8'), bcrypt.gensalt()).decode('utf-8')


def verify_password(plain_password: str, hashed_password: str) -> bool:
    """Vérifie le password"""
    return bcrypt.checkpw(plain_password.encode('utf-8'), hashed_password.encode('utf-8'))


@router.post("/register")
def register(user: UserCreate, db: Session = Depends(get_db)):
    if db.query(User).filter(User.username == user.username).first():
        raise HTTPException(status_code=400, detail="Username existe déjà")

    new_user = User(
        username=user.username,
        password=hash_password(user.password)
    )
    db.add(new_user)
    db.commit()

    return {"message": "Compte créé", "username": new_user.username}


@router.post("/login")
def login(
        username: str = Form(...),
        password: str = Form(...),
        db: Session = Depends(get_db)
):
    # Trouver user
    db_user = db.query(User).filter(User.username == username).first()

    # Vérifier
    if not db_user or not verify_password(password, db_user.password):
        raise HTTPException(status_code=401, detail="Username ou password incorrect")

    # Créer token
    token = create_access_token({"sub": db_user.username})
    return {"access_token": token, "token_type": "bearer"}