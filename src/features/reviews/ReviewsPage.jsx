import { useState } from 'react';
import { useReviewsStore } from './reviewsStore';
import { WeeklyReviewForm } from './WeeklyReviewForm';
import { MonthlyReviewForm } from './MonthlyReviewForm';
import { getWeekNumber, getMonthName } from '../../utils/dateUtils';

const now = new Date();
const TABS = [
  { key: 'week',  label: 'Weekly Review',  period: `${now.getFullYear()}-W${String(getWeekNumber(now)).padStart(2,'0')}` },
  { key: 'month', label: 'Monthly Review', period: `${now.getFullYear()}-M${String(now.getMonth()+1).padStart(2,'0')}` },
];

export const ReviewsPage = () => {
  const [tab, setTab] = useState('week');
  const { currentReview, loadReview, updateReviewData } = useReviewsStore();
  const current = TABS.find(t => t.key === tab);

  const handleTabChange = (key) => {
    setTab(key);
    const t = TABS.find(x => x.key === key);
    loadReview(key, t.period);
  };

  useState(() => { loadReview('week', TABS[0].period); }, []);

  return (
    <div className="max-w-4xl mx-auto px-4 py-6 flex flex-col gap-6">
      <div>
        <h1 className="text-2xl font-bold text-[#1e3a5f]">Reviews</h1>
        <p className="text-sm text-slate-400">Weekly · Monthly retrospectives</p>
      </div>

      <div className="flex gap-2 border-b border-slate-200 pb-0">
        {TABS.map(t => (
          <button key={t.key} onClick={() => handleTabChange(t.key)}
            className={`px-4 py-2 text-sm font-semibold rounded-t-lg border-b-2 transition
              ${tab === t.key ? 'border-[#1e3a5f] text-[#1e3a5f] bg-slate-50' : 'border-transparent text-slate-400 hover:text-slate-600'}`}>
            {t.label}
          </button>
        ))}
      </div>

      <div className="text-xs text-slate-400 font-mono">
        Period: {current?.period}
      </div>

      {tab === 'week' && (
        <WeeklyReviewForm data={currentReview?.data} onUpdate={updateReviewData} />
      )}
      {tab === 'month' && (
        <MonthlyReviewForm data={currentReview?.data} onUpdate={updateReviewData} />
      )}
    </div>
  );
};
