import { X, Plus, ChevronDown } from 'lucide-react';
import { useState } from 'react';

interface CreateTaskModalProps {
  onClose: () => void;
  onConfirm: (task: NewTask) => void;
  buckets: string[];
}

interface NewTask {
  title: string;
  bucket: string;
  deadline: string;
  time?: string;
  recurring: boolean;
  recurrencePattern?: string;
  description?: string;
  importance?: 'low' | 'medium' | 'high';
}

export function CreateTaskModal({ onClose, onConfirm, buckets }: CreateTaskModalProps) {
  // Step tracking
  const [currentStep, setCurrentStep] = useState(1);
  
  // Form state
  const [title, setTitle] = useState('');
  const [bucket, setBucket] = useState(buckets[0] || 'Development');
  const [deadlineType, setDeadlineType] = useState<'today' | 'tomorrow' | 'custom'>('today');
  const [customDate, setCustomDate] = useState('');
  const [time, setTime] = useState('');
  const [recurring, setRecurring] = useState(false);
  const [recurrencePattern, setRecurrencePattern] = useState('day');
  const [showAdvanced, setShowAdvanced] = useState(false);
  const [description, setDescription] = useState('');
  const [importance, setImportance] = useState<'low' | 'medium' | 'high'>('medium');

  const canProceed = () => {
    if (currentStep === 1) return title.trim().length > 0;
    if (currentStep === 2) return bucket.length > 0;
    if (currentStep === 3) return deadlineType === 'today' || deadlineType === 'tomorrow' || customDate.length > 0;
    if (currentStep === 4) return !recurring || recurrencePattern.length > 0;
    return true;
  };

  const handleNext = () => {
    if (canProceed() && currentStep < 5) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleCreate = () => {
    if (!canProceed()) return;

    let finalDeadline = '';
    if (deadlineType === 'today') finalDeadline = time ? `Today, ${time}` : 'Today';
    else if (deadlineType === 'tomorrow') finalDeadline = time ? `Tomorrow, ${time}` : 'Tomorrow';
    else finalDeadline = time ? `${customDate}, ${time}` : customDate;

    onConfirm({
      title,
      bucket,
      deadline: finalDeadline,
      time,
      recurring,
      recurrencePattern: recurring ? recurrencePattern : undefined,
      description: description || undefined,
      importance,
    });
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-card modal-card-large" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <div className="flex items-center gap-3">
            <Plus size={24} color="var(--accent)" />
            <h2 className="modal-title">Create New Task</h2>
          </div>
          <button className="icon-btn" onClick={onClose}>
            <X size={20} />
          </button>
        </div>

        <div className="modal-content">
          {/* Progress Indicator */}
          <div className="task-creation-progress">
            <div className="progress-steps">
              {[1, 2, 3, 4, 5].map((step) => (
                <div
                  key={step}
                  className={`progress-step ${currentStep >= step ? 'active' : ''}`}
                />
              ))}
            </div>
          </div>

          {/* Step 1: What? */}
          {currentStep === 1 && (
            <div className="creation-step">
              <h3 className="step-title">What do you need to do?</h3>
              <input
                type="text"
                className="input"
                style={{ fontSize: '1.125rem', padding: 'var(--space-4)' }}
                placeholder="Build ProductivityOS dashboard"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                autoFocus
                onKeyDown={(e) => e.key === 'Enter' && canProceed() && handleNext()}
              />
            </div>
          )}

          {/* Step 2: Context (Bucket) */}
          {currentStep === 2 && (
            <div className="creation-step">
              <h3 className="step-title">Which bucket does this belong to?</h3>
              <div className="input-group">
                <label className="input-label">Bucket</label>
                <select
                  className="input"
                  value={bucket}
                  onChange={(e) => setBucket(e.target.value)}
                >
                  {buckets.map((b) => (
                    <option key={b} value={b}>
                      {b}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          )}

          {/* Step 3: When? */}
          {currentStep === 3 && (
            <div className="creation-step">
              <h3 className="step-title">When should this be done?</h3>
              
              <div className="input-group">
                <label className="input-label">Deadline</label>
                <div className="deadline-options">
                  <button
                    className={`deadline-option ${deadlineType === 'today' ? 'active' : ''}`}
                    onClick={() => setDeadlineType('today')}
                  >
                    Today
                  </button>
                  <button
                    className={`deadline-option ${deadlineType === 'tomorrow' ? 'active' : ''}`}
                    onClick={() => setDeadlineType('tomorrow')}
                  >
                    Tomorrow
                  </button>
                  <button
                    className={`deadline-option ${deadlineType === 'custom' ? 'active' : ''}`}
                    onClick={() => setDeadlineType('custom')}
                  >
                    Pick Date
                  </button>
                </div>
              </div>

              {deadlineType === 'custom' && (
                <div className="input-group">
                  <input
                    type="date"
                    className="input"
                    value={customDate}
                    onChange={(e) => setCustomDate(e.target.value)}
                  />
                </div>
              )}

              <div className="input-group">
                <label className="input-label">Time (optional)</label>
                <input
                  type="time"
                  className="input"
                  value={time}
                  onChange={(e) => setTime(e.target.value)}
                />
              </div>
            </div>
          )}

          {/* Step 4: Regularity */}
          {currentStep === 4 && (
            <div className="creation-step">
              <h3 className="step-title">Does this repeat?</h3>
              
              <div className="recurring-options">
                <button
                  className={`recurring-option ${!recurring ? 'active' : ''}`}
                  onClick={() => setRecurring(false)}
                >
                  No
                </button>
                <button
                  className={`recurring-option ${recurring ? 'active' : ''}`}
                  onClick={() => setRecurring(true)}
                >
                  Yes
                </button>
              </div>

              {recurring && (
                <div className="input-group" style={{ marginTop: 'var(--space-5)' }}>
                  <label className="input-label">Repeat Every</label>
                  <select
                    className="input"
                    value={recurrencePattern}
                    onChange={(e) => setRecurrencePattern(e.target.value)}
                  >
                    <option value="day">Day</option>
                    <option value="week">Week</option>
                    <option value="month">Month</option>
                    <option value="year">Year</option>
                  </select>
                </div>
              )}
            </div>
          )}

          {/* Step 5: Optional Details */}
          {currentStep === 5 && (
            <div className="creation-step">
              <h3 className="step-title">Additional Details (Optional)</h3>
              
              <div className="input-group">
                <label className="input-label">Description</label>
                <textarea
                  className="input"
                  rows={3}
                  placeholder="What does completion actually mean?"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                />
              </div>

              <button
                className="btn btn-ghost btn-sm"
                onClick={() => setShowAdvanced(!showAdvanced)}
                style={{ marginBottom: 'var(--space-4)' }}
              >
                Advanced
                <ChevronDown
                  size={16}
                  style={{
                    transform: showAdvanced ? 'rotate(180deg)' : 'rotate(0)',
                    transition: 'transform 0.2s',
                  }}
                />
              </button>

              {showAdvanced && (
                <div className="advanced-options">
                  <div className="input-group">
                    <label className="input-label">Priority</label>
                    <select
                      className="input"
                      value={importance}
                      onChange={(e) => setImportance(e.target.value as 'low' | 'medium' | 'high')}
                    >
                      <option value="low">Low</option>
                      <option value="medium">Medium</option>
                      <option value="high">High</option>
                    </select>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* Navigation */}
          <div className="modal-actions" style={{ marginTop: 'var(--space-8)' }}>
            {currentStep > 1 && (
              <button className="btn btn-ghost" onClick={handleBack}>
                Back
              </button>
            )}
            <div style={{ flex: 1 }} />
            {currentStep < 5 ? (
              <button
                className="btn btn-accent"
                onClick={handleNext}
                disabled={!canProceed()}
              >
                Next
              </button>
            ) : (
              <button
                className="btn btn-accent"
                onClick={handleCreate}
                disabled={!canProceed()}
              >
                Create Task
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
