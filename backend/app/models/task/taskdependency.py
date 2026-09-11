from datetime import datetime

from sqlalchemy import (
    CheckConstraint,
    DateTime,
    ForeignKey,
    String,
)
from sqlalchemy.orm import Mapped, mapped_column

from app.db.base import Base


class TaskDependency(Base):
    __tablename__ = "task_dependencies"

    __table_args__ = (
        CheckConstraint(
            "task_id <> depends_on_task_id",
            name="ck_task_dependency_no_self_dependency",
        ),
    )

    task_id: Mapped[int] = mapped_column(
        ForeignKey("tasks.id", ondelete="CASCADE"),
        primary_key=True,
    )

    depends_on_task_id: Mapped[int] = mapped_column(
        ForeignKey("tasks.id", ondelete="CASCADE"),
        primary_key=True,
    )

    dependency_type: Mapped[str] = mapped_column(
        String(50),
        nullable=False,
    )

    created_at: Mapped[datetime] = mapped_column(
        DateTime(timezone=True),
        nullable=False,
    )