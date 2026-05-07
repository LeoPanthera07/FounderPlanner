import { PlannerCard } from '../../components/cards/PlannerCard';
import { TextAreaField } from '../../components/forms/TextAreaField';

const STATUS_COLORS = { done: 'bg-green-100 text-green-700', pending: 'bg-amber-100 text-amber-700', '': 'bg-slate-100 text-slate-500' };

export const LifeAdminCalendar = ({ lifeAdmin, monthlyAdventure, onUpdate, onAdventure }) => (
  <div className="flex flex-col gap-4">
    <PlannerCard title="Life Admin & Calendar" subtitle="Clear before filling task list">
      <div className="overflow-x-auto">
        <table className="w-full text-xs border-collapse">
          <thead>
            <tr className="bg-[#2a9d8f] text-white">
              {['Item Type','Detail','Date / Deadline','Status'].map(h => (
                <th key={h} className="text-left px-3 py-2 font-semibold">{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {lifeAdmin.map((row, i) => (
              <tr key={i} className={i % 2 === 0 ? 'bg-white' : 'bg-slate-50'}>
                <td className="px-3 py-1.5 font-medium text-slate-600 whitespace-nowrap">{row.type}</td>
                {['detail','date','status'].map(f => (
                  <td key={f} className="px-1 py-1">
                    {f === 'status' ? (
                      <select
                        value={row[f] || ''}
                        onChange={(e) => onUpdate(i, f, e.target.value)}
                        className={`px-2 py-0.5 text-xs rounded font-semibold border-0 focus:outline-none ${STATUS_COLORS[row[f]] || STATUS_COLORS['']}`}
                      >
                        {['','pending','done'].map(s => <option key={s} value={s}>{s || '—'}</option>)}
                      </select>
                    ) : (
                      <input
                        type={f === 'date' ? 'date' : 'text'}
                        value={row[f] || ''}
                        onChange={(e) => onUpdate(i, f, e.target.value)}
                        className="w-full px-2 py-1 text-xs border border-slate-200 rounded bg-white focus:outline-none focus:ring-1 focus:ring-teal-400"
                      />
                    )}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </PlannerCard>
    <PlannerCard title="Monthly Adventure or Reward" headerColor="bg-green-700">
      <TextAreaField value={monthlyAdventure} onChange={onAdventure} placeholder="What's the reward or adventure this month?" rows={2} />
    </PlannerCard>
  </div>
);
