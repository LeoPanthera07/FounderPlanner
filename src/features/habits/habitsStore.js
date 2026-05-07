import { create } from 'zustand';
import { db } from '../../data/db/plannerDB';
import { getTodayString } from '../../utils/dateUtils';

export const useHabitsStore = create((set, get) => ({
  habits:    [],
  todayLogs: {},
  loading:   false,

  loadHabits: async () => {
    set({ loading: true });
    const habits = await db.habits.toArray();
    set({ habits, loading: false });
  },

  loadTodayLogs: async () => {
    const today = getTodayString();
    const logs  = await db.habitLogs.where('date').equals(today).toArray();
    const map   = {};
    logs.forEach(l => { map[l.habitId] = l; });
    set({ todayLogs: map });
  },

  addHabit: async (form) => {
    const habit = { ...form, createdAt: new Date().toISOString() };
    const id    = await db.habits.add(habit);
    set(s => ({ habits: [...s.habits, { ...habit, id }] }));
  },

  deleteHabit: async (id) => {
    await db.habits.delete(id);
    await db.habitLogs.where('habitId').equals(id).delete();
    set(s => ({ habits: s.habits.filter(h => h.id !== id) }));
  },

  toggleHabitLog: async (habitId) => {
    const today    = getTodayString();
    const existing = get().todayLogs[habitId];
    if (existing) {
      const newVal = !existing.completed;
      await db.habitLogs.update(existing.id, { completed: newVal });
      set(s => ({ todayLogs: { ...s.todayLogs, [habitId]: { ...existing, completed: newVal } } }));
    } else {
      const log = { habitId, date: today, completed: true, createdAt: new Date().toISOString() };
      const id  = await db.habitLogs.add(log);
      set(s => ({ todayLogs: { ...s.todayLogs, [habitId]: { ...log, id } } }));
    }
  },
}));
