// Calendar-specific types
export interface CalendarDay {
  date: number;
  taskCount?: number;
  isToday?: boolean;
  isSelected?: boolean;
}

export interface CalendarWeek {
  days: (CalendarDay | null)[];
}
