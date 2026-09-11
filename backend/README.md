# Task Manager Backend

A FastAPI-based task management system with modular architecture.

## Architecture

This project follows a **modular/feature-based architecture** where each domain is organized into its own module with all related components:

```
backend/
├── app/
│   ├── core/                  # Core configurations and utilities
│   │   ├── __init__.py
│   │   ├── config.py          # Settings and environment config
│   │   └── database.py        # Database session and connection
│   │
│   ├── modules/               # Feature modules
│   │   ├── users/             # User management module
│   │   │   ├── __init__.py
│   │   │   ├── models.py      # User database models
│   │   │   ├── schemas.py     # Pydantic schemas for validation
│   │   │   ├── routes.py      # API endpoints
│   │   │   └── services.py    # Business logic
│   │   │
│   │   ├── buckets/           # Bucket management module
│   │   │   ├── __init__.py
│   │   │   ├── models.py
│   │   │   ├── schemas.py
│   │   │   ├── routes.py
│   │   │   └── services.py
│   │   │
│   │   └── tasks/             # Task management module
│   │       ├── __init__.py
│   │       ├── models.py      # Task, TaskType, TaskSchedule, TaskDependency
│   │       ├── schemas.py
│   │       ├── routes.py
│   │       └── services.py
│   │
│   ├── db/                    # Database configuration (legacy)
│   │   ├── base.py           # SQLAlchemy Base
│   │   └── session.py        # Database session (legacy)
│   │
│   ├── models/               # Models package (for Alembic)
│   │   └── __init__.py       # Imports all models for migrations
│   │
│   ├── .env                  # Environment variables
│   └── main.py               # FastAPI application entry point
│
├── alembic/                  # Database migrations
│   ├── versions/
│   └── env.py
│
├── alembic.ini
└── requirements.txt
```

## Benefits of Modular Architecture

1. **Separation of Concerns**: Each module is self-contained with its own models, schemas, routes, and business logic
2. **Scalability**: Easy to add new features by creating new modules
3. **Maintainability**: Changes to one module don't affect others
4. **Team Collaboration**: Different developers can work on different modules independently
5. **Testing**: Each module can be tested in isolation

## Setup

1. Install dependencies:
```bash
pip install -r requirements.txt
```

2. Set up your `.env` file in `app/.env`:
```env
DATABASE_URL=postgresql+psycopg2://user:password@localhost:5432/dbname
```

3. Run migrations:
```bash
alembic upgrade head
```

4. Start the server:
```bash
uvicorn app.main:app --reload
```

## API Documentation

Once the server is running, visit:
- Swagger UI: http://localhost:8000/docs
- ReDoc: http://localhost:8000/redoc

## API Endpoints

### Users (`/api/v1/users`)
- `POST /` - Create a user
- `GET /{user_id}` - Get user by ID
- `GET /` - List users
- `PATCH /{user_id}` - Update user
- `DELETE /{user_id}` - Delete user

### Buckets (`/api/v1/buckets`)
- `POST /` - Create a bucket
- `GET /{bucket_id}` - Get bucket by ID
- `GET /user/{user_id}` - Get user's buckets
- `PATCH /{bucket_id}` - Update bucket
- `DELETE /{bucket_id}` - Delete bucket

### Tasks (`/api/v1/tasks`)
- `POST /` - Create a task
- `GET /{task_id}` - Get task by ID
- `GET /user/{user_id}` - Get user's tasks
- `PATCH /{task_id}` - Update task
- `POST /{task_id}/complete` - Mark task as completed
- `DELETE /{task_id}` - Delete task

## Database Migrations

Create a new migration:
```bash
alembic revision --autogenerate -m "description"
```

Apply migrations:
```bash
alembic upgrade head
```

Rollback migration:
```bash
alembic downgrade -1
```
