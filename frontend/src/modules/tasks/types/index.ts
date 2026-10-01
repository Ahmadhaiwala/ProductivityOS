// Task-specific types
export interface TaskActionReason {
  action: 'reschedule' | 'redefine' | 'breakdown' | 'abandon';
  reason: string;
  timestamp: Date;
}

export interface NewTask {
  title: string;
  bucket: string;
  deadline: string;
  time?: string;
  recurring: boolean;
  recurrencePattern?: string;
  description?: string;
  importance?: 'low' | 'medium' | 'high';
}
