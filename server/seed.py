#!/usr/bin/env python3
from app import app
from models import db, Traveler, Activity, Destination
from config import bcrypt

def clear_data():
    Traveler.query.delete()
    Activity.query.delete()
    Destination.query.delete()
    db.session.commit()

def add_travelers():
    traveler1 = Traveler(username='john', password_hash = 'pass123', age=28, email='john@example.com', interests='Hiking', favorite_season='Summer' )
    traveler2 = Traveler(username='jane', password_hash = 'pass456', age=24, email='jane@example.com', interests='Snowboarding', favorite_season='Winter')

    db.session.add_all([traveler1, traveler2])
    db.session.commit()

def add_destination():
    destination1 = Destination(name='Grand Canyon', transportation='Drive', country='USA', season='Summer')
    destination2 = Destination(name='Mt. Fuji', transportation='Airplane', country='Japan', season='Winter')

    db.session.add_all([destination1, destination2])
    db.session.commit()

def add_activities():
    activity1 = Activity(activity_name='Hiking', difficulty='Moderate', season_for_activity='Summer', duration=5, price=100, traveler_id=1, destination_id=1)
    activity2 = Activity(activity_name='Snowboarding', difficulty='Hard', season_for_activity='Winter', duration=7, price=250, traveler_id=2, destination_id=2)

    db.session.add_all([activity1, activity2])
    db.session.commit()

def seed():
    print("clearing data")
    clear_data()

    print("seeding travelers...")
    add_travelers()

    print("seeding destinations...")
    add_destination()

    print("seeding activities...")
    add_activities()

if __name__ == '__main__':

    with app.app_context():
        seed()
