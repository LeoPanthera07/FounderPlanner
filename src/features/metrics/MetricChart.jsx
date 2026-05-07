export const MetricChart = ({ logs }) => {
  if (!logs || logs.length === 0) return (
    <div className="text-center py-8 text-slate-400 text-sm">No data yet</div>
  );
  const max = Math.max(...logs.map(l => l.value), 1);
  return (
    <div className="flex items-end gap-1 h-24 px-2">
      {logs.slice(-14).map((log, i) => (
        <div key={i} className="flex-1 flex flex-col items-center gap-1">
          <div className="w-full bg-blue-500 rounded-t transition-all"
            style={{ height: `${(log.value / max) * 80}px` }} />
          <span className="text-[9px] text-slate-400 rotate-45 origin-left">{log.date?.slice(5)}</span>
        </div>
      ))}
    </div>
  );
};
