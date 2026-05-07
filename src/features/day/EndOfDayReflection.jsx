import { AutoTextarea } from "../../components/forms/Auto";

const FIELDS = [
  { key:"momentum",       label:"Momentum",           color:"#4f8ef7", placeholder:"What created real forward motion today?" },
  { key:"energyDrain",    label:"Energy Drain",        color:"#ef4444", placeholder:"What consumed attention without creating output?" },
  { key:"peakMoment",     label:"Peak Moment",         color:"#42c97a", placeholder:"One thing that went exceptionally well." },
  { key:"tomorrowsMove",  label:"Tomorrow's First Move", color:"#f0a84b", placeholder:"The very first action to take when I wake up." },
];

export const EndOfDayReflection = ({ reflection = {}, onUpdate }) => {
  return (
    <div className="card">
      <div style={{ marginBottom:20 }}>
        <p className="section-title">End-of-Day Reflection</p>
        <p className="helper-text" style={{ marginTop:4 }}>Close the day with clarity</p>
      </div>

      <div style={{ display:"flex", flexDirection:"column", gap:16 }}>
        {FIELDS.map(f => (
          <div key={f.key} style={{ display:"grid", gridTemplateColumns:"160px 1fr", gap:16, alignItems:"flex-start" }}>
            <label style={{
              fontSize:13, fontWeight:600, color:f.color,
              fontFamily:"Inter, sans-serif", paddingTop:10, lineHeight:1.4,
            }}>
              {f.label}
            </label>
            <AutoTextarea
              value={reflection[f.key] || ""}
              onChange={v => onUpdate({ ...reflection, [f.key]: v })}
              placeholder={f.placeholder}
              minRows={2}
            />
          </div>
        ))}
      </div>
    </div>
  );
};