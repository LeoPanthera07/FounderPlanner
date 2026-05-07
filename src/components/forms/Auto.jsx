export const AutoTextarea = ({ value, onChange, placeholder, minRows = 1 }) => {
  const handleInput = (e) => {
    e.target.style.height = 'auto';
    e.target.style.height = Math.max(e.target.scrollHeight, minRows * 22) + 'px';
  };
  return (
    <textarea
      value={value || ''}
      onChange={e => onChange(e.target.value)}
      onInput={handleInput}
      onFocus={handleInput}
      placeholder={placeholder}
      rows={minRows}
      className="fp-textarea"
      style={{ minHeight: minRows * 36 }}
    />
  );
};

export const FpInput = ({ value, onChange, placeholder, className = '', style = {} }) => (
  <input value={value||''} onChange={e => onChange(e.target.value)}
    placeholder={placeholder} className={`fp-input ${className}`} style={style} />
);
