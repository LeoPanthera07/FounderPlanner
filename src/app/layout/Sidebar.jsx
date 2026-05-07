import { NavLink } from 'react-router-dom';

const NAV = [
  { to:'/year',    icon:'🎯', label:'Year'    },
  { to:'/month',   icon:'📅', label:'Month'   },
  { to:'/week',    icon:'📋', label:'Week'    },
  { to:'/day',     icon:'⚡', label:'Day'     },
  { to:'/habits',  icon:'🔥', label:'Habits'  },
  { to:'/metrics', icon:'📊', label:'Metrics' },
  { to:'/reviews', icon:'🔄', label:'Reviews' },
];

export const Sidebar = ({ open, onClose }) => (
  <>
    {open && <div style={{ position:'fixed',inset:0,background:'rgba(0,0,0,0.7)',zIndex:20 }} onClick={onClose} />}
    <aside style={{
      position: window.innerWidth >= 1024 ? 'sticky' : 'fixed',
      top: 0, left: 0, height: '100vh', width: 200,
      background: 'var(--bg-surface)', borderRight: '1px solid var(--border-subtle)',
      display: 'flex', flexDirection: 'column', zIndex: 30, flexShrink: 0,
      transform: open || window.innerWidth >= 1024 ? 'translateX(0)' : 'translateX(-100%)',
      transition: 'transform 0.25s ease',
    }}>
      <div style={{ padding:'16px 14px 14px', borderBottom:'1px solid var(--border-subtle)' }}>
        <p style={{ fontSize:13, fontWeight:600, color:'var(--text-primary)' }}>Founder Planner</p>
        <p style={{ fontSize:11, color:'var(--text-disabled)', marginTop:2 }}>
          {new Date().getFullYear()}
        </p>
      </div>
      <nav style={{ flex:1, padding:'8px 8px', display:'flex', flexDirection:'column', gap:2, overflowY:'auto' }}>
        {NAV.map(({ to, icon, label }) => (
          <NavLink key={to} to={to} onClick={onClose}
            className={({ isActive }) => `sidebar-item ${isActive ? 'active' : ''}`}>
            <span style={{ fontSize:15, width:18, textAlign:'center', flexShrink:0 }}>{icon}</span>
            <span>{label}</span>
          </NavLink>
        ))}
      </nav>
      <div style={{ padding:'12px 14px', borderTop:'1px solid var(--border-subtle)' }}>
        <div style={{ display:'flex', alignItems:'center', gap:8 }}>
          <div style={{ width:24, height:24, borderRadius:6, background:'var(--accent-blue-bg)', border:'1px solid rgba(79,142,247,0.3)', display:'flex', alignItems:'center', justifyContent:'center', fontSize:11, fontWeight:700, color:'var(--accent-blue)' }}>F</div>
          <span style={{ fontSize:11, color:'var(--text-disabled)' }}>Founder Mode</span>
        </div>
      </div>
    </aside>
  </>
);
