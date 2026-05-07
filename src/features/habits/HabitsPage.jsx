import { useEffect, useState } from 'react';
import { useHabitsStore } from './habitsStore';

const FREQ_OPTS = ['Daily','Weekdays','Weekends','3x/week','Custom'];
const BUCKET_TAG = { Build:'tag-blue', Learn:'tag-green', Operate:'tag-amber', Live:'tag-pink', Health:'tag-purple' };

const EMPTY_FORM = { name:'', bucket:'Health', frequency:'Daily', targetTime:'', why:'' };

export const HabitsPage = () => {
  const { habits, todayLogs, loading, loadHabits, loadTodayLogs, addHabit, deleteHabit, toggleHabitLog } = useHabitsStore();
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState({...EMPTY_FORM});

  useEffect(()=>{ loadHabits(); loadTodayLogs(); },[]);

  const done  = habits.filter(h=>todayLogs[h.id]?.completed).length;
  const total = habits.length;
  const pct   = total ? Math.round((done/total)*100) : 0;

  const handleAdd = async () => {
    if(!form.name.trim()) return;
    await addHabit(form);
    setForm({...EMPTY_FORM});
    setShowForm(false);
  };

  return (
    <div style={{ maxWidth:760, margin:'0 auto', display:'flex', flexDirection:'column', gap:24 }}>

      {/* Header */}
      <div style={{ display:'flex', alignItems:'flex-start', justifyContent:'space-between' }}>
        <div>
          <h1 className="page-title">Habits</h1>
          <p className="page-subtitle">Daily non-negotiables · {new Date().toISOString().slice(0,10)}</p>
        </div>
        <button className="btn btn-primary" onClick={()=>setShowForm(s=>!s)}>
          {showForm ? 'Cancel' : '+ New Habit'}
        </button>
      </div>

      {/* Progress bar */}
      {total > 0 && (
        <div className="card" style={{ padding:'16px 20px' }}>
          <div style={{ display:'flex', alignItems:'center', justifyContent:'space-between', marginBottom:10 }}>
            <span style={{ fontSize:13, fontWeight:500, color:'var(--text-primary)' }}>Today's Progress</span>
            <span style={{ fontSize:13, color: pct===100 ? 'var(--accent-green)' : 'var(--text-secondary)' }}>
              {done}/{total} · {pct}%
            </span>
          </div>
          <div className="progress-bar">
            <div className="progress-fill progress-fill-green" style={{ width:`${pct}%` }} />
          </div>
        </div>
      )}

      {/* Add form */}
      {showForm && (
        <div className="card">
          <p className="section-title" style={{ marginBottom:16 }}>New Habit</p>
          <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:12, marginBottom:12 }}>
            <div>
              <label className="field-label">Habit Name</label>
              <input value={form.name} onChange={e=>setForm({...form,name:e.target.value})}
                placeholder="e.g. Morning run, Read 30min..." className="fp-input"
                onKeyDown={e=>e.key==='Enter'&&handleAdd()} />
            </div>
            <div>
              <label className="field-label">Bucket</label>
              <select value={form.bucket} onChange={e=>setForm({...form,bucket:e.target.value})} className="fp-select" style={{ width:'100%' }}>
                {['Health','Build','Learn','Operate','Live'].map(b=><option key={b}>{b}</option>)}
              </select>
            </div>
            <div>
              <label className="field-label">Frequency</label>
              <select value={form.frequency} onChange={e=>setForm({...form,frequency:e.target.value})} className="fp-select" style={{ width:'100%' }}>
                {FREQ_OPTS.map(f=><option key={f}>{f}</option>)}
              </select>
            </div>
            <div>
              <label className="field-label">Target Time (optional)</label>
              <input value={form.targetTime} onChange={e=>setForm({...form,targetTime:e.target.value})}
                placeholder="e.g. 06:00, Morning..." className="fp-input" />
            </div>
          </div>
          <div style={{ marginBottom:14 }}>
            <label className="field-label">Why this habit?</label>
            <input value={form.why} onChange={e=>setForm({...form,why:e.target.value})}
              placeholder="Because it gives me..." className="fp-input" />
          </div>
          <div style={{ display:'flex', gap:8 }}>
            <button className="btn btn-primary" onClick={handleAdd}>Add Habit</button>
            <button className="btn" onClick={()=>setShowForm(false)}>Cancel</button>
          </div>
        </div>
      )}

      {/* Habit list */}
      {habits.length === 0 ? (
        <div className="card" style={{ textAlign:'center', padding:'60px 20px' }}>
          <p style={{ fontSize:28, marginBottom:10 }}>🔥</p>
          <p style={{ color:'var(--text-secondary)', fontSize:14, fontWeight:500 }}>No habits yet</p>
          <p style={{ color:'var(--text-muted)', fontSize:12, marginTop:4 }}>Add your first daily non-negotiable above</p>
        </div>
      ) : (
        <div style={{ display:'flex', flexDirection:'column', gap:8 }}>
          {habits.map(habit => {
            const log   = todayLogs[habit.id];
            const done  = log?.completed;
            const tc    = BUCKET_TAG[habit.bucket]||'tag-slate';
            return (
              <div key={habit.id} className="card" style={{ padding:'14px 18px', transition:'all 0.15s',
                opacity: done ? 0.7 : 1 }}>
                <div style={{ display:'flex', alignItems:'center', gap:12 }}>
                  {/* Checkbox */}
                  <button onClick={()=>toggleHabitLog(habit.id)}
                    style={{
                      width:22, height:22, borderRadius:'50%', border:`2px solid ${done?'var(--accent-green)':'var(--border-strong)'}`,
                      background: done ? 'var(--accent-green)' : 'transparent',
                      display:'flex', alignItems:'center', justifyContent:'center',
                      cursor:'pointer', transition:'all 0.15s', flexShrink:0
                    }}>
                    {done && <span style={{ color:'white', fontSize:12, fontWeight:700 }}>✓</span>}
                  </button>

                  <div style={{ flex:1, minWidth:0 }}>
                    <div style={{ display:'flex', alignItems:'center', gap:8, flexWrap:'wrap' }}>
                      <span style={{ fontSize:13, fontWeight:500, color: done ? 'var(--text-muted)' : 'var(--text-primary)',
                        textDecoration: done ? 'line-through' : 'none' }}>
                        {habit.name}
                      </span>
                      <span className={`tag ${tc}`}>{habit.bucket}</span>
                      <span className="tag tag-slate">{habit.frequency}</span>
                      {habit.targetTime && (
                        <span style={{ fontSize:11, color:'var(--text-muted)' }}>⏰ {habit.targetTime}</span>
                      )}
                    </div>
                    {habit.why && (
                      <p style={{ fontSize:11, color:'var(--text-disabled)', marginTop:3 }}>{habit.why}</p>
                    )}
                  </div>

                  {log?.streak > 0 && (
                    <span style={{ fontSize:11, color:'var(--accent-amber)', fontWeight:600 }}>
                      🔥 {log.streak}
                    </span>
                  )}

                  <button className="btn-remove" onClick={()=>deleteHabit(habit.id)}>×</button>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};
