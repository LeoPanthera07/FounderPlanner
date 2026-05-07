import { create } from 'zustand';
import { db } from '../../data/db/plannerDB';
import { getTodayString } from '../../utils/dateUtils';

export const useHabitsStore = create((set, get) => ({
  habits: [],
  todayLogs: {},
  loading: false,

  loadHabits: async () => {
    set({ loading: true });
    const habits = await db.habits.where('active').equals(1).toArray();
    set({ habits, loading: false });
  },

  loadTodayLogs: async (date = getTodayString()) => {
    const logs = await db.habitLogs.where('date').equals(date).toArray();
    const map = {};
    logs.forEach((l) => { map[l.habitId] = l; });
    set({ todayLogs: map });
  },

  addHabit: async (habit) => {
    const id = await db.habits.add({ ...habit, active: true, createdAt: getTodayString() });
    const { habits } = get();
    set({ habits: [...habits, { ...habit, id, active: true }] });
  },

  toggleHabitLog: async (habitId, date = getTodayString()) => {
    const { todayLogs } = get();
    const existing = todayLogs[habitId];
    if (existing) {
      await db.habitLogs.update(existing.id, { completed: !existing.completed });
      set({
        todayLogs: {
          ...todayLogs,
          [habitId]: { ...existing, completed: !existing.completed },
        },
      });
    } else {
      const id = await db.habitLogs.add({ habitId, date, completed: true });
      set({
        todayLogs: { ...todayLogs, [habitId]: { id, habitId, date, completed: true } },
      });
    }
  },

  deleteHabit: async (id) => {
    await db.habits.update(id, { active: false });
    const { habits } = get();
    set({ habits: habits.filter((h) => h.id !== id) });
  },

  updateHabit: async (id, changes) => {
    await db.habits.update(id, changes);
    const { habits } = get();
    set({ habits: habits.map((h) => (h.id === id ? { ...h, ...changes } : h)) });
  },
}));