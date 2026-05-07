import { InputField } from '../../components/forms/InputField';
import { PlannerCard } from '../../components/cards/PlannerCard';

const AREAS = ['career','health','money','lifestyle','relationships'];

export const AnnualTargets = ({ targets, onChange }) => (
  <PlannerCard title="Annual Targets">
    <div className="overflow-x-auto">
      <table className="w-full text-xs border-collapse">
        <thead>
          <tr className="bg-[#1e3a5f] text-white">
            {['Area','Target (measurable)','Why it matters','Evidence by Dec 31'].map(h => (
              <th key={h} className="text-left px-3 py-2 font-semibold">{h}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {AREAS.map((area, i) => (
            <tr key={area} className={i % 2 === 0 ? 'bg-white' : 'bg-slate-50'}>
              <td className="px-3 py-2 font-semibold text-slate-600 capitalize whitespace-nowrap">{area}</td>
              {['target','why','evidence'].map(f => (
                <td key={f} className="px-1 py-1">
                  <input
                    value={targets[area]?.[f] || ''}
                    onChange={(e) => onChange(area, f, e.target.value)}
                    className="w-full px-2 py-1 text-xs border border-slate-200 rounded bg-white focus:outline-none focus:ring-1 focus:ring-blue-400"
                  />
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  </PlannerCard>
);
