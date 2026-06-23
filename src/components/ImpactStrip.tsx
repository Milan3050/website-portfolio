import { useEffect, useRef } from 'react'

const STATS = [
  { count: 4, suffix: '+', label: 'years building\nproduction software' },
  { count: 30000, suffix: '+', label: 'medical professionals\nserved' },
  { count: 100, suffix: '+', label: 'enterprise clients\nsupported' },
  { count: 500, suffix: '+', label: 'AI workflows automated\neach week', accent: true },
]

function animateCount(el: HTMLElement, target: number, suffix: string) {
  const dur = 1200, start = performance.now()
  const fmt = (n: number) => Math.round(n).toLocaleString('en-US')
  const step = (now: number) => {
    const p = Math.min(1, (now - start) / dur)
    const e = 1 - Math.pow(1 - p, 3)
    el.textContent = fmt(target * e) + suffix
    if (p < 1) requestAnimationFrame(step)
    else el.textContent = fmt(target) + suffix
  }
  requestAnimationFrame(step)
}

export default function ImpactStrip() {
  const stripRef = useRef<HTMLDivElement>(null)
  const animated = useRef(false)

  useEffect(() => {
    const el = stripRef.current
    if (!el) return
    const observer = new IntersectionObserver(entries => {
      if (entries[0].isIntersecting && !animated.current) {
        animated.current = true
        el.querySelectorAll<HTMLElement>('[data-count]').forEach(counter => {
          const target = parseFloat(counter.dataset.count!)
          const suffix = counter.dataset.suffix || ''
          animateCount(counter, target, suffix)
        })
        observer.disconnect()
      }
    }, { threshold: 0.3 })
    observer.observe(el)
    return () => observer.disconnect()
  }, [])

  return (
    <section className="reveal" style={{ padding: '44px 0', borderTop: '1px solid var(--line)' }}>
      <div ref={stripRef} className="mm-impact" style={{ display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: 1, background: 'var(--line)', border: '1px solid var(--line)', borderRadius: 12, overflow: 'hidden' }}>
        {STATS.map((s, i) => (
          <div key={i} style={{ background: 'var(--bg)', padding: '28px 24px' }}>
            <div
              data-count={s.count}
              data-suffix={s.suffix}
              style={{ fontWeight: 600, fontSize: 'clamp(34px,4vw,52px)', lineHeight: 1, letterSpacing: '-.02em', color: s.accent ? 'var(--accent)' : 'var(--text)' }}
            >
              {s.count.toLocaleString('en-US')}{s.suffix}
            </div>
            <div style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: 11.5, color: 'var(--text2)', marginTop: 12, lineHeight: 1.5, whiteSpace: 'pre-line' }}>
              {s.label}
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}
