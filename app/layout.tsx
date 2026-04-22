import type { Metadata } from 'next'
import { Plus_Jakarta_Sans } from 'next/font/google'
import './globals.css'

const jakarta = Plus_Jakarta_Sans({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700', '800'],
  variable: '--font-body',
})

export const metadata: Metadata = {
  title: 'JB Lawn Care & Hauling | Bay Area\'s Trusted Lawn & Property Experts',
  description: 'JB Lawn Care & Hauling serves the Bay Area with professional lawn maintenance, landscaping, junk hauling, and property cleanups. Call 341-260-0331 for a free estimate.',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <head>
        <link
          href="https://fonts.googleapis.com/css2?family=Archivo+Black&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className={jakarta.variable}>{children}</body>
    </html>
  )
}