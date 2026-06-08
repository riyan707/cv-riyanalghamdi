'use client'
import { useEffect, useRef, useState } from 'react'

const SECTIONS = ['hero', 'profile', 'employment', 'projects', 'client-work', 'financial', 'education', 'certifications']

export default function ScrollDots() {
  const [activeIndex, setActiveIndex] = useState(0)
  const [visible, setVisible] = useState(false)
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null)

  useEffect(() => {
    const handleScroll = () => {
      setVisible(true)
      if (timerRef.current) clearTimeout(timerRef.current)
      timerRef.current = setTimeout(() => setVisible(false), 1500)

      // Find active section
      const scrollY = window.scrollY + window.innerHeight / 3
      let activeIdx = 0
      SECTIONS.forEach((id, i) => {
        const el = document.getElementById(id)
        if (el && el.offsetTop <= scrollY) activeIdx = i
      })
      setActiveIndex(activeIdx)
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <div
      className="fixed right-3 top-1/2 -translate-y-1/2 z-30 flex flex-col gap-3 transition-opacity duration-500"
      style={{ opacity: visible ? 1 : 0 }}
    >
      {SECTIONS.map((id, i) => (
        <button
          key={id}
          onClick={() => scrollTo(id)}
          aria-label={`Scroll to ${id}`}
          className="block transition-all duration-300"
          style={{
            width: activeIndex === i ? 8 : 4,
            height: activeIndex === i ? 8 : 4,
            borderRadius: '50%',
            backgroundColor: activeIndex === i ? '#0F6E56' : '#888888',
            opacity: activeIndex === i ? 0.8 : 0.35,
            boxShadow: activeIndex === i ? '0 0 6px rgba(15,110,86,0.6)' : 'none',
            border: 'none',
            padding: 0,
            cursor: 'pointer',
            transition: 'all 0.3s ease',
          }}
        />
      ))}
    </div>
  )
}
