import { useState } from 'react';
import { BLOCK_MODES, BLOCK_MODE_COLORS } from '../../utils/bucketUtils';
import { PlannerCard } from '../../components/cards/PlannerCard';

const ROUTINE_PRESETS = [
  { name: 'Wake + Hydrate + Plan',     mode: 'Wake Prep',        startTime: '05:30', endTime: '06:00' },
  { name: 'Meditation / Affirmation',  mode: 'Recovery / Sleep', startTime: '06:00', endTime: '06:20' },
  { name: 'Movement / Workout',        mode: 'Recovery / Sleep', startTime: '06:20', endTime: '07:00' },
  { name: 'Deep Work Block 1',         mode: 'Deep Work',        startTime: '07:00', endTime: '09:00' },
  { name: 'Comms Batch',               mode: 'Comms',            startTime: '09:00', endTime: '09:30' },
  { name: 'Deep Work Block 2',         mode: 'Deep Work',        startTime: '10:00', endTime: '12:00' },
  { name: 'Lunch + Rest',              mode: 'Lunch',            startTime: '12:00', endTime: '13:00' },
  { name: 'Learning Block',            mode: 'Learning',         startTime: '13:00', endTime: '14:00' },
  { name: 'Admin + Shallow Tasks',     mode: 'Admin / Shallow',  startTime: '14:00', endTime: '15:30' },
  { name: 'Evening Review + Shutdown', mode: 'Evening Shutdown', startTime: '21:00', endTime: '21:30' },
  { name: 'Wind-Down (No Screens)',    mode: 'Recovery / Sleep', startTime: '21:30', endTime: '22:00' },
];

const EMPTY_BLOCK = {
  id: null, name: '', mode: 'Deep Work',
  startTime: '09:00', endTime: '10:00',
  intent: '', done: false, rating: 0, notes: '',
};

const RATING_LABELS = ['—', '😞', '😐', '🙂', '😊', '🌟'];

const HOUR_HEIGHT = 56;
const DAY_START   = 0;
const DAY_END     = 24;
const TOTAL_HOURS = DAY_END - DAY_START;

const isValidTime = (t) => typeof t === 'string' && /^\d{2}:\d{2}$/.test(t);

const timeToMin = (t) => {
  if (!isValidTime(t)) return 0;
  const [h, m] = t.split(':').map(Number);
  return h * 60 + m;
};

const duration = (start, end) => {
  if (!isValidTime(start) || !isValidTime(end)) return '';
  const diff = timeToMin(end) - timeToMin(start);
  if (diff <= 0) return '';
  const h = Math.floor(diff / 60);
  const m = diff % 60;
  return h > 0 ? (m > 0 ? `${h}h ${m}m` : `${h}h`) : `${m}m`;
};

const fmt12 = (t) => {
  if (!isValidTime(t)) return t;
  const [h, m] = t.split(':').map(Number);
  const ampm = h >= 12 ? 'pm' : 'am';
  const h12  = h % 12 || 12;
  return m === 0 ? `${h12}${ampm}` : `${h12}:${String(m).padStart(2,'0')}${ampm}`;
};

const blockTop = (startTime) => {
  if (!isValidTime(startTime)) return 0;
  return Math.max(0, (timeToMin(startTime) / 60) * HOUR_HEIGHT);
};

const blockHeight = (startTime, endTime) => {
  if (!isValidTime(startTime) || !isValidTime(endTime)) return 40;
  const diff = timeToMin(endTime) - timeToMin(startTime);
  return Math.max((diff / 60) * HOUR_HEIGHT, 36);
};

const sanitizeBlock = (b) => ({
  ...EMPTY_BLOCK, ...b,
  startTime: isValidTime(b?.startTime) ? b.startTime : '09:00',
  endTime:   isValidTime(b?.endTime)   ? b.endTime   : '10:00',
  id:        b?.id ?? Date.now() + Math.random(),
});

// Extract bg color from tailwind class string for consistent theming
const getBgOnly = (colorClass) => {
  const bg = colorClass?.split(' ').find(c => c.startsWith('bg-'));
  return bg || 'bg-blue-600';
};

