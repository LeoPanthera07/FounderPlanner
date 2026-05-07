import { MetricCard as BaseCard } from '../../components/cards/MetricCard';

export const MetricCard = ({ metric, value, onLog }) => (
  <div className="flex flex-col gap-2">
    <BaseCard label={metric.name} value={value} target={metric.target} unit={metric.unit || ''} color={metric.color || 'blue'} />
    <div className="flex gap-2">
      <input type="number" placeholder="Log today's value..."
        className="flex-1 px-3 py-1.5 text-sm border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
        onKeyDown={(e) => { if (e.key === 'Enter') { onLog(Number(e.target.value)); e.target.value = ''; }}} />
      <button onClick={(e) => { const inp = e.target.previousSibling; onLog(Number(inp.value)); inp.value = ''; }}
        className="px-3 py-1.5 bg-[#1e3a5f] text-white text-xs font-semibold rounded-lg hover:bg-[#16304f] transition">Log</button>
    </div>
  </div>
);
