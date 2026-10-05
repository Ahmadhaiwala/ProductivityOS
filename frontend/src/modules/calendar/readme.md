# Calendar Module - Complete In-Depth Workflow Explanation

Let me walk you through the entire calendar system from architecture to execution. I'll explain each layer and how they work together.

## 📁 Architecture Overview

```
Calendar Module
│
├── utils/              (Pure logic - no React)
│   ├── dateUtils.ts          → Date manipulation functions
│   └── calendarGenerator.ts  → Calendar grid generation
│
├── hooks/              (React state management)
│   └── useCalendar.ts        → Custom hook for calendar state
│
└── components/         (UI/Presentation)
    └── MonthCalendar.tsx     → Visual rendering
```

---

## 🔧 Layer 1: dateUtils.ts (Foundation Layer)

This file contains **pure utility functions** for date operations. No React, no side effects.

### Key Functions Explained:

#### 1. **formatDateToYMD(date: Date): string**
```typescript
formatDateToYMD(new Date('2026-10-05')) → "2026-10-05"
```
**Purpose**: Converts JavaScript `Date` object to standardized string format
**Why**: We need a consistent date format for:
- Object keys (taskCounts lookup)
- Comparisons (isToday checks)
- Display consistency

#### 2. **getTodayYMD(): string**
```typescript
getTodayYMD() → "2026-10-05"
```
**Purpose**: Gets current system date as YYYY-MM-DD
**Why**: We need to know "today" to highlight the current day in the calendar

#### 3. **getDaysInMonth(year, month): number**
```typescript
getDaysInMonth(2026, 1) → 28  // February 2026
getDaysInMonth(2028, 1) → 29  // February 2028 (leap year)
```
**Purpose**: Returns how many days are in a specific month
**How it works**: 
```typescript
new Date(2026, 2, 0).getDate()  // Month+1, Day 0 = last day of previous month
```
**Why**: We need to know when to stop generating days for the current month

#### 4. **getFirstDayOfMonth(year, month): number**
```typescript
getFirstDayOfMonth(2026, 9) → 4  // October 1, 2026 is Thursday
// 0=Sunday, 1=Monday, ..., 6=Saturday
```
**Purpose**: Determines which day of the week the month starts on
**Why**: We need this to know how many previous-month days to show before the 1st

#### 5. **getPreviousMonth(year, month)**
```typescript
getPreviousMonth(2026, 0) → { year: 2025, month: 11 }  // Jan → Dec of prev year
getPreviousMonth(2026, 5) → { year: 2026, month: 4 }   // Jun → May
```
**Purpose**: Calculates previous month, handling year boundaries
**Why**: For calendar navigation (< button)

#### 6. **getNextMonth(year, month)**
```typescript
getNextMonth(2026, 11) → { year: 2027, month: 0 }  // Dec → Jan of next year
getNextMonth(2026, 5) → { year: 2026, month: 6 }   // Jun → Jul
```
**Purpose**: Calculates next month, handling year boundaries
**Why**: For calendar navigation (> button)

---

## 🏭 Layer 2: calendarGenerator.ts (Pure Logic Layer)

This file generates the **calendar grid data** - completely independent of React.

### Data Structures:

```typescript
interface CalendarDay {
  date: string;              // "2026-10-05"
  dayNumber: number;         // 5
  isToday: boolean;          // true if current system date
  isSelected: boolean;       // true if user clicked this date
  isCurrentMonth: boolean;   // false for prev/next month days
  taskCount: number;         // 0, 3, 15, 99+
}

interface CalendarWeek {
  days: CalendarDay[];       // Array of 7 CalendarDay objects
}
```

### The Main Function: generateCalendarDays()

This is the **core algorithm**. Let me break it down step by step:

```typescript
generateCalendarDays(
  year: 2026,
  month: 9,              // October (0-indexed)
  todayYMD: "2026-10-05",
  selectedDateYMD: null,
  taskCounts: { "2026-10-05": 3, "2026-10-15": 2 }
)
```

#### Step 1: Find month boundaries
```typescript
const firstDayWeekday = getFirstDayOfMonth(2026, 9)  // → 4 (Thursday)
const daysInCurrentMonth = getDaysInMonth(2026, 9)   // → 31
```

**What we now know**:
- October 2026 has 31 days
- October 1st is a Thursday (day 4 of the week)

