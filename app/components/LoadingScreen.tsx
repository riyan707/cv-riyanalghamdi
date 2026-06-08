'use client'
import { useEffect, useRef } from 'react'

interface LoadingScreenProps {
  onComplete: () => void
}

export default function LoadingScreen({ onComplete }: LoadingScreenProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const startTimeRef = useRef<number>(0)
  const rafRef = useRef<number>(0)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    const size = 160
    canvas.width = size
    canvas.height = size

    const cx = size / 2
    const cy = size / 2
    const radius = 68
    const lineWidth = 3
    const duration = 2000

    startTimeRef.current = performance.now()

    function draw(now: number) {
      const elapsed = now - startTimeRef.current
      const progress = Math.min(elapsed / duration, 1)

      ctx!.clearRect(0, 0, size, size)

      // Track ring (dim)
      ctx!.beginPath()
      ctx!.arc(cx, cy, radius, 0, Math.PI * 2)
      ctx!.strokeStyle = 'rgba(15,110,86,0.15)'
      ctx!.lineWidth = lineWidth
      ctx!.stroke()

      // Progress ring
      const startAngle = -Math.PI / 2
      const endAngle = startAngle + Math.PI * 2 * progress
      ctx!.beginPath()
      ctx!.arc(cx, cy, radius, startAngle, endAngle)
      ctx!.strokeStyle = '#0F6E56'
      ctx!.lineWidth = lineWidth
      ctx!.lineCap = 'round'
      ctx!.stroke()

      if (progress < 1) {
        rafRef.current = requestAnimationFrame(draw)
      } else {
        setTimeout(onComplete, 300)
      }
    }

    rafRef.current = requestAnimationFrame(draw)
    return () => cancelAnimationFrame(rafRef.current)
  }, [onComplete])

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-[#0D0D0D] z-50">
      <div className="relative" style={{ width: 160, height: 160 }}>
        <canvas ref={canvasRef} className="absolute inset-0" style={{ width: 160, height: 160 }} />
        <div className="absolute inset-0 flex items-center justify-center">
          <div
            className="rounded-full overflow-hidden bg-[#1a1a1a]"
            style={{ width: 120, height: 120 }}
          >
            {/* Placeholder — riyan.jpg will be dropped in */}
            <div className="w-full h-full bg-[#1a1a1a] flex items-center justify-center">
              <span className="text-[#888] text-xs">RA</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
