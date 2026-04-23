import type { Metadata } from 'next'
import { Plus_Jakarta_Sans } from 'next/font/google'
import './globals.css'

const jakarta = Plus_Jakarta_Sans({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700', '800'],
  variable: '--font-body',
})

export const metadata: Metadata = {
  title: 'JB Lawn Care & Hauling | Junk Removal, Lawn Mowing & Yard Cleanup in the Bay Area',
  description: 'JB Lawn Care & Hauling provides affordable junk removal, lawn mowing, landscaping, yard cleanup, and dump trailer rental across Oakland, Hayward, Fremont, and the greater Bay Area. Same-day estimates. Call 341-260-0331.',
  icons: {
    icon: '/favicon.png',
    apple: '/apple-icon.png',
  },
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