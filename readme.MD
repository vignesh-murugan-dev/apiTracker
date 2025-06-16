# API Tracker

A full-stack application to track and monitor API requests with filtering and analytics capabilities.

![API Tracker UI](<frontend/public/Screenshot 2025-06-16 155010.png>)

## Project Structure

```
apiTracker/
├── backend/         # Flask API
└── frontend/        # React TypeScript app
```

## Backend Setup

1. Navigate to backend directory:

```bash
cd backend
```

2. Set up a Python virtual environment:

```bash
python -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate
```

3. Install the required packages:

```bash
pip install -r requirements.txt
```

4. Configure the database connection by creating a `.env` file in the backend directory with the following content:

```env
DB_USER=your_db_user
DB_PASSWORD=your_db_password
DB_HOST=localhost
DB_PORT=5432
DB_NAME=api_tracker
```

5. Initialize the database:

```python
from database import db
from app import app
with app.app_context():
    db.create_all()
```

6. Run the application:

```bash
python app.py
```

Server will start at http://localhost:5000

## Frontend Setup

1. Navigate to frontend directory:

```bash
cd frontend
```

2. Install the required packages:

```bash
npm install
```

3. Run the application:

```bash
npm start
```

Frontend will start at http://localhost:5173

## Tech Stack

### Backend

- **Flask** - Web framework
- **SQLAlchemy** - ORM for database operations
- **PostgreSQL** - Primary database

### Frontend

- **React** - UI library
- **TypeScript** - Type safety and better development experience
- **Vite** - Build tool and development server
- **React Router DOM** - Client-side routing
- **React Data Table Component** - Advanced table functionality
- **Phosphor Icons** - Modern icon set
- **Axios** - HTTP client
- **Context API** - State management

## Features

### Request Tracking

- Real-time API request logging
- Capture detailed request information:
  - Request ID
  - API Endpoint
  - Request Type (GET, POST, PUT, DELETE)
  - Timestamp
  - Payload
  - Content Type
  - IP Address
  - Operating System
  - User Agent

### Filtering & Search

- Advanced filtering capabilities:
  - Date range selection
  - API endpoint filtering
  - Request type filtering
  - IP address search
- Customizable rows per page

### Analytics

- Table with requests data
- Requests by metric - Bar chart
- Operating system distribution - Pie Chart