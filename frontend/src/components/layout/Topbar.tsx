import { Bell, Plus, Search } from 'lucide-react';

export function Topbar() {
  return (
    <header className="topbar" role="banner">
      <div className="topbar-title">Good morning, Ahmad 👋</div>
      <div className="topbar-search" role="search">
        <span className="topbar-search-icon" aria-hidden="true">
          <Search size={14} />
        </span>
        <input
          id="global-search"
          className="input"
          type="search"
          placeholder="Search tasks, buckets…"
          aria-label="Search tasks and buckets"
        />
      </div>
      <div className="topbar-actions">
        <button id="notifications-btn" className="topbar-icon-btn" aria-label="Notifications">
          <Bell size={16} />
        </button>
        <button id="add-task-quick-btn" className="btn btn-accent btn-sm" aria-label="Add new task">
          <Plus size={14} />
          New Task
        </button>
      </div>
    </header>
  );
}
