import { ChevronRight, Clock, Tag } from 'lucide-react';
import type { Task } from '../../../types';

interface TodayMissionProps {
  tasks: Task[];
}

export function TodayMission({ tasks }: TodayMissionProps) {
  const completedCount = tasks.filter(t => t.done).length;
  const totalCount = tasks.length;
  const progressPercentage = totalCount > 0 ? Math.round((completedCount / totalCount) * 100) : 0;

  return (
    <div className="card today-mission-card">
      <div className="section-header">
        <div>
          <h3 className="section-title">Today's Mission</h3>
          <p className="section-subtitle">
            {completedCount} of {totalCount} completed
          </p>
        </div>
        <button className="btn btn-ghost btn-sm">
          View All
          <ChevronRight size={14} />
        </button>
      </div>

      {/* Progress Bar */}
      <div style={{ marginBottom: 'var(--space-4)' }}>
        <div className="progress-header">
          <span className="progress-label">Overall Progress</span>
          <span className="progress-percentage">{progressPercentage}%</span>
        </div>
        <div className="progress-bar">
          <div className="progress-bar-fill" style={{ width: `${progressPercentage}%` }} />
        </div>
      </div>

      {/* Scrollable Task List */}
      <div className="task-list-scrollable">
        {tasks.length === 0 ? (
          <div className="empty-state">
            <div className="empty-state-title">No tasks for today</div>
            <div className="empty-state-description">
              You have a clear schedule. Add a task to get started.
            </div>
            <button className="btn btn-accent" style={{ marginTop: 'var(--space-4)' }}>
              Add Task
            </button>
          </div>
        ) : (
          <div className="task-list">
            {tasks.map(task => (
              <TaskRow key={task.id} task={task} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

interface TaskRowProps {
  task: Task;
}

function TaskRow({ task }: TaskRowProps) {
  return (
    <div className="task-item">
      <div className="task-header">
        <input
          type="checkbox"
          className="task-checkbox"
          checked={task.done}
          readOnly
        />
        <div className="task-content">
          <div className={`task-title ${task.done ? 'completed' : ''}`}>
            {task.title}
          </div>
          <div className="task-meta">
            <span className={`badge badge-${task.importance}`}>
              {task.importance}
            </span>
            <span className="task-meta-badge badge-bucket">
              <Tag size={12} />
              {task.bucket}
            </span>
            <span className="task-meta-badge" style={{ background: 'transparent', padding: 0, color: 'var(--text-muted)' }}>
              <Clock size={12} />
              {task.deadline}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
