#!/usr/bin/python3
"""This function will hold the recipe model"""
from sqlalchemy import Column, String
from tables.basemodel import BaseModel, Base


class Recipe(BaseModel, Base):
    """A base class for recipe model"""
    __tablename__ = "recipes"
    name = Column(String(128), nullable=False)
    user_name = Column(String(128), nullable=False)
    ingredients = Column(String(32000), nullable=False)
    preparation = Column(String(32000), nullable=False)
    filename = Column(String(200), nullable=False)
    mimetype = Column(String(10), nullable=False)
    category = Column(String(20), nullable=False)
