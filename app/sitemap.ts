import { MetadataRoute } from 'next'
import { AREA_SLUGS } from '../lib/areas-data'
import { SERVICE_SLUGS } from '../lib/services-data'
import { getPostSlugs } from '../lib/blog'

const BASE_URL = 'https://jblawncareandhualing.com'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const now = new Date()

  // Static pages
  const staticRoutes: MetadataRoute.Sitemap = [
    { url: BASE_URL, lastModified: now, changeFrequency: 'weekly', priority: 1.0 },
    { url: `${BASE_URL}/about`, lastModified: now, changeFrequency: 'monthly', priority: 0.7 },
    { url: `${BASE_URL}/gallery`, lastModified: now, changeFrequency: 'monthly', priority: 0.6 },
    { url: `${BASE_URL}/blog`, lastModified: now, changeFrequency: 'weekly', priority: 0.8 },
  ]

  // Service pages (7)
  const serviceRoutes: MetadataRoute.Sitemap = SERVICE_SLUGS.map((slug) => ({
    url: `${BASE_URL}/services/${slug}`,
    lastModified: now,
    changeFrequency: 'monthly',
    priority: 0.9,
  }))

  // Area pages (17)
  const areaRoutes: MetadataRoute.Sitemap = AREA_SLUGS.map((slug) => ({
    url: `${BASE_URL}/areas/${slug}`,
    lastModified: now,
    changeFrequency: 'monthly',
    priority: 0.8,
  }))

  // Blog posts (dynamic, falls back to seed posts if blog farm is offline)
  let blogRoutes: MetadataRoute.Sitemap = []
  try {
    const slugs = await getPostSlugs()
    blogRoutes = slugs.map((slug) => ({
      url: `${BASE_URL}/blog/${slug}`,
      lastModified: now,
      changeFrequency: 'monthly',
      priority: 0.6,
    }))
  } catch {
    // If blog fetch fails at build time, sitemap still generates with everything else
    blogRoutes = []
  }

  return [...staticRoutes, ...serviceRoutes, ...areaRoutes, ...blogRoutes]
}