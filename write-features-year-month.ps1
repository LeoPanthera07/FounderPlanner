# ── YEAR FEATURE ──────────────────────────────────────────────────────────────

Set-Content "src/features/year/IdentityStatement.jsx" @'
import { TextAreaField } from '../../components/forms/TextAreaField';
import { PlannerCard } from '../../components/cards/PlannerCard';

export const IdentityStatement = ({ value, onChange }) => (
  <PlannerCard title="Identity Statement" subtitle="Who am I becoming this year?">
    <TextAreaField
      value={value}
      onChange={onChange}
      placeholder="I am becoming a person who..."
      rows={3}
    />
  </PlannerCard>
);
'@

Set-Content "src/features/year/AnnualThemes.jsx" @'
import { InputField } from '../../components/forms/InputField';
import { PlannerCard } from '../../components/cards/PlannerCard';

export const AnnualThemes = ({ themes, onChange }) => (
  <PlannerCard title="Three Annual Themes">
    <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
      {themes.map((theme, i) => (
        <InputField
          key={i}
          label={`Theme ${i + 1}`}
          value={theme}
          onChange={(val) => onChange(i, val)}
          placeholder={`Theme ${i + 1}`}
        />
      ))}
    </div>
  </PlannerCard>
);
'@

Set-Content "src/features/year/AnnualTargets.jsx" @'
import { InputField } from '../../components/forms/InputField';
import { PlannerCard } from '../../components/cards/PlannerCard';

const AREAS = ['career','health','money','lifestyle','relationships'];

