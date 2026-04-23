'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { useBooking } from '../../components/BookingContext'
import { db } from '../../lib/admin-db'

type Review = {
  reviewer_name: string | null
  reviewer_location: string | null
  rating: number | null
  review_text: string | null
}

const DAYS = ['Sun','Mon','Tue','Wed','Thu','Fri','Sat']

const SERVICES = [
  {
    title: 'Lawn Mowing & Maintenance',
    href: '/services/lawn-mowing',
    description: 'Professional lawn mowing for residential and commercial properties. Weekly, bi-weekly, or one-time cuts including edging, trimming, and blowing. Serving Oakland, Berkeley, Hayward, and surrounding cities.',
    icon: <svg width="28" height="28" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M12 2L2 7l10 5 10-5-10-5z"/><path d="M2 17l10 5 10-5"/><path d="M2 12l10 5 10-5"/></svg>,
  },
  {
    title: 'Landscaping & Sod Installation',
    href: '/services/landscaping',
    description: 'Complete landscape transformations — sod installation, flower beds, hardscaping, and drainage grading. We take Bay Area yards from neglected to neighborhood standout.',
    icon: <svg width="28" height="28" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M12 22V8"/><path d="M5 12H2a10 10 0 0020 0h-3"/><path d="M5.24 17a5 5 0 01-.24-1.5C5 12.46 8.13 10 12 10s7 2.46 7 5.5a5 5 0 01-.24 1.5"/></svg>,
  },
  {
    title: 'Junk Removal & Hauling',
    href: '/services/junk-hauling',
    description: "Same-day junk removal across the East Bay. Old furniture, appliances, construction debris, yard waste — we load it, haul it, and dispose of it. Often cheaper than renting a dumpster.",
    icon: <svg width="28" height="28" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><rect x="1" y="3" width="15" height="13"/><polygon points="16 8 20 8 23 11 23 16 16 16 16 8"/><circle cx="5.5" cy="18.5" r="2.5"/><circle cx="18.5" cy="18.5" r="2.5"/></svg>,
  },
  {
    title: 'Yard Cleanup & Debris Removal',
    href: '/services/yard-cleanup',
    description: "Overgrown lot, storm damage, or pre-sale property prep — we clear brush, weeds, branches, and debris so your outdoor space is usable again. Residential and commercial properties.",
    icon: <svg width="28" height="28" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M3 6l3 1 2-3"/><path d="M22 12h-4l-3 9L9 3l-3 9H2"/></svg>,
  },
  {
    title: 'Bush & Hedge Trimming',
    href: '/services/bush-trimming',
    description: 'Crisp, clean lines that instantly boost curb appeal. We shape, trim, and maintain your shrubs and hedges so they always look intentional — never neglected.',
    icon: <svg width="28" height="28" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><circle cx="12" cy="12" r="3"/><path d="M12 1v4M12 19v4M4.22 4.22l2.83 2.83M16.95 16.95l2.83 2.83M1 12h4M19 12h4M4.22 19.78l2.83-2.83M16.95 7.05l2.83-2.83"/></svg>,
  },
  {
    title: 'Mulching & Bed Maintenance',
    href: '/services/mulching',
    description: "Fresh mulch, clean edges, weed-free beds. It's one of the fastest ways to make your entire property look polished and well-maintained.",
    icon: <svg width="28" height="28" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M2 22l1-1h18l1 1"/><path d="M6 18V4a2 2 0 012-2h8a2 2 0 012 2v14"/><path d="M10 10h4"/><path d="M10 14h4"/></svg>,
  },
  {
    title: '10-Yard Dump Trailer Rental',
    href: '/services/trailer-rental',
    description: "Need to haul it yourself? Rent our 10-yard dump trailer starting at $150/day. Drop-off, pickup, and disposal included in our full-service option at $400.",
    icon: <svg width="28" height="28" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><rect x="1" y="6" width="15" height="10" rx="1"/><path d="M16 10h4l3 3v3h-7V10z"/><circle cx="5.5" cy="18.5" r="2.5"/><circle cx="18.5" cy="18.5" r="2.5"/><path d="M1 14h15"/></svg>,
  },
]

const SERVICE_AREAS = [
  'Oakland', 'San Francisco', 'Berkeley', 'Richmond', 'Hayward', 'Fremont',
  'San Leandro', 'Concord', 'Walnut Creek', 'Pleasanton', 'Dublin', 'Daly City',
]

