export default function Experience() {
  return (
    <section id="experience" style={{ padding: '84px 0', borderTop: '1px solid var(--line)' }}>
      <div style={{ display: 'flex', alignItems: 'baseline', gap: 14, marginBottom: 44 }}>
        <span style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: 12, color: 'var(--accent)' }}>04</span>
        <h2 data-reactive style={{ fontWeight: 600, fontSize: 'clamp(28px,3.4vw,40px)', letterSpacing: '-.02em', margin: 0 }}>Work Experience</h2>
        <div style={{ flex: 1, height: 1, background: 'var(--line)' }} />
      </div>

      {/* RevSure AI */}
      <div className="reveal" style={{ display: 'grid', gridTemplateColumns: '240px 1fr', gap: 40, paddingBottom: 34, marginBottom: 34, borderBottom: '1px solid var(--line)' }}>
        <div>
          <h3 style={{ fontWeight: 600, fontSize: 21, margin: 0 }}>RevSure AI</h3>
          <div style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: 12, color: 'var(--text2)', marginTop: 6 }}>Software Engineer</div>
          <div style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: 11, color: 'var(--text3)', marginTop: 3 }}>Feb 2025 – Present</div>
          <div style={{ marginTop: 14, fontFamily: "'JetBrains Mono',monospace", fontSize: 11, color: 'var(--text3)', lineHeight: 1.8 }}>
            React · TypeScript · Python · Golang · LLMs · Multi-agent
          </div>
        </div>
        <ul style={{ margin: 0, padding: 0, listStyle: 'none', display: 'flex', flexDirection: 'column', gap: 14, maxWidth: 720 }}>
          {([
            { t: <>Architected and deployed production-grade <span style={{ color: 'var(--text)', fontWeight: 500 }}>agentic AI systems</span> and the Reli conversational AI interface using React, TypeScript and Python, enabling <span style={{ color: 'var(--text)', fontWeight: 500 }}>500+ automated AI-driven workflows weekly</span>.</>, primary: true },
            { t: <>Built and scaled core AI orchestration modules — <span style={{ color: 'var(--text)' }}>Agent Builder, Execution Engine, Run History Tracking, Token Usage Analytics and Tool Configuration</span> — supporting monitoring and execution of large-scale multi-agent workflows.</>, primary: true },
            { t: <>Developed autonomous AI agents for company research, lead intelligence, personalized outreach, campaign optimization and real-time trigger-based automation, contributing to <span style={{ color: 'var(--text)', fontWeight: 500 }}>$200K–$300K in client contract value</span>.</>, primary: true },
            { t: <>Engineered full-stack AI integrations across Python and Golang services by designing <span style={{ color: 'var(--text)' }}>10+ scalable APIs</span> connecting LLM workflows, backend systems and frontend applications, improving response latency by ~10%.</>, primary: false },
            { t: <>Designed a <span style={{ color: 'var(--text)' }}>Marketing Mix Scenario Planner</span> leveraging AI-assisted campaign simulation workflows to support GTM decision-making and ROI optimization.</>, primary: false },
            { t: <>Improved platform scalability and frontend performance through shared component architecture and optimization initiatives, reducing production latency and resolving <span style={{ color: 'var(--text)' }}>300+ legacy issues</span>.</>, primary: false },
            { t: <>Collaborated cross-functionally with product, AI and data stakeholders to translate business requirements into deployable AI solutions; mentored junior engineers on AI platform development.</>, primary: false },
          ] as { t: React.ReactNode; primary: boolean }[]).map((item, i) => (
            <li key={i} style={{ display: 'flex', gap: 14 }}>
              <span style={{ color: 'var(--accent)', fontFamily: "'JetBrains Mono',monospace", flexShrink: 0 }}>›</span>
              <div style={{ fontSize: 15.5, lineHeight: 1.55, color: item.primary ? 'var(--text)' : 'var(--text2)' }}>{item.t}</div>
            </li>
          ))}
        </ul>
      </div>

      {/* MedLern */}
      <div className="reveal" style={{ display: 'grid', gridTemplateColumns: '240px 1fr', gap: 40 }}>
        <div>
          <h3 style={{ fontWeight: 600, fontSize: 21, margin: 0 }}>MedLern</h3>
          <div style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: 12, color: 'var(--text2)', marginTop: 6 }}>Software Engineer</div>
          <div style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: 11, color: 'var(--text3)', marginTop: 3 }}>May 2022 – Feb 2025</div>
          <div style={{ marginTop: 14, fontFamily: "'JetBrains Mono',monospace", fontSize: 11, color: 'var(--text3)', lineHeight: 1.8 }}>
            React Native · React · Cross-platform · Mobile + Web
          </div>
        </div>
        <ul style={{ margin: 0, padding: 0, listStyle: 'none', display: 'flex', flexDirection: 'column', gap: 14, maxWidth: 720 }}>
          {([
            { t: <>Spearheaded the development of a cross-platform mobile and web application used by <span style={{ color: 'var(--text)', fontWeight: 500 }}>30,000+ medical professionals</span>, utilizing React.js and React Native.</>, primary: true },
            { t: <>Led the migration of <span style={{ color: 'var(--text)' }}>3 critical modules</span> to modern tech stacks, reducing maintenance costs by 15%, improving system reliability and ensuring alignment with agile project delivery frameworks.</>, primary: false },
            { t: <>Coordinated with cross-functional teams to transition two major applications to new platforms, enhancing performance for <span style={{ color: 'var(--text)' }}>10,000+ end-users</span> and ensuring seamless integration of RESTful APIs and Redux-managed state systems.</>, primary: false },
          ] as { t: React.ReactNode; primary: boolean }[]).map((item, i) => (
            <li key={i} style={{ display: 'flex', gap: 14 }}>
              <span style={{ color: 'var(--accent)', fontFamily: "'JetBrains Mono',monospace", flexShrink: 0 }}>›</span>
              <div style={{ fontSize: 15.5, lineHeight: 1.55, color: item.primary ? 'var(--text)' : 'var(--text2)' }}>{item.t}</div>
            </li>
          ))}
        </ul>
      </div>

      {/* Awards */}
      <div className="reveal" style={{ marginTop: 34, border: '1px solid var(--accent)', background: 'var(--accent-soft)', borderRadius: 10, padding: '16px 22px', display: 'flex', alignItems: 'center', gap: 16, flexWrap: 'wrap' }}>
        <span style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: 11, letterSpacing: '.14em', color: 'var(--accent)', border: '1px solid var(--accent)', borderRadius: 5, padding: '5px 10px' }}>AWARDS</span>
        <span style={{ fontSize: 15, color: 'var(--text)' }}>Fresher of the Year, 2022–2023 · Best Team Excellence Award</span>
      </div>
    </section>
  )
}
