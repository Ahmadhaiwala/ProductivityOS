# ProductivityOS — Frontend Requirements & Product UI Specification

> **Purpose:** Frontend requirements for the ProductivityOS Task Manager.
>
> **Frontend context:** React / Next.js application consuming a FastAPI backend.
>
> **Current backend foundation:** FastAPI + SQLAlchemy + PostgreSQL + Alembic, organized as a modular monolith with `users`, `buckets`, and `tasks` modules.
>
> **Core product idea:** ProductivityOS is not a static todo list. It is a **task execution and adaptation system** where tasks can evolve through focusing, scheduling, completing, postponing, rescheduling, redefining, decomposing, or falling back to alternative actions.

---

# 1. Product Vision

The frontend should answer four questions immediately:

1. **What should I focus on right now?**
2. **What is my mission for today?**
3. **What is coming later?**
4. **What should I do when my original plan stops making sense?**

The application should therefore behave less like a traditional todo list and more like a **personal execution control center**.

The UI should not simply display database records.

It should expose the **current state of the user's work and the actions available to change that state**.

### Core mental model

```text
                         PRODUCTIVITYOS
                               |
             +-----------------+-----------------+
             |                 |                 |
        CURRENT FOCUS      TODAY'S MISSION   MONTH VIEW
             |                 |                 |
         Execute             Plan              Navigate
             |                 |                 |
             +-----------------+-----------------+
                               |
                       TASK EVOLUTION
                               |
       +-----------+-----------+-----------+-----------+
       |           |           |           |           |
    Complete    Reschedule  Redefine    Decompose   Fallback
```

---

# 2. Primary UX Principle

## A task is not a static object

A traditional task manager thinks:

```text
Task
  -> title
  -> deadline
  -> completed
```

ProductivityOS should think:

```text
Task
  -> created
  -> scheduled
  -> focused
  -> progressed
  -> completed
  -> delayed
  -> rescheduled
  -> redefined
  -> decomposed
  -> blocked
  -> fallback
  -> abandoned
```

The frontend must make these transitions easy.

The user should never feel trapped by an earlier plan.

If a task is no longer realistic, the system should help the user **adapt the task instead of simply marking it overdue**.

---

# 3. Main Frontend Information Architecture

The primary navigation should remain simple.

```text
PRODUCTIVITYOS

Today
Upcoming
Calendar

----------------

Buckets

  Development
  College
  Career
  Personal
  Projects

----------------

Settings
```

Do not expose every backend entity as a navigation item.

For example:

- `TaskSchedule` is a backend concept.
- `TaskDependency` is a backend concept.
- `TaskType` is a backend concept.

The user should experience these through task interactions rather than needing to understand the database model.

---

# 4. Main Dashboard

The Task Dashboard is the primary workspace.

It should have three major visual areas:

```text
+--------------------------------------------------------------+
|                        CURRENT FOCUS                          |
|                     Largest visual area                       |
+--------------------------------------------------------------+
|                      TODAY'S MISSION                         |
|                  Tasks requiring attention                    |
+--------------------------------------------------------------+
|                         MONTH VIEW                            |
|                    Calendar / overview                        |
+--------------------------------------------------------------+
```

## Priority of visual space

### 1. Current Focus

Largest section.

This represents execution.

### 2. Today's Mission

Second-largest section.

This represents the day's plan.

### 3. Month Calendar

Smaller overview.

This represents future planning and context.

The month should **not compete visually with the current task**.

---

# 5. Current Focus

## Purpose

Current Focus answers:

> "What am I doing right now?"

It should be the most prominent element on the dashboard.

There should normally be one active focus task.

---

## Current Focus content

The focus card can contain:

```text
CURRENT FOCUS

[Bucket]

Task title

Task description

Priority
Deadline
Estimated duration

Progress

Available actions
```

Example:

```text
CURRENT FOCUS                         DEVELOPMENT

Build Task Dashboard

Build the first working version of
the ProductivityOS task dashboard.

HIGH       45 min       Today 8:00 PM

Progress
██████████████████░░░░ 72%

[ Start Focus ] [ Complete ] [ Edit ] [ ... ]
```

---

# 6. Bucket + Current Focus Relationship

Buckets should not merely be folders.

They provide **context** for work.

Example:

