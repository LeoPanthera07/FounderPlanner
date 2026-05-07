const DAYS = ['mon','tue','wed','thu','fri','sat','sun'];

export const ScorecardTable = ({ scorecard, onUpdate }) => (
  <div className="overflow-x-auto">
    <table className="w-full text-xs border-collapse">
      <thead>
        <tr className="bg-[#1e3a5f] text-white">
          <th className="text-left px-3 py-2 font-semibold">Metric</th>
          <th className="px-2 py-2">Target</th>
          {DAYS.map(d => <th key={d} className="px-2 py-2 capitalize">{d.charAt(0).toUpperCase()+d.slice(1)}</th>)}
          <th className="px-2 py-2">Total</th>
          <th className="px-2 py-2">Hit?</th>
        </tr>
      </thead>
      <tbody>
        {Object.entries(scorecard).map(([metric, data], i) => {
          const total = DAYS.reduce((s, d) => s + (Number(data[d]) || 0), 0);
          const hit = total >= Number(data.target);
          return (
            <tr key={metric} className={i % 2 === 0 ? 'bg-white' : 'bg-slate-50'}>
              <td className="px-3 py-1.5 font-medium text-slate-700 capitalize">{metric.replace(/([A-Z])/g,' $1')}</td>
              <td className="px-2 py-1.5 text-center text-slate-500">{data.target}</td>
              {DAYS.map(d => (
                <td key={d} className="px-1 py-1">
                  <input
                    type="number"
                    value={data[d] || ''}
                    onChange={(e) => onUpdate(metric, d, e.target.value)}
                    className="w-10 text-center text-xs border border-slate-200 rounded px-1 py-0.5 focus:outline-none focus:ring-1 focus:ring-blue-400"
                  />
                </td>
              ))}
              <td className="px-2 py-1.5 text-center font-bold text-slate-700">{total}</td>
              <td className="px-2 py-1.5 text-center">{hit ? '✅' : '❌'}</td>
            </tr>
          );
        })}
      </tbody>
    </table>
  </div>
);
