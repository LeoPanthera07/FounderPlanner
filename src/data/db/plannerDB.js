import Dexie from 'dexie';

export const db = new Dexie('FounderPlannerDB');

db.version(1).stores({
  yearData:    '++id, year',
  monthData:   '++id, year, month',
  weekData:    '++id, year, week',
  dayData:     '++id, date',
  habits:      '++id, name',
  habitLogs:   '++id, habitId, date',
  metrics:     '++id, name',
  metricLogs:  '++id, metricId, date',
  reviews:     '++id, type, period',
});