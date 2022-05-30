#!/usr/bin/python3
"""This script will be able to run a flask application"""
from flask import Flask, render_template, request
from tables import storage
from tables.recipe import Recipe
import uuid

app = Flask(__name__)


@app.teardown_appcontext
def close(error):
    """This function will close Session """
    storage.close()


@app.route('/', strict_slashes=False)
def show_html():
    """This function will show the webpage"""
    recipes = storage.all(Recipe)
    return render_template('eatright.html', recipes=recipes,
                           cache_id=uuid.uuid4())


if __name__ == "__main__":
    app.run(host='0.0.0.0', port=5000, debug=True)
