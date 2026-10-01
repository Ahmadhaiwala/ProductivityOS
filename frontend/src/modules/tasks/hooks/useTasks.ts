// Task management hooks
import { useState } from 'react';
import type { Task } from '../../../types';

export function useTasks(initialTasks: Task[]) {
  const [tasks, setTasks] = useState(initialTasks);

  const addTask = (newTask: Task) => {
    setTasks([...tasks, newTask]);
  };

  const updateTask = (id: number, updates: Partial<Task>) => {
    setTasks(tasks.map(t => t.id === id ? { ...t, ...updates } : t));
  };

  const deleteTask = (id: number) => {
    setTasks(tasks.filter(t => t.id !== id));
  };

  const completeTask = (id: number) => {
    updateTask(id, { done: true });
  };

  const getTasksByStatus = (done: boolean) => {
    return tasks.filter(t => t.done === done);
  };

  const getTasksByImportance = (importance: 'low' | 'medium' | 'high') => {
    return tasks.filter(t => t.importance === importance);
  };

  return {
    tasks,
    addTask,
    updateTask,
    deleteTask,
    completeTask,
    getTasksByStatus,
    getTasksByImportance,
  };
}
