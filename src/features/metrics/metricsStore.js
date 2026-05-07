import { create } from "zustand";
import { db } from "../../data/db/plannerDB";
import { getTodayString } from "../../utils/dateUtils";

let _t = null;
const dsave = (id, data) => { clearTimeout(_t); _t = setTimeout(() => db.metrics.update(id, data), 600); };

export const useMetricsStore = create((set, get) => ({
  metrics: [],
  todayLogs: {},
  loading: false,

  loadMetrics: async () => {
    set({ loading: true });
    const metrics = await db.metrics.toArray();
    set({ metrics, loading: false });
  },

  loadTodayLogs: async () => {
    const today = getTodayString();
    const logs = await db.metricLogs.where("date").equals(today).toArray();
    const map = {};
    logs.forEach(l => { map[l.metricId] = l; });
    set({ todayLogs: map });
  },

  addMetric: async (form) => {
    const m = { ...form, createdAt: new Date().toISOString() };
    const id = await db.metrics.add(m);
    set(s => ({ metrics: [...s.metrics, { ...m, id }] }));
  },

  deleteMetric: async (id) => {
    await db.metrics.delete(id);
    await db.metricLogs.where("metricId").equals(id).delete();
    set(s => ({ metrics: s.metrics.filter(m => m.id !== id) }));
  },

  logMetric: async (metricId, value) => {
    const today = getTodayString();
    const existing = get().todayLogs[metricId];
    if (existing) {
      const newVal = parseFloat(existing.value || 0) + value;
      await db.metricLogs.update(existing.id, { value: newVal });
      set(s => ({ todayLogs: { ...s.todayLogs, [metricId]: { ...existing, value: newVal } } }));
    } else {
      const log = { metricId, date: today, value, createdAt: new Date().toISOString() };
      const id = await db.metricLogs.add(log);
      set(s => ({ todayLogs: { ...s.todayLogs, [metricId]: { ...log, id } } }));
    }
  },
}));