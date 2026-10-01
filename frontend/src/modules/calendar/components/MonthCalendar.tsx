import { ChevronLeft, ChevronRight } from 'lucide-react';
import { useCalendar } from '../hooks/useCalendar';
import { getMonthName } from '../utils/dateUtils';

interface MonthCalendarProps {
  taskCounts?: Record<string, number>;
  onDateSelect?: (date: string) => void;
}

export function MonthCalendar({ taskCounts = {}, onDateSelect }: MonthCalendarProps) {
  const {
    visibleYear,
    visibleMonth,
    selectedDate,
    weeks,
    goToPreviousMonth,
    goToNextMonth,
    selectDate,
  } = useCalendar(taskCounts);

  const handleDateClick = (date: string) => {
    selectDate(date);
    onDateSelect?.(date);
  };

  return (
    <div className="card">
      {/* Calendar Header */}
      <div className="section-header">
        <div>
          <h3 className="section-title">
            {getMonthName(visibleMonth)} {visibleYear}
          </h3>
        </div>
        <div className="flex gap-2">
          <button className="icon-btn" onClick={goToPreviousMonth} aria-label="Previous month">
            <ChevronLeft size={16} />
          </button>
          <button className="icon-btn" onClick={goToNextMonth} aria-label="Next month">
            <ChevronRight size={16} />
          </button>
        </div>
      </div>

      <div style={{ marginTop: 'var(--space-4)' }}>
        {/* Weekday Headers */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(7, 1fr)',
            gap: 'var(--space-2)',
            marginBottom: 'var(--space-3)',
          }}
        >
          {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((day) => (
            <div
              key={day}
              style={{
                textAlign: 'center',
                fontSize: '0.75rem',
                fontWeight: 600,
                color: 'var(--text-muted)',
                textTransform: 'uppercase',
                letterSpacing: '0.05em',
              }}
            >
              {day}
            </div>
          ))}
        </div>

        {/* Calendar Grid */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-2)' }}>
          {weeks.map((week, weekIndex) => (
            <div
              key={weekIndex}
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(7, 1fr)',
                gap: 'var(--space-2)',
              }}
            >
              {week.days.map((day) => (
                <CalendarDayCell
                  key={day.date}
                  day={day}
                  isSelected={day.date === selectedDate}
                  onClick={() => handleDateClick(day.date)}
                />
              ))}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

interface CalendarDayCellProps {
  day: {
    date: string;
    dayNumber: number;
    isToday: boolean;
    isCurrentMonth: boolean;
    taskCount: number;
  };
  isSelected: boolean;
  onClick: () => void;
}

function CalendarDayCell({ day, isSelected, onClick }: CalendarDayCellProps) {
  return (
    <div
      onClick={onClick}
      style={{
        aspectRatio: '1',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 'var(--space-2)',
        borderRadius: 'var(--radius-md)',
        border: day.isToday ? '2px solid var(--accent)' : isSelected ? '2px solid var(--primary)' : '1px solid var(--border)',
        backgroundColor: day.isToday
          ? 'rgba(211, 94, 54, 0.05)'
          : isSelected
          ? 'rgba(42, 67, 67, 0.05)'
          : 'transparent',
        cursor: 'pointer',
        transition: 'all 0.2s ease',
        opacity: day.isCurrentMonth ? 1 : 0.4,
      }}
      className="calendar-day"
    >
      <div
        style={{
          fontSize: '0.875rem',
          fontWeight: day.isToday || isSelected ? 700 : 500,
          color: day.isToday ? 'var(--accent)' : day.isCurrentMonth ? 'var(--text-primary)' : 'var(--text-muted)',
          marginBottom: day.taskCount > 0 ? 'var(--space-1)' : 0,
        }}
      >
        {day.dayNumber}
      </div>
      {day.taskCount > 0 && (
        <div
          style={{
            fontSize: '0.625rem',
            padding: '2px 6px',
            borderRadius: 'var(--radius-sm)',
            backgroundColor: 'var(--secondary)',
            color: 'var(--surface)',
            fontWeight: 600,
          }}
        >
          {day.taskCount > 99 ? '99+' : day.taskCount}
        </div>
      )}
    </div>
  );
}
