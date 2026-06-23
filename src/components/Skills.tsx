import { useEffect, useRef } from 'react'
import { Theme } from '../App'

interface Props { theme: Theme }

const DARK_LOGOS = new Set(['nextdotjs', 'express'])

const OPENAI_PATH = 'M22.2819 9.8211a5.9847 5.9847 0 0 0-.5157-4.9108 6.0462 6.0462 0 0 0-6.5098-2.9A6.0651 6.0651 0 0 0 4.9807 4.1818a5.9847 5.9847 0 0 0-3.9977 2.9 6.0462 6.0462 0 0 0 .7427 7.0966 5.98 5.98 0 0 0 .511 4.9107 6.051 6.051 0 0 0 6.5146 2.9001A5.9847 5.9847 0 0 0 13.2599 24a6.0557 6.0557 0 0 0 5.7718-4.2058 5.9894 5.9894 0 0 0 3.9977-2.9001 6.0557 6.0557 0 0 0-.7475-7.0729zm-9.022 12.6081a4.4755 4.4755 0 0 1-2.8764-1.0408l.1419-.0804 4.7783-2.7582a.7948.7948 0 0 0 .3927-.6813v-6.7369l2.02 1.1686a.071.071 0 0 1 .038.052v5.5826a4.504 4.504 0 0 1-4.4945 4.4944zm-9.6607-4.1254a4.4708 4.4708 0 0 1-.5346-3.0137l.142.0852 4.783 2.7582a.7712.7712 0 0 0 .7806 0l5.8428-3.3685v2.3324a.0804.0804 0 0 1-.0332.0615L9.74 19.9502a4.4992 4.4992 0 0 1-6.1408-1.6464zM2.3408 7.8956a4.485 4.485 0 0 1 2.3655-1.9728V11.6a.7664.7664 0 0 0 .3879.6765l5.8144 3.3543-2.0201 1.1685a.0757.0757 0 0 1-.071 0l-4.8303-2.7865A4.504 4.504 0 0 1 2.3408 7.872zm16.5963 3.8558L13.1038 8.364 15.1192 7.2a.0757.0757 0 0 1 .071 0l4.8303 2.7913a4.4944 4.4944 0 0 1-.6765 8.1042v-5.6772a.79.79 0 0 0-.407-.667zm2.0107-3.0231l-.142-.0852-4.7735-2.7818a.7759.7759 0 0 0-.7854 0L9.409 9.2297V6.8974a.0662.0662 0 0 1 .0284-.0615l4.8303-2.7866a4.4992 4.4992 0 0 1 6.6802 4.66zM8.3065 12.863l-2.02-1.1638a.0804.0804 0 0 1-.038-.0567V6.0742a4.4992 4.4992 0 0 1 7.3757-3.4537l-.142.0805L8.704 5.459a.7948.7948 0 0 0-.3927.6813zm1.0976-2.3654l2.602-1.4998 2.6069 1.4998v2.9994l-2.5974 1.4997-2.6067-1.4997Z'

