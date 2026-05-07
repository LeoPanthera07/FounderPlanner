import { useEffect, useState } from 'react';
import { getHabitStreak, getBestStreak } from '../../utils/streakUtils';
import { getTodayString } from '../../utils/dateUtils';

export const HabitStreak = ({ habitId }) => {
  const [current, setCurrent] = useState(0);
  const [best, setBest] = useState(0);

  useEffect(() => {
    if (!habitId) return;
    getHabitStreak(habitId, getTodayString()).then(setCurrent);
    getBestStreak(habitId).then(setBest);
  }, [habitId]);

  return (
    <div className="flex items-center gap-3 text-xs">
      <div className="flex items-center gap-1">
        <span className="text-orange-500 text-base">🔥</span>
        <span className="font-bold text-orange-600">{current}</span>
        <span className="text-slate-400">current</span>
      </div>
      <div className="flex items-center gap-1">
        <span className="text-yellow-500 text-base">⭐</span>
        <span className="font-bold text-yellow-600">{best}</span>
        <span className="text-slate-400">best</span>
      </div>
    </div>
  );
};
