import { useEffect, useState } from "react";
import { useReviewsStore } from "./reviewsStore";
import { AutoTextarea } from "../../components/forms/Auto";

const Sec = ({ title, hint, children }) => (
  <div className="card">
    <div style={{ marginBottom:16 }}>
      <p className="section-title">{title}</p>
      {hint && <p className="helper-text" style={{ marginTop:3 }}>{hint}</p>}
    </div>
    {children}
  </div>
);

const PromptField = ({ label, prompt, value, onChange, minRows = 2 }) => (
  <div style={{ marginBottom:16 }}>
    <div style={{ display:"flex", alignItems:"baseline", gap:8, marginBottom:6 }}>
      <label className="field-label" style={{ marginBottom:0 }}>{label}</label>
      <span style={{ fontSize:11, color:"var(--text-disabled)", fontStyle:"italic" }}>{prompt}</span>
    </div>
    <AutoTextarea value={value} onChange={onChange} placeholder={prompt} minRows={minRows} />
  </div>
);

const WEEKLY_PROMPTS = [
  { k:"win",     l:"Weekly Win",    p:"What is the one outcome that makes this week a success?" },
  { k:"drift",   l:"Anti-Drift",    p:"Were your hours invested or merely spent? What was the ratio?" },
  { k:"forward", l:"Carry Forward", p:"What unfinished item must move to next week, and why?" },
  { k:"lesson",  l:"Key Lesson",    p:"What is the single most important thing you learned?" },
];

const MONTHLY_PROMPTS = [
  { k:"win",     l:"Monthly Win",   p:"What is the result that defines this month as successful?" },
  { k:"drift",   l:"Anti-Drift",    p:"Where did you drift vs. where did you drive? Be honest." },
  { k:"forward", l:"Carry Forward", p:"What must carry forward to next month with clear intent?" },
  { k:"lesson",  l:"Key Lesson",    p:"What pattern or insight emerged that you must not ignore?" },
];

const SSC = [
  { key:"stop",     label:"Stop Doing",     prompt:"What habit, task, or behaviour is costing you more than it gives?" },
  { key:"start",    label:"Start Doing",    prompt:"What one thing would create outsized results if started now?" },
  { key:"continue", label:"Continue Doing", prompt:"What is working well and must be protected at all costs?" },
];

export const ReviewsPage = () => {
  const [tab, setTab] = useState("weekly");
  const { review, loading, loadReview, updateField } = useReviewsStore();

  useEffect(() => { loadReview(tab); }, [tab]);

  const prompts = tab === "weekly" ? WEEKLY_PROMPTS : MONTHLY_PROMPTS;

  return (
    <div style={{ maxWidth:760, margin:"0 auto", display:"flex", flexDirection:"column", gap:24 }}>
      <div>
        <h1 className="page-title">Reviews</h1>
        <p className="page-subtitle">Weekly and monthly retrospectives</p>
      </div>

      <div style={{ display:"flex", gap:4, padding:4, background:"var(--bg-surface)", border:"1px solid var(--border-subtle)", borderRadius:10, width:"fit-content" }}>
        {[["weekly","Weekly"],["monthly","Monthly"]].map(([k,l]) => (
          <button key={k} onClick={() => setTab(k)} style={{
            padding:"7px 20px", borderRadius:7, border:"none", cursor:"pointer",
            fontSize:13, fontWeight:500, transition:"all 0.15s",
            background: tab===k ? "var(--bg-active)" : "transparent",
            color: tab===k ? "var(--text-primary)" : "var(--text-muted)",
            fontFamily:"Inter, sans-serif",
          }}>{l}</button>
        ))}
      </div>

      {loading && (
        <div style={{ display:"flex", alignItems:"center", justifyContent:"center", height:140 }}>
          <div style={{ width:22, height:22, border:"2px solid var(--border-strong)", borderTopColor:"var(--accent-blue)", borderRadius:"50%", animation:"spin 0.7s linear infinite" }} />
        </div>
      )}

      {!loading && review && (
        <>
          <Sec title={tab === "weekly" ? "Weekly Reflection" : "Monthly Reflection"}
            hint="Answer honestly - this is for your growth, not performance">
            <div>
              {prompts.map(({ k, l, p }) => (
                <PromptField key={k} label={l} prompt={p}
                  value={review[k] || ""} onChange={v => updateField(k, v)} />
              ))}
            </div>
          </Sec>

          <Sec title="Stop / Start / Continue" hint="Three questions that drive behaviour change">
            <div style={{ display:"flex", flexDirection:"column", gap:14 }}>
              {SSC.map(({ key, label, prompt }) => (
                <div key={key} className="card-inner">
                  <div style={{ marginBottom:8 }}>
                    <p style={{ fontSize:12, fontWeight:600, color:"var(--text-primary)", marginBottom:2 }}>{label}</p>
                    <p style={{ fontSize:11, color:"var(--text-disabled)", fontStyle:"italic" }}>{prompt}</p>
                  </div>
                  <AutoTextarea value={review[key] || ""} onChange={v => updateField(key, v)}
                    placeholder={prompt} minRows={3} />
                </div>
              ))}
            </div>
          </Sec>

          <Sec title="Next Period Focus" hint="One clear priority going into next week or month">
            <AutoTextarea value={review.nextFocus || ""} onChange={v => updateField("nextFocus", v)}
              placeholder="Next period, I will prioritise..." minRows={3} />
          </Sec>
        </>
      )}
    </div>
  );
};