import { PlannerCard } from '../../components/cards/PlannerCard';
import { DeepWorkTable } from '../../components/tables/DeepWorkTable';

export const DeepWorkBlocks = ({ blocks, onUpdate }) => (
  <PlannerCard title="Deep-Work Block Design" subtitle="Schedule before the week starts" headerColor="bg-[#2a9d8f]">
    <DeepWorkTable blocks={blocks} onUpdate={onUpdate} />
  </PlannerCard>
);
