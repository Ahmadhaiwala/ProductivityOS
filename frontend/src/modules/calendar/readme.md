# states
Previous month
      ↓
visibleMonth = previous month

Next month
      ↓
visibleMonth = next month

Click date
      ↓
selectedDate = clicked date

Midnight
      ↓
today = new current date


# high level algo
Calendar
│
├── 1. Determine current date
│
├── 2. Determine visible month
│
├── 3. Generate calendar days
│      │
│      ├── Find first day of month
│      ├── Find weekday offset
│      ├── Add previous-month days
│      ├── Add current-month days
│      └── Add next-month days
│
├── 4. Enrich each day
│      │
│      ├── isToday
│      ├── isSelected
│      ├── isCurrentMonth
│      └── taskCount
│
└── 5. Render
       │
       ├── Calendar Header
       ├── Weekday Header
       └── Calendar Grid

# Calendar Module — Engineering Decisions

## Purpose

This document records the engineering decisions and constraints for the Calendar module.

The goal is to keep the calendar implementation predictable, maintainable, and independent from task-fetching/business logic.

---

## 1. Calendar and Task Data Are Separate

The Calendar component is responsible for:

* Generating calendar dates
* Rendering the calendar grid
* Managing selected date
* Identifying today's date
* Managing visible month
* Displaying task counts for dates

The Calendar component should **not** be responsible for fetching or managing complete task objects.

Task fetching will be designed separately.

### Decision

> Calendar UI represents dates. Task data is supplied to it.

---

## 2. Calendar Day Is the Primary UI Unit

Each rendered calendar cell should represent one calendar date.

Conceptually:

```ts
type CalendarDay = {
  date: string;              // YYYY-MM-DD
  dayNumber: number;

  isToday: boolean;
  isSelected: boolean;
  isCurrentMonth: boolean;

  taskCount: number;
};
```

The calendar should operate on this normalized representation rather than passing around multiple date formats.

---

## 3. Calendar Dates Use `YYYY-MM-DD`

For a calendar **day**, use:

```text
YYYY-MM-DD
```

Example:

```text
2026-10-05
```

This represents a calendar date rather than a timestamp.

Avoid using different representations for the same concept, such as:

```text
10/05/2026
2026-10-05
Date object
Unix timestamp
```

unless there is a specific reason.

---

## 4. Today, Selected Date, and Visible Month Are Independent

These are three different concepts.

### Today

The actual current local date.

```text
today = 2026-10-01
```

### Selected Date

The date currently selected by the user.

```text
selectedDate = 2026-10-15
```

### Visible Month

The month currently displayed by the calendar.

```text
visibleMonth = October 2026
```

Changing one must not implicitly change the others unless explicitly required by the UX.

Example:

```text
Today:        October 1
Selected:     October 15
Visible:      October 2026
```

The user should be able to navigate to another month without changing what "today" means.

---

## 5. Midnight Is a Calendar Boundary

The application must recognize when the local calendar date changes.

Example:

```text
October 1, 11:59:59 PM
          ↓
October 2, 12:00:00 AM
```

The `today` state should eventually update to October 2.

This matters even when the application remains open across midnight.

However, the selected date should **not automatically change just because midnight occurred**.

Example:

```text
Before midnight:
today = Oct 1
selectedDate = Oct 15

After midnight:
today = Oct 2
selectedDate = Oct 15
```

Whether the application follows today's date automatically is a separate UX decision.

---

## 6. App Reopening Must Recalculate Today

The application must not rely exclusively on a timer to determine the current date.

If the application was closed:

```text
Oct 1 → application closed
       ↓
Oct 2 → application opened
```

the calendar should immediately determine the current date from the system clock.

The midnight timer is only necessary for an already-open application.

---

## 7. Calendar Must Handle Month Boundaries

Month generation must correctly handle:

```text
January → December
December → January
```

and automatically update the year.

Example:

