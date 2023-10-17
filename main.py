from fastapi import Depends, FastAPI, HTTPException
from sqlalchemy.orm import Session

import repository, models, schemas
from database import SessionLocal, engine

models.Base.metadata.create_all(bind=engine) # Creem la base de dades amb els models que hem definit a SQLAlchemy

app = FastAPI()

# Dependency to get a DB session
def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

@app.get("/")
async def read_root():
    return {"Hello": "World"}


# Get all users
@app.get("/users/")
def read_users(skip: int = 0, limit: int = 0):
    return {"use get_users function from repository"}


# Get user by ID
@app.get("/user/{user_id}")
def read_user(user_id: int):
    return {"use get_user function from repository": user_id}


# Get user by username
@app.get("/userN/{username}")
def read_user(username: str):
    return {"use get_user_by_username function from repository": username}


# Create new user
@app.post("/user")
def create_user(user: str):
    return {"use create_user function from repository"}


# Delete an user by username
@app.delete("/user/{username}")
def delete_user(user: str):
    return {"use delete_user function from repository"}
