from sqlalchemy import create_engine
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker
import os


#SQLALCHEMY_DATABASE_URL = "sqlite:///./data.db"
SQLALCHEMY_DATABASE_URL = os.getenv("DATABASE_URL")
#SQLALCHEMY_DATABASE_URL = "postgresql://postgres:postgres@db:5432/appdb"


engine = create_engine(
    SQLALCHEMY_DATABASE_URL)
# check_same_thread...is needed only for SQLite. It's not needed for other databases.
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

Base = declarative_base()