
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from app.api.auth import router as auth_router
from app.api.grievances import router as grievances_router
from app.api.cmo import router as cmo_router

app = FastAPI(
    title="CM Kerala API",
    description="Public Grievance Redressal Portal API",
    version="1.0.0"
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"]
)

app.include_router(auth_router)
app.include_router(grievances_router)
app.include_router(cmo_router)


@app.get("/")
def home():
    return {
        "message": "Welcome to CM Kerala API",
        "status": "Running"
    }


@app.get("/health")
def health_check():
    return {
        "status": "healthy",
        "application": "CM Kerala"
    }
