from pydantic import BaseModel


class UserCreate(BaseModel):
    username: str
    password: str


class UserResponse(BaseModel):
    id: int
    username: str

    class Config:
        from_attributes = True


class PredictRequest(BaseModel):
    text: str


class PredictResponse(BaseModel):
    text: str
    score: int
    sentiment: str