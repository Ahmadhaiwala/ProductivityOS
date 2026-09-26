import { Clock, Package } from 'lucide-react';
import type { Task } from '../../types';
import { IMPORTANCE_COLORS } from '../../constants';

interface TaskCardProps {
  task: Task;
}

export function TaskCard({ task }: TaskCardProps) {
  return (
    <article
      className="task-card animate-fade-in"
      role="listitem"
      id={`task-${task.id}`}
    >
      <input
        type="checkbox"
        id={`task-checkbox-${task.id}`}
        className="task-checkbox"
        defaultChecked={task.done}
        aria-label={`Mark "${task.title}" as complete`}
      />
      <div className="task-content">
        <div className={`task-title${task.done ? ' completed' : ''}`}>{task.title}</div>
        <div className="task-meta">
          <span className={`badge ${IMPORTANCE_COLORS[task.importance]}`}>{task.importance}</span>
          <span className="task-meta-item" aria-label={`Deadline: ${task.deadline}`}>
            <Clock size={11} /> {task.deadline}
          </span>
          <span className="task-meta-item">
            <Package size={11} /> {task.bucket}
          </span>
        </div>
      </div>
    </article>
  );
}
