from fastapi import Depends, FastAPI, HTTPException
from sqlalchemy.orm import Session

# import repository
import models, schemas
import repository

from database import SessionLocal, engine

models.Base.metadata.create_all(bind=engine)  # Creem la base de dades amb els models que hem definit a SQLAlchemy

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
def read_users(skip: int = 0, limit: int = 10, db: Session = Depends(get_db)):
    return repository.get_users(db, skip=skip, limit=limit)

# Get user by username
@app.get("/userN/{username}", response_model=schemas.User)
def read_user(username: str, db: Session = Depends(get_db)):
    user = repository.get_user_by_username(db, username=username)
    if not user:
        raise HTTPException(status_code=404, detail="User not found")
    return user


# Create new user
@app.post("/user",summary="Create new user", response_model=schemas.User)
def create_user(user: schemas.UserCreate, db: Session = Depends(get_db)):
    db_user = repository.get_user_by_username(db, username=user.username)
    if db_user:
        raise HTTPException(status_code=400, detail="User already exists")
    else:
        return repository.create_user(db=db, user=user)

@app.put('/userN/{username}')
def update_user(username: str, user_update: schemas.UserCreate, db: Session = Depends(get_db)):
    user = repository.get_user_by_username(db, username=username)
    if not user:
        raise HTTPException(status_code=404, detail="User not found")
    updated_user = repository.update_user(db=db, db_user=user, user=user_update)
    return updated_user

# Delete a user by username
@app.delete("/user/{username}")
def delete_user(username: str, db: Session = Depends(get_db)):
    db_user = repository.get_user_by_username(db=db, username=username)
    if db_user:
        repository.delete_user(db=db, db_user=db_user)
        return db_user
    else:
        raise HTTPException(status_code=404, detail="Account not found")