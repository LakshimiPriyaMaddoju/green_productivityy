import { useState, useEffect, useCallback, useMemo } from 'react';
import { Activity, ActivityCategory, TimeSlot, DayRecord } from '../types';

const STORAGE_KEYS = {
  ACTIVITIES: 'green_prod_activities_v2',
  HISTORY: 'green_prod_history_v2',
  STARTED: 'green_prod_has_started_v2',
};

// Formats hour (0 - 23) to short string like "12 AM", "9 AM", "1 PM", "11 PM"
export function formatHourShort(hour: number): string {
  const normalized = ((hour % 24) + 24) % 24;
  if (normalized === 0) return '12 AM';
  if (normalized < 12) return `${normalized} AM`;
  if (normalized === 12) return '12 PM';
  return `${normalized - 12} PM`;
}

// Formats hour slot like "12 AM – 1 AM", "9 AM – 10 AM", "11 PM – 12 AM"
export function formatTimeSlotLabel(hour: number): string {
  const startStr = formatHourShort(hour);
  const endStr = formatHourShort(hour + 1);
  return `${startStr} – ${endStr}`;
}

export function getTodayDateString(): string {
  const today = new Date();
  const year = today.getFullYear();
  const month = String(today.getMonth() + 1).padStart(2, '0');
  const day = String(today.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
}

const INITIAL_ACTIVITIES: Activity[] = [
  {
    id: 'seed-act-1',
    title: 'Morning Yoga & Fresh Air',
    description: 'Gentle stretching, deep breathing, and hydration',
    startHour: 7,
    endHour: 8,
    category: 'exercise',
    completed: true,
    date: getTodayDateString(),
    createdAt: new Date().toISOString(),
    completedAt: new Date().toISOString(),
  },
  {
    id: 'seed-act-2',
    title: 'Healthy Breakfast & Mindful Tea',
    description: 'Oatmeal with berries and warm chamomile tea',
    startHour: 8,
    endHour: 9,
    category: 'health',
    completed: true,
    date: getTodayDateString(),
    createdAt: new Date().toISOString(),
    completedAt: new Date().toISOString(),
  },
  {
    id: 'seed-act-3',
    title: 'Deep Work: Core Project Architecture',
    description: 'Focus sprint without phone notifications',
    startHour: 9,
    endHour: 12,
    category: 'work',
    completed: false,
    date: getTodayDateString(),
    createdAt: new Date().toISOString(),
  },
  {
    id: 'seed-act-4',
    title: 'Lunch Break & Garden Walk',
    description: 'Nutritious lunch and rest eyes from screens',
    startHour: 12,
    endHour: 13,
    category: 'health',
    completed: false,
    date: getTodayDateString(),
    createdAt: new Date().toISOString(),
  },
  {
    id: 'seed-act-5',
    title: 'System Design & Reading',
    description: 'Read chapter 4 of software design patterns',
    startHour: 14,
    endHour: 16,
    category: 'study',
    completed: false,
    date: getTodayDateString(),
    createdAt: new Date().toISOString(),
  },
  {
    id: 'seed-act-6',
    title: 'Evening Journaling & Sketching',
    description: 'Reflect on accomplishments and sketch in notebook',
    startHour: 20,
    endHour: 21,
    category: 'personal',
    completed: false,
    date: getTodayDateString(),
    createdAt: new Date().toISOString(),
  },
];

export function useProductivityStore() {
  const [selectedDate, setSelectedDate] = useState<string>(getTodayDateString());

  // Has started landing page
  const [hasStarted, setHasStarted] = useState<boolean>(() => {
    try {
      return localStorage.getItem(STORAGE_KEYS.STARTED) === 'true';
    } catch {
      return false;
    }
  });

  // Current real-world hour (0 - 23)
  const [currentHour, setCurrentHour] = useState<number>(() => new Date().getHours());

  // Keep current hour updated every minute
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentHour(new Date().getHours());
    }, 60000);
    return () => clearInterval(timer);
  }, []);

  // Activities across all dates
  const [activities, setActivities] = useState<Activity[]>(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEYS.ACTIVITIES);
      if (stored) {
        const parsed = JSON.parse(stored);
        if (Array.isArray(parsed) && parsed.length > 0) {
          return parsed;
        }
      }
    } catch (e) {
      console.error('Failed to parse activities from localStorage', e);
    }
    return INITIAL_ACTIVITIES;
  });

  // Day History
  const [dayHistory, setDayHistory] = useState<DayRecord[]>(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEYS.HISTORY);
      if (stored) {
        return JSON.parse(stored);
      }
    } catch (e) {
      console.error('Failed to load history', e);
    }
    return [];
  });

  // Persist activities
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEYS.ACTIVITIES, JSON.stringify(activities));
    } catch (e) {
      console.error('Failed to save activities', e);
    }
  }, [activities]);

  // Persist day history
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEYS.HISTORY, JSON.stringify(dayHistory));
    } catch (e) {
      console.error('Failed to save history', e);
    }
  }, [dayHistory]);

  const enterDashboard = useCallback(() => {
    setHasStarted(true);
    try {
      localStorage.setItem(STORAGE_KEYS.STARTED, 'true');
    } catch {}
  }, []);

  const returnToLanding = useCallback(() => {
    setHasStarted(false);
    try {
      localStorage.setItem(STORAGE_KEYS.STARTED, 'false');
    } catch {}
  }, []);

  // Filter activities for selected date
  const dateActivities = useMemo(() => {
    return activities.filter((a) => a.date === selectedDate);
  }, [activities, selectedDate]);

  // CRUD Operations
  const addActivity = useCallback(
    (
      title: string,
      startHour: number,
      endHour: number,
      category: ActivityCategory = 'work',
      description?: string,
      targetDate?: string
    ) => {
      const trimmed = title.trim();
      if (!trimmed) return;

      const dateToUse = targetDate || selectedDate;
      const validStart = Math.max(0, Math.min(23, startHour));
      const validEnd = Math.max(validStart + 1, Math.min(24, endHour));

      const newActivity: Activity = {
        id: `act-${Date.now()}-${Math.random().toString(36).substring(2, 7)}`,
        title: trimmed,
        description: description?.trim() || undefined,
        startHour: validStart,
        endHour: validEnd,
        category,
        completed: false,
        date: dateToUse,
        createdAt: new Date().toISOString(),
      };

      setActivities((prev) => [...prev, newActivity]);
    },
    [selectedDate]
  );

  const editActivity = useCallback(
    (
      id: string,
      title: string,
      startHour: number,
      endHour: number,
      category: ActivityCategory,
      description?: string
    ) => {
      const trimmed = title.trim();
      if (!trimmed) return;

      const validStart = Math.max(0, Math.min(23, startHour));
      const validEnd = Math.max(validStart + 1, Math.min(24, endHour));

      setActivities((prev) =>
        prev.map((a) => {
          if (a.id === id) {
            return {
              ...a,
              title: trimmed,
              startHour: validStart,
              endHour: validEnd,
              category,
              description: description?.trim() || undefined,
            };
          }
          return a;
        })
      );
    },
    []
  );

  const toggleActivity = useCallback((id: string) => {
    setActivities((prev) =>
      prev.map((a) => {
        if (a.id === id) {
          const nextCompleted = !a.completed;
          return {
            ...a,
            completed: nextCompleted,
            completedAt: nextCompleted ? new Date().toISOString() : undefined,
          };
        }
        return a;
      })
    );
  }, []);

  const deleteActivity = useCallback((id: string) => {
    setActivities((prev) => prev.filter((a) => a.id !== id));
  }, []);

  // 24 Hourly Time Slots for the selected date
  const isSelectedDateToday = selectedDate === getTodayDateString();

  const timeSlots: TimeSlot[] = useMemo(() => {
    const slots: TimeSlot[] = [];

    for (let h = 0; h < 24; h++) {
      // Find all activities covering this hour
      const matchingActivities = dateActivities.filter((act) => {
        return h >= act.startHour && h < act.endHour;
      });

      let period: 'night' | 'morning' | 'afternoon' | 'evening' = 'night';
      if (h >= 6 && h < 12) period = 'morning';
      else if (h >= 12 && h < 17) period = 'afternoon';
      else if (h >= 17 && h < 22) period = 'evening';
      else period = 'night';

      slots.push({
        hour: h,
        label: formatTimeSlotLabel(h),
        shortLabel: formatHourShort(h),
        period,
        isCurrentHour: isSelectedDateToday && h === currentHour,
        activities: matchingActivities,
      });
    }

    return slots;
  }, [dateActivities, isSelectedDateToday, currentHour]);

  // Scheduled hours calculation (how many distinct hours from 0 to 23 have at least one activity)
  const scheduledHours = useMemo(() => {
    const occupiedHours = new Set<number>();
    dateActivities.forEach((act) => {
      for (let h = act.startHour; h < act.endHour; h++) {
        if (h >= 0 && h < 24) {
          occupiedHours.add(h);
        }
      }
    });
    return occupiedHours.size;
  }, [dateActivities]);

  const unplannedHours = Math.max(0, 24 - scheduledHours);

  // Completion calculation for selected date
  const totalActivities = dateActivities.length;
  const completedActivities = dateActivities.filter((a) => a.completed).length;
  const pendingActivities = totalActivities - completedActivities;
  const completionPercentage =
    totalActivities === 0 ? 0 : Math.round((completedActivities / totalActivities) * 100);

  // Encouraging Message formula
  const encouragingMessage = useMemo(() => {
    if (totalActivities === 0) return "Add your first activity to map your 24-hour day! 🌱";
    if (completionPercentage === 0) return "Every journey starts with one step! 🌱";
    if (completionPercentage < 50) return "Great start! Keep going! 🌸";
    if (completionPercentage < 75) return "You're halfway there! 🌻";
    if (completionPercentage < 100) return "Almost there! Amazing work! 💚";
    return "Wonderful! You completed everything today! 🎉";
  }, [totalActivities, completionPercentage]);

  // Finish My Day
  const finishDay = useCallback(
    (reflectionNote: string = '') => {
      const parts = selectedDate.split('-');
      const dateObj = new Date(Number(parts[0]), Number(parts[1]) - 1, Number(parts[2]));
      const displayDate = dateObj.toLocaleDateString('en-US', {
        weekday: 'long',
        month: 'short',
        day: 'numeric',
        year: 'numeric',
      });

      const newRecord: DayRecord = {
        date: selectedDate,
        displayDate,
        totalActivities,
        completedActivities,
        pendingActivities,
        completionPercentage,
        scheduledHours,
        unplannedHours,
        completedActivityTitles: dateActivities.filter((a) => a.completed).map((a) => a.title),
        pendingActivityTitles: dateActivities.filter((a) => !a.completed).map((a) => a.title),
        reflectionNote,
        finishedAt: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      };

      setDayHistory((prev) => {
        const filtered = prev.filter((r) => r.date !== selectedDate);
        return [newRecord, ...filtered];
      });

      return newRecord;
    },
    [
      selectedDate,
      totalActivities,
      completedActivities,
      pendingActivities,
      completionPercentage,
      scheduledHours,
      unplannedHours,
      dateActivities,
    ]
  );

  // New Day with carry forward option
  const startNewDay = useCallback(
    (carryPending: boolean = true) => {
      finishDay('Archived on day transition');

      // Next day calculation
      const parts = selectedDate.split('-');
      const curDate = new Date(Number(parts[0]), Number(parts[1]) - 1, Number(parts[2]));
      curDate.setDate(curDate.getDate() + 1);
      const nextDateStr = `${curDate.getFullYear()}-${String(curDate.getMonth() + 1).padStart(
        2,
        '0'
      )}-${String(curDate.getDate()).padStart(2, '0')}`;

      if (carryPending) {
        const pendingOnCurrent = dateActivities.filter((a) => !a.completed);
        const carriedOver: Activity[] = pendingOnCurrent.map((a) => ({
          ...a,
          id: `carried-${Date.now()}-${Math.random().toString(36).substring(2, 6)}`,
          date: nextDateStr,
          completed: false,
        }));
        setActivities((prev) => [...prev, ...carriedOver]);
      }

      setSelectedDate(nextDateStr);
    },
    [finishDay, selectedDate, dateActivities]
  );

  // Date navigation helpers
  const goToPreviousDay = useCallback(() => {
    const parts = selectedDate.split('-');
    const d = new Date(Number(parts[0]), Number(parts[1]) - 1, Number(parts[2]));
    d.setDate(d.getDate() - 1);
    setSelectedDate(
      `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(
        d.getDate()
      ).padStart(2, '0')}`
    );
  }, [selectedDate]);

  const goToNextDay = useCallback(() => {
    const parts = selectedDate.split('-');
    const d = new Date(Number(parts[0]), Number(parts[1]) - 1, Number(parts[2]));
    d.setDate(d.getDate() + 1);
    setSelectedDate(
      `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(
        d.getDate()
      ).padStart(2, '0')}`
    );
  }, [selectedDate]);

  const goToToday = useCallback(() => {
    setSelectedDate(getTodayDateString());
  }, []);

  return {
    hasStarted,
    enterDashboard,
    returnToLanding,
    selectedDate,
    setSelectedDate,
    goToPreviousDay,
    goToNextDay,
    goToToday,
    isToday: isSelectedDateToday,
    currentHour,
    activities,
    dateActivities,
    timeSlots,
    addActivity,
    editActivity,
    toggleActivity,
    deleteActivity,
    totalActivities,
    completedActivities,
    pendingActivities,
    completionPercentage,
    scheduledHours,
    unplannedHours,
    encouragingMessage,
    dayHistory,
    finishDay,
    startNewDay,
  };
}
