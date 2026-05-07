import { PlannerCard } from '../../components/cards/PlannerCard';
import { ScheduleTable } from '../../components/tables/ScheduleTable';

export const HourlySchedule = ({ schedule, onUpdate }) => (
  <PlannerCard title="24-Hour Schedule" subtitle="Design every hour with explicit block intent">
    <ScheduleTable schedule={schedule} onUpdate={onUpdate} />
  </PlannerCard>
);
