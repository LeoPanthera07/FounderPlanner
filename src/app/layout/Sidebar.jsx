import { NavLink } from 'react-router-dom';

const NAV = [
  { to: '/year',    icon: '🎯', label: 'Year',    sub: 'Vision & Themes'    },
  { to: '/month',   icon: '📅', label: 'Month',   sub: 'Projects & Systems' },
  { to: '/week',    icon: '📋', label: 'Week',    sub: 'Execution Map'      },
  { to: '/day',     icon: '⚡', label: 'Day',     sub: 'Command & Routines' },
  { to: '/habits',  icon: '🔥', label: 'Habits',  sub: 'Daily Streaks'      },
  { to: '/metrics', icon: '📊', label: 'Metrics', sub: 'Scoreboard'         },
  { to: '/reviews', icon: '🔄', label: 'Reviews', sub: 'Retrospectives'     },
];

export const Sidebar = ({ open, onClose }) => (
  <>
    {open && (
      <div className="fixed inset-0 bg-black/40 z-20 lg:hidden" onClick={onClose} />
    )}
    <aside className={`
      fixed top-0 left-0 h-full w-64 bg-[#1e3a5f] z-30 flex flex-col
      transform transition-transform duration-300
      ${open ? 'translate-x-0' : '-translate-x-full'}
      lg:translate-x-0 lg:static lg:z-auto
    `}>
      <div className="px-5 py-6 border-b border-white/10">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-white font-bold text-lg leading-tight">Founder Planner</h1>
            <p className="text-slate-400 text-xs mt-0.5">Build · Learn · Operate · Live</p>
          </div>
          <button onClick={onClose} className="lg:hidden text-slate-400 hover:text-white text-xl">✕</button>
        </div>
      </div>

      <nav className="flex-1 px-3 py-4 flex flex-col gap-1 overflow-y-auto">
        {NAV.map(({ to, icon, label, sub }) => (
          <NavLink
            key={to}
            to={to}
            onClick={onClose}
            className={({ isActive }) =>
              `flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all
               ${isActive
                 ? 'bg-white/15 text-white'
                 : 'text-slate-300 hover:text-white hover:bg-white/10'}`
            }
          >
            <span className="text-xl flex-shrink-0">{icon}</span>
            <div className="min-w-0">
              <p className="text-sm font-semibold leading-tight">{label}</p>
              <p className="text-xs text-slate-400 leading-tight truncate">{sub}</p>
            </div>
          </NavLink>
        ))}
      </nav>

      <div className="px-5 py-4 border-t border-white/10">
        <div className="flex items-center gap-2">
          <div className="w-7 h-7 rounded-full bg-teal-500 flex items-center justify-center text-white text-xs font-bold">F</div>
          <div>
            <p className="text-white text-xs font-semibold">Founder Mode</p>
            <p className="text-slate-400 text-xs">{new Date().getFullYear()}</p>
          </div>
        </div>
      </div>
    </aside>
  </>
);
