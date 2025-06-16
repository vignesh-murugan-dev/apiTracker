from flask import Flask, request, jsonify
from sqlalchemy import func
from database import db
from models import Item, RequestLog
from request_logger import log_request
from dotenv import load_dotenv
from flask_cors import CORS
import os
from datetime import datetime
import json

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
@app.route('/api/items', methods=['GET'])
def get_items():
    return 'Hello World!'

@app.route('/api/items', methods=['POST'])
def create_items():
    data = request.get_json()
    return jsonify(name=data['name'], email=data['email']), 201

@app.route('/api/items', methods=['PUT'])
def update_items():
    data = request.get_json()
    return jsonify(id=data['id'], name=data['name'], email=data['email'])

@app.route('/api/items', methods=['DELETE'])
def delete_items():
    data = request.get_json()
    return jsonify(id=data['id'])

# API endpoint to get the data based on the field -> ip address, user agent, os, request type
@app.route('/api/requests/aggregate', methods=['GET'])
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

    # Transform results into a list of dictionaries
    response = [
        {"name": value if value else "Unknown", "value": count}
        for value, count in results
    ]

    return jsonify(response), 200

# API endpoint to get the total no of requests made
@app.route('/api/total-requests', methods=["GET"])
def get_total_requests():
    total = db.session.query(func.count(RequestLog.id)).scalar()
    return jsonify({"total_requests": total}), 200

@app.route('/api/requests', methods=['GET'])
def get_requests():
    page = request.args.get('page', 1, type=int)
    per_page = request.args.get('per_page', 5, type=int)
    
    # Get filter parameters
    date_range = request.args.get('date_range')
    request_type = request.args.getlist('request_type')
    ip_address = request.args.get('ip_address')
    api_endpoint = request.args.get('api_endpoint')
    print(f"Received filters - api_endpoint: {api_endpoint}, types: {request_type}")
    
    query = RequestLog.query
    
    # Apply filters if provided
    if date_range:
        try:
            date_values = request.args.getlist('date_range')
            # Convert ISO format to datetime objects
            start_date = datetime.strptime(date_values[0].split('T')[0], '%Y-%m-%d')
            end_date = datetime.strptime(date_values[1].split('T')[0], '%Y-%m-%d')
            # Add a day to end_date to include the entire day
            end_date = end_date.replace(hour=23, minute=59, second=59)
            
            query = query.filter(RequestLog.request_time.between(start_date, end_date))
            print(f"Filtering between {start_date} and {end_date}")
        except (IndexError, ValueError) as e:
            print(f"Error parsing date range: {e}")
            print(f"Received date_range: {date_range}")
    
    if request_type:
        query = query.filter(RequestLog.request_type.in_(request_type))
    if ip_address:
        query = query.filter(RequestLog.ip_address.ilike(f'%{ip_address}%'))
    if api_endpoint and api_endpoint != 'all':
        query = query.filter(RequestLog.api_endpoint == api_endpoint)
        print(f"Filtering by endpoint: {api_endpoint}")
    
    # Get paginated results
    pagination = query.order_by(RequestLog.request_time.desc()).paginate(
        page=page, per_page=per_page, error_out=False
    )
    
    requests = pagination.items
    
    return jsonify({
        'requests': [{
            'id': req.id,
            'request_id': req.request_id,
            'api_endpoint': req.api_endpoint,
            'request_type': req.request_type,
            'request_time': req.request_time.isoformat(),
            'payload': req.payload,
            'content_type': req.content_type,
            'ip_address': req.ip_address,
            'os': req.os,
            'user_agent': req.user_agent
        } for req in requests],
        'total': pagination.total,
        'pages': pagination.pages,
        'current_page': page
    }), 200

@app.errorhandler(Exception)
def handle_error(e):
    return jsonify({"error": str(e)}), 500

# Run locally
if __name__ == "__main__":
    app.run(debug=True)

