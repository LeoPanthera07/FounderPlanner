import { useState } from "react";

const HOUR_HEIGHT = 72;
const TOTAL_HOURS = 24;

const isValid = t => typeof t === "string" && /^\d{2}:\d{2}$/.test(t);
const toMin   = t => { if (!isValid(t)) return 0; const [h,m]=t.split(":").map(Number); return h*60+m; };
const fmt12   = t => {
  if (!isValid(t)) return t;
  const [h,m] = t.split(":").map(Number);
  const ap = h >= 12 ? "pm" : "am";
  const h12 = h % 12 || 12;
  return m === 0 ? h12 + ap : h12 + ":" + String(m).padStart(2,"0") + ap;
};
const durLabel = (s, e) => {
  const d = toMin(e) - toMin(s);
  if (d <= 0) return "";
  const h = Math.floor(d/60), m = d%60;
  return h > 0 ? (m > 0 ? h + "h " + m + "m" : h + "h") : m + "m";
};

const BLOCK_MODES = ["Deep Work","Learning","Comms","Admin / Shallow","Recovery / Sleep","Lunch","Wake Prep","Evening Shutdown"];

const BLOCK_STYLES = {
  "Deep Work":        { bg:"#1b3558", border:"#2a5080", text:"#93c5fd", label:"Deep Work"   },
  "Learning":         { bg:"#15301f", border:"#1e4a2d", text:"#6ee7b7", label:"Learning"    },
  "Comms":            { bg:"#2e2510", border:"#44370a", text:"#fcd34d", label:"Comms"        },
  "Admin / Shallow":  { bg:"#252035", border:"#352d4e", text:"#c4b5fd", label:"Admin"        },
  "Recovery / Sleep": { bg:"#191929", border:"#252538", text:"#94a3b8", label:"Sleep"        },
  "Lunch":            { bg:"#2e1a0a", border:"#44280e", text:"#fb923c", label:"Lunch"        },
  "Wake Prep":        { bg:"#1c2e12", border:"#2c441a", text:"#86efac", label:"Wake"         },
  "Evening Shutdown": { bg:"#1a1a32", border:"#272744", text:"#818cf8", label:"Evening"      },
};
const getStyle = mode => BLOCK_STYLES[mode] || BLOCK_STYLES["Deep Work"];

const EMPTY_BLOCK = { id:null, name:"", mode:"Deep Work", startTime:"09:00", endTime:"10:00", intent:"", done:false };

