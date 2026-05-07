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
