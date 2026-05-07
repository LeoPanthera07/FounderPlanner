import { BLOCK_MODES, BLOCK_MODE_COLORS } from '../../utils/bucketUtils';

export const ScheduleTable = ({ schedule, onUpdate }) => (
  <div className="overflow-x-auto">
    <table className="w-full text-xs border-collapse">
      <thead>
        <tr className="bg-[#1e3a5f] text-white">
          {['Time','Mode','Block Name / Focus','Exact Intent','Energy'].map(h => (
            <th key={h} className="text-left px-3 py-2 font-semibold">{h}</th>
          ))}
        </tr>
      </thead>
      <tbody>
        {schedule.map((slot, i) => (
          <tr key={i} className={i % 2 === 0 ? 'bg-white' : 'bg-slate-50'}>
            <td className="px-3 py-1 font-mono text-slate-400 whitespace-nowrap">{slot.time}</td>
            <td className="px-1 py-1">
              <select
                value={slot.mode || ''}
                onChange={(e) => onUpdate(i, 'mode', e.target.value)}
                className={`text-xs px-1.5 py-0.5 rounded font-semibold border-0 focus:outline-none focus:ring-1 focus:ring-blue-400 ${BLOCK_MODE_COLORS[slot.mode] || 'bg-slate-100 text-slate-600'}`}
              >
                {BLOCK_MODES.map(m => <option key={m}>{m}</option>)}
              </select>
            </td>
            {['blockName','intent','energy'].map(f => (
              <td key={f} className="px-1 py-1">
                <input
                  value={slot[f] || ''}
                  onChange={(e) => onUpdate(i, f, e.target.value)}
                  className="w-full px-2 py-0.5 text-xs border border-slate-200 rounded bg-white focus:outline-none focus:ring-1 focus:ring-blue-400"
                />
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  </div>
);
