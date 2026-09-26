// Type definitions for the application

export interface NavItem {
  icon: React.ReactNode;
  label: string;
  active?: boolean;
  badge?: string;
}

export interface NavSection {
  section: string;
  items: NavItem[];
}

export interface Stat {
  icon: React.ReactNode;
  label: string;
  value: number;
  trend: string;
  up: boolean;
  colorClass: string;
}

export interface Bucket {
  id: string;
  name: string;
  count: number;
}

export interface Task {
  id: number;
  title: string;
  bucket: string;
  importance: 'high' | 'medium' | 'low';
  deadline: string;
  done: boolean;
}
