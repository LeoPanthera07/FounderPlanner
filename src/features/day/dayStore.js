import { create } from 'zustand';
import { db } from '../../data/db/plannerDB';
import { dayDefaults } from '../../data/defaults/dayDefaults';
import { getTodayString } from '../../utils/dateUtils';

export const useDayStore = create((set, get) => ({
  dayData: null,
  loading: false,
  error: null,

  loadDay: async (date = getTodayString()) => {
    set({ loading: true });
    try {
      let data = await db.dayData.where('date').equals(date).first();
      if (!data) {
        data = dayDefaults(new Date(date));
        data.id = await db.dayData.add(data);
      }
      set({ dayData: data, loading: false });
    } catch (e) {
      set({ error: e.message, loading: false });
    }
  },

  updateField: async (field, value) => {
    const { dayData } = get();
    if (!dayData) return;
    await db.dayData.update(dayData.id, { [field]: value });
    set({ dayData: { ...dayData, [field]: value } });
  },

  updateFocusItem: async (key, field, value) => {
    const { dayData } = get();
    const focusLadder = {
      ...dayData.focusLadder,
      [key]: { ...dayData.focusLadder[key], [field]: value },
    };
    await db.dayData.update(dayData.id, { focusLadder });
    set({ dayData: { ...dayData, focusLadder } });
  },

  toggleRoutine: async (index) => {
    const { dayData } = get();
    const routines = [...dayData.routines];
    routines[index] = { ...routines[index], done: !routines[index].done };
    await db.dayData.update(dayData.id, { routines });
    set({ dayData: { ...dayData, routines } });
  },

  updateRoutine: async (index, key, value) => {
    const { dayData } = get();
    const routines = [...dayData.routines];
    routines[index] = { ...routines[index], [key]: value };
    await db.dayData.update(dayData.id, { routines });
    set({ dayData: { ...dayData, routines } });
  },

  updateReflection: async (key, value) => {
    const { dayData } = get();
    const reflection = { ...dayData.reflection, [key]: value };
    await db.dayData.update(dayData.id, { reflection });
    set({ dayData: { ...dayData, reflection } });
  },

  updateScheduleSlot: async (index, key, value) => {
    const { dayData } = get();
    const schedule = [...dayData.schedule];
    schedule[index] = { ...schedule[index], [key]: value };
    await db.dayData.update(dayData.id, { schedule });
    set({ dayData: { ...dayData, schedule } });
  },

  addShutdownItem: async (item) => {
    const { dayData } = get();
    const shutdownItems = [...(dayData.shutdownItems || []), item];
    await db.dayData.update(dayData.id, { shutdownItems });
    set({ dayData: { ...dayData, shutdownItems } });
  },

  updateShutdownItem: async (index, key, value) => {
    const { dayData } = get();
    const shutdownItems = [...dayData.shutdownItems];
    shutdownItems[index] = { ...shutdownItems[index], [key]: value };
    await db.dayData.update(dayData.id, { shutdownItems });
    set({ dayData: { ...dayData, shutdownItems } });
  },

  removeShutdownItem: async (index) => {
    const { dayData } = get();
    const shutdownItems = dayData.shutdownItems.filter((_, i) => i !== index);
    await db.dayData.update(dayData.id, { shutdownItems });
    set({ dayData: { ...dayData, shutdownItems } });
  },
}));