import { useEffect, useState } from 'react';
import { useMonthStore } from './monthStore';
import { PlannerCard } from '../../components/cards/PlannerCard';
import { getBucketColor, BUCKETS } from '../../utils/bucketUtils';

const MONTHS = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
const STATUS_COLORS = {
  Active:  'bg-blue-100 text-blue-700',
  Done:    'bg-green-100 text-green-700',
  Paused:  'bg-amber-100 text-amber-700',
  Dropped: 'bg-red-100 text-red-600',
};

const Input = ({ value, onChange, placeholder }) => (
  <input value={value || ''} onChange={e => onChange(e.target.value)} placeholder={placeholder}
    className="w-full px-2 py-1.5 text-xs border border-slate-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-blue-300 bg-white" />
);

const Textarea = ({ value, onChange, placeholder, rows = 3 }) => (
  <textarea value={value || ''} onChange={e => onChange(e.target.value)} placeholder={placeholder} rows={rows}
    className="w-full px-3 py-2 text-sm border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-300 bg-white resize-none" />
);

export const MonthPage = () => {
  const now = new Date();
  const [year, setYear]   = useState(now.getFullYear());
  const [month, setMonth] = useState(now.getMonth() + 1);

  const { monthData, loading, loadMonth, updateField, updateProject, updateScorecard, updateReview } = useMonthStore();

  useEffect(() => { loadMonth(year, month); }, [year, month]);

  if (loading || !monthData) return (
    <div className="flex items-center justify-center h-64">
      <div className="animate-spin w-8 h-8 border-4 border-teal-500 border-t-transparent rounded-full" />
    </div>
  );

  return (
    <div className="max-w-4xl mx-auto px-4 py-6 flex flex-col gap-6">

      {/* Header */}
      <div className="flex items-center justify-between flex-wrap gap-3">
        <div>
          <h1 className="text-2xl font-bold text-[#1e3a5f]">{MONTHS[month - 1]} {year}</h1>
          <p className="text-sm text-slate-400">Projects · Scorecard · Focus</p>
        </div>
        <div className="flex items-center gap-2">
          <button onClick={() => { const d = new Date(year, month - 2); setYear(d.getFullYear()); setMonth(d.getMonth() + 1); }}
            className="px-3 py-1.5 text-xs border border-slate-200 rounded-lg hover:bg-slate-50 transition">← Prev</button>
          <button onClick={() => { setYear(now.getFullYear()); setMonth(now.getMonth() + 1); }}
            className="px-3 py-1.5 text-xs bg-[#1e3a5f] text-white rounded-lg hover:bg-[#16304f] transition">This Month</button>
          <button onClick={() => { const d = new Date(year, month); setYear(d.getFullYear()); setMonth(d.getMonth() + 1); }}
            className="px-3 py-1.5 text-xs border border-slate-200 rounded-lg hover:bg-slate-50 transition">Next →</button>
        </div>
      </div>

      {/* Monthly Win */}
      <PlannerCard title="Monthly Win" subtitle="The one result that would make this month count">
        <Textarea value={monthData.monthlyWin} onChange={v => updateField('monthlyWin', v)}
          placeholder="This month wins if..." rows={2} />
      </PlannerCard>

      {/* Projects */}
      <PlannerCard title="Project Portfolio" subtitle="Active projects this month">
        <div className="flex flex-col gap-2">
          {monthData.projects.map((p, i) => {
            const c = getBucketColor(p.bucket);
            return (
              <div key={i} className="grid grid-cols-1 md:grid-cols-5 gap-2 p-3 bg-slate-50 rounded-xl border border-slate-100">
                <div className="md:col-span-2">
                  <label className="text-xs text-slate-400 font-semibold block mb-1">Project</label>
                  <Input value={p.name} onChange={v => updateProject(i, 'name', v)} placeholder="Project name" />
                </div>
                <div>
                  <label className="text-xs text-slate-400 font-semibold block mb-1">Bucket</label>
                  <select value={p.bucket} onChange={e => updateProject(i, 'bucket', e.target.value)}
                    className={`w-full px-2 py-1.5 text-xs rounded-lg border-0 font-semibold focus:outline-none ${c.bg} ${c.text}`}>
                    {BUCKETS.map(b => <option key={b}>{b}</option>)}
                  </select>
                </div>
                <div>
                  <label className="text-xs text-slate-400 font-semibold block mb-1">Status</label>
                  <select value={p.status} onChange={e => updateProject(i, 'status', e.target.value)}
                    className={`w-full px-2 py-1.5 text-xs rounded-lg border-0 font-semibold focus:outline-none ${STATUS_COLORS[p.status] || 'bg-slate-100 text-slate-600'}`}>
                    {Object.keys(STATUS_COLORS).map(s => <option key={s}>{s}</option>)}
                  </select>
                </div>
                <div>
                  <label className="text-xs text-slate-400 font-semibold block mb-1">Milestone</label>
                  <Input value={p.milestone} onChange={v => updateProject(i, 'milestone', v)} placeholder="This month's milestone" />
                </div>
              </div>
            );
          })}
          <button onClick={() => updateField('projects', [...monthData.projects, { name: '', bucket: 'Build', status: 'Active', milestone: '', blockers: '' }])}
            className="text-xs text-slate-400 hover:text-blue-500 font-semibold transition py-1">
            + Add project
          </button>
        </div>
      </PlannerCard>

      {/* Scorecard */}
      <PlannerCard title="Monthly Scorecard" subtitle="3–5 metrics to track this month">
        <div className="overflow-x-auto">
          <table className="w-full text-xs border-collapse">
            <thead>
              <tr className="bg-[#1e3a5f] text-white">
                {['Metric', 'Target', 'Current', 'Status'].map(h => (
                  <th key={h} className="text-left px-3 py-2 font-semibold">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {monthData.scorecard.map((s, i) => (
                <tr key={i} className={i % 2 === 0 ? 'bg-white' : 'bg-slate-50'}>
                  {['metric','target','current','status'].map(f => (
                    <td key={f} className="px-1 py-1">
                      <Input value={s[f]} onChange={v => updateScorecard(i, f, v)} placeholder={f.charAt(0).toUpperCase() + f.slice(1)} />
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </PlannerCard>

      {/* Focus + Anti-drift */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <PlannerCard title="Monthly Focus" subtitle="The single most important thing">
          <Textarea value={monthData.monthlyFocus} onChange={v => updateField('monthlyFocus', v)}
            placeholder="This month I'm focusing on..." />
        </PlannerCard>
        <PlannerCard title="Anti-Drift Check" subtitle="What to say no to this month">
          <Textarea value={monthData.antiDrift} onChange={v => updateField('antiDrift', v)}
            placeholder="Not this month: no new projects, no social media scrolling..." />
        </PlannerCard>
      </div>

      {/* Monthly Review */}
      <PlannerCard title="Monthly Review" headerColor="bg-[#2a9d8f]" subtitle="Fill at end of month">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
          {[
            { key: 'win',       label: 'Win',         placeholder: 'Biggest win this month...'       },
            { key: 'lesson',    label: 'Lesson',      placeholder: 'Most important lesson...'         },
            { key: 'nextFocus', label: 'Next Focus',  placeholder: 'Top priority for next month...'   },
          ].map(({ key, label, placeholder }) => (
            <div key={key}>
              <label className="text-xs text-slate-500 font-semibold block mb-1">{label}</label>
              <Textarea value={monthData.review?.[key]} onChange={v => updateReview(key, v)} placeholder={placeholder} rows={3} />
            </div>
          ))}
        </div>
      </PlannerCard>

    </div>
  );
};
