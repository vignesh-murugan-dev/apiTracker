import uuid
from flask import request
from models import RequestLog
from database import db
from datetime import datetime
import platform

def extract_browser(user_agent):
    browsers = {
        "Chrome": "Chrome",
        "Firefox": "Firefox", 
        "Safari": "Safari",
        "Edge": "Edge",
        "Opera": "Opera"
    }
    
    for browser_key in browsers:
        if browser_key in user_agent:
            return browsers[browser_key]
    return "Other"

def log_request():
    # creating a custom Request ID (R001, R002, ...)
    request_id = f"R{str(uuid.uuid4())[:4].upper()}"

    browser = extract_browser(request.headers.get("user-agent", ""))
    
    log = RequestLog(
        request_id=request_id,
        request_type=request.method,
        request_time=datetime.utcnow(),
        payload=request.get_data(as_text=True),
        content_type=request.content_type,
        ip_address=request.remote_addr,
        os=platform.system(),
        user_agent=browser
    )

    print(f"Logging request: {log}")
    # Add the log to the database session and commit

    db.session.add(log)
    db.session.commit()

    print(f"Request logged with ID: {request_id}")
