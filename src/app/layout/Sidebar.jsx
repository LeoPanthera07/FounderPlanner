import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";

const NAV = [
  { path:"/day",     label:"Daily Command", emoji:"⚡" },
  { path:"/week",    label:"Week",          emoji:"📋" },
  { path:"/month",   label:"Month",         emoji:"📆" },
  { path:"/year",    label:"Year",          emoji:"🎯" },
  { path:"/reviews", label:"Reviews",       emoji:"🔄" },
  { path:"/metrics", label:"Metrics",       emoji:"📊" },
  { path:"/habits",  label:"Habits",        emoji:"🔥" },
];

export const Sidebar = ({ open, onClose }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const [collapsed, setCollapsed] = useState(false);

  const go = (path) => { navigate(path); if (onClose) onClose(); };

  return (
    <div style={{
      width: collapsed ? 58 : 220,
      minWidth: collapsed ? 58 : 220,
      height: "100vh",
      background: "var(--bg-surface)",
      borderRight: "1px solid var(--border-subtle)",
      display: "flex", flexDirection: "column",
      transition: "width 0.2s ease, min-width 0.2s ease",
      overflow: "hidden", flexShrink: 0,
    }}>
      <div style={{
        display: "flex", alignItems: "center",
        justifyContent: collapsed ? "center" : "space-between",
        padding: collapsed ? "14px 0" : "14px 14px",
        borderBottom: "1px solid var(--border-subtle)",
        minHeight: 56, gap: 8,
      }}>
        {!collapsed && (
          <div style={{ display:"flex", alignItems:"center", gap:9 }}>
            <div style={{
              width:30, height:30, borderRadius:8,
              background:"var(--accent-blue)",
              display:"flex", alignItems:"center", justifyContent:"center",
              fontSize:16, fontWeight:800, color:"#fff",
            }}>F</div>
            <span style={{ fontSize:15, fontWeight:700, color:"var(--text-primary)", letterSpacing:"-0.3px" }}>
              Founder
            </span>
          </div>
        )}
        {collapsed && (
          <div style={{
            width:30, height:30, borderRadius:8,
            background:"var(--accent-blue)",
            display:"flex", alignItems:"center", justifyContent:"center",
            fontSize:16, fontWeight:800, color:"#fff",
          }}>F</div>
        )}
        <button onClick={() => setCollapsed(c => !c)} style={{
          width:26, height:26, borderRadius:6, flexShrink:0,
          background:"transparent", border:"1px solid var(--border-default)",
          color:"var(--text-muted)", cursor:"pointer",
          display:"flex", alignItems:"center", justifyContent:"center",
          fontSize:12, lineHeight:1, fontFamily:"Inter, sans-serif",
        }}>{collapsed ? ">" : "<"}</button>
      </div>

      <nav style={{ flex:1, padding:"10px 8px", display:"flex", flexDirection:"column", gap:2 }}>
        {NAV.map(item => {
          const active = location.pathname === item.path ||
                         (item.path === "/day" && location.pathname === "/");
          return (
            <button key={item.path}
              onClick={() => go(item.path)}
              title={collapsed ? item.label : ""}
              style={{
                display:"flex", alignItems:"center",
                gap: collapsed ? 0 : 10,
                justifyContent: collapsed ? "center" : "flex-start",
                padding: collapsed ? "10px 0" : "10px 12px",
                width:"100%", borderRadius:8,
                border:"1px solid " + (active ? "var(--border-default)" : "transparent"),
                background: active ? "var(--bg-active)" : "transparent",
                color: active ? "var(--text-primary)" : "var(--text-muted)",
                fontSize:14, fontWeight: active ? 600 : 400,
                fontFamily:"Inter, sans-serif",
                cursor:"pointer", transition:"all 0.12s",
                textAlign:"left", whiteSpace:"nowrap",
              }}
              onMouseEnter={e => { if (!active) { e.currentTarget.style.background="var(--bg-elevated)"; e.currentTarget.style.color="var(--text-secondary)"; }}}
              onMouseLeave={e => { if (!active) { e.currentTarget.style.background="transparent"; e.currentTarget.style.color="var(--text-muted)"; }}}
            >
              <span style={{ fontSize:17, flexShrink:0, lineHeight:1, width:22, textAlign:"center" }}>{item.emoji}</span>
              {!collapsed && <span style={{ overflow:"hidden", textOverflow:"ellipsis" }}>{item.label}</span>}
            </button>
          );
        })}
      </nav>

      {!collapsed && (
        <div style={{ padding:"12px 14px", borderTop:"1px solid var(--border-subtle)" }}>
          <p style={{ fontSize:11, color:"var(--text-disabled)", fontFamily:"Inter, sans-serif" }}>Founder Planner v1</p>
        </div>
      )}
    </div>
  );
};