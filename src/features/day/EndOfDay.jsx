export const EndOfDay = ({ data = {}, onUpdate }) => {
  const fields = [
    { key:"momentum",      label:"Momentum",             color:"#4f8ef7", placeholder:"What created real forward motion today?" },
    { key:"energyDrain",   label:"Energy Drain",          color:"#ef4444", placeholder:"What consumed attention without creating output?" },
    { key:"peakMoment",    label:"Peak Moment",           color:"#42c97a", placeholder:"One thing that went exceptionally well." },
    { key:"tomorrowFirst", label:"Tomorrow's First Move",           color:"#f0a84b", placeholder:"The very first action to take when I wake up." },
  ];

  return (
    <div className="card">
      <div style={{ marginBottom:20 }}>
        <p className="section-title">End-of-Day Reflection</p>
        <p className="helper-text" style={{ marginTop:4 }}>Close the loop. 4 questions. Honest answers.</p>
      </div>
      <div style={{ display:"flex", flexDirection:"column", gap:16 }}>
        {fields.map(({ key, label, color, placeholder }) => (
          <div key={key}>
            <label style={{
              display:"block", marginBottom:7,
              fontSize:13, fontWeight:600, color,
              fontFamily:"Inter, sans-serif",
            }}>{label}</label>
            <textarea
              value={data[key] || ""}
              onChange={e => onUpdate({ ...data, [key]: e.target.value })}
              placeholder={placeholder}
              rows={2}
              style={{
                width:"100%", padding:"10px 13px",
                background:"var(--bg-elevated)",
                border:"1px solid var(--border-default)",
                borderRadius:8, color:"var(--text-primary)",
                fontSize:14, fontFamily:"Inter, sans-serif",
                lineHeight:1.6, resize:"none", outline:"none",
                transition:"border-color 0.15s",
              }}
              onFocus={e => e.target.style.borderColor = color + "66"}
              onBlur={e  => e.target.style.borderColor = "var(--border-default)"}
            />
          </div>
        ))}
      </div>
    </div>
  );
};