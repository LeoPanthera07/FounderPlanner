import { PlannerCard } from '../../components/cards/PlannerCard';

export const DailyRoutineChecklist = ({ routines, onToggle, onUpdate }) => (
  <PlannerCard title="Daily Routine Checklist" headerColor="bg-[#2a9d8f]">
    <div className="overflow-x-auto">
      <table className="w-full text-xs border-collapse">
        <thead>
          <tr className="bg-[#2a9d8f] text-white">
            {['Routine','Target Time','Done?','Quality (1-5)','Notes'].map(h => (
              <th key={h} className="text-left px-3 py-2 font-semibold">{h}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {routines.map((r, i) => (
            <tr key={i} className={`${r.done ? 'bg-green-50' : i % 2 === 0 ? 'bg-white' : 'bg-slate-50'} transition-colors`}>
              <td className={`px-3 py-1.5 font-medium ${r.done ? 'line-through text-slate-400' : 'text-slate-700'}`}>{r.name}</td>
              <td className="px-3 py-1.5 text-slate-400 font-mono whitespace-nowrap">{r.targetTime}</td>
              <td className="px-3 py-1.5 text-center">
                <input type="checkbox" checked={!!r.done} onChange={() => onToggle(i)}
                  className="w-4 h-4 rounded border-slate-300 text-green-500" />
              </td>
              <td className="px-1 py-1">
                <select value={r.quality || 0} onChange={(e) => onUpdate(i, 'quality', Number(e.target.value))}
                  className="w-14 text-center text-xs border border-slate-200 rounded px-1 py-0.5 focus:outline-none focus:ring-1 focus:ring-teal-400">
                  {[0,1,2,3,4,5].map(n => <option key={n}>{n}</option>)}
                </select>
              </td>
              <td className="px-1 py-1">
                <input value={r.notes || ''} onChange={(e) => onUpdate(i, 'notes', e.target.value)}
                  placeholder="Notes..." className="w-full px-2 py-0.5 text-xs border border-slate-200 rounded bg-white focus:outline-none focus:ring-1 focus:ring-teal-400" />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  </PlannerCard>
);
