import { Metadata } from 'next'
import AboutClient from './AboutClient'

export const metadata: Metadata = {
  title: 'About JB Lawn Care & Hauling | Bay Area Lawn & Hauling Experts',
  description: 'Learn about JB Lawn Care & Hauling — a locally owned lawn care, junk removal, and hauling company serving Oakland, Hayward, Fremont, and the greater Bay Area. Fully insured, 5.0★ rated.',
}

export default function AboutPage() {
  return <AboutClient />
}
