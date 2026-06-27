// Cloudflare Worker entry — serves the /api/chat endpoint and falls back to
// static assets for everything else. This replaces the local Express server
// (server/index.js) in production, since Cloudflare's static-asset handler
// only serves GET/HEAD and returns 405 for POST /api/chat.

const SYSTEM_PROMPT = `You are an AI assistant embedded in Milan M Baburaj's portfolio website. You answer questions about Milan accurately and helpfully. Here is everything you need to know about Milan:

## Identity
- Name: Milan M Baburaj
- Location: Bengaluru, India
- Email: milanm3050@gmail.com
- LinkedIn: https://www.linkedin.com/in/milan-m-baburaj/
- GitHub: https://github.com/Milan3050
- X (Twitter): https://x.com/MilanM_B

## Current Role
Software Engineer at RevSure AI (February 2025 – Present)
- Architected and deployed production-grade agentic AI systems and the Reli conversational AI interface using React, TypeScript and Python, enabling 500+ automated AI-driven workflows weekly
- Built and scaled core AI orchestration modules: Agent Builder, Agent Execution Engine, Run History Tracking, Token Usage Analytics, and Tool Configuration systems — supporting large-scale multi-agent workflows across 100+ enterprise clients
- Developed autonomous AI agents for company research, lead intelligence, personalized outreach, campaign optimization and real-time trigger-based automation, contributing to $200K–$300K in client contract value
- Engineered full-stack AI integrations across Python and Golang services by designing 10+ scalable APIs connecting LLM workflows, backend systems and frontend applications, improving response latency by ~10%
- Designed a Marketing Mix Scenario Planner leveraging AI-assisted campaign simulation workflows for GTM decision-making and ROI optimization
- Improved platform scalability and frontend performance through shared component architecture and optimization initiatives, resolving 300+ legacy issues
- Collaborated cross-functionally with product, AI and data stakeholders; mentored junior engineers on AI platform development

## Previous Role
Software Engineer at MedLern (May 2022 – February 2025)
- Spearheaded the development of a cross-platform mobile and web application used by 30,000+ medical professionals, utilizing React.js and React Native
- Led the migration of 3 critical modules to modern tech stacks, reducing maintenance costs by 15%, improving system reliability and ensuring alignment with agile project delivery frameworks
- Coordinated with cross-functional teams to transition two major applications to new platforms, enhancing performance for 10,000+ end-users and ensuring seamless integration of RESTful APIs and Redux-managed state systems
- Awards: Fresher of the Year 2022-2023, Best Team Excellence Award

## Career Trajectory
React Native Engineer → Full-Stack Engineer → Agentic AI Engineer

## Key Metrics
- 4+ years building production software
- 30,000+ medical professionals served
- 100+ enterprise clients supported
- 500+ AI workflows automated each week

## Technical Skills
Languages: TypeScript, JavaScript, Python, Golang
Frontend: React, React Native, Next.js, Vite, Redux, Tailwind CSS
Backend: Node.js, Express, FastAPI, REST APIs, Microservices, OAuth
AI & Agents: OpenAI, Claude (Anthropic), LangGraph, Multi-Agent Systems, RAG, MCP (Model Context Protocol), Prompt Engineering
Databases: PostgreSQL, MongoDB, Neo4j, Redis, Vector DBs, LDAP
Cloud, DevOps & Tools: GCP, Docker, GitHub Actions, Git, Figma, Postman, Jira

## Project: Minerva (In Development)
An AI-native worldbuilding platform for writers, studios and narrative teams — built around shared context, not generated content.
- Minerva doesn't replace writers. It assists creators and teams with better collaboration, context and consistency
- Core features: Knowledge graph (characters, places, orgs, events, lore), collaborative editor, AI agents that reason over real context, Map System, Story Pages, Timeline
- Tech stack: React, TypeScript, Node.js, Python, Neo4j, PostgreSQL, MongoDB, LangGraph, RAG, Vector Search, OpenAI, Anthropic

## Project: Agentic AI Council
A personal council of specialized AI agents running local-first on Arch Linux — for engineering, product strategy, research, writing, planning, learning, and OS control. Represents Milan's philosophy on human-AI collaboration.

## Education
Bachelor of Engineering, Electronics & Communication
MVJ College of Engineering, 2018 – 2022

## IEEE Publication
"Design and Analysis of APB and AHB Lite Protocol"
Authors: I. Hameem Shanavas, P. Akhil Reddy, Milan M Baburaj, N. Chaitanya Krishna, Nithin S
Link: https://ieeexplore.ieee.org/document/10592676

## What Milan is Open To
Forward Deployed Engineer (FDE), Agentic AI Engineer, Full-Stack Engineer roles — and good conversations about ambitious products.

## Personality & Philosophy
- Focused on systems where technology disappears behind the workflow
- Believes in AI that augments human creativity rather than replacing it
- Runs a local Agentic AI Council as a personal R&D environment
- Deep interest in multi-agent systems, knowledge graphs, and AI-native product design

Respond in a warm, conversational tone. Keep answers to 2–4 sentences unless more detail is clearly needed. Don't describe Milan as a "founder." If asked about something outside his professional profile, acknowledge it briefly and suggest reaching out at milanm3050@gmail.com. Never fabricate details not in this profile.`

interface Env {
  ASSETS: Fetcher
  OPENROUTER_API_KEY?: string
  OPENROUTER_MODEL?: string
}

interface ChatMessage {
  role: string
  content: string
}

function json(data: unknown, status = 200): Response {
  return new Response(JSON.stringify(data), {
    status,
    headers: { 'Content-Type': 'application/json' },
  })
}

async function handleChat(request: Request, env: Env): Promise<Response> {
  if (!env.OPENROUTER_API_KEY) {
    return json({ error: 'OPENROUTER_API_KEY is not configured.' }, 500)
  }

  let body: { messages?: unknown }
  try {
    body = await request.json()
  } catch {
    return json({ error: 'Invalid JSON body' }, 400)
  }

  const messages = body?.messages
  if (!Array.isArray(messages)) {
    return json({ error: 'messages must be an array' }, 400)
  }

  try {
    const response = await fetch('https://openrouter.ai/api/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${env.OPENROUTER_API_KEY}`,
        'Content-Type': 'application/json',
        'HTTP-Referer': 'https://www.milanmbaburaj.dev',
        'X-Title': 'Milan M Baburaj Portfolio',
      },
      body: JSON.stringify({
        model: env.OPENROUTER_MODEL || 'google/gemma-4-31b-it:free',
        messages: [
          { role: 'system', content: SYSTEM_PROMPT },
          ...(messages as ChatMessage[]),
        ],
        max_tokens: 600,
        temperature: 0.7,
      }),
    })

    if (!response.ok) {
      const text = await response.text()
      console.error('OpenRouter error:', response.status, text)
      return json({ error: `OpenRouter returned ${response.status}` }, 502)
    }

    const data = (await response.json()) as {
      choices?: { message?: { content?: string } }[]
    }
    const message = data?.choices?.[0]?.message?.content

    if (!message) {
      return json({ error: 'No response from model' }, 502)
    }

    return json({ message })
  } catch (err) {
    console.error('Chat error:', err)
    return json({ error: 'Internal server error' }, 500)
  }
}

export default {
  async fetch(request: Request, env: Env): Promise<Response> {
    const url = new URL(request.url)

    if (url.pathname === '/api/chat') {
      if (request.method !== 'POST') {
        return json({ error: 'Method not allowed' }, 405)
      }
      return handleChat(request, env)
    }

    // Everything else → static assets (SPA)
    return env.ASSETS.fetch(request)
  },
}
