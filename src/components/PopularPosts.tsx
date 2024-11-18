import Link from 'next/link'
import Image from 'next/image'
import { formatDate } from '@/lib/utils'

type PopularPost = {
  id: number
  title: string
  slug: string
  image_url?: string
  created_at: string
}

export default function PopularPosts({ posts }: { posts: PopularPost[] }) {
  return (
    <div className="bg-white rounded-lg shadow-sm p-6">
      <h2 className="text-xl font-bold mb-6">Popular Posts</h2>
      <div className="space-y-6">
        {posts.map((post) => (
          <Link
            key={post.id}
            href={`/blog/${post.slug}`}
            className="flex items-center gap-4 group"
          >
            {post.image_url ? (
              <div className="flex-shrink-0 w-16 h-16 relative rounded-full overflow-hidden">
                <Image
                  src={post.image_url}
                  alt={post.title}
                  fill
                  className="object-cover"
                  sizes="(max-width: 64px) 100vw, 64px"
                />
              </div>
            ) : (
              <div className="flex-shrink-0 w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center">
                <span className="text-gray-400 text-xs">No image</span>
              </div>
            )}
            <div className="flex-grow min-w-0">
              <h3 className="font-medium text-gray-900 group-hover:text-blue-600 transition-colors truncate">
                {post.title}
              </h3>
              <time className="text-sm text-gray-500">
                {formatDate(post.created_at)}
              </time>
            </div>
          </Link>
        ))}
      </div>
    </div>
  )
}
