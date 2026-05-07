import { PlannerCard } from '../../components/cards/PlannerCard';
import { TextAreaField } from '../../components/forms/TextAreaField';
import { StopStartContinue } from './StopStartContinue';

const PROMPTS = [
  { key: 'weeklyWin',    label: 'Weekly Win',    color: 'text-green-700',  prompt: 'What is the one result that made this week count?' },
  { key: 'antiDrift',    label: 'Anti-Drift',    color: 'text-red-600',    prompt: 'Were hours spent or invested? What was the ratio?' },
  { key: 'carryForward', label: 'Carry-Forward', color: 'text-amber-700',  prompt: 'What must move to next week, and why?' },
];

export const WeeklyReviewForm = ({ data, onUpdate }) => (
  <div className="flex flex-col gap-4">
    <PlannerCard title="Weekly Review" headerColor="bg-[#2a9d8f]">
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