const SKILL_GROUPS = [
  { title: 'Languages', items: [
    { n: 'TypeScript', s: 'typescript' }, { n: 'JavaScript', s: 'javascript' },
    { n: 'Python', s: 'python' }, { n: 'Golang', s: 'go' },
  ]},
  { title: 'Frontend', items: [
    { n: 'React', s: 'react' }, { n: 'React Native', s: 'react' }, { n: 'Next.js', s: 'nextdotjs' },
    { n: 'Vite', s: 'vite' }, { n: 'Redux', s: 'redux' }, { n: 'Tailwind', s: 'tailwindcss' },
  ]},
  { title: 'Backend', items: [
    { n: 'Node.js', s: 'nodedotjs' }, { n: 'Express', s: 'express' }, { n: 'FastAPI', s: 'fastapi' },
    { n: 'REST APIs', s: null }, { n: 'Microservices', s: null }, { n: 'OAuth', s: null },
  ]},
  { title: 'AI & Agents', items: [
    { n: 'OpenAI', s: 'openai' }, { n: 'Claude', s: 'anthropic' }, { n: 'LangGraph', s: 'langchain' },
    { n: 'Multi-Agent', s: null }, { n: 'RAG', s: null }, { n: 'MCP', s: null }, { n: 'Prompt Eng.', s: null },
  ]},
  { title: 'Databases', items: [
    { n: 'PostgreSQL', s: 'postgresql' }, { n: 'MongoDB', s: 'mongodb' }, { n: 'Neo4j', s: 'neo4j' },
    { n: 'Redis', s: 'redis' }, { n: 'Vector DBs', s: null }, { n: 'LDAP', s: null },
  ]},
  { title: 'Cloud, DevOps & Tools', items: [
    { n: 'GCP', s: 'googlecloud' }, { n: 'Docker', s: 'docker' }, { n: 'GitHub Actions', s: 'githubactions' },
    { n: 'Git', s: 'git' }, { n: 'Figma', s: 'figma' }, { n: 'Postman', s: 'postman' }, { n: 'Jira', s: 'jira' },
  ]},
]

function logoSrc(slug: string, theme: Theme) {
  if (DARK_LOGOS.has(slug)) return `https://cdn.simpleicons.org/${slug}/${theme === 'dark' ? 'ffffff' : '000000'}`
  return `https://cdn.simpleicons.org/${slug}`
}

export default function Skills({ theme }: Props) {
  const wrapRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const wrap = wrapRef.current
    if (!wrap) return
    const imgs = wrap.querySelectorAll<HTMLImageElement>('img[data-slug]')
    imgs.forEach(img => {
      const slug = img.dataset.slug!
      img.src = logoSrc(slug, theme)
    })
  }, [theme])

  return (
    <section id="skills" style={{ padding: '84px 0', borderTop: '1px solid var(--line)' }}>
      <div style={{ display: 'flex', alignItems: 'baseline', gap: 14, marginBottom: 44 }}>
        <span style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: 12, color: 'var(--accent)' }}>05</span>
        <h2 data-reactive style={{ fontWeight: 600, fontSize: 'clamp(28px,3.4vw,40px)', letterSpacing: '-.02em', margin: 0 }}>Skills</h2>
        <div style={{ flex: 1, height: 1, background: 'var(--line)' }} />
      </div>
      <div ref={wrapRef} style={{ display: 'flex', flexDirection: 'column', gap: 30 }}>
        {SKILL_GROUPS.map(g => (
          <div key={g.title} className="reveal">
            <div style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: 11, letterSpacing: '.14em', color: 'var(--text3)', marginBottom: 14, textTransform: 'uppercase' }}>
              {g.title}
            </div>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 10 }}>
              {g.items.map(it => (
                <div
                  key={it.n}
                  className="mm-card"
                  style={{ display: 'flex', alignItems: 'center', gap: 10, border: '1px solid var(--line)', borderRadius: 10, padding: '10px 14px', background: 'var(--panel)' }}
                >
                  {it.s === 'openai' ? (
                    <svg width={18} height={18} viewBox="0 0 24 24" style={{ flexShrink: 0 }} aria-label="OpenAI logo">
                      <path fill={theme === 'dark' ? '#c4b5fd' : '#412991'} d={OPENAI_PATH} />
                    </svg>
                  ) : it.s ? (
                    <img
                      data-slug={it.s}
                      src={logoSrc(it.s, theme)}
                      alt={`${it.n} logo`}
                      width={18}
                      height={18}
                      style={{ width: 18, height: 18, objectFit: 'contain', flexShrink: 0 }}
                      onError={e => { (e.currentTarget as HTMLImageElement).style.display = 'none' }}
                    />
                  ) : (
                    <span style={{ width: 6, height: 6, borderRadius: '50%', background: 'var(--accent)', flexShrink: 0 }} />
                  )}
                  <span style={{ fontSize: 14, color: 'var(--text)', whiteSpace: 'nowrap' }}>{it.n}</span>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}
