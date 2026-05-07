import { db } from '../data/db/plannerDB';
import { getPreviousDay } from './dateUtils';

export const getHabitStreak = async (habitId, endDate) => {
  let streak = 0;
  let current = endDate;

  while (true) {
    const log = await db.habitLogs
      .where('[habitId+date]')
      .equals([habitId, current])
      .first();

    if (!log || !log.completed) break;
    streak++;
    current = getPreviousDay(current);
  }
  return streak;
};

export const getWeeklyHabitCompletion = async (habitId, weekDates) => {
  const logs = await db.habitLogs
    .where('habitId').equals(habitId)
    .and((log) => weekDates.includes(log.date))
    .toArray();

  return {
    completed: logs.filter((l) => l.completed).length,
    total: weekDates.length,
    percentage: Math.round((logs.filter((l) => l.completed).length / weekDates.length) * 100),
  };
};

export const getMonthlyHabitData = async (habitId, year, month) => {
  const logs = await db.habitLogs
    .where('habitId').equals(habitId)
    .and((log) => {
      const d = new Date(log.date);
      return d.getFullYear() === year && d.getMonth() + 1 === month;
    })
    .toArray();

  return logs.reduce((acc, log) => {
    acc[log.date] = log.completed;
    return acc;
  }, {});
};

export const getBestStreak = async (habitId) => {
  const logs = await db.habitLogs
    .where('habitId').equals(habitId)
    .sortBy('date');

  let best = 0, current = 0;
  logs.forEach((log, i) => {
    if (log.completed) {
      current++;
      best = Math.max(best, current);
    } else {
      current = 0;
    }
  });
  return best;
};