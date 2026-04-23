'use client'

import { useEffect } from 'react'
import Link from 'next/link'
import { useBooking } from '../../../../components/BookingContext'
import type { ServiceData } from '../../../../lib/services-data'

export default function ServicePageClient({
  service,
  serviceNames,
}: {
  service: ServiceData
  serviceNames: Record<string, string>
}) {
  const { openBooking } = useBooking()

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => entries.forEach((e) => { if (e.isIntersecting) e.target.classList.add('visible') }),
      { threshold: 0.1, rootMargin: '0px 0px -40px 0px' }
    )
    document.querySelectorAll('.fade-in').forEach((el) => observer.observe(el))
    return () => observer.disconnect()
  }, [])

  return (
    <>
      {/* Hero */}
      <section className="service-hero">
        <div className="container">
          <div className="service-hero-inner fade-in">
            <div className="section-label">{service.title}</div>
            <h1 className="service-hero-h1">{service.headline}</h1>
            <p className="service-hero-sub">{service.subheadline}</p>
            <div className="service-hero-actions">
              <button className="btn-primary" onClick={openBooking}>
                <svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg>
                Get a Free Estimate
              </button>
              <a href="tel:3412600331" className="btn-secondary">
                <svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24"><path d="M22 16.92v3a2 2 0 01-2.18 2 19.86 19.86 0 01-8.63-3.07 19.5 19.5 0 01-6-6A19.86 19.86 0 012.12 4.18 2 2 0 014.11 2h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L8.09 9.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 16.92z"/></svg>
                Call 341-260-0331
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Intro + Before/After */}
      <section className="section" style={{ background: 'var(--white)' }}>
        <div className="container">
          <div className="service-intro-grid fade-in">
            <div>
              <p className="service-intro-text">{service.intro}</p>

              {/* What's Included */}
              <div className="service-included">
                <h2>What&apos;s Included</h2>
                <ul>
                  {service.whatsIncluded.map((item, i) => (
                    <li key={i}>
                      <svg width="18" height="18" fill="none" stroke="var(--green-bright)" strokeWidth="2.5" viewBox="0 0 24 24"><polyline points="20 6 9 17 4 12"/></svg>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Before/After */}
            {service.beforeAfterPhoto && (
              <div className="service-before-after">
                <div className="service-ba-pair">
                  <div className="service-ba-img">
                    <span className="service-ba-badge before">Before</span>
                    <img src={service.beforeAfterPhoto.before} alt={`Before - ${service.title}`} />
                  </div>
                  <div className="service-ba-img">
                    <span className="service-ba-badge after">After</span>
                    <img src={service.beforeAfterPhoto.after} alt={`After - ${service.title}`} />
                  </div>
                </div>
                <p className="service-ba-caption">{service.beforeAfterPhoto.caption}</p>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="section" style={{ background: 'var(--off-white)' }}>
        <div className="container">
          <div className="section-header center fade-in">
            <h2 className="section-title">How It Works</h2>
          </div>
          <div className="service-steps fade-in">
            {service.howItWorks.map((s) => (
              <div key={s.step} className="service-step">
                <div className="service-step-num">{s.step}</div>
                <h3>{s.title}</h3>
                <p>{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section className="section" style={{ background: 'var(--white)' }}>
        <div className="container">
          <div className="service-pricing fade-in">
            <div className="service-pricing-content">
              <h2>Pricing</h2>
              <p>{service.pricingContext}</p>
              <button className="btn-primary" onClick={openBooking} style={{ marginTop: 24 }}>
                Get Your Free Estimate →
              </button>
            </div>
            <div className="service-pricing-card">
              <div className="service-pricing-card-inner">
                <h3>Why Choose JB?</h3>
                <ul>
                  <li>✓ Transparent, upfront pricing — no hidden fees</li>
                  <li>✓ Fully licensed and insured</li>
                  <li>✓ Same-day estimates available</li>
                  <li>✓ 5.0★ rated on Google</li>
                  <li>✓ Locally owned, Bay Area based</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="section" style={{ background: 'var(--off-white)' }}>
        <div className="container">
          <div className="section-header center fade-in">
            <h2 className="section-title">Frequently Asked Questions</h2>
          </div>
          <div className="fade-in" style={{ maxWidth: 720, margin: '0 auto' }}>
            {service.faqs.map((faq, i) => (
              <details key={i} style={{ borderBottom: '1px solid var(--gray-light)', padding: '20px 0' }}>
                <summary style={{
                  fontWeight: 700, fontSize: '1.02rem', cursor: 'pointer', color: 'var(--black)',
                  listStyle: 'none', display: 'flex', justifyContent: 'space-between', alignItems: 'center',
                }}>
                  {faq.q}
                  <span style={{ color: 'var(--green-mid)', fontSize: '1.2rem', flexShrink: 0, marginLeft: 16 }}>+</span>
                </summary>
                <p style={{ marginTop: 12, fontSize: '0.95rem', color: 'var(--gray-mid)', lineHeight: 1.7 }}>{faq.a}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="cta-banner">
        <h2>Ready to Get Started?</h2>
        <p>Get a free, no-obligation estimate for {service.title.toLowerCase()}. Most quotes returned within the hour.</p>
        <button className="btn-white" onClick={openBooking}>
          <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg>
          Book Your Free Estimate
        </button>
      </section>

      {/* Related Services */}
      <section className="section" style={{ background: 'var(--white)' }}>
        <div className="container">
          <div className="section-header center fade-in">
            <h2 className="section-title">Related Services</h2>
          </div>
          <div className="service-related fade-in">
            {service.relatedServices.map((slug) => (
              <Link key={slug} href={`/services/${slug}`} className="service-related-card">
                <h3>{serviceNames[slug]}</h3>
                <span className="service-link">Learn more →</span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Service Areas */}
      <section className="section" style={{ background: 'var(--off-white)', paddingTop: 60, paddingBottom: 60 }}>
        <div className="container">
          <div className="fade-in" style={{ textAlign: 'center' }}>
            <p style={{ fontSize: '0.95rem', color: 'var(--gray-mid)', marginBottom: 16 }}>
              We provide {service.title.toLowerCase()} services across the Bay Area, including:
            </p>
            <div style={{ display: 'flex', gap: 10, justifyContent: 'center', flexWrap: 'wrap' }}>
              {service.relatedAreas.map((area) => (
                <Link
                  key={area}
                  href={`/areas/${area}`}
                  className="area-tag"
                  style={{ padding: '10px 18px' }}
                >
                  {area.charAt(0).toUpperCase() + area.slice(1).replace('-', ' ')}
                </Link>
              ))}
              <Link href="/#areas" className="area-tag" style={{ padding: '10px 18px' }}>
                + All Service Areas
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
