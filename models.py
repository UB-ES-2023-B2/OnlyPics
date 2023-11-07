from sqlalchemy import Boolean, MetaData, Column, ForeignKey, Integer, String, Date, Float, Enum, UniqueConstraint, \
    Table, DateTime
from sqlalchemy.orm import relationship

from database import Base


class User(Base):
    __tablename__ = 'users'
    username = Column(String(15), primary_key=True, unique=True, nullable=False)
    email = Column(String(), unique=True, nullable=False)
    password = Column(String(), nullable=False)
    available_money = Column(Float, nullable=False)
    name = Column(String(15), nullable=False)
    lastname = Column(String(20), nullable=False)
    biography = Column(String(500), nullable=False)
    profile = Column('Photo', nullable=False)
    photos = relationship('Photo', back_populates ='user')
    birthDate = Column(DateTime, nullable=False)


    def __init__(self, username, email, available_money=0):
        self.username = username
        self.available_money = available_money
        self.email = email


class Photo(Base):
    __tablename__ = 'photos'

    id = Column(Integer, primary_key=True)
    url = Column(String(30), unique=True)
    title = Column(String(30))
    price = Column(Integer)
    user_id = Column(String, ForeignKey('users.username'), nullable=False)
    user = relationship('User', back_populates='photos')

