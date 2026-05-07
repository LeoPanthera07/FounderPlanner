const DAY_CONFIG = [
  { day:"Monday",    color:"#4f8ef7", bg:"rgba(79,142,247,0.07)",  border:"rgba(79,142,247,0.25)"  },
  { day:"Tuesday",   color:"#42c97a", bg:"rgba(66,201,122,0.07)",  border:"rgba(66,201,122,0.25)"  },
  { day:"Wednesday", color:"#f0a84b", bg:"rgba(240,168,75,0.07)",  border:"rgba(240,168,75,0.25)"  },
  { day:"Thursday",  color:"#e065a0", bg:"rgba(224,101,160,0.07)", border:"rgba(224,101,160,0.25)" },
  { day:"Friday",    color:"#9b73e8", bg:"rgba(155,115,232,0.07)", border:"rgba(155,115,232,0.25)" },
  { day:"Saturday",  color:"#38bdf8", bg:"rgba(56,189,248,0.07)",  border:"rgba(56,189,248,0.25)"  },
  { day:"Sunday",    color:"#fb923c", bg:"rgba(251,146,60,0.07)",  border:"rgba(251,146,60,0.25)"  },
];

const INPUT_STYLE = {
  flex: 1,
  background: "transparent",
  border: "none",
  outline: "none",
  color: "var(--text-primary)",
  fontSize: 14,
  fontFamily: "Inter, sans-serif",
  padding: "0 10px",
  height: "100%",
};

const DIVIDER = {
  width: 1,
  alignSelf: "stretch",
  background: "var(--border-default)",
  opacity: 0.5,
  flexShrink: 0,
};

export const DayThemePlanner = ({ dayThemes = {}, onUpdate }) => {
  return (
    <div className="card">
      <div style={{ marginBottom: 20 }}>
        <p className="section-title">Day Themes</p>
        <p className="helper-text" style={{ marginTop: 4 }}>One focus theme per day</p>
      </div>

      <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
        {DAY_CONFIG.map(({ day, color, bg, border }) => {
          const dt = dayThemes[day] || { theme: "", focusBlock: "", nonNegotiable: "" };
          return (
            <div key={day} style={{
              display: "flex",
              alignItems: "stretch",
              height: 46,
              background: bg,
              border: `1px solid ${border}`,
              borderRadius: 8,
              overflow: "hidden",
            }}>
              {/* Day label */}
              <div style={{
                width: 100,
                display: "flex",
                alignItems: "center",
                paddingLeft: 14,
                flexShrink: 0,
              }}>
                <span style={{
                  fontSize: 13,
                  fontWeight: 700,
                  color: color,
                  fontFamily: "Inter, sans-serif",
                  letterSpacing: "0.01em",
                }}>{day}</span>
              </div>

              <div style={DIVIDER} />

              {/* Theme */}
              <input
                value={dt.theme || ""}
                onChange={e => onUpdate(day, "theme", e.target.value)}
                placeholder="Theme..."
                style={{ ...INPUT_STYLE }}
              />

              <div style={DIVIDER} />

              {/* Focus Block */}
              <input
                value={dt.focusBlock || ""}
                onChange={e => onUpdate(day, "focusBlock", e.target.value)}
                placeholder="Key focus block..."
                style={{ ...INPUT_STYLE }}
              />

              <div style={DIVIDER} />

              {/* Non-Negotiable */}
              <input
                value={dt.nonNegotiable || ""}
                onChange={e => onUpdate(day, "nonNegotiable", e.target.value)}
                placeholder="Non-negotiable..."
                style={{ ...INPUT_STYLE, flex: "0 0 200px" }}
              />
            </div>
          );
        })}
      </div>
    </div>
  );
};