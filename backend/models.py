from database import db
from datetime import datetime

class Item(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(120), nullable=False)
    email = db.Column(db.String(255), nullable=False)

class RequestLog(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    request_id = db.Column(db.String(50), nullable=False)
    request_type = db.Column(db.String(10))           
    request_time = db.Column(db.DateTime, default=datetime.utcnow)
    payload = db.Column(db.Text)
    content_type = db.Column(db.String(100))
    ip_address = db.Column(db.String(100))
    os = db.Column(db.String(100))
    user_agent = db.Column(db.String(300))
