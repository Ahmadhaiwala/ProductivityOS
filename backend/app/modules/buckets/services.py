from datetime import datetime, timezone

from sqlalchemy.orm import Session

from .models import Bucket
from .schemas import BucketCreate, BucketUpdate


class BucketService:
    @staticmethod
    def create_bucket(db: Session, bucket_data: BucketCreate) -> Bucket:
        now = datetime.now(timezone.utc)
        bucket = Bucket(
            user_id=bucket_data.user_id,
            name=bucket_data.name,
            position=bucket_data.position,
            ordering_strategy=bucket_data.ordering_strategy,
            created_at=now,
            updated_at=now,
        )
        db.add(bucket)
        db.commit()
        db.refresh(bucket)
        return bucket

    @staticmethod
    def get_bucket(db: Session, bucket_id: int) -> Bucket | None:
        return db.query(Bucket).filter(Bucket.id == bucket_id).first()

    @staticmethod
    def get_user_buckets(db: Session, user_id: int) -> list[Bucket]:
        return db.query(Bucket).filter(Bucket.user_id == user_id).order_by(Bucket.position).all()

    @staticmethod
    def update_bucket(db: Session, bucket_id: int, bucket_data: BucketUpdate) -> Bucket | None:
        bucket = db.query(Bucket).filter(Bucket.id == bucket_id).first()
        if not bucket:
            return None

        update_data = bucket_data.model_dump(exclude_unset=True)
        if update_data:
            update_data["updated_at"] = datetime.now(timezone.utc)
            for key, value in update_data.items():
                setattr(bucket, key, value)
            db.commit()
            db.refresh(bucket)
        return bucket

    @staticmethod
    def delete_bucket(db: Session, bucket_id: int) -> bool:
        bucket = db.query(Bucket).filter(Bucket.id == bucket_id).first()
        if not bucket:
            return False
        db.delete(bucket)
        db.commit()
        return True
