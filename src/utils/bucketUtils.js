export const BUCKETS = ['Build', 'Learn', 'Operate', 'Live'];

export const BUCKET_COLORS = {
  Build:   { bg: 'bg-blue-100',   text: 'text-blue-800',   border: 'border-blue-300',   dot: 'bg-blue-500'   },
  Learn:   { bg: 'bg-teal-100',   text: 'text-teal-800',   border: 'border-teal-300',   dot: 'bg-teal-500'   },
  Operate: { bg: 'bg-amber-100',  text: 'text-amber-800',  border: 'border-amber-300',  dot: 'bg-amber-500'  },
  Live:    { bg: 'bg-green-100',  text: 'text-green-800',  border: 'border-green-300',  dot: 'bg-green-500'  },
};

export const BLOCK_MODE_COLORS = {
  'Deep Work':         'bg-blue-600 text-white',
  'Learning':          'bg-teal-600 text-white',
  'Admin / Shallow':   'bg-amber-500 text-white',
  'Recovery / Sleep':  'bg-slate-400 text-white',
  'Buffer / Flexible': 'bg-purple-400 text-white',
  'Comms':             'bg-orange-400 text-white',
  'Meetings':          'bg-red-400 text-white',
  'Lunch':             'bg-green-400 text-white',
  'Dinner':            'bg-green-600 text-white',
  'Sleep':             'bg-slate-600 text-white',
  'Wake Prep':         'bg-yellow-400 text-slate-800',
  'Evening Shutdown':  'bg-indigo-400 text-white',
  'Buffer':            'bg-purple-300 text-white',
};

export const BLOCK_MODES = Object.keys(BLOCK_MODE_COLORS);

export const getBucketColor = (bucket) =>
  BUCKET_COLORS[bucket] || { bg: 'bg-gray-100', text: 'text-gray-800', border: 'border-gray-300', dot: 'bg-gray-400' };

export const PRIORITY_LEVELS = ['Must Win', 'Should Do', 'Can Do'];

export const CARRY_DECISIONS = ['carry', 'delete', 'delegate', 'defer'];

export const ENERGY_LEVELS = ['High', 'Medium', 'Low'];