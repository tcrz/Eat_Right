#!/usr/bin/python3
"""This will contain the class StorageHandler"""
import os
from random import shuffle
from sqlalchemy import create_engine
from sqlalchemy.orm import scoped_session, sessionmaker
from tables.basemodel import Base
from tables.recipe import Recipe
from tables.age import Age
# database_filename = "eat_right.db"
# project_dir = os.path.dirname(os.path.abspath(__file__))
DB_NAME = os.getenv('DB_NAME', 'eatright')
DB_HOST = os.getenv('DB_HOST', '127.0.0.1:5432')
DB_USER = os.getenv('DB_USER', 'postgres')
DB_PASSWORD = os.getenv('DB_PASSWORD', 'postgres')
DB_PATH = 'postgresql://{}:{}@{}/{}'.format(DB_USER, DB_PASSWORD, DB_HOST, DB_NAME)



class StorageHandler:
    """This class will handle storage portion"""
    __engine = None
    __session = None

    def __init__(self):
        """This function will initialize the engine"""
        # self.__engine = create_engine('sqlite:///{}:{}@{}:3306/{}'
        #                               .format(os.getenv('user', 'eat_right_devs'),
        #                                       os.getenv('password', 'eat_right_dev_pwd'),
        #                                       os.getenv('host', 'localhost'),
        #                                       os.getenv('database', 'eat_right_db')),
        #                               pool_pre_ping=True)
        # self.__engine = create_engine("sqlite:///{}".format(os.path.join(project_dir, database_filename)))
        # self.__engine = create_engine("postgresql://jdrawklfmnnlbr:6678da66f7f342f89e7be361942264bcda13ad39062622408df939a768694a48@ec2-44-209-186-51.compute-1.amazonaws.com:5432/d575a3ogarpq4d")
        self.__engine = create_engine(DB_PATH)

    def all(self, cls=None):
        """This function will query the database and gives a dictionary"""
        new_dict = {}
        if cls:
            for value in self.__session.query(cls).all():
                key = type(value).__name__ + '.' + value.id
                new_dict[key] = value
        return new_dict

    def shuff(self, cls=None):
        """This function will return random recipes"""
        all_data = self.all(cls)
        keys = list(all_data.keys())
        shuffle(keys)
        shuffled = dict()
        for key in keys:
            shuffled.update({key: all_data[key]})
        return shuffled

    def search(self, key):
        """This function will search a recipe based on it's name"""
        dic = {}
        recipes = self.__session.query(Recipe).filter(
            Recipe.name.ilike('{}%'.format(key))).order_by(Recipe.name).all()
        for recipe in recipes:
            k = recipe.name
            dic[k] = recipe.make_dict()
        return dic

    def new(self, obj):
        """This function will add new value to database"""
        self.__session.add(obj)

    def save(self):
        """This will save a new value to database"""
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
        """This function will delete a value from database"""
        if obj is not None:
            self.__session.delete(obj)
