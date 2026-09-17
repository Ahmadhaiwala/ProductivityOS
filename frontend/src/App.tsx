import './index.css';
import './App.css';
import {
  // Nav
  LayoutDashboard,
  CheckSquare,
  Package,
  CalendarDays,
  BarChart2,
  Search,
  Settings,
  // Topbar
  Bell,
  Plus,
  // Stats
  CheckCircle2,
  Flame,
  Boxes,
  Timer,
  // Task meta
  Clock,
  FolderOpen,
  // Misc
  TrendingUp,
  TrendingDown,
  // Logo
  Zap,
  // User
  ChevronRight,
} from 'lucide-react';

// ---- Type definitions ------------------------------------
interface NavItem {
  icon: React.ReactNode;
  label: string;
  active?: boolean;
  badge?: string;
}

interface NavSection {
  section: string;
  items: NavItem[];
}

// ---- Sample data (replace with API calls later) ----------
const stats = [
  {
    icon: <CheckCircle2 size={20} />,
    label: 'Completed Today',
    value: 8,
    trend: '+3 vs yesterday',
    up: true,
    colorClass: 'stat-icon-success',
  },
  {
    icon: <Flame size={20} />,
    label: 'In Progress',
    value: 12,
    trend: '4 due today',
    up: false,
    colorClass: 'stat-icon-accent',
  },
  {
    icon: <Boxes size={20} />,
    label: 'Buckets',
    value: 5,
    trend: '2 active',
    up: true,
    colorClass: 'stat-icon-primary',
  },
  {
    icon: <Timer size={20} />,
    label: 'Hours Logged',
    value: 3.5,
    trend: 'Today',
    up: true,
    colorClass: 'stat-icon-warning',
  },
];

const buckets = [
  { id: 'all',    name: 'All Tasks', count: 20 },
  { id: 'work',   name: 'Work',      count: 8  },
  { id: 'study',  name: 'Study',     count: 5  },
  { id: 'health', name: 'Health',    count: 4  },
  { id: 'home',   name: 'Home',      count: 3  },
];

const tasks = [
  { id: 1, title: 'Finalize API schema for tasks module',  bucket: 'work',   importance: 'high',   deadline: 'Today, 6pm',   done: false },
  { id: 2, title: 'Review pull request for buckets CRUD',  bucket: 'work',   importance: 'medium', deadline: 'Today, 8pm',   done: false },
  { id: 3, title: 'Read chapter 7 of Clean Architecture',  bucket: 'study',  importance: 'medium', deadline: 'Tomorrow',     done: true  },
  { id: 4, title: '30-min run + stretching routine',        bucket: 'health', importance: 'high',   deadline: 'Today, 7am',   done: true  },
  { id: 5, title: 'Set up Neon DB connection string',       bucket: 'work',   importance: 'high',   deadline: 'Today, 5pm',   done: false },
  { id: 6, title: 'Write unit tests for UserService',       bucket: 'work',   importance: 'low',    deadline: 'This week',    done: false },
];

const navSections: NavSection[] = [
  {
    section: 'Main',
    items: [
      { icon: <LayoutDashboard size={16} />, label: 'Dashboard', active: true },
      { icon: <CheckSquare     size={16} />, label: 'My Tasks',  badge: '12'  },
      { icon: <Package         size={16} />, label: 'Buckets'                 },
      { icon: <CalendarDays    size={16} />, label: 'Calendar'                },
    ],
  },
  {
    section: 'Explore',
    items: [
      { icon: <BarChart2 size={16} />, label: 'Analytics' },
      { icon: <Search    size={16} />, label: 'Search'    },
    ],
  },
  {
    section: 'Account',
    items: [
      { icon: <Settings size={16} />, label: 'Settings' },
    ],
  },
];

const importanceColor: Record<string, string> = {
  high:   'badge-error',
  medium: 'badge-warning',
  low:    'badge-primary',
};

// ---- Components ------------------------------------------
function Sidebar() {
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

function Topbar() {
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

function StatsSection() {
  return (
    <section aria-labelledby="stats-heading">
      <h2 id="stats-heading" className="sr-only">Overview statistics</h2>
      <div className="stats-grid">
        {stats.map(({ icon, label, value, trend, up, colorClass }) => (
          <article key={label} className="stat-card animate-slide-up">
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
        ))}
      </div>
    </section>
  );
}

function TasksSection() {
  const done  = tasks.filter(t =>  t.done).length;
  const total = tasks.length;
  const pct   = Math.round((done / total) * 100);

  return (
    <section aria-labelledby="tasks-heading" style={{ marginTop: 'var(--space-10)' }}>
      {/* Section header */}
      <div className="section-header">
        <div>
          <h2 id="tasks-heading" className="section-title">Today's Tasks</h2>
          <p className="section-subtitle">
            {total - done} remaining · {done} done
          </p>
        </div>
        <button id="view-all-tasks-btn" className="btn btn-outline btn-sm">
          View All
          <ChevronRight size={14} />
        </button>
      </div>

      {/* Bucket filter strip */}
      <div className="bucket-list" role="list" aria-label="Filter by bucket">
        {buckets.map(b => (
          <div key={b.id} className={`bucket-chip${b.id === 'all' ? ' active' : ''}`} role="listitem">
            <FolderOpen size={13} />
            {b.name}
            <span className="badge badge-primary" aria-label={`${b.count} tasks`}>{b.count}</span>
          </div>
        ))}
      </div>

      {/* Progress bar */}
      <div style={{ margin: 'var(--space-5) 0' }}>
        <div className="flex items-center justify-between" style={{ marginBottom: 'var(--space-2)' }}>
          <span className="text-sm fw-medium text-secondary">Overall progress</span>
          <span className="text-sm fw-semibold text-primary">{pct}%</span>
        </div>
        <div
          className="progress-bar-wrap"
          role="progressbar"
          aria-valuenow={pct}
          aria-valuemin={0}
          aria-valuemax={100}
        >
          <div className="progress-bar-fill" style={{ width: `${pct}%` }} />
        </div>
      </div>

      {/* Task list */}
      <div role="list" style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-3)' }}>
        {tasks.map(task => (
          <article
            key={task.id}
            className="task-card animate-fade-in"
            role="listitem"
            id={`task-${task.id}`}
          >
            <input
              type="checkbox"
              id={`task-checkbox-${task.id}`}
              className="task-checkbox"
              defaultChecked={task.done}
              aria-label={`Mark "${task.title}" as complete`}
            />
            <div className="task-content">
              <div className={`task-title${task.done ? ' completed' : ''}`}>{task.title}</div>
              <div className="task-meta">
                <span className={`badge ${importanceColor[task.importance]}`}>{task.importance}</span>
                <span className="task-meta-item" aria-label={`Deadline: ${task.deadline}`}>
                  <Clock size={11} /> {task.deadline}
                </span>
                <span className="task-meta-item">
                  <Package size={11} /> {task.bucket}
                </span>
              </div>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}

// ---- Root App component ----------------------------------
function App() {
  return (
    <div className="app-layout">
      <Sidebar />
      <div className="main-wrapper">
        <Topbar />
        <main className="page-content" id="main-content">
          <header className="page-header">
            <h1 className="page-title">Dashboard</h1>
            <p className="page-description">
              Here's what's on your plate today — stay focused and keep moving forward.
            </p>
          </header>

          <StatsSection />
          <TasksSection />
        </main>
      </div>
    </div>
  );
}

export default App;
