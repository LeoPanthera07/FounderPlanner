import { useState } from 'react';
import { PlannerCard } from '../../components/cards/PlannerCard';
import { CARRY_DECISIONS } from '../../utils/bucketUtils';

const DECISION_COLORS = {
  carry:    'bg-blue-100 text-blue-700',
  delete:   'bg-red-100 text-red-600',
  delegate: 'bg-purple-100 text-purple-700',
  defer:    'bg-amber-100 text-amber-700',
  '':       'bg-slate-100 text-slate-500',
};

export const ShutdownDecision = ({ items, onAdd, onUpdate, onRemove }) => {
  const [input, setInput] = useState('');
  return (
    <PlannerCard title="Shutdown Decision" subtitle="Carry · Delete · Delegate · Defer each open item" headerColor="bg-red-700">
      <div className="flex gap-2 mb-3">
        <input value={input} onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => { if (e.key === 'Enter' && input.trim()) { onAdd({ task: input.trim(), bucket: 'Build', decision: '', carryDate: '' }); setInput(''); }}}
          placeholder="Add open item..."
          className="flex-1 px-3 py-2 text-sm border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-300" />
        <button onClick={() => { if (input.trim()) { onAdd({ task: input.trim(), bucket: 'Build', decision: '', carryDate: '' }); setInput(''); }}}
          className="px-4 py-2 bg-red-600 text-white text-sm font-semibold rounded-lg hover:bg-red-700 transition">Add</button>
      </div>
      <div className="flex flex-col gap-2">
        {items.map((item, i) => (
          <div key={i} className="flex items-center gap-2 p-2 rounded-lg border border-slate-100 bg-slate-50">
            <span className="flex-1 text-sm text-slate-700">{item.task}</span>
            <select value={item.decision || ''} onChange={(e) => onUpdate(i, 'decision', e.target.value)}
              className={`text-xs px-2 py-1 rounded font-semibold border-0 focus:outline-none ${DECISION_COLORS[item.decision] || DECISION_COLORS['']}`}>
              <option value="">Decide...</option>
              {CARRY_DECISIONS.map(d => <option key={d}>{d}</option>)}
            </select>
            {item.decision === 'carry' && (
              <input type="date" value={item.carryDate || ''} onChange={(e) => onUpdate(i, 'carryDate', e.target.value)}
                className="px-2 py-1 text-xs border border-slate-200 rounded focus:outline-none focus:ring-1 focus:ring-blue-400" />
            )}
            <button onClick={() => onRemove(i)} className="text-red-400 hover:text-red-600 text-xs">✕</button>
          </div>
        ))}
      </div>
    </PlannerCard>
  );
};
