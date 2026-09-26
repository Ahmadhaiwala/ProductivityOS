import { ChevronRight } from 'lucide-react';
import { TaskCard } from './TaskCard';
import { BucketFilter } from './BucketFilter';
import { ProgressBar } from './ProgressBar';
import type { Task, Bucket } from '../../types';

interface TasksSectionProps {
  tasks: Task[];
  buckets: Bucket[];
}

export function TasksSection({ tasks, buckets }: TasksSectionProps) {
  const done = tasks.filter((t) => t.done).length;
  const total = tasks.length;

  return (
    <section aria-labelledby="tasks-heading" style={{ marginTop: 'var(--space-10)' }}>
      {/* Section header */}
      <div className="section-header">
        <div>
          <h2 id="tasks-heading" className="section-title">Today's Tasks</h2>
          <p className="section-subtitle">
            {total - done} remaining · {done} done
          </p>
        </div>
        <button id="view-all-tasks-btn" className="btn btn-outline btn-sm">
          View All
          <ChevronRight size={14} />
        </button>
      </div>

      {/* Bucket filter strip */}
      <BucketFilter buckets={buckets} />

      {/* Progress bar */}
      <ProgressBar done={done} total={total} />

      {/* Task list */}
      <div role="list" style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-3)' }}>
        {tasks.map((task) => (
          <TaskCard key={task.id} task={task} />
        ))}
      </div>
    </section>
  );
}
