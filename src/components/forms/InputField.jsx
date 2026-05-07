export const InputField = ({ label, value, onChange, placeholder = '', type = 'text', className = '' }) => (
  <div className={`flex flex-col gap-1 ${className}`}>
    {label && <label className="text-xs font-semibold text-slate-500 uppercase tracking-wide">{label}</label>}
    <input
      type={type}
      value={value || ''}
      onChange={(e) => onChange(e.target.value)}
      placeholder={placeholder}
      className="w-full px-3 py-2 text-sm border border-slate-200 rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent transition"
    />
  </div>
);
