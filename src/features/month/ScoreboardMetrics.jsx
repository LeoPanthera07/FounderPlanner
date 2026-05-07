import { PlannerCard } from '../../components/cards/PlannerCard';

export const ScoreboardMetrics = ({ scoreboard, onUpdate }) => (
  <PlannerCard title="Scoreboard Metrics">
    <div className="overflow-x-auto">
      <table className="w-full text-xs border-collapse">
        <thead>
          <tr className="bg-[#1e3a5f] text-white">
            {['Metric','Weekly Target','Monthly Target','Track Method'].map(h => (
              <th key={h} className="text-left px-3 py-2 font-semibold">{h}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {scoreboard.map((row, i) => (
            <tr key={i} className={i % 2 === 0 ? 'bg-white' : 'bg-slate-50'}>
              {['metric','weeklyTarget','monthlyTarget','trackMethod'].map(f => (
                <td key={f} className="px-1 py-1">
                  <input
                    value={row[f] || ''}
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
