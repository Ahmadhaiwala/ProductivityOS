interface ProgressBarProps {
  done: number;
  total: number;
}

export function ProgressBar({ done, total }: ProgressBarProps) {
  const percentage = Math.round((done / total) * 100);

  return (
    <div style={{ margin: 'var(--space-5) 0' }}>
      <div className="flex items-center justify-between" style={{ marginBottom: 'var(--space-2)' }}>
        <span className="text-sm fw-medium text-secondary">Overall progress</span>
        <span className="text-sm fw-semibold text-primary">{percentage}%</span>
      </div>
      <div
        className="progress-bar-wrap"
        role="progressbar"
        aria-valuenow={percentage}
        aria-valuemin={0}
        aria-valuemax={100}
      >
        <div className="progress-bar-fill" style={{ width: `${percentage}%` }} />
      </div>
    </div>
  );
}
