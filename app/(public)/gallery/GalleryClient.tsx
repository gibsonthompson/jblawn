'use client'

import { useState, useEffect } from 'react'
import { useBooking } from '../../../components/BookingContext'

const GALLERY_PAIRS = [
  { before: '/images/gallery/deck-cleanout-before.jpg', after: '/images/gallery/deck-cleanout-after.jpg', title: 'Deck Cleanout', tag: 'Junk Removal', city: 'Oakland' },
  { before: '/images/gallery/yard-cleanup-before.jpg', after: '/images/gallery/yard-cleanup-after.jpg', title: 'Yard Cleanup & Sod', tag: 'Lawn Care', city: 'Hayward' },
  { before: '/images/gallery/side-yard-before.jpg', after: '/images/gallery/side-yard-after.jpg', title: 'Side Yard Clearing', tag: 'Yard Cleanup', city: 'Berkeley' },
  { before: '/images/gallery/backyard-junk-before.jpg', after: '/images/gallery/backyard-junk-after.jpg', title: 'Backyard Cleanout', tag: 'Junk Removal', city: 'Richmond' },
  { before: '/images/gallery/hot-tub-removal-before.jpg', after: '/images/gallery/hot-tub-removal-after.jpg', title: 'Hot Tub Removal', tag: 'Junk Removal', city: 'Hayward' },
  { before: '/images/gallery/garage-cleanout-before.jpg', after: '/images/gallery/garage-cleanout-after.jpg', title: 'Garage Cleanout', tag: 'Junk Removal', city: 'Oakland' },
  { before: '/images/gallery/bush-removal-before.jpg', after: '/images/gallery/bush-removal-after.jpg', title: 'Bush Removal', tag: 'Yard Cleanup', city: 'San Leandro' },
  { before: '/images/gallery/overgrown-backyard-before.jpg', after: '/images/gallery/overgrown-backyard-after.jpg', title: 'Overgrown Yard Restoration', tag: 'Lawn Care', city: 'Fremont' },
  { before: '/images/gallery/front-yard-sod-before.jpg', after: '/images/gallery/front-yard-sod-after.jpg', title: 'Front Yard Sod Installation', tag: 'Landscaping', city: 'Concord' },
]

const FILTERS = ['All', 'Junk Removal', 'Lawn Care', 'Yard Cleanup', 'Landscaping']

export default function GalleryClient() {
  const { openBooking } = useBooking()
  const [filter, setFilter] = useState('All')

  const filtered = filter === 'All' ? GALLERY_PAIRS : GALLERY_PAIRS.filter(p => p.tag === filter)

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => entries.forEach((e) => { if (e.isIntersecting) e.target.classList.add('visible') }),
      { threshold: 0.1, rootMargin: '0px 0px -40px 0px' }
    )
    document.querySelectorAll('.fade-in').forEach((el) => observer.observe(el))
    return () => observer.disconnect()
  }, [filter])

  return (
    <>
      <section className="service-hero">
        <div className="container">
          <div className="service-hero-inner fade-in">
            <div className="section-label">Our Work</div>
            <h1 className="service-hero-h1">Before &amp; After Gallery</h1>
            <p className="service-hero-sub">Real results from real jobs across the Bay Area. Every project shown here was completed by our crew.</p>
          </div>
        </div>
      </section>

      <section className="section" style={{ background: 'var(--white)' }}>
        <div className="container">
          {/* Filter Tabs */}
          <div style={{ display: 'flex', gap: 8, justifyContent: 'center', marginBottom: 40, flexWrap: 'wrap' }}>
            {FILTERS.map((f) => (
              <button
                key={f}
                onClick={() => setFilter(f)}
                style={{
                  padding: '10px 22px',
                  borderRadius: 8,
                  border: '1px solid',
                  borderColor: filter === f ? 'var(--green-bright)' : 'var(--gray-light)',
                  background: filter === f ? 'rgba(107,191,26,0.1)' : 'var(--white)',
                  color: filter === f ? 'var(--green-mid)' : 'var(--gray-mid)',
                  fontWeight: 700,
                  fontSize: '0.9rem',
                  cursor: 'pointer',
                  transition: 'all 0.15s ease',
                  fontFamily: 'inherit',
                }}
              >
                {f}
              </button>
            ))}
          </div>

          {/* Gallery Grid */}
          <div className="gallery-grid">
            {filtered.map((pair) => (
              <div key={pair.title} className="gallery-pair fade-in">
                <div className="gallery-pair-images">
                  <div className="gallery-img-wrap">
                    <span className="gallery-badge before">Before</span>
                    <img src={pair.before} alt={`Before - ${pair.title}`} />
                  </div>
                  <div className="gallery-img-wrap">
                    <span className="gallery-badge after">After</span>
                    <img src={pair.after} alt={`After - ${pair.title}`} />
                  </div>
                </div>
                <div className="gallery-pair-info">
                  <div>
                    <h4>{pair.title}</h4>
                    <span style={{ fontSize: '0.78rem', color: 'var(--gray-mid)' }}>{pair.city}, CA</span>
                  </div>
                  <span>{pair.tag}</span>
                </div>
              </div>
            ))}
          </div>

          {filtered.length === 0 && (
            <p style={{ textAlign: 'center', color: 'var(--gray-mid)', padding: 40 }}>No photos match this filter.</p>
          )}
        </div>
      </section>

      <section className="cta-banner">
        <h2>Want Results Like These?</h2>
        <p>Get a free estimate for your lawn care, junk removal, or landscaping project.</p>
        <button className="btn-white" onClick={openBooking}>
          Book Your Free Estimate
        </button>
      </section>
    </>
  )
}
