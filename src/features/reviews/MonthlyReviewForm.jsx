import { PlannerCard } from '../../components/cards/PlannerCard';
import { TextAreaField } from '../../components/forms/TextAreaField';
import { StopStartContinue } from './StopStartContinue';

const PROMPTS = [
  { key: 'momentum',     label: 'Momentum',      color: 'text-blue-700',   prompt: 'What created real, compounding progress this month?' },
  { key: 'lowValue',     label: 'Low Value',      color: 'text-red-600',    prompt: 'What looked productive but moved no needle?' },
  { key: 'lesson',       label: 'Lesson',         color: 'text-teal-700',   prompt: 'One insight to carry into next month.' },
  { key: 'leverage',     label: 'Leverage',       color: 'text-green-700',  prompt: 'One system, tool, or habit that amplified output.' },
  { key: 'constraint',   label: 'Constraint',     color: 'text-amber-700',  prompt: 'The single thing to remove to unlock next month.' },
  { key: 'nextPriority', label: 'Next Priority',  color: 'text-purple-700', prompt: "What becomes Month+1's first action on Day 1?" },
];

export const MonthlyReviewForm = ({ data, onUpdate }) => (
  <div className="flex flex-col gap-4">
    <PlannerCard title="Monthly Review" headerColor="bg-[#1e3a5f]">
      <div className="flex flex-col gap-3">
        {PROMPTS.map(({ key, label, color, prompt }) => (
          <div key={key} className="grid grid-cols-[140px_1fr] gap-2 items-start">
            <span className={`text-xs font-bold pt-2 ${color}`}>{label}:</span>
            <TextAreaField value={data?.[key]} onChange={(v) => onUpdate(key, v)} placeholder={prompt} rows={2} />
          </div>
        ))}
      </div>
    </PlannerCard>
    <StopStartContinue data={data?.ssc} onUpdate={(type, v) => onUpdate('ssc', { ...data?.ssc, [type]: v })} />
  </div>
);
