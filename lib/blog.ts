import { supabase } from './supabase'

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

// Fallback data when Supabase isn't connected
const FALLBACK_POSTS: BlogPost[] = [
  {
    slug: 'how-often-should-you-mow-your-lawn-bay-area',
    title: 'How Often Should You Mow Your Lawn in the Bay Area?',
    meta_description: 'Bay Area lawns grow year-round thanks to the mild climate. Here\'s a seasonal mowing schedule that keeps your lawn healthy without overdoing it.',
    excerpt: 'Bay Area grass grows year-round thanks to the mild climate. Here\'s a seasonal mowing schedule that keeps your lawn healthy without overdoing it.',
    content: '<p>Content loading — connect Supabase to see full blog posts.</p>',
    category: 'lawn-care',
    author: 'JB Lawn Care',
    published_at: new Date(Date.now() - 5 * 86400000).toISOString(),
    featured_image: null,
    word_count: 850,
    keyword_target: 'how often mow lawn Bay Area',
  },
  {
    slug: 'junk-removal-vs-dumpster-rental-cost-comparison',
    title: 'Junk Removal vs. Dumpster Rental: Which Is Cheaper in 2026?',
    meta_description: 'When you factor in rental fees, permits, disposal costs, and your own labor, hiring a junk removal crew is usually the better deal.',
    excerpt: 'When you factor in rental fees, permits, disposal costs, and your own labor, hiring a junk removal crew is usually the better deal. Here\'s the math.',
    content: '<p>Content loading — connect Supabase to see full blog posts.</p>',
    category: 'junk-removal',
    author: 'JB Lawn Care',
    published_at: new Date(Date.now() - 3 * 86400000).toISOString(),
    featured_image: null,
    word_count: 780,
    keyword_target: 'junk removal vs dumpster rental cost',
  },
  {
    slug: 'spring-yard-cleanup-checklist-bay-area',
    title: 'Spring Yard Cleanup Checklist for Bay Area Homeowners',
    meta_description: 'The complete list of everything your yard needs after winter — from debris clearing and aeration to mulching and pre-emergent weed control.',
    excerpt: 'The complete list of everything your yard needs after winter — from debris clearing and aeration to mulching and pre-emergent weed control.',
    content: '<p>Content loading — connect Supabase to see full blog posts.</p>',
    category: 'seasonal',
    author: 'JB Lawn Care',
    published_at: new Date(Date.now() - 86400000).toISOString(),
    featured_image: null,
    word_count: 720,
    keyword_target: 'spring yard cleanup checklist Bay Area',
  },
]

export async function getAllPosts(): Promise<BlogPost[]> {
  if (!supabase) return FALLBACK_POSTS

  try {
    const { data, error } = await supabase
      .from('jb_blog_posts')
      .select('slug, title, meta_description, excerpt, content, category, author, published_at, featured_image, word_count, keyword_target')
      .eq('status', 'published')
      .order('published_at', { ascending: false })

    if (error || !data || data.length === 0) return FALLBACK_POSTS
    return data as BlogPost[]
  } catch {
    return FALLBACK_POSTS
  }
}

export async function getPostBySlug(slug: string): Promise<BlogPost | null> {
  if (!supabase) return FALLBACK_POSTS.find(p => p.slug === slug) || null

  try {
    const { data, error } = await supabase
      .from('jb_blog_posts')
      .select('slug, title, meta_description, excerpt, content, category, author, published_at, featured_image, word_count, keyword_target')
      .eq('slug', slug)
      .eq('status', 'published')
      .single()

    if (error || !data) return FALLBACK_POSTS.find(p => p.slug === slug) || null
    return data as BlogPost
  } catch {
    return FALLBACK_POSTS.find(p => p.slug === slug) || null
  }
}

export async function getPostSlugs(): Promise<string[]> {
  if (!supabase) return FALLBACK_POSTS.map(p => p.slug)

  try {
    const { data, error } = await supabase
      .from('jb_blog_posts')
      .select('slug')
      .eq('status', 'published')

    if (error || !data) return FALLBACK_POSTS.map(p => p.slug)
    return data.map((p: { slug: string }) => p.slug)
  } catch {
    return FALLBACK_POSTS.map(p => p.slug)
  }
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
