import { useEffect, useState } from 'react';
import { useMonthStore } from './monthStore';
import { AutoTextarea, FpInput } from '../../components/forms/Auto';
import { ChipList } from '../../components/forms/ChipList';

const MONTHS=['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
const BUCKET_TAG={ Build:'tag-blue', Learn:'tag-green', Operate:'tag-amber', Live:'tag-pink' };
const STATUS_TAG ={ Active:'tag-blue', Done:'tag-green', Paused:'tag-amber', Dropped:'tag-slate' };
const EP={ name:'', bucket:'Build', status:'Active', milestone:'' };
const EM={ metric:'', target:'', current:'' };
const toChips = v => Array.isArray(v) ? v : (v ? v.split('\n').filter(Boolean) : []);

const Section=({title,hint,children,action})=>(
  <div className="card">
    <div style={{display:'flex',alignItems:'flex-start',justifyContent:'space-between',marginBottom:16}}>
      <div><p className="section-title">{title}</p>{hint&&<p className="helper-text" style={{marginTop:4}}>{hint}</p>}</div>
      {action&&<div>{action}</div>}
    </div>
    {children}
  </div>
);
const Field=({label,children})=>(
  <div><label className="field-label">{label}</label>{children}</div>
);

export const MonthPage = () => {
  const now=new Date();
  const [year,setYear]=useState(now.getFullYear());
  const [month,setMonth]=useState(now.getMonth()+1);
  const { monthData,loading,loadMonth,updateField,updateProject,updateScorecard,updateReview }=useMonthStore();
  useEffect(()=>{ loadMonth(year,month); },[year,month]);

  const d=monthData ? {
    ...monthData,
    projects:  Array.isArray(monthData.projects)  ? monthData.projects  : [{...EP}],
    scorecard: Array.isArray(monthData.scorecard) ? monthData.scorecard : [{...EM}],
    review:    monthData.review||{win:'',lesson:'',nextFocus:''},
  } : null;

  const nav=delta=>{ const nd=new Date(year,month-1+delta); setYear(nd.getFullYear()); setMonth(nd.getMonth()+1); };

  if(loading||!d) return <Spinner />;

  const focusChips  = toChips(d.monthlyFocus);
  const driftChips  = toChips(d.antiDrift);

  return (
    <div style={{ maxWidth:760, margin:'0 auto', display:'flex', flexDirection:'column', gap:24 }}>
      <div style={{ display:'flex', alignItems:'center', justifyContent:'space-between' }}>
        <div>
          <h1 className="page-title">{MONTHS[month-1]} {year}</h1>
          <p className="page-subtitle">Month Plan · Projects & Focus</p>
        </div>
        <div style={{ display:'flex', gap:6 }}>
          <button className="btn" onClick={()=>nav(-1)}>←</button>
          <button className="btn" onClick={()=>{ setYear(now.getFullYear()); setMonth(now.getMonth()+1); }}>Now</button>
          <button className="btn" onClick={()=>nav(1)}>→</button>
        </div>
      </div>

      <Section title="Monthly Win" hint="This month succeeds if...">
        <AutoTextarea value={d.monthlyWin} onChange={v=>updateField('monthlyWin',v)}
          placeholder="The one result that makes this month count..." minRows={2} />
      </Section>

      <Section title="Projects" hint="Active projects this month"
        action={<button className="btn btn-primary" onClick={()=>updateField('projects',[...d.projects,{...EP}])}>+ Project</button>}>
        <div style={{ display:'flex', flexDirection:'column', gap:8 }}>
          {d.projects.map((p,i)=>{
            const bc=BUCKET_TAG[p.bucket]||'tag-slate';
            const sc=STATUS_TAG[p.status]||'tag-slate';
            return (
              <div key={i} className="card-inner" style={{ padding:'12px 14px' }}>
                <div style={{ display:'flex', alignItems:'center', gap:8, marginBottom:8 }}>
                  <input value={p.name} onChange={e=>updateProject(i,'name',e.target.value)}
                    placeholder="Project name"
                    style={{ flex:1, background:'transparent', border:'none', outline:'none',
                      color:'var(--text-primary)', fontSize:13, fontWeight:500 }} />
                  <select value={p.bucket} onChange={e=>updateProject(i,'bucket',e.target.value)}
                    className={`tag ${bc}`} style={{ border:'none', outline:'none', cursor:'pointer', fontWeight:600, fontSize:11, appearance:'none' }}>
                    {['Build','Learn','Operate','Live'].map(b=><option key={b}>{b}</option>)}
                  </select>
                  <select value={p.status} onChange={e=>updateProject(i,'status',e.target.value)}
                    className={`tag ${sc}`} style={{ border:'none', outline:'none', cursor:'pointer', fontWeight:600, fontSize:11, appearance:'none' }}>
                    {['Active','Done','Paused','Dropped'].map(s=><option key={s}>{s}</option>)}
                  </select>
                  <button className="btn-remove" onClick={()=>updateField('projects',d.projects.filter((_,j)=>j!==i))}>×</button>
                </div>
                <input value={p.milestone||''} onChange={e=>updateProject(i,'milestone',e.target.value)}
                  placeholder="This month's milestone..."
                  style={{ width:'100%', background:'transparent', border:'none',
                    borderTop:'1px solid var(--border-subtle)', outline:'none',
                    color:'var(--text-secondary)', fontSize:12, paddingTop:8 }} />
              </div>
            );
          })}
          <button className="btn-add" onClick={()=>updateField('projects',[...d.projects,{...EP}])}>+ Add project</button>
        </div>
      </Section>

      <Section title="Scorecard" hint="Metrics to track this month"
        action={<button className="btn btn-primary" onClick={()=>updateField('scorecard',[...d.scorecard,{...EM}])}>+ Metric</button>}>
        <div style={{ display:'flex', flexDirection:'column', gap:7 }}>
          <div style={{ display:'grid', gridTemplateColumns:'1fr 110px 110px 36px', gap:8 }}>
            {['Metric','Target','Current',''].map(h=>(
              <span key={h} className="field-label" style={{ paddingLeft:4 }}>{h}</span>
            ))}
          </div>
          {d.scorecard.map((s,i)=>(
            <div key={i} style={{ display:'grid', gridTemplateColumns:'1fr 110px 110px 36px', gap:8, alignItems:'center' }}>
              <FpInput value={s.metric}  onChange={v=>updateScorecard(i,'metric',v)}  placeholder="Metric name" />
              <FpInput value={s.target}  onChange={v=>updateScorecard(i,'target',v)}  placeholder="Target" />
              <FpInput value={s.current} onChange={v=>updateScorecard(i,'current',v)} placeholder="Current" />
              <button className="btn-remove" onClick={()=>updateField('scorecard',d.scorecard.filter((_,j)=>j!==i))}>×</button>
            </div>
          ))}
          <button className="btn-add" onClick={()=>updateField('scorecard',[...d.scorecard,{...EM}])}>+ Add metric</button>
        </div>
      </Section>

      {/* Focus + Anti-drift as chip lists */}
      <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:20 }}>
        <Section title="Monthly Focus" hint="Type focus items and press Enter">
          <ChipList items={focusChips} onChange={v=>updateField('monthlyFocus',v)} placeholder="Focus item..." />
        </Section>
        <Section title="Anti-Drift" hint="What to say no to — press Enter to add">
          <ChipList items={driftChips} onChange={v=>updateField('antiDrift',v)} placeholder="Not this month..." />
        </Section>
      </div>

      <Section title="Monthly Review" hint="Fill at end of month">
        <div style={{ display:'flex', flexDirection:'column', gap:14 }}>
          {[{k:'win',l:'Win',p:'Biggest win...'},{k:'lesson',l:'Lesson',p:'Key lesson...'},{k:'nextFocus',l:'Next Month Focus',p:'Top priority...'}].map(({k,l,p})=>(
            <Field key={k} label={l}>
              <AutoTextarea value={d.review?.[k]} onChange={v=>updateReview(k,v)} placeholder={p} minRows={2} />
            </Field>
          ))}
        </div>
      </Section>
    </div>
  );
};

const Spinner=()=>(
  <div style={{ display:'flex', alignItems:'center', justifyContent:'center', height:200 }}>
    <div style={{ width:24, height:24, border:'2px solid var(--border-strong)', borderTopColor:'var(--accent-blue)', borderRadius:'50%', animation:'spin 0.7s linear infinite' }} />
  </div>
);
