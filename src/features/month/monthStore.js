import { create } from 'zustand';
import { db } from '../../data/db/plannerDB';
import { monthDefaults } from '../../data/defaults/monthDefaults';

export const useMonthStore = create((set, get) => ({
  monthData: null,
  loading: false,
  error: null,

  loadMonth: async (year = new Date().getFullYear(), month = new Date().getMonth() + 1) => {
    set({ loading: true });
    try {
      let data = await db.monthData
        .where('[year+month]').equals([year, month]).first()
        .catch(() => db.monthData.where('year').equals(year).and(r => r.month === month).first());
      if (!data) {
        data = monthDefaults();
        data.year = year;
        data.month = month;
        data.id = await db.monthData.add(data);
      }
      set({ monthData: data, loading: false });
    } catch (e) {
      set({ error: e.message, loading: false });
    }
  },

  updateField: async (field, value) => {
    const { monthData } = get();
    if (!monthData) return;
    await db.monthData.update(monthData.id, { [field]: value });
    set({ monthData: { ...monthData, [field]: value } });
  },

  updateProject: async (index, key, value) => {
    const { monthData } = get();
    const projects = [...monthData.projects];
    projects[index] = { ...projects[index], [key]: value };
    await db.monthData.update(monthData.id, { projects });
    set({ monthData: { ...monthData, projects } });
  },

  updateHabitFloor: async (index, key, value) => {
    const { monthData } = get();
    const habitFloor = [...monthData.habitFloor];
    habitFloor[index] = { ...habitFloor[index], [key]: value };
    await db.monthData.update(monthData.id, { habitFloor });
    set({ monthData: { ...monthData, habitFloor } });
  },

  updateScoreboard: async (index, key, value) => {
    const { monthData } = get();
    const scoreboard = [...monthData.scoreboard];
    scoreboard[index] = { ...scoreboard[index], [key]: value };
    await db.monthData.update(monthData.id, { scoreboard });
    set({ monthData: { ...monthData, scoreboard } });
  },

  updateMonthlyFocus: async (index, key, value) => {
    const { monthData } = get();
    const monthlyFocus = [...monthData.monthlyFocus];
    monthlyFocus[index] = { ...monthlyFocus[index], [key]: value };
    await db.monthData.update(monthData.id, { monthlyFocus });
    set({ monthData: { ...monthData, monthlyFocus } });
  },

  updateLifeAdmin: async (index, key, value) => {
    const { monthData } = get();
    const lifeAdmin = [...monthData.lifeAdmin];
    lifeAdmin[index] = { ...lifeAdmin[index], [key]: value };
    await db.monthData.update(monthData.id, { lifeAdmin });
    set({ monthData: { ...monthData, lifeAdmin } });
  },

  updateMilestone: async (index, key, value) => {
    const { monthData } = get();
    const milestones = [...monthData.milestones];
    milestones[index] = { ...milestones[index], [key]: value };
    await db.monthData.update(monthData.id, { milestones });
    set({ monthData: { ...monthData, milestones } });
  },

  updateStopStartContinue: async (type, index, value) => {
    const { monthData } = get();
    const ssc = { ...monthData.stopStartContinue };
    ssc[type] = [...ssc[type]];
    ssc[type][index] = value;
    await db.monthData.update(monthData.id, { stopStartContinue: ssc });
    set({ monthData: { ...monthData, stopStartContinue: ssc } });
  },

  updateReview: async (key, value) => {
    const { monthData } = get();
    const review = { ...monthData.review, [key]: value };
    await db.monthData.update(monthData.id, { review });
    set({ monthData: { ...monthData, review } });
  },
}));