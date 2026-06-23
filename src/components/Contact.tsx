export default function Contact() {
  return (
    <section id="contact" style={{ padding: '96px 0 60px', borderTop: '1px solid var(--line)' }}>
      <div style={{ display: 'flex', alignItems: 'baseline', gap: 14, marginBottom: 40 }}>
        <span style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: 12, color: 'var(--accent)' }}>09</span>
        <h2 data-reactive style={{ fontWeight: 600, fontSize: 'clamp(28px,3.4vw,40px)', letterSpacing: '-.02em', margin: 0 }}>Contact</h2>
        <div style={{ flex: 1, height: 1, background: 'var(--line)' }} />
      </div>
      <h3 data-reactive style={{ fontWeight: 700, fontSize: 'clamp(40px,6.4vw,84px)', lineHeight: .98, letterSpacing: '-.03em', margin: '0 0 26px' }}>
        Let's build something.
      </h3>
      <p style={{ fontSize: 18, lineHeight: 1.55, color: 'var(--text2)', maxWidth: 560, margin: '0 0 38px' }}>
        Open to <span style={{ color: 'var(--text)' }}>Forward Deployed Engineer</span>, <span style={{ color: 'var(--text)' }}>Agentic AI Engineer</span> and <span style={{ color: 'var(--text)' }}>Full-Stack Engineer</span> roles — and good conversations about ambitious products.
      </p>
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 12 }}>
        <a
          className="mm-btn mm-solid"
          href="mailto:milanm3050@gmail.com"
          style={{ textDecoration: 'none', fontSize: 14, fontWeight: 500, color: 'var(--accent-ink)', background: 'var(--accent)', border: '1px solid var(--accent)', borderRadius: 8, padding: '14px 24px' }}
        >
          milanm3050@gmail.com
        </a>
        <a className="mm-btn mm-ghost" href="https://www.linkedin.com/in/milan-m-baburaj/" target="_blank" rel="noopener" style={{ textDecoration: 'none', fontSize: 14, color: 'var(--text)', border: '1px solid var(--line2)', borderRadius: 8, padding: '14px 24px' }}>LinkedIn ↗</a>
        <a className="mm-btn mm-ghost" href="https://github.com/Milan3050" target="_blank" rel="noopener" style={{ textDecoration: 'none', fontSize: 14, color: 'var(--text)', border: '1px solid var(--line2)', borderRadius: 8, padding: '14px 24px' }}>GitHub ↗</a>
        <a className="mm-btn mm-ghost" href="https://x.com/MilanM_B" target="_blank" rel="noopener" style={{ textDecoration: 'none', fontSize: 14, color: 'var(--text)', border: '1px solid var(--line2)', borderRadius: 8, padding: '14px 24px' }}>X ↗</a>
      </div>
    </section>
  )
}
