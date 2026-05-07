import { create } from 'zustand';
import { db } from '../../data/db/plannerDB';

const now = new Date();
const CY  = now.getFullYear();
const CM  = now.getMonth() + 1;

const DEFAULT_MONTH = (year = CY, month = CM) => ({
  year, month,
  monthlyWin: '',
  projects: [
    { name: '', bucket: 'Build', status: 'Active', milestone: '', blockers: '' },
    { name: '', bucket: 'Learn', status: 'Active', milestone: '', blockers: '' },
    { name: '', bucket: 'Operate', status: 'Active', milestone: '', blockers: '' },
  ],
  habitFloor: { habits: '', minimum: '', trackVia: '' },
  scorecard:  [
    { metric: '', target: '', current: '', status: '' },
    { metric: '', target: '', current: '', status: '' },
    { metric: '', target: '', current: '', status: '' },
  ],
  monthlyFocus: '',
  antiDrift: '',
  lifeAdmin: '',
  review: { win: '', lesson: '', nextFocus: '' },
});

let _saveTimer = null;
const debounceSave = (id, data) => {
  clearTimeout(_saveTimer);
  _saveTimer = setTimeout(() => {
    db.monthData.update(id, data);
  }, 600);
};

export const useMonthStore = create((set, get) => ({
  monthData: null,
  loading: false,

  loadMonth: async (year = CY, month = CM) => {
    set({ loading: true });
    let data = await db.monthData
      .where('[year+month]').equals([year, month]).first()
      .catch(() => db.monthData.where('year').equals(year).filter(r => r.month === month).first());
    if (!data) {
      const newData = DEFAULT_MONTH(year, month);
      const id = await db.monthData.add(newData);
      data = { ...newData, id };
    }
    set({ monthData: data, loading: false });
  },

  updateField: (field, value) => {
    const { monthData } = get();
    if (!monthData) return;
    set({ monthData: { ...monthData, [field]: value } });
    debounceSave(monthData.id, { [field]: value });
  },

  updateProject: (index, field, value) => {
    const { monthData } = get();
    if (!monthData) return;
    const projects = monthData.projects.map((p, i) => i === index ? { ...p, [field]: value } : p);
    set({ monthData: { ...monthData, projects } });
    debounceSave(monthData.id, { projects });
  },

  updateScorecard: (index, field, value) => {
    const { monthData } = get();
    if (!monthData) return;
    const scorecard = monthData.scorecard.map((s, i) => i === index ? { ...s, [field]: value } : s);
    set({ monthData: { ...monthData, scorecard } });
    debounceSave(monthData.id, { scorecard });
  },

  updateReview: (field, value) => {
    const { monthData } = get();
    if (!monthData) return;
    const review = { ...monthData.review, [field]: value };
    set({ monthData: { ...monthData, review } });
    debounceSave(monthData.id, { review });
  },
}));
