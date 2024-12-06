'use client'

import Link from 'next/link'
import Image from 'next/image'
import { formatDate } from '@/lib/utils'
import { createContentPreview } from '@/lib/utils/content'

interface BlogPost {
  id: number
  title: string
  content: string
  slug: string
  featured_image_url?: string
  created_at: string
  tags?: string[]
}

interface BlogPostCardProps {
  post: BlogPost
  isPreview?: boolean
}

export default function BlogPostCard({ post, isPreview = false }: BlogPostCardProps) {
  // Create content preview on render
  const contentPreview = post.content ? createContentPreview(post.content) : post.title

  return (
    <article className="bg-white rounded-lg shadow hover:shadow-md transition-shadow overflow-hidden">
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
        <div className="text-sm text-gray-500 mb-4">
          {formatDate(post.created_at)}
        </div>
        {isPreview ? (
          <div className="prose prose-sm">
            <div dangerouslySetInnerHTML={{ __html: post.content }} />
          </div>
        ) : (
          <p className="text-gray-700">
            {contentPreview}
          </p>
        )}
        {post.tags && post.tags.length > 0 && (
          <div className="mt-4 flex flex-wrap gap-2">
            {post.tags.map((tag) => (
              <span 
                key={tag} 
                className="bg-gray-100 text-gray-700 px-2 py-1 rounded-full text-sm"
              >
                {tag}
              </span>
            ))}
          </div>
        )}
        <Link
          href={`/blog/${post.slug}`}
          className="inline-block mt-4 text-blue-600 hover:text-blue-800"
        >
          Read more →
        </Link>
      </div>
    </article>
  )
}
