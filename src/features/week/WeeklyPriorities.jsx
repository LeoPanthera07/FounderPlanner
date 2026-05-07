import { PlannerCard } from '../../components/cards/PlannerCard';
import { getBucketColor } from '../../utils/bucketUtils';

export const WeeklyPriorities = ({ weeklyWin, priorities, onWin, onUpdate }) => (
  <div className="flex flex-col gap-4">
    <PlannerCard title="Weekly Win" headerColor="bg-green-700">
      <input
        value={weeklyWin || ''}
        onChange={(e) => onWin(e.target.value)}
        placeholder="The one result that would make this week count..."
        className="w-full px-3 py-2 text-sm border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-400"
      />
    </PlannerCard>
    <PlannerCard title="Top 3 Priorities" subtitle="Pick 3 — everything else is optional">
      <div className="overflow-x-auto">
        <table className="w-full text-xs border-collapse">
          <thead>
            <tr className="bg-[#1e3a5f] text-white">
              {['#','Bucket','Priority','Done Looks Like','Time Needed'].map(h => (
                <th key={h} className="text-left px-3 py-2 font-semibold">{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {priorities.map((p, i) => {
              const c = getBucketColor(p.bucket);
              return (
                <tr key={i} className={i % 2 === 0 ? 'bg-white' : 'bg-slate-50'}>
                  <td className="px-3 py-2 font-bold text-slate-400">{i + 1}</td>
                  <td className="px-2 py-1">
                    <span className={`text-xs px-2 py-0.5 rounded-full font-semibold ${c.bg} ${c.text}`}>{p.bucket}</span>
                  </td>
                  {['priority','doneLooksLike','timeNeeded'].map(f => (
                    <td key={f} className="px-1 py-1">
                      <input
                        value={p[f] || ''}
                        onChange={(e) => onUpdate(i, f, e.target.value)}
                        className="w-full px-2 py-1 text-xs border border-slate-200 rounded bg-white focus:outline-none focus:ring-1 focus:ring-blue-400"
                      />
                    </td>
                  ))}
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </PlannerCard>
  </div>
);
