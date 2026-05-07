import { useState } from 'react';

// A tag-input that renders entries as removable chips below
export const ChipList = ({ items = [], onChange, placeholder = 'Type and press Enter...' }) => {
  const [val, setVal] = useState('');
  const add = () => {
    const t = val.trim();
    if (!t) return;
    onChange([...items, t]);
    setVal('');
  };
  return (
    <div>
      <div style={{ display:'flex', gap:8 }}>
        <input
          value={val}
          onChange={e => setVal(e.target.value)}
          onKeyDown={e => { if (e.key === 'Enter') { e.preventDefault(); add(); } }}
          placeholder={placeholder}
          className="fp-input"
          style={{ flex:1 }}
        />
        <button className="btn" onClick={add} style={{ flexShrink:0 }}>Add</button>
      </div>
      {items.length > 0 && (
        <div style={{ display:'flex', flexWrap:'wrap', gap:6, marginTop:10 }}>
          {items.map((item, i) => (
            <div key={i} style={{
              display:'inline-flex', alignItems:'center', gap:6,
              padding:'5px 10px', borderRadius:6,
              background:'var(--bg-elevated)', border:'1px solid var(--border-default)',
              fontSize:12, color:'var(--text-secondary)'
            }}>
              <span>{item}</span>
              <button onClick={() => onChange(items.filter((_,j)=>j!==i))}
                style={{ background:'none', border:'none', color:'var(--text-disabled)', cursor:'pointer', fontSize:14, lineHeight:1, padding:'0 0 1px', display:'flex', alignItems:'center' }}>×</button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
