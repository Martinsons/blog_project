import { createServerSupabaseClient } from '@/lib/supabase/server'
import BlogPostCard from '@/components/BlogPostCard'

export const revalidate = 0
export const dynamic = 'force-dynamic'

interface PageProps {
  searchParams: { [key: string]: string | string[] | undefined }
}

export default async function BlogPage({ searchParams }: PageProps) {
  const supabase = createServerSupabaseClient()
  const search = typeof searchParams.search === 'string' ? searchParams.search : ''
  const category = typeof searchParams.category === 'string' ? searchParams.category : ''
  
  try {
    let query = supabase
      .from('posts')
      .select('*')
      .eq('published', true)
      .order('created_at', { ascending: false })

    // Apply search filter if search query exists
    if (search) {
      query = query.or(`title.ilike.%${search}%,content.ilike.%${search}%`)
    }

    // Apply category filter if category exists
    if (category) {
      query = query.eq('category', category)
    }

    const { data: posts, error } = await query

    if (error) {
      throw error
    }

    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="mb-8 animate-fade-up">
          <h1 className="text-3xl font-bold text-gray-900 mb-4 bg-clip-text text-transparent bg-gradient-to-r from-emerald-600 to-emerald-500">
            {category ? `${category.charAt(0).toUpperCase() + category.slice(1)} raksti` :
             search ? `Meklēšanas rezultāti "${search}"` : 
             'Visi raksti'}
          </h1>
          {((search || category) && (!posts || posts.length === 0)) && (
            <p className="text-gray-600">
              No articles found. Try a different {search ? 'search query' : 'category'}.
            </p>
          )}
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {posts?.map((post, index) => (
            <div key={post.id} className="animate-fade-up" style={{ animationDelay: `${index * 100}ms` }}>
              <BlogPostCard post={post} />
            </div>
          ))}
        </div>
      </div>
    )
  } catch (error) {
    console.error('Error:', error)
    return (
      <div className="max-w-7xl mx-auto px-4 py-12">
        <h1 className="text-2xl font-bold text-red-600">Failed to load blog posts</h1>
        <p className="mt-2">Please try again later.</p>
      </div>
    )
  }
}
