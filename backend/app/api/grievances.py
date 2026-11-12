
from fastapi import APIRouter, Depends, status
from sqlalchemy.orm import Session

from app.db.database import get_db
from app.models.citizen import Citizen
from app.models.grievance import Grievance
from app.schemas.grievance import GrievanceCreate, GrievanceResponse
from app.core.dependencies import get_current_citizen

router = APIRouter(
    prefix="/grievances",
    tags=["Grievances"]
)


@router.post(
    "/",
    response_model=GrievanceResponse,
    status_code=status.HTTP_201_CREATED
)
def submit_grievance(
    grievance_data: GrievanceCreate,
    db: Session = Depends(get_db),
    current_citizen: Citizen = Depends(get_current_citizen)
):
    new_grievance = Grievance(
        citizen_id=current_citizen.id,
        district=grievance_data.district,
        category=grievance_data.category,
        subject=grievance_data.subject,
        description=grievance_data.description,
        status="Submitted"
    )

    db.add(new_grievance)
    db.commit()
    db.refresh(new_grievance)

    return new_grievance


from fastapi import HTTPException

@router.get("/track/{reference_id}")
def track_grievance(
    reference_id: str,
    db: Session = Depends(get_db),
    current_citizen: Citizen = Depends(get_current_citizen)
):
    grievance = db.query(Grievance).filter(
        Grievance.reference_id == reference_id,
        Grievance.citizen_id == current_citizen.id
    ).first()

    if not grievance:
        raise HTTPException(
            status_code=404,
            detail="Grievance not found. Please check your reference ID."
        )

    return {
        "reference_id": grievance.reference_id,
        "subject": grievance.subject,
        "district": grievance.district,
        "category": grievance.category,
        "description": grievance.description,
        "status": grievance.status,
        "created_at": grievance.created_at
    }
