export const PlannerCard = ({ title, subtitle, children, className = '', action }) => (
  <div className={`card ${className}`}>
    {(title || action) && (
      <div style={{ display:'flex', alignItems:'flex-start', justifyContent:'space-between', gap:12, marginBottom:16 }}>
        <div>
          {title    && <p className="section-title">{title}</p>}
          {subtitle && <p className="helper-text" style={{ marginTop:3 }}>{subtitle}</p>}
        </div>
        {action && <div style={{ flexShrink:0 }}>{action}</div>}
      </div>
    )}
    {children}
  </div>
);
