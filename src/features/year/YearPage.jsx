import { useEffect } from 'react';
import { useYearStore } from './yearStore';
import { PlannerCard } from '../../components/cards/PlannerCard';
import { getBucketColor } from '../../utils/bucketUtils';

const BUCKETS = ['build', 'learn', 'operate', 'live'];
const BUCKET_LABELS = { build: 'Build', learn: 'Learn', operate: 'Operate', live: 'Live' };

const DEFAULT_TARGETS = {
  build:   { goal: '', metric: '', by: '' },
  learn:   { goal: '', metric: '', by: '' },
  operate: { goal: '', metric: '', by: '' },
  live:    { goal: '', metric: '', by: '' },
};

const DEFAULT_THEMES = [
  { theme: '', why: '', lookLike: '', notThisYear: '' },
  { theme: '', why: '', lookLike: '', notThisYear: '' },
  { theme: '', why: '', lookLike: '', notThisYear: '' },
];

const Input = ({ value, onChange, placeholder, className = '' }) => (
  <input value={value || ''} onChange={e => onChange(e.target.value)} placeholder={placeholder}
    className={`w-full px-3 py-2 text-sm border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-300 bg-white ${className}`} />
);

const Textarea = ({ value, onChange, placeholder, rows = 2 }) => (
  <textarea value={value || ''} onChange={e => onChange(e.target.value)} placeholder={placeholder} rows={rows}
    className="w-full px-3 py-2 text-sm border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-300 bg-white resize-none" />
);

export const YearPage = () => {
  const { yearData, loading, loadYear, updateField, updateTheme, updateTarget } = useYearStore();

  useEffect(() => { loadYear(); }, []);

  if (loading || !yearData) return (
    <div className="flex items-center justify-center h-64">
      <div className="animate-spin w-8 h-8 border-4 border-blue-500 border-t-transparent rounded-full" />
    </div>
  );

  // Safely merge stored data with defaults — handles old/incomplete records
  const targets = { ...DEFAULT_TARGETS, ...(yearData.targets || {}) };
  const themes  = (yearData.themes?.length ? yearData.themes : DEFAULT_THEMES).map(t => ({
    theme: '', why: '', lookLike: '', notThisYear: '', ...t,
  }));

  return (
    <div className="max-w-4xl mx-auto px-4 py-6 flex flex-col gap-6">

      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-[#1e3a5f]">{yearData.year} — Year Plan</h1>
          <p className="text-sm text-slate-400">Vision · Themes · Targets</p>
        </div>
        <span className="text-xs px-3 py-1 bg-blue-100 text-blue-700 font-semibold rounded-full">Year View</span>
      </div>

      {/* Identity */}
      <PlannerCard title="Identity Statement" subtitle="Who are you becoming this year?">
        <Textarea value={yearData.identityStatement}
          onChange={v => updateField('identityStatement', v)}
          placeholder="I am a founder who ships fast, learns deliberately, and protects my health..."
          rows={3} />
      </PlannerCard>

      {/* Themes */}
      <PlannerCard title="Annual Themes" subtitle="Max 3 themes — the filters for every decision">
        <div className="flex flex-col gap-3">
          {themes.map((t, i) => (
            <div key={i} className="grid grid-cols-1 md:grid-cols-4 gap-2 p-3 bg-slate-50 rounded-xl border border-slate-100">
              <div>
                <label className="text-xs text-slate-400 font-semibold block mb-1">Theme {i + 1}</label>
                <Input value={t.theme} onChange={v => updateTheme(i, 'theme', v)} placeholder="e.g. Deep Work" />
              </div>
              <div>
                <label className="text-xs text-slate-400 font-semibold block mb-1">Why it matters</label>
                <Input value={t.why} onChange={v => updateTheme(i, 'why', v)} placeholder="Because..." />
              </div>
              <div>
                <label className="text-xs text-slate-400 font-semibold block mb-1">Looks like</label>
                <Input value={t.lookLike} onChange={v => updateTheme(i, 'lookLike', v)} placeholder="In practice..." />
              </div>
              <div>
                <label className="text-xs text-slate-400 font-semibold block mb-1">Not this year</label>
                <Input value={t.notThisYear} onChange={v => updateTheme(i, 'notThisYear', v)} placeholder="Won't do..." />
              </div>
            </div>
          ))}
        </div>
      </PlannerCard>

      {/* Targets */}
      <PlannerCard title="Annual Targets" subtitle="One meaningful goal per bucket">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {BUCKETS.map(b => {
            const c = getBucketColor(BUCKET_LABELS[b]);
            const t = { goal: '', metric: '', by: '', ...(targets[b] || {}) };
            return (
              <div key={b} className="p-3 rounded-xl border border-slate-200 bg-white">
                <div className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-bold mb-3 ${c.bg} ${c.text}`}>
                  {BUCKET_LABELS[b]}
                </div>
                <div className="flex flex-col gap-2">
                  <Input value={t.goal}   onChange={v => updateTarget(b, 'goal',   v)} placeholder="Goal" />
                  <div className="grid grid-cols-2 gap-2">
                    <Input value={t.metric} onChange={v => updateTarget(b, 'metric', v)} placeholder="Success metric" />
                    <Input value={t.by}     onChange={v => updateTarget(b, 'by',     v)} placeholder="By when" />
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </PlannerCard>

      {/* Year-end + Anti-goals */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <PlannerCard title="Year-End Outcome" subtitle="The one result that defines success">
          <Textarea value={yearData.yearEndOutcome}
            onChange={v => updateField('yearEndOutcome', v)}
            placeholder="At the end of this year I will have..." rows={4} />
        </PlannerCard>
        <PlannerCard title="Anti-Goals" subtitle="What you are explicitly NOT doing">
          <Textarea value={yearData.antiGoals}
            onChange={v => updateField('antiGoals', v)}
            placeholder="Not this year: no new side projects, no freelance clients..." rows={4} />
        </PlannerCard>
      </div>

    </div>
  );
};
