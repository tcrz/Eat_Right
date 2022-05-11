#!/usr/bin/python3
"""THis script will be able to run a flask application"""
from flask import Flask, render_template
from tables import storage
from tables.recipe import Recipe

app = Flask(__name__)


@app.teardown_appcontext
def close(error):
    """THis function will close Session """
    storage.close()

@app.route('/', strict_slashes=False)
def show_html():
    """This function will just show the html"""
    recipes = storage.all(Recipe)
    return render_template('eatright.html', recipes=recipes)


if __name__ == "__main__":
    app.run(host='0.0.0.0', port=5000)
