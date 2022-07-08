#!/usr/bin/python3
"""This script will create the routes for age API"""
from api.v1.views import views
from flask import make_response, jsonify
from tables import storage
from tables.age import Age


@views.route('/age/<gender>/<activity>/<int:digit>', methods=['GET'])
def get_calorie_amount(gender, activity, digit):
    """This function will retrieve exact calorie amount"""
    if digit > 100 or digit < 4:
        return make_response(jsonify({'error': 'Not With In Range'}), 404)

    for age in storage.all(Age).values():
        if age.gender == gender and age.activity_level == activity:
            if age.min_age <= digit and digit <= age.max_age:
                return jsonify(age.make_dict())
