
from pydantic import BaseModel, EmailStr, Field, ConfigDict


class CitizenCreate(BaseModel):
    name: str = Field(min_length=2, max_length=100)
    email: EmailStr
    mobile: str = Field(pattern=r"^[0-9]{10}$")
    password: str = Field(min_length=8, max_length=128)


class CitizenResponse(BaseModel):
    id: int
    name: str
    email: EmailStr
    mobile: str

    model_config = ConfigDict(from_attributes=True)
