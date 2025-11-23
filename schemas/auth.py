from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from passlib.context import CryptContext
from core.database import get_db
from core.auth import create_access_token
from models.user import User
from schemas.user import UserCreate

router = APIRouter(prefix="/auth", tags=["Auth"])
pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")


@router.post("/register")
def register(user: UserCreate, db: Session = Depends(get_db)):
    """Créer un nouveau compte"""
    # Vérifier si l'utilisateur existe
    if db.query(User).filter(User.username == user.username).first():
        raise HTTPException(status_code=400, detail="Username existe déjà")

    # Créer l'utilisateur
    new_user = User(
        username=user.username,
        password=pwd_context.hash(user.password)
    )
    db.add(new_user)
    db.commit()

    return {"message": "Compte créé", "username": new_user.username}


@router.post("/login")
def login(user: UserCreate, db: Session = Depends(get_db)):
    """Se connecter et obtenir un token"""
    # Trouver l'utilisateur
    db_user = db.query(User).filter(User.username == user.username).first()

    # Vérifier username et password
    if not db_user or not pwd_context.verify(user.password, db_user.password):
        raise HTTPException(status_code=401, detail="Username ou password incorrect")

    # Créer le token JWT
    token = create_access_token({"sub": db_user.username})
    return {"access_token": token, "token_type": "bearer"}