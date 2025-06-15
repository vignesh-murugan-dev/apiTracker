from flask import Flask, request, jsonify
from database import db
from models import Item
from request_logger import log_request
from dotenv import load_dotenv
import os

load_dotenv()

app = Flask(__name__)

# Database config
DB_USER = os.getenv("DB_USER")
DB_PASSWORD = os.getenv("DB_PASSWORD")
DB_HOST = os.getenv("DB_HOST")
DB_PORT = os.getenv("DB_PORT")
DB_NAME = os.getenv("DB_NAME")

app.config['SQLALCHEMY_DATABASE_URI'] = (
    f'postgresql://{DB_USER}:{DB_PASSWORD}@{DB_HOST}:{DB_PORT}/{DB_NAME}'
)
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
db.init_app(app)

# Middleware
@app.before_request
def before_any_request():
    log_request()

# Routes
@app.route("/api/test")
def test():
    return "Flask API is working!"

@app.route('/items', methods=['GET'])
def get_items():
    return 'Hello World!'

@app.route('/items', methods=['POST'])
def create_items():
    data = request.get_json()
    return jsonify(name=data['name'], email=data['email']), 201

@app.route('/items', methods=['PUT'])
def update_items():
    data = request.get_json()
    return jsonify(id=data['id'], name=data['name'], email=data['email'])

@app.route('/items', methods=['DELETE'])
def delete_items():
    data = request.get_json()
    return jsonify(id=data['id'])

@app.errorhandler(Exception)
def handle_error(e):
    return jsonify({"error": str(e)}), 500
