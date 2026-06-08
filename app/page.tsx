'use client'
import { useEffect, useRef, useState } from 'react'
import Image from 'next/image'
import LoadingScreen from './components/LoadingScreen'
import Header from './components/Header'
import ScrollDots from './components/ScrollDots'

// ─── Data ───────────────────────────────────────────────────────────────────

const SKILLS = ['JavaScript','TypeScript','Python','SQL','Node.js','Next.js','React','Supabase','PostgreSQL','Docker','Git','Linux','n8n','REST APIs','Agile']

const PROFILE_BULLETS = [
  '2+ years of commercial experience architecting and delivering full stack applications, data pipelines, and automation systems across live production environments.',
  'Funded FX trader with real financial markets exposure — engineered an automated forex trading bot in Python with Docker containerisation to systematise a rules-based trading strategy.',
  'Client-facing technology consultant who has independently acquired clients, defined solution requirements, and delivered digital transformation outcomes saving stakeholders 50+ hours per week.',
  'Promoted to Shift Manager at Amazon within 15 months — leading operational teams, driving KPI performance and implementing process improvements across high-volume logistics workflows.',
]

const EMPLOYMENT = [
  {
    title: 'Freelance Developer & Systems Analyst',
    company: 'Self-Employed',
    dates: 'Jan 2024 – Present',
    bullets: [
      'Independently acquired and managed multiple client engagements delivering full stack web applications, automation systems, and digital transformation solutions.',
      'Built and deployed production web platforms using Next.js, Tailwind CSS, Supabase, and Vercel — handling everything from architecture through to launch.',
      'Developed n8n-based automation workflows and data pipelines that eliminated manual processes, saving clients 50+ hours per week.',
      'Defined technical requirements directly with stakeholders, translating business needs into scalable software solutions.',
    ],
  },
  {
    title: 'Web Developer',
    company: 'Rhazes.ai',
    dates: 'Jun 2025 – Sep 2025',
    bullets: [
      'Contributed to the development of an AI-powered healthcare platform, building front-end components and integrating back-end APIs.',
      'Worked closely with the founding team to iterate rapidly on product features and ship improvements to a live production environment.',
      'Implemented authentication flows, database queries, and UI components using Next.js, Supabase, and Tailwind CSS.',
    ],
  },
  {
    title: 'Front-end Developer (Internship)',
    company: 'Rhazes.ai',
    dates: 'Dec 2023 – Mar 2024',
    bullets: [
      'Built responsive UI components and pages for the initial Rhazes.ai platform using React and Tailwind CSS.',
      'Collaborated with design and product teams to translate Figma designs into pixel-perfect, accessible web interfaces.',
      'Gained hands-on experience in a fast-moving startup environment, contributing to sprint cycles and code reviews.',
    ],
  },
  {
    title: 'Shift Manager',
    company: 'Amazon',
    dates: 'Jan 2026 – Present',
    bullets: [
      'Leading operational teams across high-volume logistics workflows, managing shift performance and KPI delivery.',
      'Driving continuous improvement initiatives and implementing process changes to improve throughput and accuracy.',
      'Mentoring associates and acting as a key point of escalation for operational issues during shifts.',
    ],
  },
  {
    title: 'Logistics Driver',
    company: 'Amazon',
    dates: 'Oct 2024 – Jan 2026',
    bullets: [
      'Delivered high volumes of parcels daily across assigned routes, consistently meeting time and accuracy targets.',
      'Demonstrated reliability and performance that led to rapid promotion to Shift Manager within 15 months.',
    ],
  },
  {
    title: 'Sales Associate (Shift Lead)',
    company: "Sainsbury's",
    dates: 'Oct 2021 – Oct 2024',
    bullets: [
      'Progressed to Shift Lead responsibility, coordinating team activities during peak trading periods.',
      'Delivered strong customer service standards and supported store management in daily operations.',
      'Developed leadership, communication, and time management skills in a high-footfall retail environment.',
    ],
  },
]

