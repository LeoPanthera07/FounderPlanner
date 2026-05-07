import { useEffect, useState } from 'react';
import { useDayStore } from './dayStore';
import { DailyCommandPage } from './DailyCommandPage';
import { FocusLadder } from './FocusLadder';
import { ShutdownDecision } from './ShutdownDecision';
import { EndOfDayReflection } from './EndOfDayReflection';
import { HourlySchedule } from './HourlySchedule';
import { getTodayString, formatDate, getPreviousDay, getNextDay } from '../../utils/dateUtils';

export const DayPage = () => {
  const [activeDate, setActiveDate] = useState(getTodayString());
  const { dayData, loading, loadDay, updateField, updateFocusItem,
    updateReflection, updateSchedule,
    addShutdownItem, updateShutdownItem, removeShutdownItem } = useDayStore();

  useEffect(() => { loadDay(activeDate); }, [activeDate]);

  if (loading || !dayData) return (
    <div className="flex items-center justify-center h-64">
      <div className="animate-spin w-8 h-8 border-4 border-indigo-500 border-t-transparent rounded-full" />
    </div>
  );

  const schedule    = dayData.schedule || [];
  const completed   = schedule.filter(b => b.done).length;
  const total       = schedule.length;

  return (
    <div className="max-w-5xl mx-auto px-4 py-6 flex flex-col gap-6">
      <div className="flex items-center justify-between flex-wrap gap-3">
        <div>
          <h1 className="text-2xl font-bold text-[#1e3a5f]">{formatDate(activeDate)}</h1>
          <p className="text-sm text-slate-400">Daily Command · Schedule · Reflection</p>
        </div>
        <div className="flex items-center gap-2">
          <button onClick={() => setActiveDate(getPreviousDay(activeDate))}
            className="px-3 py-1.5 text-xs border border-slate-200 rounded-lg hover:bg-slate-50 transition">← Prev</button>
          <button onClick={() => setActiveDate(getTodayString())}
            className="px-3 py-1.5 text-xs bg-[#1e3a5f] text-white rounded-lg hover:bg-[#16304f] transition">Today</button>
          <button onClick={() => setActiveDate(getNextDay(activeDate))}
            className="px-3 py-1.5 text-xs border border-slate-200 rounded-lg hover:bg-slate-50 transition">Next →</button>
        </div>
        {total > 0 && (
          <div className="flex items-center gap-2">
            <span className="text-xs text-slate-500">Schedule: <span className="font-bold text-green-600">{completed}/{total}</span></span>
            <div className="w-24 h-2 bg-slate-200 rounded-full overflow-hidden">
              <div className="h-full bg-green-500 rounded-full transition-all" style={{ width: `${(completed/total)*100}%` }} />
            </div>
          </div>
        )}
      </div>

      <DailyCommandPage date={activeDate} dayTheme={dayData.dayTheme}
        todayMattersBecause={dayData.todayMattersBecause} energyForecast={dayData.energyForecast}
        onUpdate={updateField} />

      <FocusLadder focusLadder={dayData.focusLadder} onUpdate={updateFocusItem} />

      <HourlySchedule schedule={schedule} onUpdate={updateSchedule} />

      <EndOfDayReflection reflection={dayData.reflection} onUpdate={updateReflection} />

      <ShutdownDecision items={dayData.shutdownItems || []} onAdd={addShutdownItem}
        onUpdate={updateShutdownItem} onRemove={removeShutdownItem} />
    </div>
  );
};
