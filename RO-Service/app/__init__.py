from flask import Flask
from .routes.api import api_blueprint
from flask_cors import CORS

def create_app():
    app = Flask(__name__)
    
    CORS(app, origins=["*"])
    
    app.config.from_object('config')
    
    app.register_blueprint(api_blueprint, url_prefix='/api')
    
    return app