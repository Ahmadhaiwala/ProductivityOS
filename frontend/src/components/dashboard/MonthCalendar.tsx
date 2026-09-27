import { ChevronLeft, ChevronRight } from 'lucide-react';

export function MonthCalendar() {
  // Mock data - will be dynamic later
  const currentMonth = 'September 2026';
  const daysInMonth = 30;
  const firstDayOffset = 4; // September 1, 2026 is Friday (4th day in week starting Monday)

  const taskCounts: Record<number, number> = {
    27: 6,
    28: 4,
    29: 3,
    30: 2,
  };

  const weeks = [];
  let currentWeek: (number | null)[] = Array(firstDayOffset).fill(null);

  for (let day = 1; day <= daysInMonth; day++) {
    currentWeek.push(day);
    
    if (currentWeek.length === 7) {
      weeks.push(currentWeek);
      currentWeek = [];
    }
  }

  if (currentWeek.length > 0) {
    while (currentWeek.length < 7) {
      currentWeek.push(null);
    }
    weeks.push(currentWeek);
  }

  return (
    <div className="card">
      <div className="section-header">
        <div>
          <h3 className="section-title">{currentMonth}</h3>
        </div>
        <div className="flex gap-2">
          <button className="icon-btn">
            <ChevronLeft size={16} />
          </button>
          <button className="icon-btn">
            <ChevronRight size={16} />
          </button>
        </div>
      </div>

      <div style={{ marginTop: 'var(--space-4)' }}>
        {/* Weekday Headers */}
        <div style={{ 
          display: 'grid', 
          gridTemplateColumns: 'repeat(7, 1fr)', 
          gap: 'var(--space-2)',
          marginBottom: 'var(--space-3)'
        }}>
          {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].map(day => (
            <div 
              key={day} 
              style={{ 
                textAlign: 'center', 
                fontSize: '0.75rem', 
                fontWeight: 600,
                color: 'var(--text-muted)',
                textTransform: 'uppercase',
                letterSpacing: '0.05em'
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
                gap: 'var(--space-2)'
              }}
            >
              {week.map((day, dayIndex) => (
                <CalendarDay 
                  key={dayIndex} 
                  day={day} 
                  taskCount={day ? taskCounts[day] : undefined}
                  isToday={day === 27}
                />
              ))}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

interface CalendarDayProps {
  day: number | null;
  taskCount?: number;
  isToday?: boolean;
}

function CalendarDay({ day, taskCount, isToday }: CalendarDayProps) {
  if (!day) {
    return <div style={{ aspectRatio: '1' }} />;
  }

  return (
    <div
      style={{
        aspectRatio: '1',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 'var(--space-2)',
        borderRadius: 'var(--radius-md)',
        border: isToday ? '2px solid var(--accent)' : '1px solid var(--border)',
        backgroundColor: isToday ? 'rgba(211, 94, 54, 0.05)' : 'transparent',
        cursor: 'pointer',
        transition: 'all 0.2s ease',
      }}
      className="calendar-day"
    >
      <div 
        style={{ 
          fontSize: '0.875rem', 
          fontWeight: isToday ? 700 : 500,
          color: isToday ? 'var(--accent)' : 'var(--text-primary)',
          marginBottom: 'var(--space-1)'
        }}
      >
        {day}
      </div>
      {taskCount !== undefined && taskCount > 0 && (
        <div 
          style={{ 
            fontSize: '0.625rem',
            padding: '2px 6px',
            borderRadius: 'var(--radius-sm)',
            backgroundColor: 'var(--secondary)',
            color: 'var(--surface)',
            fontWeight: 600
          }}
        >
          {taskCount}
        </div>
      )}
    </div>
  );
}
