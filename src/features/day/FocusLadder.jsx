import { PlannerCard } from '../../components/cards/PlannerCard';
import { getBucketColor, BUCKETS } from '../../utils/bucketUtils';

const LADDER_ITEMS = [
  { key: 'mustWin',   label: '■ Must Win',   color: 'bg-yellow-50 border-yellow-200' },
  { key: 'shouldDo1', label: '✔ Should Do 1', color: 'bg-white border-slate-200' },
  { key: 'shouldDo2', label: '✔ Should Do 2', color: 'bg-white border-slate-200' },
  { key: 'canDo1',    label: '■ Can Do 1',    color: 'bg-slate-50 border-slate-100' },
  { key: 'canDo2',    label: '■ Can Do 2',    color: 'bg-slate-50 border-slate-100' },
  { key: 'canDo3',    label: '■ Can Do 3',    color: 'bg-slate-50 border-slate-100' },
];

export const FocusLadder = ({ focusLadder, onUpdate }) => (
  <PlannerCard title="Focus Ladder">
    <div className="flex flex-col gap-2">
      {LADDER_ITEMS.map(({ key, label, color }) => {
        const item = focusLadder[key] || {};
        const c = getBucketColor(item.bucket);
        return (
          <div key={key} className={`flex items-center gap-3 p-2 rounded-lg border ${color} ${item.done ? 'opacity-60' : ''}`}>
            <input type="checkbox" checked={!!item.done} onChange={(e) => onUpdate(key, 'done', e.target.checked)}
              className="w-4 h-4 rounded border-slate-300 text-blue-600 flex-shrink-0" />
            <span className="text-xs font-semibold text-slate-500 w-24 flex-shrink-0">{label}</span>
            <input value={item.task || ''} onChange={(e) => onUpdate(key, 'task', e.target.value)}
              placeholder="Task description..."
              className={`flex-1 px-2 py-1 text-sm border border-slate-200 rounded bg-white focus:outline-none focus:ring-1 focus:ring-blue-400 ${item.done ? 'line-through text-slate-400' : ''}`} />
            <select value={item.bucket || 'Build'} onChange={(e) => onUpdate(key, 'bucket', e.target.value)}
              className={`text-xs px-2 py-1 rounded border-0 font-semibold focus:outline-none ${c.bg} ${c.text}`}>
              {BUCKETS.map(b => <option key={b}>{b}</option>)}
            </select>
            <input value={item.timeBlock || ''} onChange={(e) => onUpdate(key, 'timeBlock', e.target.value)}
              placeholder="Time" className="w-20 px-2 py-1 text-xs border border-slate-200 rounded bg-white focus:outline-none focus:ring-1 focus:ring-blue-400" />
          </div>
        );
      })}
    </div>
  </PlannerCard>
);
