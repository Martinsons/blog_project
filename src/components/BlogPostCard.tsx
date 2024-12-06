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
    <article className="group bg-white rounded-xl shadow-sm hover:shadow-lg transition-all duration-300 overflow-hidden border border-gray-100">
      {post.featured_image_url ? (
        <div className="relative w-full h-56 overflow-hidden">
          <Image
            src={post.featured_image_url}
            alt={post.title}
            fill
            className="object-cover transform group-hover:scale-105 transition-transform duration-300"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
        </div>
      ) : (
        <div className="w-full h-56 bg-gradient-to-br from-blue-50 to-indigo-50 flex items-center justify-center">
          <p className="text-gray-400 font-medium">No image available</p>
        </div>
      )}
      
      <div className="p-8">
        <Link href={`/blog/${post.slug}`} className="block">
          <h2 className="text-2xl font-bold tracking-tight text-gray-900 hover:text-blue-600 transition-colors mb-3">
            {post.title}
          </h2>
        </Link>
        <div className="text-sm font-medium text-gray-400 mb-4">
          {formatDate(post.created_at)}
        </div>
        {isPreview ? (
          <div className="prose prose-lg max-w-none">
            <div dangerouslySetInnerHTML={{ __html: post.content }} />
          </div>
        ) : (
          <p className="text-gray-600 leading-relaxed">
            {contentPreview}
          </p>
        )}
        {post.tags && post.tags.length > 0 && (
          <div className="mt-6 flex flex-wrap gap-2">
            {post.tags.map((tag) => (
              <span 
                key={tag} 
                className="bg-blue-50 text-blue-600 px-3 py-1 rounded-full text-sm font-medium"
              >
                {tag}
              </span>
            ))}
          </div>
        )}
        <Link
          href={`/blog/${post.slug}`}
          className="inline-flex items-center mt-6 px-6 py-3 border border-transparent text-sm font-semibold rounded-full bg-blue-600 text-white hover:bg-blue-700 transition-colors duration-200"
        >
          Read more
          <svg className="ml-2 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </Link>
      </div>
    </article>
  )
}