```text
December 2026
      ↓
January 2027
```

No hardcoded month/year transitions.

---

## 8. Calendar Must Handle Variable Month Length

The implementation must support:

```text
28 days
29 days
30 days
31 days
```

without hardcoding the number of days for each month.

---

## 9. Leap Years Must Be Supported

February must correctly handle leap years.

Example:

```text
2028 → February 29
2027 → February 28
```

Leap-year behavior should come from the date calculation logic rather than manually maintained conditions wherever possible.

---

## 10. Previous and Next Month Days

The calendar may render days belonging to the previous or next month in the current grid.

Example:

```text
Sun Mon Tue Wed Thu Fri Sat
27  28  29  30   1   2   3
```

Those dates are valid calendar cells but should be distinguishable using:

```ts
isCurrentMonth
```

Example:

```ts
{
  date: "2026-09-30",
  dayNumber: 30,
  isCurrentMonth: false
}
```

---

## 11. Task Count Is Optional Calendar Metadata

The calendar only needs a lightweight task count for each date.

Example:

```ts
{
  date: "2026-10-05",
  taskCount: 3
}
```

The calendar does not need the complete task list just to render the monthly overview.

Task fetching for a selected date will be designed separately.

---

## 12. Zero Tasks Should Not Be Treated as a Special Calendar State

A date with no tasks should simply have:

```ts
taskCount: 0
```

The UI can decide whether to display anything.

For example:

```tsx
{taskCount > 0 && <TaskCountBadge />}
```

The calendar's data model should still retain `0`.

---

## 13. Large Task Counts Must Not Break the Calendar Layout

The calendar cell must remain visually stable even when a date has many tasks.

Potential UI representation:

```text
1
7
42
99+
```

The exact visual treatment is a UI decision, but task counts should never determine the size of the calendar cell.

---

## 14. Calendar Generation Should Be Pure

The calendar-date generation logic should ideally be independent of React.

Conceptually:

```ts
generateCalendarDays(year, month)
```

should receive inputs and return calendar data.

Example:

```ts
const days = generateCalendarDays(2026, 9);
```

It should not:

* Fetch tasks
* Modify React state
* Access the DOM
* Perform API requests
* Depend on component lifecycle

This makes the date-generation algorithm easy to test independently.

---

## 15. Calendar UI Should Not Contain Business Logic

Avoid putting logic such as:

```text
fetch tasks
calculate task statistics
update backend
apply task completion rules
```

inside the calendar rendering components.

Prefer:

```text
Data / State
     ↓
Calendar Logic
     ↓
CalendarDay[]
     ↓
Calendar UI
```

This keeps the UI layer simple.

---

## 16. Date and Time Must Be Distinguished

A calendar date such as:

```text
2026-10-05
```

is different from a timestamp such as:

```text
2026-10-05T14:30:00+05:30
```

The Calendar module currently deals primarily with **calendar dates**.

Time-based task scheduling will be handled as a separate concern when required.

---

# Current Scope

For the first Calendar implementation, we only need to solve:

* Month generation
* Previous/next month cells
* Month navigation
* Today detection
* Selected date
* Visible month
* Task count placeholder
* Correct date transitions
* Midnight/date rollover behavior

## Explicitly Out of Scope for Now

* Fetching full task objects
* Task creation
* Task editing
* Drag and drop
* Task resizing
* Time-slot calendar
* Backend integration
* Task completion logic
* Task synchronization
* Notifications/reminders

These should be designed separately rather than prematurely coupling them to the Calendar module.

---

# Core Principle

> **The Calendar is a date visualization system, not a task-management system.**

Tasks are data associated with dates.

The Calendar's primary responsibility is to correctly answer:

```text
What dates should be displayed?
Where should each date appear?
Which date is today?
Which date is selected?
Which month is visible?
How many tasks are associated with each date?
```

Everything beyond those responsibilities should be introduced as a separate module or layer.
