import { useLocation } from "react-router-dom";
import { getTodayString, formatDate } from "../../utils/dateUtils";

const META = {
  "/year":    { title:"Year Plan",     emoji:"🎯" },
  "/month":   { title:"Month Plan",    emoji:"📆"   },
  "/week":    { title:"Week Plan",     emoji:"📋"   },
  "/day":     { title:"Daily Command", emoji:"⚡"   },
  "/habits":  { title:"Habits",        emoji:"🔥"   },
  "/metrics": { title:"Metrics",       emoji:"📊"  },
  "/reviews": { title:"Reviews",       emoji:"🔄" },
};

export const TopBar = ({ onMenuClick }) => {
  const { pathname } = useLocation();
  const m = META[pathname] || { title:"Planner", emoji:"F" };

  return (
    <header style={{
      height:52, background:"var(--bg-surface)",
      borderBottom:"1px solid var(--border-subtle)",
      display:"flex", alignItems:"center",
      justifyContent:"space-between",
      padding:"0 28px", flexShrink:0,
    }}>
      <div style={{ display:"flex", alignItems:"center", gap:10 }}>
        <span style={{ fontSize:20, lineHeight:1 }}>{m.emoji}</span>
        <span style={{ fontSize:16, fontWeight:600, color:"var(--text-primary)", fontFamily:"Inter, sans-serif", letterSpacing:"-0.2px" }}>
          {m.title}
        </span>
      </div>
      <span style={{ fontSize:12, color:"var(--text-disabled)", fontFamily:"Inter, sans-serif" }}>
        {formatDate(getTodayString())}
      </span>
    </header>
  );
};