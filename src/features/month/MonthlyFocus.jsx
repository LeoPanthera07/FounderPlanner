import { PlannerCard } from '../../components/cards/PlannerCard';
import { TextAreaField } from '../../components/forms/TextAreaField';
import { getBucketColor } from '../../utils/bucketUtils';

export const MonthlyFocus = ({ bottleneck, monthlyFocus, onBottleneck, onUpdate }) => (
  <div className="flex flex-col gap-4">
    <PlannerCard title="Monthly Bottleneck" headerColor="bg-amber-600">
      <TextAreaField
        value={bottleneck}
        onChange={onBottleneck}
        placeholder="The single hardest thing that would make this month feel stuck..."
        rows={2}
      />
    </PlannerCard>
    <PlannerCard title="Monthly Focus" subtitle="3 outcomes max: Build · Learn · Live">
      <div className="overflow-x-auto">
        <table className="w-full text-xs border-collapse">
          <thead>
            <tr className="bg-[#1e3a5f] text-white">
              {['Bucket','Monthly Outcome','Owner / System','Deadline','Done Looks Like'].map(h => (
                <th key={h} className="text-left px-3 py-2 font-semibold">{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {monthlyFocus.map((row, i) => {
              const c = getBucketColor(row.bucket);
              return (
                <tr key={i} className={i % 2 === 0 ? 'bg-white' : 'bg-slate-50'}>
                  <td className="px-2 py-1">
                    <span className={`text-xs px-2 py-0.5 rounded-full font-semibold ${c.bg} ${c.text}`}>{row.bucket}</span>
                  </td>
                  {['outcome','owner','deadline','doneLooksLike'].map(f => (
                    <td key={f} className="px-1 py-1">
                      <input
                        type={f === 'deadline' ? 'date' : 'text'}
                        value={row[f] || ''}
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