const PROJECTS = [
  {
    name: 'forex-bot',
    url: 'https://github.com/riyan707/forex-bot',
    chips: ['Python', 'Docker', 'MetaTrader 5', 'Pandas'],
    description: 'Automated forex trading bot built in Python, containerised with Docker. Implements a rules-based strategy using technical indicators, with live execution via MetaTrader 5 API. Deployed on a VPS for 24/7 operation.',
  },
  {
    name: 'client-tech-decider',
    url: 'https://github.com/riyan707/client-tech-decider',
    chips: ['Next.js', 'TypeScript', 'Tailwind CSS'],
    description: 'Decision-support tool that helps consultants recommend the right technology stack to clients based on project requirements, budget, and constraints. Built as an interactive questionnaire with weighted scoring logic.',
  },
  {
    name: 'timelapse-encoder',
    url: 'https://github.com/riyan707/timelapse-encoder',
    chips: ['Python', 'FFmpeg', 'CLI'],
    description: 'CLI tool for batch-encoding timelapse footage using FFmpeg. Handles frame rate conversion, quality tuning, and output formatting — designed for photographers who need reliable, scriptable video processing.',
  },
]

const CLIENT_WORK = [
  {
    name: 'thetechmaster.co.uk',
    url: 'https://thetechmaster.co.uk',
    chips: ['Next.js', 'Tailwind CSS', 'Node.js'],
    description: 'Full website build for a technology consultancy. Designed and developed from scratch, including custom animations, service pages, and a contact system.',
  },
  {
    name: 'rhazes.ai',
    url: 'https://rhazes.ai',
    chips: ['Next.js', 'Tailwind CSS', 'Supabase'],
    description: 'AI healthcare platform — contributed to front-end architecture and Supabase integration for the live product.',
  },
  {
    name: 'dsgnrlabs.com',
    url: 'https://dsgnrlabs.com',
    chips: ['Next.js', 'Tailwind CSS'],
    description: 'Portfolio site for a digital design studio. Minimal, fast, and fully responsive — built to showcase creative work.',
  },
  {
    name: 'fuloos.co.uk',
    url: 'https://fuloos.co.uk',
    chips: ['Shopify', 'Klaviyo', 'Meta Ads'],
    description: 'E-commerce setup and growth for a UK retail brand — Shopify store configuration, email automation via Klaviyo, and Meta Ads campaign management.',
  },
]

const FINANCE_BULLETS = [
  'Funded FX trader operating a live account — executing a systematic, rules-based strategy using technical analysis across major currency pairs.',
  'Engineered a fully automated trading bot in Python with Docker containerisation, enabling unattended execution of the strategy 24/5 across live markets.',
]

const MODULES = ['Web Technologies','Database Systems','Software Engineering','Business Intelligence','Project Management','Entrepreneurship','Data Analytics','Systems Analysis']

const CERTIFICATIONS = [
  { name: 'Digital Marketing', issuer: 'HubSpot Academy (Certified)', year: '2024' },
  { name: 'Languages', issuer: 'English (Native) · Arabic (Native)', year: '' },
]

// ─── Components ─────────────────────────────────────────────────────────────

function SectionHeader({ children }: { children: string }) {
  return (
    <h2 className="text-sm font-semibold tracking-wide mb-6">
      <span className="text-muted-foreground">##</span>
      <span className="ml-1">&gt; {children}</span>
    </h2>
  )
}

function Card({ children, className = '' }: { children: React.ReactNode; className?: string }) {
  return (
    <div className={`rounded-2xl border border-white/10 bg-white/[0.03] p-5 backdrop-blur ${className}`}>
      {children}
    </div>
  )
}

function ChipSecondary({ label }: { label: string }) {
  return (
    <span className="inline-flex items-center rounded-full border-transparent bg-white/10 text-foreground px-2 py-0.5 text-[11px] font-medium mr-1 mb-1">
      {label}
    </span>
  )
}

function ChipOutline({ label }: { label: string }) {
  return (
    <span className="inline-flex items-center rounded-full border border-white/15 text-foreground px-2 py-0.5 text-[11px] font-medium whitespace-nowrap flex-shrink-0">
      {label}
    </span>
  )
}

function ExternalLinkIcon() {
  return (
    <svg width="12" height="12" viewBox="0 0 12 12" fill="none" className="inline ml-1 opacity-50">
      <path d="M3.5 2H2a1 1 0 0 0-1 1v7a1 1 0 0 0 1 1h7a1 1 0 0 0 1-1V8.5M7 1h4m0 0v4m0-4L5.5 6.5" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  )
}

function AnimateSection({ children, id }: { children: React.ReactNode; id: string }) {
  const ref = useRef<HTMLDivElement>(null)
  useEffect(() => {
    const el = ref.current
    if (!el) return
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) el.classList.add('visible') },
      { threshold: 0.1 }
    )
    obs.observe(el)
    return () => obs.disconnect()
  }, [])
  return (
    <div id={id} ref={ref} className="animate-on-scroll">
      {children}
    </div>
  )
}

