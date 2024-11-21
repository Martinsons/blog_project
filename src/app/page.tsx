import Link from 'next/link'
import Image from 'next/image'
import ParallaxBackground from '../components/ParallaxBackground'
import { createServerSupabaseClient } from '../lib/supabase/server'

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
        <ParallaxBackground imageUrl="/images/mark-mc-neill-JNC32GqudJ8-unsplash.jpg">
          <div className="text-center text-white px-4 max-w-5xl mx-auto">
            <h1 className="text-5xl md:text-7xl font-bold mb-6">
              Welcome to My Blog
            </h1>
            <p className="text-xl md:text-2xl mb-8 max-w-2xl mx-auto">
              Exploring ideas and sharing knowledge
            </p>
          </div>
        </ParallaxBackground>

        <main className="max-w-5xl mx-auto px-4 py-12">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {posts?.map((post) => (
              <article key={post.id} className="bg-white rounded-lg shadow-lg overflow-hidden">
                {post.featured_image_url && (
                  <div className="relative w-full h-48">
                    <Image
                      src={post.featured_image_url}
                      alt={post.title}
                      fill
                      className="object-cover"
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    />
                  </div>
                )}
                <div className="flex items-start p-6">
                  <div className="w-full">
                    <h2 className="text-2xl font-bold mb-2">
                      <Link href={`/blog/${post.slug}`} className="hover:text-blue-600 transition-colors">
                        {post.title}
                      </Link>
                    </h2>
                    <div className="text-gray-600 mb-4">
                      {new Date(post.created_at).toLocaleDateString('lv-LV')}
                    </div>
                    <p className="text-gray-700">
                      {post.content.length > 200 ? `${post.content.substring(0, 200)}...` : post.content}
                    </p>
                    {post.tags && post.tags.length > 0 && (
                      <div className="mt-4 flex flex-wrap gap-2">
                        {post.tags.map((tag) => (
                          <span key={tag} className="bg-gray-100 text-gray-700 px-2 py-1 rounded-full text-sm">
                            {tag}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              </article>
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