const TESTIMONIALS = [
  {
    text: "JB and his crew completely transformed our backyard. It went from an overgrown mess to something we actually want to spend time in. Reliable, fair prices, and great communication throughout.",
    name: 'Maria R.',
    location: 'Oakland, CA',
    initials: 'MR',
  },
  {
    text: "I had an entire garage worth of junk that needed to go before I could sell my house. JB's team cleared it out in one afternoon. Saved me a weekend of trips to the dump. Highly recommend.",
    name: 'David L.',
    location: 'San Francisco, CA',
    initials: 'DL',
  },
  {
    text: "We've been using JB for weekly mowing for about six months now. They're always on time, the lawn looks perfect every single week, and I don't have to worry about a thing. Best decision I made.",
    name: 'Tanya N.',
    location: 'Berkeley, CA',
    initials: 'TN',
  },
]

const BLOG_POSTS = [
  {
    href: '/blog/how-often-should-you-mow-your-lawn-bay-area',
    category: 'Lawn Care',
    title: 'How Often Should You Mow Your Lawn in the Bay Area?',
    excerpt: "Bay Area grass grows year-round thanks to the mild climate. Here's a seasonal mowing schedule that keeps your lawn healthy without overdoing it.",
  },
  {
    href: '/blog/junk-removal-vs-dumpster-rental-cost-comparison',
    category: 'Junk Removal',
    title: 'Junk Removal vs. Dumpster Rental: Which Is Cheaper in 2026?',
    excerpt: "When you factor in rental fees, permits, disposal costs, and your own labor, hiring a junk removal crew is usually the better deal. Here's the math.",
  },
  {
    href: '/blog/spring-yard-cleanup-checklist-bay-area',
    category: 'Yard Cleanup',
    title: 'Spring Yard Cleanup Checklist for Bay Area Homeowners',
    excerpt: 'The complete list of everything your yard needs after winter — from debris clearing and aeration to mulching and pre-emergent weed control.',
  },
]

const GALLERY_PAIRS = [
  { before: '/images/gallery/deck-cleanout-before.jpg', after: '/images/gallery/deck-cleanout-after.jpg', title: 'Deck Cleanout', tag: 'Junk Hauling' },
  { before: '/images/gallery/yard-cleanup-before.jpg', after: '/images/gallery/yard-cleanup-after.jpg', title: 'Yard Cleanup & Sod', tag: 'Lawn Care' },
  { before: '/images/gallery/side-yard-before.jpg', after: '/images/gallery/side-yard-after.jpg', title: 'Side Yard Clearing', tag: 'Yard Cleanup' },
  { before: '/images/gallery/backyard-junk-before.jpg', after: '/images/gallery/backyard-junk-after.jpg', title: 'Backyard Cleanout', tag: 'Hauling & Cleanup' },
  { before: '/images/gallery/hot-tub-removal-before.jpg', after: '/images/gallery/hot-tub-removal-after.jpg', title: 'Hot Tub Removal', tag: 'Heavy Hauling' },
  { before: '/images/gallery/garage-cleanout-before.jpg', after: '/images/gallery/garage-cleanout-after.jpg', title: 'Garage Cleanout', tag: 'Junk Hauling' },
  { before: '/images/gallery/bush-removal-before.jpg', after: '/images/gallery/bush-removal-after.jpg', title: 'Bush Removal', tag: 'Yard Cleanup' },
  { before: '/images/gallery/overgrown-backyard-before.jpg', after: '/images/gallery/overgrown-backyard-after.jpg', title: 'Overgrown Yard Restoration', tag: 'Lawn Care' },
  { before: '/images/gallery/front-yard-sod-before.jpg', after: '/images/gallery/front-yard-sod-after.jpg', title: 'Front Yard Sod Installation', tag: 'Landscaping' },
]

const PIN_ICON = (
  <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z"/>
    <circle cx="12" cy="10" r="3"/>
  </svg>
)

