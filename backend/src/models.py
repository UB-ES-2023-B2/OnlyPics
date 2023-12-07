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
    name = Column(String(20), nullable=True)
    lastname = Column(String(20), nullable=True)
    biography = Column(String(150), nullable=True)
    date_birth = Column(Date, nullable=True)
    profile_pic = Column(String(50), nullable=True)

    photos = relationship('Photo', back_populates='user')

    def __init__(self, username, email, name, lastname, biography, date_birth, profile_pic, available_money=0,):
        self.username = username
        self.available_money = available_money
        self.email = email
        self.name = name
        self.lastname = lastname
        self.biography = biography
        self.date_birth = date_birth
        self.profile_pic = profile_pic


class Photo(Base):
    __tablename__ = 'photos'

    id = Column(Integer, primary_key=True)
    url = Column(String(120), unique=True)
    title = Column(String(30))
    price = Column(Integer)
    likes = Column(Integer)

    user_id = Column(String, ForeignKey('users.username'), nullable=False)
    user = relationship('User', back_populates='photos')

    def __init__(self, url, title, price, user_id, likes):
        self.url = url
        self.title = title
        self.price = price
        self.likes = likes
        self.user_id = user_id
