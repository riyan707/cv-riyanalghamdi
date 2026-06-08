'use client'

interface HeaderProps {
  visible: boolean
}

export default function Header({ visible }: HeaderProps) {
  return (
    <header
      className="fixed top-0 left-0 right-0 z-40 transition-all duration-500"
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? 'translateY(0)' : 'translateY(-10px)',
        backdropFilter: 'blur(12px)',
        WebkitBackdropFilter: 'blur(12px)',
        backgroundColor: 'rgba(13,13,13,0.85)',
        borderBottom: '1px solid rgba(15,110,86,0.15)',
        pointerEvents: visible ? 'auto' : 'none',
      }}
    >
      <div className="max-w-4xl mx-auto px-5 py-3 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="rounded-full overflow-hidden bg-[#1a1a1a] flex-shrink-0" style={{ width: 40, height: 40 }}>
            <div className="w-full h-full bg-[#1a1a1a] flex items-center justify-center">
              <span className="text-[#888] text-xs font-medium">RA</span>
            </div>
          </div>
          <span className="text-[#F0F0F0] font-medium text-sm">Riyan Al-Ghamdi</span>
        </div>
        <div className="text-[#888] text-xs hidden sm:block">
          +44 7393807556 · riyanalghamdiofficial@gmail.com
        </div>
      </div>
    </header>
  )
}
