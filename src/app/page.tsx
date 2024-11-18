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
                <div className="flex items-start p-6 gap-6 justify-between">
                  <div className="flex-grow">
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
                  {post.image_url ? (
                    <div className="flex-shrink-0">
                      <div className="w-24 h-24 rounded-full border-4 border-gray-100 shadow-lg overflow-hidden">
                        <Image
                          src={post.image_url}
                          alt={post.title}
                          width={96}
                          height={96}
                          className="object-cover w-full h-full"
                        />
                      </div>
                    </div>
                  ) : (
                    <div className="flex-shrink-0">
                      <div className="w-24 h-24 bg-gray-100 rounded-full border-4 border-gray-200 shadow-lg flex items-center justify-center">
                        <span className="text-gray-400 text-sm">No image</span>
                      </div>
                    </div>
                  )}
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
