import { createServerSupabaseClient } from '../../lib/supabase/server'
import BlogPostCard from '@/components/BlogPostCard'

export const revalidate = 0

export default async function NewestPosts() {
  const supabase = createServerSupabaseClient()
  
  try {
    const { data: posts, error } = await supabase
      .from('posts')
      .select('*')
      .eq('published', true)
      .order('created_at', { ascending: false })
      .limit(12)

    if (error) {
      throw error
    }

    return (
      <div className="min-h-screen bg-white">
        {/* Hero Section */}
        <div className="py-12 sm:py-16 px-4 relative overflow-hidden bg-gradient-to-b from-emerald-50/50 to-transparent">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4 text-gray-900">
              Jaunākie raksti
            </h1>
            <p className="text-base sm:text-lg text-gray-600 max-w-2xl mx-auto">
              Izpētiet mūsu jaunākos rakstus par veselīgu dzīvesveidu, dabīgiem produktiem un labsajūtas uzlabošanu
            </p>
          </div>
        </div>

        {/* Posts Grid */}
        <main className="max-w-7xl mx-auto px-4 pb-12 sm:pb-24">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
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
      <div className="max-w-7xl mx-auto px-4 py-12">
        <h1 className="text-2xl font-bold text-red-600">Neizdevās ielādēt rakstus</h1>
        <p className="mt-2">Lūdzu, mēģiniet vēlāk vēlreiz.</p>
      </div>
    )
  }
} 