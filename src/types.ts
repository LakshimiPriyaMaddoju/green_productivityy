export type ActivityCategory = 'study' | 'work' | 'personal' | 'health' | 'exercise' | 'other';
export type TaskCategory = ActivityCategory | 'learning';
export type TaskPriority = 'low' | 'medium' | 'high';

export interface TimerState {
  totalSeconds: number;
  secondsRemaining: number;
  isRunning: boolean;
  lastUpdatedTimestamp: number | null;
}

export interface Task {
  id: string;
  text?: string;
  title?: string;
  description?: string;
  startHour?: number;
  endHour?: number;
  completed: boolean;
  createdAt: string;
  completedAt?: string;
  category: TaskCategory;
  priority?: TaskPriority;
  notes?: string;
}

export interface Activity {
  id: string;
  title: string;
  description?: string;
  startHour: number; // 0 - 23 (e.g. 9 for 9 AM)
  endHour: number;   // 1 - 24 (e.g. 10 for 10 AM)
  category: ActivityCategory;
  completed: boolean;
  date: string; // YYYY-MM-DD
  createdAt: string;
  completedAt?: string;
}

export interface TimeSlot {
  hour: number; // 0 to 23
  label: string; // "12 AM – 1 AM", etc.
  shortLabel: string; // "12 AM"
  period: 'night' | 'morning' | 'afternoon' | 'evening';
  isCurrentHour: boolean;
  activities: Activity[];
}

export interface DayRecord {
  date: string; // YYYY-MM-DD
  displayDate: string;
  totalActivities: number;
  completedActivities: number;
  pendingActivities: number;
  completionPercentage: number;
  scheduledHours: number;
  unplannedHours: number;
  completedActivityTitles: string[];
  pendingActivityTitles: string[];
  reflectionNote?: string;
  finishedAt: string;
}

// Category design styles helper
export interface CategoryStyle {
  label: string;
  bg: string;
  border: string;
  badgeBg: string;
  text: string;
  icon: string;
}

export const CATEGORY_STYLES: Record<ActivityCategory, CategoryStyle> = {
  study: {
    label: 'Study',
    bg: '#EAF0D0',
    border: '#535E27',
    badgeBg: '#DCE9A4',
    text: '#26351F',
    icon: '📚',
  },
  work: {
    label: 'Work',
    bg: '#FFF3D6',
    border: '#8E6B17',
    badgeBg: '#FFE89E',
    text: '#26351F',
    icon: '💼',
  },
  personal: {
    label: 'Personal',
    bg: '#F5ECE3',
    border: '#7D5A46',
    badgeBg: '#EFECE1',
    text: '#26351F',
    icon: '🏠',
  },
  health: {
    label: 'Health',
    bg: '#FFEBF1',
    border: '#B34A6E',
    badgeBg: '#FFD9E3',
    text: '#26351F',
    icon: '🥑',
  },
  exercise: {
    label: 'Exercise',
    bg: '#E3F4E5',
    border: '#3F7A48',
    badgeBg: '#CBE8CE',
    text: '#26351F',
    icon: '🏃',
  },
  other: {
    label: 'Other',
    bg: '#F4F3ED',
    border: '#6B6E63',
    badgeBg: '#E3E3DB',
    text: '#26351F',
    icon: '✨',
  },
};
