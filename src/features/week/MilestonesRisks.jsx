import { PlannerCard } from '../../components/cards/PlannerCard';
import { MilestoneTable } from '../../components/tables/MilestoneTable';

export const MilestonesRisks = ({ milestones, onUpdate }) => (
  <PlannerCard title="Milestones & Risks">
    <MilestoneTable milestones={milestones} onUpdate={onUpdate} />
  </PlannerCard>
);
