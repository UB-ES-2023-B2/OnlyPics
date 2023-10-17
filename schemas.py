import enum
from pydantic import BaseModel, Field, validator
from typing import Optional

class UserBase(BaseModel):
    username: str = Field(..., description="username", max_length=24)
    password: str = Field(..., min_length=8, description="user password")
    available_money: float

    @validator("password")
    def validate_password(cls, value):
        # Check if the username contains at least one uppercase letter
        if not any(char.isupper() for char in value):
            raise ValueError("Password must contain at least one uppercase letter")

        # Check if the username contains at least one special character
        if not any(char in "!@#$%^&*().,;`+<>" for char in value):
            raise ValueError("Password must contain at least one special character")

        return value


class UserCreate(UserBase):
    pass


class User(UserBase):
    class Config:
        from_attributes = True
class PhotoBase(BaseModel):
    url: str
    title: str
    price: int

class PhotoCreate(PhotoBase):
    pass

class Photo(PhotoBase):
    id: int
    user_id: str

    class Config:
        from_attributes = True