#!/usr/bin/python3
"""This script will contain the flask instance"""
from api.v1.views import views
from flask import Flask, make_response, jsonify
from flask_cors import CORS, cross_origin
import os
from tables import storage

app = Flask(__name__)
app.register_blueprint(views)
CORS(app, resources={r"/api/v1/*": {"origins": "*"}})


@app.errorhandler(404)
def error(error):
    """This function will handle errors"""
    return make_response(jsonify({'error': 'Not Found'}), 404)


@app.teardown_appcontext
def close(exception):
    """This function will close a session"""
    storage.close()


if __name__ == "__main__":
    app.run(host=os.getenv('api_host'), port=os.getenv('port'),
            threaded=True, debug=True)
