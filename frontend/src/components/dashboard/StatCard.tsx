import { TrendingUp, TrendingDown } from 'lucide-react';
import type { Stat } from '../../types';

interface StatCardProps {
  stat: Stat;
}

export function StatCard({ stat }: StatCardProps) {
  const { icon, label, value, trend, up, colorClass } = stat;

  return (
    <article className="stat-card animate-slide-up">
      <div className={`stat-icon ${colorClass}`} aria-hidden="true">
        {icon}
      </div>
      <div>
        <div className="stat-value">{value}</div>
        <div className="stat-label">{label}</div>
        <div className={`stat-trend ${up ? 'stat-trend-up' : 'stat-trend-down'}`}>
          {up
            ? <TrendingUp size={11} style={{ display: 'inline', marginRight: 3 }} />
            : <TrendingDown size={11} style={{ display: 'inline', marginRight: 3 }} />
          }
          {trend}
        </div>
      </div>
    </article>
  );
}
