from database import db
from datetime import datetime
from sqlalchemy import func

class Item(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(120), nullable=False)
    email = db.Column(db.String(255), nullable=False)

class RequestLog(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    request_id = db.Column(db.String(50), nullable=False)
    api_endpoint = db.Column(db.String(200))
    request_type = db.Column(db.String(10))           
    request_time = db.Column(db.DateTime, default=datetime.utcnow)
    payload = db.Column(db.Text)
    content_type = db.Column(db.String(100))
    ip_address = db.Column(db.String(100))
    os = db.Column(db.String(100))
    user_agent = db.Column(db.String(300))

    @classmethod
    def get_next_request_id(cls):
        # Get the latest request_id from the database
        latest = cls.query.with_entities(cls.request_id).order_by(cls.id.desc()).first()
        
        if not latest:
            # If no records exist, start with R001
            return 'R001'
            
        # Extract the number from the latest request_id and increment
        latest_num = int(latest[0][1:])
        next_num = latest_num + 1
        
        return f'R{next_num:03d}'
