'use client'

import { useEffect } from 'react'
import Link from 'next/link'
import { useBooking } from '../../../../components/BookingContext'
import type { AreaData } from '../../../../lib/areas-data'

export default function AreaPageClient({ area }: { area: AreaData }) {
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
            <div className="section-label">Service Area</div>
            <h1 className="service-hero-h1">{area.headline}</h1>
            <p className="service-hero-sub">{area.distanceNote}</p>
            <div className="service-hero-actions">
              <button className="btn-primary" onClick={openBooking}>
                <svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg>
                Get a Free Estimate in {area.city}
              </button>
              <a href="tel:3412600331" className="btn-secondary">
                <svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24"><path d="M22 16.92v3a2 2 0 01-2.18 2 19.86 19.86 0 01-8.63-3.07 19.5 19.5 0 01-6-6A19.86 19.86 0 012.12 4.18 2 2 0 014.11 2h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L8.09 9.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 16.92z"/></svg>
                Call 341-260-0331
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* About This Area */}
      <section className="section" style={{ background: 'var(--white)' }}>
        <div className="container">
          <div className="fade-in" style={{ maxWidth: 800, margin: '0 auto' }}>
            <p className="service-intro-text">{area.intro}</p>
            <p className="service-intro-text" style={{ marginTop: 20 }}>{area.cityDetails}</p>
          </div>
        </div>
      </section>

      {/* Popular Services */}
      <section className="section" style={{ background: 'var(--off-white)' }}>
        <div className="container">
          <div className="section-header center fade-in">
            <h2 className="section-title">Most Popular Services in {area.city}</h2>
          </div>
          <div className="service-related fade-in">
            {area.popularServices.map((svc) => (
              <Link key={svc.slug} href={`/services/${svc.slug}`} className="service-related-card" style={{ background: 'var(--white)' }}>
                <h3>{svc.name}</h3>
                <p style={{ fontSize: '0.9rem', color: 'var(--gray-mid)', lineHeight: 1.6, margin: '8px 0 12px' }}>{svc.why}</p>
                <span className="service-link" style={{ color: 'var(--green-mid)', fontWeight: 700, fontSize: '0.88rem' }}>Learn more →</span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Neighborhoods */}
      <section className="section" style={{ background: 'var(--white)' }}>
        <div className="container">
          <div className="section-header center fade-in">
            <h2 className="section-title">{area.city} Neighborhoods We Serve</h2>
          </div>
          <div className="fade-in" style={{ display: 'flex', gap: 10, justifyContent: 'center', flexWrap: 'wrap', maxWidth: 700, margin: '0 auto' }}>
            {area.neighborhoods.map((n) => (
              <span key={n} style={{
                padding: '10px 20px', background: 'var(--off-white)', border: '1px solid var(--gray-light)',
                borderRadius: 8, fontSize: '0.92rem', fontWeight: 600, color: 'var(--gray-dark)',
              }}>{n}</span>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonial */}
      {area.testimonial && (
        <section className="section" style={{ background: 'var(--green-darkest)', color: 'var(--white)' }}>
          <div className="container">
            <div className="fade-in" style={{ maxWidth: 640, margin: '0 auto', textAlign: 'center' }}>
              <div style={{ color: 'var(--yellow)', fontSize: '1.5rem', letterSpacing: 4, marginBottom: 20 }}>★★★★★</div>
              <blockquote style={{ fontSize: '1.15rem', lineHeight: 1.7, fontStyle: 'italic', color: 'rgba(255,255,255,0.85)', marginBottom: 20 }}>
                &ldquo;{area.testimonial.text}&rdquo;
              </blockquote>
              <div style={{ fontWeight: 700 }}>{area.testimonial.name}</div>
              <div style={{ fontSize: '0.85rem', color: 'rgba(255,255,255,0.5)' }}>{area.testimonial.location}</div>
            </div>
          </div>
        </section>
      )}

      {/* FAQ */}
      <section className="section" style={{ background: 'var(--off-white)' }}>
        <div className="container">
          <div className="section-header center fade-in">
            <h2 className="section-title">Common Questions — {area.city}</h2>
          </div>
          <div className="fade-in" style={{ maxWidth: 720, margin: '0 auto' }}>
            {area.faqs.map((faq, i) => (
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
        <h2>Need Lawn Care or Junk Removal<br />in {area.city}?</h2>
        <p>Get a free estimate — most quotes returned within the hour. Same-day service available.</p>
        <button className="btn-white" onClick={openBooking}>
          <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg>
          Book Your Free Estimate
        </button>
      </section>

      {/* All Service Areas */}
      <section className="section" style={{ background: 'var(--white)', paddingTop: 60, paddingBottom: 60 }}>
        <div className="container">
          <div className="fade-in" style={{ textAlign: 'center' }}>
            <p style={{ fontSize: '0.95rem', color: 'var(--gray-mid)', marginBottom: 16 }}>We also serve these Bay Area cities:</p>
            <div style={{ display: 'flex', gap: 10, justifyContent: 'center', flexWrap: 'wrap' }}>
              {['Oakland','San Francisco','Berkeley','Richmond','Hayward','Fremont','San Leandro','Concord','Walnut Creek','Pleasanton','Dublin','Daly City']
                .filter(c => c.toLowerCase().replace(/\s+/g, '-') !== area.slug)
                .map((c) => (
                  <Link key={c} href={`/areas/${c.toLowerCase().replace(/\s+/g, '-')}`} className="area-tag" style={{ padding: '10px 18px' }}>
                    {c}
                  </Link>
                ))}
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
