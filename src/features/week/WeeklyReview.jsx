import { PlannerCard } from '../../components/cards/PlannerCard';
import { TextAreaField } from '../../components/forms/TextAreaField';

const PROMPTS = [
  { key: 'weeklyWin',    label: 'Weekly Win',    prompt: 'What is the one result that made this week count?' },
  { key: 'antiDrift',    label: 'Anti-Drift',    prompt: 'Were hours spent or invested? What was the ratio?' },
  { key: 'carryForward', label: 'Carry-Forward', prompt: 'What must move to next week, and why?' },
];

export const WeeklyReview = ({ review, onUpdate }) => (
  <PlannerCard title="Weekly Review Prompts" headerColor="bg-[#2a9d8f]">
    <div className="flex flex-col gap-3">
      {PROMPTS.map(({ key, label, prompt }) => (
        <div key={key} className="grid grid-cols-[130px_1fr] gap-2 items-start">
          <span className="text-xs font-bold text-teal-700 pt-2">{label}:</span>
          <TextAreaField value={review[key]} onChange={(v) => onUpdate(key, v)} placeholder={prompt} rows={2} />
        </div>
      ))}
    </div>
  </PlannerCard>
);
