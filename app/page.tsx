'use client'
import { useEffect, useRef, useState } from 'react'
import LoadingScreen from './components/LoadingScreen'
import Header from './components/Header'
import ScrollDots from './components/ScrollDots'

const SKILLS = ['JavaScript','TypeScript','Python','SQL','Node.js','Next.js','React','Supabase','PostgreSQL','Docker','Git','Linux','n8n','REST APIs','Agile']

function Section({ id, children }: { id: string; children: React.ReactNode }) {
  return (
    <section id={id} className="mb-20">
      {children}
    </section>
  )
}

function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <p className="slide-from-left text-xs font-semibold tracking-widest text-[#0F6E56] mb-8 uppercase">
      {children}
    </p>
  )
}

function Chip({ label }: { label: string }) {
  return (
    <span className="inline-block px-2 py-0.5 text-xs border border-[#0F6E56] text-[#0F6E56] rounded mr-1.5 mb-1.5">
      {label}
    </span>
  )
}

function BulletItem({ text, delay = 0 }: { text: string; delay?: number }) {
  return (
    <li
      className="animate-on-scroll text-[#888] text-sm leading-relaxed flex gap-2"
      style={{ transitionDelay: `${delay}ms` }}
    >
      <span className="text-[#0F6E56] mt-1 flex-shrink-0">·</span>
      <span>{text}</span>
    </li>
  )
}

function JobCard({ title, company, dates, bullets }: {
  title: string; company: string; dates: string; bullets: string[]
}) {
  return (
    <div className="animate-on-scroll mb-8 border-l border-[#1a1a1a] pl-5">
      <div className="flex flex-wrap items-start justify-between gap-1 mb-3">
        <div>
          <span className="font-semibold text-[#F0F0F0] text-sm">{title}</span>
          <span className="text-[#0F6E56] text-sm"> · {company}</span>
        </div>
        <span className="text-[#555] text-xs whitespace-nowrap">{dates}</span>
      </div>
      <ul className="space-y-2">
        {bullets.map((b, i) => <BulletItem key={i} text={b} delay={i * 80} />)}
      </ul>
    </div>
  )
}

function ProjectCard({ name, stack, url, desc }: {
  name: string; stack: string[]; url: string; desc: string
}) {
  return (
    <div className="animate-on-scroll mb-6 p-5 border border-[#1a1a1a] rounded-lg hover:border-[#0F6E56] transition-colors duration-300">
      <div className="flex flex-wrap items-center justify-between gap-2 mb-2">
        <span className="font-semibold text-[#F0F0F0] text-sm">{name}</span>
        <a href={`https://${url}`} target="_blank" rel="noopener noreferrer" className="text-[#0F6E56] text-xs hover:underline">
          {url} ↗
        </a>
      </div>
      <div className="mb-3">{stack.map(s => <Chip key={s} label={s} />)}</div>
      <p className="text-[#888] text-sm leading-relaxed">{desc}</p>
    </div>
  )
}

function ClientCard({ url, stack, desc }: { url: string; stack: string[]; desc: string }) {
  return (
    <div className="animate-on-scroll mb-6 p-5 border border-[#1a1a1a] rounded-lg hover:border-[#0F6E56] transition-colors duration-300">
      <div className="flex flex-wrap items-center justify-between gap-2 mb-2">
        <a href={`https://${url}`} target="_blank" rel="noopener noreferrer" className="font-semibold text-[#F0F0F0] text-sm hover:text-[#0F6E56] transition-colors">
          {url} ↗
        </a>
      </div>
      <div className="mb-2">{stack.map(s => <Chip key={s} label={s} />)}</div>
      <p className="text-[#888] text-sm">{desc}</p>
    </div>
  )
}

