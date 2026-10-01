// Pure calendar generation logic (no React dependencies)

import { getDaysInMonth, getFirstDayOfMonth, createDateString } from './dateUtils';

export interface CalendarDay {
  date: string;              // YYYY-MM-DD
  dayNumber: number;
  
  isToday: boolean;
  isSelected: boolean;
  isCurrentMonth: boolean;
  
  taskCount: number;
}

export interface CalendarWeek {
  days: CalendarDay[];
}

/**
 * Generates calendar days for a given month
 * This is a pure function that doesn't depend on React or side effects
 * 
 * Algorithm:
 * 1. Determine first day of month and weekday offset
 * 2. Add previous month days to fill the first week
 * 3. Add all current month days
 * 4. Add next month days to complete the last week
 * 5. Enrich each day with metadata (isToday, isSelected, etc.)
 */




export function generateCalendarDays(
  year: number,
  month: number,
  todayYMD: string,
  selectedDateYMD: string | null,
  taskCounts: Record<string, number> = {}
): CalendarWeek[] {
  const weeks: CalendarWeek[] = [];
  const days: CalendarDay[] = [];
  
  // 1. Find first day of month and weekday offset
  const firstDayWeekday = getFirstDayOfMonth(year, month);
  const daysInCurrentMonth = getDaysInMonth(year, month);
  
  // 2. Add previous month days
  if (firstDayWeekday > 0) {
    const prevMonth = month === 0 ? 11 : month - 1;
    const prevYear = month === 0 ? year - 1 : year;
    const daysInPrevMonth = getDaysInMonth(prevYear, prevMonth);
    
    for (let i = firstDayWeekday - 1; i >= 0; i--) {
      const dayNumber = daysInPrevMonth - i;
      const dateStr = createDateString(prevYear, prevMonth, dayNumber);
      
      days.push({
        date: dateStr,
        dayNumber,
        isToday: dateStr === todayYMD,
        isSelected: dateStr === selectedDateYMD,
        isCurrentMonth: false,
        taskCount: taskCounts[dateStr] || 0,
      });
    }
  }
  
  // 3. Add current month days
  for (let day = 1; day <= daysInCurrentMonth; day++) {
    const dateStr = createDateString(year, month, day);
    
    days.push({
      date: dateStr,
      dayNumber: day,
      isToday: dateStr === todayYMD,
      isSelected: dateStr === selectedDateYMD,
      isCurrentMonth: true,
      taskCount: taskCounts[dateStr] || 0,
    });
  }
  
  // 4. Add next month days to complete the grid
  const remainingCells = 42 - days.length; // 6 weeks * 7 days
  const nextMonth = month === 11 ? 0 : month + 1;
  const nextYear = month === 11 ? year + 1 : year;
  
  for (let day = 1; day <= remainingCells; day++) {
    const dateStr = createDateString(nextYear, nextMonth, day);
    
    days.push({
      date: dateStr,
      dayNumber: day,
      isToday: dateStr === todayYMD,
      isSelected: dateStr === selectedDateYMD,
      isCurrentMonth: false,
      taskCount: taskCounts[dateStr] || 0,
    });
  }
  
  // 5. Group days into weeks
  for (let i = 0; i < days.length; i += 7) {
    weeks.push({
      days: days.slice(i, i + 7),
    });
  }
  
  return weeks;
}
