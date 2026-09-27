import { X, Plus, GitBranch, Trash2 } from 'lucide-react';
import { useState } from 'react';
import type { Task } from '../../types';

interface Subtask {
  id: string;
  title: string;
}

interface BreakdownModalProps {
  task: Task;
  onClose: () => void;
  onConfirm: (subtasks: string[]) => void;
}

export function BreakdownModal({ task, onClose, onConfirm }: BreakdownModalProps) {
  const [subtasks, setSubtasks] = useState<Subtask[]>([
    { id: '1', title: '' },
    { id: '2', title: '' },
  ]);

  const addSubtask = () => {
    setSubtasks([...subtasks, { id: Date.now().toString(), title: '' }]);
  };

  const removeSubtask = (id: string) => {
    setSubtasks(subtasks.filter((st) => st.id !== id));
  };

  const updateSubtask = (id: string, title: string) => {
    setSubtasks(subtasks.map((st) => (st.id === id ? { ...st, title } : st)));
  };

  const handleSubmit = () => {
    const validSubtasks = subtasks.filter((st) => st.title.trim()).map((st) => st.title);
    if (validSubtasks.length > 0) {
      onConfirm(validSubtasks);
    }
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-card modal-card-large" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <div className="flex items-center gap-3">
            <GitBranch size={24} color="var(--accent)" />
            <h2 className="modal-title">Break Down Task</h2>
          </div>
          <button className="icon-btn" onClick={onClose}>
            <X size={20} />
          </button>
        </div>

        <div className="modal-content">
          <div className="breakdown-parent">
            <div className="badge badge-bucket">{task.bucket}</div>
            <h4 className="breakdown-parent-title">{task.title}</h4>
            <p className="text-sm text-muted">Break this into smaller, actionable tasks:</p>
          </div>

          <div className="breakdown-subtasks">
            {subtasks.map((subtask, index) => (
              <div key={subtask.id} className="breakdown-subtask-item">
                <div className="breakdown-subtask-number">{index + 1}</div>
                <input
                  type="text"
                  className="input"
                  placeholder="Subtask title..."
                  value={subtask.title}
                  onChange={(e) => updateSubtask(subtask.id, e.target.value)}
                />
                {subtasks.length > 2 && (
                  <button
                    className="icon-btn"
                    onClick={() => removeSubtask(subtask.id)}
                  >
                    <Trash2 size={16} />
                  </button>
                )}
              </div>
            ))}
          </div>

          <button className="btn btn-ghost btn-sm" onClick={addSubtask}>
            <Plus size={16} />
            Add Another Subtask
          </button>

          <div className="modal-actions">
            <button className="btn btn-ghost" onClick={onClose}>
              Cancel
            </button>
            <button
              className="btn btn-accent"
              onClick={handleSubmit}
              disabled={subtasks.every((st) => !st.title.trim())}
            >
              Create Subtasks
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
