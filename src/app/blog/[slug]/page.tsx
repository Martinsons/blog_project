import { getPostBySlug, getPopularPosts } from '@/lib/supabase/posts'
import { notFound } from 'next/navigation'
import Image from 'next/image'
import { formatDate } from '@/lib/utils'
import Comments from '@/components/Comments'
import PopularPosts from '@/components/PopularPosts'

// Force revalidation of this page
export const revalidate = 0

export default async function BlogPost({
  params,
}: {
  params: { slug: string }
}) {
  const post = await getPostBySlug(params.slug)

  if (!post) {
    notFound()
  }

  // Fetch popular posts, excluding the current post
  const popularPosts = await getPopularPosts(post.id)

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex flex-col lg:flex-row gap-8">
        {/* Main Content */}
        <article className="flex-grow max-w-4xl">
          <h1 className="text-4xl font-bold mb-4">{post.title}</h1>
          <div className="text-gray-600 mb-8">
            {formatDate(post.created_at)}
          </div>
          
          {post.image_url && (
            <div className="relative w-full h-96 mb-8 rounded-lg overflow-hidden">
              <Image
                src={post.image_url}
                alt={post.title}
                fill
                className="object-cover"
                priority
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              />
              {/* Author information */}
              <div className="absolute bottom-0 left-0 right-0 bg-black bg-opacity-50 text-white p-4">
                <div className="flex items-center">
                  <div className="rounded-full bg-gray-200 w-8 h-8 flex items-center justify-center mr-3">
                    <span className="text-gray-600 text-sm">
                      A
                    </span>
                  </div>
                  <div>
                    <p className="font-medium">
                      {post.author_id || 'Anonymous'}
                    </p>
                    <p className="text-sm text-gray-300">
                      {formatDate(post.created_at)}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          )}

          <div className="prose prose-lg max-w-none">
            {post.content.split('\n').map((paragraph, index) => (
              <p key={index} className="mb-4">
                {paragraph}
              </p>
            ))}
          </div>

          {/* Comments section */}
          <Comments postId={post.id} />
        </article>

        {/* Sidebar */}
        <aside className="lg:w-80 flex-shrink-0">
          <div className="sticky top-8">
            <PopularPosts posts={popularPosts} />
          </div>
        </aside>
      </div>
    </div>
  )
}
