'use client'
import { useEffect, useState } from 'react'

const SECTIONS = ['hero', 'profile', 'employment', 'projects', 'clients', 'finance', 'education', 'certifications']

export default function ScrollDots() {
  const [active, setActive] = useState('hero')
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    let hideTimer: ReturnType<typeof setTimeout>

    const observer = new IntersectionObserver(
      entries => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            setActive(entry.target.id)
            setVisible(true)
            clearTimeout(hideTimer)
            hideTimer = setTimeout(() => setVisible(false), 2000)
          }
        })
      },
      { threshold: 0.4 }
    )

    SECTIONS.forEach(id => {
      const el = document.getElementById(id)
      if (el) observer.observe(el)
    })

    return () => {
      observer.disconnect()
      clearTimeout(hideTimer)
    }
  }, [])

  return (
    <nav
      className="fixed right-4 top-1/2 -translate-y-1/2 z-40 flex flex-col gap-2"
      style={{
        opacity: visible ? 1 : 0,
        transition: 'opacity 0.4s ease',
      }}
    >
      {SECTIONS.map(id => (
        <button
          key={id}
          onClick={() => document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })}
          aria-label={id}
          className="block rounded-full transition-all duration-300"
          style={{
            width: active === id ? '8px' : '6px',
            height: active === id ? '8px' : '6px',
            backgroundColor: active === id ? 'rgba(255,255,255,0.8)' : 'rgba(255,255,255,0.3)',
            transform: active === id ? 'scale(1.2)' : 'scale(1)',
          }}
        />
      ))}
    </nav>
  )
}
