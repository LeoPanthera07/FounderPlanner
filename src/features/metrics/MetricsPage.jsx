import { useEffect, useState } from "react";
import { useMetricsStore } from "./metricsStore";

const EMPTY = { name:"", unit:"", target:"", description:"" };

export const MetricsPage = () => {
  const { metrics, todayLogs, loading, loadMetrics, loadTodayLogs, addMetric, deleteMetric, logMetric } = useMetricsStore();
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState({...EMPTY});
  const [logVal, setLogVal] = useState({});

  useEffect(() => { loadMetrics(); loadTodayLogs(); }, []);

  const handleAdd = async () => {
    if (!form.name.trim()) return;
    await addMetric(form);
    setForm({...EMPTY});
    setShowForm(false);
  };

  const handleLog = async (metricId) => {
    const raw = logVal[metricId];
    if (!raw && raw !== 0) return;
    const val = parseFloat(raw);
    if (isNaN(val)) return;
    await logMetric(metricId, val);
    setLogVal(p => ({ ...p, [metricId]: "" }));
  };

  const safeMetrics = metrics || [];

  return (
    <div style={{ maxWidth:760, margin:"0 auto", display:"flex", flexDirection:"column", gap:24 }}>

      <div style={{ display:"flex", alignItems:"flex-start", justifyContent:"space-between" }}>
        <div>
          <h1 className="page-title">Metrics</h1>
          <p className="page-subtitle">Scoreboard . Track what matters</p>
        </div>
        <button className="btn btn-primary" onClick={() => setShowForm(s => !s)}>
          {showForm ? "Cancel" : "+ New Metric"}
        </button>
      </div>

      {showForm && (
        <div className="card">
          <p className="section-title" style={{ marginBottom:16 }}>New Metric</p>
          <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:12, marginBottom:12 }}>
            <div>
              <label className="field-label">Name</label>
              <input value={form.name} onChange={e => setForm({...form, name:e.target.value})}
                placeholder="e.g. Water intake" className="fp-input"
                onKeyDown={e => e.key === "Enter" && handleAdd()} />
            </div>
            <div>
              <label className="field-label">Unit</label>
              <input value={form.unit} onChange={e => setForm({...form, unit:e.target.value})}
                placeholder="liters, steps, pages..." className="fp-input" />
            </div>
            <div>
              <label className="field-label">Daily Target</label>
              <input value={form.target} onChange={e => setForm({...form, target:e.target.value})}
                placeholder="e.g. 3" type="number" className="fp-input" />
            </div>
            <div>
              <label className="field-label">Description</label>
              <input value={form.description} onChange={e => setForm({...form, description:e.target.value})}
                placeholder="Why track this..." className="fp-input" />
            </div>
          </div>
          <div style={{ display:"flex", gap:8 }}>
            <button className="btn btn-primary" onClick={handleAdd}>Add Metric</button>
            <button className="btn" onClick={() => setShowForm(false)}>Cancel</button>
          </div>
        </div>
      )}

      {loading && (
        <div style={{ display:"flex", alignItems:"center", justifyContent:"center", height:160 }}>
          <div style={{ width:22, height:22, border:"2px solid var(--border-strong)", borderTopColor:"var(--accent-blue)", borderRadius:"50%", animation:"spin 0.7s linear infinite" }} />
        </div>
      )}

      {!loading && safeMetrics.length === 0 && (
        <div className="card" style={{ textAlign:"center", padding:"60px 20px" }}>
          <div style={{ width:40, height:40, borderRadius:10, background:"var(--bg-elevated)", border:"1px solid var(--border-default)", display:"flex", alignItems:"center", justifyContent:"center", margin:"0 auto 14px", fontSize:18 }}>M</div>
          <p style={{ color:"var(--text-secondary)", fontSize:14, fontWeight:500, marginBottom:4 }}>No metrics yet</p>
          <p style={{ color:"var(--text-muted)", fontSize:12 }}>Track what matters "” add your first metric above</p>
        </div>
      )}

      {!loading && safeMetrics.length > 0 && (
        <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fill, minmax(300px, 1fr))", gap:14 }}>
          {safeMetrics.map(metric => {
            const log     = todayLogs?.[metric.id];
            const current = parseFloat(log?.value || 0);
            const target  = parseFloat(metric.target) || 0;
            const pct     = target > 0 ? Math.min(Math.round((current / target) * 100), 100) : 0;
            const done    = pct >= 100;

            return (
              <div key={metric.id} className="card" style={{ padding:"18px 20px" }}>
                <div style={{ display:"flex", alignItems:"flex-start", justifyContent:"space-between", marginBottom:12 }}>
                  <div>
                    <p style={{ fontSize:14, fontWeight:600, color:"var(--text-primary)" }}>{metric.name}</p>
                    {metric.description && <p style={{ fontSize:11, color:"var(--text-disabled)", marginTop:2 }}>{metric.description}</p>}
                  </div>
                  <button className="btn-remove" onClick={() => deleteMetric(metric.id)}>x</button>
                </div>

                <div style={{ display:"flex", alignItems:"baseline", gap:6, marginBottom:10 }}>
                  <span style={{ fontSize:30, fontWeight:700, lineHeight:1, color: done ? "var(--accent-green)" : "var(--accent-blue)" }}>
                    {current}
                  </span>
                  <span style={{ fontSize:12, color:"var(--text-muted)" }}>{metric.unit}</span>
                  {target > 0 && (
                    <span style={{ fontSize:12, color:"var(--text-disabled)", marginLeft:4 }}>
                      / {target} {metric.unit} target
                    </span>
                  )}
                </div>

                {target > 0 && (
                  <div style={{ marginBottom:14 }}>
                    <div className="progress-bar">
                      <div className={`progress-fill ${done ? "progress-fill-green" : ""}`} style={{ width:`${pct}%` }} />
                    </div>
                    <p style={{ fontSize:11, color:"var(--text-muted)", marginTop:5 }}>{pct}% of daily target</p>
                  </div>
                )}

                <div style={{ display:"flex", gap:8 }}>
                  <input
                    value={logVal[metric.id] || ""}
                    onChange={e => setLogVal(p => ({ ...p, [metric.id]: e.target.value }))}
                    onKeyDown={e => e.key === "Enter" && handleLog(metric.id)}
                    placeholder={"Add " + (metric.unit || "value") + "..."}
                    type="number" className="fp-input" style={{ flex:1 }} />
                  <button className="btn btn-primary" onClick={() => handleLog(metric.id)}>Log</button>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};