export default function Home() {
  const [loading, setLoading] = useState(true)
  const [headerVisible, setHeaderVisible] = useState(false)
  const [contentVisible, setContentVisible] = useState(false)
  const mainRef = useRef<HTMLDivElement>(null)

  const handleLoadComplete = () => {
    setLoading(false)
    setTimeout(() => {
      setHeaderVisible(true)
      setContentVisible(true)
    }, 100)
  }

  // Intersection Observer for scroll animations
  useEffect(() => {
    if (!contentVisible) return
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible')
          }
        })
      },
      { threshold: 0.1, rootMargin: '0px 0px -50px 0px' }
    )

    const elements = document.querySelectorAll('.animate-on-scroll, .slide-from-left')
    elements.forEach(el => observer.observe(el))
    return () => observer.disconnect()
  }, [contentVisible])

  return (
    <>
      {loading && <LoadingScreen onComplete={handleLoadComplete} />}
      <Header visible={headerVisible} />
      <ScrollDots />

      <div
        ref={mainRef}
        className="transition-all duration-700 ease-out"
        style={{
          opacity: contentVisible ? 1 : 0,
          transform: contentVisible ? 'translateY(0)' : 'translateY(30px)',
        }}
      >
        <main className="max-w-4xl mx-auto px-5 pt-28 pb-24">

          {/* HERO */}
          <Section id="hero">
            <h1 className="text-4xl sm:text-5xl font-semibold text-[#F0F0F0] mb-4 leading-tight">
              Riyan Al-Ghamdi
            </h1>
            <p className="text-[#888] text-sm sm:text-base mb-6 leading-relaxed max-w-2xl">
              Full Stack Developer · Technology Consultant · BSc Business Computing, Brunel University (2:1)
            </p>
            <div className="flex flex-wrap gap-x-4 gap-y-1 mb-8 text-xs text-[#555]">
              <a href="https://github.com/riyan707" target="_blank" rel="noopener noreferrer" className="hover:text-[#0F6E56] transition-colors">github.com/riyan707 ↗</a>
              <a href="https://riyanalghamdi.com" target="_blank" rel="noopener noreferrer" className="hover:text-[#0F6E56] transition-colors">riyanalghamdi.com ↗</a>
              <span>London, UK</span>
            </div>
            <div className="flex flex-wrap">
              {SKILLS.map(s => <Chip key={s} label={s} />)}
            </div>
          </Section>

          {/* PROFILE */}
          <Section id="profile">
            <SectionLabel>Profile</SectionLabel>
            <ul className="space-y-3">
              {[
                '2+ years of commercial experience architecting and delivering full stack applications, data pipelines, and automation systems across live production environments',
                'Funded FX trader with real financial markets exposure — engineered an automated forex trading bot in Python with Docker containerisation to systematise a rules-based trading strategy',
                'Client-facing technology consultant who has independently acquired clients, defined solution requirements, and delivered digital transformation outcomes saving stakeholders 50+ hours per week',
                'Promoted to Shift Manager at Amazon within 15 months — leading operational teams, driving KPI performance and implementing process improvements across high-volume logistics workflows',
              ].map((b, i) => <BulletItem key={i} text={b} delay={i * 80} />)}
            </ul>
          </Section>

          {/* EMPLOYMENT */}
          <Section id="employment">
            <SectionLabel>Employment</SectionLabel>
            <JobCard
              title="Freelance Developer & Systems Analyst"
              company="Self-Employed"
              dates="Jan 2024 – Present"
              bullets={[
                'Engaged clients across multiple sectors, conducting requirements workshops, defining solution architecture and delivering end-to-end technology implementations aligned to business objectives',
                'Engineered n8n automation pipelines integrating multi-source data feeds, reducing manual processing overhead by 50+ hours per week',
                'Architected and deployed full stack web applications using Next.js, React, Node.js and PostgreSQL/Supabase — managing UI, API middleware, database schema design and CI/CD pipelines',
                'Developed and optimised SQL queries to extract, transform and surface structured datasets for both technical and C-suite stakeholders',
                'Maintained comprehensive project documentation, version control governance and stakeholder communication cadence across concurrent client engagements',
              ]}
            />
            <JobCard
              title="Web Developer"
              company="Rhazes.ai"
              dates="Jun 2025 – Sep 2025"
              bullets={[
                'Owned and delivered a full production site rebuild in under four weeks as the sole engineer, meeting a hard product launch deadline',
                'Operated across the full stack on Linux — managing dependency resolution, environment configuration and Vercel deployment pipeline via Git-based CI/CD',
                'Designed a scalable content management architecture with custom database schema and query logic',
                'Served as primary technical liaison to the CEO, translating engineering decisions into clear business language',
              ]}
            />
            <JobCard
              title="Front-end Developer (Internship)"
              company="Rhazes.ai"
              dates="Dec 2023 – Mar 2024"
              bullets={[
                'Embedded in an agile sprint team delivering an AI web application, contributing to planning, iterative development and code reviews',
                'Rapidly acquired Next.js proficiency and delivered production-ready components within weeks',
              ]}
            />
            <JobCard
              title="Shift Manager"
              company="Amazon"
              dates="Jan 2026 – Present"
              bullets={[
                'Promoted to Shift Manager within 15 months — accountable for end-to-end shift operations, team performance and KPI delivery across a high-volume logistics network',
                'Leverage real-time operational dashboards and performance data to identify inefficiencies, reallocate resource and drive continuous improvement',
                'Lead, coach and performance-manage a team of delivery drivers, maintaining accountability frameworks to operational standards',
                'Collaborate cross-functionally with station leadership to implement process improvements and resolve escalations under time pressure',
              ]}
            />
            <JobCard
              title="Logistics Driver"
              company="Amazon"
              dates="Oct 2024 – Jan 2026"
              bullets={[
                'Consistently exceeded delivery KPIs in a metrics-driven, high-accountability environment — demonstrating the performance mindset that drove promotion to management',
              ]}
            />
            <JobCard
              title="Sales Associate (Shift Lead)"
              company="Sainsbury's"
              dates="Oct 2021 – Oct 2024"
              bullets={[
                'Led cross-functional shift teams, developing stakeholder management, leadership and operational coordination skills',
                'Utilised internal data systems to monitor stock and sales performance',
              ]}
            />
          </Section>

          {/* PROJECTS */}
          <Section id="projects">
            <SectionLabel>Projects</SectionLabel>
            <ProjectCard
              name="forex-bot"
              stack={['Python','Docker']}
              url="github.com/riyan707/forex-bot"
              desc="Automated FX trading system, containerised with Docker, structured across config/models/src/utils — 49 commits. Translates a manual trading strategy into a systematic automated execution framework."
            />
            <ProjectCard
              name="client-tech-decider"
              stack={['TypeScript','Next.js','Drizzle ORM']}
              url="github.com/riyan707/client-tech-decider"
              desc="Full stack decision-support web app guiding users to the optimal technology stack via a structured quiz. Deployed on Vercel with CI/CD."
            />
            <ProjectCard
              name="timelapse-encoder"
              stack={['Python','FFmpeg']}
              url="github.com/riyan707/timelapse-encoder"
              desc="Desktop video processing application — Tkinter GUI, Watchdog folder monitoring, configurable FFmpeg encoding, bundled binary for zero-dependency deployment."
            />
          </Section>

          {/* CLIENT WORK */}
          <Section id="client-work">
            <SectionLabel>Client Work</SectionLabel>
            <ClientCard url="thetechmaster.co.uk" stack={['Next.js','Tailwind CSS','Node.js']} desc="Full production website designed and built end to end" />
            <ClientCard url="rhazes.ai" stack={['Next.js','Tailwind CSS','Supabase']} desc="Multiple development cycles for an AI startup including full site rebuild and CRM integration" />
            <ClientCard url="dsgnrlabs.com" stack={['Next.js','Tailwind CSS']} desc="Personal design and development studio brand and site" />
            <ClientCard url="fuloos.co.uk" stack={['Shopify','Klaviyo','Meta Ads']} desc="Full e-commerce solution for a clothing brand" />
          </Section>

          {/* FINANCIAL SERVICES */}
          <Section id="financial">
            <SectionLabel>Financial Services</SectionLabel>
            <ul className="space-y-3">
              {[
                'Funded FX Trader — passed a structured proprietary trading evaluation and traded with firm capital in live foreign exchange markets, developing deep understanding of risk management frameworks and data-driven decision making under pressure',
                'Engineered an automated Python trading bot (Docker containerised, 49 commits) to systematise a manual strategy — bridging financial domain expertise with technical implementation',
              ].map((b, i) => <BulletItem key={i} text={b} delay={i * 80} />)}
            </ul>
          </Section>

          {/* EDUCATION */}
          <Section id="education">
            <SectionLabel>Education</SectionLabel>
            <div className="animate-on-scroll">
              <div className="flex flex-wrap items-start justify-between gap-1 mb-3">
                <div>
                  <p className="font-semibold text-[#F0F0F0] text-sm">BSc (Hons) Business Computing — Upper Second Class (2:1)</p>
                  <p className="text-[#0F6E56] text-sm">Brunel University London</p>
                </div>
                <span className="text-[#555] text-xs whitespace-nowrap">Sep 2022 – Jun 2025</span>
              </div>
              <p className="text-[#888] text-sm leading-relaxed">
                Modules: Database Design and SQL, Business Intelligence and Analytics, Systems Analysis and Design, Software Development, Project Management and Agile Methods, Statistics and Data Analysis
              </p>
            </div>
          </Section>

          {/* CERTIFICATIONS */}
          <Section id="certifications">
            <SectionLabel>Certifications</SectionLabel>
            <ul className="space-y-3">
              {[
                'Digital Marketing — HubSpot Academy (Certified)',
                'Actively developing: Python data analysis, Docker/Kubernetes, AWS/GCP cloud fundamentals',
                'Languages: English (Native) · Arabic (Native)',
              ].map((b, i) => <BulletItem key={i} text={b} delay={i * 80} />)}
            </ul>
          </Section>

        </main>
      </div>

      {/* Download CV Button */}
      <a
        href="/cv/Riyan_Al-Ghamdi_CV.pdf"
        download
        className="fixed bottom-6 right-6 z-40 flex items-center gap-2 px-5 py-3 rounded-lg text-white text-sm font-medium transition-opacity duration-500"
        style={{
          backgroundColor: '#0F6E56',
          boxShadow: '0 4px 20px rgba(15,110,86,0.3)',
          minHeight: 48,
          opacity: contentVisible ? 1 : 0,
          pointerEvents: contentVisible ? 'auto' : 'none',
        }}
      >
        Download CV
      </a>
    </>
  )
}
