import Link from 'next/link'
import Image from 'next/image'
import { createServerSupabaseClient } from '../lib/supabase/server'
import BlogPostCard from '@/components/BlogPostCard'

export const revalidate = 60 // Revalidate this page every 60 seconds

export default async function Home() {
  const supabase = createServerSupabaseClient()
  
  try {
    const { data: posts, error } = await supabase
      .from('posts')
      .select('*')
      .eq('published', true)
      .order('created_at', { ascending: false })

    if (error) {
      throw error
    }

    return (
      <div className="w-full">
        <div className="bg-gradient-to-r from-blue-600 to-indigo-700 py-20">
          <div className="text-center text-white px-4 max-w-5xl mx-auto">
            <h1 className="text-5xl md:text-7xl font-bold mb-6">
              Welcome to My Blog
            </h1>
            <p className="text-xl md:text-2xl mb-8 max-w-2xl mx-auto">
              Exploring ideas and sharing knowledge
            </p>
          </div>
        </div>

        <main className="max-w-5xl mx-auto px-4 py-12">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {posts?.map((post) => (
              <BlogPostCard key={post.id} post={post} />
            ))}
          </div>
        </main>
      </div>
    )
  } catch (error) {
    console.error('Error:', error)
    return (
      <div className="max-w-5xl mx-auto px-4 py-12">
        <h1 className="text-2xl font-bold text-red-600">Failed to load blog posts</h1>
        <p className="mt-2">Please try again later.</p>
      </div>
    )
  }
}
