import './index.css';
import './App.css';
import { Sidebar, Topbar, PageHeader, StatsSection, TasksSection } from './components';
import { stats, buckets, tasks, navSections } from './data/mockData';

function App() {
  return (
    <div className="app-layout">
      <Sidebar navSections={navSections} />
      <div className="main-wrapper">
        <Topbar />
        <main className="page-content" id="main-content">
          <PageHeader 
            title="Dashboard" 
            description="Here's what's on your plate today — stay focused and keep moving forward."
          />
          <StatsSection stats={stats} />
          <TasksSection tasks={tasks} buckets={buckets} />
        </main>
      </div>
    </div>
  );
}

export default App;
