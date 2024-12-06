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
  category?: string
}

interface BlogPostCardProps {
  post: BlogPost
  isPreview?: boolean
}

export default function BlogPostCard({ post, isPreview = false }: BlogPostCardProps) {
  const contentPreview = post.content ? createContentPreview(post.content) : post.title

  return (
    <article className="group bg-white rounded-lg sm:rounded-xl shadow-sm hover:shadow-lg transition-all duration-300 overflow-hidden border border-gray-100">
      {post.featured_image_url ? (
        <div className="relative w-full aspect-[16/9] overflow-hidden">
          <Image
            src={post.featured_image_url}
            alt={post.title}
            fill
            className="object-cover transform group-hover:scale-105 transition-transform duration-300"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
        </div>
      ) : (
        <div className="w-full aspect-[16/9] bg-gradient-to-br from-emerald-50 to-green-50 flex items-center justify-center">
          <p className="text-gray-400 font-medium">Nav attēla</p>
        </div>
      )}
      
      <div className="p-4 sm:p-6">
        {post.category && (
          <span className="inline-block px-2 py-1 text-xs font-semibold text-emerald-800 bg-emerald-100 rounded-full mb-3">
            {post.category}
          </span>
        )}
        
        <Link href={`/blog/${post.slug}`} className="block group">
          <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-gray-900 group-hover:text-emerald-600 transition-colors mb-2">
            {post.title}
          </h2>
        </Link>
        
        <div className="text-sm font-medium text-gray-400 mb-3">
          {formatDate(post.created_at)}
        </div>
        
        {isPreview ? (
          <div className="prose prose-emerald max-w-none">
            <div dangerouslySetInnerHTML={{ __html: post.content }} />
          </div>
        ) : (
          <p className="text-gray-600 leading-relaxed line-clamp-3">
            {contentPreview}
          </p>
        )}

        <Link
          href={`/blog/${post.slug}`}
          className="inline-flex items-center mt-4 text-sm font-semibold text-emerald-600 hover:text-emerald-700 transition-colors"
        >
          Lasīt vairāk
          <svg className="ml-2 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </Link>
      </div>
    </article>
  )
}
