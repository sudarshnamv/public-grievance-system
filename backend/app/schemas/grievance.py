
from pydantic import BaseModel, Field, ConfigDict
from datetime import datetime


class GrievanceCreate(BaseModel):
    district: str = Field(min_length=2, max_length=100)
    category: str = Field(min_length=2, max_length=100)
    subject: str = Field(min_length=5, max_length=200)
    description: str = Field(min_length=20, max_length=5000)


class GrievanceResponse(BaseModel):
    id: int
    reference_id: str
    citizen_id: int
    district: str
    category: str
    subject: str
    description: str
    status: str
    created_at: datetime

    model_config = ConfigDict(from_attributes=True)
