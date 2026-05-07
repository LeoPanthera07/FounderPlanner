import { PlannerCard } from '../../components/cards/PlannerCard';

export const HabitFloor = ({ habitFloor, onUpdate }) => (
  <PlannerCard title="Habit Floor" subtitle="Non-negotiables even on bad days" headerColor="bg-[#2a9d8f]">
    <div className="overflow-x-auto">
      <table className="w-full text-xs border-collapse">
        <thead>
          <tr className="bg-[#2a9d8f] text-white">
            {['Habit','Minimum Standard','Track Via'].map(h => (
              <th key={h} className="text-left px-3 py-2 font-semibold">{h}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {habitFloor.map((h, i) => (
            <tr key={i} className={i % 2 === 0 ? 'bg-white' : 'bg-slate-50'}>
              {['habit','minimum','trackVia'].map(f => (
                <td key={f} className="px-1 py-1">
                  <input
                    value={h[f] || ''}
                    onChange={(e) => onUpdate(i, f, e.target.value)}
                    className="w-full px-2 py-1 text-xs border border-slate-200 rounded bg-white focus:outline-none focus:ring-1 focus:ring-teal-400"
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
