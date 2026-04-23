export type ServiceData = {
  slug: string
  title: string
  metaTitle: string
  metaDescription: string
  heroKeyword: string
  headline: string
  subheadline: string
  intro: string
  whatsIncluded: string[]
  howItWorks: { step: number; title: string; desc: string }[]
  pricingContext: string
  faqs: { q: string; a: string }[]
  beforeAfterPhoto?: { before: string; after: string; caption: string }
  relatedServices: string[]
  relatedAreas: string[]
}

export const SERVICES_DATA: Record<string, ServiceData> = {
  'lawn-mowing': {
    slug: 'lawn-mowing',
    title: 'Lawn Mowing & Maintenance',
    metaTitle: 'Lawn Mowing Service in the Bay Area | Weekly & Bi-Weekly | JB Lawn Care',
    metaDescription: 'Professional lawn mowing and maintenance for residential and commercial properties across Oakland, Hayward, Fremont, and the East Bay. Weekly, bi-weekly, or one-time service. Call 341-260-0331.',
    heroKeyword: 'lawn mowing service Bay Area',
    headline: 'Professional Lawn Mowing Across the Bay Area',
    subheadline: 'Weekly, bi-weekly, or one-time mowing — your lawn stays sharp without you touching a mower.',
    intro: "A well-maintained lawn is the first thing people notice about a property. But between work, family, and everything else, keeping up with mowing every week is one of those tasks that's easy to let slide. That's where we come in. JB Lawn Care provides reliable, professional lawn mowing and maintenance services for homes and commercial properties across Oakland, Berkeley, Hayward, Fremont, and the entire East Bay. We show up on schedule, every time — so your property always looks its best without you having to think about it.",
    whatsIncluded: [
      'Full mowing of front and back yards',
      'Edging along driveways, walkways, and curbs',
      'String trimming around fences, trees, and obstacles',
      'Blowing of all clippings from hardscape surfaces',
      'Visual inspection for bare spots, pest damage, or drainage issues',
      'Consistent crew so your property gets the same attention every visit',
    ],
    howItWorks: [
      { step: 1, title: 'Get a Free Estimate', desc: 'Call us or book online. We\'ll assess your property size and give you a clear, flat-rate price with no hidden fees.' },
      { step: 2, title: 'Pick Your Schedule', desc: 'Choose weekly, bi-weekly, or one-time service. Most Bay Area lawns do best with weekly mowing from March through October and bi-weekly the rest of the year.' },
      { step: 3, title: 'We Handle the Rest', desc: 'Our crew shows up on your scheduled day, does the work, and leaves your property looking clean. You don\'t even need to be home.' },
    ],
    pricingContext: 'Most residential lawns in the Bay Area run between $40 and $85 per visit depending on lot size, terrain, and frequency. Bi-weekly and weekly plans get better rates than one-time cuts. We quote flat rates — the price we give you is the price you pay.',
    faqs: [
      { q: 'How often should I mow my lawn in the Bay Area?', a: 'Most Bay Area lawns need weekly mowing from March through October when growth is strongest. During the cooler months (November through February), bi-weekly is usually sufficient. We\'ll recommend the right schedule based on your grass type and property.' },
      { q: 'Do I need to be home when you mow?', a: 'No. As long as we have access to your yard (unlocked gate, no aggressive dogs), we\'ll take care of everything. Many of our clients are at work when we service their properties.' },
      { q: 'What if it rains on my mowing day?', a: 'We monitor weather closely. If conditions are too wet to mow properly, we\'ll reschedule within 24-48 hours and let you know in advance. We never mow in conditions that would damage your lawn.' },
    ],
    beforeAfterPhoto: { before: '/images/gallery/overgrown-backyard-before.jpg', after: '/images/gallery/overgrown-backyard-after.jpg', caption: 'Overgrown backyard restored to a clean, maintained lawn' },
    relatedServices: ['landscaping', 'bush-trimming', 'mulching'],
    relatedAreas: ['oakland', 'berkeley', 'hayward', 'fremont'],
  },

  'landscaping': {
    slug: 'landscaping',
    title: 'Landscaping & Sod Installation',
    metaTitle: 'Landscaping & Sod Installation in the Bay Area | JB Lawn Care & Hauling',
    metaDescription: 'Full landscape transformations including sod installation, flower beds, hardscaping, and grading for Bay Area homes. Serving Oakland to Fremont. Free estimates — call 341-260-0331.',
    heroKeyword: 'landscaping sod installation Bay Area',
    headline: 'Landscaping & Sod Installation for Bay Area Properties',
    subheadline: 'From bare dirt to a yard worth showing off — we design, build, and plant it right.',
    intro: "Whether you just bought a home with a neglected yard, you're prepping a property for sale, or you're finally ready to turn that patchy brown lawn into something green — JB Lawn Care handles complete landscape transformations across the Bay Area. We do sod installation, flower bed design, edging, grading, drainage fixes, and everything in between. No job is too big or too small. We've turned bare lots into lush lawns and transformed overgrown properties into clean, modern outdoor spaces that homeowners are actually proud of.",
    whatsIncluded: [
      'Sod removal and new sod installation (measure, prep, lay, roll)',
      'Soil grading and leveling for proper drainage',
      'Flower bed design, planting, and edging',
      'Decorative rock and bark installation',
      'Retaining wall and border construction',
      'Irrigation assessment and basic repair',
      'Full debris removal and cleanup after every job',
    ],
    howItWorks: [
      { step: 1, title: 'On-Site Consultation', desc: 'We visit your property, discuss your vision, assess the soil and drainage, and measure the space. You\'ll get a detailed estimate within 24 hours.' },
      { step: 2, title: 'Design & Prep', desc: 'We plan the layout, source materials, and prep the site — removing old sod, grading soil, and fixing any drainage issues before anything new goes in.' },
      { step: 3, title: 'Install & Finish', desc: 'Our crew installs sod, plants, edging, and hardscape elements. We walk you through watering and maintenance so your new landscape thrives.' },
    ],
    pricingContext: 'Landscaping projects vary widely based on scope. Sod installation typically runs $1.50–$3.00 per square foot installed (including soil prep). A full front yard transformation for a typical Bay Area home ranges from $2,000 to $6,000. We provide detailed line-item estimates so you know exactly what you\'re paying for.',
    faqs: [
      { q: 'How long does sod take to establish in the Bay Area?', a: 'New sod typically roots within 2-3 weeks with proper watering. The Bay Area\'s mild climate is ideal for sod installation nearly year-round, though spring and fall are the best seasons for fastest establishment.' },
      { q: 'Can you landscape a yard with poor drainage?', a: 'Yes. Drainage issues are one of the most common problems we fix during landscape projects. We grade the soil to direct water away from foundations and install French drains or catch basins when needed.' },
      { q: 'Do you remove old landscaping before installing new?', a: 'Absolutely. Full tear-out of old sod, dead plants, rocks, and debris is included in our landscaping projects. We start with a clean slate so the new installation looks right and lasts.' },
    ],
    beforeAfterPhoto: { before: '/images/gallery/front-yard-sod-before.jpg', after: '/images/gallery/front-yard-sod-after.jpg', caption: 'Complete front yard sod installation — bare dirt to lush lawn' },
    relatedServices: ['lawn-mowing', 'mulching', 'yard-cleanup'],
    relatedAreas: ['oakland', 'hayward', 'fremont', 'walnut-creek'],
  },

  'junk-hauling': {
    slug: 'junk-hauling',
    title: 'Junk Removal & Hauling',
    metaTitle: 'Junk Removal & Hauling in the Bay Area | Same-Day Service | JB Lawn Care',
    metaDescription: 'Fast, affordable junk removal and hauling across Oakland, Berkeley, Hayward, and the East Bay. Furniture, appliances, debris, yard waste — we haul it all. Same-day service available. Call 341-260-0331.',
    heroKeyword: 'junk removal Bay Area',
    headline: 'Fast, Affordable Junk Removal Across the Bay Area',
    subheadline: 'Furniture, appliances, yard waste, construction debris — we load it, haul it, and dispose of it. Same day.',
    intro: "That pile of junk in your garage, backyard, or driveway isn't going to move itself. And renting a dumpster, loading it yourself, and dealing with permits and disposal fees costs more than most people realize — both in money and in lost weekends. JB Lawn Care & Hauling provides full-service junk removal across Oakland, Berkeley, Hayward, Fremont, and the entire East Bay. We show up with a crew and a truck, load everything, and haul it away. You point, we carry. Most jobs are done in under two hours, and we offer same-day service when you book before noon.",
    whatsIncluded: [
      'All labor — our crew loads everything, you don\'t lift a finger',
      'Truck and trailer for hauling (up to full loads)',
      'Responsible disposal, recycling, and donation when possible',
      'Furniture removal (couches, mattresses, desks, dressers, tables)',
      'Appliance removal (fridges, washers, dryers, water heaters)',
      'Construction debris (drywall, lumber, flooring, tile)',
      'Yard waste (branches, brush, dirt, old fencing)',
      'Hot tub and spa removal',
      'Garage, attic, and basement cleanouts',
      'Estate cleanouts and pre-sale property clearing',
    ],
    howItWorks: [
      { step: 1, title: 'Book Online or Call', desc: 'Tell us what you need hauled and we\'ll give you an estimate over the phone or in person. Same-day service available if you book before noon.' },
      { step: 2, title: 'We Show Up & Load', desc: 'Our crew arrives on time with a truck and trailer. We do all the heavy lifting — you just show us what goes.' },
      { step: 3, title: 'Haul & Dispose', desc: 'We haul everything to the appropriate facility. Items in good condition are donated. You get a clean space and your time back.' },
    ],
    pricingContext: 'Most junk removal jobs in the Bay Area range from $150 to $500 depending on volume. A single piece of furniture starts around $75. A full truck load runs $350-$500. We always quote before we start — no surprises. In most cases, we\'re cheaper than renting a dumpster when you factor in rental fees, permits, disposal costs, and your own labor.',
    faqs: [
      { q: 'How much does junk removal cost in the Bay Area?', a: 'Most jobs range from $150 to $500 depending on volume. Single items start around $75. Full truck loads (equivalent to about 8 pickup truck loads) run $350-$500. We provide a firm quote before starting — the price we give you is the price you pay.' },
      { q: 'Is junk removal cheaper than renting a dumpster?', a: 'Usually, yes. A dumpster rental in the Bay Area runs $400-$600 for a week, plus you need a permit if it goes on the street ($100+), and you still have to load it yourself. Our crew handles everything — loading, hauling, and disposal — often for less than the dumpster alone.' },
      { q: 'Do you offer same-day junk removal?', a: 'Yes. We offer same-day junk hauling for most Bay Area locations when you book before noon. Call 341-260-0331 to check availability for today.' },
      { q: 'What items can\'t you haul?', a: 'We can\'t haul hazardous materials (paint, chemicals, oil, asbestos), medical waste, or anything requiring special environmental permits. Everything else — furniture, appliances, electronics, construction debris, yard waste — we handle it all.' },
    ],
    beforeAfterPhoto: { before: '/images/gallery/garage-cleanout-before.jpg', after: '/images/gallery/garage-cleanout-after.jpg', caption: 'Full garage cleanout — junk pile to clean driveway in one afternoon' },
    relatedServices: ['yard-cleanup', 'trailer-rental', 'landscaping'],
    relatedAreas: ['oakland', 'berkeley', 'san-francisco', 'hayward', 'fremont'],
  },

  'yard-cleanup': {
    slug: 'yard-cleanup',
    title: 'Yard Cleanup & Debris Removal',
    metaTitle: 'Yard Cleanup & Debris Removal in the Bay Area | JB Lawn Care & Hauling',
    metaDescription: 'Professional yard cleanup and debris removal for overgrown lots, storm damage, and pre-sale property prep. Serving Oakland, Hayward, Fremont, and the East Bay. Call 341-260-0331.',
    heroKeyword: 'yard cleanup service Bay Area',
    headline: 'Yard Cleanup & Debris Removal for Bay Area Properties',
    subheadline: 'Overgrown lot, storm damage, or years of neglect — we clear it all and haul it away.',
    intro: "Some yards just need more than a mowing. Maybe the property has been vacant for months and the weeds are waist-high. Maybe a storm brought down branches across the whole backyard. Maybe you're buying or selling a home and the outdoor space needs serious work before anyone can use it. JB Lawn Care provides full yard cleanup services across Oakland, Hayward, Fremont, Berkeley, and the East Bay. We clear brush, pull weeds, remove debris, cut back overgrowth, and haul everything away — leaving you with a clean, usable outdoor space.",
    whatsIncluded: [
      'Overgrown vegetation removal (weeds, brush, vines)',
      'Branch and fallen tree limb removal',
      'Leaf and organic debris clearing',
      'Fence line and property line clearing',
      'Side yard and alley cleanouts',
      'Storm damage cleanup',
      'Pre-sale and move-in/move-out property prep',
      'All debris hauled away — nothing left behind',
    ],
    howItWorks: [
      { step: 1, title: 'Assess the Property', desc: 'We visit or review photos to understand the scope. Overgrown lot? Storm damage? Moving prep? We\'ll quote based on what actually needs to happen.' },
      { step: 2, title: 'Clear & Clean', desc: 'Our crew clears all vegetation, debris, and junk. We cut, rake, bag, and load everything into our truck and trailer.' },
      { step: 3, title: 'Haul & Finish', desc: 'All debris is removed from the property. We leave the yard clean, accessible, and ready for whatever comes next — mowing, landscaping, or just enjoying the space.' },
    ],
    pricingContext: 'Yard cleanup jobs typically range from $200 to $800 depending on lot size and severity of overgrowth. Small side-yard clearing starts around $150. Full-property cleanouts with heavy brush removal and hauling can run $500-$1,200. We always provide a quote before starting.',
    faqs: [
      { q: 'How long does a yard cleanup take?', a: 'Most residential yard cleanups take 2-4 hours for a standard lot. Heavily overgrown properties or large lots may require a full day. We\'ll give you a time estimate along with your quote.' },
      { q: 'Can you clean up a yard before I sell my house?', a: 'Absolutely — pre-sale cleanups are one of our most common requests. A clean yard dramatically improves curb appeal and can directly impact your sale price. We can usually complete the work within a few days of your call.' },
      { q: 'Do you haul away the debris after cleanup?', a: 'Yes. Full debris removal is always included. We don\'t leave piles on your curb or in your driveway. Everything goes into our truck and trailer and gets disposed of properly.' },
    ],
    beforeAfterPhoto: { before: '/images/gallery/side-yard-before.jpg', after: '/images/gallery/side-yard-after.jpg', caption: 'Overgrown side yard cleared and cleaned' },
    relatedServices: ['junk-hauling', 'lawn-mowing', 'landscaping'],
    relatedAreas: ['oakland', 'hayward', 'richmond', 'san-leandro'],
  },

  'bush-trimming': {
    slug: 'bush-trimming',
    title: 'Bush & Hedge Trimming',
    metaTitle: 'Bush & Hedge Trimming Service in the Bay Area | JB Lawn Care & Hauling',
    metaDescription: 'Professional bush and hedge trimming for Bay Area homes and businesses. Crisp, clean lines that boost curb appeal. Serving Oakland to Fremont. Call 341-260-0331.',
    heroKeyword: 'hedge trimming service Bay Area',
    headline: 'Bush & Hedge Trimming Across the Bay Area',
    subheadline: 'Overgrown bushes drag down your whole property. We shape them up fast.',
    intro: "Overgrown hedges and unruly bushes make even a nice property look neglected. They block windows, crowd walkways, and kill curb appeal. JB Lawn Care provides professional bush and hedge trimming across Oakland, Berkeley, Hayward, Fremont, and the East Bay. We shape shrubs to clean, crisp lines — or take them out entirely if that's what the property needs. Most trimming jobs take just a couple of hours, and we haul away all the clippings so you're not left with piles of branches on your lawn.",
    whatsIncluded: [
      'Hedge shaping and height reduction',
      'Shrub and bush trimming to clean lines',
      'Dead wood and diseased branch removal',
      'Overgrown bush cutting and reshaping',
      'Foundation planting maintenance',
      'Complete clipping cleanup and haul-away',
    ],
    howItWorks: [
      { step: 1, title: 'Quick Assessment', desc: 'Tell us what needs trimming — send photos or we\'ll swing by. We quote flat rates based on the number and size of bushes.' },
      { step: 2, title: 'Trim & Shape', desc: 'Our crew trims everything to clean, even lines. We work with the natural shape of each plant while keeping things tight and intentional.' },
      { step: 3, title: 'Clean Up', desc: 'All clippings and debris are collected and hauled away. Your property looks finished, not like someone just trimmed bushes.' },
    ],
    pricingContext: 'Bush and hedge trimming typically runs $100 to $350 depending on the number and size of shrubs. A few small bushes start around $75. A full property with 10+ large hedges can run $250-$400. Clipping removal is always included.',
    faqs: [
      { q: 'How often should hedges be trimmed?', a: 'Most hedges in the Bay Area need trimming 2-4 times per year. Fast-growing varieties like privet or pittosporum may need quarterly attention. We can set you up on a recurring schedule so they never get out of hand.' },
      { q: 'Can you remove bushes entirely?', a: 'Yes. If a bush is dead, diseased, or just in the way, we can cut it down and remove the stump. We can also clear overgrown foundation plantings and replace them with something cleaner.' },
      { q: 'Do you haul away the clippings?', a: 'Always. We never leave piles of branches or clippings behind. Everything gets loaded into our truck and disposed of properly.' },
    ],
    beforeAfterPhoto: { before: '/images/gallery/bush-removal-before.jpg', after: '/images/gallery/bush-removal-after.jpg', caption: 'Overgrown sidewalk bush removed and cleared' },
    relatedServices: ['lawn-mowing', 'mulching', 'yard-cleanup'],
    relatedAreas: ['oakland', 'berkeley', 'san-leandro', 'fremont'],
  },

  'mulching': {
    slug: 'mulching',
    title: 'Mulching & Bed Maintenance',
    metaTitle: 'Mulching & Flower Bed Maintenance in the Bay Area | JB Lawn Care & Hauling',
    metaDescription: 'Fresh mulch, clean edges, and weed-free beds for Bay Area homes. Protect your plants and boost curb appeal with professional mulching service. Call 341-260-0331.',
    heroKeyword: 'mulching service Bay Area',
    headline: 'Mulching & Bed Maintenance for Bay Area Properties',
    subheadline: 'Fresh mulch and clean edges make any yard look professionally maintained — instantly.',
    intro: "Mulching is one of the fastest, most affordable ways to make your entire property look polished. It suppresses weeds, retains moisture, regulates soil temperature, and gives garden beds that clean, finished look that ties everything together. JB Lawn Care provides mulching and bed maintenance services across Oakland, Hayward, Fremont, Berkeley, and the East Bay. We pull the weeds, define the edges, and lay fresh mulch — so your beds look sharp and your plants stay healthy year-round.",
    whatsIncluded: [
      'Weed removal from all beds and borders',
      'Bed edge defining and re-cutting',
      'Old mulch removal when necessary',
      'Fresh mulch delivery and installation (bark, wood chips, or rubber)',
      'Even spreading to proper depth (2-3 inches)',
      'Cleanup of all walkways and hardscape after installation',
    ],
    howItWorks: [
      { step: 1, title: 'Measure & Quote', desc: 'We measure your beds and calculate material needs. You pick your mulch type and we give you a flat-rate price including materials, delivery, and labor.' },
      { step: 2, title: 'Prep the Beds', desc: 'We pull weeds, remove old mulch if needed, and redefine edges with a clean, sharp cut line.' },
      { step: 3, title: 'Mulch & Finish', desc: 'Fresh mulch is spread evenly to the proper depth. All walkways and driveways are blown clean. Your beds look brand new.' },
    ],
    pricingContext: 'Mulching typically runs $150 to $400 for a standard residential property, depending on total bed area and mulch type. This includes materials, delivery, and installation. Bark mulch is the most popular option in the Bay Area. We buy in bulk and pass the savings on.',
    faqs: [
      { q: 'How often should I mulch my flower beds?', a: 'Most beds benefit from fresh mulch once a year, typically in spring. If your mulch breaks down quickly or you have a lot of weed pressure, twice a year (spring and fall) keeps things looking clean.' },
      { q: 'What type of mulch is best for Bay Area gardens?', a: 'Bark mulch and wood chips are the most popular and effective for Bay Area properties. They retain moisture well in our dry summers and break down slowly. We can also do rubber mulch for low-maintenance areas.' },
      { q: 'Do you remove weeds before mulching?', a: 'Always. Laying mulch over existing weeds just creates problems. We pull all weeds and clear the beds before any new mulch goes down.' },
    ],
    beforeAfterPhoto: { before: '/images/gallery/yard-cleanup-before.jpg', after: '/images/gallery/yard-cleanup-after.jpg', caption: 'Overgrown beds cleaned and fresh landscape installed' },
    relatedServices: ['landscaping', 'lawn-mowing', 'bush-trimming'],
    relatedAreas: ['oakland', 'walnut-creek', 'pleasanton', 'dublin'],
  },

  'trailer-rental': {
    slug: 'trailer-rental',
    title: '10-Yard Dump Trailer Rental',
    metaTitle: 'Dump Trailer Rental Bay Area | 10-Yard | $150/Day or $400 Full Service | JB Lawn Care',
    metaDescription: 'Rent a 10-yard dump trailer in the Bay Area. $150/day DIY or $400 full-service with drop-off, pickup, and 1 ton disposal included. Hayward to Vallejo. Call 341-260-0331.',
    heroKeyword: 'dump trailer rental Bay Area',
    headline: '10-Yard Dump Trailer Rental in the Bay Area',
    subheadline: 'DIY for $150/day, or go full-service at $400 — we drop it, you fill it, we haul it.',
    intro: "Not every job needs a full junk removal crew. Sometimes you just need a trailer to load at your own pace — a garage cleanout over the weekend, a small demolition project, or clearing out a rental property between tenants. JB Lawn Care offers 10-yard dump trailer rentals across the Bay Area, from Hayward to Vallejo and everywhere in between. Our heavy-duty trailer handles junk, yard debris, construction waste, old furniture, and more. Choose daily rental at $150/day and haul it yourself, or go full-service at $400 and we handle drop-off, pickup, and disposal.",
    whatsIncluded: [
      'Heavy-duty 10-yard dump trailer (equivalent to about 4 pickup truck loads)',
      'Drop-off at your property on your schedule',
      'Keep for up to 7 days on the full-service plan',
      'Full-service: 1 ton of disposal fees included',
      'Pickup when you\'re done — just call us',
      'Serving Hayward, Oakland, Fremont, and north to Vallejo',
    ],
    howItWorks: [
      { step: 1, title: 'Reserve Your Trailer', desc: 'Call or book online to reserve a date. We\'ll confirm availability and schedule delivery to your property.' },
      { step: 2, title: 'Fill It Up', desc: 'Load the trailer at your own pace. The 10-yard capacity handles most residential cleanout projects in a single load.' },
      { step: 3, title: 'We Pick Up & Dispose', desc: 'Call us when you\'re done. We pick up the loaded trailer and handle all disposal. Full-service plan includes up to 1 ton of dump fees.' },
    ],
    pricingContext: 'Two options: $150/day for DIY daily rental (you haul it to the dump yourself), or $400 flat for full-service (we drop off the trailer, pick it up when you\'re done, and dispose of up to 1 ton of material — keep it up to 7 days). Additional disposal beyond 1 ton is billed at cost. The full-service option is by far the most popular.',
    faqs: [
      { q: 'How big is a 10-yard dump trailer?', a: 'A 10-yard trailer holds roughly the equivalent of 4 full pickup truck loads. It\'s large enough for most garage cleanouts, small renovation debris, or yard waste from a standard residential lot.' },
      { q: 'What can I put in the dump trailer?', a: 'Household junk, furniture, appliances, construction debris (wood, drywall, concrete in small amounts), yard waste, old fencing, carpet, and general refuse. No hazardous materials, tires, or paint.' },
      { q: 'How far in advance do I need to book?', a: 'We recommend booking 2-3 days ahead, especially on weekends. Same-day or next-day delivery is sometimes available — call 341-260-0331 to check.' },
    ],
    beforeAfterPhoto: { before: '/images/gallery/backyard-junk-before.jpg', after: '/images/gallery/backyard-junk-after.jpg', caption: 'Backyard cleanout using our dump trailer — before and after' },
    relatedServices: ['junk-hauling', 'yard-cleanup', 'landscaping'],
    relatedAreas: ['hayward', 'oakland', 'fremont', 'richmond'],
  },
}

export const SERVICE_SLUGS = Object.keys(SERVICES_DATA)

export const SERVICE_NAMES: Record<string, string> = Object.fromEntries(
  Object.entries(SERVICES_DATA).map(([slug, data]) => [slug, data.title])
)
