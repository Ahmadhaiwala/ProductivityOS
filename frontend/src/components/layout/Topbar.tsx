import { Bell, Plus, Search } from 'lucide-react';

interface TopbarProps {
  onNewTask: () => void;
}

export function Topbar({ onNewTask }: TopbarProps) {
  const currentHour = new Date().getHours();
  const greeting = currentHour < 12 ? 'Good morning' : currentHour < 18 ? 'Good afternoon' : 'Good evening';

  return (
    <header className="topbar">
      <div className="topbar-left">
        <div>
          <div className="topbar-title">{greeting}, Ahmad 👋</div>
          <div className="topbar-subtitle">Here's your plan for today. Stay consistent.</div>
        </div>
      </div>

      <div className="topbar-search">
        <input
          className="input"
          type="search"
          placeholder="Search tasks..."
          style={{ paddingLeft: 'var(--space-10)' }}
        />
        <Search 
          size={16} 
          style={{ 
            position: 'absolute', 
            left: 'var(--space-3)', 
            top: '50%', 
            transform: 'translateY(-50%)',
            color: 'var(--text-muted)'
          }} 
        />
      </div>

      <div className="topbar-right">
        <button className="icon-btn">
          <Bell size={18} />
        </button>
        <button className="btn btn-accent" onClick={onNewTask}>
          <Plus size={16} />
          New Task
        </button>
      </div>
    </header>
  );
}
