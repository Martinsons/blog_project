import { createServerSupabaseClient } from '@/lib/supabase/server'

export default async function sitemap() {
  const supabase = createServerSupabaseClient()
  const baseUrl = 'https://veselibatev.lv'

  // Get all published blog posts
  const { data: posts } = await supabase
    .from('posts')
    .select('slug, updated_at')
    .eq('published', true)

  const blogPages = posts?.map((post) => ({
    url: `${baseUrl}/blog/${post.slug}`,
    lastModified: post.updated_at,
    changeFrequency: 'weekly',
    priority: 0.8,
  })) || []

  // Static pages
  const staticPages = [
    {
      url: baseUrl,
      lastModified: new Date().toISOString(),
      changeFrequency: 'daily',
      priority: 1,
    },
    {
      url: `${baseUrl}/blog`,
      lastModified: new Date().toISOString(),
      changeFrequency: 'daily',
      priority: 0.9,
    },
    {
      url: `${baseUrl}/kontakti`,
      lastModified: new Date().toISOString(),
      changeFrequency: 'monthly',
      priority: 0.7,
    },
  ]

  return [...staticPages, ...blogPages]
}
