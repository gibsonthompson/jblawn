'use client'

import Link from 'next/link'
import Image from 'next/image'

export default function DedicatedLanesCaseStudy() {
  return (
    <>
      {/* Hero */}
      <section className="relative bg-navy-900 pt-32 pb-20 overflow-hidden">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1580674285054-bed31e145f59?auto=format&fit=crop&w=1920&q=80')] bg-cover bg-center opacity-20" />
        <div className="absolute inset-0 bg-gradient-to-b from-navy-900/50 to-navy-900" />
        
        <div className="relative max-w-[1200px] mx-auto px-6">
          <nav className="flex items-center gap-2 text-sm text-white/60 mb-8">
            <Link href="/" className="hover:text-gold-400 transition-colors">Home</Link>
            <span>/</span>
            <Link href="/#results" className="hover:text-gold-400 transition-colors">Results</Link>
            <span>/</span>
            <span className="text-white">Darrell Hawkins</span>
          </nav>
          
          <span className="inline-block bg-gold-500 text-navy-900 py-1.5 px-3 text-[11px] font-bold tracking-[0.1em] uppercase rounded-sm mb-6">
            Revenue Growth
          </span>
          
          <h1 className="font-display text-[clamp(2rem,4vw,3rem)] text-white font-bold leading-[1.15] tracking-[-0.02em] max-w-[800px] mb-6">
            How an Owner-Operator Grew Revenue <span className="text-gold-400">23% in 90 Days</span> by Ditching Load Boards
          </h1>
          
          <p className="text-xl text-white/70 max-w-[600px] leading-relaxed">
            Darrell Hawkins was grinding through load boards, chasing inconsistent freight. GTC connected him directly with shippers—and everything changed.
          </p>
        </div>
      </section>

      {/* Quick Stats */}
      <section className="bg-white border-b border-gray-200">
        <div className="max-w-[1200px] mx-auto px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 divide-x divide-gray-200">
            <div className="py-8 pr-6 md:pr-8">
              <p className="text-[11px] font-bold tracking-[0.1em] uppercase text-gray-500 mb-2">Revenue Increase</p>
              <p className="font-display text-3xl md:text-4xl font-bold text-gold-500">+23%</p>
            </div>
            <div className="py-8 px-6 md:px-8">
              <p className="text-[11px] font-bold tracking-[0.1em] uppercase text-gray-500 mb-2">Timeframe</p>
              <p className="font-display text-3xl md:text-4xl font-bold text-navy-900">90 Days</p>
            </div>
            <div className="py-8 px-6 md:px-8">
              <p className="text-[11px] font-bold tracking-[0.1em] uppercase text-gray-500 mb-2">Operation</p>
              <p className="font-display text-3xl md:text-4xl font-bold text-navy-900">OTR</p>
            </div>
            <div className="py-8 pl-6 md:pl-8">
              <p className="text-[11px] font-bold tracking-[0.1em] uppercase text-gray-500 mb-2">Fleet Size</p>
              <p className="font-display text-3xl md:text-4xl font-bold text-navy-900">1 Truck</p>
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
                  After 14 years driving for a regional carrier, <strong>Darrell Hawkins</strong> made the leap to owner-operator in 2022. He bought a well-maintained 2019 Freightliner Cascadia, got his authority, and figured the freight would follow. It did—but not the way he expected.
                </p>
              </div>

              <p>
                "I was on DAT and Truckstop every morning at 4 AM, refreshing like crazy," Darrell recalled. "Some weeks were solid. Other weeks I'd sit for two, three days waiting on a decent load. The inconsistency was killing me."
              </p>

              <p>
                The math wasn't adding up. Between broker fees eating 15-20% of each load, deadhead miles chasing freight, and the constant uncertainty, Darrell was grossing less as an owner-operator than he'd made as a company driver—with ten times the stress.
              </p>

              <p>
                "I'd burned through most of my savings in the first eight months. I was starting to think I'd made a huge mistake."
              </p>

              {/* The Load Board Trap */}
              <h2 className="font-display text-2xl text-navy-900 font-bold mt-12 mb-4">The Load Board Trap</h2>
              
              <p>
                Darrell's situation isn't unique. Load boards create a race to the bottom—hundreds of carriers competing for the same freight, with brokers capturing the margin. The system works for brokers, but it keeps independent operators stuck in a cycle of inconsistency.
              </p>

              <div className="bg-red-50 border-l-4 border-red-400 p-6 my-8">
                <p className="text-red-800 font-semibold mb-2">The Real Cost of Load Board Dependency</p>
                <ul className="text-red-700 text-sm space-y-1 mb-0 list-none pl-0">
                  <li>• 15-25% of revenue lost to broker fees</li>
                  <li>• Unpredictable weekly income</li>
                  <li>• Excessive deadhead miles chasing freight</li>
                  <li>• No relationship = no leverage on rates</li>
                  <li>• Constant competition against thousands of carriers</li>
                </ul>
              </div>

              <p>
                Darrell connected with The GTC Group through a recommendation from another owner-operator at a truck stop in Texarkana. "He told me they'd gotten him off the boards completely. I didn't believe him at first."
              </p>

              {/* The Solution */}
              <h2 className="font-display text-2xl text-navy-900 font-bold mt-12 mb-4">The Solution</h2>

              <p>
                GTC's revenue growth service focuses on one thing: connecting carriers directly with shippers who need consistent capacity. No brokers. No bidding wars. Just straightforward relationships where both sides win.
              </p>

              <blockquote className="border-l-4 border-gold-500 pl-6 my-8 italic text-gray-700">
                "Within three weeks, they had me set up with a dedicated lane running automotive parts from Birmingham to Nashville. Consistent freight, same route, same customer every week. I went from praying for loads to turning down work I couldn't fit."
                <footer className="text-sm text-gray-500 mt-2 not-italic">— Darrell Hawkins, Owner-Operator</footer>
              </blockquote>

              <p>
                GTC's dedicated sales team had identified the opportunity through their shipper network—a tier-one automotive supplier who needed reliable regional capacity but was tired of broker markups and inconsistent service. Darrell's clean safety record and professional communication made him an ideal fit.
              </p>

              <p>
                The arrangement benefited both parties:
              </p>

              <div className="bg-navy-900 text-white rounded-lg p-8 my-8">
                <div className="grid md:grid-cols-2 gap-8">
                  <div>
                    <p className="text-gold-400 text-sm font-bold tracking-wide uppercase mb-3">For Darrell</p>
                    <ul className="space-y-2 text-white/80 text-sm">
                      <li className="flex items-start gap-2">
                        <svg className="w-4 h-4 text-gold-400 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                        </svg>
                        <span>Consistent weekly freight</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <svg className="w-4 h-4 text-gold-400 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                        </svg>
                        <span>Higher per-mile rate (no broker cut)</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <svg className="w-4 h-4 text-gold-400 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                        </svg>
                        <span>Predictable home time</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <svg className="w-4 h-4 text-gold-400 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                        </svg>
                        <span>Minimal deadhead miles</span>
                      </li>
                    </ul>
                  </div>
                  <div>
                    <p className="text-gold-400 text-sm font-bold tracking-wide uppercase mb-3">For the Shipper</p>
                    <ul className="space-y-2 text-white/80 text-sm">
                      <li className="flex items-start gap-2">
                        <svg className="w-4 h-4 text-gold-400 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                        </svg>
                        <span>Reliable, vetted capacity</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <svg className="w-4 h-4 text-gold-400 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                        </svg>
                        <span>Lower total cost (no broker markup)</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <svg className="w-4 h-4 text-gold-400 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                        </svg>
                        <span>Consistent service quality</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <svg className="w-4 h-4 text-gold-400 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                        </svg>
                        <span>Direct communication with driver</span>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>

              {/* The Results */}
              <h2 className="font-display text-2xl text-navy-900 font-bold mt-12 mb-4">The Results</h2>

              <p>
                Within 90 days of partnering with GTC, Darrell's operation transformed:
              </p>

              <div className="grid md:grid-cols-3 gap-4 my-8">
                <div className="bg-white rounded-lg p-6 text-center shadow-sm">
                  <p className="font-display text-3xl font-bold text-gold-500 mb-1">+23%</p>
                  <p className="text-sm text-gray-600">Gross revenue increase</p>
                </div>
                <div className="bg-white rounded-lg p-6 text-center shadow-sm">
                  <p className="font-display text-3xl font-bold text-navy-900 mb-1">Zero</p>
                  <p className="text-sm text-gray-600">Days waiting for freight</p>
                </div>
                <div className="bg-white rounded-lg p-6 text-center shadow-sm">
                  <p className="font-display text-3xl font-bold text-navy-900 mb-1">2 Days</p>
                  <p className="text-sm text-gray-600">Home every weekend</p>
                </div>
              </div>

              <p>
                The 23% revenue increase came from two sources: higher per-mile rates without broker fees, and dramatically reduced deadhead miles. Darrell went from running 15-20% empty to less than 5%.
              </p>

              <p>
                But for Darrell, the numbers only tell part of the story.
              </p>

              <blockquote className="border-l-4 border-gold-500 pl-6 my-8 italic text-gray-700">
                "The money matters, obviously. But what really changed is I'm not stressed anymore. I know what next week looks like. I know what next month looks like. I can actually plan my life. That's worth more than the 23%."
                <footer className="text-sm text-gray-500 mt-2 not-italic">— Darrell Hawkins</footer>
              </blockquote>

              {/* What's Next */}
              <h2 className="font-display text-2xl text-navy-900 font-bold mt-12 mb-4">What's Next</h2>

              <p>
                Six months in, Darrell is considering adding a second truck. With consistent freight already secured through his shipper relationship, he has the foundation to grow—something that felt impossible when he was grinding on load boards.
              </p>

              <p>
                "I've got a cousin who drives. Good guy, reliable. We're talking about him coming on as my first driver. GTC said they can help find additional lanes when I'm ready."
              </p>

              <p>
                For owner-operators stuck in the load board cycle, Darrell's path offers a blueprint: find partners who can connect you directly with shippers, build relationships, and escape the race to the bottom.
              </p>

            </article>

            {/* Sidebar */}
            <aside className="space-y-8">
              
              {/* Company Profile */}
              <div className="bg-white rounded-lg p-6 shadow-sm">
                <h3 className="font-display text-lg font-bold text-navy-900 mb-4">Operator Profile</h3>
                <dl className="space-y-4 text-sm">
                  <div>
                    <dt className="text-gray-500 mb-1">Operator</dt>
                    <dd className="font-semibold text-navy-900">Darrell Hawkins</dd>
                  </div>
                  <div>
                    <dt className="text-gray-500 mb-1">Based In</dt>
                    <dd className="font-semibold text-navy-900">Tuscaloosa, Alabama</dd>
                  </div>
                  <div>
                    <dt className="text-gray-500 mb-1">Equipment</dt>
                    <dd className="font-semibold text-navy-900">2019 Freightliner Cascadia</dd>
                  </div>
                  <div>
                    <dt className="text-gray-500 mb-1">Operation Type</dt>
                    <dd className="font-semibold text-navy-900">OTR / Regional</dd>
                  </div>
                  <div>
                    <dt className="text-gray-500 mb-1">Years as O/O</dt>
                    <dd className="font-semibold text-navy-900">2 years</dd>
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
                    <span className="text-sm text-gray-700">Lane Acquisition</span>
                  </li>
                  <li className="flex items-center gap-3">
                    <svg className="w-5 h-5 text-gold-500 flex-shrink-0" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                    </svg>
                    <span className="text-sm text-gray-700">Direct Shipper Connection</span>
                  </li>
                  <li className="flex items-center gap-3">
                    <svg className="w-5 h-5 text-gold-500 flex-shrink-0" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                    </svg>
                    <span className="text-sm text-gray-700">Sales Representation</span>
                  </li>
                </ul>
              </div>

              {/* Before/After */}
              <div className="bg-white rounded-lg p-6 shadow-sm">
                <h3 className="font-display text-lg font-bold text-navy-900 mb-4">Before & After</h3>
                <div className="space-y-4 text-sm">
                  <div className="flex justify-between items-center pb-3 border-b border-gray-100">
                    <span className="text-gray-500">Freight source</span>
                    <div className="text-right">
                      <span className="text-red-500 line-through text-xs block">Load boards</span>
                      <span className="text-green-600 font-semibold">Direct shipper</span>
                    </div>
                  </div>
                  <div className="flex justify-between items-center pb-3 border-b border-gray-100">
                    <span className="text-gray-500">Weekly consistency</span>
                    <div className="text-right">
                      <span className="text-red-500 line-through text-xs block">Unpredictable</span>
                      <span className="text-green-600 font-semibold">Guaranteed</span>
                    </div>
                  </div>
                  <div className="flex justify-between items-center pb-3 border-b border-gray-100">
                    <span className="text-gray-500">Broker fees</span>
                    <div className="text-right">
                      <span className="text-red-500 line-through text-xs block">15-20%</span>
                      <span className="text-green-600 font-semibold">0%</span>
                    </div>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-500">Deadhead</span>
                    <div className="text-right">
                      <span className="text-red-500 line-through text-xs block">15-20%</span>
                      <span className="text-green-600 font-semibold">&lt;5%</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* CTA Card */}
              <div className="bg-navy-900 rounded-lg p-6 text-center">
                <h3 className="font-display text-xl font-bold text-white mb-3">
                  Ready to Ditch the Load Boards?
                </h3>
                <p className="text-white/70 text-sm mb-6">
                  Let GTC's sales team find dedicated lanes that match your operation.
                </p>
                <Link 
                  href="/book-call" 
                  className="inline-flex items-center justify-center w-full bg-gold-500 hover:bg-gold-400 text-navy-900 font-bold py-3 px-6 rounded transition-colors"
                >
                  Book Your Free Consultation
                </Link>
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
            <Link href="/case-studies/insurance-savings" className="group bg-cream-100 rounded-lg overflow-hidden hover:shadow-lg transition-shadow">
              <div className="h-[180px] bg-cover bg-center relative" style={{backgroundImage: "url('https://images.unsplash.com/photo-1590496793907-51d60f3d9c68?auto=format&fit=crop&w=800&q=80')"}}>
                <div className="absolute inset-0 bg-navy-900/40 group-hover:bg-navy-900/30 transition-colors" />
                <span className="absolute bottom-4 left-4 bg-gold-500 text-navy-900 py-1 px-2.5 text-[10px] font-bold tracking-[0.08em] uppercase rounded-sm">
                  Cost Reduction
                </span>
              </div>
              <div className="p-6">
                <h3 className="font-display text-lg font-bold text-navy-900 mb-2 group-hover:text-gold-600 transition-colors">
                  Regional Carrier Saves $47K on Insurance
                </h3>
                <p className="text-sm text-gray-600">
                  A 12-truck fleet discovered they were overpaying by thousands per truck. GTC's pooled buying power changed that.
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
            Your Freight Shouldn't Be a Gamble
          </h2>
          <p className="text-white/70 mb-8 max-w-[500px] mx-auto">
            Join the carriers who've built stable, profitable operations with direct shipper relationships.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link 
              href="/book-call" 
              className="inline-flex items-center justify-center bg-gold-500 hover:bg-gold-400 text-navy-900 font-bold py-3.5 px-8 rounded transition-colors"
            >
              Book a Free Consultation
            </Link>
            <Link 
              href="/services/revenue-growth" 
              className="inline-flex items-center justify-center border-2 border-white/30 hover:border-white hover:bg-white hover:text-navy-900 text-white font-bold py-3.5 px-8 rounded transition-colors"
            >
              Learn About Revenue Growth
            </Link>
          </div>
        </div>
      </section>
    </>
  )
}
