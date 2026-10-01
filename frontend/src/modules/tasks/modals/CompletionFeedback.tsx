import { CheckCircle, TrendingUp, Clock, Target, ArrowRight, PartyPopper } from 'lucide-react';
import type { Task } from '../../types';

interface CompletionFeedbackProps {
  completedTask: Task;
  nextSuggestion: Task | null;
  todayStats: {
    completed: number;
    total: number;
    focusTime?: string;
  };
  onClose: () => void;
  onMakeFocus: (task: Task) => void;
}

export function CompletionFeedback({
  completedTask,
  nextSuggestion,
  todayStats,
  onClose,
  onMakeFocus,
}: CompletionFeedbackProps) {
  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-card" onClick={(e) => e.stopPropagation()}>
        <div className="completion-celebration">
          <div className="completion-icon">
            <CheckCircle size={48} color="var(--success)" />
          </div>

          <h2 className="completion-title">Task Completed!</h2>
          <p className="completion-task-title">{completedTask.title}</p>

          <div className="completion-message">
            <p>Nice work. You completed a {completedTask.importance} priority task.</p>
          </div>

          {/* Today's Stats */}
          <div className="completion-stats">
            <div className="completion-stat-item">
              <Target size={20} />
              <div>
                <div className="completion-stat-value">
                  {todayStats.completed} / {todayStats.total}
                </div>
                <div className="completion-stat-label">Tasks completed</div>
              </div>
            </div>

            {todayStats.focusTime && (
              <div className="completion-stat-item">
                <Clock size={20} />
                <div>
                  <div className="completion-stat-value">{todayStats.focusTime}</div>
                  <div className="completion-stat-label">Focus time today</div>
                </div>
              </div>
            )}
          </div>

          {/* Next Focus Suggestion */}
          {nextSuggestion ? (
            <div className="next-focus-section">
              <div className="next-focus-header">
                <TrendingUp size={16} />
                <span>What's Next?</span>
              </div>

              <div className="next-task-card">
                <div className="badge badge-bucket">{nextSuggestion.bucket}</div>
                <h4 className="next-task-title">{nextSuggestion.title}</h4>
                <div className="next-task-meta">
                  <span className={`badge badge-${nextSuggestion.importance}`}>
                    {nextSuggestion.importance}
                  </span>
                  <span className="text-muted text-sm">{nextSuggestion.deadline}</span>
                </div>
              </div>

              <div className="completion-actions">
                <button
                  className="btn btn-accent btn-lg w-full"
                  onClick={() => onMakeFocus(nextSuggestion)}
                >
                  <Target size={16} />
                  Make This My Focus
                </button>
                <button className="btn btn-ghost" onClick={onClose}>
                  I'll Choose Later
                </button>
              </div>
            </div>
          ) : (
            <div className="completion-actions">
              <button className="btn btn-accent btn-lg" onClick={onClose}>
                <PartyPopper size={16} />
                All Done for Today!
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
