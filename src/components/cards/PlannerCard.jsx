export const PlannerCard = ({ title, subtitle, children, className = '', headerColor = 'bg-[#1e3a5f]' }) => (
  <div className={`rounded-xl border border-slate-200 shadow-sm overflow-hidden ${className}`}>
    {title && (
      <div className={`${headerColor} px-4 py-3`}>
        <h3 className="text-sm font-semibold text-white tracking-wide">{title}</h3>
        {subtitle && <p className="text-xs text-slate-300 mt-0.5">{subtitle}</p>}
      </div>
    )}
    <div className="p-4 bg-white">{children}</div>
  </div>
);
