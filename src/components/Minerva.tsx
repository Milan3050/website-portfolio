import { useState, useEffect, useRef } from 'react'

const STEPS = [
  { cap: 'A writer creates a character — by writing, as they always have.', hint: 'A writer creates a character — just by writing, as they always have.', kg: ['char'], tools: [] as string[], status: 'node created' },
  { cap: 'They mention where the character is from.', hint: "They reference a location. No extra step — it's just part of the writing.", kg: ['char', 'loc'], tools: [], status: 'linking…' },
  { cap: 'And the organization they belong to.', hint: 'They reference an organization. Relationships form as they write.', kg: ['char', 'loc', 'org'], tools: [], status: 'linking…' },
  { cap: 'The knowledge graph updates automatically.', hint: 'Minerva builds the relationships in the background — no manual tagging.', kg: ['char', 'loc', 'org'], tools: [], status: 'graph synced ✓' },
  { cap: 'Now AI understands how everything connects.', hint: "AI reasons over real context to assist — it never replaces the writer.", kg: ['char', 'loc', 'org'], tools: ['ai'], status: 'context ready' },
  { cap: 'The map system gains that context.', hint: 'Northreach appears on the map, linked to Kael — automatically.', kg: ['char', 'loc', 'org'], tools: ['ai', 'map'], status: 'context ready' },
  { cap: 'Story pages gain it too.', hint: 'Mentions auto-link to canonical entities across every page.', kg: ['char', 'loc', 'org'], tools: ['ai', 'map', 'story'], status: 'context ready' },
  { cap: 'The timeline gains it.', hint: "Events involving Kael slot into the world's timeline.", kg: ['char', 'loc', 'org'], tools: ['ai', 'map', 'story', 'timeline'], status: 'context ready' },
  { cap: 'Create once, benefit everywhere.', hint: 'Every tool gains context automatically — humans stay in control, AI augments.', kg: ['char', 'loc', 'org'], tools: ['ai', 'map', 'story', 'timeline', 'other'], status: 'all systems synced ✓' },
]

const TOOL_LABELS: Record<string, string> = { ai: 'reasoning', map: 'mapped', story: 'linked', timeline: 'placed', other: 'synced' }
const TOOL_NAMES: Record<string, string> = { ai: 'AI Agents', map: 'Map System', story: 'Story Pages', timeline: 'Timeline', other: 'Every other tool' }
const TOOLS = ['ai', 'map', 'story', 'timeline', 'other']

