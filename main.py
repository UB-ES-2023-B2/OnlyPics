from fastapi import Depends, FastAPI, HTTPException
from sqlalchemy.orm import Session

# import repository
import models, schemas
import repository

from database import SessionLocal, engine
from fastapi.middleware.cors import CORSMiddleware
from fastapi import FastAPI, Request
from fastapi.templating import Jinja2Templates
from fastapi.staticfiles import StaticFiles

models.Base.metadata.create_all(bind=engine)  # Creem la base de dades amb els models que hem definit a SQLAlchemy

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=[""],
    allow_credentials=True,
    allow_methods=[""],
    allow_headers=["*"],
)

app.mount("/static", StaticFiles(directory="frontend/dist/static"), name="static")


# Dependency to get a DB session
def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()


templates = Jinja2Templates(directory="frontend/dist")


@app.get("/")
async def serve_index(request: Request):
    return templates.TemplateResponse("index.html", {"request": request})


@app.get("/login")
async def login(request: Request):
    return templates.TemplateResponse("index.html", {"request": request})


@app.get("/signup")
async def signup(request: Request):
    return templates.TemplateResponse("index.html", {"request": request})


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


# Get user by email
@app.get("/userN/{email}", response_model=schemas.User)
def read_user(email: str, db: Session = Depends(get_db)):
    user = repository.get_user_by_email(db, email=email)
    if not user:
        raise HTTPException(status_code=404, detail="Email not found")
    return user


# Create new user
@app.post("/user", summary="Create new user", response_model=schemas.User)
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


@app.get("/photos/")
def read_photos(skip: int = 0, limit: int = 100, db: Session = Depends(get_db)):
    return repository.get_photos(db, skip=skip, limit=limit)


@app.get("/photos/{photo_title}", response_model=schemas.Photo)
def read_photo_by_title(photo_title: str, db: Session = Depends(get_db)):
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


@app.post("/photos/")
def create_photo(photo: schemas.PhotoCreate, user_id: str, db: Session = Depends(get_db)):
    db_photo = repository.get_photo_by_title(db, title=photo.title)
    if db_photo:
        raise HTTPException(status_code=400, detail="Photo already Exists, Use put for updating")
    return repository.create_photo(db=db, photo=photo, user_id=user_id)


@app.delete("/photos/{photo_id}/", response_model=schemas.Photo)
def delete_photo(photo_id: int, db: Session = Depends(get_db)):
    photo = repository.get_photo(db, photo_id)
    if not photo:
        raise HTTPException(status_code=404, detail="Photo not found")
    repository.delete_photo(db, photo)
    return "Photo deleated"


@app.put("/photos/{photo_id}/", response_model=schemas.Photo)
def update_photo(photo_id: int, photo_update: schemas.PhotoBase, user_id: str, db: Session = Depends(get_db)):
    photo = repository.get_photo(db, photo_id)
    if photo:
        return repository.update_photo(db, photo=photo, photo_update=photo_update, user_id=user_id)
    else:
        return repository.create_photo(db=db, photo=photo, user_id=user_id)