#### Step 2: Add previous month days (fill the first week)
```typescript
// If October starts on Thursday (4), we need 4 cells before it
// (Sunday=0, Monday=1, Tuesday=2, Wednesday=3)

if (firstDayWeekday > 0) {  // 4 > 0, so yes
  const prevMonth = 8;       // September
  const prevYear = 2026;
  const daysInPrevMonth = getDaysInMonth(2026, 8);  // → 30
  
  // We need days: 27, 28, 29, 30 from September
  for (let i = 3; i >= 0; i--) {  // Loop backwards
    const dayNumber = 30 - i;     // 27, 28, 29, 30
    days.push({
      date: "2026-09-27",
      dayNumber: 27,
      isToday: false,
      isSelected: false,
      isCurrentMonth: false,       // ← Important!
      taskCount: 0
    });
  }
}
```

**Result so far**:
```
[Sep 27] [Sep 28] [Sep 29] [Sep 30] [Oct 1] [Oct 2] [Oct 3]
```

#### Step 3: Add all current month days
```typescript
for (let day = 1; day <= 31; day++) {  // October 1-31
  const dateStr = createDateString(2026, 9, day);  // "2026-10-01", etc.
  
  days.push({
    date: dateStr,
    dayNumber: day,
    isToday: dateStr === "2026-10-05",      // Check if today
    isSelected: dateStr === null,            // Check if selected
    isCurrentMonth: true,                    // ← This is October
    taskCount: taskCounts[dateStr] || 0      // Lookup task count
  });
}
```

**State after current month**:
```
Week 1: [Sep 27] [Sep 28] [Sep 29] [Sep 30] [Oct 1] [Oct 2] [Oct 3]
Week 2: [Oct 4] [Oct 5] [Oct 6] ... [Oct 10]
Week 3: [Oct 11] ... [Oct 17]
Week 4: [Oct 18] ... [Oct 24]
Week 5: [Oct 25] ... [Oct 31] → Only 7 days filled
```

#### Step 4: Fill remaining cells with next month
```typescript
// Total cells needed: 6 weeks × 7 days = 42 cells
const remainingCells = 42 - days.length;  // How many more do we need?

for (let day = 1; day <= remainingCells; day++) {
  days.push({
    date: "2026-11-01",  // November days
    dayNumber: day,
    isToday: false,
    isSelected: false,
    isCurrentMonth: false,  // ← Not October
    taskCount: 0
  });
}
```

**Final grid (42 cells)**:
```
Week 1: [Sep 27] [Sep 28] [Sep 29] [Sep 30] [Oct 1] [Oct 2] [Oct 3]
Week 2: [Oct 4] [Oct 5*] [Oct 6] [Oct 7] [Oct 8] [Oct 9] [Oct 10]
Week 3: [Oct 11] [Oct 12] [Oct 13] [Oct 14] [Oct 15] [Oct 16] [Oct 17]
Week 4: [Oct 18] [Oct 19] [Oct 20] [Oct 21] [Oct 22] [Oct 23] [Oct 24]
Week 5: [Oct 25] [Oct 26] [Oct 27] [Oct 28] [Oct 29] [Oct 30] [Oct 31]
Week 6: [Nov 1] [Nov 2] [Nov 3] [Nov 4] [Nov 5] [Nov 6] [Nov 7]

* = isToday
```

#### Step 5: Group into weeks
```typescript
for (let i = 0; i < days.length; i += 7) {
  weeks.push({
    days: days.slice(i, i + 7)  // Take 7 days at a time
  });
}

return weeks;  // 6 weeks total
```

**Why pure function?**
- No side effects
- Same inputs → same output
- Easy to test: `expect(generateCalendarDays(2026, 9, ...)).toEqual([...])`
- Can run on server, in tests, anywhere

---

## ⚛️ Layer 3: useCalendar.ts (React State Management)

This hook **manages the calendar's state** and **calls the pure functions**.

### State Management:

```typescript
// 1. Track today (updates at midnight)
const [todayYMD, setTodayYMD] = useState(getTodayYMD());

// 2. Track visible month (changes with < > buttons)
const [visibleYear, setVisibleYear] = useState(2026);
const [visibleMonth, setVisibleMonth] = useState(9);  // October

// 3. Track selected date (changes on click)
const [selectedDate, setSelectedDate] = useState<string | null>(null);
```

**Key Principle**: These three states are **independent**!

```
Today:    October 5, 2026
Selected: October 15, 2026
Viewing:  December 2026

^ All three can be different!
```

### Calendar Generation (happens on every render):

```typescript
const weeks = generateCalendarDays(
  visibleYear,     // What year we're viewing
  visibleMonth,    // What month we're viewing
  todayYMD,        // What day is today (for highlighting)
  selectedDate,    // What day user clicked (for highlighting)
  taskCounts       // Task data from parent (App.tsx)
);
```

