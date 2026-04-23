'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import BookingModal from '@/components/BookingModal'
import { BookingProvider, useBooking } from '@/components/BookingContext'

function PublicLayoutInner({ children }: { children: React.ReactNode }) {
  const { openBooking, closeBooking, isOpen } = useBooking()
  const [mobileNavOpen, setMobileNavOpen] = useState(false)
  const [navScrolled, setNavScrolled] = useState(false)
  const [showBackToTop, setShowBackToTop] = useState(false)
  const [openDropdown, setOpenDropdown] = useState<string | null>(null)

  useEffect(() => {
    const onScroll = () => {
      setNavScrolled(window.scrollY > 20)
      setShowBackToTop(window.scrollY > 600)
    }
    const onClickOutside = (e: MouseEvent) => {
      if (!(e.target as HTMLElement).closest('.dropdown')) setOpenDropdown(null)
    }
    window.addEventListener('scroll', onScroll)
    document.addEventListener('click', onClickOutside)
    return () => { window.removeEventListener('scroll', onScroll); document.removeEventListener('click', onClickOutside) }
  }, [])

  useEffect(() => {
    document.body.style.overflow = isOpen ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [isOpen])

  return (
    <>
      {/* Announcement Bar */}
      <div className="announcement-bar">
        <span>🌿 Now booking lawn care &amp; junk removal across Oakland, Hayward &amp; the East Bay!</span>{' '}
        <a href="#" onClick={(e) => { e.preventDefault(); openBooking() }}>
          Book your free estimate today →
        </a>
      </div>

      {/* Navigation */}
      <nav className={`nav${navScrolled ? ' scrolled' : ''}`}>
        <div className="nav-inner">
          <Link href="/" className="nav-logo">
            <img src="/images/jb-logo.jpg" alt="JB Lawn Care & Hauling" />
          </Link>
          <ul className="nav-links">
            <li><Link href="/">Home</Link></li>
            <li className={`dropdown${openDropdown === 'services' ? ' open' : ''}`}>
              <a href="#" onClick={(e) => { e.preventDefault(); setOpenDropdown(openDropdown === 'services' ? null : 'services') }}>Services ▾</a>
              <div className="dropdown-menu" onClick={() => setOpenDropdown(null)}>
                <Link href="/services/lawn-mowing">Lawn Mowing &amp; Maintenance</Link>
                <Link href="/services/landscaping">Landscaping &amp; Sod Installation</Link>
                <Link href="/services/junk-hauling">Junk Removal &amp; Hauling</Link>
                <Link href="/services/yard-cleanup">Yard Cleanup &amp; Debris</Link>
                <Link href="/services/bush-trimming">Bush &amp; Hedge Trimming</Link>
                <Link href="/services/mulching">Mulching &amp; Bed Care</Link>
                <Link href="/services/trailer-rental">Dump Trailer Rental</Link>
              </div>
            </li>
            <li className={`dropdown${openDropdown === 'areas' ? ' open' : ''}`}>
              <a href="#" onClick={(e) => { e.preventDefault(); setOpenDropdown(openDropdown === 'areas' ? null : 'areas') }}>Service Areas ▾</a>
              <div className="dropdown-menu" onClick={() => setOpenDropdown(null)}>
                <Link href="/areas/oakland">Oakland</Link>
                <Link href="/areas/san-francisco">San Francisco</Link>
                <Link href="/areas/berkeley">Berkeley</Link>
                <Link href="/areas/richmond">Richmond</Link>
                <Link href="/areas/hayward">Hayward</Link>
                <Link href="/areas/fremont">Fremont</Link>
              </div>
            </li>
            <li><Link href="/gallery">Gallery</Link></li>
            <li><Link href="/blog">Blog</Link></li>
            <li><Link href="/about">About</Link></li>
          </ul>
          <a href="tel:3412600331" className="nav-phone">
            <svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M22 16.92v3a2 2 0 01-2.18 2 19.86 19.86 0 01-8.63-3.07 19.5 19.5 0 01-6-6A19.86 19.86 0 012.12 4.18 2 2 0 014.11 2h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L8.09 9.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 16.92z"/></svg>
            341-260-0331
          </a>
          <a href="#" className="nav-cta" onClick={(e) => { e.preventDefault(); openBooking() }}>Book Online</a>
          <button className="nav-hamburger" onClick={() => setMobileNavOpen(true)} aria-label="Open menu">
            <span /><span /><span />
          </button>
        </div>
      </nav>

      {/* Mobile Nav */}
      <div className={`mobile-nav${mobileNavOpen ? ' open' : ''}`}>
        <button className="mobile-nav-close" onClick={() => setMobileNavOpen(false)} aria-label="Close menu">&times;</button>
        <Link href="/" onClick={() => setMobileNavOpen(false)}>Home</Link>
        <Link href="/services/lawn-mowing" className="mobile-sub" onClick={() => setMobileNavOpen(false)}>Lawn Mowing &amp; Maintenance</Link>
        <Link href="/services/landscaping" className="mobile-sub" onClick={() => setMobileNavOpen(false)}>Landscaping &amp; Sod Installation</Link>
        <Link href="/services/junk-hauling" className="mobile-sub" onClick={() => setMobileNavOpen(false)}>Junk Removal &amp; Hauling</Link>
        <Link href="/services/yard-cleanup" className="mobile-sub" onClick={() => setMobileNavOpen(false)}>Yard Cleanup &amp; Debris</Link>
        <Link href="/services/bush-trimming" className="mobile-sub" onClick={() => setMobileNavOpen(false)}>Bush &amp; Hedge Trimming</Link>
        <Link href="/services/mulching" className="mobile-sub" onClick={() => setMobileNavOpen(false)}>Mulching &amp; Bed Care</Link>
        <Link href="/services/trailer-rental" className="mobile-sub" onClick={() => setMobileNavOpen(false)}>Dump Trailer Rental</Link>
        <Link href="/gallery" onClick={() => setMobileNavOpen(false)}>Gallery</Link>
        <Link href="/blog" onClick={() => setMobileNavOpen(false)}>Blog</Link>
        <Link href="/about" onClick={() => setMobileNavOpen(false)}>About</Link>
        <a href="tel:3412600331">📞 341-260-0331</a>
        <Link href="/admin/login" onClick={() => setMobileNavOpen(false)}>🔒 Client Login</Link>
        <a href="#" className="mobile-nav-cta" onClick={(e) => { e.preventDefault(); openBooking(); setMobileNavOpen(false) }}>Book Online</a>
      </div>

      {/* Page Content */}
      {children}

      {/* Footer */}
      <footer className="footer">
        <div className="footer-grid">
          <div className="footer-brand">
            <img src="/images/jb-footer-logo.png" alt="JB Lawn Care & Hauling" style={{ height: 60 }} />
            <p>Professional lawn care, junk removal, landscaping, and hauling services for residential and commercial properties across Oakland, Hayward, Fremont, and the greater Bay Area.</p>
            <div className="footer-social">
              <a href="https://www.instagram.com/jb_lawn_care_and_hauling/" target="_blank" rel="noopener noreferrer" aria-label="Instagram"><svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><rect x="2" y="2" width="20" height="20" rx="5"/><path d="M16 11.37A4 4 0 1112.63 8 4 4 0 0116 11.37z"/><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/></svg></a>
              <a href="#" aria-label="Facebook"><svg width="18" height="18" fill="currentColor" viewBox="0 0 24 24"><path d="M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z"/></svg></a>
              <a href="#" aria-label="Google"><svg width="18" height="18" fill="currentColor" viewBox="0 0 24 24"><path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 01-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z"/><path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/><path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/><path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/></svg></a>
            </div>
          </div>
          <div className="footer-col">
            <h4>Services</h4>
            <ul>
              <li><Link href="/services/lawn-mowing">Lawn Mowing</Link></li>
              <li><Link href="/services/landscaping">Landscaping</Link></li>
              <li><Link href="/services/junk-hauling">Junk Removal</Link></li>
              <li><Link href="/services/yard-cleanup">Yard Cleanup</Link></li>
              <li><Link href="/services/bush-trimming">Bush Trimming</Link></li>
              <li><Link href="/services/mulching">Mulching</Link></li>
              <li><Link href="/services/trailer-rental">Trailer Rental</Link></li>
            </ul>
          </div>
          <div className="footer-col">
            <h4>Service Areas</h4>
            <ul>
              <li><Link href="/areas/oakland">Oakland</Link></li>
              <li><Link href="/areas/san-francisco">San Francisco</Link></li>
              <li><Link href="/areas/berkeley">Berkeley</Link></li>
              <li><Link href="/areas/richmond">Richmond</Link></li>
              <li><Link href="/areas/hayward">Hayward</Link></li>
              <li><Link href="/areas/fremont">Fremont</Link></li>
            </ul>
          </div>
          <div className="footer-col">
            <h4>Company</h4>
            <ul>
              <li><Link href="/about">About Us</Link></li>
              <li><Link href="/gallery">Gallery</Link></li>
              <li><Link href="/blog">Blog</Link></li>
              <li><Link href="/contact">Contact</Link></li>
              <li><a href="tel:3412600331">341-260-0331</a></li>
              <li style={{ marginTop: 8 }}><Link href="/admin/login" style={{ color: 'rgba(255,255,255,0.5)' }}>Admin Login</Link></li>
            </ul>
          </div>
        </div>
        <div className="footer-bottom">
          <span>&copy; 2026 JB Lawn Care &amp; Hauling. All rights reserved.</span>
          <span>
            <Link href="/privacy" style={{ color: 'inherit', textDecoration: 'none' }}>Privacy Policy</Link>
            {' · '}
            <Link href="/terms" style={{ color: 'inherit', textDecoration: 'none' }}>Terms of Service</Link>
          </span>
        </div>
      </footer>

      {/* Booking Modal */}
      <BookingModal open={isOpen} onClose={() => closeBooking()} />

      {/* Back to Top */}
      {showBackToTop && (
        <button className="back-to-top visible" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
          <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24"><polyline points="18 15 12 9 6 15" /></svg>
        </button>
      )}
    </>
  )
}

export default function PublicLayout({ children }: { children: React.ReactNode }) {
  return (
    <BookingProvider>
      <PublicLayoutInner>{children}</PublicLayoutInner>
    </BookingProvider>
  )
}