```text
Development
    |
    +-- Build Task Dashboard   <- Current Focus
    +-- Connect APIs
    +-- Write tests

College
    |
    +-- Computer Networks
    +-- DBMS assignment

Career
    |
    +-- Resume
    +-- Interview preparation
```

The current focus card should visually expose the bucket:

```text
CURRENT FOCUS

Development

Build Task Dashboard
```

This makes the current context obvious.

---

# 7. Current Focus Actions

The Focus component should expose execution-oriented actions.

Primary actions:

```text
Start Focus
Pause
Complete
```

Secondary actions:

```text
Edit
Reschedule
Redefine
Move Bucket
Break Down
More
```

The UI should avoid forcing the user through a separate page for simple actions.

---

# 8. Focus Mode

A task can enter an active focus state.

Example:

```text
FOCUSING

Build Task Dashboard

32:41

[ Pause ]
[ Complete ]
```

Focus mode may later support:

- elapsed focus time
- estimated duration
- progress
- interruption tracking
- focus sessions
- completion feedback

The initial version does not need to implement every feature.

The component should simply be designed so these capabilities can be added later.

---

# 9. Today's Mission

## Purpose

Today's Mission answers:

> "What needs to happen today?"

This is different from Current Focus.

Current Focus:

> One thing I'm executing now.

Today's Mission:

> Everything important planned for today.

Example:

```text
TODAY'S MISSION                         4 / 6 COMPLETE

✓ Create database models             9:00 AM
✓ Build task API                    11:00 AM
○ Build dashboard                    2:00 PM
○ Connect frontend                   5:00 PM
○ Study Computer Networks            7:00 PM
```

---

# 10. Task Row Design

Each task row should provide quick access to common actions.

Default:

```text
○ Build dashboard                  2:00 PM
```

On hover / interaction:

```text
○ Build dashboard       2:00 PM   [✓] [Edit] [Reschedule] [...]
```

Actions:

- Complete
- Edit
- Reschedule
- More

This avoids unnecessary navigation.

---

# 11. Task Inspector / Detail Panel

Complex editing should happen inside a side panel or modal rather than forcing a full-page navigation.

Example:

```text
+---------------------------------------+
| Edit Task                          X  |
|                                       |
| Build Task Dashboard                  |
|                                       |
| Description                           |
| ------------------------------------- |
| Build the task dashboard...           |
|                                       |
| Bucket                                |
| [ Development v ]                    |
|                                       |
| Deadline                              |
| [ Sep 27, 8:00 PM ]                  |
|                                       |
| Importance                            |
| [ High v ]                            |
|                                       |
| Estimated Duration                    |
| [ 90 minutes ]                        |
|                                       |
| Completion Type                       |
| [ Quantitative v ]                    |
|                                       |
| Progress                              |
| [ 72 ] / [ 100 ]                     |
|                                       |
| Advanced v                            |
|                                       |
| [ Cancel ]       [ Save Changes ]     |
+---------------------------------------+
```

---

# 12. Simple vs Advanced Task Creation

The task creation UI should not expose the entire backend model immediately.

## Simple creation

```text
What needs to be done?

[ Build task dashboard ]

Date       [ Today ]
Time       [ 8:00 PM ]

[ Create Task ]
```

## Advanced options

Expandable:

```text
Advanced

Bucket
Importance
Estimated duration
Task type
Execution mode
Completion type
Recurrence
Dependencies
Parent task
```

This keeps the interface approachable while preserving the power of the backend.

---

# 13. Task Creation Flow

Recommended flow:

```text
+ Add Task
     |
     v
Quick task input
     |
     +---- optional ----> Advanced options
     |
     v
Create
     |
     v
Task appears in appropriate view
```

If the task is scheduled for today:

```text
Create
  -> Today's Mission
```

If the task is selected as focus:

```text
Create
  -> Current Focus
```

If scheduled later:

```text
Create
  -> Upcoming / Calendar
```

---

# 14. Month Calendar

The month calendar provides a high-level view.

It should answer:

> "What does my workload look like across the month?"

Example:

```text
SEPTEMBER 2026

Mon  Tue  Wed  Thu  Fri  Sat  Sun
-----------------------------------
21   22   23   24   25   26   27
 3    2    4    1    5    2    4

28   29   30
 4    3    2
```

Numbers can represent task counts.

