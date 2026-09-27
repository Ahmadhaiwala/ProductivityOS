import { X, Edit, AlertTriangle } from 'lucide-react';
import { useState } from 'react';
import type { Task } from '../../types';

interface RedefineModalProps {
  task: Task;
  onClose: () => void;
  onConfirm: (newTitle: string, newDeadline: string, reason: string) => void;
}

export function RedefineModal({ task, onClose, onConfirm }: RedefineModalProps) {
  const [newTitle, setNewTitle] = useState(task.title);
  const [newDeadline, setNewDeadline] = useState('');
  const [reason, setReason] = useState('');

  const handleSubmit = () => {
    if (newTitle && reason) {
      onConfirm(newTitle, newDeadline || task.deadline, reason);
    }
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-card modal-card-large" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <div className="flex items-center gap-3">
            <Edit size={24} color="var(--accent)" />
            <h2 className="modal-title">Redefine Task</h2>
          </div>
          <button className="icon-btn" onClick={onClose}>
            <X size={20} />
          </button>
        </div>

        <div className="modal-content">
          <div className="redefine-info">
            <AlertTriangle size={18} color="var(--warning)" />
            <p className="text-sm text-muted">
              Redefining changes what the task actually means. This is different from just editing details.
            </p>
          </div>

          <div className="input-group">
            <label className="input-label">Original Task</label>
            <div className="redefine-original">{task.title}</div>
          </div>

          <div className="input-group">
            <label className="input-label">Why redefine?</label>
            <select 
              className="input" 
              value={reason} 
              onChange={(e) => setReason(e.target.value)}
            >
              <option value="">Select a reason...</option>
              <option value="too_large">Too large</option>
              <option value="scope_changed">Scope changed</option>
              <option value="estimate_wrong">Estimate was wrong</option>
              <option value="not_important">No longer important</option>
              <option value="blocked">Blocked</option>
              <option value="other">Other</option>
            </select>
          </div>

          <div className="input-group">
            <label className="input-label">New Task Definition</label>
            <textarea
              className="input"
              rows={3}
              value={newTitle}
              onChange={(e) => setNewTitle(e.target.value)}
              placeholder="What should this task become?"
            />
          </div>

          <div className="input-group">
            <label className="input-label">New Deadline (optional)</label>
            <input
              type="text"
              className="input"
              value={newDeadline}
              onChange={(e) => setNewDeadline(e.target.value)}
              placeholder="e.g., Tomorrow, 5:00 PM"
            />
          </div>

          <div className="modal-actions">
            <button className="btn btn-ghost" onClick={onClose}>
              Cancel
            </button>
            <button
              className="btn btn-accent"
              onClick={handleSubmit}
              disabled={!newTitle || !reason}
            >
              Save New Definition
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
