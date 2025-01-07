from sqlalchemy_serializer import SerializerMixin
from sqlalchemy.ext.associationproxy import association_proxy
from sqlalchemy.ext.hybrid import hybrid_property
from flask_sqlalchemy import SQLAlchemy
from sqlalchemy.orm import validates, relationship, backref

from config import db, bcrypt

# Models go here!
class Destination(db.Model, SerializerMixin):
    __tablename__ = 'destinations'

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String)
    transportation = db.Column(db.String)
    country = db.Column(db.String)
    season = db.Column(db.String)

    activities = relationship('Activity', backref='destination', cascade='all, delete-orphan')

    serialize_rules = ('-activities.destination',)

    @validates('name')
    def validate_name(self, key, name):
        if not name:
            raise ValueError('Destination name is required')
        return name

    def __repr__(self):
        return f'<Destination {self.id}: {self.name}>'

class Traveler(db.Model, SerializerMixin):
    __tablename__ = 'travelers'

    id = db.Column(db.Integer, primary_key = True)
    username = db.Column(db.String)
    _password_hash = db.Column(db.String)
    age = db.Column(db.Integer)
    email = db.Column(db.String)
    interests = db.Column(db.String)
    favorite_season = db.Column(db.String)

    activities = relationship('Activity', backref='traveler', cascade='all, delete-orphan')

    serialize_rules = ('-activities.traveler',)

    @validates('name')
    def validate_name(self, key, name):
        if not name:
            raise ValueError('Traveler name is required')
            return name

    @property
    def password_hash(self):
        raise Exception('Password cannot be viewed')
    
    @password_hash.setter
    def password_hash(self, password):
        password_hash = bcrypt.generate_password_hash(password.encode('utf-8'))
        self._password_hash = password_hash.decode('utf-8')

    def authenticate(self, password):
        return bcrypt.check_password_hash(self._password_hash, password.encode('utf-8'))

    def __repr__(self):
        return f'Traveler {self.username}, ID: {self.id}'

class Activity(db.Model, SerializerMixin):
    __tablename__ = 'activities'

    id = db.Column(db.Integer, primary_key=True)
    activity_name = db.Column(db.String)
    difficulty = db.Column(db.String)
    season_for_activity = db.Column(db.String)
    duration = db.Column(db.Integer)
    price = db.Column(db.Integer)

    traveler_id = db.Column(db.Integer, db.ForeignKey('travelers.id'), nullable=False)
    destination_id = db.Column(db.Integer, db.ForeignKey('destinations.id'), nullable=False)

    serialize_rules = ('-destinations.activities','-traveler.activities')

    def __repr__(self):
        return f"<Activity (name = {self.activity_name}, price={self.price})>"


    