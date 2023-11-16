from sqlalchemy.orm import Session
import models, schemas


# Get user by his ID
def get_user(db: Session, user_id: int):
    return db.query(models.User).filter(models.User.id == user_id).first()


# Get user by his username
def get_user_by_username(db: Session, username: str):
    return db.query(models.User).filter(models.User.username == username).first()


# Get user by his email
def get_user_by_email(db: Session, email: str):
    return db.query(models.User).filter(models.User.email == email).first()


# Get all users
def get_users(db: Session, skip: int = 0, limit: int = 100):
    return db.query(models.User).offset(skip).limit(limit).all()


# Add new user
def create_user(db: Session, user: schemas.UserCreate):
    db_user = models.User(username=user.username, available_money=user.available_money, email=user.email)
    db_user.password = user.password

    try:
        db.add(db_user)
        db.commit()
        db.refresh(db_user)
        return db_user
    except Exception as e:
        db.rollback()
        return {"message": "An error occurred creating the account.", "error": str(e)}, 500


def update_user(db: Session, db_user: models.User, user: schemas.UserCreate):
    try:
        db_user.username = user.username
        db_user.password = user.password
        db_user.email = user.email
        db_user.available_money = user.available_money
        db.commit()
        db.refresh(db_user)
        return db_user
    except:
        db.rollback()
        return {"message": "An error occurred updating the user."}, 500


# Delete user by username
def delete_user(db: Session, db_user: models.User):
    try:
        db.delete(db_user)
        db.commit()
    except Exception as e:
        db.rollback()
        return {"message": "An error occurred deleting the account.", "error": str(e)}, 500

def get_user_photos(db: Session, db_user: models.User):
    try:
        db_photos = db_user.photos
        return db_photos
    except Exception as e:
        db.rollback()
        return {"message": "An error occurred retrieving the user's photos.", "error": str(e)}, 500


def get_photo(db: Session, photo_id: int):
    return db.query(models.Photo).filter(models.Photo.id == photo_id).first()


def get_photo_by_title(db: Session, title: str):
    return db.query(models.Photo).filter(models.Photo.title == title).first()


def get_photos(db: Session, skip: int = 0, limit: int = 100):
    return db.query(models.Photo).offset(skip).limit(limit).all()


def get_user_by_photo(db: Session, photo: models.Photo):
    return photo.user


def create_photo(db: Session, photo: schemas.PhotoCreate, user_id: str):
    db_photo = models.Photo(url=photo.url, title=photo.title, price=photo.price, user_id=user_id, likes=photo.likes)
    db_user = db.query(models.User).filter(models.User.username == user_id).first()
    try:
        db_user.photos.append(db_photo)
        db.add(db_photo)
        db.commit()
        db.refresh(db_photo)
        return db_photo
    except:
        db.rollback()
        return {"message": "An error occurred inserting the photo."}, 500


def delete_photo(db: Session, photo: models.Photo):
    try:
        db.delete(photo)
        db.commit()
        return photo
    except Exception as e:
        db.rollback()
        return {"message": "An error occurred deleting the photo.", "error": str(e)}, 500


def put_photo(db: Session, photo: models.Photo, photo_2: schemas.PhotoCreate, user_id: str):
    if photo_2.user_id and photo_2.user_id != user_id:
        raise ValueError("No puedes cambiar el usuario asociado a la foto.")
    photo.url = photo_2.url
    photo.title = photo_2.title
    photo.price = photo_2.price
    db.commit()
    db.refresh(photo)
    return photo
