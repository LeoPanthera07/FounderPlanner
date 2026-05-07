import { useState } from 'react';
import { PlannerCard } from '../../components/cards/PlannerCard';

export const NotThisYearList = ({ items, onAdd, onRemove }) => {
  const [input, setInput] = useState('');
  const handleAdd = () => {
    if (input.trim()) { onAdd(input.trim()); setInput(''); }
  };
  return (
    <PlannerCard title="Not-This-Year List" subtitle="Goals intentionally parked">
      <div className="flex gap-2 mb-3">
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && handleAdd()}
          placeholder="Add a parked goal..."
          className="flex-1 px-3 py-2 text-sm border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
        />
        <button
          onClick={handleAdd}
          className="px-4 py-2 bg-[#1e3a5f] text-white text-sm font-semibold rounded-lg hover:bg-[#16304f] transition"
        >
          Park it
        </button>
      </div>
      <ul className="flex flex-col gap-1">
        {items.map((item, i) => (
          <li key={i} className="flex items-center justify-between px-3 py-2 bg-slate-50 rounded-lg border border-slate-100">
            <span className="text-sm text-slate-600">🚫 {item}</span>
            <button onClick={() => onRemove(i)} className="text-xs text-red-400 hover:text-red-600 transition">remove</button>
          </li>
        ))}
      </ul>
    </PlannerCard>
  );
};
