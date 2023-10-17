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
def read_root():
    return {"Hello": "World"}

@app.get("/photos/", response_model=list[schemas.Photo])
def read_photos(skip: int = 0, limit: int = 10, db: Session = Depends(get_db)):
    return repository.get_photos(db, skip=skip, limit=limit)

@app.get("/photos/{photo_title}", response_model=schemas.Photo)
def read_photo_by_title(photo_title: str,db: Session = Depends(get_db)):
    photo = repository.get_photo_by_title(db, photo_title=photo_title)
    if not photo:
        raise HTTPException(status_code=404, detail="Photo not found")
    return photo

@app.get("/photos/{photo_id}/", response_model=schemas.Photo)
def read_photo_by_id(photo_id: int, db: Session = Depends(get_db)):
    photo = repository.get_photo(db, photo_id=photo_id)
    if not photo:
        raise HTTPException(status_code=404, detail="Photo not found")
    return photo

@app.post("/photos/", response_model=schemas.Photo)
def create_photo(photo: schemas.PhotoCreate, user_id: str, db: Session = Depends(get_db)):
    db_photo = repository.get_photo_by_title(db, title=photo.title)
    if db_photo:
        raise HTTPException(status_code=404, detail="Photo already Exists, Use put for updating")
    return repository.create_photo(db=db, photo=photo, user_id=user_id)

@app.delete("/photos/{photo_id}/", response_model=schemas.Photo)
def delete_photo(photo_id: int, db: Session = Depends(get_db)):
    photo = repository.get_photo(db, photo_id)
    if not photo:
        raise HTTPException(status_code=404, detail="Photo not found")
    repository.delete_photo(db,photo)
    return "Photo deleated"

@app.put("/photos/{photo_id}/", response_model=schemas.Photo)
def update_photo(photo_id: int, photo_update: schemas.PhotoBase, user_id: str, db: Session = Depends(get_db)):
    photo = repository.get_photo(db, photo_id)
    if photo:
        return repository.update_photo(db, photo=photo, photo_update=photo_update, user_id=user_id)
    else:
        return repository.create_photo(db=db, photo=photo, user_id=user_id)