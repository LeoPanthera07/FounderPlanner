import { create } from 'zustand';
import { db } from '../../data/db/plannerDB';
import { getTodayString } from '../../utils/dateUtils';

export const useMetricsStore = create((set, get) => ({
  metrics: [],
  logs: [],
  loading: false,

  loadMetrics: async () => {
    set({ loading: true });
    const metrics = await db.metrics.toArray();
    set({ metrics, loading: false });
  },

  loadLogs: async (metricId, startDate, endDate) => {
    const logs = await db.metricLogs
      .where('metricId').equals(metricId)
      .and((l) => l.date >= startDate && l.date <= endDate)
      .toArray();
    set({ logs });
  },

  addMetric: async (metric) => {
    const id = await db.metrics.add(metric);
    const { metrics } = get();
    set({ metrics: [...metrics, { ...metric, id }] });
  },

  logMetricValue: async (metricId, value, date = getTodayString()) => {
    const existing = await db.metricLogs
      .where('metricId').equals(metricId).and((l) => l.date === date).first();
    if (existing) {
      await db.metricLogs.update(existing.id, { value });
    } else {
      await db.metricLogs.add({ metricId, date, value });
    }
  },

  deleteMetric: async (id) => {
    await db.metrics.delete(id);
    const { metrics } = get();
    set({ metrics: metrics.filter((m) => m.id !== id) });
  },
}));