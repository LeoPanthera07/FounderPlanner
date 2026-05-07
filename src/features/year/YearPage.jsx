import { useEffect } from "react";
import { useYearStore } from "./yearStore";
import { AutoTextarea, FpInput } from "../../components/forms/Auto";
import { ChipList } from "../../components/forms/ChipList";

const BUCKET_STYLE = {
  Build:   { bg:"rgba(79,142,247,0.15)",  color:"#93c5fd", border:"rgba(79,142,247,0.3)",  dot:"#4f8ef7" },
  Learn:   { bg:"rgba(66,201,122,0.15)",  color:"#6ee7b7", border:"rgba(66,201,122,0.3)",  dot:"#42c97a" },
  Operate: { bg:"rgba(240,168,75,0.15)",  color:"#fcd34d", border:"rgba(240,168,75,0.3)",  dot:"#f0a84b" },
  Live:    { bg:"rgba(224,101,160,0.15)", color:"#f9a8d4", border:"rgba(224,101,160,0.3)", dot:"#e065a0" },
  Custom:  { bg:"rgba(155,115,232,0.12)", color:"#c4b5fd", border:"rgba(155,115,232,0.25)",dot:"#9b73e8" },
};
const toChips = v => Array.isArray(v) ? v : (v ? v.split("\n").filter(Boolean) : []);

const Sec = ({ title, hint, children, action }) => (
  <div className="card">
    <div style={{ display:"flex", alignItems:"flex-start", justifyContent:"space-between", marginBottom:16 }}>
      <div>
        <p className="section-title">{title}</p>
        {hint && <p className="helper-text" style={{ marginTop:4 }}>{hint}</p>}
      </div>
      {action && <div>{action}</div>}
    </div>
    {children}
  </div>
);
const F = ({ label, children }) => (
  <div><label className="field-label">{label}</label>{children}</div>
);

const BUCKETS = ["Build","Learn","Operate","Live","Custom"];

