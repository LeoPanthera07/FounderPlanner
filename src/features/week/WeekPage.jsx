import { useEffect } from 'react';
import { useWeekStore } from './weekStore';
import { WeeklyPriorities } from './WeeklyPriorities';
import { DayThemePlanner } from './DayThemePlanner';
import { WeeklyScorecard } from './WeeklyScorecard';
import { DeepWorkBlocks } from './DeepWorkBlocks';
import { MeetingBudget } from './MeetingBudget';
import { WeeklyReview } from './WeeklyReview';
import { getWeekNumber } from '../../utils/dateUtils';

export const WeekPage = () => {
  const { weekData, loading, loadWeek, updateField, updatePriority, updateDayTheme,
    updateScorecard, updateDeepWorkBlock, addMeeting, removeMeeting, updateReview } = useWeekStore();

  useEffect(() => { loadWeek(); }, []);

  if (loading || !weekData) return (
    <div className="flex items-center justify-center h-64">
      <div className="animate-spin w-8 h-8 border-4 border-blue-500 border-t-transparent rounded-full" />
    </div>
  );

  return (
    <div className="max-w-5xl mx-auto px-4 py-6 flex flex-col gap-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-[#1e3a5f]">Week {weekData.week} · {weekData.year}</h1>
          <p className="text-sm text-slate-400">Execution Map · Scorecard · Deep Work</p>
        </div>
        <span className="text-xs px-3 py-1 bg-amber-100 text-amber-700 font-semibold rounded-full">Operate · Live</span>
      </div>
      <WeeklyPriorities weeklyWin={weekData.weeklyWin} priorities={weekData.priorities}
        onWin={(v) => updateField('weeklyWin', v)} onUpdate={updatePriority} />
      <DayThemePlanner dayThemes={weekData.dayThemes} onUpdate={updateDayTheme} />
      <WeeklyScorecard scorecard={weekData.scorecard} onUpdate={updateScorecard} />
      <DeepWorkBlocks blocks={weekData.deepWorkBlocks} onUpdate={updateDeepWorkBlock} />
      <MeetingBudget meetings={weekData.meetings} onAdd={addMeeting} onRemove={removeMeeting} />
      <WeeklyReview review={weekData.review} onUpdate={updateReview} />
    </div>
  );
};
