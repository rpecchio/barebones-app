# 🚀 Barebones App

A minimal full-stack application built with React (frontend) and FastAPI (backend).

## 📁 Project Structure

```
barebones-app/
├── backend/
│   ├── main.py           # FastAPI application
│   └── requirements.txt  # Python dependencies
├── frontend/
│   ├── index.html        # HTML template
│   ├── public/
│   ├── src/
│   │   ├── App.jsx       # Main React component
│   │   └── main.jsx      # React entry point
│   ├── package.json      # Node.js dependencies
│   └── vite.config.js    # Vite configuration
└── README.md            # This file
```

## 🛠️ Tech Stack

### Backend
- **FastAPI** - Modern, fast web framework for building APIs
- **Uvicorn** - ASGI server for running the FastAPI application
- **Python 3.8+** - Programming language

### Frontend
- **React 18** - JavaScript library for building user interfaces
- **Vite** - Build tool and development server
- **Axios** - HTTP client for API requests

## 🚦 Getting Started

### Prerequisites
- Python 3.8 or higher
- Node.js 16 or higher
- npm or yarn

### Backend Setup

1. Navigate to the backend directory:
```bash
cd backend
```

2. Create a virtual environment:
```bash
python -m venv venv
```

3. Activate the virtual environment:
```bash
# On Linux/Mac
source venv/bin/activate

# On Windows
venv\Scripts\activate
```

4. Install dependencies:
```bash
pip install -r requirements.txt
```

5. Run the backend server:
```bash
python main.py
```

The API will be available at http://localhost:8000

### Frontend Setup

1. Navigate to the frontend directory:
```bash
cd frontend
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

The frontend will be available at http://localhost:5173

## 🌐 API Endpoints

- `GET /` - Root endpoint
- `GET /api/health` - Health check endpoint
- `GET /api/data` - Returns sample data

## 🎯 Features

- ✅ Modern React frontend with functional components and hooks
- ✅ FastAPI backend with automatic API documentation
- ✅ CORS configuration for local development
- ✅ Health check endpoint
- ✅ Sample data endpoint
- ✅ Responsive design
- ✅ Error handling
- ✅ Loading states

## 📚 Development

### Backend
- API documentation is automatically generated at http://localhost:8000/docs
- The backend supports hot reloading during development

### Frontend
- The frontend supports hot module replacement (HMR)
- ESLint is configured for code quality

## 🚀 Production Build

### Backend
For production, you might want to use a production ASGI server:

```bash
pip install gunicorn
gunicorn main:app -w 4 -k uvicorn.workers.UvicornWorker
```

### Frontend
Build the frontend for production:

```bash
cd frontend
npm run build
```

## 📄 License

This project is open source and available under the MIT License.
