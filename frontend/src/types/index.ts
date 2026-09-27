// Type definitions for the application

export interface NavItem {
  icon: React.ReactNode;
  label: string;
  active?: boolean;
}

export interface NavSection {
  section: string;
  items: NavItem[];
}

export interface Task {
  id: number;
  title: string;
  bucket: string;
  importance: 'high' | 'medium' | 'low';
  deadline: string;
  done: boolean;
}
