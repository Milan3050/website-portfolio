import { useState, useRef, useEffect } from 'react'

interface Message { role: 'user' | 'assistant'; content: string }

const SUGGESTIONS = [
  'What is Milan currently building?',
  "What's his experience with AI agents?",
  'What roles is he open to?',
  'How can I contact Milan?',
]

export default function AskMilan() {
  const [open, setOpen] = useState(false)
  const [messages, setMessages] = useState<Message[]>([])
  const [input, setInput] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const bottomRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    if (open) setTimeout(() => inputRef.current?.focus(), 80)
  }, [open])

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages, loading])

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') setOpen(false) }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [])

  const send = async (text: string) => {
    const trimmed = text.trim()
    if (!trimmed || loading) return
    setInput('')
    setError('')
    const userMsg: Message = { role: 'user', content: trimmed }
    const next = [...messages, userMsg]
    setMessages(next)
    setLoading(true)
    try {
      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ messages: next }),
      })
      if (!res.ok) throw new Error(`Server error ${res.status}`)
      const data = await res.json() as { message: string }
      setMessages(prev => [...prev, { role: 'assistant', content: data.message }])
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Something went wrong.')
    } finally {
      setLoading(false)
    }
  }

  const onKey = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') { e.preventDefault(); send(input) }
  }

  return (
    <>
      {/* FAB */}
      <button
        onClick={() => setOpen(o => !o)}
        style={{
          position: 'fixed', zIndex: 128, right: 24, bottom: 24,
          width: 46, height: 46, borderRadius: '50%',
          border: '1px solid var(--accent)',
          background: 'var(--accent)', color: 'var(--accent-ink)',
          fontSize: 17, cursor: 'pointer',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          boxShadow: '0 4px 20px rgba(0,0,0,.25)',
          opacity: open ? 0 : 1,
          pointerEvents: open ? 'none' : 'auto',
          transition: 'opacity .18s ease, transform .2s ease',
        }}
        title="Ask about Milan"
      >
        ✦
      </button>

      {/* Popup */}
      {open && (
        <div style={{
          position: 'fixed', zIndex: 128, right: 'clamp(12px, 4vw, 24px)', bottom: 'clamp(12px, 4vw, 24px)',
          width: 'min(396px, calc(100vw - 24px))', height: 'min(580px, calc(100vh - 96px))',
          background: 'var(--panel)',
          border: '1px solid var(--line)',
          borderRadius: 16,
          boxShadow: '0 8px 40px rgba(0,0,0,.35)',
          display: 'flex', flexDirection: 'column',
          animation: 'mmFade .22s ease',
          overflow: 'hidden',
        }}>
          {/* Header */}
          <div style={{ padding: '14px 18px', borderBottom: '1px solid var(--line)', display: 'flex', alignItems: 'center', gap: 12, flexShrink: 0 }}>
            <div style={{ position: 'relative', flexShrink: 0 }}>
              <div style={{ width: 36, height: 36, borderRadius: '50%', background: 'var(--accent)', color: 'var(--accent-ink)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 700, fontSize: 15 }}>M</div>
              <span style={{ position: 'absolute', bottom: 1, right: 1, width: 9, height: 9, borderRadius: '50%', background: 'var(--good)', border: '2px solid var(--panel)' }} />
            </div>
            <div style={{ flex: 1 }}>
              <div style={{ fontWeight: 600, fontSize: 14, color: 'var(--text)' }}>Ask about Milan</div>
              <div style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: 10, color: 'var(--text3)', marginTop: 1 }}>AI concierge · answers from his work</div>
            </div>
            <button
              onClick={() => setOpen(false)}
              style={{ cursor: 'pointer', width: 28, height: 28, borderRadius: 7, border: '1px solid var(--line2)', background: 'transparent', color: 'var(--text2)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 16, flexShrink: 0 }}
            >
              ×
            </button>
          </div>

          {/* Messages */}
          <div data-chat-scroll style={{ flex: 1, overflowY: 'auto', padding: '16px 18px', display: 'flex', flexDirection: 'column', gap: 14 }}>
            {messages.length === 0 ? (
              <div>
                <div style={{ fontSize: 14, color: 'var(--text2)', lineHeight: 1.6, marginBottom: 20 }}>
                  Hi! Ask me anything about Milan — his experience, projects, skills, and what he's currently building.
                </div>
                <div style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: 10, letterSpacing: '.1em', color: 'var(--text3)', marginBottom: 10 }}>SUGGESTIONS</div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 7 }}>
                  {SUGGESTIONS.map(s => (
                    <button
                      key={s}
                      onClick={() => send(s)}
                      style={{ cursor: 'pointer', textAlign: 'left', background: 'var(--panel2)', border: '1px solid var(--line)', borderRadius: 8, padding: '9px 13px', fontSize: 13, color: 'var(--text2)', fontFamily: 'inherit', transition: 'border-color .2s, color .2s' }}
                      onMouseEnter={e => { (e.currentTarget as HTMLButtonElement).style.borderColor = 'var(--accent)'; (e.currentTarget as HTMLButtonElement).style.color = 'var(--text)' }}
                      onMouseLeave={e => { (e.currentTarget as HTMLButtonElement).style.borderColor = 'var(--line)'; (e.currentTarget as HTMLButtonElement).style.color = 'var(--text2)' }}
                    >
                      {s}
                    </button>
                  ))}
                </div>
              </div>
            ) : (
              messages.map((m, i) => (
                <div key={i} style={{ display: 'flex', flexDirection: m.role === 'user' ? 'row-reverse' : 'row', gap: 8, alignItems: 'flex-start' }}>
                  {m.role === 'assistant' && (
                    <div style={{ width: 26, height: 26, borderRadius: '50%', background: 'var(--accent)', color: 'var(--accent-ink)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 700, fontSize: 12, flexShrink: 0 }}>M</div>
                  )}
                  <div style={{
                    maxWidth: '82%', padding: '9px 13px',
                    borderRadius: m.role === 'user' ? '11px 11px 4px 11px' : '11px 11px 11px 4px',
                    background: m.role === 'user' ? 'var(--accent)' : 'var(--panel2)',
                    color: m.role === 'user' ? 'var(--accent-ink)' : 'var(--text)',
                    fontSize: 13.5, lineHeight: 1.55,
                    border: m.role === 'assistant' ? '1px solid var(--line)' : 'none',
                    whiteSpace: 'pre-wrap',
                  }}>
                    {m.content}
                  </div>
                </div>
              ))
            )}
            {loading && (
              <div style={{ display: 'flex', gap: 8, alignItems: 'flex-start' }}>
                <div style={{ width: 26, height: 26, borderRadius: '50%', background: 'var(--accent)', color: 'var(--accent-ink)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 700, fontSize: 12, flexShrink: 0 }}>M</div>
                <div style={{ padding: '11px 14px', background: 'var(--panel2)', border: '1px solid var(--line)', borderRadius: '11px 11px 11px 4px', display: 'flex', gap: 4, alignItems: 'center' }}>
                  {[0, 1, 2].map(i => (
                    <span key={i} style={{ width: 5, height: 5, borderRadius: '50%', background: 'var(--accent)', animation: `mmPulse 1.2s ${i * 0.2}s ease-in-out infinite` }} />
                  ))}
                </div>
              </div>
            )}
            {error && (
              <div style={{ padding: '9px 13px', background: 'rgba(255,80,80,.1)', border: '1px solid rgba(255,80,80,.3)', borderRadius: 8, fontSize: 12.5, color: '#ff6060' }}>
                {error}
              </div>
            )}
            <div ref={bottomRef} />
          </div>

          {/* Input */}
          <div style={{ padding: '10px 14px', borderTop: '1px solid var(--line)', flexShrink: 0 }}>
            <div style={{ display: 'flex', gap: 8, alignItems: 'center', background: 'var(--panel2)', border: '1px solid var(--line2)', borderRadius: 9, padding: '8px 12px' }}>
              <input
                ref={inputRef}
                value={input}
                onChange={e => setInput(e.target.value)}
                onKeyDown={onKey}
                placeholder="Ask anything about Milan…"
                style={{ flex: 1, background: 'transparent', border: 'none', outline: 'none', color: 'var(--text)', fontFamily: 'inherit', fontSize: 13.5 }}
              />
              <button
                onClick={() => send(input)}
                disabled={!input.trim() || loading}
                style={{
                  cursor: input.trim() && !loading ? 'pointer' : 'default',
                  width: 28, height: 28, borderRadius: 7, border: 'none', flexShrink: 0,
                  background: input.trim() && !loading ? 'var(--accent)' : 'var(--line2)',
                  color: input.trim() && !loading ? 'var(--accent-ink)' : 'var(--text3)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 14,
                  transition: 'background .2s, color .2s',
                }}
              >
                ↑
              </button>
            </div>
            <div style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: 9.5, color: 'var(--text3)', marginTop: 7, textAlign: 'center' }}>
              AI-generated · may be imperfect · verify with Milan
            </div>
          </div>
        </div>
      )}
    </>
  )
}
