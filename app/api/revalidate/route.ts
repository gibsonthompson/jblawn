import { NextRequest, NextResponse } from 'next/server'
import { revalidatePath } from 'next/cache'

/**
 * POST /api/revalidate
 * Called by blog-farm after publishing a post to trigger instant ISR refresh.
 * Body: { secret: string, slug: string }
 */
export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { secret, slug } = body

    if (secret !== process.env.REVALIDATION_SECRET) {
      return NextResponse.json({ error: 'Invalid secret' }, { status: 401 })
    }

    // Revalidate the specific blog post page
    if (slug) {
      revalidatePath(`/blog/${slug}`)
    }

    // Always revalidate the blog index so new posts appear
    revalidatePath('/blog')

    // Revalidate homepage in case it shows recent posts
    revalidatePath('/')

    return NextResponse.json({
      revalidated: true,
      slug: slug || null,
      paths: ['/blog', `/blog/${slug}`, '/'],
      timestamp: new Date().toISOString(),
    })
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : 'Unknown error'
    return NextResponse.json({ error: message }, { status: 500 })
  }
}