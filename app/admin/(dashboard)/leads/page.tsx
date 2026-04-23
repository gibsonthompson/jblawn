'use client'

import Link from 'next/link'
import Image from 'next/image'

export default function InsuranceSavingsCaseStudy() {
  return (
    <>
      {/* Hero */}
      <section className="relative bg-navy-900 pt-32 pb-20 overflow-hidden">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1590496793907-51d60f3d9c68?auto=format&fit=crop&w=1920&q=80')] bg-cover bg-center opacity-20" />
        <div className="absolute inset-0 bg-gradient-to-b from-navy-900/50 to-navy-900" />
        
        <div className="relative max-w-[1200px] mx-auto px-6">
          <nav className="flex items-center gap-2 text-sm text-white/60 mb-8">
            <Link href="/" className="hover:text-gold-400 transition-colors">Home</Link>
            <span>/</span>
            <Link href="/#results" className="hover:text-gold-400 transition-colors">Results</Link>
            <span>/</span>
            <span className="text-white">Ridgeway Transport</span>
          </nav>
          
          <span className="inline-block bg-gold-500 text-navy-900 py-1.5 px-3 text-[11px] font-bold tracking-[0.1em] uppercase rounded-sm mb-6">
            Cost Reduction
          </span>
          
          <h1 className="font-display text-[clamp(2rem,4vw,3rem)] text-white font-bold leading-[1.15] tracking-[-0.02em] max-w-[800px] mb-6">
            How a 12-Truck Regional Carrier Cut Insurance Costs by <span className="text-gold-400">$47,000 Per Year</span>
          </h1>
          
          <p className="text-xl text-white/70 max-w-[600px] leading-relaxed">
            Ridgeway Transport was overpaying for coverage through a local agent. By pooling their policies with GTC's carrier network, they unlocked enterprise-level rates.
          </p>
        </div>
      </section>

      {/* Quick Stats */}
      <section className="bg-white border-b border-gray-200">
        <div className="max-w-[1200px] mx-auto px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 divide-x divide-gray-200">
            <div className="py-8 pr-6 md:pr-8">
              <p className="text-[11px] font-bold tracking-[0.1em] uppercase text-gray-500 mb-2">Annual Savings</p>
              <p className="font-display text-3xl md:text-4xl font-bold text-gold-500">$47K</p>
            </div>
            <div className="py-8 px-6 md:px-8">
              <p className="text-[11px] font-bold tracking-[0.1em] uppercase text-gray-500 mb-2">Fleet Size</p>
              <p className="font-display text-3xl md:text-4xl font-bold text-navy-900">12 Trucks</p>
            </div>
            <div className="py-8 px-6 md:px-8">
              <p className="text-[11px] font-bold tracking-[0.1em] uppercase text-gray-500 mb-2">Time to ROI</p>
              <p className="font-display text-3xl md:text-4xl font-bold text-navy-900">6 Days</p>
            </div>
            <div className="py-8 pl-6 md:pl-8">
              <p className="text-[11px] font-bold tracking-[0.1em] uppercase text-gray-500 mb-2">Region</p>
              <p className="font-display text-3xl md:text-4xl font-bold text-navy-900">Southeast</p>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="bg-cream-100 py-20">
        <div className="max-w-[1200px] mx-auto px-6">
          <div className="grid lg:grid-cols-[1fr,340px] gap-12 lg:gap-16">
            
            {/* Article Content */}
            <article className="prose prose-lg max-w-none">
              
              {/* The Challenge */}
              <div className="bg-white rounded-lg p-8 mb-10 shadow-sm">
                <h2 className="font-display text-2xl text-navy-900 font-bold mb-4 mt-0">The Challenge</h2>
                <p className="text-gray-600 leading-relaxed mb-0">
                  Ridgeway Transport, a family-owned regional carrier based out of Macon, Georgia, had been working with the same local insurance agent for over eight years. Owner <strong>Marcus Ridgeway</strong> trusted the relationship—his father had used the same agency when he started the company in 1994.
                </p>
              </div>

              <p>
                But trust doesn't always translate to competitive rates. When Marcus expanded from 8 to 12 trucks in early 2024, his annual premium jumped to <strong>$289,000</strong>. The agent assured him this was standard for a fleet of his size and risk profile.
              </p>

              <p>
                "I didn't have anything to compare it to," Marcus admitted. "I figured insurance is insurance. You pay what you pay."
              </p>

              <p>
                That assumption was costing him nearly $4,000 per truck more than necessary.
              </p>

              {/* The Turning Point */}
              <h2 className="font-display text-2xl text-navy-900 font-bold mt-12 mb-4">The Turning Point</h2>
              
              <p>
                Marcus connected with The GTC Group after meeting J. Brewer at a regional trucking association event. During their initial assessment, GTC's team reviewed Ridgeway's current policies, claims history, and coverage requirements.
              </p>

              <blockquote className="border-l-4 border-gold-500 pl-6 my-8 italic text-gray-700">
                "Within 48 hours, they came back with three quotes from A-rated carriers—all significantly lower than what I was paying. I couldn't believe my agent had never shown me these options."
                <footer className="text-sm text-gray-500 mt-2 not-italic">— Marcus Ridgeway, Owner</footer>
              </blockquote>

              <p>
                The difference wasn't luck. GTC leverages the combined purchasing power of <strong>35+ carriers</strong> in their network to negotiate rates that individual operators simply can't access. Insurance providers offer volume discounts to groups that represent lower administrative costs and diversified risk—the same economics that benefit mega-carriers.
              </p>

              {/* The Solution */}
              <h2 className="font-display text-2xl text-navy-900 font-bold mt-12 mb-4">The Solution</h2>

              <p>
                GTC restructured Ridgeway's coverage across three areas:
              </p>

              <div className="bg-navy-900 text-white rounded-lg p-8 my-8">
                <div className="grid md:grid-cols-3 gap-6">
                  <div>
                    <p className="text-gold-400 text-sm font-bold tracking-wide uppercase mb-2">Primary Liability</p>
                    <p className="text-2xl font-display font-bold mb-1">$22,400</p>
                    <p className="text-white/60 text-sm">Annual savings</p>
                  </div>
                  <div>
                    <p className="text-gold-400 text-sm font-bold tracking-wide uppercase mb-2">Physical Damage</p>
                    <p className="text-2xl font-display font-bold mb-1">$14,800</p>
                    <p className="text-white/60 text-sm">Annual savings</p>
                  </div>
                  <div>
                    <p className="text-gold-400 text-sm font-bold tracking-wide uppercase mb-2">Cargo Coverage</p>
                    <p className="text-2xl font-display font-bold mb-1">$9,800</p>
                    <p className="text-white/60 text-sm">Annual savings</p>
                  </div>
                </div>
              </div>

              <p>
                The total: <strong>$47,000 in annual savings</strong>—with identical coverage limits and deductibles. In some cases, the new policies actually improved coverage, adding roadside assistance and downtime protection that Ridgeway didn't have before.
              </p>

              <p>
                The entire process took less than two weeks from initial assessment to policy binding.
              </p>

              {/* The Impact */}
              <h2 className="font-display text-2xl text-navy-900 font-bold mt-12 mb-4">The Impact</h2>

              <p>
                $47,000 per year translates to real operational flexibility. For Ridgeway Transport, that money went directly toward:
              </p>

              <ul className="space-y-3 my-6">
                <li className="flex items-start gap-3">
                  <span className="w-1.5 h-1.5 rounded-full bg-gold-500 mt-2.5 flex-shrink-0" />
                  <span><strong>Driver retention bonuses</strong> — Competitive pay helps keep experienced drivers on payroll</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="w-1.5 h-1.5 rounded-full bg-gold-500 mt-2.5 flex-shrink-0" />
                  <span><strong>Equipment upgrades</strong> — New ELD systems and safety technology across the fleet</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="w-1.5 h-1.5 rounded-full bg-gold-500 mt-2.5 flex-shrink-0" />
                  <span><strong>Cash reserves</strong> — Buffer for slow seasons and unexpected repairs</span>
                </li>
              </ul>

              <p>
                "That $47K was profit I was leaving on the table every single year," Marcus said. "I'm not a big operation. That kind of money changes what's possible for us."
              </p>

              {/* Looking Ahead */}
              <h2 className="font-display text-2xl text-navy-900 font-bold mt-12 mb-4">Looking Ahead</h2>

              <p>
                Since partnering with GTC, Ridgeway Transport has also enrolled in their fuel purchasing program and is exploring lane acquisition services to reduce dependence on load boards.
              </p>

              <p>
                For carriers in similar situations—loyal to a local agent but unsure if they're getting competitive rates—Marcus has simple advice:
              </p>

              <blockquote className="border-l-4 border-gold-500 pl-6 my-8 italic text-gray-700">
                "Get a second opinion. It costs nothing to find out what you're actually worth on the open market. I wish I'd done it five years ago."
              </blockquote>

            </article>

            {/* Sidebar */}
            <aside className="space-y-8">
              
              {/* Company Profile */}
              <div className="bg-white rounded-lg p-6 shadow-sm">
                <h3 className="font-display text-lg font-bold text-navy-900 mb-4">Company Profile</h3>
                <dl className="space-y-4 text-sm">
                  <div>
                    <dt className="text-gray-500 mb-1">Company</dt>
                    <dd className="font-semibold text-navy-900">Ridgeway Transport LLC</dd>
                  </div>
                  <div>
                    <dt className="text-gray-500 mb-1">Location</dt>
                    <dd className="font-semibold text-navy-900">Macon, Georgia</dd>
                  </div>
                  <div>
                    <dt className="text-gray-500 mb-1">Fleet Size</dt>
                    <dd className="font-semibold text-navy-900">12 Class 8 tractors</dd>
                  </div>
                  <div>
                    <dt className="text-gray-500 mb-1">Primary Freight</dt>
                    <dd className="font-semibold text-navy-900">Dry van, regional</dd>
                  </div>
                  <div>
                    <dt className="text-gray-500 mb-1">Years in Business</dt>
                    <dd className="font-semibold text-navy-900">30+ (est. 1994)</dd>
                  </div>
                </dl>
              </div>

              {/* Services Used */}
              <div className="bg-white rounded-lg p-6 shadow-sm">
                <h3 className="font-display text-lg font-bold text-navy-900 mb-4">GTC Services Used</h3>
                <ul className="space-y-3">
                  <li className="flex items-center gap-3">
                    <svg className="w-5 h-5 text-gold-500 flex-shrink-0" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                    </svg>
                    <span className="text-sm text-gray-700">Insurance Procurement</span>
                  </li>
                  <li className="flex items-center gap-3">
                    <svg className="w-5 h-5 text-gold-500 flex-shrink-0" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                    </svg>
                    <span className="text-sm text-gray-700">Policy Optimization</span>
                  </li>
                  <li className="flex items-center gap-3">
                    <svg className="w-5 h-5 text-white/30 flex-shrink-0" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                    </svg>
                    <span className="text-sm text-gray-400">Fuel Program (enrolled)</span>
                  </li>
                </ul>
              </div>

              {/* CTA Card */}
              <div className="bg-navy-900 rounded-lg p-6 text-center">
                <h3 className="font-display text-xl font-bold text-white mb-3">
                  See What You Could Save
                </h3>
                <p className="text-white/70 text-sm mb-6">
                  Get a free, no-obligation assessment of your current insurance costs.
                </p>
                <Link 
                  href="/book-call" 
                  className="inline-flex items-center justify-center w-full bg-gold-500 hover:bg-gold-400 text-navy-900 font-bold py-3 px-6 rounded transition-colors"
                >
                  Book Your Free Assessment
                </Link>
                <p className="text-white/50 text-xs mt-4">
                  Average savings: $8,400/truck/year
                </p>
              </div>

            </aside>
          </div>
        </div>
      </section>

      {/* Related Case Studies */}
      <section className="bg-white py-20">
        <div className="max-w-[1200px] mx-auto px-6">
          <h2 className="font-display text-2xl md:text-3xl text-navy-900 font-bold text-center mb-12">
            More Success Stories
          </h2>
          
          <div className="grid md:grid-cols-2 gap-8 max-w-[900px] mx-auto">
            {/* Related 1 */}
            <Link href="/case-studies/dedicated-lanes" className="group bg-cream-100 rounded-lg overflow-hidden hover:shadow-lg transition-shadow">
              <div className="h-[180px] bg-cover bg-center relative" style={{backgroundImage: "url('https://images.unsplash.com/photo-1580674285054-bed31e145f59?auto=format&fit=crop&w=800&q=80')"}}>
                <div className="absolute inset-0 bg-navy-900/40 group-hover:bg-navy-900/30 transition-colors" />
                <span className="absolute bottom-4 left-4 bg-gold-500 text-navy-900 py-1 px-2.5 text-[10px] font-bold tracking-[0.08em] uppercase rounded-sm">
                  Revenue Growth
                </span>
              </div>
              <div className="p-6">
                <h3 className="font-display text-lg font-bold text-navy-900 mb-2 group-hover:text-gold-600 transition-colors">
                  OTR Operator Increases Revenue 23% with Dedicated Lanes
                </h3>
                <p className="text-sm text-gray-600">
                  Struggling with load board inconsistency, this owner-operator found stability through direct shipper connections.
                </p>
              </div>
            </Link>

            {/* Related 2 */}
            <Link href="/case-studies/full-service-partnership" className="group bg-cream-100 rounded-lg overflow-hidden hover:shadow-lg transition-shadow">
              <div className="h-[180px] bg-cover bg-center relative" style={{backgroundImage: "url('https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&w=800&q=80')"}}>
                <div className="absolute inset-0 bg-navy-900/40 group-hover:bg-navy-900/30 transition-colors" />
                <span className="absolute bottom-4 left-4 bg-gold-500 text-navy-900 py-1 px-2.5 text-[10px] font-bold tracking-[0.08em] uppercase rounded-sm">
                  Full Service
                </span>
              </div>
              <div className="p-6">
                <h3 className="font-display text-lg font-bold text-navy-900 mb-2 group-hover:text-gold-600 transition-colors">
                  30-Truck Fleet Realizes $180K in First-Year Value
                </h3>
                <p className="text-sm text-gray-600">
                  A comprehensive GTC partnership delivered savings across insurance, fuel, lanes, and brand presence.
                </p>
              </div>
            </Link>
          </div>
        </div>
      </section>

      {/* Bottom CTA */}
      <section className="bg-navy-900 py-16">
        <div className="max-w-[800px] mx-auto px-6 text-center">
          <h2 className="font-display text-2xl md:text-3xl text-white font-bold mb-4">
            Ready to Stop Overpaying?
          </h2>
          <p className="text-white/70 mb-8 max-w-[500px] mx-auto">
            Join 35+ carriers who've discovered what pooled buying power can do for their bottom line.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link 
              href="/book-call" 
              className="inline-flex items-center justify-center bg-gold-500 hover:bg-gold-400 text-navy-900 font-bold py-3.5 px-8 rounded transition-colors"
            >
              Book a Free Consultation
            </Link>
            <Link 
              href="/services/cost-reduction" 
              className="inline-flex items-center justify-center border-2 border-white/30 hover:border-white hover:bg-white hover:text-navy-900 text-white font-bold py-3.5 px-8 rounded transition-colors"
            >
              Learn About Cost Reduction
            </Link>
          </div>
        </div>
      </section>
    </>
  )
}
