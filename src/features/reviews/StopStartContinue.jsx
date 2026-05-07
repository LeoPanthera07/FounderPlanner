import { PlannerCard } from '../../components/cards/PlannerCard';

export const StopStartContinue = ({ data, onUpdate }) => (
  <PlannerCard title="Stop · Start · Continue">
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      {[
        { type: 'stop',     label: 'STOP doing',     color: 'border-red-200 bg-red-50 text-red-700'     },
        { type: 'start',    label: 'START doing',    color: 'border-blue-200 bg-blue-50 text-blue-700'   },
        { type: 'continue', label: 'CONTINUE doing', color: 'border-green-200 bg-green-50 text-green-700' },
      ].map(({ type, label, color }) => (
        <div key={type} className={`rounded-lg border p-3 ${color}`}>
          <p className="text-xs font-bold uppercase mb-2">{label}</p>
          <textarea value={data?.[type] || ''} onChange={(e) => onUpdate(type, e.target.value)}
            rows={4} placeholder={`What to ${type}...`}
            className="w-full px-2 py-1 text-sm border border-slate-200 rounded bg-white focus:outline-none focus:ring-1 focus:ring-blue-400 resize-none" />
        </div>
      ))}
    </div>
  </PlannerCard>
);
