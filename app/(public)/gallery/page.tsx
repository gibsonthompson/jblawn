import { Metadata } from 'next'
import GalleryClient from './GalleryClient'

export const metadata: Metadata = {
  title: 'Our Work | Before & After Gallery | JB Lawn Care & Hauling',
  description: 'See real before and after transformations from JB Lawn Care & Hauling jobs across the Bay Area. Junk removal, lawn care, landscaping, and yard cleanup results.',
}

export default function GalleryPage() {
  return <GalleryClient />
}
