import Minerva from './Minerva'

export default function Projects() {
  return (
    <section id="projects" className="mm-section" style={{ padding: '84px 0', borderTop: '1px solid var(--line)' }}>
      <div style={{ display: 'flex', alignItems: 'baseline', gap: 14, marginBottom: 16 }}>
        <span style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: 12, color: 'var(--accent)' }}>03</span>
        <h2 data-reactive style={{ fontWeight: 600, fontSize: 'clamp(28px,3.4vw,40px)', letterSpacing: '-.02em', margin: 0 }}>Projects</h2>
        <div style={{ flex: 1, height: 1, background: 'var(--line)' }} />
      </div>
      <p className="reveal" style={{ fontSize: 15, color: 'var(--text2)', margin: '0 0 40px', maxWidth: 540 }}>
        Systems I've designed and shipped — told as the problem, the build and the impact.
      </p>

      {/* Reli AI */}
      <article className="mm-card reveal" style={{ border: '1px solid var(--line)', borderRadius: 14, overflow: 'hidden', marginBottom: 22 }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '20px 26px', borderBottom: '1px solid var(--line)' }}>
          <div className="mm-card-head-left" style={{ display: 'flex', alignItems: 'baseline', gap: 14 }}>
            <h3 style={{ fontWeight: 600, fontSize: 24, margin: 0 }}>Reli AI</h3>
            <span style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: 12, color: 'var(--text2)' }}>Agentic GTM platform · RevSure AI</span>
          </div>
          <span style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: 11, color: 'var(--good)' }}>● In production</span>
        </div>
        <div className="mm-collapse" style={{ display: 'grid', gridTemplateColumns: '1.4fr 1fr' }}>
          <div className="mm-stack-divider" style={{ padding: 26, borderRight: '1px solid var(--line)', display: 'flex', flexDirection: 'column', gap: 18 }}>
            <div>
              <div style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: 10.5, letterSpacing: '.14em', color: 'var(--accent)', marginBottom: 8 }}>PROBLEM</div>
              <p style={{ margin: 0, fontSize: 15, lineHeight: 1.55, color: 'var(--text2)' }}>
                Business teams burn hours on research, lead intelligence and outreach — manual work that can't scale across hundreds of accounts.
              </p>
            </div>
            <div>
              <div style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: 10.5, letterSpacing: '.14em', color: 'var(--accent)', marginBottom: 8 }}>BUILD & IMPACT</div>
              <p style={{ margin: 0, fontSize: 15, lineHeight: 1.55, color: 'var(--text2)' }}>
                Orchestration systems, an execution engine, tool integrations, a visual workflow builder and autonomous agents — powering <span style={{ color: 'var(--text)' }}>500+ automated workflows weekly</span> for <span style={{ color: 'var(--text)' }}>100+ enterprise clients</span>.
              </p>
            </div>
          </div>
          <div style={{ padding: 26, background: 'var(--accent-soft)' }}>
            <div style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: 10.5, letterSpacing: '.14em', color: 'var(--text3)', marginBottom: 12 }}>SUBSYSTEMS</div>
            <div style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: 12, color: 'var(--text2)', lineHeight: 2 }}>
              Agent Builder · Execution Engine · Workflow Automation · Tool Integrations · Run Analytics · Token Tracking · Campaign Intelligence · Lead Research
            </div>
          </div>
        </div>
      </article>

      {/* MedLern */}
      <article className="mm-card reveal" style={{ border: '1px solid var(--line)', borderRadius: 14, overflow: 'hidden', marginBottom: 22 }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '20px 26px', borderBottom: '1px solid var(--line)' }}>
          <div className="mm-card-head-left" style={{ display: 'flex', alignItems: 'baseline', gap: 14 }}>
            <h3 style={{ fontWeight: 600, fontSize: 24, margin: 0 }}>MedLern</h3>
            <span style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: 12, color: 'var(--text2)' }}>Medical education platform · MedLern</span>
          </div>
          <span style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: 11, color: 'var(--good)' }}>● In production</span>
        </div>
        <div className="mm-collapse" style={{ display: 'grid', gridTemplateColumns: '1.4fr 1fr' }}>
          <div className="mm-stack-divider" style={{ padding: 26, borderRight: '1px solid var(--line)', display: 'flex', flexDirection: 'column', gap: 18 }}>
            <div>
              <div style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: 10.5, letterSpacing: '.14em', color: 'var(--accent)', marginBottom: 8 }}>PROBLEM</div>
              <p style={{ margin: 0, fontSize: 15, lineHeight: 1.55, color: 'var(--text2)' }}>
                Medical professionals needed a modern, cross-platform learning app — the existing Xamarin codebase couldn't deliver offline access, localization, or the analytics needed to certify learning at scale.
              </p>
            </div>
            <div>
              <div style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: 10.5, letterSpacing: '.14em', color: 'var(--accent)', marginBottom: 8 }}>BUILD & IMPACT</div>
              <p style={{ margin: 0, fontSize: 15, lineHeight: 1.55, color: 'var(--text2)' }}>
                Led the full migration from Xamarin to React Native, then shipped localization, offline learning, deep linking, analytics and certification workflows — platform now serves <span style={{ color: 'var(--text)' }}>30,000+ medical professionals</span> for CME and clinical learning.
              </p>
            </div>
          </div>
          <div style={{ padding: 26, background: 'var(--accent-soft)' }}>
            <div style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: 10.5, letterSpacing: '.14em', color: 'var(--text3)', marginBottom: 12 }}>WHAT WAS BUILT</div>
            <div style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: 12, color: 'var(--text2)', lineHeight: 2 }}>
              Cross-platform App · Offline Learning · Localization · Deep Linking · Analytics · Certification Workflows · Content Management
            </div>
          </div>
        </div>
      </article>

      {/* Minerva */}
      <article className="mm-card reveal" style={{ border: '1px solid var(--line)', borderRadius: 14, overflow: 'hidden', marginBottom: 22 }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '20px 26px', borderBottom: '1px solid var(--line)' }}>
          <div className="mm-card-head-left" style={{ display: 'flex', alignItems: 'baseline', gap: 14 }}>
            <h3 style={{ fontWeight: 600, fontSize: 24, margin: 0 }}>Minerva</h3>
            <span style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: 12, color: 'var(--text2)' }}>AI-native worldbuilding platform</span>
          </div>
          <span style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: 11, letterSpacing: '.1em', color: 'var(--accent)', border: '1px solid var(--accent)', borderRadius: 20, padding: '3px 10px' }}>IN DEVELOPMENT</span>
        </div>
        <div style={{ padding: '22px 26px' }}>
          <Minerva />
        </div>
      </article>

      {/* Agentic AI Council */}
      <article className="mm-card reveal" style={{ border: '1px solid var(--line)', borderRadius: 14, overflow: 'hidden', marginBottom: 22 }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '20px 26px', borderBottom: '1px solid var(--line)' }}>
          <div className="mm-card-head-left" style={{ display: 'flex', alignItems: 'baseline', gap: 14 }}>
            <h3 style={{ fontWeight: 600, fontSize: 24, margin: 0 }}>Agentic AI Council</h3>
            <span style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: 12, color: 'var(--text2)' }}>Local AI operating environment · Arch Linux</span>
          </div>
          <span style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: 11, color: 'var(--accent)' }}>● Personal R&D</span>
        </div>
        <div className="mm-collapse" style={{ display: 'grid', gridTemplateColumns: '1.4fr 1fr' }}>
          <div className="mm-stack-divider" style={{ padding: 26, borderRight: '1px solid var(--line)', display: 'flex', flexDirection: 'column', gap: 18 }}>
            <div>
              <div style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: 10.5, letterSpacing: '.14em', color: 'var(--accent)', marginBottom: 8 }}>IDEA</div>
              <p style={{ margin: 0, fontSize: 15, lineHeight: 1.55, color: 'var(--text2)' }}>
                A personal council of specialized AI agents — for engineering, product strategy, research, writing, planning, learning, and even controlling my OS — running local-first on Arch Linux.
              </p>
            </div>
            <div>
              <div style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: 10.5, letterSpacing: '.14em', color: 'var(--accent)', marginBottom: 8 }}>WHY IT MATTERS</div>
              <p style={{ margin: 0, fontSize: 15, lineHeight: 1.55, color: 'var(--text2)' }}>
                It's how I think about <span style={{ color: 'var(--text)' }}>human–AI collaboration</span>: AI agents that augment a developer's workflow rather than abstract it away.
              </p>
            </div>
          </div>
          <div style={{ padding: 26, background: 'var(--accent-soft)' }}>
            <div style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: 10.5, letterSpacing: '.14em', color: 'var(--text3)', marginBottom: 12 }}>CONCEPTS</div>
            <div style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: 12, color: 'var(--text2)', lineHeight: 2 }}>
              Local-first workflows · AI-assisted development · Agent collaboration · Productivity augmentation · Personal OS design
            </div>
          </div>
        </div>
      </article>

      {/* AI Content Generator */}
      <article className="mm-card reveal" style={{ border: '1px solid var(--line)', borderRadius: 14, padding: 26 }}>
        <div style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'space-between', marginBottom: 14 }}>
          <h3 style={{ fontWeight: 600, fontSize: 22, margin: 0 }}>AI Content Generator</h3>
          <span style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: 11, color: 'var(--text3)' }}>Side project</span>
        </div>
        <p style={{ margin: '0 0 16px', fontSize: 15, lineHeight: 1.55, color: 'var(--text2)', maxWidth: 760 }}>
          An AI-powered content platform on OpenAI APIs, React, Node.js and MongoDB — generating blogs, marketing and long-form content through customizable prompt workflows.
        </p>
        <div style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: 12, color: 'var(--text3)' }}>
          OpenAI · React · Node.js · MongoDB · Prompt workflows
        </div>
      </article>
    </section>
  )
}
