import { useEffect, useRef } from 'react'
import { Theme } from '../App'

interface Props {
  theme: Theme
  toggleTheme: (e: React.MouseEvent) => void
  onOpenPalette: () => void
  onNavigate: (id: string) => void
}

const NAV_LINKS = [
  { id: 'about', label: 'About' },
  { id: 'experience', label: 'Experience' },
  { id: 'projects', label: 'Projects' },
  { id: 'skills', label: 'Skills' },
  { id: 'contact', label: 'Contact' },
]

export default function Nav({ theme, toggleTheme, onOpenPalette, onNavigate }: Props) {
  const linksRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const sections = [...document.querySelectorAll<HTMLElement>('main section[id]')]
    const links = linksRef.current?.querySelectorAll<HTMLElement>('[data-navid]') ?? []

    const updateSpy = () => {
      const mid = window.scrollY + window.innerHeight * 0.42
      let activeId = sections[0]?.id ?? ''
      for (const s of sections) { if (s.offsetTop <= mid) activeId = s.id }
      links.forEach(l => { l.style.color = l.dataset.navid === activeId ? 'var(--text)' : 'var(--text2)' })
    }

    const applyResponsive = () => {
      if (linksRef.current) linksRef.current.style.display = window.innerWidth > 860 ? 'flex' : 'none'
    }

    window.addEventListener('scroll', updateSpy, { passive: true })
    window.addEventListener('resize', applyResponsive)
    applyResponsive()
    updateSpy()
    return () => { window.removeEventListener('scroll', updateSpy); window.removeEventListener('resize', applyResponsive) }
  }, [])

  return (
    <header style={{
      position: 'fixed', top: 0, left: 0, right: 0, zIndex: 90,
      background: 'color-mix(in srgb, var(--bg) 86%, transparent)',
      backdropFilter: 'blur(12px)',
      borderBottom: '1px solid var(--line)',
    }}>
      <nav style={{ maxWidth: 1240, margin: '0 auto', height: 58, display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0 28px' }}>
        <button
          className="mm-link mm-btn mm-ghost"
          onClick={() => onNavigate('top')}
          style={{ cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 10, color: 'var(--text)', fontWeight: 700, fontSize: 16, letterSpacing: '-.01em', background: 'transparent', border: 'none', padding: 0 }}
        >
          <span style={{ width: 9, height: 9, borderRadius: '50%', background: 'var(--good)', boxShadow: '0 0 0 3px var(--accent-soft)', flexShrink: 0 }} />
          Milan&nbsp;Baburaj
        </button>

        <div ref={linksRef} style={{ display: 'none', alignItems: 'center', gap: 26, fontSize: 14 }}>
          {NAV_LINKS.map(l => (
            <button
              key={l.id}
              data-navid={l.id}
              className="mm-link"
              onClick={() => onNavigate(l.id)}
              style={{ cursor: 'pointer', color: 'var(--text2)', background: 'transparent', border: 'none', padding: 0, fontFamily: 'inherit', fontSize: 14 }}
            >
              {l.label}
            </button>
          ))}
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <button
            className="mm-btn mm-ghost"
            onClick={onOpenPalette}
            title="Search (⌘K)"
            style={{ cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 7, fontFamily: "'JetBrains Mono',monospace", fontSize: 11, color: 'var(--text2)', background: 'transparent', border: '1px solid var(--line2)', borderRadius: 7, padding: '7px 10px' }}
          >
            Search<span style={{ border: '1px solid var(--line2)', borderRadius: 4, padding: '0 4px', color: 'var(--accent)' }}>⌘K</span>
          </button>
          <button
            className="mm-btn mm-ghost"
            onClick={toggleTheme}
            title="Toggle theme"
            style={{ cursor: 'pointer', width: 38, height: 34, display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'transparent', border: '1px solid var(--line2)', borderRadius: 7, color: 'var(--text)', fontSize: 15 }}
          >
            {theme === 'dark' ? '☾' : '☀'}
          </button>
        </div>
      </nav>
    </header>
  )
}
