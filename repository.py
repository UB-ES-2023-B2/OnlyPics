from sqlalchemy.orm import Session
import models, schemas

'''Ejemplos
def get_team(db: Session, team_id: int):
    return db.query(models.Team).filter(models.Team.id == team_id).first()

def get_team_by_name(db: Session, name: str):
    return db.query(models.Team).filter(models.Team.name == name).first()

def get_teams(db: Session, skip: int = 0, limit: int = 100):
    return db.query(models.Team).offset(skip).limit(limit).all()

def create_team(db: Session, team: schemas.TeamCreate):
    db_team = models.Team(name=team.name, country=team.country, description=team.description)
    db.add(db_team)
    db.commit()
    db.refresh(db_team)
    return db_team
'''

# Get user by his ID
def get_user(db: Session, user_id: int):
    return db.query(models.User).filter(models.User.id == user_id).first()


# Get user by his username
def get_user_by_username(db: Session, username: str):
    return db.query(models.User).filter(models.User.username == username).first()


# Get all users
def get_users(db: Session, skip: int = 0, limit: int = 100):
    return db.query(models.User).offset(skip).limit(limit).all()


# Add new user
def create_user(db: Session, user: schemas.UserCreate):
    db_user = models.User(username=user.username, available_money=user.available_money)
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
