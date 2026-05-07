import { useEffect } from 'react';
import { useYearStore } from './yearStore';
import { AutoTextarea, FpInput } from '../../components/forms/Auto';
import { ChipList } from '../../components/forms/ChipList';

const BUCKET_CONFIG = {
  build:   { label:'Build',   tagClass:'tag-blue',   dot:'var(--accent-blue)'  },
  learn:   { label:'Learn',   tagClass:'tag-green',  dot:'var(--accent-green)' },
  operate: { label:'Operate', tagClass:'tag-amber',  dot:'var(--accent-amber)' },
  live:    { label:'Live',    tagClass:'tag-pink',   dot:'var(--accent-pink)'  },
};

const toChips = v => Array.isArray(v) ? v : (v ? v.split('\n').filter(Boolean) : []);
const fromChips = arr => arr;

export const YearPage = () => {
  const { yearData, loading, loadYear, updateField, updateTheme, updateTarget } = useYearStore();
  useEffect(() => { loadYear(); }, []);
  if (loading || !yearData) return <Spinner />;

  const targets = {
    build:{goal:'',metric:'',by:''},learn:{goal:'',metric:'',by:''},
    operate:{goal:'',metric:'',by:''},live:{goal:'',metric:'',by:''},
    ...(yearData.targets||{})
  };
  const themes = (yearData.themes?.length ? yearData.themes : [{theme:'',why:'',lookLike:'',notThisYear:''}])
    .map(t=>({theme:'',why:'',lookLike:'',notThisYear:'',...t}));

  const antiGoals      = toChips(yearData.antiGoals);
  const yearEndOutcome = toChips(yearData.yearEndOutcome);

  return (
    <div style={{ maxWidth:760, margin:'0 auto', display:'flex', flexDirection:'column', gap:24 }}>
      <PageHeader title={`${yearData.year} — Year Plan`} subtitle="Vision, themes, and annual targets" />

      {/* Identity */}
      <Section title="Identity Statement" hint="Who are you becoming this year?">
        <AutoTextarea value={yearData.identityStatement}
          onChange={v => updateField('identityStatement', v)}
          placeholder="I am becoming someone who..." minRows={2} />
      </Section>

      {/* Themes */}
      <Section title="Annual Themes" hint="The filters for every decision this year"
        action={<button className="btn btn-primary" onClick={()=>updateField('themes',[...themes,{theme:'',why:'',lookLike:'',notThisYear:''}])}>+ Theme</button>}>
        <div style={{ display:'flex', flexDirection:'column', gap:12 }}>
          {themes.map((t,i) => (
            <div key={i} className="card-inner">
              <div style={{ display:'flex', alignItems:'center', justifyContent:'space-between', marginBottom:14 }}>
                <input value={t.theme} onChange={e=>updateTheme(i,'theme',e.target.value)}
                  placeholder={`Theme ${i+1} name`}
                  style={{ background:'transparent', border:'none', outline:'none',
                    color:'var(--text-primary)', fontSize:15, fontWeight:600, flex:1 }} />
                {themes.length > 1 && (
                  <button className="btn-remove" onClick={()=>updateField('themes',themes.filter((_,j)=>j!==i))}>×</button>
                )}
              </div>
              <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:12 }}>
                <Field label="Why it matters">
                  <AutoTextarea value={t.why} onChange={v=>updateTheme(i,'why',v)} placeholder="Because..." />
                </Field>
                <Field label="Looks like in practice">
                  <AutoTextarea value={t.lookLike} onChange={v=>updateTheme(i,'lookLike',v)} placeholder="I will..." />
                </Field>
              </div>
              <div style={{ marginTop:12 }}>
                <Field label="Not this year">
                  <FpInput value={t.notThisYear} onChange={v=>updateTheme(i,'notThisYear',v)} placeholder="Excluded by this theme..." />
                </Field>
              </div>
            </div>
          ))}
        </div>
      </Section>

      {/* Targets */}
      <Section title="Annual Targets" hint="One meaningful goal per life area"
        action={
          <button className="btn btn-primary" onClick={()=>{
            const k=`custom_${Date.now()}`;
            updateField('targets',{...targets,[k]:{label:'Custom',goal:'',metric:'',by:''}});
          }}>+ Target</button>
        }>
        <div style={{ display:'flex', flexDirection:'column', gap:12 }}>
          {Object.entries(targets).map(([key,t]) => {
            const c = BUCKET_CONFIG[key] || BUCKET_CONFIG.build;
            const label = t.label || c.label;
            const isCore = ['build','learn','operate','live'].includes(key);
            return (
              <div key={key} className="card-inner">
                <div style={{ display:'flex', alignItems:'center', gap:10, marginBottom:12 }}>
                  <div style={{ width:7, height:7, borderRadius:'50%', background:c.dot, flexShrink:0 }} />
                  {isCore
                    ? <span className={`tag ${c.tagClass}`}>{label}</span>
                    : <input value={label} onChange={e=>updateTarget(key,'label',e.target.value)}
                        style={{ background:'transparent', border:'none', outline:'none',
                          color:'var(--accent-amber)', fontSize:12, fontWeight:600, width:120 }} />
                  }
                  <button className="btn-remove" style={{ marginLeft:'auto' }}
                    onClick={()=>{ const n={...targets}; delete n[key]; updateField('targets',n); }}>×</button>
                </div>
                <AutoTextarea value={t.goal} onChange={v=>updateTarget(key,'goal',v)} placeholder="Goal for the year..." minRows={1} />
                <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:10, marginTop:10 }}>
                  <FpInput value={t.metric||''} onChange={v=>updateTarget(key,'metric',v)} placeholder="Success metric" />
                  <FpInput value={t.by||''}     onChange={v=>updateTarget(key,'by',v)}     placeholder="By when" />
                </div>
              </div>
            );
          })}
        </div>
      </Section>

      {/* Year-end outcomes + Anti-goals as chip lists */}
      <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:20 }}>
        <Section title="Year-End Outcomes" hint="Results that define success — press Enter to add">
          <ChipList items={yearEndOutcome}
            onChange={v=>updateField('yearEndOutcome', fromChips(v))}
            placeholder="At year-end I will have..." />
        </Section>
        <Section title="Anti-Goals" hint="What you are NOT doing this year — press Enter to add">
          <ChipList items={antiGoals}
            onChange={v=>updateField('antiGoals', fromChips(v))}
            placeholder="Not this year..." />
        </Section>
      </div>
    </div>
  );
};

const Spinner = () => (
  <div style={{ display:'flex', alignItems:'center', justifyContent:'center', height:200 }}>
    <div style={{ width:24, height:24, border:'2px solid var(--border-strong)', borderTopColor:'var(--accent-blue)', borderRadius:'50%', animation:'spin 0.7s linear infinite' }} />
  </div>
);
const PageHeader = ({ title, subtitle }) => (
  <div><h1 className="page-title">{title}</h1>{subtitle&&<p className="page-subtitle">{subtitle}</p>}</div>
);
const Section = ({ title, hint, children, action }) => (
  <div className="card">
    <div style={{ display:'flex', alignItems:'flex-start', justifyContent:'space-between', marginBottom:16 }}>
      <div>
        <p className="section-title">{title}</p>
        {hint&&<p className="helper-text" style={{ marginTop:4 }}>{hint}</p>}
      </div>
      {action&&<div>{action}</div>}
    </div>
    {children}
  </div>
);
const Field = ({ label, children }) => (
  <div><label className="field-label">{label}</label>{children}</div>
);
