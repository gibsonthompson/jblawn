export type AreaData = {
  slug: string
  city: string
  metaTitle: string
  metaDescription: string
  headline: string
  intro: string
  cityDetails: string
  popularServices: { name: string; slug: string; why: string }[]
  neighborhoods: string[]
  distanceNote: string
  testimonial?: { text: string; name: string; location: string }
  faqs: { q: string; a: string }[]
}

export const AREAS_DATA: Record<string, AreaData> = {
  'oakland': {
    slug: 'oakland',
    city: 'Oakland',
    metaTitle: 'Lawn Care & Junk Removal in Oakland, CA | JB Lawn Care & Hauling',
    metaDescription: 'Professional lawn mowing, junk removal, landscaping, and yard cleanup in Oakland, CA. Locally based, fully insured. Same-day service available. Call 341-260-0331.',
    headline: 'Lawn Care & Junk Removal in Oakland, CA',
    intro: "Oakland is home base for JB Lawn Care & Hauling. We know the neighborhoods, the terrain, and the unique property challenges that come with Oakland's mix of hillside homes, Craftsman bungalows, Victorian flats, and modern developments. Whether you're in the hills dealing with overgrown brush and fire hazard clearance, or in the flatlands needing weekly mowing and a garage cleanout, we're the crew Oakland homeowners and property managers call first.",
    cityDetails: "Oakland properties come in every shape and size — from the steep, wooded lots in Montclair and the Oakland Hills to the compact urban yards in Temescal and Fruitvale. Hillside properties often need aggressive brush clearing and debris removal for fire safety compliance. Flatland homes benefit from regular mowing, edging, and seasonal cleanups to keep things looking sharp in neighborhoods where curb appeal matters. We also handle a high volume of junk hauling for Oakland landlords turning over rental units — furniture removal, appliance disposal, and full property cleanouts between tenants.",
    popularServices: [
      { name: 'Junk Removal & Hauling', slug: 'junk-hauling', why: 'Oakland landlords and homeowners constantly need fast junk removal for tenant turnovers, garage cleanouts, and property flips.' },
      { name: 'Lawn Mowing & Maintenance', slug: 'lawn-mowing', why: 'Weekly and bi-weekly mowing keeps Oakland yards looking clean in dense residential neighborhoods where every house is visible from the street.' },
      { name: 'Yard Cleanup & Debris', slug: 'yard-cleanup', why: 'Hillside properties accumulate brush and debris fast — fire season prep and storm cleanup are year-round needs.' },
    ],
    neighborhoods: ['Montclair', 'Temescal', 'Rockridge', 'Fruitvale', 'Lake Merritt', 'Jack London', 'Piedmont Ave', 'Grand Lake', 'Dimond', 'Laurel'],
    distanceNote: 'Based right here in the East Bay — Oakland is our home turf and where we do the majority of our work.',
    testimonial: { text: "JB and his crew completely transformed our backyard. It went from an overgrown mess to something we actually want to spend time in. Reliable, fair prices, and great communication throughout.", name: 'Maria R.', location: 'Oakland, CA' },
    faqs: [
      { q: 'How much does junk removal cost in Oakland?', a: 'Most Oakland junk removal jobs range from $150 to $500 depending on volume. Single items start around $75. We provide an exact quote before starting — no hidden fees.' },
      { q: 'Do you service the Oakland Hills?', a: 'Yes. We regularly work in Montclair, Skyline, and throughout the Oakland Hills. We have equipment suited for steep driveways and hillside access.' },
      { q: 'Can you help with Oakland fire hazard clearance?', a: 'Absolutely. We provide vegetation management and brush clearing to help Oakland Hills homeowners meet fire safety requirements. We remove all debris from the property.' },
    ],
  },

  'san-francisco': {
    slug: 'san-francisco',
    city: 'San Francisco',
    metaTitle: 'Junk Removal & Lawn Care in San Francisco, CA | JB Lawn Care & Hauling',
    metaDescription: 'Junk removal, yard cleanup, and lawn care services in San Francisco. We handle tight access, steep yards, and city hauling. Same-day available. Call 341-260-0331.',
    headline: 'Junk Removal & Yard Care in San Francisco, CA',
    intro: "San Francisco properties present unique challenges that most lawn care and hauling companies aren't equipped for — narrow side yards, steep hillside lots, limited truck access, and strict city disposal regulations. JB Lawn Care & Hauling serves San Francisco homeowners and property managers who need reliable junk removal, yard cleanups, and maintenance without the headaches of dealing with city logistics. We know which transfer stations to use, how to navigate tight streets, and how to get the job done when there's no driveway to pull into.",
    cityDetails: "San Francisco's compact lots mean yards are small but maintenance still matters — overgrown bushes, cluttered backyards, and accumulated junk are common in the Sunset, Richmond, and Excelsior districts. The city's Victorian and Edwardian homes often have narrow side passages that fill up with debris over years. Junk hauling is our most-requested service in SF, especially for estate cleanouts, tenant turnovers, and garage clearing in the Outer Sunset and Daly City border neighborhoods. We handle all city disposal requirements so you don't have to.",
    popularServices: [
      { name: 'Junk Removal & Hauling', slug: 'junk-hauling', why: 'SF\'s compact homes accumulate junk fast with nowhere to put it. Estate cleanouts and tenant turnovers drive heavy demand.' },
      { name: 'Yard Cleanup & Debris', slug: 'yard-cleanup', why: 'Neglected backyards in the Sunset and Richmond districts need periodic clearing — especially properties that haven\'t been maintained between tenants.' },
      { name: 'Bush & Hedge Trimming', slug: 'bush-trimming', why: 'Overgrown hedges are everywhere in SF\'s residential neighborhoods. Regular trimming keeps properties code-compliant and looking sharp.' },
    ],
    neighborhoods: ['Sunset', 'Richmond', 'Excelsior', 'Bayview', 'Noe Valley', 'Mission', 'Potrero Hill', 'Bernal Heights', 'Glen Park', 'Outer Sunset'],
    distanceNote: 'We make regular runs into San Francisco from our East Bay base — typically a 25-35 minute drive depending on the neighborhood.',
    faqs: [
      { q: 'Do you service all of San Francisco?', a: 'Yes. We cover every SF neighborhood from the Sunset to Bayview. We\'re familiar with the city\'s parking restrictions, narrow streets, and access challenges.' },
      { q: 'Can you haul junk from apartments without elevator access?', a: 'Yes. We handle walk-ups, narrow staircases, and tight hallways regularly. Our crew brings the equipment needed to move heavy items safely from upper floors.' },
      { q: 'Is there an extra charge for San Francisco jobs?', a: 'Our pricing is based on the scope of work, not your zip code. SF jobs are priced the same as East Bay jobs of equivalent size.' },
    ],
  },

  'berkeley': {
    slug: 'berkeley',
    city: 'Berkeley',
    metaTitle: 'Lawn Mowing & Junk Removal in Berkeley, CA | JB Lawn Care & Hauling',
    metaDescription: 'Weekly lawn mowing, junk hauling, landscaping, and yard cleanup in Berkeley, CA. Serving Berkeley Hills to Southside. Fully insured. Call 341-260-0331.',
    headline: 'Lawn Mowing & Property Care in Berkeley, CA',
    intro: "Berkeley homeowners take pride in their properties — from the tree-lined streets of North Berkeley to the classic California bungalows in the Elmwood district. But between the hills, the mature trees, and yards that seem to grow faster than anywhere else in the Bay Area, keeping up with maintenance takes real effort. JB Lawn Care provides reliable weekly mowing, seasonal cleanups, junk hauling, and landscaping for Berkeley residents who want their property to look great without spending every weekend doing yard work.",
    cityDetails: "Berkeley's lush vegetation means lawns grow aggressively from spring through fall, and mature trees drop massive amounts of leaves and branches that need regular clearing. The Berkeley Hills require brush management for fire safety — similar to Oakland Hills but with denser vegetation and narrower access roads. In the flatlands, properties around UC Berkeley and in South Berkeley often need cleanouts between student tenants. We serve a large number of Berkeley landlords who need fast turnaround on junk removal and yard cleanup between leases.",
    popularServices: [
      { name: 'Lawn Mowing & Maintenance', slug: 'lawn-mowing', why: 'Berkeley\'s fertile soil and mild climate mean grass grows fast. Weekly mowing is essential from March through October.' },
      { name: 'Yard Cleanup & Debris', slug: 'yard-cleanup', why: 'Mature trees and dense vegetation create constant debris — especially in fall when Berkeley\'s canopy drops.' },
      { name: 'Junk Removal & Hauling', slug: 'junk-hauling', why: 'Student housing turnovers and estate cleanouts keep junk removal demand high year-round in Berkeley.' },
    ],
    neighborhoods: ['North Berkeley', 'Elmwood', 'Claremont', 'Berkeley Hills', 'Southside', 'West Berkeley', 'Thousand Oaks', 'Lorin'],
    distanceNote: 'Berkeley is right next door — about 10-15 minutes from our base. We have crews in Berkeley multiple days every week.',
    testimonial: { text: "We've been using JB for weekly mowing for about six months now. They're always on time, the lawn looks perfect every single week, and I don't have to worry about a thing. Best decision I made.", name: 'Tanya N.', location: 'Berkeley, CA' },
    faqs: [
      { q: 'How often should I mow in Berkeley?', a: 'Berkeley lawns typically need weekly mowing from March through October due to the fertile soil and mild temperatures. Bi-weekly works for the cooler months.' },
      { q: 'Do you do brush clearing in the Berkeley Hills?', a: 'Yes. We provide fire hazard vegetation management for Berkeley Hills properties. We clear brush, remove dead wood, and haul everything away.' },
      { q: 'Can you clean up a rental property between tenants?', a: 'This is one of our most common Berkeley requests. We handle full cleanouts — junk removal, yard clearing, and property prep — usually within 24-48 hours.' },
    ],
  },

  'richmond': {
    slug: 'richmond',
    city: 'Richmond',
    metaTitle: 'Yard Cleanup & Junk Removal in Richmond, CA | JB Lawn Care & Hauling',
    metaDescription: 'Affordable yard cleanup, junk hauling, lawn mowing, and landscaping in Richmond, CA. Serving Point Richmond to Hilltop. Call 341-260-0331 for a free estimate.',
    headline: 'Yard Cleanup & Hauling Services in Richmond, CA',
    intro: "Richmond properties need consistent upkeep — and finding a reliable crew that actually shows up when they say they will can be a challenge. JB Lawn Care & Hauling provides dependable lawn mowing, yard cleanups, junk removal, and landscaping services throughout Richmond. From the waterfront homes in Point Richmond to the residential streets around Hilltop, we keep properties clean, maintained, and looking their best.",
    cityDetails: "Richmond's housing stock includes a wide mix — from older single-family homes in the Iron Triangle and Atchison Village to newer developments in Marina Bay and the Richmond Annex. Many properties have larger lots compared to Oakland or Berkeley, which means more lawn to maintain but also more potential for overgrowth if things get neglected. We handle a lot of full-property cleanouts in Richmond for investors and landlords rehabbing homes, as well as regular mowing and maintenance for homeowners who just want their yard kept up.",
    popularServices: [
      { name: 'Yard Cleanup & Debris', slug: 'yard-cleanup', why: 'Richmond\'s larger lots accumulate debris and overgrowth quickly, especially on vacant or neglected properties.' },
      { name: 'Junk Removal & Hauling', slug: 'junk-hauling', why: 'Property investors and landlords in Richmond frequently need full cleanouts before rehab or re-rental.' },
      { name: 'Lawn Mowing & Maintenance', slug: 'lawn-mowing', why: 'Larger Richmond lots mean more lawn area — regular mowing keeps properties looking maintained and code-compliant.' },
    ],
    neighborhoods: ['Point Richmond', 'Marina Bay', 'Hilltop', 'El Cerrito border', 'Richmond Annex', 'Iron Triangle', 'Atchison Village'],
    distanceNote: 'Richmond is about 20 minutes from our base. We service Richmond regularly throughout the week.',
    faqs: [
      { q: 'Do you work with property investors in Richmond?', a: 'Yes — a significant portion of our Richmond work is for investors and landlords who need fast property cleanouts, yard clearing, and ongoing maintenance between tenants.' },
      { q: 'Can you clean up a vacant lot in Richmond?', a: 'Absolutely. We clear overgrown vegetation, remove dumped junk and debris, and leave vacant lots clean and accessible. We work with both private owners and property management companies.' },
      { q: 'How quickly can you start a job in Richmond?', a: 'We can usually get to Richmond within 1-2 days for standard jobs. Same-day service is available for junk removal when booked before noon.' },
    ],
  },

  'hayward': {
    slug: 'hayward',
    city: 'Hayward',
    metaTitle: 'Lawn Care & Junk Hauling in Hayward, CA | JB Lawn Care & Hauling',
    metaDescription: 'Professional lawn mowing, junk removal, landscaping, and dump trailer rental in Hayward, CA. Serving Hayward Hills to downtown. Call 341-260-0331.',
    headline: 'Lawn Care & Junk Hauling in Hayward, CA',
    intro: "Hayward sits right in the heart of our service area, and we're on Hayward streets almost every day of the week. From the hillside homes above Cal State East Bay to the residential neighborhoods along Mission Blvd, JB Lawn Care provides lawn mowing, junk removal, landscaping, yard cleanups, and dump trailer rentals for Hayward homeowners and businesses. We know the area, we know the properties, and we get the job done right.",
    cityDetails: "Hayward's diverse housing stock — from 1950s ranch homes to newer tract developments — means maintenance needs vary block by block. The hillside properties above CSUEB deal with steep terrain, brush management, and erosion. The flatland neighborhoods along Tennyson and Industrial Pkwy have standard residential lots that benefit from weekly mowing and seasonal cleanups. Hayward is also our most popular market for dump trailer rentals — homeowners tackling garage cleanouts and small renovation projects love the convenience of having a trailer dropped in their driveway.",
    popularServices: [
      { name: 'Lawn Mowing & Maintenance', slug: 'lawn-mowing', why: 'Hayward\'s suburban lots are ideal for regular mowing service — most customers are on weekly or bi-weekly plans.' },
      { name: '10-Yard Dump Trailer Rental', slug: 'trailer-rental', why: 'Hayward homeowners doing DIY cleanouts and small projects make this our top market for trailer rentals.' },
      { name: 'Junk Removal & Hauling', slug: 'junk-hauling', why: 'Fast, same-day junk removal is consistently in demand across Hayward for both residential and commercial properties.' },
    ],
    neighborhoods: ['Hayward Hills', 'Downtown Hayward', 'Tennyson', 'South Hayward', 'Mission Blvd corridor', 'Jackson Triangle', 'Cherryland'],
    distanceNote: 'Hayward is central to our service area — we have crews working in Hayward nearly every day.',
    faqs: [
      { q: 'Can I rent a dump trailer in Hayward?', a: 'Yes — Hayward is our most popular area for trailer rentals. $150/day DIY or $400 full-service with drop-off, pickup, and disposal included. Call 341-260-0331 to reserve.' },
      { q: 'Do you offer weekly lawn mowing in Hayward?', a: 'Yes. Weekly and bi-weekly mowing plans are our most popular service in Hayward. We assign a consistent crew to your property so the work is done the same way every visit.' },
      { q: 'How fast can you do a junk removal in Hayward?', a: 'Same-day service is usually available in Hayward since we\'re in the area daily. Book before noon for same-day pickup.' },
    ],
  },

  'fremont': {
    slug: 'fremont',
    city: 'Fremont',
    metaTitle: 'Lawn Care & Landscaping in Fremont, CA | JB Lawn Care & Hauling',
    metaDescription: 'Professional lawn mowing, landscaping, junk removal, and yard cleanup in Fremont, CA. Serving Niles, Mission San Jose, Irvington & more. Call 341-260-0331.',
    headline: 'Lawn Care & Landscaping Services in Fremont, CA',
    intro: "Fremont is one of our fastest-growing service areas. The city's well-maintained residential neighborhoods, larger lot sizes, and active homeowner community make it an ideal market for professional lawn care and landscaping. JB Lawn Care serves Fremont homeowners across all five districts — from the historic charm of Niles to the hillside homes in Mission San Jose. We provide weekly mowing, full landscape installations, junk removal, and seasonal maintenance to keep Fremont properties looking their best.",
    cityDetails: "Fremont properties tend to be larger than East Bay cities closer to Oakland, with many homes sitting on quarter-acre lots or bigger. That means more lawn, more hedges, and more maintenance. The Mission Hills and Warm Springs areas feature newer construction with designed landscapes that need regular upkeep. Niles and Centerville have older homes with mature trees and established plantings that benefit from seasonal cleanup and rejuvenation. Sod installation and full landscape redesigns are popular in Fremont, where homeowners invest in their outdoor spaces.",
    popularServices: [
      { name: 'Lawn Mowing & Maintenance', slug: 'lawn-mowing', why: 'Fremont\'s larger lots mean more lawn area. Weekly service is the standard for homeowners who want their property looking sharp.' },
      { name: 'Landscaping & Sod Installation', slug: 'landscaping', why: 'Fremont homeowners invest in their outdoor spaces. Sod installation and landscape redesigns are consistently popular.' },
      { name: 'Bush & Hedge Trimming', slug: 'bush-trimming', why: 'Fremont\'s HOA-conscious neighborhoods demand clean, well-maintained hedges and shrubs.' },
    ],
    neighborhoods: ['Niles', 'Mission San Jose', 'Irvington', 'Centerville', 'Warm Springs', 'Mission Hills'],
    distanceNote: 'Fremont is about 25 minutes south of our base. We service Fremont multiple days per week with dedicated crews.',
    faqs: [
      { q: 'Do you service all Fremont districts?', a: 'Yes — we cover Niles, Mission San Jose, Irvington, Centerville, Warm Springs, and all surrounding areas. No part of Fremont is outside our service range.' },
      { q: 'Can you do landscaping for HOA properties in Fremont?', a: 'Yes. We work with individual homeowners in HOA communities to maintain landscapes that meet community standards. We can also bid on common area maintenance contracts.' },
      { q: 'What\'s the best time of year for sod installation in Fremont?', a: 'Spring and fall are ideal — the soil is warm enough for root establishment but temperatures aren\'t extreme. That said, Fremont\'s climate allows sod installation nearly year-round with proper watering.' },
    ],
  },

  'san-leandro': {
    slug: 'san-leandro',
    city: 'San Leandro',
    metaTitle: 'Junk Removal & Lawn Mowing in San Leandro, CA | JB Lawn Care & Hauling',
    metaDescription: 'Reliable junk removal, lawn mowing, and yard cleanup in San Leandro, CA. Locally based, fully insured. Free estimates. Call 341-260-0331.',
    headline: 'Junk Removal & Lawn Care in San Leandro, CA',
    intro: "San Leandro is right in our backyard — and that proximity means faster response times, same-day availability, and crews who know the neighborhoods inside and out. JB Lawn Care provides regular mowing, junk hauling, yard cleanups, and landscaping for San Leandro homeowners and property managers. We service everything from the historic Estudillo Estates area to the residential streets along East 14th and the Marina district.",
    cityDetails: "San Leandro's post-war housing stock — primarily ranch-style homes built in the 1940s-60s — comes with established trees, aging fences, and yards that need consistent attention. Many homeowners are dealing with deferred maintenance: overgrown side yards, accumulated junk in garages, and landscaping that hasn't been updated in decades. We do a lot of full-property refreshes in San Leandro — cleaning out the yard, hauling away junk, and installing fresh sod or mulch to bring properties back to life.",
    popularServices: [
      { name: 'Junk Removal & Hauling', slug: 'junk-hauling', why: 'San Leandro homeowners frequently clear out garages, sheds, and backyards that have accumulated years of junk.' },
      { name: 'Lawn Mowing & Maintenance', slug: 'lawn-mowing', why: 'Regular mowing keeps San Leandro\'s mid-century homes looking well-maintained.' },
      { name: 'Mulching & Bed Maintenance', slug: 'mulching', why: 'Fresh mulch and clean beds are a fast, affordable way to update the look of older San Leandro landscaping.' },
    ],
    neighborhoods: ['Estudillo Estates', 'Washington Manor', 'Marina', 'Broadmoor', 'Bay-O-Vista', 'Downtown San Leandro'],
    distanceNote: 'San Leandro borders our home base — response times are typically under 30 minutes, and same-day service is almost always available.',
    faqs: [
      { q: 'How fast can you get to San Leandro?', a: 'San Leandro is our closest service area. We can typically be on-site within a few hours for same-day jobs, and next-day for scheduled work.' },
      { q: 'Do you offer recurring mowing in San Leandro?', a: 'Yes. Most San Leandro clients are on weekly mowing plans. We assign a consistent crew and day so you always know when to expect us.' },
      { q: 'Can you clean out a whole house in San Leandro?', a: 'Yes. We handle full estate cleanouts, pre-sale clearing, and whole-property junk removal. Multiple truckloads in a single day if needed.' },
    ],
  },

  'concord': {
    slug: 'concord',
    city: 'Concord',
    metaTitle: 'Lawn Mowing & Yard Cleanup in Concord, CA | JB Lawn Care & Hauling',
    metaDescription: 'Professional lawn mowing, yard cleanup, and junk removal in Concord, CA. Serving all Concord neighborhoods. Free estimates. Call 341-260-0331.',
    headline: 'Lawn Mowing & Yard Services in Concord, CA',
    intro: "Concord's hot, dry summers and mild winters create specific lawn care challenges that generic services often miss. JB Lawn Care provides tailored mowing schedules, seasonal cleanups, junk removal, and landscaping for Concord homeowners who want their property maintained by a crew that understands inland East Bay conditions. We service every Concord neighborhood from Dana Estates to the Crossings.",
    cityDetails: "Concord's warmer inland climate means lawns brown out faster in summer without proper mowing height and frequency, and the dry conditions can make yards look neglected quickly if maintenance lapses. Many Concord homes sit on good-sized suburban lots with both front and back yards that need regular attention. The area also has a strong investor and landlord market, with frequent demand for property cleanouts and yard clearing between tenants.",
    popularServices: [
      { name: 'Lawn Mowing & Maintenance', slug: 'lawn-mowing', why: 'Concord\'s hot summers require proper mowing height and frequency to prevent lawn burnout. We adjust schedules seasonally.' },
      { name: 'Yard Cleanup & Debris', slug: 'yard-cleanup', why: 'Dry-season leaf drop and storm debris accumulate fast in Concord\'s suburban neighborhoods.' },
      { name: 'Landscaping & Sod Installation', slug: 'landscaping', why: 'Many Concord homeowners upgrade to drought-tolerant landscaping or fresh sod to combat brown, patchy lawns.' },
    ],
    neighborhoods: ['Dana Estates', 'Ellis Lake', 'Crossings', 'Sun Terrace', 'Montevideo', 'Concord BART area', 'Todos Santos'],
    distanceNote: 'Concord is about 30 minutes from our base via Highway 24 or 680. We service Concord on dedicated days each week.',
    faqs: [
      { q: 'Do you adjust mowing for Concord\'s hotter climate?', a: 'Yes. We raise cutting height during summer to reduce stress on lawns in Concord\'s warmer temperatures. We also recommend appropriate watering schedules for the inland climate.' },
      { q: 'Can you do a full yard cleanup in Concord?', a: 'Absolutely. We handle overgrown lots, storm cleanup, and seasonal clearing throughout Concord. All debris is hauled away.' },
      { q: 'Do you serve Concord regularly?', a: 'Yes — we have dedicated service days for Concord and the greater Contra Costa area. Scheduling is consistent and reliable.' },
    ],
  },

  'walnut-creek': {
    slug: 'walnut-creek',
    city: 'Walnut Creek',
    metaTitle: 'Landscaping & Lawn Care in Walnut Creek, CA | JB Lawn Care & Hauling',
    metaDescription: 'Professional landscaping, lawn mowing, and property maintenance in Walnut Creek, CA. Trusted by homeowners in Rossmoor, Northgate & more. Call 341-260-0331.',
    headline: 'Landscaping & Lawn Maintenance in Walnut Creek, CA',
    intro: "Walnut Creek homeowners expect a higher standard of property maintenance — and that's exactly what we deliver. JB Lawn Care provides professional landscaping, precision lawn mowing, hedge trimming, and seasonal maintenance for Walnut Creek's well-kept residential neighborhoods. From the manicured communities of Rossmoor to the larger estates in Northgate, we keep properties looking refined and well-cared-for.",
    cityDetails: "Walnut Creek's upscale residential areas demand consistently high-quality lawn and landscape maintenance. Properties here tend to have established, designed landscapes with decorative plantings, defined beds, and clean edges. Homeowners expect precision — not just a quick mow. We provide detail-oriented service that includes crisp edging, proper trimming angles, and thorough cleanup after every visit. Rossmoor's active adult community is a significant part of our Walnut Creek business, where residents want reliable, professional crews they can trust on their property.",
    popularServices: [
      { name: 'Landscaping & Sod Installation', slug: 'landscaping', why: 'Walnut Creek homeowners invest in landscape quality. Design updates, sod replacement, and seasonal plantings are common requests.' },
      { name: 'Lawn Mowing & Maintenance', slug: 'lawn-mowing', why: 'Precision mowing with clean edges is the expectation in Walnut Creek\'s maintained neighborhoods.' },
      { name: 'Bush & Hedge Trimming', slug: 'bush-trimming', why: 'Well-shaped hedges and shrubs are essential to Walnut Creek\'s polished residential aesthetic.' },
    ],
    neighborhoods: ['Rossmoor', 'Northgate', 'Saranap', 'Parkmead', 'Indian Valley', 'Waldon area', 'Downtown WC'],
    distanceNote: 'Walnut Creek is about 25 minutes via Highway 24. We service the area on dedicated days to minimize transit and maximize efficiency.',
    faqs: [
      { q: 'Do you service Rossmoor in Walnut Creek?', a: 'Yes. We work with individual homeowners inside the Rossmoor community. We\'re familiar with the community\'s access procedures and maintain properties to Rossmoor\'s standards.' },
      { q: 'What makes your service right for Walnut Creek properties?', a: 'We provide detail-oriented maintenance — precision edging, proper trimming cuts, thorough cleanup. Walnut Creek properties deserve more than a quick mow-and-go, and that\'s what we deliver.' },
      { q: 'Can you redesign my Walnut Creek landscape?', a: 'Yes. We do full landscape redesigns including sod, plantings, edging, hardscape, and irrigation. We start with an on-site consultation to understand your vision.' },
    ],
  },

  'pleasanton': {
    slug: 'pleasanton',
    city: 'Pleasanton',
    metaTitle: 'Lawn Care & Property Maintenance in Pleasanton, CA | JB Lawn Care & Hauling',
    metaDescription: 'Lawn mowing, landscaping, mulching, and yard maintenance in Pleasanton, CA. Serving Ruby Hill, Vintage Hills & more. Free estimates. Call 341-260-0331.',
    headline: 'Lawn Care & Property Maintenance in Pleasanton, CA',
    intro: "Pleasanton's tree-lined streets and well-maintained neighborhoods set a high bar for property appearance. JB Lawn Care provides weekly mowing, landscaping, mulching, and seasonal maintenance for Pleasanton homeowners who want their property kept to community standards without spending every weekend doing yard work. We service homes across all Pleasanton neighborhoods, from Ruby Hill to Vintage Hills.",
    cityDetails: "Pleasanton properties typically feature larger lots with both front and backyard landscaping, mature trees, and defined garden beds. The warm Tri-Valley climate means lawns need consistent attention from early spring through late fall, and the summer heat requires proper mowing height management to prevent burnout. Many Pleasanton neighborhoods have HOA standards that require regular maintenance. We work with homeowners to meet those standards efficiently and affordably.",
    popularServices: [
      { name: 'Lawn Mowing & Maintenance', slug: 'lawn-mowing', why: 'Pleasanton\'s larger lots and HOA standards make regular professional mowing essential.' },
      { name: 'Mulching & Bed Maintenance', slug: 'mulching', why: 'Well-mulched beds are a hallmark of Pleasanton\'s maintained residential aesthetic.' },
      { name: 'Landscaping & Sod Installation', slug: 'landscaping', why: 'Pleasanton homeowners regularly invest in landscape upgrades and seasonal planting refreshes.' },
    ],
    neighborhoods: ['Ruby Hill', 'Vintage Hills', 'Val Vista', 'Pleasanton Heights', 'Birdland', 'Downtown Pleasanton'],
    distanceNote: 'Pleasanton is about 30 minutes via 580/680. We service the Tri-Valley area on dedicated days.',
    faqs: [
      { q: 'Do you meet HOA maintenance standards in Pleasanton?', a: 'Yes. We\'re familiar with common Pleasanton HOA requirements and maintain properties to meet or exceed those standards.' },
      { q: 'How do you handle Pleasanton\'s summer heat?', a: 'We adjust mowing height during peak summer to protect lawns from heat stress. We also recommend watering schedules appropriate for the Tri-Valley climate.' },
      { q: 'Can you mulch all my beds in one visit?', a: 'Yes. We buy mulch in bulk and can do an entire Pleasanton property in a single visit — beds weeded, edges cut, mulch laid, and walkways cleaned.' },
    ],
  },

  'dublin': {
    slug: 'dublin',
    city: 'Dublin',
    metaTitle: 'Lawn Mowing & Junk Removal in Dublin, CA | JB Lawn Care & Hauling',
    metaDescription: 'Professional lawn care, junk removal, and yard maintenance in Dublin, CA. Serving all Dublin neighborhoods. Free estimates. Call 341-260-0331.',
    headline: 'Lawn Care & Hauling Services in Dublin, CA',
    intro: "Dublin is one of the Tri-Valley's fastest-growing cities, with new developments popping up alongside established neighborhoods. JB Lawn Care serves Dublin homeowners who need reliable lawn mowing, junk removal, and yard maintenance — whether you're in a brand-new East Dublin home or an established West Dublin neighborhood. We keep Dublin properties clean and well-maintained year-round.",
    cityDetails: "Dublin's newer developments in the eastern part of the city feature designed landscapes that need regular professional maintenance to stay looking as good as the day they were installed. Established neighborhoods in West Dublin have mature trees, larger lots, and yards that benefit from seasonal cleanups and ongoing mowing. The Tri-Valley heat means lawns need consistent care during summer, and Dublin's growth means there's always demand for junk removal from moves, renovations, and cleanouts.",
    popularServices: [
      { name: 'Lawn Mowing & Maintenance', slug: 'lawn-mowing', why: 'Dublin\'s mix of new and established homes all benefit from regular professional mowing.' },
      { name: 'Junk Removal & Hauling', slug: 'junk-hauling', why: 'Dublin\'s growth means constant demand from moves, renovations, and cleanouts.' },
      { name: 'Yard Cleanup & Debris', slug: 'yard-cleanup', why: 'Seasonal cleanups keep Dublin properties looking sharp, especially in neighborhoods with mature trees.' },
    ],
    neighborhoods: ['East Dublin', 'West Dublin', 'Dublin Ranch', 'Positano', 'Fallon Village', 'Downtown Dublin'],
    distanceNote: 'Dublin is about 30 minutes via 580. We service Dublin on the same days as Pleasanton for route efficiency.',
    faqs: [
      { q: 'Do you service new construction homes in Dublin?', a: 'Yes. We maintain landscapes in Dublin\'s newer developments, keeping builder-installed sod, plants, and beds in top condition.' },
      { q: 'Can you do junk removal for a Dublin move?', a: 'Absolutely. Moving cleanouts are one of our most common Dublin requests. We haul away everything you don\'t want to take with you.' },
      { q: 'Do you offer same-day service in Dublin?', a: 'Same-day is available on our Dublin service days. Call 341-260-0331 before noon to check availability.' },
    ],
  },

  'daly-city': {
    slug: 'daly-city',
    city: 'Daly City',
    metaTitle: 'Junk Removal & Yard Cleanup in Daly City, CA | JB Lawn Care & Hauling',
    metaDescription: 'Affordable junk removal, yard cleanup, and lawn care in Daly City, CA. Serving Westlake, Serramonte & surrounding areas. Call 341-260-0331.',
    headline: 'Junk Removal & Yard Care in Daly City, CA',
    intro: "Daly City's dense residential neighborhoods and challenging terrain make property maintenance harder than it looks. Compact lots, foggy conditions, and hills mean yards need consistent attention to avoid looking overgrown fast. JB Lawn Care provides practical, no-nonsense lawn care, junk removal, and yard cleanup services for Daly City homeowners who need reliable help keeping their properties in shape.",
    cityDetails: "Daly City's row house neighborhoods in Westlake and the residential areas around Serramonte have small but visible front yards that look terrible when neglected. The city's coastal fog means different grass growth patterns than inland — lawns stay greener longer but can get soggy and moss-prone without proper care. We handle regular mowing, trimming, and junk removal for Daly City homeowners, with a focus on practical, affordable service for the area's working families.",
    popularServices: [
      { name: 'Junk Removal & Hauling', slug: 'junk-hauling', why: 'Daly City\'s compact homes and garages fill up fast. Regular cleanouts keep things manageable.' },
      { name: 'Lawn Mowing & Maintenance', slug: 'lawn-mowing', why: 'Small front yards are highly visible in Daly City — regular mowing makes a big difference in how the whole block looks.' },
      { name: 'Bush & Hedge Trimming', slug: 'bush-trimming', why: 'Overgrown hedges block views and crowd walkways in Daly City\'s tight residential layouts.' },
    ],
    neighborhoods: ['Westlake', 'Serramonte', 'Broadmoor Village', 'Hillside', 'Top of the Hill', 'St. Francis Heights'],
    distanceNote: 'Daly City is about 30 minutes from our base. We service Daly City on the same runs as San Francisco jobs.',
    faqs: [
      { q: 'Do you account for Daly City\'s foggy climate?', a: 'Yes. Daly City\'s coastal fog creates different growing conditions. We adjust mowing frequency and height based on actual lawn growth, not a fixed calendar.' },
      { q: 'Can you fit a trailer in Daly City\'s narrow streets?', a: 'We use appropriately sized equipment for Daly City\'s tighter streets and driveways. Our crew is experienced with compact access situations.' },
      { q: 'Is Daly City too far from your service area?', a: 'Not at all. We service Daly City regularly, typically on the same days as our San Francisco runs.' },
    ],
  },
}

export const AREA_SLUGS = Object.keys(AREAS_DATA)
