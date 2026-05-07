import { AutoTextarea } from "../../components/forms/Auto";

const ENERGY_LEVELS = ["Low", "Medium", "High"];
const ENERGY_COLORS = {
  Low:    { bg:"rgba(239,68,68,0.12)",  border:"rgba(239,68,68,0.3)",  text:"#f87171" },
  Medium: { bg:"rgba(240,168,75,0.12)", border:"rgba(240,168,75,0.3)", text:"var(--accent-amber)" },
  High:   { bg:"rgba(66,201,122,0.12)", border:"rgba(66,201,122,0.3)", text:"var(--accent-green)" },
};

export const DayCommandCard = ({ dayData, onUpdate }) => {
  const d = dayData || {};
  const energy = d.energyForecast || "High";
  const ec = ENERGY_COLORS[energy] || ENERGY_COLORS.High;

  return (
    <div className="card">
      <div style={{ display:"flex", alignItems:"center", justifyContent:"space-between", marginBottom:16 }}>
        <p className="section-title">Daily Command</p>
        <div style={{ display:"flex", gap:6 }}>
          {ENERGY_LEVELS.map(level => {
            const c = ENERGY_COLORS[level];
            const active = energy === level;
            return (
              <button key={level} onClick={() => onUpdate("energyForecast", level)}
                style={{
                  padding:"4px 12px", borderRadius:6, border:`1px solid ${active ? c.border : "var(--border-default)"}`,
                  background: active ? c.bg : "transparent",
                  color: active ? c.text : "var(--text-muted)",
                  fontSize:12, fontWeight:500, cursor:"pointer", transition:"all 0.15s"
                }}>{level}</button>
            );
          })}
        </div>
      </div>

      <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:12, marginBottom:12 }}>
        <div>
          <label className="field-label">Day Theme</label>
          <input value={d.dayTheme||""} onChange={e => onUpdate("dayTheme", e.target.value)}
            placeholder="Today's focus theme..." className="fp-input" />
        </div>
        <div>
          <label className="field-label">Today Matters Because</label>
          <input value={d.todayMatters||""} onChange={e => onUpdate("todayMatters", e.target.value)}
            placeholder="Why does today matter?" className="fp-input" />
        </div>
      </div>
    </div>
  );
};