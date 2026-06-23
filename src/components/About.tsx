import { useEffect, useRef } from 'react'

export default function About() {
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    el.querySelectorAll<HTMLElement>('.reveal').forEach(r => {
      const observer = new IntersectionObserver(entries => {
        if (entries[0].isIntersecting) { r.classList.add('visible'); observer.disconnect() }
      }, { threshold: 0.15 })
      observer.observe(r)
    })
  }, [])

  return (
    <section id="about" style={{ padding: '84px 0', borderTop: '1px solid var(--line)' }}>
      <div style={{ display: 'flex', alignItems: 'baseline', gap: 14, marginBottom: 44 }}>
        <span style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: 12, color: 'var(--accent)' }}>01</span>
        <h2 data-reactive style={{ fontWeight: 600, fontSize: 'clamp(28px,3.4vw,40px)', letterSpacing: '-.02em', margin: 0 }}>About</h2>
        <div style={{ flex: 1, height: 1, background: 'var(--line)' }} />
      </div>
      <div ref={ref} style={{ display: 'grid', gridTemplateColumns: '1.4fr 1fr', gap: 56 }}>
        <div className="reveal" style={{ fontSize: 20, lineHeight: 1.62, color: 'var(--text)', maxWidth: 680 }}>
          <p style={{ margin: '0 0 22px' }}>
            I'm a software engineer focused on building <span style={{ color: 'var(--text)', fontWeight: 500 }}>AI-native products</span> and high-impact business systems. Over the last four years I've shipped across React Native, React, Node.js, Python, Golang and cloud platforms — for products used by thousands and enterprise clients across healthcare and SaaS.
          </p>
          <p style={{ margin: '0 0 22px', color: 'var(--text2)' }}>
            At <span style={{ color: 'var(--text)' }}>RevSure AI</span> I build <span style={{ color: 'var(--text)' }}>agentic AI systems</span>, workflow orchestration engines, research automation and GTM intelligence products. Earlier, at MedLern, I built cross-platform apps for 30,000+ medical professionals.
          </p>
          <p style={{ margin: 0, color: 'var(--text2)' }}>
            Alongside work I'm building <span style={{ color: 'var(--text)' }}>Minerva</span> — an AI-native worldbuilding platform that helps creative teams collaborate with shared context. I care about systems where the technology disappears behind the workflow.
          </p>
        </div>
        <div className="reveal">
          <div style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: 11, letterSpacing: '.14em', color: 'var(--text3)', marginBottom: 16 }}>CURRENTLY</div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
            {[
              { n: '01', title: 'Building Minerva', desc: '— knowledge-graph core & collaborative editor.' },
              { n: '02', title: 'Designing agentic workflows', desc: 'with MCP integrations & knowledge graphs.' },
              { n: '03', title: 'Running a local', desc: 'Agentic AI Council on Arch Linux.' },
            ].map(item => (
              <div key={item.n} style={{ display: 'flex', gap: 13 }}>
                <span style={{ color: 'var(--accent)', fontFamily: "'JetBrains Mono',monospace", fontSize: 12, paddingTop: 3 }}>{item.n}</span>
                <div style={{ fontSize: 15, lineHeight: 1.5, color: 'var(--text2)' }}>
                  <span style={{ color: 'var(--text)' }}>{item.title}</span> {item.desc}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
