import { Zap, ChevronRight } from 'lucide-react';
import type { NavSection } from '../../types';

interface SidebarProps {
  navSections: NavSection[];
}

export function Sidebar({ navSections }: SidebarProps) {
  return (
    <aside className="sidebar" role="navigation" aria-label="Main navigation">
      <div className="sidebar-logo">
        <div className="sidebar-logo-mark">
          <div className="sidebar-logo-icon" aria-hidden="true">
            <Zap size={18} color="#fff" />
          </div>
          <div>
            <div className="sidebar-logo-text">ProductivityOS</div>
            <div className="sidebar-logo-tagline">Task Manager</div>
          </div>
        </div>
      </div>

      <nav className="sidebar-nav">
        {navSections.map(({ section, items }) => (
          <div key={section}>
            <div className="sidebar-section-label">{section}</div>
            {items.map(({ icon, label, active, badge }) => (
              <button
                key={label}
                id={`nav-${label.toLowerCase().replace(/\s+/g, '-')}`}
                className={`sidebar-nav-item${active ? ' active' : ''}`}
                aria-current={active ? 'page' : undefined}
              >
                <span className="sidebar-nav-item-icon" aria-hidden="true">{icon}</span>
                {label}
                {badge && (
                  <span className="sidebar-nav-item-badge" aria-label={`${badge} items`}>
                    {badge}
                  </span>
                )}
              </button>
            ))}
          </div>
        ))}
      </nav>

      <footer className="sidebar-footer">
        <div
          className="sidebar-user"
          role="button"
          tabIndex={0}
          id="user-profile-btn"
          aria-label="User profile"
        >
          <div className="sidebar-avatar" aria-hidden="true">AH</div>
          <div className="sidebar-user-info">
            <div className="sidebar-user-name">Ahmad Haiwala</div>
            <div className="sidebar-user-role">Pro Member</div>
          </div>
          <ChevronRight size={14} color="rgba(255,255,255,0.35)" style={{ marginLeft: 'auto', flexShrink: 0 }} />
        </div>
      </footer>
    </aside>
  );
}
