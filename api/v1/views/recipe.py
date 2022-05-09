#!/usr/bin/python3
"""This function will create the routes for recipe API"""

from api.v1.views import views
from flask import jsonify, abort, make_response
from tables import storage
from tables.recipe import Recipe

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
    if ids not in recipe_id:
        abort(404)
