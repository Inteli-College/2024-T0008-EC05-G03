import os
from flask import Flask
from flask_cors import CORS
from .models import db
from .routes import main as main_blueprint

current_dir = os.path.dirname(__file__)
database_uri = 'sqlite:///' + os.path.join(current_dir,'..', '..', 'database', 'database.db')


def create_app():
    app = Flask(__name__)
    app.config['SQLALCHEMY_DATABASE_URI'] = database_uri
    app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
    app.register_blueprint(main_blueprint)
    
    db.init_app(app)
    CORS(app)

    return app