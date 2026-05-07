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