Example:

```text
27
● ● ● ●
```

or:

```text
27
4 tasks
```

Clicking a date should reveal that day's tasks.

---

# 15. Calendar Interaction

Clicking a day:

```text
September 28

4 tasks

○ Finish portfolio
○ Deploy backend
○ Study DSA
○ Gym
```

Possible actions:

```text
[ Add Task ]
[ View Day ]
```

The calendar should not become a complicated scheduling application in the first version.

It is primarily an overview and navigation mechanism.

---

# 16. Upcoming View

Upcoming should bridge Today and the Month Calendar.

Example:

```text
UPCOMING

Tomorrow
--------------------------------
○ Finish portfolio
○ API integration

Monday
--------------------------------
○ Computer Networks assignment

Wednesday
--------------------------------
○ Deploy project
```

This gives the user a useful chronological view without forcing them to inspect the entire month.

---

# 17. Dynamic Task Lifecycle

This is one of the most important product requirements.

Tasks can change after creation.

The UI must support:

```text
Created
   |
Scheduled
   |
Focused
   |
+--+-------------------+
|                      |
Completed           Needs change
                       |
             +---------+---------+
             |         |         |
         Reschedule  Redefine  Decompose
             |
          Fallback
             |
         Continue
```

---

# 18. Deadline Handling

A missed deadline should not simply result in:

```text
OVERDUE
```

Instead, the application should help the user decide what happens next.

Example:

```text
TASK NEEDS ATTENTION

Build AI chatbot

This task was not completed by the planned deadline.

What should happen?

[ Continue Tomorrow ]

[ Choose Another Date ]

[ Reduce Scope ]

[ Break Into Smaller Tasks ]

[ Redefine Task ]

[ Keep Overdue ]

[ Drop Task ]
```

This is a core interaction.

---

# 19. Reschedule

Reschedule should be a lightweight action.

```text
RESCHEDULE

Current:
September 27 · 8:00 PM

Move to:

[ Tomorrow ]
[ Next available slot ]
[ Pick date ]
[ Pick date + time ]

[ Save ]
```

The frontend should make common actions one click.

---

# 20. Redefine Task

Redefinition is different from editing.

### Edit

Changes task information.

Example:

```text
Change deadline:
8 PM -> 9 PM
```

### Redefine

Changes what the task actually means.

Example:

```text
Original:
Build complete AI chatbot

New:
Build chatbot API + basic RAG
```

The UI should communicate this difference.

---

# 21. Redefine Flow

```text
REDEFINE TASK

Current task

Build complete AI chatbot

Why are you changing it?

○ Too large
○ Time estimate was wrong
○ Blocked
○ No longer important
○ Missing information
○ Other

New task definition

[ Build chatbot API + basic RAG ]

New deadline

[ Tomorrow ]

[ Save New Definition ]
```

---

# 22. Task History / Evolution

Eventually the application should preserve how a task evolved.

Example:

```text
TASK EVOLUTION

Sep 25
Task created

"Build complete AI chatbot"

        |
        | Redefined
        v

Sep 27
"Build chatbot API + basic RAG"

        |
        | Rescheduled
        v

Sep 28
New deadline
```

This is different from simply overwriting the current task.

The frontend should eventually expose a history/timeline section.

---

# 23. Fallback System

Fallbacks are alternative actions when the primary plan fails.

Example:

```text
PRIMARY TASK

Complete ML model training

If blocked:

FALLBACK 1
Run baseline model

If that fails:

FALLBACK 2
Run smaller dataset experiment
```

The UI could represent this as:

```text
Fallback Plan

Primary
[ Complete ML model training ]

Fallback
[ Run baseline model ]

Alternative
[ Run smaller experiment ]
```

This prevents the system from treating a failed original plan as total failure.

---

# 24. Task Decomposition

If a task is too large:

```text
Build complete AI chatbot
```

the user should be able to choose:

```text
Break Into Smaller Tasks
```

Result:

```text
Build complete AI chatbot

├── Create API
├── Create database schema
├── Build RAG pipeline
├── Build chat interface
└── Connect frontend
```

This maps naturally to the existing `parent_task_id` concept.

---

# 25. Subtasks

Subtasks should appear inside the Task Inspector.

```text
SUBTASKS

✓ Create API
✓ Create schema
○ Build RAG
○ Connect frontend

2 / 4 complete
```

