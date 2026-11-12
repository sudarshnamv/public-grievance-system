
import os

from dotenv import load_dotenv
from pathlib import Path
from fastapi import APIRouter, Depends, HTTPException, status
from fastapi.security import OAuth2PasswordRequestForm
from sqlalchemy.orm import Session

from app.db.database import get_db
from app.models.citizen import Citizen
from app.schemas.citizen import CitizenCreate, CitizenResponse
from app.core.security import (
    hash_password,
    verify_password,
    create_access_token
)

BASE_DIR = Path(__file__).resolve().parents[2]
load_dotenv(BASE_DIR / ".env")

router = APIRouter(prefix="/auth", tags=["Authentication"])


@router.post(
    "/register",
    response_model=CitizenResponse,
    status_code=status.HTTP_201_CREATED
)
def register_citizen(
    citizen_data: CitizenCreate,
    db: Session = Depends(get_db)
):
    existing_email = db.query(Citizen).filter(
        Citizen.email == citizen_data.email
    ).first()

    if existing_email:
        raise HTTPException(
            status_code=400,
            detail="Email address is already registered."
        )

    existing_mobile = db.query(Citizen).filter(
        Citizen.mobile == citizen_data.mobile
    ).first()

    if existing_mobile:
        raise HTTPException(
            status_code=400,
            detail="Mobile number is already registered."
        )

    new_citizen = Citizen(
        name=citizen_data.name,
        email=citizen_data.email,
        mobile=citizen_data.mobile,
        hashed_password=hash_password(citizen_data.password)
    )

    db.add(new_citizen)
    db.commit()
    db.refresh(new_citizen)

    return new_citizen


@router.post("/login")
def login_citizen(
    form_data: OAuth2PasswordRequestForm = Depends(),
    db: Session = Depends(get_db)
):
    citizen = db.query(Citizen).filter(
        Citizen.email == form_data.username
    ).first()

    if not citizen or not verify_password(
        form_data.password,
        citizen.hashed_password
    ):
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Incorrect email or password.",
            headers={"WWW-Authenticate": "Bearer"}
        )

    access_token = create_access_token(
        data={"sub": str(citizen.id), "role": "citizen"}
    )

    return {
        "access_token": access_token,
        "token_type": "bearer",
        "citizen": {
            "id": citizen.id,
            "name": citizen.name,
            "email": citizen.email
        }
    }


@router.post("/cmo-login")
def cmo_login(
    form_data: OAuth2PasswordRequestForm = Depends()
):
    admin_email = os.getenv("CMO_EMAIL")
    admin_password = os.getenv("CMO_PASSWORD")

    if not admin_email or not admin_password:
        raise HTTPException(
            status_code=500,
            detail="CMO credentials are not configured."
        )

    if (
        form_data.username != admin_email
        or form_data.password != admin_password
    ):
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Invalid CMO credentials."
        )

    access_token = create_access_token(
        data={"sub": admin_email, "role": "cmo"}
    )

    return {
        "access_token": access_token,
        "token_type": "bearer",
        "admin": {
            "email": admin_email,
            "role": "cmo"
        }
    }
