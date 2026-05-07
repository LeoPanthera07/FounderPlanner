import { InputField } from '../../components/forms/InputField';
import { PlannerCard } from '../../components/cards/PlannerCard';

export const AnnualThemes = ({ themes, onChange }) => (
  <PlannerCard title="Three Annual Themes">
    <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
      {themes.map((theme, i) => (
        <InputField
          key={i}
          label={`Theme ${i + 1}`}
          value={theme}
          onChange={(val) => onChange(i, val)}
          placeholder={`Theme ${i + 1}`}
        />
      ))}
    </div>
  </PlannerCard>
);
