import { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { AREAS_DATA, AREA_SLUGS } from '../../../../lib/areas-data'
import AreaPageClient from './AreaPageClient'

export function generateStaticParams() {
  return AREA_SLUGS.map((city) => ({ city }))
}

export function generateMetadata({ params }: { params: { city: string } }): Metadata {
  const area = AREAS_DATA[params.city]
  if (!area) return {}
  return {
    title: area.metaTitle,
    description: area.metaDescription,
  }
}

export default function AreaPage({ params }: { params: { city: string } }) {
  const area = AREAS_DATA[params.city]
  if (!area) notFound()

  const schema = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "name": "JB Lawn Care & Hauling",
    "telephone": "341-260-0331",
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
