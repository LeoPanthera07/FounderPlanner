import { useEffect, useState } from 'react';
import { useHabitsStore } from './habitsStore';
import { HabitCard } from './HabitCard';
import { PlannerCard } from '../../components/cards/PlannerCard';
import { BUCKETS } from '../../utils/bucketUtils';
import { getTodayString } from '../../utils/dateUtils';

const EMPTY_FORM = { name: '', minimum: '', trackVia: '', bucket: 'Live' };

export const HabitsPage = () => {
  const { habits, todayLogs, loadHabits, loadTodayLogs, addHabit, toggleHabitLog, deleteHabit } = useHabitsStore();
  const [form, setForm] = useState(EMPTY_FORM);
  const [showForm, setShowForm] = useState(false);

  useEffect(() => {
    loadHabits();
    loadTodayLogs();
  }, []);

  const handleAdd = async () => {
    if (!form.name.trim()) return;
    await addHabit(form);
    setForm(EMPTY_FORM);
    setShowForm(false);
  };

  const completedToday = habits.filter(h => todayLogs[h.id]?.completed).length;

  return (
    <div className="max-w-3xl mx-auto px-4 py-6 flex flex-col gap-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-[#1e3a5f]">Habits</h1>
          <p className="text-sm text-slate-400">Daily non-negotiables · {getTodayString()}</p>
        </div>
        <div className="flex items-center gap-3">
          <div className="text-center">
            <p className="text-2xl font-bold text-green-600">{completedToday}<span className="text-slate-300 font-normal">/{habits.length}</span></p>
            <p className="text-xs text-slate-400">today</p>
          </div>
          <button onClick={() => setShowForm(!showForm)}
            className="px-4 py-2 bg-[#1e3a5f] text-white text-sm font-semibold rounded-lg hover:bg-[#16304f] transition">
            {showForm ? 'Cancel' : '+ New Habit'}
          </button>
        </div>
      </div>

      {showForm && (
        <PlannerCard title="Add New Habit" headerColor="bg-[#2a9d8f]">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            <input value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })}
              placeholder="Habit name" className="px-3 py-2 text-sm border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-400" />
            <input value={form.minimum} onChange={(e) => setForm({ ...form, minimum: e.target.value })}
              placeholder="Minimum standard" className="px-3 py-2 text-sm border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-400" />
            <input value={form.trackVia} onChange={(e) => setForm({ ...form, trackVia: e.target.value })}
              placeholder="Track via (e.g. App, Log)" className="px-3 py-2 text-sm border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-400" />
            <select value={form.bucket} onChange={(e) => setForm({ ...form, bucket: e.target.value })}
              className="px-3 py-2 text-sm border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-400">
              {BUCKETS.map(b => <option key={b}>{b}</option>)}
            </select>
          </div>
          <button onClick={handleAdd}
            className="mt-3 w-full py-2 bg-[#2a9d8f] text-white text-sm font-semibold rounded-lg hover:bg-[#238a7d] transition">
            Add Habit
          </button>
        </PlannerCard>
      )}

      <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden">
        <div className="h-full bg-green-500 rounded-full transition-all duration-500"
          style={{ width: habits.length ? `${(completedToday / habits.length) * 100}%` : '0%' }} />
      </div>

      {habits.length === 0 ? (
        <div className="text-center py-16 text-slate-400">
          <p className="text-4xl mb-3">🌱</p>
          <p className="font-semibold">No habits yet</p>
          <p className="text-sm">Add your first non-negotiable habit above</p>
        </div>
      ) : (
        <div className="flex flex-col gap-3">
          {habits.map(habit => (
            <HabitCard
              key={habit.id}
              habit={habit}
              completed={!!todayLogs[habit.id]?.completed}
              onToggle={() => toggleHabitLog(habit.id)}
              onDelete={() => deleteHabit(habit.id)}
            />
          ))}
        </div>
      )}
    </div>
  );
};
