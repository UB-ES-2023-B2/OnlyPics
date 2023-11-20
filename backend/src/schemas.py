import enum
from pydantic import BaseModel, Field, validator
import re
from typing import Optional, List
#from datetime import date

class PhotoBase(BaseModel):
    user_id: str
    url: str
    title: str
    price: int
    likes: int
    """2@validator("url")
    def validate_photo_url(cls, value):
        # Regular expression pattern for a valid image URL
        image_url_pattern = r'\.(jpg|jpeg|png|gif|bmp|tiff)$'

        # Use re.search to check if the URL matches the pattern
        if not re.search(image_url_pattern, value, re.IGNORECASE):
            raise ValueError("Invalid image URL format. Supported formats: jpg, jpeg, png, gif, bmp, tiff")

        return value"""


class PhotoCreate(PhotoBase):
    pass


class Photo(PhotoBase):
    id: int

    class Config:
        from_attributes = True


class UserBase(BaseModel):
    username: str = Field(..., description="username", max_length=24)
    password: str = Field(..., min_length=8, description="user password")
    email: str = Field(..., description="email")
    available_money: float
    photos: List[Photo] = []  # Add the 'photos' attribute
    #name: str
    #lastname: str
    #biography: str
    #profile_pic: Photo
    #birthDate: date


    @validator("password")
    def validate_password(cls, value):
        # Check if the username contains at least one uppercase letter
        if not any(char.isupper() for char in value):
            raise ValueError("Password must contain at least one uppercase letter")

        # Check if the username contains at least one special character
        if not any(char in "!@#$%^&*().,;`+<>" for char in value):
            raise ValueError("Password must contain at least one special character")

        return value

    @validator("email")
    def is_valid_email(cls, value):
        # Regular expression pattern for a valid email address
        pattern = r"^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$"

        # Use re.match to check if the email matches the pattern
        if not re.match(pattern, value):
            raise ValueError("Invalid email address.")

        return value


class UserCreate(UserBase):
    pass


class User(UserBase):
    class Config:
        from_attributes = True