// Lighter tinted background for expanded panel — same hue, white tint
const PANEL_TINTS = {
  'bg-blue-600':   'bg-blue-50  border-blue-200',
  'bg-teal-600':   'bg-teal-50  border-teal-200',
  'bg-amber-500':  'bg-amber-50 border-amber-200',
  'bg-slate-400':  'bg-slate-50 border-slate-200',
  'bg-purple-400': 'bg-purple-50 border-purple-200',
  'bg-orange-400': 'bg-orange-50 border-orange-200',
  'bg-red-400':    'bg-red-50   border-red-200',
  'bg-green-400':  'bg-green-50 border-green-200',
  'bg-green-600':  'bg-green-50 border-green-200',
  'bg-slate-600':  'bg-slate-50 border-slate-200',
  'bg-yellow-400': 'bg-yellow-50 border-yellow-200',
  'bg-indigo-400': 'bg-indigo-50 border-indigo-200',
};

const getPanelTint = (modeColor) => {
  const bg = getBgOnly(modeColor);
  return PANEL_TINTS[bg] || 'bg-slate-50 border-slate-200';
};

export const HourlySchedule = ({ schedule = [], onUpdate }) => {
  const safeBlocks = (Array.isArray(schedule) ? schedule : [])
    .filter(b => b && b.name && b.name.trim() !== '')
    .map(sanitizeBlock);

  const [blocks, setBlocks]           = useState(safeBlocks);
  const [editing, setEditing]         = useState(null);
  const [showForm, setShowForm]       = useState(false);
  const [form, setForm]               = useState({ ...EMPTY_BLOCK });
  const [showPresets, setShowPresets] = useState(false);

  const save = (updated) => {
    const clean  = updated.filter(b => b && b.name && b.name.trim() !== '');
    const sorted = [...clean].sort((a, b) => timeToMin(a.startTime) - timeToMin(b.startTime));
    setBlocks(sorted);
    onUpdate(sorted);
  };

  const addBlock = () => {
    if (!form.name.trim()) return;
    save([...blocks, { ...form, id: Date.now() }]);
    setForm({ ...EMPTY_BLOCK });
    setShowForm(false);
  };

  const updateBlock = (id, key, value) => {
    setBlocks(prev => {
      const updated = prev.map(b => b.id === id ? { ...b, [key]: value } : b);
      const sorted  = [...updated].sort((a, b) => timeToMin(a.startTime) - timeToMin(b.startTime));
      onUpdate(sorted);
      return sorted;
    });
  };

  const deleteBlock = (id) => {
    setBlocks(prev => {
      const updated = prev.filter(b => b.id !== id);
      onUpdate(updated);
      return updated;
    });
    setEditing(null);
  };

  const loadPreset = () => {
    const preset = ROUTINE_PRESETS.map(p => sanitizeBlock({ ...p, id: Date.now() + Math.random() }));
    save(preset);
    setShowPresets(false);
  };

  const hours     = Array.from({ length: TOTAL_HOURS }, (_, i) => i);
  const completed = blocks.filter(b => b.done).length;

  return (
    <PlannerCard title="Daily Schedule" subtitle="Design your day — Google Calendar style">

      {/* Header */}
      <div className="flex items-center justify-between flex-wrap gap-2 mb-4">
        <div className="flex items-center gap-3">
          <span className="text-xs text-slate-500">{blocks.length} blocks</span>
          {blocks.length > 0 && (
            <>
              <span className="text-xs text-green-600 font-semibold">{completed}/{blocks.length} done</span>
              <div className="w-24 h-1.5 bg-slate-200 rounded-full overflow-hidden">
                <div className="h-full bg-green-500 rounded-full transition-all"
                  style={{ width: `${blocks.length ? (completed / blocks.length) * 100 : 0}%` }} />
              </div>
            </>
          )}
        </div>
        <div className="flex gap-2">
          {blocks.length === 0 && (
            <button onClick={() => setShowPresets(true)}
              className="px-3 py-1.5 text-xs border border-teal-300 text-teal-700 bg-teal-50 rounded-lg hover:bg-teal-100 font-semibold transition">
              Load Routine Template
            </button>
          )}
          <button onClick={() => { setForm({ ...EMPTY_BLOCK }); setShowForm(s => !s); setEditing(null); }}
            className="px-3 py-1.5 text-xs bg-[#1e3a5f] text-white rounded-lg hover:bg-[#16304f] font-semibold transition">
            {showForm ? 'Cancel' : '+ Add Block'}
          </button>
        </div>
      </div>

      {/* Preset confirm */}
      {showPresets && (
        <div className="mb-4 p-3 bg-teal-50 border border-teal-200 rounded-lg flex items-center justify-between gap-3 flex-wrap">
          <p className="text-sm text-teal-800">Load default founder routine? (11 blocks, 5:30am – 10pm)</p>
          <div className="flex gap-2">
            <button onClick={loadPreset}
              className="px-3 py-1.5 bg-teal-600 text-white text-xs font-semibold rounded-lg hover:bg-teal-700 transition">
              Yes, load it
            </button>
            <button onClick={() => setShowPresets(false)}
              className="px-3 py-1.5 border border-slate-300 text-slate-600 text-xs rounded-lg hover:bg-slate-50 transition">
              Cancel
            </button>
          </div>
        </div>
      )}

      {/* Add block form */}
      {showForm && (
        <div className="mb-4 p-4 bg-slate-50 border border-slate-200 rounded-xl flex flex-col gap-3">
          <p className="text-xs font-bold text-slate-500 uppercase tracking-wide">New Time Block</p>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
            <div className="col-span-2">
              <label className="text-xs text-slate-400 font-semibold block mb-1">Block Name</label>
              <input value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })}
                placeholder="e.g. Deep Work — Feature X"
                className="w-full px-3 py-2 text-sm border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400" />
            </div>
            <div>
              <label className="text-xs text-slate-400 font-semibold block mb-1">Start</label>
              <input type="time" value={form.startTime}
                onChange={(e) => setForm({ ...form, startTime: e.target.value })}
                className="w-full px-3 py-2 text-sm border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400" />
            </div>
            <div>
              <label className="text-xs text-slate-400 font-semibold block mb-1">End</label>
              <input type="time" value={form.endTime}
                onChange={(e) => setForm({ ...form, endTime: e.target.value })}
                className="w-full px-3 py-2 text-sm border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400" />
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
            <div>
              <label className="text-xs text-slate-400 font-semibold block mb-1">Mode</label>
              <select value={form.mode} onChange={(e) => setForm({ ...form, mode: e.target.value })}
                className={`w-full px-3 py-2 text-sm rounded-lg border-0 font-semibold focus:outline-none ${BLOCK_MODE_COLORS[form.mode] || 'bg-slate-100 text-slate-600'}`}>
                {BLOCK_MODES.map(m => <option key={m}>{m}</option>)}
              </select>
            </div>
            <div>
              <label className="text-xs text-slate-400 font-semibold block mb-1">Exact Intent</label>
              <input value={form.intent} onChange={(e) => setForm({ ...form, intent: e.target.value })}
                placeholder="What exactly will you accomplish?"
                className="w-full px-3 py-2 text-sm border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400" />
            </div>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-xs text-slate-400">
              Duration: <strong>{duration(form.startTime, form.endTime) || '—'}</strong>
            </span>
            <button onClick={addBlock}
              className="px-4 py-2 bg-[#1e3a5f] text-white text-sm font-semibold rounded-lg hover:bg-[#16304f] transition">
              Add Block
            </button>
          </div>
        </div>
      )}

      {/* Calendar */}
      {blocks.length === 0 ? (
        <div className="text-center py-16 text-slate-400">
          <p className="text-4xl mb-3">📅</p>
          <p className="font-semibold text-slate-500">No blocks scheduled yet</p>
          <p className="text-sm mt-1">Add a block above or load the default routine template</p>
        </div>
      ) : (
        <div className="border border-slate-100 rounded-xl overflow-hidden">
          <div className="overflow-y-auto" style={{ maxHeight: '640px' }}>
            <div className="relative flex">

              {/* Hour labels */}
              <div className="flex-shrink-0 w-16 bg-white z-10"
                style={{ height: `${TOTAL_HOURS * HOUR_HEIGHT}px` }}>
                {hours.map(h => (
                  <div key={h} className="absolute w-16 flex items-start justify-end pr-3"
                    style={{ top: `${h * HOUR_HEIGHT}px`, height: `${HOUR_HEIGHT}px` }}>
                    <span className="text-[11px] font-medium text-slate-300 leading-none pt-1.5 select-none">
                      {fmt12(`${String(h).padStart(2,'0')}:00`)}
                    </span>
                  </div>
                ))}
              </div>

              {/* Grid */}
              <div className="flex-1 relative border-l border-slate-100"
                style={{ height: `${TOTAL_HOURS * HOUR_HEIGHT}px` }}>
                {hours.map(h => (
                  <div key={h} className="absolute w-full border-t border-slate-100"
                    style={{ top: `${h * HOUR_HEIGHT}px` }} />
                ))}
                {hours.map(h => (
                  <div key={`d-${h}`} className="absolute w-full border-t border-dashed border-slate-50"
                    style={{ top: `${h * HOUR_HEIGHT + HOUR_HEIGHT / 2}px` }} />
                ))}

                {/* Blocks */}
                {blocks.map((block) => {
                  const top        = blockTop(block.startTime);
                  const height     = blockHeight(block.startTime, block.endTime);
                  const isOpen     = editing === block.id;
                  const modeColor  = BLOCK_MODE_COLORS[block.mode] || 'bg-blue-600 text-white';
                  const panelTint  = getPanelTint(modeColor);

                  return (
                    <div key={block.id}
                      className={`absolute left-1 right-1 rounded-lg overflow-visible transition-all
                        ${isOpen ? 'z-20 shadow-xl' : 'z-10 shadow-sm hover:shadow-md'}`}
                      style={{ top: `${top}px`, minHeight: `${height}px` }}>

                      {/* ── Collapsed block: full color, no white ── */}
                      {!isOpen && (
                        <div
                          className={`${modeColor} rounded-lg px-2.5 py-1.5 h-full flex flex-col justify-between cursor-pointer select-none
                            ${block.done ? 'brightness-75 saturate-50' : 'hover:brightness-110'} transition-all`}
                          style={{ minHeight: `${height}px` }}
                          onClick={() => setEditing(block.id)}>
                          <div className="flex items-start gap-2">
                            <button
                              onClick={(e) => { e.stopPropagation(); updateBlock(block.id, 'done', !block.done); }}
                              className={`mt-0.5 w-4 h-4 rounded-full border-2 flex-shrink-0 flex items-center justify-center text-[10px] font-bold transition
                                ${block.done ? 'bg-white/50 border-white text-white' : 'border-white/50 text-transparent hover:bg-white/20'}`}>
                              ✓
                            </button>
                            <div className="flex-1 min-w-0">
                              <div className="flex items-baseline gap-1.5 flex-wrap">
                                <p className={`text-xs font-semibold leading-tight ${block.done ? 'line-through opacity-60' : ''}`}>
                                  {block.name}
                                </p>
                                {block.intent && (
                                  <p className="text-xs opacity-60 leading-tight truncate">
                                    — {block.intent}
                                  </p>
                                )}
                              </div>
                              <p className="text-xs opacity-60 leading-tight mt-0.5">
                                {fmt12(block.startTime)} – {fmt12(block.endTime)}
                                {duration(block.startTime, block.endTime) && ` · ${duration(block.startTime, block.endTime)}`}
                              </p>
                            </div>
                            {block.done && block.rating > 0 && (
                              <span className="text-sm flex-shrink-0 ml-1">{RATING_LABELS[block.rating]}</span>
                            )}
                            {block.done && (
                              <span className="text-xs flex-shrink-0 opacity-70 font-semibold">✓</span>
                            )}
                          </div>
                        </div>
                      )}

                      {/* ── Expanded block: same tinted bg, no white panel ── */}
                      {isOpen && (
                        <div className={`${panelTint} border rounded-lg flex flex-col overflow-hidden shadow-xl`}
                          style={{ position: 'relative', zIndex: 50 }}>
                          {/* Expanded header — full color strip */}
                          <div className={`${modeColor} px-2.5 py-1.5 flex items-center gap-2 cursor-pointer select-none`}
                            onClick={() => setEditing(null)}>
                            <button
                              onClick={(e) => { e.stopPropagation(); updateBlock(block.id, 'done', !block.done); }}
                              className={`w-5 h-5 rounded-full border-2 flex-shrink-0 flex items-center justify-center text-xs font-bold transition
                                ${block.done ? 'bg-white/40 border-white text-white' : 'border-white/50 text-transparent hover:bg-white/20'}`}>
                              ✓
                            </button>
                            <div className="flex-1 min-w-0 flex items-baseline gap-1.5 flex-wrap">
                              <p className={`text-xs font-semibold leading-tight ${block.done ? 'line-through opacity-70' : ''}`}>
                                {block.name || 'Untitled'}
                              </p>
                              {block.intent && (
                                <p className="text-xs opacity-60 leading-tight truncate">— {block.intent}</p>
                              )}
                            </div>
                            <span className="text-xs opacity-50 ml-1">▲</span>
                          </div>

                          {/* Edit fields — tinted bg matching block color */}
                          <div className="p-3 flex flex-col gap-2.5">
                            <div className="grid grid-cols-2 gap-2">
                              <div>
                                <label className="text-xs text-slate-500 font-semibold block mb-1">Name</label>
                                <input value={block.name}
                                  onChange={(e) => updateBlock(block.id, 'name', e.target.value)}
                                  className="w-full px-2 py-1.5 text-xs border border-slate-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-blue-400 bg-white" />
                              </div>
                              <div>
                                <label className="text-xs text-slate-500 font-semibold block mb-1">Mode</label>
                                <select value={block.mode}
                                  onChange={(e) => updateBlock(block.id, 'mode', e.target.value)}
                                  className={`w-full px-2 py-1.5 text-xs rounded-lg border-0 font-semibold focus:outline-none ${BLOCK_MODE_COLORS[block.mode] || 'bg-slate-100 text-slate-700'}`}>
                                  {BLOCK_MODES.map(m => <option key={m}>{m}</option>)}
                                </select>
                              </div>
                            </div>
                            <div className="grid grid-cols-2 gap-2">
                              <div>
                                <label className="text-xs text-slate-500 font-semibold block mb-1">Start</label>
                                <input type="time" value={block.startTime}
                                  onChange={(e) => updateBlock(block.id, 'startTime', e.target.value)}
                                  className="w-full px-2 py-1.5 text-xs border border-slate-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-blue-400 bg-white" />
                              </div>
                              <div>
                                <label className="text-xs text-slate-500 font-semibold block mb-1">End</label>
                                <input type="time" value={block.endTime}
                                  onChange={(e) => updateBlock(block.id, 'endTime', e.target.value)}
                                  className="w-full px-2 py-1.5 text-xs border border-slate-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-blue-400 bg-white" />
                              </div>
                            </div>
                            <div>
                              <label className="text-xs text-slate-500 font-semibold block mb-1">Exact Intent</label>
                              <input value={block.intent}
                                onChange={(e) => updateBlock(block.id, 'intent', e.target.value)}
                                placeholder="What exactly will you accomplish?"
                                className="w-full px-2 py-1.5 text-xs border border-slate-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-blue-400 bg-white" />
                            </div>
                            {block.done && (
                              <div>
                                <label className="text-xs text-slate-500 font-semibold block mb-2">Rate this block</label>
                                <div className="flex gap-3">
                                  {RATING_LABELS.slice(1).map((emoji, i) => (
                                    <button key={i}
                                      onClick={() => updateBlock(block.id, 'rating', i + 1)}
                                      className={`text-xl transition-transform hover:scale-125 ${block.rating === i + 1 ? 'scale-125' : 'opacity-40'}`}>
                                      {emoji}
                                    </button>
                                  ))}
                                </div>
                              </div>
                            )}
                            <div>
                              <label className="text-xs text-slate-500 font-semibold block mb-1">Notes</label>
                              <textarea value={block.notes}
                                onChange={(e) => updateBlock(block.id, 'notes', e.target.value)}
                                rows={2} placeholder="Any notes for this block..."
                                className="w-full px-2 py-1.5 text-xs border border-slate-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-blue-400 resize-none bg-white" />
                            </div>
                            <div className="flex justify-between items-center pt-1 border-t border-slate-200 mt-1">
                              <span className="text-xs text-slate-400">
                                Duration: <strong className="text-slate-600">{duration(block.startTime, block.endTime) || '—'}</strong>
                              </span>
                              <button
                                onClick={(e) => { e.stopPropagation(); deleteBlock(block.id); }}
                                className="text-xs text-red-500 hover:text-red-700 font-semibold transition px-2 py-1 rounded hover:bg-red-100">
                                🗑 Delete block
                              </button>
                            </div>
                          </div>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      )}
    </PlannerCard>
  );
};
