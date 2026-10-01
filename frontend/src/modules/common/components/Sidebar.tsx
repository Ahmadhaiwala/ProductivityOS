import { Zap } from 'lucide-react';
import type { NavSection } from '../../../types';

interface SidebarProps {
  navSections: NavSection[];
}

export function Sidebar({ navSections }: SidebarProps) {
  return (
    <aside className="sidebar">
      <div className="sidebar-header">
        <div className="sidebar-logo">
          <Zap size={18} />
        </div>
        <div className="sidebar-title">ProductivityOS</div>
      </div>

      <nav className="sidebar-nav">
        {navSections.map(({ section, items }) => (
          <div key={section} className="sidebar-section">
            <div className="sidebar-section-label">{section}</div>
            {items.map(({ icon, label, active }) => (
              <button
                key={label}
                className={`sidebar-nav-item${active ? ' active' : ''}`}
              >
                {icon}
                <span>{label}</span>
              </button>
            ))}
          </div>
        ))}
      </nav>
    </aside>
  );
}
