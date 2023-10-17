from fastapi import Depends, FastAPI, HTTPException
from sqlalchemy.orm import Session

#import repository, models, schemas
from database import SessionLocal, engine

#models.Base.metadata.create_all(bind=engine) # Creem la base de dades amb els models que hem definit a SQLAlchemy

app = FastAPI()

# Dependency to get a DB session
"""def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()"""

@app.get("/")
async def read_root():
    return {"Hello": "World"}