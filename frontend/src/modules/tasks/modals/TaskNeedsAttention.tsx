import { 
  Calendar, 
  Edit, 
  GitBranch, 
  GitMerge, 
  X, 
  AlertCircle 
} from 'lucide-react';
import type { Task } from '../../../types';

interface TaskNeedsAttentionProps {
  task: Task;
  onClose: () => void;
  onReschedule: (task: Task) => void;
  onRedefine: (task: Task) => void;
  onBreakdown: (task: Task) => void;
  onFallback: (task: Task) => void;
  onAbandon: (task: Task) => void;
}

export function TaskNeedsAttention({
  task,
  onClose,
  onReschedule,
  onRedefine,
  onBreakdown,
  onFallback,
  onAbandon,
}: TaskNeedsAttentionProps) {
  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-card modal-card-large" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <div className="flex items-center gap-3">
            <AlertCircle size={24} color="var(--warning)" />
            <h2 className="modal-title">Task Needs Attention</h2>
          </div>
          <button className="icon-btn" onClick={onClose}>
            <X size={20} />
          </button>
        </div>

        <div className="modal-content">
          <div className="attention-task-info">
            <div className="badge badge-bucket">{task.bucket}</div>
            <h3 className="attention-task-title">{task.title}</h3>
            <p className="text-muted">What changed?</p>
          </div>

          <div className="adaptation-options">
            {/* CHANGE WHEN */}
            <div className="adaptation-section">
              <div className="adaptation-section-header">
                <Calendar size={18} />
                <span>Change When</span>
              </div>
              <p className="adaptation-section-desc">
                The task is still valid but timing is wrong.
              </p>
              <button
                className="adaptation-option-btn"
                onClick={() => onReschedule(task)}
              >
                <Calendar size={20} />
                <div className="adaptation-option-content">
                  <div className="adaptation-option-title">Reschedule</div>
                  <div className="adaptation-option-desc">
                    Move to another date/time
                  </div>
                </div>
              </button>
            </div>

            {/* CHANGE WHAT */}
            <div className="adaptation-section">
              <div className="adaptation-section-header">
                <Edit size={18} />
                <span>Change What</span>
              </div>
              <p className="adaptation-section-desc">
                The original task needs modification.
              </p>
              <button
                className="adaptation-option-btn"
                onClick={() => onRedefine(task)}
              >
                <Edit size={20} />
                <div className="adaptation-option-content">
                  <div className="adaptation-option-title">Redefine</div>
                  <div className="adaptation-option-desc">
                    Change the scope or definition
                  </div>
                </div>
              </button>
              <button
                className="adaptation-option-btn"
                onClick={() => onBreakdown(task)}
              >
                <GitBranch size={20} />
                <div className="adaptation-option-content">
                  <div className="adaptation-option-title">Break Into Smaller Tasks</div>
                  <div className="adaptation-option-desc">
                    Decompose into subtasks
                  </div>
                </div>
              </button>
            </div>

            {/* CHANGE HOW */}
            <div className="adaptation-section">
              <div className="adaptation-section-header">
                <GitMerge size={18} />
                <span>Change How</span>
              </div>
              <p className="adaptation-section-desc">
                The original approach isn't working.
              </p>
              <button
                className="adaptation-option-btn"
                onClick={() => onFallback(task)}
              >
                <GitMerge size={20} />
                <div className="adaptation-option-content">
                  <div className="adaptation-option-title">Use Fallback</div>
                  <div className="adaptation-option-desc">
                    Switch to alternative approach
                  </div>
                </div>
              </button>
            </div>

            {/* REMOVE */}
            <div className="adaptation-section">
              <div className="adaptation-section-header">
                <X size={18} />
                <span>Remove</span>
              </div>
              <p className="adaptation-section-desc">
                The task no longer matters.
              </p>
              <button
                className="adaptation-option-btn adaptation-option-btn-danger"
                onClick={() => onAbandon(task)}
              >
                <X size={20} />
                <div className="adaptation-option-content">
                  <div className="adaptation-option-title">Abandon</div>
                  <div className="adaptation-option-desc">
                    Remove from active workflow
                  </div>
                </div>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
