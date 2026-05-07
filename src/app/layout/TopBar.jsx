import { useLocation } from 'react-router-dom';
import { getTodayString, formatDate } from '../../utils/dateUtils';

const META = {
  '/year':    { title:'Year Plan',      icon:'🎯' },
  '/month':   { title:'Month Plan',     icon:'📅' },
  '/week':    { title:'Week Plan',      icon:'📋' },
  '/day':     { title:'Daily Command',  icon:'⚡' },
  '/habits':  { title:'Habits',         icon:'🔥' },
  '/metrics': { title:'Metrics',        icon:'📊' },
  '/reviews': { title:'Reviews',        icon:'🔄' },
};

export const TopBar = ({ onMenuClick }) => {
  const { pathname } = useLocation();
  const m = META[pathname] || { title:'Planner', icon:'📌' };
  return (
    <header style={{ height:48, background:'var(--bg-surface)', borderBottom:'1px solid var(--border-subtle)', display:'flex', alignItems:'center', justifyContent:'space-between', padding:'0 20px', flexShrink:0 }}>
      <div style={{ display:'flex', alignItems:'center', gap:10 }}>
        <button onClick={onMenuClick} className="btn btn-ghost" style={{ display:'none' }}>☰</button>
        <span style={{ fontSize:16 }}>{m.icon}</span>
        <span style={{ fontSize:14, fontWeight:500, color:'var(--text-primary)' }}>{m.title}</span>
      </div>
      <span style={{ fontSize:12, color:'var(--text-disabled)' }}>{formatDate(getTodayString())}</span>
    </header>
  );
};
