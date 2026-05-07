export const CheckboxField = ({ label, checked, onChange, className = '' }) => (
  <label className={`flex items-center gap-2 cursor-pointer ${className}`}>
    <input
      type="checkbox"
      checked={!!checked}
      onChange={(e) => onChange(e.target.checked)}
      className="w-4 h-4 rounded border-slate-300 text-blue-600 focus:ring-blue-400"
    />
    {label && <span className="text-sm text-slate-700">{label}</span>}
  </label>
);
