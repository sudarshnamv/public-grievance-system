
import uuid

from sqlalchemy import (
    Column,
    Integer,
    String,
    Text,
    DateTime,
    ForeignKey
)
from sqlalchemy.sql import func

from app.db.database import Base


class Grievance(Base):
    __tablename__ = "grievances"

    id = Column(Integer, primary_key=True, index=True)

    reference_id = Column(
        String(30),
        unique=True,
        nullable=False,
        index=True,
        default=lambda: f"CMK-{uuid.uuid4().hex[:10].upper()}"
    )

    citizen_id = Column(
        Integer,
        ForeignKey("citizens.id"),
        nullable=False,
        index=True
    )

    district = Column(String(100), nullable=False)
    category = Column(String(100), nullable=False)
    subject = Column(String(200), nullable=False)
    description = Column(Text, nullable=False)

    status = Column(
        String(50),
        nullable=False,
        default="Submitted"
    )

    assigned_department = Column(String(150), nullable=True)
    admin_remarks = Column(Text, nullable=True)

    created_at = Column(
        DateTime(timezone=True),
        server_default=func.now(),
        nullable=False
    )

    updated_at = Column(
        DateTime(timezone=True),
        server_default=func.now(),
        onupdate=func.now(),
        nullable=False
    )
