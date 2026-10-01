import { X, Calendar, Clock } from 'lucide-react';
import { useState } from 'react';
import type { Task } from '../../../types';

interface RescheduleModalProps {
  task: Task;
  onClose: () => void;
  onConfirm: (newDeadline: string) => void;
}

export function RescheduleModal({ task, onClose, onConfirm }: RescheduleModalProps) {
  const [customDate, setCustomDate] = useState('');
  const [customTime, setCustomTime] = useState('');

  const handleQuickReschedule = (option: string) => {
    const deadlines: Record<string, string> = {
      tomorrow: 'Tomorrow, 9:00 AM',
      weekend: 'This Weekend',
      nextWeek: 'Next Week',
    };
    onConfirm(deadlines[option]);
  };

  const handleCustomReschedule = () => {
    if (customDate) {
      const deadline = customTime ? `${customDate}, ${customTime}` : customDate;
      onConfirm(deadline);
    }
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-card" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <div className="flex items-center gap-3">
            <Calendar size={24} color="var(--accent)" />
            <h2 className="modal-title">Reschedule Task</h2>
          </div>
          <button className="icon-btn" onClick={onClose}>
            <X size={20} />
          </button>
        </div>

        <div className="modal-content">
          <div className="reschedule-task-info">
            <h4 className="text-sm text-muted" style={{ marginBottom: 'var(--space-2)' }}>
              Current Deadline
            </h4>
            <p className="reschedule-current">{task.deadline}</p>
          </div>

          <div className="reschedule-section">
            <h4 className="reschedule-section-title">Quick Reschedule</h4>
            <div className="reschedule-quick-options">
              <button
                className="reschedule-option"
                onClick={() => handleQuickReschedule('tomorrow')}
              >
                Tomorrow
              </button>
              <button
                className="reschedule-option"
                onClick={() => handleQuickReschedule('weekend')}
              >
                This Weekend
              </button>
              <button
                className="reschedule-option"
                onClick={() => handleQuickReschedule('nextWeek')}
              >
                Next Week
              </button>
            </div>
          </div>

          <div className="divider" style={{ margin: 'var(--space-6) 0' }} />

          <div className="reschedule-section">
            <h4 className="reschedule-section-title">Pick Date & Time</h4>
            <div className="reschedule-custom">
              <div className="input-group">
                <label className="input-label">
                  <Calendar size={16} />
                  Date
                </label>
                <input
                  type="date"
                  className="input"
                  value={customDate}
                  onChange={(e) => setCustomDate(e.target.value)}
                />
              </div>
              <div className="input-group">
                <label className="input-label">
                  <Clock size={16} />
                  Time (optional)
                </label>
                <input
                  type="time"
                  className="input"
                  value={customTime}
                  onChange={(e) => setCustomTime(e.target.value)}
                />
              </div>
            </div>
          </div>

          <div className="modal-actions">
            <button className="btn btn-ghost" onClick={onClose}>
              Cancel
            </button>
            <button
              className="btn btn-accent"
              onClick={handleCustomReschedule}
              disabled={!customDate}
            >
              Reschedule
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