**When does this re-run?**
- User clicks < or > (changes visibleMonth)
- User selects a date (changes selectedDate)
- Midnight occurs (changes todayYMD)
- Parent provides new taskCounts

### Midnight Detection (Advanced Feature):

```typescript
useEffect(() => {
  // Function to check if date changed
  const checkMidnight = () => {
    const newToday = getTodayYMD();
    if (newToday !== todayYMD) {
      setTodayYMD(newToday);  // Update today marker
    }
  };
  
  // Check every minute
  const interval = setInterval(checkMidnight, 60000);
  
  // Also check when tab becomes visible
  const handleVisibilityChange = () => {
    if (!document.hidden) {
      checkMidnight();  // User came back, check date
    }
  };
  
  document.addEventListener('visibilitychange', handleVisibilityChange);
  
  return () => {
    clearInterval(interval);
    document.removeEventListener('visibilitychange', handleVisibilityChange);
  };
}, [todayYMD]);
```

**Scenario**: User opens app on October 5 at 11:50 PM
1. `todayYMD` = "2026-10-05"
2. October 5 has accent border (isToday = true)
3. User keeps app open past midnight
4. Timer fires, detects new date
5. `setTodayYMD("2026-10-06")` called
6. Calendar re-generates
7. October 6 now has accent border

### Navigation Actions:

```typescript
const goToPreviousMonth = () => {
  const prev = getPreviousMonth(visibleYear, visibleMonth);
  setVisibleYear(prev.year);    // Update both year and month
  setVisibleMonth(prev.month);
};

// Example:
// Current: October 2026
// Click <
// → September 2026

// Current: January 2026
// Click <
// → December 2025  (year changes!)
```

### Hook Return Value:

```typescript
return {
  // State (for UI to read)
  todayYMD,         // "2026-10-05"
  visibleYear,      // 2026
  visibleMonth,     // 9
  selectedDate,     // "2026-10-15" or null
  weeks,            // CalendarWeek[] (the grid data)
  
  // Actions (for UI to call)
  goToPreviousMonth,
  goToNextMonth,
  goToToday,
  selectDate,
};
```

---

## 🎨 Layer 4: MonthCalendar.tsx (UI Component)

This component **renders** the calendar using data from the hook.

### Component Flow:

```typescript
export function MonthCalendar({ taskCounts, onDateSelect }: Props) {
  // 1. Get calendar state from hook
  const {
    visibleYear,
    visibleMonth,
    selectedDate,
    weeks,              // ← The grid data!
    goToPreviousMonth,
    goToNextMonth,
    selectDate,
  } = useCalendar(taskCounts);  // ← Pass in task counts
  
  // 2. Handle date clicks
  const handleDateClick = (date: string) => {
    selectDate(date);           // Update hook state
    onDateSelect?.(date);       // Notify parent (App.tsx)
  };
  
  // 3. Render...
}
```

### Rendering Logic:

```jsx
{/* Header with navigation */}
<div>
  <h3>{getMonthName(visibleMonth)} {visibleYear}</h3>
  <button onClick={goToPreviousMonth}><ChevronLeft /></button>
  <button onClick={goToNextMonth}><ChevronRight /></button>
</div>

{/* Weekday labels */}
<div>
  {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(...)}
</div>

{/* Calendar grid */}
{weeks.map((week) => (
  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)' }}>
    {week.days.map((day) => (
      <CalendarDayCell
        day={day}
        isSelected={day.date === selectedDate}
        onClick={() => handleDateClick(day.date)}
      />
    ))}
  </div>
))}
```

### CalendarDayCell (Individual Date Cell):

```typescript
function CalendarDayCell({ day, isSelected, onClick }) {
  return (
    <div
      onClick={onClick}
      style={{
        border: day.isToday 
          ? '2px solid var(--accent)'      // Today → orange border
          : isSelected 
            ? '2px solid var(--primary)'    // Selected → teal border
            : '1px solid var(--border)',    // Normal → gray border
        
        backgroundColor: day.isToday
          ? 'rgba(211, 94, 54, 0.05)'      // Today → light orange bg
          : isSelected
            ? 'rgba(42, 67, 67, 0.05)'      // Selected → light teal bg
            : 'transparent',
        
        opacity: day.isCurrentMonth ? 1 : 0.4,  // Dim prev/next month
      }}
    >
      {/* Day number */}
      <div>{day.dayNumber}</div>
      
      {/* Task count badge */}
      {day.taskCount > 0 && (
        <div>
          {day.taskCount > 99 ? '99+' : day.taskCount}
        </div>
      )}
    </div>
  );
}
```

