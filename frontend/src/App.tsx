import './styles/index.css';
import { Sidebar, Topbar, CurrentFocus, TodayMission, MonthCalendar } from './components';
import { tasks, navSections } from './data/mockData';

function App() {
  // Get current focus task (first incomplete high priority task)
  const currentFocusTask = tasks.find(t => !t.done && t.importance === 'high') || null;
  
  // Get today's tasks (all tasks)
  const todayTasks = tasks;

  return (
    <div className="app-layout">
      <Sidebar navSections={navSections} />
      <div className="main-wrapper">
        <Topbar />
        <main className="page-content">
          <div className="dashboard-grid">
            {/* Current Focus - Takes full width and priority */}
            <CurrentFocus task={currentFocusTask} />
            
            {/* Two column grid for Today's Mission and Calendar */}
            <div className="dashboard-grid-2col">
              <TodayMission tasks={todayTasks} />
              <MonthCalendar />
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}

export default App;
