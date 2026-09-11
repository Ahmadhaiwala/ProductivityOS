import uuid
from datetime import datetime

from sqlalchemy import DateTime, String, Text, Uuid, func  # Added Uuid, Text, and func
from sqlalchemy.orm import Mapped, mapped_column

from app.db.base import Base


class TaskType(Base):
    __tablename__ = "task_types"

    # Recommended 2.0 native Uuid type
    id: Mapped[uuid.UUID] = mapped_column(
        Uuid, 
        primary_key=True, 
        default=uuid.uuid4
    )

    name: Mapped[str] = mapped_column(
        String(50), 
        nullable=False, 
        unique=True
    )

    description: Mapped[str | None] = mapped_column(
        Text,  # Handled by importing Text from sqlalchemy
        nullable=True
    )

    created_at: Mapped[datetime] = mapped_column(
        DateTime(timezone=True), 
        server_default=func.now(),  # Handled by importing func from sqlalchemy
        nullable=False
    )

    updated_at: Mapped[datetime] = mapped_column(
        DateTime(timezone=True),
        server_default=func.now(),
        onupdate=func.now(),
        nullable=False
    )
