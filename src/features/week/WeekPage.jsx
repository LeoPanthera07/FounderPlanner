import { useEffect, useState } from 'react';
import { useWeekStore } from './weekStore';
import { AutoTextarea, FpInput } from '../../components/forms/Auto';
import { ChipList } from '../../components/forms/ChipList';

const DAYS=['Monday','Tuesday','Wednesday','Thursday','Friday','Saturday','Sunday'];
const BUCKET_TAG={ Build:'tag-blue', Learn:'tag-green', 'Operate/Live':'tag-amber' };
const toChips = v => Array.isArray(v) ? v : (v ? v.split('\n').filter(Boolean) : []);

const Section=({title,hint,children,action})=>(
  <div className="card">
    <div style={{ display:'flex', alignItems:'flex-start', justifyContent:'space-between', marginBottom:16 }}>
      <div><p className="section-title">{title}</p>{hint&&<p className="helper-text" style={{marginTop:4}}>{hint}</p>}</div>
      {action&&<div>{action}</div>}
    </div>
    {children}
  </div>
);

const Field=({label,children})=>(
  <div><label className="field-label">{label}</label>{children}</div>
);

export const WeekPage = () => {
  const { weekData, loading, loadWeek, updateField, updatePriority, updateDayTheme } = useWeekStore();
  useEffect(()=>{ loadWeek(); },[]);

  if(loading||!weekData) return (
    <div style={{ display:'flex', alignItems:'center', justifyContent:'center', height:200 }}>
      <div style={{ width:24, height:24, border:'2px solid var(--border-strong)', borderTopColor:'var(--accent-blue)', borderRadius:'50%', animation:'spin 0.7s linear infinite' }} />
    </div>
  );

  const priorities = weekData.priorities?.length ? weekData.priorities
    : [{ bucket:'Build', priority:'', doneLooksLike:'', timeNeeded:'' },
       { bucket:'Learn', priority:'', doneLooksLike:'', timeNeeded:'' },
       { bucket:'Operate/Live', priority:'', doneLooksLike:'', timeNeeded:'' }];

  const dayThemes = weekData.dayThemes || {};
  const notThisWeek = toChips(weekData.notThisWeek);
  const weekWin = weekData.weekWin || '';

  return (
    <div style={{ maxWidth:760, margin:'0 auto', display:'flex', flexDirection:'column', gap:24 }}>
      <div>
        <h1 className="page-title">Week {weekData.week} · {weekData.year}</h1>
        <p className="page-subtitle">Execution map · Priorities · Day themes</p>
      </div>

      {/* Weekly Win */}
      <Section title="Weekly Win" hint="The one result that makes this week count">
        <AutoTextarea value={weekWin} onChange={v=>updateField('weekWin',v)}
          placeholder="This week wins if..." minRows={2} />
      </Section>

      {/* Priorities */}
      <Section title="Top Priorities" hint="Pick 3 — everything else is optional"
        action={<button className="btn btn-primary" onClick={()=>updateField('priorities',[...priorities,{bucket:'Build',priority:'',doneLooksLike:'',timeNeeded:''}])}>+ Priority</button>}>
        <div style={{ display:'flex', flexDirection:'column', gap:10 }}>
          {priorities.map((p,i)=>{
            const tc = BUCKET_TAG[p.bucket]||'tag-slate';
            return (
              <div key={i} className="card-inner" style={{ padding:'12px 14px' }}>
                <div style={{ display:'flex', alignItems:'center', gap:10, marginBottom:10 }}>
                  <div style={{ width:22, height:22, borderRadius:'50%', background:'var(--bg-hover)',
                    border:'1px solid var(--border-default)', display:'flex', alignItems:'center',
                    justifyContent:'center', fontSize:11, fontWeight:700, color:'var(--text-muted)', flexShrink:0 }}>
                    {i+1}
                  </div>
                  <select value={p.bucket}
                    onChange={e=>updatePriority(i,'bucket',e.target.value)}
                    className={`tag ${tc}`}
                    style={{ border:'none', outline:'none', cursor:'pointer', fontWeight:600, fontSize:11, appearance:'none' }}>
                    {['Build','Learn','Operate/Live','Personal'].map(b=><option key={b}>{b}</option>)}
                  </select>
                  <input value={p.priority} onChange={e=>updatePriority(i,'priority',e.target.value)}
                    placeholder="What is the priority?"
                    style={{ flex:1, background:'transparent', border:'none', outline:'none',
                      color:'var(--text-primary)', fontSize:13, fontWeight:500 }} />
                  {priorities.length > 1 && (
                    <button className="btn-remove" onClick={()=>updateField('priorities',priorities.filter((_,j)=>j!==i))}>×</button>
                  )}
                </div>
                <div style={{ display:'grid', gridTemplateColumns:'1fr 140px', gap:10 }}>
                  <FpInput value={p.doneLooksLike||''} onChange={v=>updatePriority(i,'doneLooksLike',v)} placeholder="Done looks like..." />
                  <FpInput value={p.timeNeeded||''}   onChange={v=>updatePriority(i,'timeNeeded',v)}    placeholder="Time needed" />
                </div>
              </div>
            );
          })}
          <button className="btn-add" onClick={()=>updateField('priorities',[...priorities,{bucket:'Build',priority:'',doneLooksLike:'',timeNeeded:''}])}>
            + Add priority
          </button>
        </div>
      </Section>

      {/* Day Themes */}
      <Section title="Day Themes" hint="One focus theme per day">
        <div style={{ display:'flex', flexDirection:'column', gap:8 }}>
          {DAYS.map(day => {
            const dt = dayThemes[day] || { theme:'', focusBlock:'', nonNegotiable:'' };
            return (
              <div key={day} className="card-inner" style={{ padding:'10px 14px' }}>
                <div style={{ display:'flex', alignItems:'center', gap:12 }}>
                  <span style={{ width:88, fontSize:12, fontWeight:600, color:'var(--text-muted)', flexShrink:0 }}>{day}</span>
                  <input value={dt.theme} onChange={e=>updateDayTheme(day,'theme',e.target.value)}
                    placeholder="Theme..."
                    style={{ flex:1, background:'transparent', border:'none', outline:'none',
                      color:'var(--text-primary)', fontSize:13 }} />
                  <div style={{ width:1, height:16, background:'var(--border-subtle)' }} />
                  <input value={dt.focusBlock||''} onChange={e=>updateDayTheme(day,'focusBlock',e.target.value)}
                    placeholder="Key focus block..."
                    style={{ flex:1, background:'transparent', border:'none', outline:'none',
                      color:'var(--text-secondary)', fontSize:12 }} />
                  <div style={{ width:1, height:16, background:'var(--border-subtle)' }} />
                  <input value={dt.nonNegotiable||''} onChange={e=>updateDayTheme(day,'nonNegotiable',e.target.value)}
                    placeholder="Non-negotiable..."
                    style={{ width:160, background:'transparent', border:'none', outline:'none',
                      color:'var(--text-muted)', fontSize:12 }} />
                </div>
              </div>
            );
          })}
        </div>
      </Section>

      {/* Not this week */}
      <Section title="Not This Week" hint="Intentional exclusions — press Enter to add">
        <ChipList items={notThisWeek} onChange={v=>updateField('notThisWeek',v)} placeholder="What you're saying no to..." />
      </Section>
    </div>
  );
};
