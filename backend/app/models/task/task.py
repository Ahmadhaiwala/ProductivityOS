from datetime import datetime

from sqlalchemy import (
    DateTime,
    ForeignKey,
    Integer,
    String,
    Text,
)
from sqlalchemy.orm import Mapped, mapped_column

from app.database import Base
from sqlalchemy import CheckConstraint


class Task(Base):
    __tablename__ = "tasks"

    id: Mapped[int] = mapped_column(primary_key=True)

    user_id: Mapped[int] = mapped_column(
        ForeignKey("users.id", ondelete="CASCADE"),
        nullable=False,
        index=True,
    )

    title: Mapped[str] = mapped_column(
        String(255),
        nullable=False,
    )

    description: Mapped[str | None] = mapped_column(
        Text,
        nullable=True,
    )

    task_type: Mapped[str] = mapped_column(
        String(50),
        nullable=False,
    )

    execution_mode: Mapped[str] = mapped_column(
        String(50),
        nullable=False,
    )

    completion_type: Mapped[str] = mapped_column(
        String(50),
        nullable=False,
    )

    current_value: Mapped[int | None] = mapped_column(
        Integer,
        nullable=True,
    )

    target_value: Mapped[int | None] = mapped_column(
        Integer,
        nullable=True,
    )

    importance: Mapped[int] = mapped_column(
        Integer,
        nullable=False,
    )

    deadline: Mapped[datetime | None] = mapped_column(
        DateTime(timezone=True),
        nullable=True,
        index=True,
    )

    estimated_duration: Mapped[int | None] = mapped_column(
        Integer,
        nullable=True,
    )

    bucket_id: Mapped[int | None] = mapped_column(
        ForeignKey("buckets.id", ondelete="SET NULL"),
        nullable=True,
        index=True,
    )

    parent_task_id: Mapped[int | None] = mapped_column(
        ForeignKey("tasks.id", ondelete="SET NULL"),
        nullable=True,
        index=True,
    )

    created_at: Mapped[datetime] = mapped_column(
        DateTime(timezone=True),
        nullable=False,
    )

    updated_at: Mapped[datetime] = mapped_column(
        DateTime(timezone=True),
        nullable=False,
    )

    completed_at: Mapped[datetime | None] = mapped_column(
        DateTime(timezone=True),
        nullable=True,
    )









