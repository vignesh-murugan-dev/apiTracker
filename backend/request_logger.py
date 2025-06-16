import uuid
from flask import request
from models import RequestLog
from database import db
from datetime import datetime
import platform
import httpagentparser

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
    try:
        # Generate sequential request ID
        request_id = RequestLog.get_next_request_id()
        
        browser = extract_browser(request.headers.get("user-agent", ""))
        
        # Get request type and endpoint
        request_type = request.method
        api_endpoint = request.path
        
        # Get payload
        payload = None
        if request.is_json:
            payload = str(request.get_json())
        elif request.form:
            payload = str(dict(request.form))
        
        # Get content type
        content_type = request.content_type
        
        # Get IP address
        ip_address = request.remote_addr
        
        # Get user agent details
        user_agent = request.headers.get('User-Agent', '')
        agent_details = httpagentparser.detect(user_agent)
        os_info = agent_details.get('os', {}).get('name', 'Unknown')
        
        # Create log entry
        log = RequestLog(
            request_id=request_id,
            api_endpoint=api_endpoint,
            request_type=request_type,
            request_time=datetime.utcnow(),
            payload=payload,
            content_type=content_type,
            ip_address=ip_address,
            os=os_info,
            user_agent=browser
        )

        print(f"Logging request: {log}")
        
        # Add the log to the database session and commit
        db.session.add(log)
        db.session.commit()

        print(f"Request logged with ID: {request_id}")
    
    except Exception as e:
        print(f"Error logging request: {str(e)}")
        db.session.rollback()
