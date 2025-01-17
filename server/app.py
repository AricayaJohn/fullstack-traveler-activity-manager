#!/usr/bin/env python3

from flask import request, session
from flask_sqlalchemy import SQLAlchemy
from flask_restful import Resource
from config import app, db, api, bcrypt
from models import Traveler, Activity, Destination

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
        session['traveler_id'] = traveler.id
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
        traveler_id = session.get('traveler_id')
        if 'traveler_id':
            traveler = Traveler.query.get(traveler_id)
            if traveler:
                return traveler.to_dict(), 200
            return {}, 200

api.add_resource(CheckSession, '/check_session', endpoint='check_session')

class Logout(Resource):
    def delete(self):
        session['traveler_id'] = None
        return {}, 204

api.add_resource(Logout, '/logout', endpoint='logout')

class GetTravelerById(Resource):
    def get(self, id):
        traveler = db.session.get(Traveler, id)
        if traveler:
            return traveler.to_dict(), 200
        return {'error': "Traveler not found"}, 400

api.add_resource(GetTravelerById, '/traveler/<int:id>')

class TravelerActivities(Resource):
    def get(self, traveler_id):
        activities = Activity.query.filter_by(traveler_id=traveler_id).all()
        if activities:
            return [activity.to_dict() for activity in activities], 200
        return {'error': "Activities not found"}, 404

api.add_resource(TravelerActivities, '/traveler/<int:traveler_id>/activities')

class AddTrip(Resource):
    def post(self):
        data = request.get_json()
        traveler_id = data['traveler_id']
        activity_name = data['activity_name']
        difficulty = data['difficulty']
        season_for_activity = data ['season_for_activity']
        duration = data['duration']
        price = data['price']
        destination_data = data['destination']

        destination = Destination.query.filter_by(
            name = destination_data['name'],
            transportation = destination_data['transportation'],
            country = destination_data['country']
        ).first()

        if not destination:
            destination = Destination(
            name = destination_data['name'],
            transportation = destination_data['transportation'],
            country = destination_data['country']                
            )
            db.session.add(destination)
            db.session.commit()

        activity = Activity(
            activity_name = activity_name,
            difficulty = difficulty,
            season_for_activity = season_for_activity,
            duration = duration, 
            price = price,
            traveler_id = traveler_id,
            destination_id = destination.id
        )

        db.session.add(activity)
        db.session.commit()

        return activity.to_dict(), 201

api.add_resource(AddTrip, '/add_trip', endpoint='add_trip')


if __name__ == '__main__':
    app.run(port=5555, debug=True)