---

## 🔄 Complete Data Flow Example

Let's trace a real scenario from start to finish:

### Scenario: User opens app, clicks on October 15

#### 1. **App.tsx (Parent) starts**
```typescript
// Calculate task counts
const taskCountsByDate = {
  "2026-10-05": 3,
  "2026-10-07": 2,
  "2026-10-15": 5
};

// Render calendar
<MonthCalendar 
  taskCounts={taskCountsByDate}
  onDateSelect={handleDateSelect}
/>
```

#### 2. **MonthCalendar receives props**
```typescript
function MonthCalendar({ taskCounts, onDateSelect }) {
  const { weeks, selectDate, ... } = useCalendar(taskCounts);
  // ...
}
```

#### 3. **useCalendar hook initializes**
```typescript
// Initial state
todayYMD = "2026-10-05"  // from getTodayYMD()
visibleYear = 2026        // from new Date().getFullYear()
visibleMonth = 9          // from new Date().getMonth()
selectedDate = null       // nothing selected yet
```

#### 4. **generateCalendarDays is called**
```typescript
const weeks = generateCalendarDays(
  2026,  // visibleYear
  9,     // visibleMonth
  "2026-10-05",  // todayYMD
  null,          // selectedDate
  { "2026-10-05": 3, "2026-10-07": 2, "2026-10-15": 5 }
);

// Returns:
[
  { days: [Sep27, Sep28, Sep29, Sep30, Oct1, Oct2, Oct3] },
  { days: [Oct4, Oct5(isToday=true, taskCount=3), Oct6, Oct7(taskCount=2), ...] },
  { days: [Oct11, Oct12, Oct13, Oct14, Oct15(taskCount=5), ...] },
  // ... more weeks
]
```

#### 5. **UI renders the grid**
```
Week 2: [4] [5*] [6] [7] [8] [9] [10]
             ↑    ↑
          Today  Has
         Orange  tasks
         border   (2)

Week 3: [11] [12] [13] [14] [15] [16] [17]
                               ↑
                            Has tasks
                              (5)
```

#### 6. **User clicks on October 15**
```typescript
// handleDateClick is called
handleDateClick("2026-10-15")

// Which calls:
selectDate("2026-10-15")  // Update hook state
onDateSelect?.("2026-10-15")  // Notify App.tsx
```

#### 7. **Hook state updates**
```typescript
selectedDate: null → "2026-10-15"
```

#### 8. **Calendar re-generates**
```typescript
const weeks = generateCalendarDays(
  2026,
  9,
  "2026-10-05",
  "2026-10-15",  // ← Now has selected date!
  taskCounts
);

// Oct 15 now has:
{
  date: "2026-10-15",
  dayNumber: 15,
  isToday: false,
  isSelected: true,  // ← Changed!
  isCurrentMonth: true,
  taskCount: 5
}
```

#### 9. **UI re-renders with new highlight**
```
Week 3: [11] [12] [13] [14] [15◆] [16] [17]
                               ↑
                          Selected!
                          Teal border
                          Badge shows: 5
```

---

## 🎯 Key Design Principles

### 1. **Separation of Concerns**
```
dateUtils       → Pure date math
calendarGenerator → Pure grid logic
useCalendar     → React state
MonthCalendar   → UI presentation
```

### 2. **Single Responsibility**
- `dateUtils` only handles dates
- `calendarGenerator` only creates grid data
- `useCalendar` only manages state
- `MonthCalendar` only renders UI

### 3. **Testability**
```typescript
// Easy to test pure functions
test('generateCalendarDays for October 2026', () => {
  const weeks = generateCalendarDays(2026, 9, '2026-10-05', null, {});
  expect(weeks.length).toBe(6);
  expect(weeks[0].days[0].date).toBe('2026-09-27');
  expect(weeks[1].days[1].isToday).toBe(true);
});
```

### 4. **Unidirectional Data Flow**
```
App.tsx (taskCounts)
    ↓
MonthCalendar (props)
    ↓
useCalendar (hook)
    ↓
generateCalendarDays (pure function)
    ↓
dateUtils (utilities)
```

This architecture makes the calendar:
- **Easy to understand** (each layer has one job)
- **Easy to test** (pure functions)
- **Easy to maintain** (change one layer without breaking others)
- **Easy to extend** (add features without rewriting core logic)