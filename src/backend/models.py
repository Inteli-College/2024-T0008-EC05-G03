from flask_sqlalchemy import SQLAlchemy
from sqlalchemy import Column, Integer, Text, ForeignKey
from sqlalchemy.orm import relationship
from werkzeug.security import generate_password_hash, check_password_hash
from datetime import datetime, timezone
import pytz

spTmz = pytz.timezone('America/Sao_Paulo')


db = SQLAlchemy()

class Layout(db.Model):
    __tablename__ = 'Layout'
    id = Column(Integer, primary_key=True)
    nome_layout = Column(Text, nullable=False)
    criado = Column(Text)
    
class Compartment(db.Model):
    __tablename__ = 'Compartment'
    id = Column(Integer, primary_key=True, autoincrement=True)
    nome_item = Column(Text, nullable=False)
    quantidade_item = Column(Integer, nullable=False)
    numero_compartimento = Column(Integer, nullable=False)
    id_layout = Column(Integer, ForeignKey('Layout.id'), nullable=False)
    layout = relationship("Layout")

class RefillCompartment(db.Model):
    __tablename__ = 'RefillCompartment'
    id = Column(Integer, primary_key=True, autoincrement=True)
    nome_item = Column(Text, nullable=False)
    quantidade_item = Column(Integer, nullable=False)
    numero_compartimento = Column(Integer, nullable=False)
    id_layout = Column(Integer, ForeignKey('Layout.id'), nullable=False)
    layout = relationship("Layout")

class Users(db.Model):
    __tablename__ = 'Users'
    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(50), unique=True, nullable=False)
    password_hash = db.Column(db.String(128))

    def set_password(self, password):
        self.password_hash = generate_password_hash(password)

    def check_password(self, password):
        return check_password_hash(self.password_hash, password)

class UserLogin(db.Model):
    __tablename__ = 'UserLogin'
    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('Users.id'), nullable=False)
    login_time = db.Column(db.DateTime, default=datetime.now(spTmz))
    logout_time = db.Column(db.DateTime, nullable=True)

    user = db.relationship('Users', backref=db.backref('logins', lazy=True))

class Uso(db.Model):
    __tablename__ = 'Uso'
    id_uso = db.Column(db.Integer, primary_key=True, autoincrement=True)
    id = db.Column(db.Integer, db.ForeignKey('Users.id'), nullable=False)
    nome_layout = db.Column(db.Text, db.ForeignKey("Layout.nome_layout"), nullable=False)
    horario = db.Column(db.Text, nullable=False)
    username = db.Column(db.Text, db.ForeignKey("Users.username"), nullable=False)


