export default function Education() {
  return (
    <section id="education" className="mm-section" style={{ padding: '84px 0', borderTop: '1px solid var(--line)' }}>
      <div className="mm-2col" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 28 }}>
        {/* Education */}
        <div className="reveal">
          <div style={{ display: 'flex', alignItems: 'baseline', gap: 14, marginBottom: 28 }}>
            <span style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: 12, color: 'var(--accent)' }}>06</span>
            <h2 data-reactive style={{ fontWeight: 600, fontSize: 'clamp(24px,2.6vw,32px)', letterSpacing: '-.02em', margin: 0 }}>Education</h2>
          </div>
          <div className="mm-card" style={{ border: '1px solid var(--line)', borderRadius: 14, padding: 26 }}>
            <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: 16 }}>
              <div>
                <h3 style={{ fontWeight: 600, fontSize: 20, margin: '0 0 6px' }}>MVJ College of Engineering</h3>
                <div style={{ fontSize: 15, color: 'var(--text2)' }}>Bachelor of Engineering</div>
                <div style={{ fontSize: 15, color: 'var(--text2)' }}>Electronics & Communication</div>
              </div>
              <span style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: 12, color: 'var(--text3)', whiteSpace: 'nowrap' }}>2018 – 2022</span>
            </div>
          </div>
        </div>

        {/* Publication */}
        <div className="reveal">
          <div style={{ display: 'flex', alignItems: 'baseline', gap: 14, marginBottom: 28 }}>
            <span style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: 12, color: 'var(--accent)' }}>07</span>
            <h2 data-reactive style={{ fontWeight: 600, fontSize: 'clamp(24px,2.6vw,32px)', letterSpacing: '-.02em', margin: 0 }}>Publication</h2>
          </div>
          <a
            className="mm-card"
            href="https://ieeexplore.ieee.org/document/10592676"
            target="_blank"
            rel="noopener"
            style={{ display: 'block', textDecoration: 'none', border: '1px solid var(--line)', borderRadius: 14, padding: 26 }}
          >
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 14 }}>
              <span style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: 11, letterSpacing: '.14em', color: 'var(--accent)', border: '1px solid var(--accent)', borderRadius: 5, padding: '5px 10px' }}>IEEE</span>
              <span style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: 11, color: 'var(--text3)' }}>View on IEEE Xplore ↗</span>
            </div>
            <h3 style={{ fontWeight: 600, fontSize: 19, lineHeight: 1.3, margin: '0 0 12px', color: 'var(--text)' }}>
              Design and Analysis of APB and AHB Lite Protocol
            </h3>
            <div style={{ fontSize: 13.5, lineHeight: 1.6, color: 'var(--text2)' }}>
              I. Hameem Shanavas · P. Akhil Reddy · <span style={{ color: 'var(--text)' }}>Milan M Baburaj</span> · N. Chaitanya Krishna · Nithin S
            </div>
          </a>
        </div>
      </div>
    </section>
  )
}
