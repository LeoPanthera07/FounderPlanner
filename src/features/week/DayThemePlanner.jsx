import { PlannerCard } from '../../components/cards/PlannerCard';

export const DayThemePlanner = ({ dayThemes, onUpdate }) => (
  <PlannerCard title="Day-Theme Planner" subtitle="One theme per day">
    <div className="overflow-x-auto">
      <table className="w-full text-xs border-collapse">
        <thead>
          <tr className="bg-[#1e3a5f] text-white">
            {['Day','Theme','Key Focus Block','Secondary Block','Non-Negotiable'].map(h => (
              <th key={h} className="text-left px-3 py-2 font-semibold">{h}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {dayThemes.map((d, i) => (
            <tr key={i} className={i % 2 === 0 ? 'bg-white' : 'bg-slate-50'}>
              <td className="px-3 py-1.5 font-semibold text-slate-600 whitespace-nowrap">{d.day}</td>
              {['theme','keyBlock','secondaryBlock','nonNegotiable'].map(f => (
                <td key={f} className="px-1 py-1">
                  <input
                    value={d[f] || ''}
                    onChange={(e) => onUpdate(i, f, e.target.value)}
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
