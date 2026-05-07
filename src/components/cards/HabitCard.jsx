import { getBucketColor } from '../../utils/bucketUtils';

export const HabitCard = ({ habit, completed, streak, onToggle }) => {
  const color = getBucketColor(habit.bucket);
  return (
    <div className={`flex items-center gap-3 p-3 rounded-xl border ${completed ? 'border-green-200 bg-green-50' : 'border-slate-200 bg-white'} transition-all`}>
      <button
        onClick={onToggle}
        className={`w-8 h-8 rounded-full flex-shrink-0 border-2 flex items-center justify-center transition-all ${completed ? 'bg-green-500 border-green-500 text-white' : 'border-slate-300 text-transparent hover:border-green-400'}`}
      >
        ✓
      </button>
      <div className="flex-1 min-w-0">
        <p className={`text-sm font-semibold ${completed ? 'line-through text-slate-400' : 'text-slate-800'}`}>{habit.name}</p>
        <p className="text-xs text-slate-400">{habit.minimum}</p>
      </div>
      <div className="flex items-center gap-2">
        {streak > 0 && (
          <span className="text-xs font-bold text-orange-500">🔥 {streak}</span>
        )}
        <span className={`text-xs px-2 py-0.5 rounded-full font-semibold ${color.bg} ${color.text}`}>{habit.bucket}</span>
      </div>
    </div>
  );
};
