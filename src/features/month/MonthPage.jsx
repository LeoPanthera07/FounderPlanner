import { useEffect, useState } from "react";
import { useMonthStore } from "./monthStore";
import { AutoTextarea, FpInput } from "../../components/forms/Auto";
import { ChipList } from "../../components/forms/ChipList";

const MONTHS = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];

/* Notion-style tag config: soft pastel bg, matching dot color */
const BUCKET_CFG = {
  Build:   { bg:"rgba(219,234,254,0.12)", color:"#93c5fd", border:"rgba(147,197,253,0.25)", dot:"#3b82f6" },
  Learn:   { bg:"rgba(209,250,229,0.12)", color:"#6ee7b7", border:"rgba(110,231,183,0.25)", dot:"#10b981" },
  Operate: { bg:"rgba(254,243,199,0.12)", color:"#fcd34d", border:"rgba(252,211,77,0.25)",  dot:"#f59e0b" },
  Live:    { bg:"rgba(252,231,243,0.12)", color:"#f9a8d4", border:"rgba(249,168,212,0.25)", dot:"#ec4899" },
};
const STATUS_CFG = {
  Active:  { bg:"rgba(219,234,254,0.12)", color:"#93c5fd", border:"rgba(147,197,253,0.25)", dot:"#3b82f6" },
  Done:    { bg:"rgba(209,250,229,0.12)", color:"#6ee7b7", border:"rgba(110,231,183,0.25)", dot:"#10b981" },
  Paused:  { bg:"rgba(254,243,199,0.12)", color:"#fcd34d", border:"rgba(252,211,77,0.25)",  dot:"#f59e0b" },
  Dropped: { bg:"rgba(241,245,249,0.06)", color:"#94a3b8", border:"rgba(148,163,184,0.2)",  dot:"#64748b" },
};

const EP = { name:"", bucket:"Build", status:"Active", milestone:"" };
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

/* Notion-style pill tag — colored dot + label */
const NotionTag = ({ value, options, cfgMap, onChange }) => {
  const cfg = cfgMap[value] || cfgMap[Object.keys(cfgMap)[0]];
  return (
    <div style={{ position:"relative", display:"inline-flex", alignItems:"center" }}>
      <select value={value} onChange={e => onChange(e.target.value)} style={{
        appearance:"none",
        display:"flex", alignItems:"center",
        padding:"4px 24px 4px 24px",
        borderRadius:5,
        fontSize:12, fontWeight:500,
        fontFamily:"Inter, sans-serif",
        cursor:"pointer", outline:"none",
        background: cfg.bg,
        color: cfg.color,
        border: "1px solid " + cfg.border,
        lineHeight:1.4,
      }}>
        {options.map(o => <option key={o} value={o} style={{ background:"#1c1e24", color:"var(--text-primary)" }}>{o}</option>)}
      </select>
      {/* Colored dot before text */}
      <span style={{
        position:"absolute", left:9, top:"50%", transform:"translateY(-50%)",
        width:7, height:7, borderRadius:"50%",
        background: cfg.dot, pointerEvents:"none", flexShrink:0,
      }} />
      {/* Chevron */}
      <span style={{
        position:"absolute", right:8, top:"50%", transform:"translateY(-50%)",
        fontSize:8, color:cfg.color, pointerEvents:"none", lineHeight:1,
      }}>v</span>
    </div>
  );
};

