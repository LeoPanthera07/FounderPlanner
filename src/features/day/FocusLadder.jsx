import { useEffect } from "react";

const PRIORITY_CONFIG = [
  { key:"mustWin",   label:"Must Win",    color:"var(--accent-amber)",  bg:"rgba(240,168,75,0.07)",  border:"rgba(240,168,75,0.22)"  },
  { key:"shouldDo1", label:"Should Do 1", color:"var(--accent-blue)",   bg:"rgba(79,142,247,0.06)",  border:"rgba(79,142,247,0.18)"  },
  { key:"shouldDo2", label:"Should Do 2", color:"var(--accent-blue)",   bg:"rgba(79,142,247,0.04)",  border:"rgba(79,142,247,0.14)"  },
  { key:"canDo1",    label:"Can Do 1",    color:"var(--accent-green)",  bg:"rgba(66,201,122,0.04)",  border:"rgba(66,201,122,0.14)"  },
  { key:"canDo2",    label:"Can Do 2",    color:"var(--accent-green)",  bg:"rgba(66,201,122,0.03)",  border:"rgba(66,201,122,0.10)"  },
  { key:"canDo3",    label:"Can Do 3",    color:"var(--accent-purple)", bg:"rgba(155,115,232,0.04)", border:"rgba(155,115,232,0.12)" },
];

const BUCKETS = ["Build","Learn","Operate","Live"];
const BUCKET_COLORS = { Build:"var(--accent-blue)", Learn:"var(--accent-green)", Operate:"var(--accent-amber)", Live:"var(--accent-pink)" };

export const FocusLadder = ({ tasks = {}, onUpdate }) => {
  const handleChange = (key, field, value) => {
    onUpdate({ ...tasks, [key]: { ...(tasks[key] || {}), [field]: value } });
  };

  return (
    <div className="card">
      <div style={{ marginBottom:16 }}>
        <p className="section-title">Focus Ladder</p>
        <p className="helper-text" style={{ marginTop:4 }}>Ranked by impact. Must Win is non-negotiable.</p>
      </div>
      <div style={{ display:"flex", flexDirection:"column", gap:6 }}>
        {PRIORITY_CONFIG.map((p) => {
          const task   = tasks[p.key] || {};
          const bucket = task.bucket || "Build";
          const bColor = BUCKET_COLORS[bucket] || "var(--accent-blue)";

          return (
            <div key={p.key} style={{
              display:"flex", alignItems:"center", gap:10,
              padding:"10px 14px",
              background: p.bg,
              border: "1px solid " + p.border,
              borderRadius:8,
              opacity: task.done ? 0.45 : 1,
              transition:"opacity 0.15s",
            }}>
              <button onClick={() => handleChange(p.key, "done", !task.done)} style={{
                width:18, height:18, borderRadius:4, flexShrink:0,
                border: "2px solid " + (task.done ? "var(--accent-green)" : "var(--border-strong)"),
                background: task.done ? "var(--accent-green)" : "transparent",
                display:"flex", alignItems:"center", justifyContent:"center",
                cursor:"pointer", transition:"all 0.15s",
              }}>
                {task.done && <span style={{ color:"#000", fontSize:10, fontWeight:900, lineHeight:1 }}>v</span>}
              </button>

              <span style={{
                width:90, fontSize:12, fontWeight:600, flexShrink:0,
                color: p.color,
                textDecoration: task.done ? "line-through" : "none",
              }}>{p.label}</span>

              <input
                value={task.description || ""}
                onChange={e => handleChange(p.key, "description", e.target.value)}
                placeholder="Task description..."
                style={{
                  flex:1, background:"transparent", border:"none", outline:"none",
                  color: task.done ? "var(--text-muted)" : "var(--text-primary)",
                  fontSize:13, fontFamily:"Inter, sans-serif",
                  textDecoration: task.done ? "line-through" : "none",
                }}
              />

              <select value={bucket} onChange={e => handleChange(p.key, "bucket", e.target.value)}
                style={{
                  background:"transparent", border:"none", outline:"none",
                  color: bColor, fontSize:13, fontWeight:700, cursor:"pointer", flexShrink:0, fontFamily:"Inter, sans-serif",
                }}>
                {BUCKETS.map(b => <option key={b} value={b} style={{ background:"#1c1e24", color:"var(--text-primary)" }}>{b}</option>)}
              </select>

              <input value={task.time || ""} onChange={e => handleChange(p.key, "time", e.target.value)}
                placeholder="Time"
                style={{
                  width:56, background:"transparent", border:"none",
                  borderLeft:"1px solid var(--border-subtle)",
                  outline:"none", color:"var(--text-muted)",
                  fontSize:11, paddingLeft:10, flexShrink:0, fontFamily:"Inter, sans-serif",
                }}
              />
            </div>
          );
        })}
      </div>
    </div>
  );
};