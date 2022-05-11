#!/usr/bin/python3
"""This function will create the routes for recipe API"""

from api.v1.views import views
from api.v1.app import app
from flask import jsonify, abort, make_response, request, send_from_directory
from tables import storage
from tables.recipe import Recipe
from werkzeug.utils import secure_filename
import os

UPLOAD_FOLDER = 'web_dynamic/static/images'
ALLOWED_EXTENSIONS = {'png', 'jpg', 'jpeg'}
app.config['UPLOAD_FOLDER'] = UPLOAD_FOLDER
app.config['MAX_CONTENT_LENGTH'] = 16 * 1024 * 1024


@views.route('/recipe', methods=['GET'])
def all_recipes():
    """This function will retrieve all recipes"""
    recipe_list = []
    for recipe in storage.all(Recipe).values():
        recipe_list.append(recipe.make_dict())
    return jsonify(recipe_list)

@views.route('/recipe/<ids>', methods=['GET'])
def find_recipe(ids):
    """This function will retrieve one recipe"""
    recipe_id = []
    for recipe in storage.all(Recipe).values():
        recipe_id.append(recipe.id)
        if (ids == recipe.id):
            return recipe.make_dict()
    if ids not in recipe_id:
        return abort(404)

@views.route('/recipe/<ids>', methods=['DELETE'])
def delete_recipe(ids):
    """This function will delete a recipe"""
    recipe_id = []
    for recipe in storage.all(Recipe).values():
        recipe_id.append(recipe.id)
        if ids == recipe.id:
            storage.delete(recipe)
            storage.save()
            return {}, 200
    if ids not in recipe_id:
        abort(404)

def allowed_file(filename):
        return '.' in filename and filename.rsplit('.', 1)[1].lower() in ALLOWED_EXTENSIONS

@views.route('/recipe/', methods=['POST'])
def add_recipe():
    """This function will add to database the content of form"""
    img = request.files['img']
    filename = secure_filename(img.filename)
    if img and allowed_file(img.filename):
        path = os.path.join(app.config['UPLOAD_FOLDER'], filename)
        img.save(path)
    user_name = request.form.get("username")
    name = request.form.get("recipe-name")
    ingredients = request.form.get("ingredients")
    preparation = request.form.get("preparation")
    mimetype = img.mimetype
    new_dict = {'name': name, 'user_name': user_name, 'ingredients': ingredients, 'preparation': preparation, 'filename': filename, 'mimetype': mimetype}
    recipe = Recipe(**new_dict)
    recipe.save()
    return jsonify('Result has been submitted'), 201