export const MonthPage = () => {
  const now = new Date();
  const [year, setYear]   = useState(now.getFullYear());
  const [month, setMonth] = useState(now.getMonth() + 1);
  const { monthData, loading, loadMonth, updateField, updateProject } = useMonthStore();

  useEffect(() => { loadMonth(year, month); }, [year, month]);

  const nav = delta => {
    const nd = new Date(year, month - 1 + delta);
    setYear(nd.getFullYear()); setMonth(nd.getMonth() + 1);
  };

  if (loading || !monthData) return (
    <div style={{ display:"flex", alignItems:"center", justifyContent:"center", height:200 }}>
      <div style={{ width:24, height:24, border:"2px solid var(--border-strong)", borderTopColor:"var(--accent-blue)", borderRadius:"50%", animation:"spin 0.7s linear infinite" }} />
    </div>
  );

  const d = {
    ...monthData,
    projects: Array.isArray(monthData.projects) ? monthData.projects : [{ ...EP }],
  };

  return (
    <div style={{ maxWidth:760, margin:"0 auto", display:"flex", flexDirection:"column", gap:24 }}>

      <div style={{ display:"flex", alignItems:"center", justifyContent:"space-between" }}>
        <div>
          <h1 className="page-title">{MONTHS[month-1]} {year}</h1>
          <p className="page-subtitle">Month Plan</p>
        </div>
        <div style={{ display:"flex", gap:6 }}>
          <button className="btn" onClick={() => nav(-1)}>Prev</button>
          <button className="btn" onClick={() => { setYear(now.getFullYear()); setMonth(now.getMonth()+1); }}>Now</button>
          <button className="btn" onClick={() => nav(1)}>Next</button>
        </div>
      </div>

      <Sec title="Monthly Win" hint="This month succeeds if...">
        <AutoTextarea value={d.monthlyWin||""} onChange={v => updateField("monthlyWin",v)}
          placeholder="The one result that makes this month count..." minRows={2} />
      </Sec>

      <Sec title="Projects" hint="Active projects this month"
        action={<button className="btn btn-primary" onClick={() => updateField("projects",[...d.projects,{...EP}])}>+ Project</button>}>
        <div style={{ display:"flex", flexDirection:"column", gap:8 }}>
          {d.projects.map((p, i) => {
            const bcfg = BUCKET_CFG[p.bucket] || BUCKET_CFG.Build;
            return (
              <div key={i} style={{
                borderRadius:8, border:"1px solid var(--border-default)",
                background:"var(--bg-elevated)", overflow:"hidden",
              }}>
                <div style={{ display:"flex", alignItems:"center", gap:10, padding:"10px 14px" }}>
                  <div style={{ width:3, height:34, borderRadius:99, background:bcfg.dot, flexShrink:0 }} />
                  <input value={p.name} onChange={e => updateProject(i,"name",e.target.value)}
                    placeholder="Project name"
                    style={{
                      flex:1, background:"transparent", border:"none", outline:"none",
                      color:"var(--text-primary)", fontSize:14, fontWeight:500,
                      fontFamily:"Inter, sans-serif",
                    }} />
                  <NotionTag value={p.bucket||"Build"} options={["Build","Learn","Operate","Live"]}
                    cfgMap={BUCKET_CFG} onChange={v => updateProject(i,"bucket",v)} />
                  <NotionTag value={p.status||"Active"} options={["Active","Done","Paused","Dropped"]}
                    cfgMap={STATUS_CFG} onChange={v => updateProject(i,"status",v)} />
                  <button className="btn-remove"
                    onClick={() => updateField("projects", d.projects.filter((_,j) => j!==i))}>x</button>
                </div>
                <div style={{ borderTop:"1px solid var(--border-subtle)", padding:"8px 14px 10px 27px" }}>
                  <input value={p.milestone||""} onChange={e => updateProject(i,"milestone",e.target.value)}
                    placeholder="This month milestone..."
                    style={{
                      width:"100%", background:"transparent", border:"none", outline:"none",
                      color:"var(--text-secondary)", fontSize:13, fontFamily:"Inter, sans-serif",
                    }} />
                </div>
              </div>
            );
          })}
          <button className="btn-add" onClick={() => updateField("projects",[...d.projects,{...EP}])}>+ Add project</button>
        </div>
      </Sec>

      <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:20 }}>
        <Sec title="Monthly Focus" hint="Press Enter to add">
          <ChipList items={toChips(d.monthlyFocus)} onChange={v => updateField("monthlyFocus",v)} placeholder="Focus item..." />
        </Sec>
        <Sec title="Anti-Drift" hint="What to say no to">
          <ChipList items={toChips(d.antiDrift)} onChange={v => updateField("antiDrift",v)} placeholder="Not this month..." />
        </Sec>
      </div>
    </div>
  );
};