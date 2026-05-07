import { db } from '../data/db/plannerDB';
import { getTodayString, getPreviousDay } from './dateUtils';

export const carryForwardItems = async (targetDate = getTodayString()) => {
  const yesterday = getPreviousDay(targetDate);
  const prevDay   = await db.dayData.where('date').equals(yesterday).first();
  if (!prevDay) return [];

  const carried = prevDay.shutdownItems?.filter(
    (item) => item.decision === 'carry' && item.carryDate === targetDate
  ) || [];

  return carried.map((item) => ({
    task:      item.task,
    bucket:    item.bucket || 'Build',
    timeBlock: '',
    done:      false,
    carriedFrom: yesterday,
  }));
};

export const buildShutdownItem = (task, bucket = 'Build') => ({
  task,
  bucket,
  decision: '',
  carryDate: '',
});

export const applyDecision = (item, decision, carryDate = '') => ({
  ...item,
  decision,
  carryDate: decision === 'carry' ? carryDate : '',
});