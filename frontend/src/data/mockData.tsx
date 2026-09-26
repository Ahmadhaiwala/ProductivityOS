// Mock data (to be replaced with API calls)
import {
  CheckCircle2,
  Flame,
  Boxes,
  Timer,
  LayoutDashboard,
  CheckSquare,
  Package,
  CalendarDays,
  BarChart2,
  Search,
  Settings,
} from 'lucide-react';
import type { Stat, Bucket, Task, NavSection } from '../types';

export const stats: Stat[] = [
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

export const buckets: Bucket[] = [
  { id: 'all', name: 'All Tasks', count: 20 },
  { id: 'work', name: 'Work', count: 8 },
  { id: 'study', name: 'Study', count: 5 },
  { id: 'health', name: 'Health', count: 4 },
  { id: 'home', name: 'Home', count: 3 },
];

export const tasks: Task[] = [
  { id: 1, title: 'Finalize API schema for tasks module', bucket: 'work', importance: 'high', deadline: 'Today, 6pm', done: false },
  { id: 2, title: 'Review pull request for buckets CRUD', bucket: 'work', importance: 'medium', deadline: 'Today, 8pm', done: false },
  { id: 3, title: 'Read chapter 7 of Clean Architecture', bucket: 'study', importance: 'medium', deadline: 'Tomorrow', done: true },
  { id: 4, title: '30-min run + stretching routine', bucket: 'health', importance: 'high', deadline: 'Today, 7am', done: true },
  { id: 5, title: 'Set up Neon DB connection string', bucket: 'work', importance: 'high', deadline: 'Today, 5pm', done: false },
  { id: 6, title: 'Write unit tests for UserService', bucket: 'work', importance: 'low', deadline: 'This week', done: false },
];

export const navSections: NavSection[] = [
  {
    section: 'Main',
    items: [
      { icon: <LayoutDashboard size={16} />, label: 'Dashboard', active: true },
      { icon: <CheckSquare size={16} />, label: 'My Tasks', badge: '12' },
      { icon: <Package size={16} />, label: 'Buckets' },
      { icon: <CalendarDays size={16} />, label: 'Calendar' },
    ],
  },
  {
    section: 'Explore',
    items: [
      { icon: <BarChart2 size={16} />, label: 'Analytics' },
      { icon: <Search size={16} />, label: 'Search' },
    ],
  },
  {
    section: 'Account',
    items: [
      { icon: <Settings size={16} />, label: 'Settings' },
    ],
  },
];
