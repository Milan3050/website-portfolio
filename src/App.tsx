import { useState, useEffect, useRef, useCallback } from 'react'
import Nav from './components/Nav'
import Hero from './components/Hero'
import ImpactStrip from './components/ImpactStrip'
import About from './components/About'
import Projects from './components/Projects'
import Experience from './components/Experience'
import Skills from './components/Skills'
import Education from './components/Education'
import Testimonials from './components/Testimonials'
import Contact from './components/Contact'
import Footer from './components/Footer'
import CommandPalette from './components/CommandPalette'
import AskMilan from './components/AskMilan'

export type Theme = 'dark' | 'light'

function scrollToSection(id: string) {
  const el = document.getElementById(id)
  if (el) {
    const y = el.getBoundingClientRect().top + window.scrollY - 72
    window.scrollTo({ top: y, behavior: 'smooth' })
  }
}

export default function App() {
  const [theme, setTheme] = useState<Theme>(() => {
    try { return (localStorage.getItem('mmb_theme') || 'dark') as Theme } catch { return 'dark' }
  })
  const [paletteOpen, setPaletteOpen] = useState(false)
  const glowRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    document.documentElement.dataset.theme = theme
    try { localStorage.setItem('mmb_theme', theme) } catch { /* noop */ }
  }, [theme])

  const toggleTheme = useCallback((e: React.MouseEvent) => {
    const next: Theme = theme === 'dark' ? 'light' : 'dark'
    const x = e.clientX ?? window.innerWidth - 40
    const y = e.clientY ?? 40
    const reduce = window.matchMedia?.('(prefers-reduced-motion: reduce)').matches
    if (!document.startViewTransition || reduce) { setTheme(next); return }
    const end = Math.hypot(Math.max(x, window.innerWidth - x), Math.max(y, window.innerHeight - y))
    const t = document.startViewTransition(() => setTheme(next))
    t.ready.then(() => {
      document.documentElement.animate(
        { clipPath: [`circle(0px at ${x}px ${y}px)`, `circle(${end}px at ${x}px ${y}px)`] },
        { duration: 620, easing: 'cubic-bezier(.4,0,.2,1)', pseudoElement: '::view-transition-new(root)' }
      )
    })
  }, [theme])

  // Cursor grid glow
  useEffect(() => {
    const glow = glowRef.current
    if (!glow) return
    let raf = 0
    const onMove = (e: MouseEvent) => {
      if (raf) return
      raf = requestAnimationFrame(() => {
        raf = 0
        glow.style.setProperty('--gx', e.clientX + 'px')
        glow.style.setProperty('--gy', e.clientY + 'px')
        glow.style.opacity = '0.55'
      })
    }
    const onLeave = () => { glow.style.opacity = '0' }
    document.addEventListener('mousemove', onMove, { passive: true })
    document.addEventListener('mouseleave', onLeave)
    return () => {
      document.removeEventListener('mousemove', onMove)
      document.removeEventListener('mouseleave', onLeave)
      if (raf) cancelAnimationFrame(raf)
    }
  }, [])

  // Reactive typography — wrap data-reactive text in char spans
  useEffect(() => {
    const reduce = window.matchMedia?.('(prefers-reduced-motion: reduce)').matches
    if (reduce) return
    const chars: HTMLSpanElement[] = []
    document.querySelectorAll<HTMLElement>('[data-reactive]').forEach(h => {
      const text = h.textContent || ''
      h.textContent = ''
      const words = text.split(/[\s ]+/).filter(w => w.length)
      words.forEach((word, wi) => {
        const wspan = document.createElement('span')
        wspan.style.cssText = 'display:inline-block;white-space:nowrap;'
        for (const ch of word) {
          const s = document.createElement('span')
          s.textContent = ch
          s.style.cssText = 'display:inline-block;transition:transform .22s cubic-bezier(.22,.61,.36,1),color .22s ease;will-change:transform;'
          wspan.appendChild(s)
          chars.push(s)
        }
        h.appendChild(wspan)
        if (wi < words.length - 1) h.appendChild(document.createTextNode(' '))
      })
    })
    let mx = -300, my = -300, raf = 0
    const R = 124
    const onMove = (e: MouseEvent) => {
      mx = e.clientX; my = e.clientY
      if (raf) return
      raf = requestAnimationFrame(() => {
        raf = 0
        for (const s of chars) {
          const r = s.getBoundingClientRect()
          if (r.bottom < -60 || r.top > window.innerHeight + 60) { s.style.transform = ''; s.style.color = ''; continue }
          const cx = r.left + r.width / 2, cy = r.top + r.height / 2
          const d = Math.hypot(mx - cx, my - cy)
          const t = Math.max(0, 1 - d / R)
          if (t <= 0) { s.style.transform = ''; s.style.color = ''; continue }
          s.style.transform = `translateY(${-(t * t * 6).toFixed(2)}px)`
          s.style.color = t > 0.45 ? 'var(--accent)' : ''
        }
      })
    }
    document.addEventListener('mousemove', onMove, { passive: true })
    return () => { document.removeEventListener('mousemove', onMove); if (raf) cancelAnimationFrame(raf) }
  }, [])

  // Global scroll reveal for all .reveal elements
  useEffect(() => {
    const reduce = window.matchMedia?.('(prefers-reduced-motion: reduce)').matches
    const observer = new IntersectionObserver(entries => {
      entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add('visible'); observer.unobserve(e.target) } })
    }, { threshold: 0.1 })
    const attach = () => {
      document.querySelectorAll('.reveal').forEach(el => {
        if (reduce) { el.classList.add('visible') } else { observer.observe(el) }
      })
    }
    // Run after components mount
    const id = setTimeout(attach, 100)
    return () => { clearTimeout(id); observer.disconnect() }
  }, [])

  // Global keydown: Cmd/Ctrl+K → palette, Escape → close
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault()
        setPaletteOpen(v => !v)
      }
      if (e.key === 'Escape') { setPaletteOpen(false) }
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [])

  return (
    <div style={{
      background: 'var(--bg)',
      color: 'var(--text)',
      fontFamily: "'Space Grotesk',system-ui,sans-serif",
      minHeight: '100vh',
      backgroundImage: 'linear-gradient(var(--grid) 1px,transparent 1px),linear-gradient(90deg,var(--grid) 1px,transparent 1px)',
      backgroundSize: '68px 68px',
      backgroundAttachment: 'fixed',
    }}>
      {/* Cursor grid glow */}
      <div ref={glowRef} style={{
        position: 'fixed', inset: 0, zIndex: 0, pointerEvents: 'none', opacity: 0,
        transition: 'opacity .35s ease',
        backgroundImage: 'linear-gradient(var(--accent) 1px,transparent 1px),linear-gradient(90deg,var(--accent) 1px,transparent 1px)',
        backgroundSize: '68px 68px',
        WebkitMaskImage: 'radial-gradient(circle 165px at var(--gx,-300px) var(--gy,-300px),rgba(0,0,0,.5) 0%,rgba(0,0,0,.24) 48%,transparent 74%)',
        maskImage: 'radial-gradient(circle 165px at var(--gx,-300px) var(--gy,-300px),rgba(0,0,0,.5) 0%,rgba(0,0,0,.24) 48%,transparent 74%)',
      } as React.CSSProperties} />

      <Nav
        theme={theme}
        toggleTheme={toggleTheme}
        onOpenPalette={() => setPaletteOpen(true)}
        onNavigate={scrollToSection}
      />

      <main style={{ maxWidth: 1240, margin: '0 auto', padding: '58px 28px 0', position: 'relative', zIndex: 1 }}>
        <Hero onNavigate={scrollToSection} />
        <ImpactStrip />
        <About />
        <Experience />
        <Projects />
        <Skills theme={theme} />
        <Education />
        <Testimonials />
        <Contact />
        <Footer />
      </main>

      {paletteOpen && (
        <CommandPalette onClose={() => setPaletteOpen(false)} onNavigate={(id) => { scrollToSection(id); setPaletteOpen(false) }} />
      )}
      <AskMilan />
    </div>
  )
}
