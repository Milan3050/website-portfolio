import { useEffect, useRef } from 'react'

export default function Footer() {
  const clockRef = useRef<HTMLSpanElement>(null)

  useEffect(() => {
    const tick = () => {
      if (clockRef.current) {
        clockRef.current.textContent = new Date().toLocaleTimeString('en-GB', {
          timeZone: 'Asia/Kolkata', hour: '2-digit', minute: '2-digit', second: '2-digit'
        }) + ' IST'
      }
    }
    tick()
    const id = setInterval(tick, 1000)
    return () => clearInterval(id)
  }, [])

  return (
    <footer style={{ borderTop: '1px solid var(--line)', padding: '26px 0 40px', fontFamily: "'JetBrains Mono',monospace", fontSize: 11, color: 'var(--text3)', letterSpacing: '.04em' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 14 }}>
        <span>© 2026 Milan M Baburaj</span>
        <span style={{ color: 'var(--text3)', fontSize: 10, letterSpacing: '.06em' }}>Built with <span style={{ color: 'var(--accent)' }}>Claude Code</span></span>
        <span>Bengaluru, India · <span ref={clockRef}>—</span></span>
      </div>
    </footer>
  )
}
