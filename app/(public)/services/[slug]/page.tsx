import { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { SERVICES_DATA, SERVICE_SLUGS, SERVICE_NAMES } from '../../../../lib/services-data'
import ServicePageClient from './ServicePageClient'

export function generateStaticParams() {
  return SERVICE_SLUGS.map((slug) => ({ slug }))
}

export function generateMetadata({ params }: { params: { slug: string } }): Metadata {
  const service = SERVICES_DATA[params.slug]
  if (!service) return {}
  return {
    title: service.metaTitle,
    description: service.metaDescription,
  }
}

export default function ServicePage({ params }: { params: { slug: string } }) {
  const service = SERVICES_DATA[params.slug]
  if (!service) notFound()

  const schema = {
    "@context": "https://schema.org",
    "@type": "Service",
    "name": service.title,
    "provider": {
      "@type": "LocalBusiness",
      "name": "JB Lawn Care & Hauling",
      "telephone": "341-260-0331",
      "areaServed": service.relatedAreas.map(a => ({
        "@type": "City",
        "name": a.charAt(0).toUpperCase() + a.slice(1).replace('-', ' '),
      })),
    },
    "description": service.metaDescription,
  }

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": service.faqs.map(f => ({
      "@type": "Question",
      "name": f.q,
      "acceptedAnswer": { "@type": "Answer", "text": f.a },
    })),
  }

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <ServicePageClient service={service} serviceNames={SERVICE_NAMES} />
    </>
  )
}