Progress can optionally be calculated from subtasks.

---

# 26. Quantitative Tasks

Your backend supports:

```text
current_value
target_value
completion_type
```

The frontend should use these fields when appropriate.

Example:

```text
Study DSA

7 / 10 problems

██████████████░░░░░░
```

Do not display progress bars for tasks where progress has no meaningful numeric interpretation.

---

# 27. Binary Tasks

Normal completion:

```text
○ Submit assignment
```

After completion:

```text
✓ Submit assignment
```

No artificial percentage should be shown.

---

# 28. Time-Based Tasks

Potential future UI:

```text
Work on project

32 / 60 min

███████████░░░░░░
```

This should only appear if the task's execution/completion model supports it.

---

# 29. Dopamine / Reward / Joy System

The product can use subtle positive feedback.

Avoid turning the interface into an aggressive gamification system.

Bad:

```text
🔥🔥🔥 YOU ARE A PRODUCTIVITY GOD!!!
+500 XP!!!
```

Preferred:

```text
✓ Task complete

Nice. That's 4 tasks completed today.

Momentum
██████████████░░
```

Other examples:

```text
You cleared your highest-priority task.
```

```text
3 tasks completed today.
```

```text
2h 15m focused today.
```

```text
You're on a 3-day execution streak.
```

The reward system should reinforce **progress and momentum**, not create pressure.

---

# 30. Momentum

A lightweight concept can be displayed on the dashboard.

Example:

```text
TODAY

4 completed
2 remaining

Momentum

██████████████░░░░
```

Potential metrics:

- tasks completed
- high-priority tasks completed
- focus time
- completion streak
- planned vs completed

These should be introduced gradually.

---

# 31. Empty States

Every major view needs a deliberate empty state.

## No focus task

```text
NO CURRENT FOCUS

Choose one task to work on.

[ Choose Focus ]
```

## No tasks today

```text
CLEAR DAY

You have nothing scheduled today.

[ Add Task ]
```

## No upcoming tasks

```text
NOTHING UPCOMING

Your schedule is clear.

[ Add Task ]
```

## No tasks on calendar date

```text
No tasks planned.

[ Add Task ]
```

---

# 32. Loading States

Never leave a blank screen while waiting for API data.

Use skeletons.

Example:

```text
CURRENT FOCUS

████████████████
████████████
██████  ██████
```

Task list:

```text
████████████████████
████████████████
████████████████████
```

---

# 33. Error States

Example:

```text
Unable to load today's tasks.

Something went wrong while retrieving your tasks.

[ Try Again ]
```

Errors should be understandable and actionable.

Do not expose raw backend errors such as:

```text
500 Internal Server Error
```

as the primary user message.

---

# 34. Optimistic Interactions

For quick actions such as completing a task:

```text
User clicks Complete
       |
       v
UI immediately changes
       |
       v
API request
       |
       +---- success -> keep change
       |
       +---- failure -> rollback + error
```

This makes the interface feel responsive.

---

# 35. API Integration Architecture

Do not put API requests throughout UI components.

Recommended frontend structure:

```text
src/

  components/
    tasks/
      CurrentFocus.tsx
      TodayMission.tsx
      TaskCard.tsx
      TaskRow.tsx
      TaskInspector.tsx
      TaskForm.tsx
      TaskHistory.tsx
      TaskFallback.tsx
      TaskCalendar.tsx

  services/
    tasks.ts
    buckets.ts
    users.ts

  hooks/
    useTasks.ts
    useTask.ts
    useBuckets.ts

  types/
    task.ts
    bucket.ts

  pages/
    dashboard/
```

Exact folder naming can change, but the principle should remain:

```text
UI
 |
Hooks
 |
Service/API layer
 |
Backend
```

---

# 36. Existing Backend Mapping

The current backend already supports:

## User

```text
User
```

## Bucket

```text
Bucket
```

Fields include:

```text
id
user_id
name
position
ordering_strategy
created_at
updated_at
```

## Task

The task model supports concepts such as:

```text
task_type
execution_mode
completion_type
current_value
target_value
importance
deadline
estimated_duration
bucket_id
parent_task_id
completed_at
```

## TaskSchedule

Supports:

```text
start time
end time
recurrence
```

