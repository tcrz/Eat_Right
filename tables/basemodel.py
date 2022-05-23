#!/usr/bin/python3
"""This function will hold the basemodel"""
from datetime import datetime
from sqlalchemy import Column, DateTime, String
from sqlalchemy.ext.declarative import declarative_base
import uuid

Base = declarative_base()


class BaseModel:
    """A base class for all eat_right models"""
    id = Column(String(60), nullable=False, primary_key=True)
    created_at = Column(DateTime, default=datetime.utcnow, nullable=False)

    def __init__(self, *args, **kwargs):
        """Instatntiates a new model"""
        self.id = str(uuid.uuid4())
        self.created_at = datetime.now()
        if len(kwargs) != 0:
            for key, value in kwargs.items():
                setattr(self, key, value)

    def save(self):
        """This function will save the instance in storage"""
        from tables import storage
        storage.new(self)
        storage.save()

    def make_dict(self):
        """This function will change the content of dict value of instance
           and save it in a different dictionary
        """
        dictionary = {}
        dictionary.update(self.__dict__)
        if '_sa_instance_state' in dictionary:
            del dictionary['_sa_instance_state']
        dictionary['created_at'] = self.created_at.isoformat()
        return dictionary
