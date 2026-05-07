import { useEffect, useState } from 'react';
import { useMetricsStore } from './metricsStore';
import { getTodayString } from '../../utils/dateUtils';

const EMPTY_FORM = { name:'', unit:'', target:'', description:'' };

export const MetricsPage = () => {
  const { metrics, todayLogs, loading, loadMetrics, loadTodayLogs, addMetric, deleteMetric, logMetric } = useMetricsStore?.() || {};
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState({...EMPTY_FORM});
  const [logVal, setLogVal] = useState({});

  useEffect(()=>{ loadMetrics?.(); loadTodayLogs?.(); },[]);

  const handleAdd = async () => {
    if(!form.name.trim()) return;
    await addMetric?.(form);
    setForm({...EMPTY_FORM});
    setShowForm(false);
  };

  const handleLog = async (metricId) => {
    const val = logVal[metricId];
    if(!val) return;
    await logMetric?.(metricId, parseFloat(val));
    setLogVal(p=>({...p,[metricId]:''}));
  };

  const safeMetrics = metrics || [];

  return (
    <div style={{ maxWidth:760, margin:'0 auto', display:'flex', flexDirection:'column', gap:24 }}>

      <div style={{ display:'flex', alignItems:'flex-start', justifyContent:'space-between' }}>
        <div>
          <h1 className="page-title">Metrics</h1>
          <p className="page-subtitle">Scoreboard · Track what matters</p>
        </div>
        <button className="btn btn-primary" onClick={()=>setShowForm(s=>!s)}>
          {showForm ? 'Cancel' : '+ New Metric'}
        </button>
      </div>

      {/* Add form */}
      {showForm && (
        <div className="card">
          <p className="section-title" style={{ marginBottom:16 }}>New Metric</p>
          <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:12, marginBottom:12 }}>
            <div>
              <label className="field-label">Metric Name</label>
              <input value={form.name} onChange={e=>setForm({...form,name:e.target.value})}
                placeholder="e.g. Water intake, Steps..." className="fp-input"
                onKeyDown={e=>e.key==='Enter'&&handleAdd()} />
            </div>
            <div>
              <label className="field-label">Unit</label>
              <input value={form.unit} onChange={e=>setForm({...form,unit:e.target.value})}
                placeholder="liters, steps, pages..." className="fp-input" />
            </div>
            <div>
              <label className="field-label">Daily Target</label>
              <input value={form.target} onChange={e=>setForm({...form,target:e.target.value})}
                placeholder="e.g. 3" className="fp-input" />
            </div>
            <div>
              <label className="field-label">Description (optional)</label>
              <input value={form.description} onChange={e=>setForm({...form,description:e.target.value})}
                placeholder="Why track this..." className="fp-input" />
            </div>
          </div>
          <div style={{ display:'flex', gap:8 }}>
            <button className="btn btn-primary" onClick={handleAdd}>Add Metric</button>
            <button className="btn" onClick={()=>setShowForm(false)}>Cancel</button>
          </div>
        </div>
      )}

      {/* Metric cards */}
      {safeMetrics.length === 0 ? (
        <div className="card" style={{ textAlign:'center', padding:'60px 20px' }}>
          <p style={{ fontSize:28, marginBottom:10 }}>📊</p>
          <p style={{ color:'var(--text-secondary)', fontSize:14, fontWeight:500 }}>No metrics yet</p>
          <p style={{ color:'var(--text-muted)', fontSize:12, marginTop:4 }}>Add your first trackable metric above</p>
        </div>
      ) : (
        <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fill, minmax(320px,1fr))', gap:14 }}>
          {safeMetrics.map(metric => {
            const log     = todayLogs?.[metric.id];
            const current = log?.value || 0;
            const target  = parseFloat(metric.target) || 0;
            const pct     = target > 0 ? Math.min(Math.round((current/target)*100), 100) : 0;
            const done    = pct >= 100;
            return (
              <div key={metric.id} className="card" style={{ padding:'18px 20px' }}>
                <div style={{ display:'flex', alignItems:'flex-start', justifyContent:'space-between', marginBottom:14 }}>
                  <div>
                    <p style={{ fontSize:14, fontWeight:600, color:'var(--text-primary)' }}>{metric.name}</p>
                    {metric.description && <p style={{ fontSize:11, color:'var(--text-disabled)', marginTop:2 }}>{metric.description}</p>}
                  </div>
                  <button className="btn-remove" onClick={()=>deleteMetric?.(metric.id)}>×</button>
                </div>

                {/* Value display */}
                <div style={{ display:'flex', alignItems:'baseline', gap:6, marginBottom:10 }}>
                  <span style={{ fontSize:28, fontWeight:700, color: done ? 'var(--accent-green)' : 'var(--accent-blue)', lineHeight:1 }}>
                    {current}
                  </span>
                  <span style={{ fontSize:12, color:'var(--text-muted)' }}>{metric.unit}</span>
                  {target > 0 && <span style={{ fontSize:12, color:'var(--text-disabled)', marginLeft:4 }}>/ {target}{metric.unit} target</span>}
                </div>

                {/* Progress */}
                {target > 0 && (
                  <div style={{ marginBottom:14 }}>
                    <div className="progress-bar">
                      <div className={`progress-fill ${done?'progress-fill-green':''}`} style={{ width:`${pct}%` }} />
                    </div>
                    <p style={{ fontSize:11, color:'var(--text-muted)', marginTop:5 }}>{pct}% of target</p>
                  </div>
                )}

                {/* Log input */}
                <div style={{ display:'flex', gap:8 }}>
                  <input
                    value={logVal[metric.id]||''}
                    onChange={e=>setLogVal(p=>({...p,[metric.id]:e.target.value}))}
                    onKeyDown={e=>e.key==='Enter'&&handleLog(metric.id)}
                    placeholder={`Log ${metric.unit||'value'}...`}
                    type="number" className="fp-input" style={{ flex:1 }} />
                  <button className="btn btn-primary" onClick={()=>handleLog(metric.id)}>Log</button>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};
