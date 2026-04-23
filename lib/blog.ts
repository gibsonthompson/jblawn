// Static blog posts - no Supabase dependency
// Will be replaced with blog-farm Supabase client when wired up

export type BlogPost = {
  slug: string
  title: string
  meta_description: string
  excerpt: string
  content: string
  category: string
  author: string
  published_at: string
  featured_image: string | null
  word_count: number | null
  keyword_target: string | null
}

const POSTS: BlogPost[] = [
  {
    slug: 'how-often-should-you-mow-your-lawn-bay-area',
    title: 'How Often Should You Mow Your Lawn in the Bay Area?',
    meta_description: "Bay Area lawns grow year-round thanks to the mild climate. Here's a seasonal mowing schedule that keeps your lawn healthy without overdoing it.",
    excerpt: "Bay Area grass grows year-round thanks to the mild climate. Here's a seasonal mowing schedule that keeps your lawn healthy without overdoing it.",
    category: 'lawn-care',
    author: 'JB Lawn Care',
    published_at: '2026-04-17T12:00:00Z',
    featured_image: null,
    word_count: 850,
    keyword_target: 'how often mow lawn Bay Area',
    content: `<h2>The Bay Area Is Different</h2>
<p>If you've moved to the Bay Area from somewhere with real winters, you might have noticed something: the grass never really stops growing. The mild temperatures across Oakland, Hayward, Fremont, and the East Bay mean your lawn stays active for most of the year — which is great for curb appeal, but it also means you can't just ignore mowing from November to March like you might in other parts of the country.</p>

<h2>The Seasonal Mowing Schedule That Works</h2>
<p>Based on years of maintaining lawns across the East Bay, here's what we recommend for most residential properties:</p>

<h3>March through October: Weekly Mowing</h3>
<p>This is peak growth season. Bay Area lawns — whether you're growing fescue, ryegrass, or a Bermuda blend — put on the most growth during these warmer months. Weekly mowing keeps the grass at the right height (typically 2.5 to 3.5 inches) without removing more than one-third of the blade at a time, which is critical for lawn health.</p>
<p>Skipping a week during peak season means you'll need to cut more aggressively the next time, which stresses the grass and leaves unsightly clumps of clippings on the surface.</p>

<h3>November through February: Bi-Weekly Mowing</h3>
<p>Growth slows but doesn't stop. The cooler temperatures and shorter days reduce growth rate by about half, so bi-weekly mowing is usually sufficient to keep things tidy. Some microclimates in the East Bay — particularly in sheltered areas of Oakland, Berkeley, and Walnut Creek — may still need weekly service through November.</p>

<h2>What About During a Drought?</h2>
<p>During water restrictions, lawns may go dormant and brown out. In this case, mowing frequency drops naturally. However, don't stop mowing entirely — even dormant lawns benefit from occasional cutting to keep weeds in check and maintain a uniform appearance. Once watering resumes, the lawn will green up faster if it's been maintained.</p>

<h2>Common Mistakes Bay Area Homeowners Make</h2>
<p>The biggest mistake we see is cutting too short. Homeowners think a close cut means they can wait longer between mowings, but it actually damages the grass, exposes soil to sun (which encourages weeds), and weakens the root system. Keep your mowing height at 3 inches or above, especially during summer.</p>
<p>The second most common mistake is inconsistency. Lawns respond best to regular, predictable cutting schedules. If you can't commit to weekly mowing yourself, a professional service that shows up on the same day every week will produce dramatically better results than sporadic DIY mowing.</p>

<h2>The Bottom Line</h2>
<p>For most Bay Area homeowners: mow weekly from March through October, bi-weekly from November through February, and never cut more than one-third of the blade at a time. Follow that schedule and your lawn will stay thick, green, and healthy year-round — which is one of the biggest advantages of living in this climate.</p>
<p>If you'd rather not think about it at all, <strong>JB Lawn Care</strong> offers weekly and bi-weekly mowing plans across Oakland, Hayward, Fremont, Berkeley, and the entire East Bay. <a href="/services/lawn-mowing">Learn more about our lawn mowing service</a> or call <a href="tel:3412600331">341-260-0331</a> for a free estimate.</p>`,
  },
  {
    slug: 'junk-removal-vs-dumpster-rental-cost-comparison',
    title: 'Junk Removal vs. Dumpster Rental: Which Is Cheaper in 2026?',
    meta_description: 'When you factor in rental fees, permits, disposal costs, and your own labor, hiring a junk removal crew is usually the better deal.',
    excerpt: "When you factor in rental fees, permits, disposal costs, and your own labor, hiring a junk removal crew is usually the better deal. Here's the math.",
    category: 'junk-removal',
    author: 'JB Lawn Care',
    published_at: '2026-04-19T12:00:00Z',
    featured_image: null,
    word_count: 780,
    keyword_target: 'junk removal vs dumpster rental cost',
    content: `<h2>The Real Cost of Renting a Dumpster</h2>
<p>At first glance, renting a dumpster seems like the obvious move for a big cleanout. You get a big container, fill it at your own pace, and it gets hauled away. Simple, right? But once you add up all the costs, the math often doesn't work in your favor — especially in the Bay Area.</p>

<h3>Typical Dumpster Rental Costs in the Bay Area (2026)</h3>
<p>A 10-yard dumpster rental in Oakland, Hayward, or the East Bay typically runs <strong>$400 to $600 for a 7-day rental</strong>. That base price usually includes a weight limit (often 1-2 tons). Go over that limit and you're paying $50-$100 per additional ton in overage fees.</p>
<p>But that's just the rental. Here's what most people forget to factor in:</p>
<ul>
<li><strong>Street permit:</strong> If the dumpster goes on a public street (and in most Bay Area neighborhoods, there's nowhere else to put it), you need a city permit. In Oakland, that's $100+. San Francisco is even higher.</li>
<li><strong>Your labor:</strong> You have to load it yourself. A garage cleanout or yard waste removal is heavy, awkward work. Budget an entire weekend — or two.</li>
<li><strong>Disposal restrictions:</strong> Many dumpster companies won't accept mattresses, appliances, electronics, or tires. Those items need separate disposal, which means additional trips and fees.</li>
<li><strong>Overage risk:</strong> Most people underestimate how much their junk weighs. A single couch, a few boxes of books, and some construction debris can push you over the weight limit fast.</li>
</ul>
<p><strong>Realistic total cost for a dumpster rental: $500 to $800+</strong> when you factor in permits, potential overages, and the disposal of restricted items.</p>

<h2>What Junk Removal Actually Costs</h2>
<p>A professional junk removal crew — like JB Lawn Care &amp; Hauling — shows up with a truck and trailer, loads everything for you, and hauls it away. You don't lift a finger, you don't need a permit, and you don't spend your weekend doing manual labor.</p>
<p>Most junk removal jobs in the Bay Area run <strong>$150 to $500</strong> depending on volume. A full truck load (roughly equivalent to what fits in a 10-yard dumpster) typically costs <strong>$350 to $500</strong>.</p>

<h2>The Side-by-Side Comparison</h2>
<p>For a typical garage cleanout or property cleanout equivalent to one dumpster load:</p>
<ul>
<li><strong>Dumpster rental:</strong> $400-600 rental + $100 permit + your entire weekend of labor + potential overage fees = <strong>$500-800+</strong></li>
<li><strong>Junk removal crew:</strong> $350-500 all-in, done in 1-3 hours, you don't touch anything = <strong>$350-500</strong></li>
</ul>

<h2>When a Dumpster Does Make Sense</h2>
<p>Dumpsters are the better choice for ongoing projects — like a multi-week renovation where debris accumulates over time and you need a container sitting on-site. If you're generating waste over days or weeks, having a dumpster available makes more sense than scheduling multiple junk removal pickups.</p>
<p>For one-time cleanouts, moves, estate clearing, and most residential projects? A junk removal crew is faster, often cheaper, and dramatically less work on your end.</p>

<h2>A Third Option: Dump Trailer Rental</h2>
<p>JB Lawn Care also offers a 10-yard dump trailer rental at <strong>$150/day for DIY</strong> or <strong>$400 for full-service</strong> (drop-off, pickup, and disposal included). It's a middle ground between doing everything yourself and hiring a full crew. <a href="/services/trailer-rental">Learn more about our trailer rental options</a>.</p>

<p>Need junk removed? <a href="tel:3412600331">Call 341-260-0331</a> for a free estimate or <a href="/services/junk-hauling">learn more about our junk removal service</a>.</p>`,
  },
  {
    slug: 'spring-yard-cleanup-checklist-bay-area',
    title: 'Spring Yard Cleanup Checklist for Bay Area Homeowners',
    meta_description: "The complete list of everything your yard needs after winter — from debris clearing and aeration to mulching and pre-emergent weed control.",
    excerpt: 'The complete list of everything your yard needs after winter — from debris clearing and aeration to mulching and pre-emergent weed control.',
    category: 'seasonal',
    author: 'JB Lawn Care',
    published_at: '2026-04-21T12:00:00Z',
    featured_image: null,
    word_count: 720,
    keyword_target: 'spring yard cleanup checklist Bay Area',
    content: `<h2>Why Spring Cleanup Matters in the Bay Area</h2>
<p>The Bay Area doesn't get the dramatic winter-to-spring transition that other parts of the country experience, but that doesn't mean your yard doesn't need attention when the weather warms up. Winter rains bring debris, encourage weed growth, and leave lawns compacted. A proper spring cleanup sets the foundation for a healthy, attractive yard for the rest of the year.</p>
<p>Here's the complete checklist we follow when doing spring cleanups for our clients across Oakland, Hayward, Fremont, and the East Bay.</p>

<h2>The Checklist</h2>

<h3>1. Clear All Debris</h3>
<p>Walk the entire property and remove fallen branches, leaves, accumulated trash, and any storm debris from the winter months. Pay special attention to side yards, fence lines, and areas behind sheds or garages where debris tends to pile up unnoticed.</p>

<h3>2. Rake and Dethatch the Lawn</h3>
<p>Winter foot traffic and rain compact the soil surface. Raking removes dead grass (thatch) that prevents water and nutrients from reaching the roots. If thatch is more than half an inch thick, consider a power dethatch.</p>

<h3>3. Edge All Borders</h3>
<p>Re-cut clean edges along driveways, walkways, garden beds, and curbs. Winter growth blurs these lines, and re-establishing crisp edges immediately makes the whole property look more maintained.</p>

<h3>4. Weed All Beds and Borders</h3>
<p>Pull weeds before they flower and seed. Bay Area winters are mild enough that weeds grow year-round, and by spring they've had months to establish. Pull them now or they'll dominate your beds by summer.</p>

<h3>5. Prune Shrubs and Hedges</h3>
<p>Late winter and early spring is the best time to prune most Bay Area shrubs. Remove dead wood, shape for the coming growth season, and open up the interior of dense shrubs for better air circulation.</p>

<h3>6. Apply Pre-Emergent Weed Control</h3>
<p>Before summer weeds germinate, apply a pre-emergent herbicide to lawns and beds. Timing is critical — in the Bay Area, this is typically mid-February to mid-March. It's too late if weeds are already growing.</p>

<h3>7. Aerate the Lawn</h3>
<p>Core aeration breaks up compacted soil and allows water, air, and fertilizer to reach the root zone. Spring is one of the two best times to aerate in the Bay Area (fall is the other). This is especially important for clay soils common throughout the East Bay.</p>

<h3>8. Overseed Bare or Thin Spots</h3>
<p>After aerating, overseed any thin or bare patches. Choose a grass seed blend appropriate for your sun/shade conditions. Spring overseeding establishes before summer heat arrives.</p>

<h3>9. Refresh Mulch</h3>
<p>Add 2-3 inches of fresh mulch to all garden beds. This suppresses weeds, retains moisture during the dry months ahead, and gives beds a clean, finished look. Remove old, decomposed mulch if it's matted or moldy.</p>

<h3>10. Check Irrigation</h3>
<p>Turn on your irrigation system and check every zone for broken heads, leaks, and coverage gaps. Winter freezes (yes, they happen occasionally in the East Bay) can crack pipes and fittings. Fix issues now before you need the system daily in summer.</p>

<h2>Don't Want to Do It Yourself?</h2>
<p>JB Lawn Care handles complete spring cleanups for Bay Area homeowners. We tackle every item on this list in a single visit — clearing debris, edging, weeding, trimming, and mulching — and haul everything away. <a href="/services/yard-cleanup">Learn more about our yard cleanup service</a> or call <a href="tel:3412600331">341-260-0331</a> to schedule your spring cleanup today.</p>`,
  },
]

export async function getAllPosts(): Promise<BlogPost[]> {
  return POSTS
}

export async function getPostBySlug(slug: string): Promise<BlogPost | null> {
  return POSTS.find(p => p.slug === slug) || null
}

export async function getPostSlugs(): Promise<string[]> {
  return POSTS.map(p => p.slug)
}

export const CATEGORY_LABELS: Record<string, string> = {
  'lawn-care': 'Lawn Care',
  'junk-removal': 'Junk Removal',
  'landscaping': 'Landscaping',
  'seasonal': 'Seasonal',
  'yard-cleanup': 'Yard Cleanup',
  'tips': 'Tips',
  'general': 'General',
}