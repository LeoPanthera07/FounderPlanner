import { useEffect } from 'react';
import { useMonthStore } from './monthStore';
import { ProjectPortfolio } from './ProjectPortfolio';
import { HabitFloor } from './HabitFloor';
import { ScoreboardMetrics } from './ScoreboardMetrics';
import { MonthlyFocus } from './MonthlyFocus';
import { LifeAdminCalendar } from './LifeAdminCalendar';
import { AntiDriftCheck } from './AntiDriftCheck';
import { MonthlyReview } from './MonthlyReview';
import { getMonthName } from '../../utils/dateUtils';

export const MonthPage = () => {
  const { monthData, loading, loadMonth, updateField, updateProject, updateHabitFloor,
    updateScoreboard, updateMonthlyFocus, updateLifeAdmin, updateMilestone,
    updateStopStartContinue, updateReview } = useMonthStore();

  useEffect(() => { loadMonth(); }, []);

  if (loading || !monthData) return (
    <div className="flex items-center justify-center h-64">
      <div className="animate-spin w-8 h-8 border-4 border-teal-500 border-t-transparent rounded-full" />
    </div>
  );

  return (
    <div className="max-w-5xl mx-auto px-4 py-6 flex flex-col gap-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-[#1e3a5f]">{getMonthName(monthData.month)} {monthData.year}</h1>
          <p className="text-sm text-slate-400">Projects · Systems · Scoreboards</p>
        </div>
        <span className="text-xs px-3 py-1 bg-teal-100 text-teal-700 font-semibold rounded-full">Build · Learn</span>
      </div>
      <ProjectPortfolio projects={monthData.projects} onUpdate={updateProject} />
      <HabitFloor habitFloor={monthData.habitFloor} onUpdate={updateHabitFloor} />
      <ScoreboardMetrics scoreboard={monthData.scoreboard} onUpdate={updateScoreboard} />
      <MonthlyFocus bottleneck={monthData.bottleneck} monthlyFocus={monthData.monthlyFocus}
        onBottleneck={(v) => updateField('bottleneck', v)} onUpdate={updateMonthlyFocus} />
      <LifeAdminCalendar lifeAdmin={monthData.lifeAdmin} monthlyAdventure={monthData.monthlyAdventure}
        onUpdate={updateLifeAdmin} onAdventure={(v) => updateField('monthlyAdventure', v)} />
      <AntiDriftCheck />
      <MonthlyReview milestones={monthData.milestones} onMilestone={updateMilestone}
        stopStartContinue={monthData.stopStartContinue} onSSC={updateStopStartContinue}
        review={monthData.review} onReview={updateReview} />
    </div>
  );
};
