const PLACEHOLDERS = [
  "Placeholder recommendation — a colleague's note on working with Milan will appear here.",
  "Placeholder recommendation — space reserved for a teammate's perspective on shipping with Milan.",
  "Placeholder recommendation — a manager's note on impact and ownership will live here.",
]

export default function Testimonials() {
  return (
    <section id="testimonials" style={{ padding: '84px 0', borderTop: '1px solid var(--line)' }}>
      <div style={{ display: 'flex', alignItems: 'baseline', gap: 14, marginBottom: 16 }}>
        <span style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: 12, color: 'var(--accent)' }}>08</span>
        <h2 data-reactive style={{ fontWeight: 600, fontSize: 'clamp(28px,3.4vw,40px)', letterSpacing: '-.02em', margin: 0 }}>Testimonials</h2>
        <div style={{ flex: 1, height: 1, background: 'var(--line)' }} />
      </div>
      <p className="reveal" style={{ fontSize: 14, color: 'var(--text3)', margin: '0 0 36px', fontFamily: "'JetBrains Mono',monospace" }}>
        Recommendations from LinkedIn — coming soon.
      </p>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 20 }}>
        {PLACEHOLDERS.map((quote, i) => (
          <figure key={i} className="mm-card reveal" style={{ margin: 0, border: '1px solid var(--line)', borderRadius: 14, padding: 24, display: 'flex', flexDirection: 'column' }}>
            <blockquote style={{ margin: '0 0 22px', fontSize: 16, lineHeight: 1.55, color: 'var(--text2)', flex: 1 }}>
              "{quote}"
            </blockquote>
            <figcaption style={{ display: 'flex', alignItems: 'center', gap: 13, borderTop: '1px solid var(--line)', paddingTop: 18 }}>
              <span style={{ width: 42, height: 42, borderRadius: '50%', background: 'var(--accent-soft)', border: '1px solid var(--accent)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--accent)', fontWeight: 700, fontSize: 15, flexShrink: 0 }}>—</span>
              <span>
                <span style={{ display: 'block', fontWeight: 600, fontSize: 14, color: 'var(--text)' }}>Name</span>
                <span style={{ display: 'block', fontSize: 12.5, color: 'var(--text3)' }}>Position · Company</span>
              </span>
              <a className="mm-link" href="https://www.linkedin.com/in/milan-m-baburaj/" target="_blank" rel="noopener" style={{ marginLeft: 'auto', fontFamily: "'JetBrains Mono',monospace", fontSize: 10, color: 'var(--text3)' }}>in ↗</a>
            </figcaption>
          </figure>
        ))}
      </div>
    </section>
  )
}
