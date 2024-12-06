import { getPublishedPosts } from '@/lib/supabase/posts'
import BlogPostCard from '@/components/BlogPostCard'

export const revalidate = 3600 // Revalidate every hour

export default async function BlogPage() {
  const posts = await getPublishedPosts()

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold mb-8">Blog Posts</h1>
      <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
        {posts.map((post) => (
          <BlogPostCard key={post.id} post={post} />
        ))}
      </div>
    </div>
  )
}
