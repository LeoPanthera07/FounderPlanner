import { create } from 'zustand';
import { db } from '../../data/db/plannerDB';
import { yearDefaults } from '../../data/defaults/yearDefaults';

export const useYearStore = create((set, get) => ({
  yearData: null,
  loading: false,
  error: null,

  loadYear: async (year = new Date().getFullYear()) => {
    set({ loading: true });
    try {
      let data = await db.yearData.where('year').equals(year).first();
      if (!data) {
        data = yearDefaults();
        data.id = await db.yearData.add(data);
      }
      set({ yearData: data, loading: false });
    } catch (e) {
      set({ error: e.message, loading: false });
    }
  },

  updateField: async (field, value) => {
    const { yearData } = get();
    if (!yearData) return;
    const updated = { ...yearData, [field]: value };
    await db.yearData.update(yearData.id, { [field]: value });
    set({ yearData: updated });
  },

  updateTarget: async (area, key, value) => {
    const { yearData } = get();
    const updated = {
      ...yearData,
      annualTargets: {
        ...yearData.annualTargets,
        [area]: { ...yearData.annualTargets[area], [key]: value },
      },
    };
    await db.yearData.update(yearData.id, { annualTargets: updated.annualTargets });
    set({ yearData: updated });
  },

  updateOutcome: async (index, key, value) => {
    const { yearData } = get();
    const outcomes = [...yearData.yearEndOutcomes];
    outcomes[index] = { ...outcomes[index], [key]: value };
    await db.yearData.update(yearData.id, { yearEndOutcomes: outcomes });
    set({ yearData: { ...yearData, yearEndOutcomes: outcomes } });
  },

  addNotThisYear: async (item) => {
    const { yearData } = get();
    const list = [...yearData.notThisYear, item];
    await db.yearData.update(yearData.id, { notThisYear: list });
    set({ yearData: { ...yearData, notThisYear: list } });
  },

  removeNotThisYear: async (index) => {
    const { yearData } = get();
    const list = yearData.notThisYear.filter((_, i) => i !== index);
    await db.yearData.update(yearData.id, { notThisYear: list });
    set({ yearData: { ...yearData, notThisYear: list } });
  },
}));