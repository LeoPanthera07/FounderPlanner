import { HabitStreak } from './HabitStreak';
import { getBucketColor } from '../../utils/bucketUtils';

export const HabitCard = ({ habit, completed, onToggle, onDelete }) => {
  const color = getBucketColor(habit.bucket);
  return (
    <div className={`rounded-xl border p-4 transition-all ${completed ? 'border-green-200 bg-green-50' : 'border-slate-200 bg-white'}`}>
      <div className="flex items-start gap-3">
        <button onClick={onToggle}
          className={`w-9 h-9 rounded-full flex-shrink-0 border-2 flex items-center justify-center text-lg transition-all mt-0.5
            ${completed ? 'bg-green-500 border-green-500 text-white' : 'border-slate-300 text-transparent hover:border-green-400'}`}>
          ✓
        </button>
        <div className="flex-1 min-w-0">
          <div className="flex items-center justify-between gap-2 flex-wrap">
            <p className={`text-sm font-semibold ${completed ? 'line-through text-slate-400' : 'text-slate-800'}`}>{habit.name}</p>
            <div className="flex items-center gap-2">
              <span className={`text-xs px-2 py-0.5 rounded-full font-semibold ${color.bg} ${color.text}`}>{habit.bucket}</span>
              <button onClick={onDelete} className="text-xs text-slate-300 hover:text-red-400 transition">✕</button>
            </div>
          </div>
          <p className="text-xs text-slate-400 mt-0.5">{habit.minimum}</p>
          <div className="mt-2">
            <HabitStreak habitId={habit.id} />
          </div>
        </div>
      </div>
    </div>
  );
};
