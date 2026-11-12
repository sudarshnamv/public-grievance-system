
from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

from app.db.database import get_db
from app.models.grievance import Grievance
from app.core.cmo_dependencies import get_current_cmo
from app.schemas.admin import GrievanceAdminUpdate

router = APIRouter(
    prefix="/cmo",
    tags=["CMO Administration"]
)

ALLOWED_STATUSES = [
    "Submitted",
    "Under Review",
    "In Progress",
    "Resolved",
    "Reopened"
]


@router.get("/overview")
def cmo_overview(
    db: Session = Depends(get_db),
    admin: str = Depends(get_current_cmo)
):
    total = db.query(Grievance).count()

    submitted = db.query(Grievance).filter(
        Grievance.status == "Submitted"
    ).count()

    under_review = db.query(Grievance).filter(
        Grievance.status == "Under Review"
    ).count()

    in_progress = db.query(Grievance).filter(
        Grievance.status == "In Progress"
    ).count()

    resolved = db.query(Grievance).filter(
        Grievance.status == "Resolved"
    ).count()

    reopened = db.query(Grievance).filter(
        Grievance.status == "Reopened"
    ).count()

    return {
        "total": total,
        "submitted": submitted,
        "under_review": under_review,
        "in_progress": in_progress,
        "resolved": resolved,
        "reopened": reopened
    }


@router.get("/grievances")
def get_all_grievances(
    db: Session = Depends(get_db),
    admin: str = Depends(get_current_cmo)
):
    grievances = db.query(Grievance).order_by(
        Grievance.created_at.desc()
    ).all()

    return [
        {
            "id": item.id,
            "reference_id": item.reference_id,
            "citizen_id": item.citizen_id,
            "district": item.district,
            "category": item.category,
            "subject": item.subject,
            "description": item.description,
            "status": item.status,
            "assigned_department": item.assigned_department,
            "admin_remarks": item.admin_remarks,
            "created_at": item.created_at
        }
        for item in grievances
    ]


@router.put("/grievances/{grievance_id}")
def update_grievance(
    grievance_id: int,
    update_data: GrievanceAdminUpdate,
    db: Session = Depends(get_db),
    admin: str = Depends(get_current_cmo)
):
    grievance = db.query(Grievance).filter(
        Grievance.id == grievance_id
    ).first()

    if not grievance:
        raise HTTPException(
            status_code=404,
            detail="Grievance not found."
        )

    updates = update_data.model_dump(exclude_unset=True)

    if "status" in updates:
        if updates["status"] not in ALLOWED_STATUSES:
            raise HTTPException(
                status_code=400,
                detail="Invalid grievance status."
            )

    for field, value in updates.items():
        setattr(grievance, field, value)

    db.commit()
    db.refresh(grievance)

    return {
        "message": "Grievance updated successfully.",
        "reference_id": grievance.reference_id,
        "status": grievance.status,
        "assigned_department": grievance.assigned_department,
        "admin_remarks": grievance.admin_remarks
    }
