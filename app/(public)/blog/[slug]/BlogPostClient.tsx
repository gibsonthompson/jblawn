'use client'

import Link from 'next/link'
import { useBooking } from '../../../../components/BookingContext'
import type { BlogPost } from '../../../../lib/blog'
import { CATEGORY_LABELS } from '../../../../lib/blog'

export default function BlogPostClient({ post }: { post: BlogPost }) {
  const { openBooking } = useBooking()

  return (
    <>
      {/* Header */}
      <section className="service-hero" style={{ paddingBottom: 60 }}>
        <div className="container">
          <div className="service-hero-inner" style={{ maxWidth: 680 }}>
            <Link href="/blog" style={{ color: 'rgba(255,255,255,0.5)', textDecoration: 'none', fontSize: '0.88rem', fontWeight: 600, display: 'inline-flex', alignItems: 'center', gap: 6, marginBottom: 16 }}>
              ← Back to Blog
            </Link>
            <div className="section-label">{CATEGORY_LABELS[post.category] || post.category}</div>
            <h1 className="service-hero-h1" style={{ fontSize: 'clamp(1.8rem, 3.5vw, 2.4rem)' }}>{post.title}</h1>
            <div style={{ display: 'flex', gap: 16, alignItems: 'center', marginTop: 12, fontSize: '0.88rem', color: 'rgba(255,255,255,0.5)' }}>
              <span>{post.author}</span>
              <span>·</span>
              <span>{new Date(post.published_at).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}</span>
              {post.word_count && (
                <>
                  <span>·</span>
                  <span>{Math.ceil(post.word_count / 200)} min read</span>
                </>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Content */}
      <section className="section" style={{ background: 'var(--white)', paddingTop: 48 }}>
        <div className="container">
          <article
            className="blog-content"
            style={{ maxWidth: 680, margin: '0 auto' }}
            dangerouslySetInnerHTML={{ __html: post.content }}
          />
        </div>
      </section>

      {/* CTA */}
      <section className="cta-banner">
        <h2>Need Help With Your Property?</h2>
        <p>JB Lawn Care &amp; Hauling provides lawn mowing, junk removal, landscaping, and yard cleanup across the Bay Area.</p>
        <button className="btn-white" onClick={openBooking}>
          Get a Free Estimate
        </button>
      </section>

      {/* Back to Blog */}
      <section className="section" style={{ background: 'var(--off-white)', paddingTop: 48, paddingBottom: 48 }}>
        <div className="container" style={{ textAlign: 'center' }}>
          <Link href="/blog" className="btn-primary" style={{ background: 'var(--green-dark)' }}>
            ← Browse All Posts
          </Link>
        </div>
      </section>
    </>
  )
}
