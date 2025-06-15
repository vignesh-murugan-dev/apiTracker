from backend.app import app

def handler(request, context):
    return app(request.environ, start_response=lambda staus, headers: None)