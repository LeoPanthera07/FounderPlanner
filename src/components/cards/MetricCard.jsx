export const MetricCard = ({ label, value, target, unit = '', color = 'blue' }) => {
  const pct = target ? Math.min(100, Math.round((Number(value) / Number(target)) * 100)) : 0;
  const colors = {
    blue:  { bar: 'bg-blue-500',  bg: 'bg-blue-50',  text: 'text-blue-700'  },
    teal:  { bar: 'bg-teal-500',  bg: 'bg-teal-50',  text: 'text-teal-700'  },
    amber: { bar: 'bg-amber-500', bg: 'bg-amber-50', text: 'text-amber-700' },
    green: { bar: 'bg-green-500', bg: 'bg-green-50', text: 'text-green-700' },
  };
  const c = colors[color] || colors.blue;
  return (
    <div className={`rounded-xl p-4 ${c.bg} border border-slate-100`}>
      <p className="text-xs font-semibold text-slate-500 uppercase tracking-wide mb-1">{label}</p>
      <p className={`text-2xl font-bold ${c.text}`}>{value ?? '—'}<span className="text-sm font-normal ml-1">{unit}</span></p>
      {target && (
        <>
          <div className="mt-2 h-1.5 bg-slate-200 rounded-full overflow-hidden">
            <div className={`h-full ${c.bar} rounded-full transition-all`} style={{ width: `${pct}%` }} />
          </div>
          <p className="text-xs text-slate-400 mt-1">{pct}% of {target}{unit} target</p>
        </>
      )}
    </div>
  );
};
