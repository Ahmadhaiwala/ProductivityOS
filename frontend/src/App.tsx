import './styles/index.css';
import { useState, useMemo } from 'react';
import { 
  Sidebar, 
  Topbar, 
  CurrentFocus, 
  TodayMission, 
  MonthCalendar,
  CompletionFeedback,
  TaskNeedsAttention,
  RescheduleModal,
  RedefineModal,
  BreakdownModal,
  CreateTaskModal,
} from './components';
import { tasks as initialTasks, navSections } from './data/mockData';
import { formatDateToYMD } from './modules/calendar/utils/dateUtils';
import type { Task } from './types';

function App() {
  const [tasks, setTasks] = useState(initialTasks);
  const [currentFocusTask, setCurrentFocusTask] = useState<Task | null>(
    tasks.find(t => !t.done && t.importance === 'high') || null
  );
  
  // Modal states
  const [showCompletionFeedback, setShowCompletionFeedback] = useState(false);
  const [showTaskAttention, setShowTaskAttention] = useState(false);
  const [showReschedule, setShowReschedule] = useState(false);
  const [showRedefine, setShowRedefine] = useState(false);
  const [showBreakdown, setShowBreakdown] = useState(false);
  const [showCreateTask, setShowCreateTask] = useState(false);
  const [completedTask, setCompletedTask] = useState<Task | null>(null);

  // Get today's tasks and buckets
  const todayTasks = tasks;
  const completedCount = tasks.filter(t => t.done).length;
  const availableBuckets = ['Development', 'College', 'Career', 'Personal', 'Projects'];

  // Calculate task counts per date (YYYY-MM-DD format) for calendar
  const taskCountsByDate = useMemo(() => {
    const counts: Record<string, number> = {};
    
    // For now, mock some dates with task counts
    // In real implementation, you'd calculate this from actual task deadlines
    const today = new Date();
    const todayYMD = formatDateToYMD(today);
    counts[todayYMD] = tasks.length;
    
    // Add some mock dates
    const mockDate1 = new Date(today);
    mockDate1.setDate(today.getDate() + 2);
    counts[formatDateToYMD(mockDate1)] = 3;
    
    const mockDate2 = new Date(today);
    mockDate2.setDate(today.getDate() + 5);
    counts[formatDateToYMD(mockDate2)] = 2;
    
    return counts;
  }, [tasks]);

  // Handle date selection from calendar
  const handleDateSelect = (dateYMD: string) => {
    console.log('Selected date:', dateYMD);
    // Future: Filter tasks by selected date
  };

  // Handle task creation
  const handleCreateTask = (newTask: any) => {
    const task: Task = {
      id: Date.now(),
      title: newTask.title,
      bucket: newTask.bucket,
      importance: newTask.importance || 'medium',
      deadline: newTask.deadline,
      done: false,
    };
    setTasks([...tasks, task]);
    setShowCreateTask(false);
  };

  // Handle task completion
  const handleCompleteTask = (task: Task) => {
    setTasks(tasks.map(t => t.id === task.id ? { ...t, done: true } : t));
    setCompletedTask(task);
    setShowCompletionFeedback(true);
    setCurrentFocusTask(null);
  };

  // Handle next focus selection
  const handleMakeFocus = (task: Task) => {
    setCurrentFocusTask(task);
    setShowCompletionFeedback(false);
  };

  // Handle "can't complete" scenario
  const handleCantComplete = () => {
    setShowTaskAttention(true);
  };

  // Handle reschedule
  const handleReschedule = () => {
    setShowTaskAttention(false);
    setShowReschedule(true);
  };

  const handleRescheduleConfirm = (newDeadline: string) => {
    if (currentFocusTask) {
      setTasks(tasks.map(t => 
        t.id === currentFocusTask.id ? { ...t, deadline: newDeadline } : t
      ));
      setCurrentFocusTask({ ...currentFocusTask, deadline: newDeadline });
    }
    setShowReschedule(false);
  };

  // Handle redefine
  const handleRedefine = () => {
    setShowTaskAttention(false);
    setShowRedefine(true);
  };

  const handleRedefineConfirm = (newTitle: string, newDeadline: string, reason: string) => {
    if (currentFocusTask) {
      setTasks(tasks.map(t => 
        t.id === currentFocusTask.id ? { ...t, title: newTitle, deadline: newDeadline } : t
      ));
      setCurrentFocusTask({ ...currentFocusTask, title: newTitle, deadline: newDeadline });
      console.log('Redefine reason:', reason);
    }
    setShowRedefine(false);
  };

  // Handle breakdown
  const handleBreakdown = () => {
    setShowTaskAttention(false);
    setShowBreakdown(true);
  };

  const handleBreakdownConfirm = (subtasks: string[]) => {
    console.log('Breaking down into subtasks:', subtasks);
    setShowBreakdown(false);
  };

  // Handle fallback
  const handleFallback = (task: Task) => {
    console.log('Using fallback for:', task.title);
    setShowTaskAttention(false);
  };

  // Handle abandon
  const handleAbandon = (task: Task) => {
    if (confirm(`Are you sure you want to abandon "${task.title}"?`)) {
      setTasks(tasks.filter(t => t.id !== task.id));
      setCurrentFocusTask(null);
      setShowTaskAttention(false);
    }
  };

  // Get next task suggestion
  const nextSuggestion = tasks.find(
    t => !t.done && t.id !== completedTask?.id && t.importance === 'high'
  ) || null;

  return (
    <div className="app-layout">
      <Sidebar navSections={navSections} />
      <div className="main-wrapper">
        <Topbar onNewTask={() => setShowCreateTask(true)} />
        <main className="page-content">
          <div className="dashboard-grid">
            <CurrentFocus 
              task={currentFocusTask} 
              onComplete={handleCompleteTask}
              onCantComplete={handleCantComplete}
            />
            
            <div className="dashboard-grid-2col">
              <TodayMission tasks={todayTasks} />
              <MonthCalendar 
                taskCounts={taskCountsByDate}
                onDateSelect={handleDateSelect}
              />
            </div>
          </div>
        </main>
      </div>

      {/* Modals */}
      {showCreateTask && (
        <CreateTaskModal
          onClose={() => setShowCreateTask(false)}
          onConfirm={handleCreateTask}
          buckets={availableBuckets}
        />
      )}

      {showCompletionFeedback && completedTask && (
        <CompletionFeedback
          completedTask={completedTask}
          nextSuggestion={nextSuggestion}
          todayStats={{
            completed: completedCount,
            total: tasks.length,
            focusTime: '2h 15m',
          }}
          onClose={() => setShowCompletionFeedback(false)}
          onMakeFocus={handleMakeFocus}
        />
      )}

      {showTaskAttention && currentFocusTask && (
        <TaskNeedsAttention
          task={currentFocusTask}
          onClose={() => setShowTaskAttention(false)}
          onReschedule={handleReschedule}
          onRedefine={handleRedefine}
          onBreakdown={handleBreakdown}
          onFallback={handleFallback}
          onAbandon={handleAbandon}
        />
      )}

      {showReschedule && currentFocusTask && (
        <RescheduleModal
          task={currentFocusTask}
          onClose={() => setShowReschedule(false)}
          onConfirm={handleRescheduleConfirm}
        />
      )}

      {showRedefine && currentFocusTask && (
        <RedefineModal
          task={currentFocusTask}
          onClose={() => setShowRedefine(false)}
          onConfirm={handleRedefineConfirm}
        />
      )}

      {showBreakdown && currentFocusTask && (
        <BreakdownModal
          task={currentFocusTask}
          onClose={() => setShowBreakdown(false)}
          onConfirm={handleBreakdownConfirm}
        />
      )}
    </div>
  );
}

export default App;
