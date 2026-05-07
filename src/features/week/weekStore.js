import { create } from 'zustand';
import { db } from '../../data/db/plannerDB';
import { weekDefaults } from '../../data/defaults/weekDefaults';
import { getWeekNumber } from '../../utils/dateUtils';

export const useWeekStore = create((set, get) => ({
  weekData: null,
  loading: false,
  error: null,

  loadWeek: async (year = new Date().getFullYear(), week = getWeekNumber(new Date())) => {
    set({ loading: true });
    try {
      let data = await db.weekData
        .where('year').equals(year).and(r => r.week === week).first();
      if (!data) {
        data = weekDefaults();
        data.year = year;
        data.week = week;
        data.id = await db.weekData.add(data);
      }
      set({ weekData: data, loading: false });
    } catch (e) {
      set({ error: e.message, loading: false });
    }
  },

  updateField: async (field, value) => {
    const { weekData } = get();
    if (!weekData) return;
    await db.weekData.update(weekData.id, { [field]: value });
    set({ weekData: { ...weekData, [field]: value } });
  },

  updatePriority: async (index, key, value) => {
    const { weekData } = get();
    const priorities = [...weekData.priorities];
    priorities[index] = { ...priorities[index], [key]: value };
    await db.weekData.update(weekData.id, { priorities });
    set({ weekData: { ...weekData, priorities } });
  },

  updateDayTheme: async (index, key, value) => {
    const { weekData } = get();
    const dayThemes = [...weekData.dayThemes];
    dayThemes[index] = { ...dayThemes[index], [key]: value };
    await db.weekData.update(weekData.id, { dayThemes });
    set({ weekData: { ...weekData, dayThemes } });
  },

  updateScorecard: async (metric, day, value) => {
    const { weekData } = get();
    const scorecard = {
      ...weekData.scorecard,
      [metric]: { ...weekData.scorecard[metric], [day]: value },
    };
    await db.weekData.update(weekData.id, { scorecard });
    set({ weekData: { ...weekData, scorecard } });
  },

  updateDeepWorkBlock: async (index, key, value) => {
    const { weekData } = get();
    const deepWorkBlocks = [...weekData.deepWorkBlocks];
    deepWorkBlocks[index] = { ...deepWorkBlocks[index], [key]: value };
    await db.weekData.update(weekData.id, { deepWorkBlocks });
    set({ weekData: { ...weekData, deepWorkBlocks } });
  },

  addMeeting: async (meeting) => {
    const { weekData } = get();
    const meetings = [...weekData.meetings, meeting];
    await db.weekData.update(weekData.id, { meetings });
    set({ weekData: { ...weekData, meetings } });
  },

  removeMeeting: async (index) => {
    const { weekData } = get();
    const meetings = weekData.meetings.filter((_, i) => i !== index);
    await db.weekData.update(weekData.id, { meetings });
    set({ weekData: { ...weekData, meetings } });
  },

  updateReview: async (key, value) => {
    const { weekData } = get();
    const review = { ...weekData.review, [key]: value };
    await db.weekData.update(weekData.id, { review });
    set({ weekData: { ...weekData, review } });
  },
}));