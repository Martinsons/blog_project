'use client'

import Link from 'next/link'
import Image from 'next/image'
import { formatDate } from '@/lib/utils'
import { createContentPreview } from '@/lib/utils/content'
import { memo } from 'react'

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

function BlogPostCard({ post, isPreview = false }: BlogPostCardProps) {
  const contentPreview = post.content ? createContentPreview(post.content) : post.title

  return (
    <article className="group relative bg-white rounded-xl shadow-sm hover:shadow-xl transition-all duration-500 overflow-hidden border border-gray-100/50 backdrop-blur-sm">
      {post.featured_image_url ? (
        <div className="relative w-full aspect-[16/9] overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent z-10" />
          <Image
            src={post.featured_image_url}
            alt={post.title}
            fill
            loading="lazy"
            className="object-cover transform group-hover:scale-110 transition-transform duration-700 ease-out"
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
            quality={75}
            priority={false}
          />
        </div>
      ) : (
        <div className="w-full aspect-[16/9] bg-gradient-to-br from-emerald-50 via-green-50 to-emerald-50 flex items-center justify-center animate-gradient">
          <p className="text-gray-400 font-medium">Nav attēla</p>
        </div>
      )}
      
      <div className="p-5 sm:p-7">
        {post.category && (
          <span className="inline-flex items-center px-3 py-1 text-xs font-semibold text-emerald-800 bg-emerald-100/80 rounded-full mb-4 backdrop-blur-sm">
            {post.category}
          </span>
        )}
        
        <Link href={`/blog/${post.slug}`} className="block group" prefetch={false}>
          <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-gray-900 group-hover:text-emerald-600 transition-all duration-300 mb-3">
            {post.title}
          </h2>
        </Link>
        
        <div className="text-sm font-medium text-gray-400 mb-4 flex items-center">
          <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
          </svg>
          {formatDate(post.created_at)}
        </div>
        
        {isPreview ? (
          <div className="prose prose-emerald max-w-none">
            <div dangerouslySetInnerHTML={{ __html: post.content }} />
          </div>
        ) : (
          <p className="text-gray-600 leading-relaxed line-clamp-3 mb-4">
            {contentPreview}
          </p>
        )}

        <Link
          href={`/blog/${post.slug}`}
          className="inline-flex items-center mt-2 text-sm font-semibold text-emerald-600 hover:text-emerald-700 transition-colors group/link"
          prefetch={false}
        >
          Lasīt vairāk
          <svg 
            className="ml-2 w-4 h-4 transform transition-transform duration-300 group-hover/link:translate-x-1" 
            fill="none" 
            stroke="currentColor" 
            viewBox="0 0 24 24"
            aria-hidden="true"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </Link>
      </div>
    </article>
  )
}

// Memoize the component to prevent unnecessary re-renders
export default memo(BlogPostCard)
