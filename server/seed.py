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
    traveler1 = Traveler(username='john', password_hash = pass123, age=28, email='john@example.com', interest='Hiking', favorite_season='Summer' )
    traveler2 = Traveler(username='jane', password_hash = pass456, age=24, email='jane@example.com', interest='Snowboarding', favorite_season='Winter')

    db.session.add_all([Traveler1, Traveler2])
    db.session.commit()



if __name__ == '__main__':
    fake = Faker()
    with app.app_context():
        print("Starting seed...")
        # Seed code goes here!
