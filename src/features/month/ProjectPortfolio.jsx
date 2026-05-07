import { PlannerCard } from '../../components/cards/PlannerCard';

export const ProjectPortfolio = ({ projects, onUpdate }) => (
  <PlannerCard title="Annual Project Portfolio" subtitle="3 max">
    <div className="overflow-x-auto">
      <table className="w-full text-xs border-collapse">
        <thead>
          <tr className="bg-[#1e3a5f] text-white">
            {['Project','Q1 Milestone','Q2 Milestone','Q3 Milestone','Q4 Milestone'].map(h => (
              <th key={h} className="text-left px-3 py-2 font-semibold">{h}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {projects.map((p, i) => (
            <tr key={i} className={i % 2 === 0 ? 'bg-white' : 'bg-slate-50'}>
              {['name','q1','q2','q3','q4'].map(f => (
                <td key={f} className="px-1 py-1">
                  <input
                    value={p[f] || ''}
                    onChange={(e) => onUpdate(i, f, e.target.value)}
                    placeholder={f === 'name' ? `Project ${i+1}` : ''}
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