export const HourlySchedule = ({ schedule = [], onUpdate }) => {
  const safe = (Array.isArray(schedule) ? schedule : [])
    .filter(b => b && b.name?.trim())
    .map((b,i) => ({
      ...EMPTY_BLOCK, ...b,
      id: b.id ?? i,
      startTime: isValid(b.startTime) ? b.startTime : "09:00",
      endTime:   isValid(b.endTime)   ? b.endTime   : "10:00",
    }));

  const [blocks,  setBlocks]  = useState(safe);
  const [editing, setEditing] = useState(null);
  const [form,    setForm]    = useState({...EMPTY_BLOCK});
  const [showAdd, setShowAdd] = useState(false);

  const persist = updated => {
    const sorted = [...updated].sort((a,b) => toMin(a.startTime) - toMin(b.startTime));
    setBlocks(sorted); onUpdate(sorted);
  };
  const upd = (id, key, val) => persist(blocks.map(b => b.id === id ? {...b,[key]:val} : b));
  const del = id => { const u = blocks.filter(b => b.id !== id); setBlocks(u); onUpdate(u); setEditing(null); };

  const addBlock = () => {
    if (!form.name.trim()) return;
    persist([...blocks, { ...form, id: Date.now() }]);
    setForm({...EMPTY_BLOCK}); setShowAdd(false);
  };

  const hours = Array.from({ length: TOTAL_HOURS }, (_,i) => i);
  const done  = blocks.filter(b => b.done).length;

  return (
    <div className="card">
      <div style={{ display:"flex", alignItems:"center", justifyContent:"space-between", marginBottom:16 }}>
        <div>
          <p className="section-title">Daily Schedule</p>
          {blocks.length > 0 && (
            <p className="helper-text" style={{ marginTop:3 }}>{done}/{blocks.length} blocks complete</p>
          )}
        </div>
        <div style={{ display:"flex", alignItems:"center", gap:10 }}>
          {blocks.length > 0 && (
            <div className="progress-bar" style={{ width:72 }}>
              <div className="progress-fill progress-fill-green"
                style={{ width: blocks.length ? (done/blocks.length*100) + "%" : "0%" }} />
            </div>
          )}
          <button className="btn btn-primary" onClick={() => { setShowAdd(s => !s); setEditing(null); }}>
            {showAdd ? "Cancel" : "+ Block"}
          </button>
        </div>
      </div>

      {showAdd && (
        <div className="card-inner" style={{ marginBottom:16 }}>
          <div style={{ display:"grid", gridTemplateColumns:"1fr 110px 110px", gap:10, marginBottom:10 }}>
            <div>
              <label className="field-label">Block Name</label>
              <input value={form.name} onChange={e => setForm({...form, name:e.target.value})}
                placeholder="e.g. Deep Work: Feature X" className="fp-input"
                onKeyDown={e => e.key === "Enter" && addBlock()} />
            </div>
            <div>
              <label className="field-label">Start</label>
              <input type="time" value={form.startTime} onChange={e => setForm({...form, startTime:e.target.value})} className="fp-input" />
            </div>
            <div>
              <label className="field-label">End</label>
              <input type="time" value={form.endTime} onChange={e => setForm({...form, endTime:e.target.value})} className="fp-input" />
            </div>
          </div>
          <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:10, marginBottom:12 }}>
            <div>
              <label className="field-label">Mode</label>
              <select value={form.mode} onChange={e => setForm({...form, mode:e.target.value})} className="fp-input" style={{ cursor:"pointer" }}>
                {BLOCK_MODES.map(m => <option key={m}>{m}</option>)}
              </select>
            </div>
            <div>
              <label className="field-label">Intent</label>
              <input value={form.intent} onChange={e => setForm({...form, intent:e.target.value})}
                placeholder="What exactly will you do?" className="fp-input" />
            </div>
          </div>
          <button className="btn btn-primary" onClick={addBlock}>Add Block</button>
        </div>
      )}

      {blocks.length === 0 ? (
        <div style={{ textAlign:"center", padding:"40px 0", color:"var(--text-muted)", fontSize:13 }}>
          No blocks yet. Add your first time block above.
        </div>
      ) : (
        <div style={{ overflowY:"auto", maxHeight:580, borderRadius:8, border:"1px solid var(--border-subtle)" }}>
          <div style={{ position:"relative", display:"flex" }}>
            <div style={{ width:46, flexShrink:0, background:"var(--bg-elevated)" }}>
              {hours.map(h => (
                <div key={h} style={{ height:HOUR_HEIGHT, display:"flex", alignItems:"flex-start",
                  justifyContent:"flex-end", paddingRight:8, paddingTop:6 }}>
                  <span style={{ fontSize:10, color:"var(--text-disabled)", userSelect:"none" }}>
                    {fmt12(String(h).padStart(2,"0") + ":00")}
                  </span>
                </div>
              ))}
            </div>

            <div style={{ flex:1, position:"relative", background:"var(--bg-surface)", borderLeft:"1px solid var(--border-subtle)" }}>
              {hours.map(h => (
                <div key={h} style={{
                  position:"absolute", top: h * HOUR_HEIGHT, width:"100%",
                  borderTop: "1px solid " + (h % 6 === 0 ? "var(--border-default)" : "var(--border-subtle)"),
                  pointerEvents:"none"
                }} />
              ))}
              <div style={{ height: TOTAL_HOURS * HOUR_HEIGHT, position:"relative" }}>
                {blocks.map(block => {
                  const st     = getStyle(block.mode);
                  const top    = (toMin(block.startTime) / 60) * HOUR_HEIGHT;
                  const height = Math.max(((toMin(block.endTime) - toMin(block.startTime)) / 60) * HOUR_HEIGHT, 52);
                  const isOpen = editing === block.id;

                  return (
                    <div key={block.id} style={{
                      position:"absolute", top, left:4, right:4, height,
                      borderRadius:8, overflow:"hidden", cursor:"pointer", zIndex: isOpen ? 20 : 10,
                      background: block.done ? "var(--bg-elevated)" : st.bg,
                      border: "1px solid " + (block.done ? "var(--border-default)" : st.border),
                      opacity: block.done ? 0.5 : 1, transition:"all 0.15s",
                      boxShadow: isOpen ? "0 4px 24px rgba(0,0,0,0.5)" : "none",
                    }}>
                      <div onClick={() => setEditing(isOpen ? null : block.id)}
                        style={{ display:"flex", alignItems:"center", gap:8, padding:"6px 10px", height:36 }}>
                        <button onClick={e => { e.stopPropagation(); upd(block.id, "done", !block.done); }}
                          style={{
                            width:16, height:16, borderRadius:"50%", flexShrink:0,
                            border: "2px solid " + (block.done ? st.text : "rgba(255,255,255,0.25)"),
                            background: block.done ? st.text : "transparent",
                            display:"flex", alignItems:"center", justifyContent:"center", cursor:"pointer",
                          }}>
                          {block.done && <span style={{ color:"#000", fontSize:9, fontWeight:900 }}>v</span>}
                        </button>

                        <span style={{
                          fontSize:12, fontWeight:600, flex:1,
                          color: block.done ? "var(--text-muted)" : st.text,
                          textDecoration: block.done ? "line-through" : "none",
                          overflow:"hidden", textOverflow:"ellipsis", whiteSpace:"nowrap",
                        }}>
                          {block.name}
                          {block.intent && (
                            <span style={{ fontWeight:400, opacity:0.6 }}>{" - " + block.intent}</span>
                          )}
                        </span>

                        <span style={{ fontSize:10, color:"rgba(255,255,255,0.3)", flexShrink:0 }}>
                          {fmt12(block.startTime) + " - " + fmt12(block.endTime)}
                        </span>
                      </div>

                      {isOpen && (
                        <div style={{ padding:"10px 10px 12px", background:"rgba(0,0,0,0.35)", borderTop:"1px solid rgba(255,255,255,0.07)" }}>
                          <div style={{ display:"grid", gridTemplateColumns:"1fr 88px 88px", gap:8, marginBottom:8 }}>
                            <input value={block.name} onChange={e => upd(block.id,"name",e.target.value)}
                              className="fp-input" style={{ fontSize:12 }} placeholder="Block name" />
                            <input type="time" value={block.startTime} onChange={e => upd(block.id,"startTime",e.target.value)}
                              className="fp-input" style={{ fontSize:12 }} />
                            <input type="time" value={block.endTime} onChange={e => upd(block.id,"endTime",e.target.value)}
                              className="fp-input" style={{ fontSize:12 }} />
                          </div>
                          <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:8, marginBottom:8 }}>
                            <select value={block.mode} onChange={e => upd(block.id,"mode",e.target.value)}
                              className="fp-input" style={{ fontSize:12, cursor:"pointer" }}>
                              {BLOCK_MODES.map(m => <option key={m}>{m}</option>)}
                            </select>
                            <input value={block.intent || ""} onChange={e => upd(block.id,"intent",e.target.value)}
                              className="fp-input" style={{ fontSize:12 }} placeholder="Intent..." />
                          </div>
                          <div style={{ display:"flex", alignItems:"center", justifyContent:"space-between" }}>
                            <span style={{ fontSize:11, color:"var(--text-muted)" }}>
                              {durLabel(block.startTime, block.endTime) || "Set end time"}
                            </span>
                            <button className="btn-remove" onClick={e => { e.stopPropagation(); del(block.id); }}>
                              Delete block
                            </button>
                          </div>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};