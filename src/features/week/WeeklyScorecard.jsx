import { PlannerCard } from '../../components/cards/PlannerCard';
import { ScorecardTable } from '../../components/tables/ScorecardTable';

export const WeeklyScorecard = ({ scorecard, onUpdate }) => (
  <PlannerCard title="Weekly Scorecard">
    <ScorecardTable scorecard={scorecard} onUpdate={onUpdate} />
  </PlannerCard>
);