export default function Minerva() {
  const [step, setStep] = useState(0)
  const [playing, setPlaying] = useState(false)
  const [started, setStarted] = useState(false)
  const [hover, setHover] = useState(false)
  const [exOpen, setExOpen] = useState(false)
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null)

  useEffect(() => {
    if (exOpen && !started) { setStarted(true); setPlaying(true) }
    if (exOpen && started) setPlaying(true)
    if (!exOpen) { setPlaying(false); setStep(0) }
  }, [exOpen, started])

  useEffect(() => {
    if (!started) return
    if (timerRef.current) clearInterval(timerRef.current)
    if (playing) {
      timerRef.current = setInterval(() => {
        if (!hover) setStep(s => (s + 1) % STEPS.length)
      }, 2200)
    }
    return () => { if (timerRef.current) clearInterval(timerRef.current) }
  }, [started, playing, hover])

  const cur = STEPS[step]

  const nodeStyle = (id: string): React.CSSProperties => ({
    opacity: cur.kg.includes(id) ? 1 : 0,
    transform: cur.kg.includes(id) ? 'scale(1)' : 'scale(0.6)',
    transition: 'opacity .5s ease, transform .5s ease',
  })

  const edgeStyle = (id: string): React.CSSProperties => ({
    opacity: cur.kg.includes(id) && cur.kg.includes('char') ? 1 : 0,
    transition: 'opacity .5s ease',
  })

  const toolStyle = (id: string): React.CSSProperties => {
    const on = cur.tools.includes(id)
    return {
      border: `1px solid ${on ? 'var(--accent)' : 'var(--line)'}`,
      borderRadius: 9, padding: '11px 13px',
      opacity: on ? 1 : 0.4,
      background: on ? 'var(--accent-soft)' : 'transparent',
      transition: 'all .45s ease',
    }
  }

  return (
    <>
      <p style={{ fontSize: 15, lineHeight: 1.6, color: 'var(--text)', maxWidth: 760, margin: '0 0 8px' }}>
        An <span style={{ fontWeight: 600 }}>AI-native worldbuilding platform</span> for writers, studios and narrative teams — built around shared context, not generated content.
      </p>
      <p style={{ fontSize: 14.5, lineHeight: 1.6, color: 'var(--text2)', maxWidth: 760, margin: '0 0 20px' }}>
        Minerva doesn't replace writers. It assists creators and teams with better collaboration, context and consistency — so human creativity stays central while AI augments the workflow.
      </p>

      {/* ACCORDION TOGGLE */}
      <button
        onClick={() => setExOpen(o => !o)}
        style={{
          cursor: 'pointer', width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'space-between',
          background: 'var(--panel2)', border: '1px solid var(--line)', borderRadius: exOpen ? '12px 12px 0 0' : 12,
          padding: '14px 20px', marginBottom: 0, fontFamily: 'inherit', transition: 'border-radius .3s ease',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
          <span style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: 11, letterSpacing: '.12em', color: 'var(--accent)', fontWeight: 600 }}>INTERACTIVE DEMO</span>
          <span style={{ fontSize: 13, color: 'var(--text2)' }}>See how Minerva works — create once, benefit everywhere</span>
        </div>
        <span style={{ fontSize: 22, color: 'var(--accent)', flexShrink: 0, lineHeight: 1, transition: 'transform .3s ease', transform: exOpen ? 'rotate(45deg)' : 'none' }}>+</span>
      </button>

      {/* EXPLAINER */}
      <div style={{ overflow: 'hidden', maxHeight: exOpen ? 900 : 0, opacity: exOpen ? 1 : 0, transition: 'max-height .55s cubic-bezier(.4,0,.2,1), opacity .4s ease' }}>
        <div
          style={{ border: '1px solid var(--line)', borderTop: 'none', borderRadius: '0 0 12px 12px', background: 'var(--panel)', overflow: 'hidden' }}
          onMouseEnter={() => setHover(true)}
          onMouseLeave={() => setHover(false)}
        >
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '14px 20px', borderBottom: '1px solid var(--line)' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10, fontFamily: "'JetBrains Mono',monospace", fontSize: 12, color: 'var(--text2)' }}>
              <span style={{ display: 'flex', gap: 5 }}>
                {['var(--line2)', 'var(--line2)', 'var(--accent)'].map((bg, i) => (
                  <span key={i} style={{ width: 9, height: 9, borderRadius: '50%', background: bg }} />
                ))}
              </span>
              How Minerva works
            </div>
            <div style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: 12, fontWeight: 500, color: 'var(--accent)' }}>Create once, benefit everywhere</div>
          </div>

          <div className="mm-minerva-grid" style={{ display: 'grid', gridTemplateColumns: '300px 1fr 250px', minHeight: 380 }}>
            <div className="mm-stack-divider" style={{ padding: 24, borderRight: '1px solid var(--line)' }}>
              <div style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: 10.5, letterSpacing: '.14em', color: 'var(--text3)', marginBottom: 16 }}>WRITER'S WORKSPACE</div>
              <div style={{ border: `1px solid ${cur.kg.includes('char') ? 'var(--accent)' : 'var(--line2)'}`, borderRadius: 10, padding: 16, background: 'var(--bg)', transition: 'border-color .4s' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 12 }}>
                  <span style={{ width: 30, height: 30, borderRadius: 8, background: 'var(--accent-soft)', border: '1px solid var(--accent)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--accent)', fontWeight: 700, fontSize: 13 }}>K</span>
                  <div>
                    <div style={{ fontWeight: 600, fontSize: 14 }}>Character</div>
                    <div style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: 10, color: 'var(--text3)' }}>new entity</div>
                  </div>
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 8, fontSize: 12.5 }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', color: 'var(--text2)' }}>
                    <span style={{ color: 'var(--text3)' }}>name</span><span style={{ color: 'var(--text)' }}>Kael Aldric</span>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', color: 'var(--text2)', opacity: cur.kg.includes('loc') ? 1 : 0.25, transition: 'opacity .4s' }}>
                    <span style={{ color: 'var(--text3)' }}>from</span><span style={{ color: 'var(--text)' }}>Northreach ↗</span>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', color: 'var(--text2)', opacity: cur.kg.includes('org') ? 1 : 0.25, transition: 'opacity .4s' }}>
                    <span style={{ color: 'var(--text3)' }}>allegiance</span><span style={{ color: 'var(--text)' }}>Ember Pact ↗</span>
                  </div>
                </div>
              </div>
              <div style={{ marginTop: 16, fontSize: 13, lineHeight: 1.5, color: 'var(--text2)', minHeight: 60 }}>{cur.hint}</div>
            </div>

            <div className="mm-stack-divider" style={{ padding: 12, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', borderRight: '1px solid var(--line)', position: 'relative' }}>
              <div style={{ position: 'absolute', top: 16, left: 20, fontFamily: "'JetBrains Mono',monospace", fontSize: 10.5, letterSpacing: '.14em', color: 'var(--text3)' }}>KNOWLEDGE GRAPH</div>
              <svg viewBox="0 0 420 320" style={{ width: '100%', maxWidth: 420, height: 'auto', fontFamily: "'JetBrains Mono',monospace" }}>
                <line x1="177" y1="138" x2="119" y2="98" stroke="var(--accent)" strokeWidth="1.4" fill="none" style={edgeStyle('loc')} />
                <line x1="177" y1="183" x2="118" y2="225" stroke="var(--accent)" strokeWidth="1.4" fill="none" style={edgeStyle('org')} />
                <g style={{ ...nodeStyle('char'), transformOrigin: '210px 160px' }}>
                  <circle cx="210" cy="160" r="40" fill="var(--accent-soft)" stroke="var(--accent)" strokeWidth="1.8" />
                  <text x="210" y="156" textAnchor="middle" fontSize="11" fontWeight="700" fill="var(--accent)">Kael</text>
                  <text x="210" y="172" textAnchor="middle" fontSize="8.5" fill="var(--text2)">character</text>
                </g>
                <g style={{ ...nodeStyle('loc'), transformOrigin: '92px 80px' }}>
                  <circle cx="92" cy="80" r="32" fill="var(--panel2)" stroke="var(--line2)" strokeWidth="1.3" />
                  <text x="92" y="78" textAnchor="middle" fontSize="9.5" fill="var(--text)">Northreach</text>
                  <text x="92" y="91" textAnchor="middle" fontSize="8" fill="var(--text3)">location</text>
                </g>
                <g style={{ ...nodeStyle('org'), transformOrigin: '92px 244px' }}>
                  <circle cx="92" cy="244" r="32" fill="var(--panel2)" stroke="var(--line2)" strokeWidth="1.3" />
                  <text x="92" y="242" textAnchor="middle" fontSize="9.5" fill="var(--text)">Ember Pact</text>
                  <text x="92" y="255" textAnchor="middle" fontSize="8" fill="var(--text3)">org</text>
                </g>
              </svg>
              <div style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: 11, color: 'var(--text3)', marginTop: 6, minHeight: 16 }}>{cur.status}</div>
            </div>

            <div style={{ padding: 24, display: 'flex', flexDirection: 'column', gap: 10 }}>
              <div style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: 10.5, letterSpacing: '.14em', color: 'var(--text3)', marginBottom: 6 }}>CONTEXT FLOWS TO</div>
              {TOOLS.map(t => {
                const on = cur.tools.includes(t)
                return (
                  <div key={t} style={toolStyle(t)}>
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                      <span style={{ fontSize: 13, fontWeight: 500, color: 'var(--text)' }}>{TOOL_NAMES[t]}</span>
                      <span style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: 9, color: on ? 'var(--accent)' : 'var(--text3)' }}>
                        {on ? TOOL_LABELS[t] + ' ✓' : 'idle'}
                      </span>
                    </div>
                  </div>
                )
              })}
            </div>
          </div>

          <div style={{ borderTop: '1px solid var(--line)', padding: '16px 22px', display: 'flex', alignItems: 'center', gap: 18 }}>
            <button
              onClick={() => setPlaying(p => !p)}
              style={{ cursor: 'pointer', width: 34, height: 34, flexShrink: 0, borderRadius: '50%', border: '1px solid var(--line2)', background: 'transparent', color: 'var(--text)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 12 }}
            >
              {playing ? '❚❚' : '▶'}
            </button>
            <div style={{ flex: 1 }}>
              <div style={{ fontSize: 14.5, color: 'var(--text)', minHeight: 20 }}>{cur.cap}</div>
              <div style={{ marginTop: 10, height: 3, background: 'var(--line)', borderRadius: 2, overflow: 'hidden' }}>
                <div style={{ height: '100%', width: `${((step + 1) / STEPS.length) * 100}%`, background: 'var(--accent)', transition: 'width .3s linear' }} />
              </div>
            </div>
            <div style={{ display: 'flex', gap: 6, flexShrink: 0 }}>
              {STEPS.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setStep(i)}
                  style={{ cursor: 'pointer', width: 8, height: 8, borderRadius: '50%', border: 'none', padding: 0, background: i === step ? 'var(--accent)' : 'var(--line2)', transform: i === step ? 'scale(1.35)' : 'scale(1)', transition: 'background .25s, transform .25s' }}
                />
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="mm-3col" style={{ marginTop: 24, display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 16 }}>
        {[
          { label: 'COLLABORATION', text: 'Teams work in one shared workspace — everyone sees the same canon, in real time.' },
          { label: 'CONTEXT & CONSISTENCY', text: 'A knowledge graph links characters, places, orgs, events and lore — so nothing contradicts.' },
          { label: 'AI THAT AUGMENTS', text: "AI reasons over real context to assist — it never replaces the writer's voice." },
        ].map(item => (
          <div key={item.label}>
            <div style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: 11, color: 'var(--accent)', marginBottom: 8 }}>{item.label}</div>
            <p style={{ margin: 0, fontSize: 13.5, lineHeight: 1.55, color: 'var(--text2)' }}>{item.text}</p>
          </div>
        ))}
      </div>
      <div style={{ marginTop: 18, fontFamily: "'JetBrains Mono',monospace", fontSize: 11, color: 'var(--text3)' }}>
        React · TypeScript · Node.js · Python · Neo4j · PostgreSQL · MongoDB · LangGraph · RAG · Vector Search · OpenAI · Anthropic
      </div>
    </>
  )
}
