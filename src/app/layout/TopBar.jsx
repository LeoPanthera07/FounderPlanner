import { useLocation } from 'react-router-dom';
import { getTodayString, formatDate } from '../../utils/dateUtils';

const PAGE_META = {
  '/year':    { title: 'Year Plan',      icon: '🎯', color: 'text-blue-600'   },
  '/month':   { title: 'Month Plan',     icon: '📅', color: 'text-teal-600'   },
  '/week':    { title: 'Week Plan',      icon: '📋', color: 'text-amber-600'  },
  '/day':     { title: 'Daily Command',  icon: '⚡', color: 'text-indigo-600' },
  '/habits':  { title: 'Habits',         icon: '🔥', color: 'text-orange-600' },
  '/metrics': { title: 'Metrics',        icon: '📊', color: 'text-purple-600' },
  '/reviews': { title: 'Reviews',        icon: '🔄', color: 'text-green-600'  },
};

export const TopBar = ({ onMenuClick }) => {
  const { pathname } = useLocation();
  const meta = PAGE_META[pathname] || { title: 'Planner', icon: '📌', color: 'text-slate-600' };

  return (
    <header className="h-14 bg-white border-b border-slate-200 flex items-center justify-between px-4 flex-shrink-0 z-10">
      <div className="flex items-center gap-3">
        <button onClick={onMenuClick}
          className="lg:hidden w-9 h-9 flex items-center justify-center rounded-lg hover:bg-slate-100 transition text-slate-600">
          ☰
        </button>
        <div className="flex items-center gap-2">
          <span className="text-xl">{meta.icon}</span>
          <h2 className={`text-base font-bold ${meta.color}`}>{meta.title}</h2>
        </div>
      </div>
      <div className="flex items-center gap-3">
        <span className="text-xs text-slate-400 hidden sm:block">{formatDate(getTodayString())}</span>
        <div className="flex gap-1">
          {['Build','Learn','Operate','Live'].map((b, i) => (
            <span key={b} className={`text-xs px-2 py-0.5 rounded-full font-semibold hidden md:block
              ${['bg-blue-100 text-blue-700','bg-teal-100 text-teal-700','bg-amber-100 text-amber-700','bg-green-100 text-green-700'][i]}`}>
              {b}
            </span>
          ))}
        </div>
      </div>
    </header>
  );
};
