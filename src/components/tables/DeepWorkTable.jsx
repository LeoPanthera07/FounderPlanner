import { InputField } from '../forms/InputField';

export const DeepWorkTable = ({ blocks, onUpdate }) => (
  <div className="overflow-x-auto">
    <table className="w-full text-xs border-collapse">
      <thead>
        <tr className="bg-[#2a9d8f] text-white">
          {['Block','Day / Time','Project / Task','Exact Outcome to Ship','Distraction Mitigation'].map(h => (
            <th key={h} className="text-left px-3 py-2 font-semibold">{h}</th>
          ))}
        </tr>
      </thead>
      <tbody>
        {blocks.map((b, i) => (
          <tr key={i} className={i % 2 === 0 ? 'bg-white' : 'bg-slate-50'}>
            <td className="px-3 py-1.5 font-semibold text-slate-600 whitespace-nowrap">{b.block}</td>
            {['dayTime','task','outcome','distraction'].map(f => (
              <td key={f} className="px-1 py-1">
                <input
                  value={b[f] || ''}
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
);
