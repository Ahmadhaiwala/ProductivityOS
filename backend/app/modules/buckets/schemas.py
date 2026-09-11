from datetime import datetime
from pydantic import BaseModel


class BucketBase(BaseModel):
    name: str
    ordering_strategy: str


class BucketCreate(BucketBase):
    user_id: int
    position: int


class BucketUpdate(BaseModel):
    name: str | None = None
    position: int | None = None
    ordering_strategy: str | None = None


class BucketResponse(BucketBase):
    id: int
    user_id: int
    position: int
    created_at: datetime
    updated_at: datetime

    class Config:
        from_attributes = True
