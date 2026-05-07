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
