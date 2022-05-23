#!/usr/bin/python3
"""This function will create the routes for age API"""
from api.v1.views import views
from flask import make_response, jsonify
from tables import storage
from tables.age import Age


@views.route('/age/<gender>/<activity>/<int:n>', methods=['GET'])
def get_calorie_amount(gender, activity, n):
    """This function will retrieve exact calorie amount"""
    if n > 100 or n < 4:
        return make_response(jsonify({'error': 'Not With In Range'}), 404)

    for age in storage.all(Age).values():
        if age.gender == gender and age.activity_level == activity:
            if age.min_age <= n and n <= age.max_age:
                return age.make_dict()
