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

class Signup(Resource):
    def post(self):
        data = request.get_json()

        traveler = Traveler(
            username = data['username'],
            password_hash = data['password'],
            age = data['age'],
            email = data['email'],
            interests = data['interests'],
            favorite_season = data['favorite_season']
        )
        db.session.add(user)
        db.session.commit()
        return user.to_dict(), 201

api.add_resource(Signup, '/signup', endpoint='signup')

if __name__ == '__main__':
    app.run(port=5555, debug=True)

