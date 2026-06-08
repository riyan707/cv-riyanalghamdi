import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Riyan Al-Ghamdi — Full Stack Developer',
  description: 'Full Stack Developer · Technology Consultant · BSc Business Computing, Brunel University',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
