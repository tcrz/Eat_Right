#!/usr/bin/python3
"""This function will hold the Age model"""
from sqlalchemy import Column, String, Integer
from tables.basemodel import BaseModel, Base


class Age(BaseModel, Base):
    """A base class for Age model"""
    __tablename__ = "ages"
    min_age = Column(Integer, nullable=False)
    max_age = Column(Integer, nullable=False)
    gender = Column(String(10), nullable=False)
    activity_level = Column(String(45), nullable=False)
    calorie_amount = Column(String(512), nullable=False)
