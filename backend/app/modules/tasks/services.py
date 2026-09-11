from datetime import datetime, timezone

from sqlalchemy.orm import Session

from .models import Task
from .schemas import TaskCreate, TaskUpdate


class TaskService:
    @staticmethod
    def create_task(db: Session, task_data: TaskCreate) -> Task:
        now = datetime.now(timezone.utc)
        task = Task(
            user_id=task_data.user_id,
            title=task_data.title,
            description=task_data.description,
            task_type=task_data.task_type,
            execution_mode=task_data.execution_mode,
            completion_type=task_data.completion_type,
            current_value=task_data.current_value,
            target_value=task_data.target_value,
            importance=task_data.importance,
            deadline=task_data.deadline,
            estimated_duration=task_data.estimated_duration,
            bucket_id=task_data.bucket_id,
            parent_task_id=task_data.parent_task_id,
            created_at=now,
            updated_at=now,
        )
        db.add(task)
        db.commit()
        db.refresh(task)
        return task

    @staticmethod
    def get_task(db: Session, task_id: int) -> Task | None:
        return db.query(Task).filter(Task.id == task_id).first()

    @staticmethod
    def get_user_tasks(
        db: Session,
        user_id: int,
        skip: int = 0,
        limit: int = 100,
        bucket_id: int | None = None,
    ) -> list[Task]:
        query = db.query(Task).filter(Task.user_id == user_id)
        if bucket_id is not None:
            query = query.filter(Task.bucket_id == bucket_id)
        return query.offset(skip).limit(limit).all()

    @staticmethod
    def update_task(db: Session, task_id: int, task_data: TaskUpdate) -> Task | None:
        task = db.query(Task).filter(Task.id == task_id).first()
        if not task:
            return None

        update_data = task_data.model_dump(exclude_unset=True)
        if update_data:
            update_data["updated_at"] = datetime.now(timezone.utc)
            for key, value in update_data.items():
                setattr(task, key, value)
            db.commit()
            db.refresh(task)
        return task

    @staticmethod
    def complete_task(db: Session, task_id: int) -> Task | None:
        task = db.query(Task).filter(Task.id == task_id).first()
        if not task:
            return None

        task.completed_at = datetime.now(timezone.utc)
        task.updated_at = datetime.now(timezone.utc)
        db.commit()
        db.refresh(task)
        return task

    @staticmethod
    def delete_task(db: Session, task_id: int) -> bool:
        task = db.query(Task).filter(Task.id == task_id).first()
        if not task:
            return False
        db.delete(task)
        db.commit()
        return True
