import { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { AREAS_DATA, AREA_SLUGS } from '../../../../lib/areas-data'
import AreaPageClient from './AreaPageClient'

const BASE_URL = 'https://jblawncareandhualing.com'

export function generateStaticParams() {
  return AREA_SLUGS.map((city) => ({ city }))
}

export function generateMetadata({ params }: { params: { city: string } }): Metadata {
  const area = AREAS_DATA[params.city]
  if (!area) return {}
  return {
    metadataBase: new URL(BASE_URL),
    title: area.metaTitle,
    description: area.metaDescription,
    alternates: {
      canonical: `/areas/${area.slug}`,
    },
    openGraph: {
      title: area.metaTitle,
      description: area.metaDescription,
      url: `${BASE_URL}/areas/${area.slug}`,
      siteName: 'JB Lawn Care & Hauling',
      locale: 'en_US',
      type: 'website',
    },
  }
}

export default function AreaPage({ params }: { params: { city: string } }) {
  const area = AREAS_DATA[params.city]
  if (!area) notFound()

  const schema = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "@id": `${BASE_URL}/#business`,
    "name": "JB Lawn Care & Hauling",
    "url": BASE_URL,
    "telephone": "341-260-0331",
    "priceRange": "$$",
    "address": {
      "@type": "PostalAddress",
      "addressRegion": "CA",
      "addressCountry": "US",
    },
    "areaServed": {
      "@type": "City",
      "name": area.city,
      "containedInPlace": { "@type": "State", "name": "California" },
    },
    "description": area.metaDescription,
    "serviceType": ["Lawn Care", "Junk Removal", "Landscaping", "Yard Cleanup", "Hauling"],
  }

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": area.faqs.map(f => ({
      "@type": "Question",
      "name": f.q,
      "acceptedAnswer": { "@type": "Answer", "text": f.a },
    })),
  }

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <AreaPageClient area={area} />
    </>
  )
}