## TaskDependency

Supports task relationships/dependency graph.

---

# 37. Existing Endpoint Mapping

Current endpoints:

```text
POST   /users/
GET    /users/
GET    /users/{id}
PATCH  /users/{id}
DELETE /users/{id}

POST   /buckets/
GET    /buckets/{id}
GET    /buckets/user/{user_id}
PATCH  /buckets/{id}
DELETE /buckets/{id}

POST   /tasks/
GET    /tasks/{id}
GET    /tasks/user/{user_id}
PATCH  /tasks/{id}
POST   /tasks/{id}/complete
DELETE /tasks/{id}
```

The frontend should use these through a dedicated service layer.

---

# 38. Recommended Dashboard API

The existing CRUD endpoints are useful, but the dashboard should eventually have a purpose-built endpoint.

Potential endpoint:

```http
GET /tasks/dashboard
```

Potential response:

```json
{
  "focus_task": {},
  "today": [],
  "upcoming": [],
  "overdue": [],
  "stats": {
    "completed": 4,
    "remaining": 2
  }
}
```

This prevents the frontend from needing to reconstruct the entire dashboard from many independent requests.

The exact response schema should be decided together with backend requirements before implementation.

---

# 39. Important Backend Features Still Needed for Full Vision

The current backend handles the **current state** of tasks very well.

The dynamic-product vision will eventually need additional concepts.

Potential future models:

```text
Task
TaskSchedule
TaskDependency
TaskType
TaskHistory
TaskFallback
```

Potential history information:

```text
task_id
action
old_value
new_value
reason
created_at
```

Examples of actions:

```text
CREATED
FOCUSED
STARTED
PAUSED
COMPLETED
RESCHEDULED
REDEFINED
DECOMPOSED
BUCKET_CHANGED
DEADLINE_CHANGED
FALLBACK_USED
ABANDONED
```

Do not implement every future feature immediately.

However, the frontend architecture should not prevent these features.

---

# 40. Task Action Model

The frontend should think in terms of actions.

```text
Task
 |
 +-- Complete
 +-- Focus
 +-- Pause
 +-- Edit
 +-- Reschedule
 +-- Redefine
 +-- Move Bucket
 +-- Decompose
 +-- Add Fallback
 +-- View History
 +-- Delete
 +-- Abandon
```

This is more scalable than designing the UI around only CRUD.

---

# 41. UI vs Backend Responsibility

## Frontend should handle

- Visual presentation
- User interaction
- Form state
- Optimistic UI
- Loading states
- Error states
- Modal/panel state
- Calendar interaction
- Animations
- Temporary input state

## Backend should handle

- Task persistence
- Authorization
- Business rules
- Deadline logic
- Task relationships
- Dependency validation
- Recurrence
- Task lifecycle persistence
- History
- Fallback persistence
- Progress persistence

Do not duplicate important business rules in React.

---

# 42. Design System Requirements

Before asking an AI coding tool to build the frontend, define:

```text
Colors
Typography
Spacing
Border radius
Buttons
Inputs
Cards
Badges
Dialogs
Side panels
Calendar styles
Task states
```

Example spacing scale:

```text
4
8
12
16
24
32
48
```

Example semantic colors:

```text
Background
Surface
Primary
Text
Muted
Border
Success
Warning
Danger
```

Avoid hardcoding random colors across components.

Use design tokens / CSS variables.

---

# 43. Visual Direction

The product should feel:

- calm
- focused
- modern
- technical
- clean
- productivity-oriented
- easy to scan

Avoid:

- excessive gradients
- excessive glassmorphism
- too many colors
- giant decorative illustrations
- aggressive gamification
- unnecessary animations
- overly dense dashboards

The most important content should remain visually dominant:

```text
Current Focus
      ↓
Today's Mission
      ↓
Calendar
```

---

# 44. AI-Assisted Frontend Workflow

The preferred workflow for this project:

```text
1. Define feature
       ↓
2. Define user interaction
       ↓
3. Define API contract
       ↓
4. Collect 3–5 visual references
       ↓
5. Create visual direction
       ↓
6. Define design tokens
       ↓
7. Build static React UI
       ↓
8. Use realistic mock data
       ↓
9. Test UX
       ↓
10. Connect real API
       ↓
11. Implement loading/error/empty states
       ↓
12. Implement optimistic actions
       ↓
13. Responsive testing
       ↓
14. Polish animations/interactions
```

