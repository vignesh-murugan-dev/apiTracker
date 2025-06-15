# backend/api/index.py

import sys
import os

# Ensure backend folder is on path
sys.path.append(os.path.dirname(os.path.abspath(__file__)) + '/../')

from app import app as flask_app  

def handler(environ, start_response):
    return flask_app(environ, start_response)