export const YearPage = () => {
  const { yearData, loading, loadYear, updateField, updateTheme, updateTarget } = useYearStore();
  useEffect(() => { loadYear(); }, []);

  if (loading || !yearData) return (
    <div style={{ display:"flex", alignItems:"center", justifyContent:"center", height:200 }}>
      <div style={{ width:24, height:24, border:"2px solid var(--border-strong)", borderTopColor:"var(--accent-blue)", borderRadius:"50%", animation:"spin 0.7s linear infinite" }} />
    </div>
  );

  const rawTargets = yearData.targets || {};
  const targets = Object.keys(rawTargets).length > 0 ? rawTargets : {
    build:   { label:"Build",   goal:"", metric:"", by:"" },
    learn:   { label:"Learn",   goal:"", metric:"", by:"" },
    operate: { label:"Operate", goal:"", metric:"", by:"" },
    live:    { label:"Live",    goal:"", metric:"", by:"" },
  };

  const themes = (yearData.themes?.length ? yearData.themes : [{ theme:"", why:"", lookLike:"", notThisYear:"" }])
    .map(t => ({ theme:"", why:"", lookLike:"", notThisYear:"", ...t }));

  return (
    <div style={{ maxWidth:760, margin:"0 auto", display:"flex", flexDirection:"column", gap:24 }}>
      <div>
        <h1 className="page-title">{yearData.year} Year Plan</h1>
        <p className="page-subtitle">Vision, themes, and annual targets</p>
      </div>

      <Sec title="Identity Statement" hint="Who are you becoming this year?">
        <AutoTextarea value={yearData.identityStatement||""} onChange={v => updateField("identityStatement",v)}
          placeholder="I am becoming someone who..." minRows={2} />
      </Sec>

      <Sec title="Annual Themes" hint="The filters for every decision this year"
        action={<button className="btn btn-primary" onClick={() => updateField("themes",[...themes,{theme:"",why:"",lookLike:"",notThisYear:""}])}>+ Theme</button>}>
        <div style={{ display:"flex", flexDirection:"column", gap:12 }}>
          {themes.map((t,i) => (
            <div key={i} className="card-inner">
              <div style={{ display:"flex", alignItems:"center", justifyContent:"space-between", marginBottom:14 }}>
                <input value={t.theme} onChange={e => updateTheme(i,"theme",e.target.value)}
                  placeholder={"Theme " + (i+1) + " name"} className="fp-input"
                  style={{ border:"none", fontWeight:600, fontSize:15 }} />
                {themes.length > 1 && (
                  <button className="btn-remove" onClick={() => updateField("themes", themes.filter((_,j) => j!==i))}>x</button>
                )}
              </div>
              <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:12 }}>
                <F label="Why it matters">
                  <AutoTextarea value={t.why} onChange={v => updateTheme(i,"why",v)} placeholder="Because..." />
                </F>
                <F label="Looks like">
                  <AutoTextarea value={t.lookLike} onChange={v => updateTheme(i,"lookLike",v)} placeholder="I will..." />
                </F>
              </div>
              <div style={{ marginTop:12 }}>
                <F label="Not this year">
                  <input value={t.notThisYear||""} onChange={e => updateTheme(i,"notThisYear",e.target.value)}
                    placeholder="Excluded by this theme..." className="fp-input" />
                </F>
              </div>
            </div>
          ))}
        </div>
      </Sec>

      <Sec title="Annual Targets" hint="Delete any row or add custom ones"
        action={
          <button className="btn btn-primary" onClick={() => {
            const k = "custom_" + Date.now();
            updateField("targets", { ...targets, [k]: { label:"Custom", goal:"", metric:"", by:"" } });
          }}>+ Target</button>
        }>
        <div style={{ display:"flex", flexDirection:"column", gap:12 }}>
          {Object.entries(targets).map(([key, t]) => {
            const bucketKey = t.label || key;
            const s = BUCKET_STYLE[bucketKey] || BUCKET_STYLE.Custom;
            return (
              <div key={key} className="card-inner">
                <div style={{ display:"flex", alignItems:"center", gap:10, marginBottom:12 }}>
                  <div style={{ width:8, height:8, borderRadius:"50%", background:s.dot, flexShrink:0 }} />
                  <select value={t.label || key}
                    onChange={e => updateTarget(key,"label",e.target.value)}
                    style={{
                      padding:"3px 10px", borderRadius:5, fontSize:11, fontWeight:600,
                      fontFamily:"Inter, sans-serif", cursor:"pointer", outline:"none",
                      background: s.bg, color: s.color, border: "1px solid " + s.border,
                      appearance:"none",
                    }}>
                    {BUCKETS.map(b => <option key={b} value={b} style={{ background:"#1c1e24", color:"var(--text-primary)" }}>{b}</option>)}
                  </select>
                  <button className="btn-remove" style={{ marginLeft:"auto" }}
                    onClick={() => { const n = {...targets}; delete n[key]; updateField("targets",n); }}>x</button>
                </div>
                <AutoTextarea value={t.goal||""} onChange={v => updateTarget(key,"goal",v)} placeholder="Goal for the year..." minRows={1} />
                <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:10, marginTop:10 }}>
                  <input value={t.metric||""} onChange={e => updateTarget(key,"metric",e.target.value)}
                    placeholder="Success metric" className="fp-input" />
                  <input value={t.by||""} onChange={e => updateTarget(key,"by",e.target.value)}
                    placeholder="By when" className="fp-input" />
                </div>
              </div>
            );
          })}
        </div>
      </Sec>

      <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:20 }}>
        <Sec title="Year-End Outcomes" hint="Press Enter to add">
          <ChipList items={toChips(yearData.yearEndOutcome)} onChange={v => updateField("yearEndOutcome",v)} placeholder="At year-end I will have..." />
        </Sec>
        <Sec title="Anti-Goals" hint="What you are NOT doing this year">
          <ChipList items={toChips(yearData.antiGoals)} onChange={v => updateField("antiGoals",v)} placeholder="Not this year..." />
        </Sec>
      </div>
    </div>
  );
};