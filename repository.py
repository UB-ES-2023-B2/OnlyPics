from sqlalchemy.orm import Session
import models, schemas


def get_photo(db: Session, photo_id: int):
    return db.query(models.Photo).filter(models.Photo.id == photo_id).first()

def get_photo_by_title(db: Session, title: str):
    return db.query(models.Photo).filter(models.Photo.title == title).first()

def get_photos(db: Session, skip: int = 0, limit: int = 100):
    return db.query(models.Photo).offset(skip).limit(limit).all()

def get_user_by_photo(db: Session, photo: models.Photo):
    return photo.user

def create_photo(db: Session, photo: schemas.PhotoCreate, user_id: str):
    db_photo = models.Photo(url=photo.url, title=photo.title, price=photo.price, user_id=user_id)
    try:
        db.add(db_photo)
        db.commit()
        db.refresh(db_photo)
        return db_photo
    except:
        db.rollback()
        return {"message": "An error occurred inserting the photo."}, 500
        
def delete_photo(db: Session, photo: models.Photo):
    db.query(models.Photo).filter(models.Photo.id == photo.id).delete()
    db.commit()

def put_photo(db: Session, photo: models.Photo, photo_2: schemas.PhotoCreate, user_id: str):
    if photo_2.user_id and photo_2.user_id != user_id:
        raise ValueError("No puedes cambiar el usuario asociado a la foto.")
    photo.url = photo_2.url
    photo.title = photo_2.title
    photo.price = photo_2.price
    db.commit()
    db.refresh(photo)
    return photo





