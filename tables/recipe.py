#!/usr/bin/python3
"""This function will hold the recipe model"""
from sqlalchemy import Column, String
from tables.basemodel import BaseModel, Base


class Recipe(BaseModel, Base):
    """A base class for recipemodels"""
    __tablename__ = "recipes"
    name = Column(String(128), nullable=False)
    user_name = Column(String(128), nullable=False)
    ingredients = Column(String(32000), nullable=False)
    preparation = Column(String(32000), nullable=False)
