// Mock data (to be replaced with API calls)
import {
  Home,
  CheckSquare,
  Calendar,
  FolderOpen,
  Settings,
} from 'lucide-react';
import type { Task, NavSection } from '../types';

export const tasks: Task[] = [
  { id: 1, title: 'Build ProductivityOS Dashboard', bucket: 'Development', importance: 'high', deadline: 'Today, 8:00 PM', done: false },
  { id: 2, title: 'Review pull request for buckets CRUD', bucket: 'Development', importance: 'medium', deadline: 'Today, 8pm', done: false },
  { id: 3, title: 'Read chapter 7 of Clean Architecture', bucket: 'College', importance: 'medium', deadline: 'Tomorrow', done: true },
  { id: 4, title: '30-min run + stretching routine', bucket: 'Personal', importance: 'high', deadline: 'Today, 7am', done: true },
  { id: 5, title: 'Set up Neon DB connection string', bucket: 'Development', importance: 'high', deadline: 'Today, 5pm', done: false },
  { id: 6, title: 'Write unit tests for UserService', bucket: 'Development', importance: 'low', deadline: 'This week', done: false },
];

export const navSections: NavSection[] = [
  {
    section: 'Main',
    items: [
      { icon: <Home size={18} />, label: 'Today', active: true },
      { icon: <CheckSquare size={18} />, label: 'Upcoming' },
      { icon: <Calendar size={18} />, label: 'Calendar' },
    ],
  },
  {
    section: 'Buckets',
    items: [
      { icon: <FolderOpen size={18} />, label: 'Development' },
      { icon: <FolderOpen size={18} />, label: 'College' },
      { icon: <FolderOpen size={18} />, label: 'Career' },
      { icon: <FolderOpen size={18} />, label: 'Personal' },
      { icon: <FolderOpen size={18} />, label: 'Projects' },
    ],
  },
  {
    section: 'Settings',
    items: [
      { icon: <Settings size={18} />, label: 'Settings' },
    ],
  },
];
