import { PlannerCard } from '../../components/cards/PlannerCard';
import { TextAreaField } from '../../components/forms/TextAreaField';

const PROMPTS = [
  { key: 'momentum',         label: 'Momentum',          color: 'text-blue-700',  prompt: 'What created real forward motion today?' },
  { key: 'energyDrain',      label: 'Energy Drain',      color: 'text-red-600',   prompt: 'What consumed attention without creating output?' },
  { key: 'peakMoment',       label: 'Peak Moment',       color: 'text-green-700', prompt: 'One thing that went exceptionally well.' },
  { key: 'tomorrowFirstMove',label: "Tomorrow's First Move", color: 'text-amber-700', prompt: 'The very first action to take when I wake up.' },
];

export const EndOfDayReflection = ({ reflection, onUpdate }) => (
  <PlannerCard title="End-of-Day Reflection" headerColor="bg-indigo-700">
    <div className="flex flex-col gap-3">
      {PROMPTS.map(({ key, label, color, prompt }) => (
        <div key={key} className="grid grid-cols-[150px_1fr] gap-2 items-start">
          <span className={`text-xs font-bold pt-2 ${color}`}>{label}:</span>
          <TextAreaField value={reflection[key]} onChange={(v) => onUpdate(key, v)} placeholder={prompt} rows={2} />
        </div>
      ))}
    </div>
  </PlannerCard>
);