export const AnnualTargets = ({ targets, onChange }) => (
  <PlannerCard title="Annual Targets">
    <div className="overflow-x-auto">
      <table className="w-full text-xs border-collapse">
        <thead>
          <tr className="bg-[#1e3a5f] text-white">
            {['Area','Target (measurable)','Why it matters','Evidence by Dec 31'].map(h => (
              <th key={h} className="text-left px-3 py-2 font-semibold">{h}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {AREAS.map((area, i) => (
            <tr key={area} className={i % 2 === 0 ? 'bg-white' : 'bg-slate-50'}>
              <td className="px-3 py-2 font-semibold text-slate-600 capitalize whitespace-nowrap">{area}</td>
              {['target','why','evidence'].map(f => (
                <td key={f} className="px-1 py-1">
                  <input
                    value={targets[area]?.[f] || ''}
                    onChange={(e) => onChange(area, f, e.target.value)}
                    className="w-full px-2 py-1 text-xs border border-slate-200 rounded bg-white focus:outline-none focus:ring-1 focus:ring-blue-400"
                  />
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  </PlannerCard>
);
'@

Set-Content "src/features/year/YearEndOutcomes.jsx" @'
import { OutcomeCard } from '../../components/cards/OutcomeCard';
import { PlannerCard } from '../../components/cards/PlannerCard';

export const YearEndOutcomes = ({ outcomes, onChange }) => (
  <PlannerCard title="Top 5 Year-End Outcomes" subtitle="Specific & measurable">
    <div className="flex flex-col gap-2">
      {outcomes.map((o, i) => (
        <OutcomeCard
          key={i}
          number={i + 1}
          outcome={o.outcome}
          deadline={o.deadline}
          bucket={o.bucket}
          onChange={(field, val) => onChange(i, field, val)}
        />
      ))}
    </div>
  </PlannerCard>
);
'@

Set-Content "src/features/year/NotThisYearList.jsx" @'
import { useState } from 'react';
import { PlannerCard } from '../../components/cards/PlannerCard';

export const NotThisYearList = ({ items, onAdd, onRemove }) => {
  const [input, setInput] = useState('');
  const handleAdd = () => {
    if (input.trim()) { onAdd(input.trim()); setInput(''); }
  };
  return (
    <PlannerCard title="Not-This-Year List" subtitle="Goals intentionally parked">
      <div className="flex gap-2 mb-3">
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && handleAdd()}
          placeholder="Add a parked goal..."
          className="flex-1 px-3 py-2 text-sm border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
        />
        <button
          onClick={handleAdd}
          className="px-4 py-2 bg-[#1e3a5f] text-white text-sm font-semibold rounded-lg hover:bg-[#16304f] transition"
        >
          Park it
        </button>
      </div>
      <ul className="flex flex-col gap-1">
        {items.map((item, i) => (
          <li key={i} className="flex items-center justify-between px-3 py-2 bg-slate-50 rounded-lg border border-slate-100">
            <span className="text-sm text-slate-600">🚫 {item}</span>
            <button onClick={() => onRemove(i)} className="text-xs text-red-400 hover:text-red-600 transition">remove</button>
          </li>
        ))}
      </ul>
    </PlannerCard>
  );
};
'@

Set-Content "src/features/year/YearPage.jsx" @'
import { useEffect } from 'react';
import { useYearStore } from './yearStore';
import { IdentityStatement } from './IdentityStatement';
import { AnnualThemes } from './AnnualThemes';
import { AnnualTargets } from './AnnualTargets';
import { YearEndOutcomes } from './YearEndOutcomes';
import { NotThisYearList } from './NotThisYearList';

export const YearPage = () => {
  const { yearData, loading, loadYear, updateField, updateTarget, updateOutcome, addNotThisYear, removeNotThisYear } = useYearStore();

  useEffect(() => { loadYear(); }, []);

  if (loading || !yearData) return (
    <div className="flex items-center justify-center h-64">
      <div className="animate-spin w-8 h-8 border-4 border-blue-500 border-t-transparent rounded-full" />
    </div>
  );

  return (
    <div className="max-w-5xl mx-auto px-4 py-6 flex flex-col gap-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-[#1e3a5f]">Year {yearData.year}</h1>
          <p className="text-sm text-slate-400">North Star · Annual Architecture</p>
        </div>
        <span className="text-xs px-3 py-1 bg-blue-100 text-blue-700 font-semibold rounded-full">Build · Learn · Operate · Live</span>
      </div>
      <IdentityStatement value={yearData.identityStatement} onChange={(v) => updateField('identityStatement', v)} />
      <AnnualThemes themes={yearData.themes} onChange={(i, v) => { const t = [...yearData.themes]; t[i] = v; updateField('themes', t); }} />
      <AnnualTargets targets={yearData.annualTargets} onChange={updateTarget} />
      <YearEndOutcomes outcomes={yearData.yearEndOutcomes} onChange={updateOutcome} />
      <NotThisYearList items={yearData.notThisYear} onAdd={addNotThisYear} onRemove={removeNotThisYear} />
    </div>
  );
};
'@

# ── MONTH FEATURE ─────────────────────────────────────────────────────────────

Set-Content "src/features/month/ProjectPortfolio.jsx" @'
import { PlannerCard } from '../../components/cards/PlannerCard';

export const ProjectPortfolio = ({ projects, onUpdate }) => (
  <PlannerCard title="Annual Project Portfolio" subtitle="3 max">
    <div className="overflow-x-auto">
      <table className="w-full text-xs border-collapse">
        <thead>
          <tr className="bg-[#1e3a5f] text-white">
            {['Project','Q1 Milestone','Q2 Milestone','Q3 Milestone','Q4 Milestone'].map(h => (
              <th key={h} className="text-left px-3 py-2 font-semibold">{h}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {projects.map((p, i) => (
            <tr key={i} className={i % 2 === 0 ? 'bg-white' : 'bg-slate-50'}>
              {['name','q1','q2','q3','q4'].map(f => (
                <td key={f} className="px-1 py-1">
                  <input
                    value={p[f] || ''}
                    onChange={(e) => onUpdate(i, f, e.target.value)}
                    placeholder={f === 'name' ? `Project ${i+1}` : ''}
                    className="w-full px-2 py-1 text-xs border border-slate-200 rounded bg-white focus:outline-none focus:ring-1 focus:ring-blue-400"
                  />
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  </PlannerCard>
);
'@

Set-Content "src/features/month/HabitFloor.jsx" @'
import { PlannerCard } from '../../components/cards/PlannerCard';

export const HabitFloor = ({ habitFloor, onUpdate }) => (
  <PlannerCard title="Habit Floor" subtitle="Non-negotiables even on bad days" headerColor="bg-[#2a9d8f]">
    <div className="overflow-x-auto">
      <table className="w-full text-xs border-collapse">
        <thead>
          <tr className="bg-[#2a9d8f] text-white">
            {['Habit','Minimum Standard','Track Via'].map(h => (
              <th key={h} className="text-left px-3 py-2 font-semibold">{h}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {habitFloor.map((h, i) => (
            <tr key={i} className={i % 2 === 0 ? 'bg-white' : 'bg-slate-50'}>
              {['habit','minimum','trackVia'].map(f => (
                <td key={f} className="px-1 py-1">
                  <input
                    value={h[f] || ''}
                    onChange={(e) => onUpdate(i, f, e.target.value)}
                    className="w-full px-2 py-1 text-xs border border-slate-200 rounded bg-white focus:outline-none focus:ring-1 focus:ring-teal-400"
                  />
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  </PlannerCard>
);
'@

Set-Content "src/features/month/ScoreboardMetrics.jsx" @'
import { PlannerCard } from '../../components/cards/PlannerCard';

export const ScoreboardMetrics = ({ scoreboard, onUpdate }) => (
  <PlannerCard title="Scoreboard Metrics">
    <div className="overflow-x-auto">
      <table className="w-full text-xs border-collapse">
        <thead>
          <tr className="bg-[#1e3a5f] text-white">
            {['Metric','Weekly Target','Monthly Target','Track Method'].map(h => (
              <th key={h} className="text-left px-3 py-2 font-semibold">{h}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {scoreboard.map((row, i) => (
            <tr key={i} className={i % 2 === 0 ? 'bg-white' : 'bg-slate-50'}>
              {['metric','weeklyTarget','monthlyTarget','trackMethod'].map(f => (
                <td key={f} className="px-1 py-1">
                  <input
                    value={row[f] || ''}
                    onChange={(e) => onUpdate(i, f, e.target.value)}
                    className="w-full px-2 py-1 text-xs border border-slate-200 rounded bg-white focus:outline-none focus:ring-1 focus:ring-blue-400"
                  />
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  </PlannerCard>
);
'@

Set-Content "src/features/month/MonthlyFocus.jsx" @'
import { PlannerCard } from '../../components/cards/PlannerCard';
import { TextAreaField } from '../../components/forms/TextAreaField';
import { getBucketColor } from '../../utils/bucketUtils';

export const MonthlyFocus = ({ bottleneck, monthlyFocus, onBottleneck, onUpdate }) => (
  <div className="flex flex-col gap-4">
    <PlannerCard title="Monthly Bottleneck" headerColor="bg-amber-600">
      <TextAreaField
        value={bottleneck}
        onChange={onBottleneck}
        placeholder="The single hardest thing that would make this month feel stuck..."
        rows={2}
      />
    </PlannerCard>
    <PlannerCard title="Monthly Focus" subtitle="3 outcomes max: Build · Learn · Live">
      <div className="overflow-x-auto">
        <table className="w-full text-xs border-collapse">
          <thead>
            <tr className="bg-[#1e3a5f] text-white">
              {['Bucket','Monthly Outcome','Owner / System','Deadline','Done Looks Like'].map(h => (
                <th key={h} className="text-left px-3 py-2 font-semibold">{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {monthlyFocus.map((row, i) => {
              const c = getBucketColor(row.bucket);
              return (
                <tr key={i} className={i % 2 === 0 ? 'bg-white' : 'bg-slate-50'}>
                  <td className="px-2 py-1">
                    <span className={`text-xs px-2 py-0.5 rounded-full font-semibold ${c.bg} ${c.text}`}>{row.bucket}</span>
                  </td>
                  {['outcome','owner','deadline','doneLooksLike'].map(f => (
                    <td key={f} className="px-1 py-1">
                      <input
                        type={f === 'deadline' ? 'date' : 'text'}
                        value={row[f] || ''}
                        onChange={(e) => onUpdate(i, f, e.target.value)}
                        className="w-full px-2 py-1 text-xs border border-slate-200 rounded bg-white focus:outline-none focus:ring-1 focus:ring-blue-400"
                      />
                    </td>
                  ))}
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </PlannerCard>
  </div>
);
'@

Set-Content "src/features/month/LifeAdminCalendar.jsx" @'
import { PlannerCard } from '../../components/cards/PlannerCard';
import { TextAreaField } from '../../components/forms/TextAreaField';

const STATUS_COLORS = { done: 'bg-green-100 text-green-700', pending: 'bg-amber-100 text-amber-700', '': 'bg-slate-100 text-slate-500' };

export const LifeAdminCalendar = ({ lifeAdmin, monthlyAdventure, onUpdate, onAdventure }) => (
  <div className="flex flex-col gap-4">
    <PlannerCard title="Life Admin & Calendar" subtitle="Clear before filling task list">
      <div className="overflow-x-auto">
        <table className="w-full text-xs border-collapse">
          <thead>
            <tr className="bg-[#2a9d8f] text-white">
              {['Item Type','Detail','Date / Deadline','Status'].map(h => (
                <th key={h} className="text-left px-3 py-2 font-semibold">{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {lifeAdmin.map((row, i) => (
              <tr key={i} className={i % 2 === 0 ? 'bg-white' : 'bg-slate-50'}>
                <td className="px-3 py-1.5 font-medium text-slate-600 whitespace-nowrap">{row.type}</td>
                {['detail','date','status'].map(f => (
                  <td key={f} className="px-1 py-1">
                    {f === 'status' ? (
                      <select
                        value={row[f] || ''}
                        onChange={(e) => onUpdate(i, f, e.target.value)}
                        className={`px-2 py-0.5 text-xs rounded font-semibold border-0 focus:outline-none ${STATUS_COLORS[row[f]] || STATUS_COLORS['']}`}
                      >
                        {['','pending','done'].map(s => <option key={s} value={s}>{s || '—'}</option>)}
                      </select>
                    ) : (
                      <input
                        type={f === 'date' ? 'date' : 'text'}
                        value={row[f] || ''}
                        onChange={(e) => onUpdate(i, f, e.target.value)}
                        className="w-full px-2 py-1 text-xs border border-slate-200 rounded bg-white focus:outline-none focus:ring-1 focus:ring-teal-400"
                      />
                    )}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </PlannerCard>
    <PlannerCard title="Monthly Adventure or Reward" headerColor="bg-green-700">
      <TextAreaField value={monthlyAdventure} onChange={onAdventure} placeholder="What's the reward or adventure this month?" rows={2} />
    </PlannerCard>
  </div>
);
'@

Set-Content "src/features/month/AntiDriftCheck.jsx" @'
import { PlannerCard } from '../../components/cards/PlannerCard';

const CHECKS = [
  'No shipped output this week despite many hours "working".',
  'Calendar dominated by meetings with no deep-work blocks protected.',
  'Same tasks carry forward for 3+ days with no decision made on them.',
  'Learning blocks are happening but no project uses the knowledge yet.',
];

export const AntiDriftCheck = () => (
  <PlannerCard title="Anti-Drift Check" subtitle="Signs you're busy but not advancing" headerColor="bg-red-700">
    <ul className="flex flex-col gap-2">
      {CHECKS.map((c, i) => (
        <li key={i} className="flex items-start gap-2 text-sm text-slate-700">
          <span className="mt-0.5 text-red-500 font-bold">■</span>
          {c}
        </li>
      ))}
    </ul>
  </PlannerCard>
);
'@

Set-Content "src/features/month/MonthlyReview.jsx" @'
import { PlannerCard } from '../../components/cards/PlannerCard';
import { TextAreaField } from '../../components/forms/TextAreaField';
import { MilestoneTable } from '../../components/tables/MilestoneTable';

const REVIEW_PROMPTS = [
  { key: 'momentum',    label: 'Momentum',     prompt: 'What created real, compounding progress this month?' },
  { key: 'lowValue',    label: 'Low Value',     prompt: 'What looked productive but moved no needle?' },
  { key: 'lesson',      label: 'Lesson',        prompt: 'One insight to carry into next month.' },
  { key: 'leverage',    label: 'Leverage',      prompt: 'One system, tool, or habit that amplified output.' },
  { key: 'constraint',  label: 'Constraint',    prompt: 'The single thing to remove to unlock next month.' },
  { key: 'nextPriority',label: 'Next Priority', prompt: "What becomes Month+1's first action on Day 1?" },
];

export const MonthlyReview = ({ milestones, onMilestone, stopStartContinue, onSSC, review, onReview }) => (
  <div className="flex flex-col gap-4">
    <PlannerCard title="Milestones, Risks & Checkpoints">
      <MilestoneTable milestones={milestones} onUpdate={onMilestone} />
    </PlannerCard>
    <PlannerCard title="Stop · Start · Continue Review">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {[
          { type: 'stop',    label: 'STOP doing',     color: 'text-red-600 border-red-200 bg-red-50'   },
          { type: 'start',   label: 'START doing',    color: 'text-blue-600 border-blue-200 bg-blue-50' },
          { type: 'continue',label: 'CONTINUE doing', color: 'text-green-600 border-green-200 bg-green-50' },
        ].map(({ type, label, color }) => (
          <div key={type} className={`rounded-lg border p-3 ${color}`}>
            <p className="text-xs font-bold uppercase mb-2">{label}</p>
            {stopStartContinue[type].map((val, i) => (
              <input
                key={i}
                value={val || ''}
                onChange={(e) => onSSC(type, i, e.target.value)}
                placeholder={`${label} ${i+1}...`}
                className="w-full mb-1 px-2 py-1 text-xs border border-slate-200 rounded bg-white focus:outline-none focus:ring-1 focus:ring-blue-400"
              />
            ))}
          </div>
        ))}
      </div>
    </PlannerCard>
    <PlannerCard title="Monthly Review Prompts" headerColor="bg-[#2a9d8f]">
      <div className="flex flex-col gap-3">
        {REVIEW_PROMPTS.map(({ key, label, prompt }) => (
          <div key={key} className="grid grid-cols-[120px_1fr] gap-2 items-start">
            <span className="text-xs font-bold text-teal-700 pt-2">{label}:</span>
            <TextAreaField value={review[key]} onChange={(v) => onReview(key, v)} placeholder={prompt} rows={2} />
          </div>
        ))}
      </div>
    </PlannerCard>
  </div>
);
'@

Set-Content "src/features/month/MonthPage.jsx" @'
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
'@

Write-Host "Year + Month features written successfully!" -ForegroundColor Green