from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
import uvicorn

# Create FastAPI app
app = FastAPI(
    title="Barebones API",
    description="A minimal FastAPI backend",
    version="1.0.0"
)

# Configure CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],  # Vite default port
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/")
async def root():
    """Root endpoint"""
    return {"message": "Welcome to Barebones API"}

@app.get("/api/health")
async def health_check():
    """Health check endpoint"""
    return {"status": "healthy", "message": "API is running"}

@app.get("/api/data")
async def get_data():
    """Returns sample data"""
    return {
        "data": [
            {"id": 1, "name": "Item 1", "description": "First sample item"},
            {"id": 2, "name": "Item 2", "description": "Second sample item"},
            {"id": 3, "name": "Item 3", "description": "Third sample item"}
        ],
        "total": 3,
        "message": "Sample data retrieved successfully"
    }

if __name__ == "__main__":
    uvicorn.run("main:app", host="0.0.0.0", port=8000, reload=True)