// ─── Page ────────────────────────────────────────────────────────────────────

export default function Home() {
  const [loaded, setLoaded] = useState(false)

  return (
    <>
      <LoadingScreen onComplete={() => setLoaded(true)} />
      <Header visible={loaded} />
      <ScrollDots />

      {/* Download CV button */}
      {loaded && (
        <a
          href="/cv/Riyan_Al-Ghamdi_CV.pdf"
          download="Riyan_Al-Ghamdi_CV.pdf"
          className="fixed bottom-6 right-6 z-40 bg-white/10 hover:bg-white/20 text-foreground border border-white/15 backdrop-blur rounded-full px-4 py-2 text-sm font-medium transition-colors"
        >
          Download CV
        </a>
      )}

      <main
        className="relative"
        style={{
          opacity: loaded ? 1 : 0,
          transform: loaded ? 'translateY(0)' : 'translateY(16px)',
          transition: 'opacity 0.6s ease 0.1s, transform 0.6s ease 0.1s',
        }}
      >
        {/* Ambient glow */}
        <div className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
          <div className="absolute left-1/2 top-[-120px] h-[520px] w-[520px] -translate-x-1/2 rounded-full bg-white/5 blur-[120px]" />
        </div>

        <div className="max-w-3xl mx-auto px-5 py-10 pt-24">

          {/* ── HERO ── */}
          <section id="hero" className="mb-10">
            <div className="flex items-start gap-5 mb-6">
              {/* Profile photo */}
              <div className="relative h-16 w-16 flex-shrink-0">
                <div className="absolute -inset-3 rounded-full blur-2xl bg-white/20 opacity-60" />
                <div className="relative h-16 w-16 overflow-hidden rounded-full ring-1 ring-white/15">
                  <Image
                    src="/images/riyan.jpg"
                    fill
                    alt="Riyan Al-Ghamdi"
                    className="object-cover object-top"
                    sizes="64px"
                    priority
                  />
                </div>
              </div>
              <div>
                <h1 className="text-4xl sm:text-5xl font-semibold tracking-tight text-foreground mb-2">
                  Riyan Al-Ghamdi
                </h1>
                <p className="text-sm text-muted-foreground">
                  <span className="text-foreground font-medium">Full Stack Developer</span>
                  {' '}· Technology Consultant · BSc Business Computing, Brunel University (2:1)
                </p>
              </div>
            </div>

            {/* Contact row */}
            <div className="flex flex-wrap gap-x-4 gap-y-1 mb-6 text-sm text-muted-foreground">
              <a href="https://github.com/riyan707" target="_blank" rel="noopener noreferrer" className="hover:text-foreground transition-colors">
                github.com/riyan707
              </a>
              <span>·</span>
              <a href="https://riyanalghamdi.com" target="_blank" rel="noopener noreferrer" className="hover:text-foreground transition-colors">
                riyanalghamdi.com
              </a>
              <span>·</span>
              <span>London, UK</span>
            </div>

            {/* Skills */}
            <div className="flex flex-wrap gap-1">
              {SKILLS.map(s => <ChipSecondary key={s} label={s} />)}
            </div>
          </section>

          <hr className="border-white/10 my-10" />

          {/* ── PROFILE ── */}
          <AnimateSection id="profile">
            <SectionHeader>PROFILE</SectionHeader>
            <Card>
              <ul className="space-y-3">
                {PROFILE_BULLETS.map((b, i) => (
                  <li key={i} className="flex gap-2 text-sm text-muted-foreground leading-relaxed">
                    <span className="text-foreground/40 mt-0.5 flex-shrink-0">·</span>
                    <span>{b}</span>
                  </li>
                ))}
              </ul>
            </Card>
          </AnimateSection>

          <hr className="border-white/10 my-10" />

          {/* ── EMPLOYMENT ── */}
          <AnimateSection id="employment">
            <SectionHeader>EMPLOYMENT</SectionHeader>
            <div className="space-y-4">
              {EMPLOYMENT.map((job, i) => (
                <Card key={i}>
                  <div className="flex items-start justify-between gap-2 mb-1">
                    <span className="font-semibold text-sm text-foreground">{job.title}</span>
                    <ChipOutline label={job.dates} />
                  </div>
                  <p className="text-sm text-muted-foreground mb-3">{job.company}</p>
                  <ul className="space-y-1.5">
                    {job.bullets.map((b, j) => (
                      <li key={j} className="flex gap-2 text-sm text-muted-foreground leading-relaxed">
                        <span className="text-foreground/40 mt-0.5 flex-shrink-0">·</span>
                        <span>{b}</span>
                      </li>
                    ))}
                  </ul>
                </Card>
              ))}
            </div>
          </AnimateSection>

          <hr className="border-white/10 my-10" />

          {/* ── PROJECTS ── */}
          <AnimateSection id="projects">
            <SectionHeader>PROJECTS</SectionHeader>
            <div className="space-y-4">
              {PROJECTS.map((p, i) => (
                <Card key={i}>
                  <div className="flex items-start justify-between gap-2 mb-2">
                    <span className="font-semibold text-sm text-foreground">{p.name}</span>
                    <a href={p.url} target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-foreground transition-colors text-xs flex-shrink-0">
                      GitHub<ExternalLinkIcon />
                    </a>
                  </div>
                  <div className="flex flex-wrap mb-3">
                    {p.chips.map(c => <ChipSecondary key={c} label={c} />)}
                  </div>
                  <p className="text-sm text-muted-foreground leading-relaxed">{p.description}</p>
                </Card>
              ))}
            </div>
          </AnimateSection>

          <hr className="border-white/10 my-10" />

          {/* ── CLIENT WORK ── */}
          <AnimateSection id="clients">
            <SectionHeader>CLIENT WORK</SectionHeader>
            <div className="space-y-4">
              {CLIENT_WORK.map((c, i) => (
                <Card key={i}>
                  <div className="flex items-start justify-between gap-2 mb-2">
                    <span className="font-semibold text-sm text-foreground">{c.name}</span>
                    <a href={c.url} target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-foreground transition-colors text-xs flex-shrink-0">
                      Live<ExternalLinkIcon />
                    </a>
                  </div>
                  <div className="flex flex-wrap mb-3">
                    {c.chips.map(ch => <ChipSecondary key={ch} label={ch} />)}
                  </div>
                  <p className="text-sm text-muted-foreground leading-relaxed">{c.description}</p>
                </Card>
              ))}
            </div>
          </AnimateSection>

          <hr className="border-white/10 my-10" />

          {/* ── FINANCIAL SERVICES ── */}
          <AnimateSection id="finance">
            <SectionHeader>FINANCIAL SERVICES</SectionHeader>
            <Card>
              <ul className="space-y-3">
                {FINANCE_BULLETS.map((b, i) => (
                  <li key={i} className="flex gap-2 text-sm text-muted-foreground leading-relaxed">
                    <span className="text-foreground/40 mt-0.5 flex-shrink-0">·</span>
                    <span>{b}</span>
                  </li>
                ))}
              </ul>
            </Card>
          </AnimateSection>

          <hr className="border-white/10 my-10" />

          {/* ── EDUCATION ── */}
          <AnimateSection id="education">
            <SectionHeader>EDUCATION</SectionHeader>
            <Card>
              <div className="flex items-start justify-between gap-2 mb-1">
                <span className="font-semibold text-sm text-foreground">BSc Business Computing (2:1)</span>
                <ChipOutline label="Sep 2022 – Jun 2025" />
              </div>
              <p className="text-sm text-muted-foreground mb-4">Brunel University London</p>
              <div className="flex flex-wrap gap-1">
                {MODULES.map(m => <ChipSecondary key={m} label={m} />)}
              </div>
            </Card>
          </AnimateSection>

          <hr className="border-white/10 my-10" />

          {/* ── CERTIFICATIONS ── */}
          <AnimateSection id="certifications">
            <SectionHeader>CERTIFICATIONS</SectionHeader>
            <Card>
              <ul className="space-y-3">
                {CERTIFICATIONS.map((c, i) => (
                  <li key={i} className="flex items-start justify-between gap-4">
                    <div>
                      <p className="text-sm text-foreground font-medium">{c.name}</p>
                      <p className="text-xs text-muted-foreground mt-0.5">{c.issuer}</p>
                    </div>
                    {c.year && <ChipOutline label={c.year} />}
                  </li>
                ))}
              </ul>
            </Card>
          </AnimateSection>

          {/* Footer */}
          <div className="mt-16 pb-10 flex items-center justify-between">
            <p className="text-xs text-muted-foreground">
              © {new Date().getFullYear()} Riyan Al-Ghamdi
            </p>
            <div className="relative h-16 w-16 overflow-hidden rounded-lg opacity-50">
              <Image src="/qr.png" fill alt="QR Code" sizes="64px" className="object-contain" />
            </div>
          </div>

        </div>
      </main>
    </>
  )
}
