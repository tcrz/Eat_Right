#!/usr/bin/python3
"""This will contain the class StorageHandler"""

from tables.basemodel import Base
import os
from sqlalchemy import create_engine
from sqlalchemy.orm import scoped_session, sessionmaker


class StorageHandler:
    """This function will handle functions related to storage"""
    __engine = None
    __session = None

    def __init__(self):
        """This function will initialize the engine"""
        self.__engine = create_engine('mysql+mysqldb://{}:{}@{}:3306/{}'
                                      .format(os.getenv('user'),
                                              os.getenv('password'),
                                              os.getenv('host'),
                                              os.getenv('database')),
                                      pool_pre_ping=True)

    def all(self, cls=None):
        """This function will query the dtabase and gives a dictionary"""
        new_dict = {}
        if cls:
            for value in self.__session.query(cls).all():
                key = type(value).__name__ + '.' + value.id
                new_dict[key] = value
        return new_dict

    def new(self, obj):
        """THis function will add new value to database"""
        self.__session.add(obj)
	
    def save(self):
        """THis will save a new value to database"""
        self.__session.commit()

    def reload(self):
        """This function will launch the database"""
        Base.metadata.create_all(self.__engine)
        session_factory = sessionmaker(bind=self.__engine)
        Session = scoped_session(session_factory)
        self.__session = Session()

    def close(self):
        """This function will close a session"""
        self.__session.close()
        self.reload()

    def delete(self, obj=None):
        """This function will delete an value from database"""
        if obj is not None:
            self.__session.delete(obj)