export default function HomePage() {
  const { openBooking } = useBooking()
  const [reviews, setReviews] = useState<Review[]>([])

  useEffect(() => {
    // Fetch published reviews from Supabase
    if (db) {
      db.from('jb_reviews')
        .select('reviewer_name, reviewer_location, rating, review_text')
        .eq('review_left', true)
        .order('created_at', { ascending: false })
        .limit(6)
        .then(({ data }) => {
          if (data && data.length > 0) setReviews(data as Review[])
        })
    }
  }, [])

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
      {/* FAQ Schema for AEO */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "FAQPage",
          "mainEntity": [
            { "@type": "Question", "name": "How much does junk removal cost in the Bay Area?", "acceptedAnswer": { "@type": "Answer", "text": "Most junk removal jobs in Oakland, Hayward, and the East Bay range from $150 to $500 depending on volume. JB Lawn Care & Hauling provides free, no-obligation estimates before any work begins." }},
            { "@type": "Question", "name": "Do you offer same-day junk removal?", "acceptedAnswer": { "@type": "Answer", "text": "Yes. JB Lawn Care & Hauling offers same-day junk hauling and removal for most Bay Area locations when scheduled before noon. Call 341-260-0331 or book online." }},
            { "@type": "Question", "name": "How often should I have my lawn mowed in the Bay Area?", "acceptedAnswer": { "@type": "Answer", "text": "In the Bay Area's mild climate, most lawns need weekly mowing from March through October and bi-weekly service during the cooler months." }},
            { "@type": "Question", "name": "What areas does JB Lawn Care serve?", "acceptedAnswer": { "@type": "Answer", "text": "JB Lawn Care & Hauling serves Oakland, Berkeley, Richmond, Hayward, Fremont, San Leandro, Concord, Walnut Creek, Pleasanton, Dublin, and the greater Bay Area." }},
            { "@type": "Question", "name": "Is it cheaper to hire a junk removal company or rent a dumpster?", "acceptedAnswer": { "@type": "Answer", "text": "In most cases, hiring a junk removal crew is cheaper when you factor in dumpster rental fees, permits, disposal costs, and labor." }},
            { "@type": "Question", "name": "Can I rent a dump trailer in the Bay Area?", "acceptedAnswer": { "@type": "Answer", "text": "Yes. JB Lawn Care offers a 10-yard dump trailer for $150/day for DIY projects, or $400 for full-service including drop-off, pickup, and up to 1 ton of disposal. Available from Hayward to Vallejo." }},
          ]
        })}}
      />
      {/* Hero */}
      <section className="hero">
        <div className="hero-pattern" />
        <div className="hero-inner" style={{ gridTemplateColumns: '1fr', textAlign: 'center', maxWidth: 800 }}>
          <div className="hero-content" style={{ maxWidth: '100%' }}>
            <h1>Bay Area Lawn Care,<br />Junk Removal &amp;<br /><span className="highlight">Hauling Done Right.</span></h1>
            <p style={{ maxWidth: 600, margin: '0 auto 36px' }}>Tired of looking at that overgrown yard or garage full of junk? JB Lawn Care &amp; Hauling provides fast, affordable lawn mowing, junk hauling, yard cleanups, and landscaping services across Oakland, Hayward, Fremont, and the entire East Bay. Same-day estimates — just call or book online.</p>
            <div className="hero-actions" style={{ justifyContent: 'center' }}>
              <a href="#" className="btn-primary" onClick={(e) => { e.preventDefault(); openBooking() }}>
                <svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg>
                Get Your Free Estimate
              </a>
              <a href="tel:3412600331" className="btn-secondary">
                <svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24"><path d="M22 16.92v3a2 2 0 01-2.18 2 19.86 19.86 0 01-8.63-3.07 19.5 19.5 0 01-6-6A19.86 19.86 0 012.12 4.18 2 2 0 014.11 2h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L8.09 9.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 16.92z"/></svg>
                Call Now
              </a>
            </div>
            <div className="hero-stats" style={{ justifyContent: 'center' }}>
              <div>
                <div className="hero-stat-value">500+</div>
                <div className="hero-stat-label">Properties Serviced</div>
              </div>
              <div>
                <div className="hero-stat-value">5.0★</div>
                <div className="hero-stat-label">Google Rating</div>
              </div>
              <div>
                <div className="hero-stat-value">Same-Day</div>
                <div className="hero-stat-label">Estimates Available</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Trust Bar */}
      <div className="trust-bar">
        <div className="trust-bar-inner">
          <div className="trust-item">
            <div className="trust-icon">
              <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>
            </div>
            Fully Insured
          </div>
          <div className="trust-item">
            <div className="trust-icon">
              <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><circle cx="12" cy="12" r="10"/><path d="M12 6v6l4 2"/></svg>
            </div>
            On-Time, Every Time
          </div>
          <div className="trust-item">
            <div className="trust-icon">
              <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M22 11.08V12a10 10 0 11-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></svg>
            </div>
            Free Estimates
          </div>
          <div className="trust-item" style={{ gap: 16 }}>
            <img src="/images/google-logo.png" alt="Google" style={{ height: 28 }} />
            <img src="/images/yelp-logo.png" alt="Yelp" style={{ height: 28 }} />
            <img src="/images/thumbtack-logo.png" alt="Thumbtack" style={{ height: 28 }} />
          </div>
        </div>
      </div>

      {/* Services */}
      <section className="section services" id="services">
        <div className="container">
          <div className="section-header center fade-in">
            <div className="section-label">Our Services</div>
            <h2 className="section-title">Lawn Mowing, Junk Removal &amp;<br />Full Property Cleanups</h2>
            <p className="section-subtitle">From weekly lawn maintenance to same-day junk hauling, we handle every outdoor job Bay Area homeowners and property managers need done. No subcontractors — our crew does it all.</p>
          </div>
          <div className="services-grid">
            {SERVICES.map((s) => (
              <Link key={s.href} href={s.href} className="service-card fade-in">
                <div className="service-icon">{s.icon}</div>
                <h3>{s.title}</h3>
                <p>{s.description}</p>
                <span className="service-link">Learn more →</span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="section why-us">
        <div className="container">
          <div className="why-grid">
            <div className="why-image fade-in">
              <div style={{ width: '100%', height: '100%', borderRadius: 'var(--radius-xl)', overflow: 'hidden' }}>
                <img src="/images/gallery/front-yard-sod-after.jpg" alt="Fresh lawn installation by JB Lawn Care" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
              </div>
            </div>
            <div className="fade-in">
              <div className="section-label">Why Choose JB</div>
              <h2 className="section-title">The Bay Area&apos;s Most Reliable<br />Lawn &amp; Hauling Crew</h2>
              <p className="section-subtitle" style={{ marginBottom: 36 }}>Most lawn care companies and junk haulers in Oakland and the East Bay are unreliable. We built our reputation by doing the opposite — showing up, communicating, and doing the job right the first time.</p>
              <div className="why-points">
                {[
                  { title: 'We Show Up When We Say We Will', desc: "No guessing games. You'll get a confirmed time window and a heads-up when we're on the way. If something changes, we communicate — always.", icon: <svg width="22" height="22" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><circle cx="12" cy="12" r="10"/><path d="M12 6v6l4 2"/></svg> },
                  { title: 'Transparent, Honest Pricing', desc: 'No hidden fees, no surprise charges. We quote it, you approve it, and that\'s what you pay. Every single time.', icon: <svg width="22" height="22" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M22 11.08V12a10 10 0 11-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></svg> },
                  { title: 'Fully Licensed & Insured', desc: "You're protected. Our team is covered so you never have to worry about liability on your property.", icon: <svg width="22" height="22" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M14 9V5a3 3 0 00-6 0v4"/><rect x="2" y="9" width="20" height="13" rx="2"/></svg> },
                  { title: 'We Actually Care About the Result', desc: "This isn't a side hustle — it's our livelihood. If you're not happy with the work, we come back and make it right. Period.", icon: <svg width="22" height="22" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 000-7.78z"/></svg> },
                ].map((p) => (
                  <div key={p.title} className="why-point">
                    <div className="why-point-icon">{p.icon}</div>
                    <div>
                      <h4>{p.title}</h4>
                      <p>{p.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="section process">
        <div className="container">
          <div className="section-header center fade-in">
            <div className="section-label">How It Works</div>
            <h2 className="section-title">From First Call to Finished Job<br />— It&apos;s That Simple</h2>
            <p className="section-subtitle">No runaround. No phone tag. Just a straightforward process that gets your property taken care of fast.</p>
          </div>
          <div className="process-steps fade-in">
            {[
              { num: 1, title: 'Request a Quote', desc: "Book online or give us a call. Tell us what you need and we'll get back to you fast — usually within the hour." },
              { num: 2, title: 'Get Your Estimate', desc: 'We\'ll assess the job, give you a clear price with no hidden fees, and answer any questions you have.' },
              { num: 3, title: 'We Get to Work', desc: "Our crew shows up on time with the right equipment. We handle everything — you don't have to lift a finger." },
              { num: 4, title: 'Enjoy the Results', desc: 'Walk out to a property that looks incredible. Love the work? Set up recurring service and never think about it again.' },
            ].map((s) => (
              <div key={s.num} className="process-step">
                <div className="process-num">{s.num}</div>
                <h4>{s.title}</h4>
                <p>{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Gallery */}
      <section className="section gallery" id="gallery">
        <div className="container">
          <div className="section-header center fade-in">
            <div className="section-label">Our Work</div>
            <h2 className="section-title">See the Difference for Yourself</h2>
            <p className="section-subtitle">Before and after transformations from real jobs across the Bay Area. Every project, big or small, gets the same level of attention.</p>
          </div>

          <div className="gallery-grid">
            {GALLERY_PAIRS.slice(0, 4).map((pair) => (
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
                  <h4>{pair.title}</h4>
                  <span>{pair.tag}</span>
                </div>
              </div>
            ))}
          </div>
          <div style={{ textAlign: 'center', marginTop: 40 }} className="fade-in">
            <Link href="/gallery" className="btn-primary" style={{ background: 'var(--green-dark)' }}>View Full Gallery →</Link>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="section testimonials">
        <div className="container">
          <div className="section-header center fade-in">
            <div className="section-label">Testimonials</div>
            <h2 className="section-title" style={{ color: 'var(--white)' }}>What Our Customers Are Saying</h2>
            <p className="section-subtitle">Don&apos;t just take our word for it — hear from homeowners and property managers across the Bay Area.</p>
          </div>
          <div className="testimonials-grid fade-in">
            {(reviews.length > 0 ? reviews : TESTIMONIALS.map(t => ({ reviewer_name: t.name, reviewer_location: t.location, rating: 5, review_text: t.text }))).map((t, i) => {
              const name = t.reviewer_name || 'Customer'
              const initials = name.split(' ').map(w => w[0]).join('').slice(0, 2).toUpperCase()
              const stars = '★'.repeat(t.rating || 5)
              return (
                <div key={i} className="testimonial-card">
                  <div className="testimonial-stars">{stars}</div>
                  <blockquote>&ldquo;{t.review_text}&rdquo;</blockquote>
                  <div className="testimonial-author">
                    <div className="testimonial-avatar">{initials}</div>
                    <div>
                      <div className="testimonial-name">{name}</div>
                      {t.reviewer_location && <div className="testimonial-loc">{t.reviewer_location}</div>}
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* Service Areas */}
      <section className="section areas" id="areas">
        <div className="container">
          <div className="section-header center fade-in">
            <div className="section-label">Where We Work</div>
            <h2 className="section-title">Lawn Care &amp; Junk Removal<br />Across the Bay Area</h2>
            <p className="section-subtitle">We provide lawn mowing, junk hauling, landscaping, and yard cleanup services throughout Oakland, the East Bay, and surrounding communities. Don&apos;t see your city? Call us — we probably cover your area.</p>
          </div>
          <div className="areas-grid fade-in">
            {SERVICE_AREAS.map((area) => (
              <Link key={area} href={`/areas/${area.toLowerCase().replace(/\s+/g, '-')}`} className="area-tag">
                {PIN_ICON}
                {area}
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Dump Trailer Rental */}
      <section className="section trailer-rental">
        <div className="container">
          <div className="trailer-grid">
            <div className="trailer-image fade-in">
              <img src="/images/gallery/dump-trailer.jpg" alt="JB Lawn Care 10-yard dump trailer for rent" />
            </div>
            <div className="fade-in">
              <div className="section-label">Equipment Rental</div>
              <h2 className="section-title" style={{ color: 'var(--white)' }}>10-Yard Dump Trailer for Rent</h2>
              <p style={{ color: 'rgba(255,255,255,0.7)', lineHeight: 1.7, marginBottom: 8 }}>
                Taking on a project yourself? Our heavy-duty 10-yard dump trailer handles junk, yard debris, construction waste, and more. We drop it off, you fill it up, we haul it away.
              </p>
              <p className="trailer-area">Serving <strong>Hayward to Vallejo</strong> — and everywhere in between.</p>
              <div className="trailer-pricing">
                <div className="trailer-price-card featured">
                  <div className="trailer-price">$400</div>
                  <div className="trailer-price-label">Full-Service Package</div>
                  <div className="trailer-price-details">Drop-off + pickup included. Covers 1 ton of disposal fees. Keep it up to 7 days.</div>
                </div>
                <div className="trailer-price-card">
                  <div className="trailer-price">$150<span style={{ fontSize: '1rem', fontFamily: 'var(--font-body)', opacity: 0.7 }}>/day</span></div>
                  <div className="trailer-price-label">DIY Daily Rental</div>
                  <div className="trailer-price-details">Haul it yourself for the day. Perfect for quick cleanouts and small projects.</div>
                </div>
              </div>
              <div style={{ marginTop: 32 }}>
                <button className="btn-primary" onClick={() => openBooking()} style={{ boxShadow: '0 6px 20px rgba(245,214,35,0.3)' }}>
                  <svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg>
                  Reserve Your Trailer
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Banner */}
      <section className="cta-banner">
        <h2>Need Lawn Care or Junk Removal<br />in the Bay Area?</h2>
        <p>Get a free, no-obligation estimate for any lawn, landscaping, or hauling job. Most quotes are returned within the hour — same-day service available.</p>
        <button className="btn-white" onClick={() => openBooking()}>
          <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg>
          Book Your Free Estimate
        </button>
      </section>

      {/* FAQ Section — AEO Optimized */}
      <section className="section" style={{ background: 'var(--white)' }}>
        <div className="container">
          <div className="section-header center fade-in">
            <div className="section-label">FAQ</div>
            <h2 className="section-title">Common Questions About Our Services</h2>
          </div>
          <div className="fade-in" style={{ maxWidth: 720, margin: '0 auto' }}>
            {[
              {
                q: 'How much does junk removal cost in the Bay Area?',
                a: 'Most junk removal jobs in Oakland, Hayward, and the East Bay range from $150 to $500 depending on volume. We provide free, no-obligation estimates before any work begins — you\'ll know the exact price upfront with no hidden fees.',
              },
              {
                q: 'Do you offer same-day junk removal?',
                a: 'Yes. We offer same-day junk hauling and removal for most Bay Area locations when scheduled before noon. Call 341-260-0331 or book online for availability.',
              },
              {
                q: 'How often should I have my lawn mowed?',
                a: 'In the Bay Area\'s mild climate, most lawns need weekly mowing from March through October and bi-weekly service during the cooler months. We offer flexible scheduling — weekly, bi-weekly, or one-time service.',
              },
              {
                q: 'What areas do you serve?',
                a: 'We provide lawn care, junk removal, landscaping, and hauling services across Oakland, Berkeley, Richmond, Hayward, Fremont, San Leandro, Concord, Walnut Creek, Pleasanton, Dublin, and the greater Bay Area.',
              },
              {
                q: 'Is it cheaper to hire a junk removal company or rent a dumpster?',
                a: 'In most cases, hiring a junk removal crew is cheaper when you factor in dumpster rental fees, permits, disposal costs, and your own labor. Our crew handles all the heavy lifting and disposal — you don\'t have to do anything.',
              },
              {
                q: 'Can I rent a dump trailer instead?',
                a: 'Yes. We offer a 10-yard dump trailer for rent at $150/day for DIY projects, or $400 for full-service (drop-off, pickup, and up to 1 ton of disposal included). Available from Hayward to Vallejo.',
              },
            ].map((faq, i) => (
              <details key={i} style={{
                borderBottom: '1px solid var(--gray-light)',
                padding: '20px 0',
              }}>
                <summary style={{
                  fontWeight: 700,
                  fontSize: '1.02rem',
                  cursor: 'pointer',
                  color: 'var(--black)',
                  listStyle: 'none',
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                }}>
                  {faq.q}
                  <span style={{ color: 'var(--green-mid)', fontSize: '1.2rem', flexShrink: 0, marginLeft: 16 }}>+</span>
                </summary>
                <p style={{
                  marginTop: 12,
                  fontSize: '0.95rem',
                  color: 'var(--gray-mid)',
                  lineHeight: 1.7,
                }}>{faq.a}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* Blog Preview */}
      <section className="section blog-preview">
        <div className="container">
          <div className="section-header center fade-in">
            <div className="section-label">Resources</div>
            <h2 className="section-title">Lawn Care Tips &amp; Hauling Guides</h2>
            <p className="section-subtitle">Practical advice from our crew to help Bay Area homeowners maintain their properties and make smarter decisions about outdoor services.</p>
          </div>
          <div className="blog-grid fade-in">
            {BLOG_POSTS.map((post) => (
              <Link key={post.href} href={post.href} className="blog-card">
                <div className="blog-thumb">{post.category}</div>
                <div className="blog-body">
                  <div className="blog-category">{post.category}</div>
                  <h3>{post.title}</h3>
                  <p>{post.excerpt}</p>
                </div>
              </Link>
            ))}
          </div>
          <div style={{ textAlign: 'center', marginTop: 40 }} className="fade-in">
            <Link href="/blog" className="btn-primary" style={{ background: 'var(--green-dark)' }}>Read More on the Blog →</Link>
          </div>
        </div>
      </section>
    </>
  )
}