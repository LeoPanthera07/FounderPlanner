import Dexie from 'dexie';

export const db = new Dexie('FounderPlannerDB');

// VERSION RULES:
// - Only bump version when adding/changing stores
// - NEVER use .upgrade() to clear data
// - Version 1 = original schema
// - Version 2 = added schedule as array (no structural change needed, keep at 1)
db.version(1).stores({
  yearData:   '++id, year',
  monthData:  '++id, year, month',
  weekData:   '++id, year, week',
  dayData:    '++id, date',
  habits:     '++id, name',
  habitLogs:  '++id, habitId, date',
  metrics:    '++id, name',
  metricLogs: '++id, metricId, date',
  reviews:    '++id, type, period',
});

export default db;
