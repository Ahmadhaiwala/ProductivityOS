// Calendar utility functions following the engineering specifications

/**
 * Formats date to YYYY-MM-DD format
 */
export const formatDateToYMD = (date: Date): string => {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
};

/**
 * Gets current date as YYYY-MM-DD
 */
export const getTodayYMD = (): string => {
  return formatDateToYMD(new Date());
};

/**
 * Checks if two YYYY-MM-DD dates are the same
 */
export const isSameDate = (date1: string, date2: string): boolean => {
  return date1 === date2;
};

/**
 * Gets the number of days in a month (handles leap years automatically)
 */
export const getDaysInMonth = (year: number, month: number): number => {
  // month is 0-indexed (0 = January, 11 = December)
  return new Date(year, month + 1, 0).getDate();
};

/**
 * Gets the first day of the month (0 = Sunday, 6 = Saturday)
 */
export const getFirstDayOfMonth = (year: number, month: number): number => {
  return new Date(year, month, 1).getDay();
};

/**
 * Gets month name
 */
export const getMonthName = (month: number): string => {
  const months = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];
  return months[month];
};

/**
 * Navigate to previous month
 */
export const getPreviousMonth = (year: number, month: number): { year: number; month: number } => {
  if (month === 0) {
    return { year: year - 1, month: 11 };
  }
  return { year, month: month - 1 };
};

/**
 * Navigate to next month
 */
export const getNextMonth = (year: number, month: number): { year: number; month: number } => {
  if (month === 11) {
    return { year: year + 1, month: 0 };
  }
  return { year, month: month + 1 };
};

/**
 * Creates a YYYY-MM-DD date string
 */
export const createDateString = (year: number, month: number, day: number): string => {
  const monthStr = String(month + 1).padStart(2, '0');
  const dayStr = String(day).padStart(2, '0');
  return `${year}-${monthStr}-${dayStr}`;
};
