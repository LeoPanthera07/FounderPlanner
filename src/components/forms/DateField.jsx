export const DateField = ({ label, value, onChange, className = '' }) => (
  <div className={`flex flex-col gap-1 ${className}`}>
    {label && <label className="text-xs font-semibold text-slate-500 uppercase tracking-wide">{label}</label>}
    <input
      type="date"
      value={value || ''}
      onChange={(e) => onChange(e.target.value)}
      className="w-full px-3 py-2 text-sm border border-slate-200 rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
    />
  </div>
);
