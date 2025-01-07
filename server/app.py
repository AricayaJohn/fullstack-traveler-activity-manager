#!/usr/bin/env python3

from flask import request, session
from flask_sqlalchemy import SQLAlchemy
from flask_restful import Resource
from config import app, db, api, bcrypt
from models import Traveler

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
        db.session.add(traveler)
        db.session.commit()
        return traveler.to_dict(), 201

api.add_resource(Signup, '/signup', endpoint='signup')

class Login(Resource):
    def post(self):
        username = request.get_json()['username']
        password = request.get_json()['password']

        traveler = Traveler.query.filter(Traveler.username == username).first()

        if traveler and traveler.authenticate(password):
            session['traveler_id'] = traveler.id
            return traveler.to_dict(), 200
        return {'error': 'Unauthorized log in'}, 401

api.add_resource(Login, '/login', endpoint='/login')

class ClearSession(Resource):
    def delete(self):
        session['page_views'] = None
        session['traveler_id'] = None

        return {}, 204

api.add_resource(ClearSession, '/clear', endpoint='clear')

class CheckSession(Resource):
    def get(self):
        if session.get('traveler_id'):
            traveler = Traveler.query.filter(Traveler.id == session['traveler_id']).first()
            return traveler.to_dict(), 200
        return {}, 204

api.add_resource(CheckSession, '/check_session', endpoint='check_session')

class Logout(Resource):
    def delete(self):
        session['traveler_id'] = None
        return {}, 204

api.add_resource(Logout, '/logout', endpoint='logout')


if __name__ == '__main__':
    app.run(port=5555, debug=True)

