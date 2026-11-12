
from typing import Optional
from pydantic import BaseModel, Field


class GrievanceAdminUpdate(BaseModel):
    status: Optional[str] = None
    assigned_department: Optional[str] = Field(
        default=None,
        max_length=150
    )
    admin_remarks: Optional[str] = Field(
        default=None,
        max_length=5000
    )
