#!/usr/bin/python3
"""This script will create a Blueprint for the project"""

from flask import Blueprint

views = Blueprint('views', __name__, url_prefix='/api/v1')

from api.v1.views.recipe import *
