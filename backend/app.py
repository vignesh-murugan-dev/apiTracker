from flask import Flask, request, jsonify
from sqlalchemy import func
from database import db
from models import Item, RequestLog
from request_logger import log_request
from dotenv import load_dotenv
from flask_cors import CORS
import os

load_dotenv()

app = Flask(__name__)
CORS(app)

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

# Test route to check if Flask is running
@app.route("/api/test")
def test():
    return "Flask API is working!"

# CRUD operations for items
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

# API endpoint to get the data based on the field -> ip address, user agent, os, request type
@app.route('/requests/aggregate', methods=['GET'])
def get_aggregated_requests():
    # Get the field to group by from query param
    field = request.args.get('field')

    # Define allowed fields and their corresponding model columns
    allowed_fields = {
        'ip_address': RequestLog.ip_address,
        'user_agent': RequestLog.user_agent,
        'os': RequestLog.os,
        'request_type': RequestLog.request_type,
    }

    if field not in allowed_fields:
        return jsonify({"error": "Invalid or missing 'field' query parameter"}), 400

    column = allowed_fields[field]

    # Run query dynamically
    results = db.session.query(column, func.count().label('count')).group_by(column).all()

    # Transform the results
    response = [
        {"name": value if value else "Unknown", "value": count}
        for value, count in results
    ]

    return jsonify(response), 200

# API endpoint to get the total no of requests made
@app.route('/total-requests', methods=["GET"])
def get_total_requests():
    total = db.session.query(func.count(RequestLog.id)).scalar()
    return jsonify({"total_requests": total}), 200

@app.errorhandler(Exception)
def handle_error(e):
    return jsonify({"error": str(e)}), 500

# Run locally
if __name__ == "__main__":
    app.run(debug=True)
