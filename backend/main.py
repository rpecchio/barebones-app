from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
import uvicorn
import yfinance as yf

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

@app.get("/api/stock")
async def fetch(ticker: str = "APO"):
    return {"latestPrice": yf.Ticker(ticker).fast_info["last_price"]}

@app.get("/")
async def root():
    """Root endpoint"""
    return {"message": "Welcome to Barebones API"}

@app.get("/api/health")
async def health_check():
    """Health check endpoint"""
    return {"status": "healthy", "message": "API is running"}

if __name__ == "__main__":
    uvicorn.run("main:app", host="0.0.0.0", port=8000, reload=True)
