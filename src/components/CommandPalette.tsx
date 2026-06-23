import { useState, useEffect, useRef } from 'react'

interface Props {
  onClose: () => void
  onNavigate: (id: string) => void
}

const COMMANDS = [
  { id: 'about', label: 'About', hint: 'intro' },
  { id: 'minerva', label: 'Minerva', hint: 'product' },
  { id: 'projects', label: 'Projects', hint: 'work' },
  { id: 'experience', label: 'Work Experience', hint: 'roles' },
  { id: 'skills', label: 'Skills', hint: 'stack' },
  { id: 'education', label: 'Education', hint: 'degree' },
  { id: 'testimonials', label: 'Testimonials', hint: 'refs' },
  { id: 'contact', label: 'Contact', hint: 'reach out' },
]

export default function CommandPalette({ onClose, onNavigate }: Props) {
  const [q, setQ] = useState('')
  const [idx, setIdx] = useState(0)
  const inputRef = useRef<HTMLInputElement>(null)

  const filtered = q.trim()
    ? COMMANDS.filter(c => (c.label + ' ' + c.hint).toLowerCase().includes(q.toLowerCase()))
    : COMMANDS

  useEffect(() => { inputRef.current?.focus() }, [])

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'ArrowDown') { e.preventDefault(); setIdx(i => Math.min(filtered.length - 1, i + 1)) }
      if (e.key === 'ArrowUp') { e.preventDefault(); setIdx(i => Math.max(0, i - 1)) }
      if (e.key === 'Enter') { const c = filtered[idx]; if (c) onNavigate(c.id) }
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [filtered, idx, onNavigate])

  useEffect(() => { setIdx(0) }, [q])

  return (
    <div
      onClick={onClose}
      style={{ position: 'fixed', inset: 0, zIndex: 150, background: 'rgba(6,7,9,.55)', backdropFilter: 'blur(4px)', display: 'flex', alignItems: 'flex-start', justifyContent: 'center', paddingTop: '13vh' }}
    >
      <div
        onClick={e => e.stopPropagation()}
        style={{ width: 'min(600px, 92vw)', background: 'var(--panel)', border: '1px solid var(--line2)', borderRadius: 14, overflow: 'hidden', boxShadow: 'var(--shadow)', animation: 'mmFade .14s ease' }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '16px 18px', borderBottom: '1px solid var(--line)' }}>
          <span style={{ fontFamily: "'JetBrains Mono',monospace", color: 'var(--accent)' }}>›</span>
          <input
            ref={inputRef}
            value={q}
            onChange={e => setQ(e.target.value)}
            placeholder="Jump to a section…"
            style={{ flex: 1, background: 'transparent', border: 'none', outline: 'none', color: 'var(--text)', fontFamily: "'JetBrains Mono',monospace", fontSize: 14 }}
          />
          <span style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: 10, color: 'var(--text3)', border: '1px solid var(--line2)', borderRadius: 4, padding: '2px 6px' }}>ESC</span>
        </div>
        <div style={{ maxHeight: '46vh', overflowY: 'auto', padding: 8 }}>
          {filtered.map((c, i) => (
            <button
              key={c.id}
              onClick={() => onNavigate(c.id)}
              onMouseEnter={() => setIdx(i)}
              style={{
                cursor: 'pointer', width: '100%', textAlign: 'left', display: 'flex', alignItems: 'center', gap: 14,
                padding: '12px 14px', border: 'none', borderRadius: 8, background: i === idx ? 'var(--accent-soft)' : 'transparent',
                fontFamily: 'inherit',
              }}
            >
              <span style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: 11, color: i === idx ? 'var(--accent)' : 'var(--text3)', width: 30, flexShrink: 0 }}>go</span>
              <span style={{ fontSize: 15, color: i === idx ? 'var(--text)' : 'var(--text2)', flex: 1 }}>{c.label}</span>
              <span style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: 11, color: 'var(--text3)' }}>{c.hint}</span>
            </button>
          ))}
        </div>
        <div style={{ display: 'flex', gap: 18, padding: '11px 18px', borderTop: '1px solid var(--line)', fontFamily: "'JetBrains Mono',monospace", fontSize: 10.5, color: 'var(--text3)' }}>
          <span>↑↓ navigate</span><span>⏎ select</span><span>esc close</span>
        </div>
      </div>
    </div>
  )
}
