from sqlalchemy import Boolean, MetaData, Column, ForeignKey, Integer, String, Date, Float, Enum, UniqueConstraint, \
    Table, DateTime
from sqlalchemy.orm import relationship

from database import Base

class User(Base):
    __tablename__ = 'users'
    username = Column(String(24), primary_key=True, unique=True, nullable=False)
    password = Column(String(), nullable=False)
    available_money = Column(Float, nullable=False)

#   photos = relationship('Photo', back_populates='user')
    def __init__(self, username, available_money):
        self.username = username
        self.available_money = available_money