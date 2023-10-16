import enum
from models import sports_list, categories_list
from pydantic import BaseModel, Field
from typing import Optional


'''Ejemplo
class TeamBase(BaseModel):
    name: str
    country: str
    description: Optional[str] = None


class TeamCreate(TeamBase):
    pass


class Team(TeamBase):
    id: int

    class Config:
        orm_mode = True
'''
