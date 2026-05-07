import { TextAreaField } from '../../components/forms/TextAreaField';
import { PlannerCard } from '../../components/cards/PlannerCard';

export const IdentityStatement = ({ value, onChange }) => (
  <PlannerCard title="Identity Statement" subtitle="Who am I becoming this year?">
    <TextAreaField
      value={value}
      onChange={onChange}
      placeholder="I am becoming a person who..."
      rows={3}
    />
  </PlannerCard>
);
