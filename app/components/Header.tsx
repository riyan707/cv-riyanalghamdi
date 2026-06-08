'use client'
import Image from 'next/image'

interface HeaderProps {
  visible: boolean
}

export default function Header({ visible }: HeaderProps) {
  return (
    <header
      className="fixed top-0 left-0 right-0 z-40 border-b border-white/5 backdrop-blur-md bg-background/80"
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? 'translateY(0)' : 'translateY(-8px)',
        transition: 'opacity 0.5s ease, transform 0.5s ease',
        pointerEvents: visible ? 'all' : 'none',
      }}
    >
      <div className="max-w-3xl mx-auto px-5 py-3 flex items-center justify-between">
        <div className="flex items-center gap-3">
          {/* Mini profile photo */}
          <div className="relative h-8 w-8 flex-shrink-0">
            <div className="absolute -inset-1 rounded-full blur-md bg-white/20 opacity-60" />
            <div className="relative h-8 w-8 overflow-hidden rounded-full ring-1 ring-white/15">
              <Image
                src="/images/riyan.jpg"
                fill
                alt="Riyan Al-Ghamdi"
                className="object-cover"
                sizes="32px"
              />
            </div>
          </div>
          <span className="font-medium text-sm text-foreground">Riyan Al-Ghamdi</span>
        </div>
        <span className="text-xs text-muted-foreground hidden sm:block">
          +44 7393807556 · riyanalghamdiofficial@gmail.com
        </span>
      </div>
    </header>
  )
}
