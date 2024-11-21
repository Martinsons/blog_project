import Link from 'next/link'
import Image from 'next/image'
import { getPublishedPosts } from '@/lib/supabase/posts'
import { formatDate } from '@/lib/utils'

export const revalidate = 3600 // Revalidate every hour

export default async function BlogPage() {
  const posts = await getPublishedPosts()

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold mb-8">Blog Posts</h1>
      <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
        {posts.map((post) => (
          <article
            key={post.id}
            className="bg-white rounded-lg shadow hover:shadow-md transition-shadow overflow-hidden"
          >
            {post.featured_image_url ? (
              <div className="relative w-full h-48">
                <Image
                  src={post.featured_image_url}
                  alt={post.title}
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                />
              </div>
            ) : (
              <div className="w-full h-48 bg-gray-100 flex items-center justify-center">
                <p className="text-gray-500">No image available</p>
              </div>
            )}
            
            <div className="p-6">
              <Link href={`/blog/${post.slug}`}>
                <h2 className="text-2xl font-semibold mb-2 hover:text-blue-600">
                  {post.title}
                </h2>
              </Link>
              <div className="text-sm text-gray-500">
                {formatDate(post.created_at)}
              </div>
              <p className="text-gray-700">
                {post.content?.substring(0, 150).trim() + '...' || post.title}
              </p>
              <Link
                href={`/blog/${post.slug}`}
                className="inline-block mt-4 text-blue-600 hover:text-blue-800"
              >
                Read more →
              </Link>
            </div>
          </article>
        ))}
      </div>
    </div>
  )
}
