import { create } from 'zustand';
import { db } from '../../data/db/plannerDB';

const CURRENT_YEAR = new Date().getFullYear();

const DEFAULT_YEAR_DATA = {
  year: CURRENT_YEAR,
  identityStatement: '',
  themes: [
    { theme: '', why: '', lookLike: '', notThisYear: '' },
    { theme: '', why: '', lookLike: '', notThisYear: '' },
    { theme: '', why: '', lookLike: '', notThisYear: '' },
  ],
  targets: {
    build:   { goal: '', metric: '', by: '' },
    learn:   { goal: '', metric: '', by: '' },
    operate: { goal: '', metric: '', by: '' },
    live:    { goal: '', metric: '', by: '' },
  },
  yearEndOutcome: '',
  notThisYear: '',
  antiGoals: '',
};

let _saveTimer = null;
const debounceSave = (id, data) => {
  clearTimeout(_saveTimer);
  _saveTimer = setTimeout(() => {
    db.yearData.update(id, data);
  }, 600);
};

export const useYearStore = create((set, get) => ({
  yearData: null,
  loading: false,

  loadYear: async (year = CURRENT_YEAR) => {
    set({ loading: true });
    let data = await db.yearData.where('year').equals(year).first();
    if (!data) {
      const newData = { ...DEFAULT_YEAR_DATA, year };
      const id = await db.yearData.add(newData);
      data = { ...newData, id };
    }
    set({ yearData: data, loading: false });
  },

  updateField: (field, value) => {
    const { yearData } = get();
    if (!yearData) return;
    const updated = { ...yearData, [field]: value };
    set({ yearData: updated });
    debounceSave(yearData.id, { [field]: value });
  },

  updateTheme: (index, field, value) => {
    const { yearData } = get();
    if (!yearData) return;
    const themes = yearData.themes.map((t, i) => i === index ? { ...t, [field]: value } : t);
    set({ yearData: { ...yearData, themes } });
    debounceSave(yearData.id, { themes });
  },

  updateTarget: (bucket, field, value) => {
    const { yearData } = get();
    if (!yearData) return;
    const targets = { ...yearData.targets, [bucket]: { ...yearData.targets[bucket], [field]: value } };
    set({ yearData: { ...yearData, targets } });
    debounceSave(yearData.id, { targets });
  },
}));
