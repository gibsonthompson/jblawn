'use client'

import { useEffect } from 'react'
import Link from 'next/link'
import { useBooking } from '../../../components/BookingContext'

export default function AboutClient() {
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
            <div className="section-label">About Us</div>
            <h1 className="service-hero-h1">Built on Hard Work,<br />Not Shortcuts</h1>
            <p className="service-hero-sub">JB Lawn Care &amp; Hauling is a locally owned and operated company serving the Bay Area with honest, reliable property services.</p>
          </div>
        </div>
      </section>

      {/* Story */}
      <section className="section" style={{ background: 'var(--white)' }}>
        <div className="container">
          <div className="fade-in" style={{ maxWidth: 760, margin: '0 auto' }}>
            <h2 className="section-title" style={{ marginBottom: 20 }}>Who We Are</h2>
            <p className="service-intro-text">
              JB Lawn Care &amp; Hauling started the way most good service businesses do — one truck, a strong work ethic, and a commitment to doing the job right. What began as lawn mowing for a handful of neighbors grew into a full-service property maintenance and hauling operation serving homeowners, landlords, and property managers across the entire Bay Area.
            </p>
            <p className="service-intro-text" style={{ marginTop: 16 }}>
              We&apos;re not a franchise. We&apos;re not backed by investors. We&apos;re a small, local crew that shows up on time, does quality work, communicates clearly, and charges fair prices. That&apos;s the whole business model — and it&apos;s why our customers keep coming back and referring their friends.
            </p>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="section" style={{ background: 'var(--off-white)' }}>
        <div className="container">
          <div className="section-header center fade-in">
            <h2 className="section-title">What We Stand For</h2>
          </div>
          <div className="service-steps fade-in" style={{ maxWidth: 1000 }}>
            {[
              { icon: '🕐', title: 'Reliability', desc: 'We show up when we say we will. If something changes, we communicate before you have to ask. No ghosting, no excuses.' },
              { icon: '💬', title: 'Transparency', desc: "You'll always know the price before we start. No hidden fees, no surprise charges, no bait-and-switch. The quote is the quote." },
              { icon: '💪', title: 'Quality Work', desc: "We don't cut corners. Every lawn gets edged. Every cleanup gets hauled. Every job gets a final walkthrough before we leave." },
              { icon: '🤝', title: 'Respect', desc: 'We treat your property like it matters — because it does. Clean boots, careful equipment handling, and a yard that looks better than when we arrived.' },
            ].map((v) => (
              <div key={v.title} className="service-step" style={{ textAlign: 'left', padding: '24px', background: 'var(--white)', borderRadius: 'var(--radius-lg)', border: '1px solid var(--gray-light)' }}>
                <div style={{ fontSize: '1.8rem', marginBottom: 12 }}>{v.icon}</div>
                <h3>{v.title}</h3>
                <p>{v.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Trust Signals */}
      <section className="section" style={{ background: 'var(--white)' }}>
        <div className="container">
          <div className="fade-in" style={{ maxWidth: 800, margin: '0 auto' }}>
            <div className="section-header center">
              <h2 className="section-title">Why Customers Trust Us</h2>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 24, textAlign: 'center' }}>
              {[
                { value: '5.0★', label: 'Google Rating' },
                { value: '500+', label: 'Properties Serviced' },
                { value: '100%', label: 'Fully Insured' },
              ].map((s) => (
                <div key={s.label} style={{ padding: 24, background: 'var(--off-white)', borderRadius: 'var(--radius-lg)' }}>
                  <div style={{ fontFamily: "'Archivo Black', sans-serif", fontSize: '2rem', color: 'var(--green-bright)', marginBottom: 4 }}>{s.value}</div>
                  <div style={{ fontSize: '0.88rem', color: 'var(--gray-mid)', fontWeight: 600 }}>{s.label}</div>
                </div>
              ))}
            </div>
            <div style={{ display: 'flex', justifyContent: 'center', gap: 24, marginTop: 32, alignItems: 'center' }}>
              <img src="/images/google-logo.png" alt="Google" style={{ height: 32 }} />
              <img src="/images/yelp-logo.png" alt="Yelp" style={{ height: 32 }} />
              <img src="/images/thumbtack-logo.png" alt="Thumbtack" style={{ height: 32 }} />
            </div>
          </div>
        </div>
      </section>

      {/* Service Area */}
      <section className="section" style={{ background: 'var(--off-white)' }}>
        <div className="container">
          <div className="section-header center fade-in">
            <h2 className="section-title">Where We Work</h2>
            <p className="section-subtitle">We serve Oakland, Berkeley, Hayward, Fremont, San Francisco, and the entire East Bay. If you&apos;re in the Bay Area, we can probably help.</p>
          </div>
          <div className="fade-in" style={{ display: 'flex', gap: 10, justifyContent: 'center', flexWrap: 'wrap', maxWidth: 800, margin: '0 auto' }}>
            {['Oakland','San Francisco','Berkeley','Richmond','Hayward','Fremont','San Leandro','Concord','Walnut Creek','Pleasanton','Dublin','Daly City'].map((c) => (
              <Link key={c} href={`/areas/${c.toLowerCase().replace(/\s+/g, '-')}`} className="area-tag" style={{ padding: '10px 18px' }}>{c}</Link>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="cta-banner">
        <h2>Ready to Work With Us?</h2>
        <p>Get a free estimate for any lawn care, landscaping, or hauling job. No pressure, no obligation.</p>
        <button className="btn-white" onClick={openBooking}>
          <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg>
          Book Your Free Estimate
        </button>
      </section>
    </>
  )
}
