import { Play, CheckCircle, AlertCircle, Edit, Calendar, MoreHorizontal } from 'lucide-react';
import type { Task } from '../../types';

interface CurrentFocusProps {
  task: Task | null;
  onComplete?: (task: Task) => void;
  onCantComplete?: () => void;
}

export function CurrentFocus({ task, onComplete, onCantComplete }: CurrentFocusProps) {
  if (!task) {
    return (
      <div className="card" style={{ minHeight: '320px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <div className="empty-state">
          <div className="empty-state-title">No Current Focus</div>
          <div className="empty-state-description">
            Choose one task to work on right now.
          </div>
          <button className="btn btn-accent" style={{ marginTop: 'var(--space-4)' }}>
            Choose Focus Task
          </button>
        </div>
      </div>
    );
  }

  const progress = task.done ? 100 : 0; // Will be dynamic later

  return (
    <div className="current-focus-card">
      <div className="focus-badge">
        <span>🎯</span>
        <span>Current Focus</span>
      </div>

      <div style={{ position: 'relative', zIndex: 1 }}>
        <div className="badge badge-bucket" style={{ marginBottom: 'var(--space-2)' }}>
          {task.bucket}
        </div>

        <h2 className="focus-title">{task.title}</h2>

        <div className="focus-meta">
          <div className="focus-meta-item">
            <span className="focus-meta-label">Priority</span>
            <span className="focus-meta-value">
              <span className={`badge badge-${task.importance}`}>{task.importance}</span>
            </span>
          </div>
          <div className="focus-meta-item">
            <span className="focus-meta-label">Deadline</span>
            <span className="focus-meta-value">{task.deadline}</span>
          </div>
          <div className="focus-meta-item">
            <span className="focus-meta-label">Status</span>
            <span className="focus-meta-value">{task.done ? 'Completed' : 'In Progress'}</span>
          </div>
        </div>

        {!task.done && (
          <div className="focus-progress">
            <div className="progress-header">
              <span className="progress-label">Progress</span>
              <span className="progress-percentage">{progress}%</span>
            </div>
            <div className="progress-bar">
              <div className="progress-bar-fill" style={{ width: `${progress}%` }} />
            </div>
          </div>
        )}

        <div className="focus-actions">
          {!task.done ? (
            <>
              <button className="btn btn-accent">
                <Play size={16} />
                Start Focus
              </button>
              <button 
                className="btn btn-primary"
                onClick={() => onComplete?.(task)}
              >
                <CheckCircle size={16} />
                Complete
              </button>
              <button 
                className="btn btn-secondary"
                onClick={onCantComplete}
              >
                <AlertCircle size={16} />
                Can't Complete
              </button>
            </>
          ) : (
            <button className="btn btn-primary">
              <CheckCircle size={16} />
              Completed
            </button>
          )}
          <button className="btn btn-ghost">
            <MoreHorizontal size={16} />
          </button>
        </div>
      </div>
    </div>
  );
}
