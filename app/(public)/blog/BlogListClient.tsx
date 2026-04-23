'use client'

import { useState } from 'react'
import Link from 'next/link'
import type { BlogPost } from '../../../lib/blog'
import { CATEGORY_LABELS } from '../../../lib/blog'

export default function BlogListClient({ posts }: { posts: BlogPost[] }) {
  const [filter, setFilter] = useState('all')

  const categories = ['all', ...Array.from(new Set(posts.map(p => p.category)))]
  const filtered = filter === 'all' ? posts : posts.filter(p => p.category === filter)

  return (
    <>
      <section className="service-hero">
        <div className="container">
          <div className="service-hero-inner">
            <div className="section-label">Blog</div>
            <h1 className="service-hero-h1">Lawn Care Tips &amp; Hauling Guides</h1>
            <p className="service-hero-sub">Practical advice from our crew to help Bay Area homeowners maintain their properties and make smarter decisions about outdoor services.</p>
          </div>
        </div>
      </section>

      <section className="section" style={{ background: 'var(--white)' }}>
        <div className="container">
          {/* Category Filters */}
          <div style={{ display: 'flex', gap: 8, justifyContent: 'center', marginBottom: 40, flexWrap: 'wrap' }}>
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setFilter(cat)}
                style={{
                  padding: '10px 22px',
                  borderRadius: 8,
                  border: '1px solid',
                  borderColor: filter === cat ? 'var(--green-bright)' : 'var(--gray-light)',
                  background: filter === cat ? 'rgba(107,191,26,0.1)' : 'var(--white)',
                  color: filter === cat ? 'var(--green-mid)' : 'var(--gray-mid)',
                  fontWeight: 700,
                  fontSize: '0.9rem',
                  cursor: 'pointer',
                  transition: 'all 0.15s ease',
                  fontFamily: 'inherit',
                  textTransform: 'capitalize',
                }}
              >
                {cat === 'all' ? `All (${posts.length})` : CATEGORY_LABELS[cat] || cat}
              </button>
            ))}
          </div>

          {/* Posts Grid */}
          <div className="blog-grid">
            {filtered.map((post) => (
              <Link key={post.slug} href={`/blog/${post.slug}`} className="blog-card">
                <div className="blog-thumb" style={{
                  backgroundImage: post.featured_image ? `url(${post.featured_image})` : undefined,
                  backgroundSize: 'cover',
                  backgroundPosition: 'center',
                }}>
                  {!post.featured_image && (
                    <span style={{ color: 'var(--gray-mid)' }}>
                      {CATEGORY_LABELS[post.category] || post.category}
                    </span>
                  )}
                </div>
                <div className="blog-body">
                  <div className="blog-category">{CATEGORY_LABELS[post.category] || post.category}</div>
                  <h3>{post.title}</h3>
                  <p>{post.excerpt}</p>
                  <div style={{ marginTop: 12, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <span style={{ fontSize: '0.78rem', color: 'var(--gray-mid)' }}>
                      {new Date(post.published_at).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                    </span>
                    {post.word_count && (
                      <span style={{ fontSize: '0.78rem', color: 'var(--gray-mid)' }}>
                        {Math.ceil(post.word_count / 200)} min read
                      </span>
                    )}
                  </div>
                </div>
              </Link>
            ))}
          </div>

          {filtered.length === 0 && (
            <p style={{ textAlign: 'center', color: 'var(--gray-mid)', padding: 60, fontSize: '1rem' }}>
              No posts in this category yet. Check back soon.
            </p>
          )}
        </div>
      </section>
    </>
  )
}
