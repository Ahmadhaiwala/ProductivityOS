from datetime import datetime
from pydantic import BaseModel


class TaskBase(BaseModel):
    title: str
    description: str | None = None
    task_type: str
    execution_mode: str
    completion_type: str
    importance: int
    deadline: datetime | None = None
    estimated_duration: int | None = None
    bucket_id: int | None = None
    parent_task_id: int | None = None


class TaskCreate(TaskBase):
    user_id: int
    current_value: int | None = None
    target_value: int | None = None


class TaskUpdate(BaseModel):
    title: str | None = None
    description: str | None = None
    task_type: str | None = None
    execution_mode: str | None = None
    completion_type: str | None = None
    current_value: int | None = None
    target_value: int | None = None
    importance: int | None = None
    deadline: datetime | None = None
    estimated_duration: int | None = None
    bucket_id: int | None = None
    parent_task_id: int | None = None


class TaskResponse(TaskBase):
    id: int
    user_id: int
    current_value: int | None
    target_value: int | None
    created_at: datetime
    updated_at: datetime
    completed_at: datetime | None

    class Config:
        from_attributes = True
