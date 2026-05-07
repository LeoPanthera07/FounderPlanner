import { create } from 'zustand';
import { db } from '../../data/db/plannerDB';
import { dayDefaults } from '../../data/defaults/dayDefaults';
import { getTodayString } from '../../utils/dateUtils';

const isValidBlock = (b) =>
  b &&
  typeof b.name === 'string' &&
  b.name.trim() !== '' &&
  typeof b.startTime === 'string' &&
  /^\d{2}:\d{2}$/.test(b.startTime);

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
      // Strip any auto-generated or nameless slots from old data
      const cleanSchedule = (data.schedule || []).filter(isValidBlock);
      if (cleanSchedule.length !== (data.schedule || []).length) {
        await db.dayData.update(data.id, { schedule: cleanSchedule });
        data = { ...data, schedule: cleanSchedule };
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

  updateReflection: async (key, value) => {
    const { dayData } = get();
    const reflection = { ...dayData.reflection, [key]: value };
    await db.dayData.update(dayData.id, { reflection });
    set({ dayData: { ...dayData, reflection } });
  },

  updateSchedule: async (blocks) => {
    const { dayData } = get();
    const clean = (blocks || []).filter(isValidBlock);
    await db.dayData.update(dayData.id, { schedule: clean });
    set({ dayData: { ...dayData, schedule: clean } });
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
