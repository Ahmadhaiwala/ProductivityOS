// Calendar state management hook

import { useState, useEffect } from 'react';
import { generateCalendarDays } from '../utils/calendarGenerator';
import { getTodayYMD, getPreviousMonth, getNextMonth } from '../utils/dateUtils';

export function useCalendar(taskCounts: Record<string, number> = {}) {
  // 1. Determine current date
  const [todayYMD, setTodayYMD] = useState(getTodayYMD());
  
  // 2. Determine visible month (defaults to current month)
  const now = new Date();
  const [visibleYear, setVisibleYear] = useState(now.getFullYear());
  const [visibleMonth, setVisibleMonth] = useState(now.getMonth());
  
  // Track selected date (independent from today and visible month)
  const [selectedDate, setSelectedDate] = useState<string | null>(null);
  
  // 3. Generate calendar days
  const weeks = generateCalendarDays(
    visibleYear,
    visibleMonth,
    todayYMD,
    selectedDate,
    taskCounts
  );
  
  // Handle midnight rollover
  useEffect(() => {
    const checkMidnight = () => {
      const newToday = getTodayYMD();
      if (newToday !== todayYMD) {
        setTodayYMD(newToday);
      }
    };
    
    // Check every minute if date has changed
    const interval = setInterval(checkMidnight, 60000);
    
    // Also check when tab becomes visible
    const handleVisibilityChange = () => {
      if (!document.hidden) {
        checkMidnight();
      }
    };
    
    document.addEventListener('visibilitychange', handleVisibilityChange);
    
    return () => {
      clearInterval(interval);
      document.removeEventListener('visibilitychange', handleVisibilityChange);
    };
  }, [todayYMD]);
  
  // Navigation actions
  const goToPreviousMonth = () => {
    const prev = getPreviousMonth(visibleYear, visibleMonth);
    setVisibleYear(prev.year);
    setVisibleMonth(prev.month);
  };
  
  const goToNextMonth = () => {
    const next = getNextMonth(visibleYear, visibleMonth);
    setVisibleYear(next.year);
    setVisibleMonth(next.month);
  };
  
  const goToToday = () => {
    const now = new Date();
    setVisibleYear(now.getFullYear());
    setVisibleMonth(now.getMonth());
  };
  
  const selectDate = (dateYMD: string) => {
    setSelectedDate(dateYMD);
  };
  
  return {
    // State
    todayYMD,
    visibleYear,
    visibleMonth,
    selectedDate,
    weeks,
    
    // Actions
    goToPreviousMonth,
    goToNextMonth,
    goToToday,
    selectDate,
  };
}
