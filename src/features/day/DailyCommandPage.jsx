import { PlannerCard } from '../../components/cards/PlannerCard';
import { InputField } from '../../components/forms/InputField';
import { SelectField } from '../../components/forms/SelectField';
import { ENERGY_LEVELS } from '../../utils/bucketUtils';

export const DailyCommandPage = ({ date, dayTheme, todayMattersBecause, energyForecast, onUpdate }) => (
  <PlannerCard title="Daily Command Page" subtitle={date}>
    <div className="grid grid-cols-1 md:grid-cols-3 gap-3 mb-3">
      <InputField label="Day Theme" value={dayTheme} onChange={(v) => onUpdate('dayTheme', v)} placeholder="Today's theme..." />
      <SelectField label="Energy Forecast" value={energyForecast} onChange={(v) => onUpdate('energyForecast', v)} options={ENERGY_LEVELS} />
      <div className={`flex items-center justify-center rounded-lg px-3 py-2 text-sm font-bold
        ${energyForecast === 'High' ? 'bg-green-100 text-green-700' :
          energyForecast === 'Medium' ? 'bg-amber-100 text-amber-700' : 'bg-red-100 text-red-600'}`}>
        Energy: {energyForecast}
      </div>
    </div>
    <InputField label="Today matters because..." value={todayMattersBecause}
      onChange={(v) => onUpdate('todayMattersBecause', v)} placeholder="Why does today matter?" />
  </PlannerCard>
);
