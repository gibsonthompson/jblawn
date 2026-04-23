import { Metadata } from 'next'
import { getAllPosts } from '../../../lib/blog'
import BlogListClient from './BlogListClient'

export const revalidate = 3600 // ISR: revalidate every hour for new blog-farm posts

export const metadata: Metadata = {
  title: 'Blog | Lawn Care Tips & Junk Removal Guides | JB Lawn Care & Hauling',
  description: 'Practical lawn care advice, junk removal tips, and seasonal guides for Bay Area homeowners. Expert content from JB Lawn Care & Hauling.',
}

export default async function BlogPage() {
  const posts = await getAllPosts()
  return <BlogListClient posts={posts} />
}
