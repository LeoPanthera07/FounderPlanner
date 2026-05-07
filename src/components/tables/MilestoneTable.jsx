export const MilestoneTable = ({ milestones, onUpdate }) => (
  <div className="overflow-x-auto">
    <table className="w-full text-xs border-collapse">
      <thead>
        <tr className="bg-[#1e3a5f] text-white">
          {['Week','Main Milestone','Risk','Prevention Strategy','Checkpoint'].map(h => (
            <th key={h} className="text-left px-3 py-2 font-semibold">{h}</th>
          ))}
        </tr>
      </thead>
      <tbody>
        {milestones.map((m, i) => (
          <tr key={i} className={i % 2 === 0 ? 'bg-white' : 'bg-slate-50'}>
            <td className="px-3 py-1.5 font-semibold text-slate-600 whitespace-nowrap">{m.week}</td>
            {['milestone','risk','prevention','checkpoint'].map(f => (
              <td key={f} className="px-1 py-1">
                <input
                  value={m[f] || ''}
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
);
