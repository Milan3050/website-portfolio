import { useEffect, useRef } from 'react'

interface Props { onNavigate: (id: string) => void }

function Clock() {
  const ref = useRef<HTMLSpanElement>(null)
  useEffect(() => {
    const tick = () => {
      if (ref.current) {
        ref.current.textContent = new Date().toLocaleTimeString('en-GB', {
          timeZone: 'Asia/Kolkata', hour: '2-digit', minute: '2-digit', second: '2-digit'
        }) + ' IST'
      }
    }
    tick()
    const id = setInterval(tick, 1000)
    return () => clearInterval(id)
  }, [])
  return <span ref={ref} style={{ color: 'var(--accent)', textAlign: 'right' }}>—</span>
}

export default function Hero({ onNavigate }: Props) {
  const gridRef = useRef<HTMLDivElement>(null)
  const cardRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const applyResponsive = () => {
      const w = window.innerWidth
      if (gridRef.current) gridRef.current.style.gridTemplateColumns = w > 920 ? '1.6fr 1fr' : '1fr'
      if (cardRef.current) cardRef.current.style.display = w > 920 ? 'block' : 'none'
    }
    applyResponsive()
    window.addEventListener('resize', applyResponsive)
    return () => window.removeEventListener('resize', applyResponsive)
  }, [])

  return (
    <section id="top" style={{ minHeight: 'calc(100vh - 58px)', display: 'flex', flexDirection: 'column', justifyContent: 'center', padding: '60px 0 70px' }}>
      <div ref={gridRef} style={{ display: 'grid', gridTemplateColumns: '1.6fr 1fr', gap: 56, alignItems: 'center' }}>
        <div>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: 9, fontFamily: "'JetBrains Mono',monospace", fontSize: 12, letterSpacing: '.06em', color: 'var(--text2)', border: '1px solid var(--line2)', borderRadius: 30, padding: '7px 14px', marginBottom: 26 }}>
            <span style={{ width: 7, height: 7, borderRadius: '50%', background: 'var(--good)', animation: 'mmPulse 2.4s ease-in-out infinite' }} />
            Available for new roles · Bengaluru, India
          </div>
          <h1 data-reactive style={{ fontWeight: 700, fontSize: 'clamp(44px,6vw,84px)', lineHeight: .98, letterSpacing: '-.03em', margin: '0 0 24px' }}>
            Milan M Baburaj
          </h1>
          <p style={{ fontSize: 'clamp(19px,2.1vw,26px)', lineHeight: 1.4, color: 'var(--text2)', maxWidth: 640, margin: '0 0 18px', fontWeight: 400 }}>
            I build <span style={{ color: 'var(--text)' }}>AI-native products</span>, <span style={{ color: 'var(--text)' }}>multi-agent systems</span> and full-stack applications — end to end.
          </p>
          <p style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: 13.5, letterSpacing: '.02em', color: 'var(--text3)', margin: '0 0 34px' }}>
            Forward Deployed Engineer · Agentic AI Engineer · Full-Stack Engineer
          </p>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 12 }}>
            <button
              className="mm-btn mm-solid"
              onClick={() => onNavigate('projects')}
              style={{ fontSize: 14, fontWeight: 500, color: 'var(--accent-ink)', background: 'var(--accent)', border: '1px solid var(--accent)', borderRadius: 8, padding: '13px 22px', fontFamily: 'inherit' }}
            >
              View Projects →
            </button>
            <a
              className="mm-btn mm-ghost"
              href="/resume.pdf"
              target="_blank"
              rel="noopener"
              style={{ fontSize: 14, color: 'var(--text)', background: 'transparent', border: '1px solid var(--line2)', borderRadius: 8, padding: '13px 22px', textDecoration: 'none' }}
            >
              View Résumé
            </a>
            <button
              className="mm-btn mm-ghost"
              onClick={() => onNavigate('contact')}
              style={{ fontSize: 14, color: 'var(--text)', background: 'transparent', border: '1px solid var(--line2)', borderRadius: 8, padding: '13px 22px', fontFamily: 'inherit' }}
            >
              Get in touch
            </button>
          </div>
        </div>

        <aside ref={cardRef} style={{ border: '1px solid var(--line)', borderRadius: 12, background: 'var(--panel)', padding: 22, fontFamily: "'JetBrains Mono',monospace", fontSize: 12.5 }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', color: 'var(--text3)', letterSpacing: '.12em', borderBottom: '1px solid var(--line)', paddingBottom: 12, marginBottom: 16, fontSize: 11 }}>
            <span>STATUS</span><span style={{ color: 'var(--good)' }}>● ACTIVE</span>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 13 }}>
            {[
              ['role', 'SWE · RevSure AI'],
              ['focus', 'Agentic AI · Full-stack'],
              ['building', 'Minerva'],
              ['open to', 'FDE · Agentic AI · FS'],
            ].map(([k, v]) => (
              <div key={k} style={{ display: 'flex', justifyContent: 'space-between', gap: 12 }}>
                <span style={{ color: 'var(--text3)' }}>{k}</span>
                <span style={{ color: 'var(--text)', textAlign: 'right' }}>{v}</span>
              </div>
            ))}
            <div style={{ display: 'flex', justifyContent: 'space-between', gap: 12 }}>
              <span style={{ color: 'var(--text3)' }}>local time</span>
              <Clock />
            </div>
          </div>
        </aside>
      </div>

      {/* Trajectory */}
      <div style={{ marginTop: 54, display: 'flex', alignItems: 'center', gap: 14, flexWrap: 'wrap', fontFamily: "'JetBrains Mono',monospace", fontSize: 13 }}>
        <span style={{ color: 'var(--text3)', fontSize: 11, letterSpacing: '.14em', marginRight: 6 }}>TRAJECTORY</span>
        <span style={{ color: 'var(--text2)', border: '1px solid var(--line2)', borderRadius: 7, padding: '9px 14px' }}>React Native Engineer</span>
        <span style={{ color: 'var(--accent)' }}>→</span>
        <span style={{ color: 'var(--text2)', border: '1px solid var(--line2)', borderRadius: 7, padding: '9px 14px' }}>Full-Stack Engineer</span>
        <span style={{ color: 'var(--accent)' }}>→</span>
        <span style={{ color: 'var(--accent-ink)', background: 'var(--accent)', border: '1px solid var(--accent)', borderRadius: 7, padding: '9px 14px', fontWeight: 500 }}>Agentic AI Engineer</span>
      </div>
    </section>
  )
}
