import { useState } from 'react';
import { PlannerCard } from '../../components/cards/PlannerCard';

export const MeetingBudget = ({ meetings, onAdd, onRemove }) => {
  const [form, setForm] = useState({ meeting: '', dayTime: '', duration: '', outcome: '', async: 'No' });
  const handleAdd = () => {
    if (form.meeting.trim()) { onAdd(form); setForm({ meeting: '', dayTime: '', duration: '', outcome: '', async: 'No' }); }
  };
  return (
    <PlannerCard title="Meeting Budget" subtitle="All meetings for the week at a glance">
      <div className="overflow-x-auto mb-3">
        <table className="w-full text-xs border-collapse">
          <thead>
            <tr className="bg-[#1e3a5f] text-white">
              {['Meeting / Call','Day & Time','Duration','Outcome Required','Async Instead?',''].map(h => (
                <th key={h} className="text-left px-3 py-2 font-semibold">{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {meetings.map((m, i) => (
              <tr key={i} className={i % 2 === 0 ? 'bg-white' : 'bg-slate-50'}>
                <td className="px-3 py-1.5 text-slate-700">{m.meeting}</td>
                <td className="px-3 py-1.5 text-slate-500">{m.dayTime}</td>
                <td className="px-3 py-1.5 text-slate-500">{m.duration}</td>
                <td className="px-3 py-1.5 text-slate-500">{m.outcome}</td>
                <td className="px-3 py-1.5">
                  <span className={`px-2 py-0.5 rounded-full text-xs font-semibold ${m.async === 'Yes' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-600'}`}>{m.async}</span>
                </td>
                <td className="px-2 py-1">
                  <button onClick={() => onRemove(i)} className="text-red-400 hover:text-red-600 text-xs">✕</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="grid grid-cols-2 md:grid-cols-5 gap-2">
        {[
          { key: 'meeting',  ph: 'Meeting / Call' },
          { key: 'dayTime',  ph: 'Day & Time'     },
          { key: 'duration', ph: 'Duration'        },
          { key: 'outcome',  ph: 'Outcome'         },
        ].map(({ key, ph }) => (
          <input key={key} value={form[key]} onChange={(e) => setForm({ ...form, [key]: e.target.value })}
            placeholder={ph} className="px-2 py-1.5 text-xs border border-slate-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-blue-400" />
        ))}
        <select value={form.async} onChange={(e) => setForm({ ...form, async: e.target.value })}
          className="px-2 py-1.5 text-xs border border-slate-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-blue-400">
          <option>No</option><option>Yes</option>
        </select>
        <button onClick={handleAdd} className="col-span-2 md:col-span-1 px-3 py-1.5 bg-[#1e3a5f] text-white text-xs font-semibold rounded-lg hover:bg-[#16304f] transition">
          + Add
        </button>
      </div>
    </PlannerCard>
  );
};
