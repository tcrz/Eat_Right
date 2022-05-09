#!/usr/bin/python3
"""This scripe will contain the flask instance"""
from flask import Flask, make_response, jsonify
from tables import storage
from api.v1.views import views
import os

app = Flask(__name__)
app.register_blueprint(views)

@app.errorhandler(404)
def error(error):
    """This function will handle errors"""
    return make_response(jsonify({'error': 'Not Found'}), 404)

@app.teardown_appcontext
def close(exception):
    """This function will close a session"""
    storage.close()


if __name__ == "__main__":
    app.run(host=os.getenv('api_host'), port=os.getenv('port'), threaded=True)
    
