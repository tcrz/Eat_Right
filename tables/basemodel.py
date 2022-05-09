#!/usr/bin/python3
"""This function will hold the basemodel"""
import uuid
from datetime import datetime
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy import Column, DateTime, String

Base = declarative_base()


class BaseModel:
    """A base class for all eat_right models"""
    id = Column(String(60), nullable=False, primary_key=True)
    created_at = Column(DateTime, default=datetime.utcnow, nullable=False)

    def __init__(self):
        """Instatntiates a new model"""
        self.id = str(uuid.uuid4())
        self.created_at = datetime.now()

    def make_dict(self):
        """THis function will change the content of dict value of instance"""
        dictionary = {}
        dictionary.update(self.__dict__)
        if '_sa_instance_state' in dictionary:
            del  dictionary['_sa_instance_state']
        dictionary['created_at'] = self.created_at.isoformat()
        return dictionary