---

# 45. How to Use Kiro / AI Coding Tools

Do not give the coding agent only a screenshot.

Give it:

```text
1. Page purpose
2. User flow
3. Layout structure
4. Design reference
5. Design tokens
6. Component requirements
7. Mock data
8. API contract
9. Interaction requirements
10. Constraints
```

Example instruction:

```text
Build the ProductivityOS Task Dashboard.

The dashboard has three primary sections:

1. Current Focus
2. Today's Mission
3. Month Calendar

Current Focus must occupy the largest visual area.

The current focus represents one active task and exposes:
- bucket
- title
- description
- importance
- deadline
- estimated duration
- progress when applicable
- focus
- complete
- edit
- reschedule
- redefine actions

Today's Mission displays today's tasks with quick actions.

The calendar provides a month-level overview.

Use realistic mock data initially.
Do not connect APIs yet.

Keep API logic outside UI components.

Use the provided design tokens.

Build responsive components.
```

This gives the coding agent enough context to make coherent decisions.

---

# 46. First Frontend MVP

Do NOT build every dynamic feature immediately.

The first frontend milestone should be:

```text
Dashboard
 |
 +-- Current Focus
 |
 +-- Today's Mission
 |
 +-- Month Calendar
 |
 +-- Add Task
 |
 +-- Edit Task
 |
 +-- Complete Task
 |
 +-- Reschedule
```

Use mock data first.

---

# 47. Second Frontend Milestone

Connect:

```text
GET tasks
POST task
PATCH task
POST complete
DELETE task
GET buckets
```

Then implement:

```text
Real Current Focus
Real Today's Mission
Real Calendar
Real Bucket selection
```

---

# 48. Third Milestone

Dynamic task behavior:

```text
Reschedule
Deadline changes
Subtasks
Dependencies
Task Inspector
Task History
```

---

# 49. Fourth Milestone

Adaptive productivity features:

```text
Redefine
Fallback
Task decomposition
Momentum
Completion feedback
Focus sessions
```

---

# 50. Non-Goals for Initial Version

Do not try to build all of this at once:

```text
AI task planning
Complex analytics
Social features
Leaderboards
Huge gamification system
Advanced notification engine
Complex calendar synchronization
Multiple productivity methodologies
```

The core loop must work first:

```text
Create
  ↓
Plan
  ↓
Focus
  ↓
Execute
  ↓
Complete OR Adapt
```

---

# 51. Core Product Loop

The entire frontend should ultimately reinforce this:

```text
                 CREATE TASK
                     |
                     v
                  SCHEDULE
                     |
                     v
               TODAY'S MISSION
                     |
                     v
                CURRENT FOCUS
                     |
              +------+------+
              |             |
              v             v
          COMPLETE       CAN'T COMPLETE
              |             |
              v             v
          FEEDBACK      ADAPT TASK
                            |
              +-------------+-------------+
              |             |             |
              v             v             v
          RESCHEDULE     REDEFINE     DECOMPOSE
              |             |             |
              +-------------+-------------+
                            |
                            v
                         CONTINUE
```

This loop is the central product experience.

---

# 52. Final Frontend Requirement

The frontend should **not feel like a database UI**.

It should not feel like:

```text
Tasks table
+
CRUD buttons
```

It should feel like:

```text
What matters now?
       ↓
What must happen today?
       ↓
What is coming later?
       ↓
What changed?
       ↓
What should I do next?
```

The frontend is therefore responsible for turning the backend's rich task model into a simple execution experience.

---

# 53. Immediate Next Step

Before writing the actual React dashboard, finalize these artifacts:

```text
1. Dashboard wireframe
2. Current Focus component
3. Today's Mission component
4. Month Calendar component
5. Task Inspector
6. Add/Edit Task form
7. Task action menu
8. Reschedule flow
9. Redefine flow
10. Deadline/fallback flow
11. Design system
12. Frontend API contract
```

After those are defined, implementation becomes much more straightforward.

---

# 54. One-Sentence Product Definition

> **ProductivityOS is a task execution system that helps users decide what to focus on, execute today's work, see the bigger picture, and adapt tasks when reality changes.**

That definition should guide every frontend decision.
