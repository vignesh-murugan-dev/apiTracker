import os
import sys

# Ensure the parent backend directory is in the path
sys.path.insert(0, os.path.abspath(os.path.join(os.path.dirname(__file__), '..')))

from app import app as application  # Flask expects `application` for WSGI

def handler(environ, start_response):
    return application(environ, start_response)
