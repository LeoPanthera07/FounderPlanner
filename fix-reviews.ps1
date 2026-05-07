Set-Content "src/features/reviews/ReviewsPage.jsx" @'
import { useEffect, useState } from 'react';
import { useReviewsStore } from './reviewsStore';
import { AutoTextarea } from '../../components/forms/Auto';

const Section = ({ title, hint, children }) => (
  <div className="card">
    <div style={{ marginBottom: 16 }}>
      <p className="section-title">{title}</p>
      {hint && <p className="helper-text" style={{ marginTop: 4 }}>{hint}</p>}
    </div>
    {children}
  </div>
);

const Field = ({ label, children }) => (
  <div>
    <label className="field-label">{label}</label>
    {children}
  </div>
);

export const ReviewsPage = () => {
  const [tab, setTab] = useState('weekly');
  const { review, loading, loadReview, updateField } = useReviewsStore();

  useEffect(() => { loadReview(tab); }, [tab]);

  if (loading || !review) return (
    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: 200 }}>
      <div style={{ width: 24, height: 24, border: '2px solid var(--border-strong)', borderTopColor: 'var(--accent-blue)', borderRadius: '50%', animation: 'spin 0.7s linear infinite' }} />
    </div>
  );

  return (
    <div style={{ maxWidth: 760, margin: '0 auto', display: 'flex', flexDirection: 'column', gap: 24 }}>

      <div>
        <h1 className="page-title">Reviews</h1>
        <p className="page-subtitle">Weekly · Monthly retrospectives</p>
      </div>

      {/* Tab switcher */}
      <div style={{ display: 'flex', gap: 4, padding: 4, background: 'var(--bg-surface)', border: '1px solid var(--border-subtle)', borderRadius: 10, width: 'fit-content' }}>
        {[['weekly', 'Weekly'], ['monthly', 'Monthly']].map(([k, l]) => (
          <button key={k} onClick={() => setTab(k)} style={{
            padding: '7px 20px', borderRadius: 7, border: 'none', cursor: 'pointer',
            fontSize: 13, fontWeight: 500, transition: 'all 0.15s',
            background: tab === k ? 'var(--bg-active)' : 'transparent',
            color: tab === k ? 'var(--text-primary)' : 'var(--text-muted)',
          }}>{l} Review</button>
        ))}
      </div>

      {/* Core reflection */}
      <Section title={tab === 'weekly' ? 'Weekly Reflection' : 'Monthly Reflection'}
        hint="Complete at the end of the period">
        <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
          {[
            { k: 'win',     l: 'Win',          p: 'The one result that made this period count...' },
            { k: 'drift',   l: 'Anti-Drift',   p: 'Were hours spent or invested? What was the ratio?' },
            { k: 'forward', l: 'Carry Forward', p: 'What must move to next period, and why?' },
          ].map(({ k, l, p }) => (
            <Field key={k} label={l}>
              <AutoTextarea value={review[k] || ''} onChange={v => updateField(k, v)} placeholder={p} minRows={2} />
            </Field>
          ))}
        </div>
      </Section>

      {/* Stop / Start / Continue */}
      <Section title="Stop · Start · Continue">
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 14 }}>
          {[
            { key: 'stop',     label: 'Stop Doing',    placeholder: 'What to stop...'    },
            { key: 'start',    label: 'Start Doing',   placeholder: 'What to start...'   },
            { key: 'continue', label: 'Continue Doing', placeholder: 'What to continue...' },
          ].map(({ key, label, placeholder }) => (
            <div key={key} className="card-inner">
              <label className="field-label" style={{ marginBottom: 10 }}>{label}</label>
              <AutoTextarea value={review[key] || ''} onChange={v => updateField(key, v)}
                placeholder={placeholder} minRows={4} />
            </div>
          ))}
        </div>
      </Section>

      {/* Lesson + Next Focus */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 20 }}>
        <Section title="Key Lesson" hint="Most important insight this period">
          <AutoTextarea value={review.lesson || ''} onChange={v => updateField('lesson', v)}
            placeholder="The most important thing I learned..." minRows={3} />
        </Section>
        <Section title="Next Focus" hint="Top priority going forward">
          <AutoTextarea value={review.nextFocus || ''} onChange={v => updateField('nextFocus', v)}
            placeholder="Next period I must prioritise..." minRows={3} />
        </Section>
      </div>

    </div>
  );
};
'@

Write-Host "ReviewsPage.jsx written cleanly!" -ForegroundColor Green