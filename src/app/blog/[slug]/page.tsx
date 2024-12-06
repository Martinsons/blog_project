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
          
          {post.featured_image_url && (
            <div className="relative w-full h-96 mb-8 rounded-lg overflow-hidden">
              <Image
                src={post.featured_image_url}
                alt={post.title}
                fill
                className="object-cover"
                priority
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              />
            </div>
          )}

          <div className="prose prose-lg max-w-none">
            <div 
              dangerouslySetInnerHTML={{ __html: post.content }} 
              className="prose prose-lg max-w-none prose-img:rounded-lg prose-headings:font-bold prose-a:text-blue-600"
            />
          </div>

          {/* Comments section */}
          <Comments postId={post.id} />
        </article>

        {/* Sidebar */}
        <aside className="lg:w-80 flex-shrink-0">
          <div className="sticky top-16">
            <PopularPosts posts={popularPosts} />
          </div>
        </aside>
      </div>
    </div>
  )
}
