'use client'
import { useEffect, useState } from 'react'

interface LoadingScreenProps {
  onComplete: () => void
}

export default function LoadingScreen({ onComplete }: LoadingScreenProps) {
  const [progress, setProgress] = useState(0)
  const [done, setDone] = useState(false)

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval)
          setTimeout(() => {
            setDone(true)
            setTimeout(onComplete, 600)
          }, 200)
          return 100
        }
        return prev + Math.random() * 15
      })
    }, 80)
    return () => clearInterval(interval)
  }, [onComplete])

  const circumference = 2 * Math.PI * 40
  const strokeDashoffset = circumference - (Math.min(progress, 100) / 100) * circumference

  return (
    <div
      className="fixed inset-0 z-50 flex flex-col items-center justify-center transition-opacity duration-600"
      style={{
        backgroundColor: 'hsl(0 0% 3.9%)',
        opacity: done ? 0 : 1,
        pointerEvents: done ? 'none' : 'all',
        transition: 'opacity 0.6s ease',
      }}
    >
      {/* Ambient glow */}
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute left-1/2 top-1/2 h-[400px] w-[400px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-white/5 blur-[120px]" />
      </div>

      <div className="relative flex items-center justify-center">
        <svg width="100" height="100" className="-rotate-90">
          {/* Track */}
          <circle
            cx="50" cy="50" r="40"
            fill="none"
            stroke="rgba(255,255,255,0.08)"
            strokeWidth="2"
          />
          {/* Progress */}
          <circle
            cx="50" cy="50" r="40"
            fill="none"
            stroke="rgba(255,255,255,0.8)"
            strokeWidth="2"
            strokeLinecap="round"
            strokeDasharray={circumference}
            strokeDashoffset={strokeDashoffset}
            style={{ transition: 'stroke-dashoffset 0.08s linear' }}
          />
        </svg>
        <span className="absolute text-xs text-white/60 font-medium">
          {Math.round(Math.min(progress, 100))}%
        </span>
      </div>

      <p className="mt-6 text-xs text-white/30 tracking-widest uppercase">Loading</p>
    </div>
  )
}
