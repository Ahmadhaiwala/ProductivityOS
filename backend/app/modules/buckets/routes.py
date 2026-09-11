from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session

from app.core.database import get_db
from .schemas import BucketCreate, BucketResponse, BucketUpdate
from .services import BucketService

router = APIRouter(prefix="/buckets", tags=["buckets"])


@router.post("/", response_model=BucketResponse, status_code=status.HTTP_201_CREATED)
def create_bucket(bucket_data: BucketCreate, db: Session = Depends(get_db)):
    """Create a new bucket"""
    return BucketService.create_bucket(db, bucket_data)


@router.get("/{bucket_id}", response_model=BucketResponse)
def get_bucket(bucket_id: int, db: Session = Depends(get_db)):
    """Get a bucket by ID"""
    bucket = BucketService.get_bucket(db, bucket_id)
    if not bucket:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Bucket not found",
        )
    return bucket


@router.get("/user/{user_id}", response_model=list[BucketResponse])
def get_user_buckets(user_id: int, db: Session = Depends(get_db)):
    """Get all buckets for a user"""
    return BucketService.get_user_buckets(db, user_id)


@router.patch("/{bucket_id}", response_model=BucketResponse)
def update_bucket(bucket_id: int, bucket_data: BucketUpdate, db: Session = Depends(get_db)):
    """Update a bucket"""
    bucket = BucketService.update_bucket(db, bucket_id, bucket_data)
    if not bucket:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Bucket not found",
        )
    return bucket


@router.delete("/{bucket_id}", status_code=status.HTTP_204_NO_CONTENT)
def delete_bucket(bucket_id: int, db: Session = Depends(get_db)):
    """Delete a bucket"""
    if not BucketService.delete_bucket(db, bucket_id):
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Bucket not found",
        )
