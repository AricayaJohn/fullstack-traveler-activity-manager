#!/usr/bin/env python3

# Remote library imports
from flask import request
from flask_sqlalchemy import SQLAlchemy

# Local imports
from config import app, db, api, bcrypt

# Add your model imports
from models import Traveler

# Views go here!

@app.route('/')
def index():
    return '<h1>Project Server</h1>'


if __name__ == '__main__':
    app.run(port=5555, debug=True)

