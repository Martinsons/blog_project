import Link from 'next/link'
import Image from 'next/image'
import { createServerSupabaseClient } from '../lib/supabase/server'
import BlogPostCard from '@/components/BlogPostCard'
import ContactForm from '@/components/ContactForm'

export const revalidate = 0 // Revalidate this page on every request

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
      <div className="w-full min-h-screen bg-white">
        {/* Hero Section */}
        <div className="py-12 sm:py-24 px-4 relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-b from-emerald-50/50 to-transparent" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(74,222,128,0.08),transparent_50%)]" />
          
          <div className="text-center max-w-4xl mx-auto relative">
            <div className="inline-block">
              <h1 className="text-6xl sm:text-[110px] font-bold mb-4 sm:mb-8 bg-gradient-to-r from-emerald-600 via-emerald-500 to-emerald-400 text-transparent bg-clip-text tracking-wider relative flow-line">
                Veselība
                <span className="absolute -right-4 sm:-right-8 bottom-2 sm:bottom-4 text-emerald-500 animate-pulse">.</span>
              </h1>
              <div className="absolute -inset-x-20 -inset-y-10 bg-gradient-to-r from-emerald-100/30 to-green-100/30 blur-3xl -z-10" />
            </div>
            
            <h2 className="text-2xl sm:text-4xl font-semibold text-gray-800 mb-4 sm:mb-6 leading-tight px-4 tracking-wide">
              Jūsu ceļvedis veselīgā dzīvesveidā
            </h2>
            <p className="text-lg sm:text-xl text-gray-700 mb-8 sm:mb-12 max-w-2xl mx-auto px-4 leading-relaxed tracking-normal">
              Uzzini vairāk par veselīgu dzīvesveidu un labsajūtu ar mūsu dabīgajiem produktiem
            </p>

            <div className="flex flex-col sm:flex-row justify-center gap-4 mb-12 sm:mb-16 px-4">
              <Link 
                href="/blog"
                className="w-full sm:w-auto px-6 py-3 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 transition-colors text-center"
              >
                Skatīt rakstus
              </Link>
              <Link 
                href="#categories"
                className="w-full sm:w-auto px-6 py-3 bg-white text-emerald-600 rounded-lg border-2 border-emerald-600 hover:bg-emerald-50 transition-colors text-center"
              >
                Mūsu produkti
              </Link>
            </div>
          </div>
        </div>

        <main className="max-w-7xl mx-auto px-4 pb-12 sm:pb-24">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 sm:gap-8">
            {/* Featured Section */}
            <div className="lg:col-span-2">
              <Link href="#" className="block group">
                <div className="relative aspect-[16/9] rounded-xl sm:rounded-2xl overflow-hidden mb-6 shadow-lg">
                  <Image
                    src={posts?.[0]?.featured_image_url || '/placeholder.jpg'}
                    alt="Featured post"
                    fill
                    className="object-cover transition-transform duration-300 group-hover:scale-105"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 66vw"
                    priority
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                  <div className="absolute bottom-0 left-0 right-0 p-4 sm:p-6 text-white">
                    <h3 className="text-xl sm:text-2xl font-semibold mb-2">Jaunākie raksti</h3>
                    <p className="text-white/80">Izpēti mūsu jaunāko saturu</p>
                  </div>
                </div>
              </Link>
            </div>

            {/* Quick Links */}
            <div className="space-y-4 sm:space-y-6">
              <div id="categories" className="block p-6 sm:p-8 rounded-xl sm:rounded-2xl bg-gradient-to-br from-emerald-50 to-green-50 shadow-md">
                <h3 className="text-lg sm:text-xl font-semibold mb-4">Mūsu produkti</h3>
                <div className="space-y-3">
                  <Link 
                    href="/blog?category=sirupi"
                    className="flex items-center p-3 rounded-lg bg-white shadow-sm hover:shadow-md transition-all group"
                  >
                    <span className="w-2 h-2 rounded-full bg-emerald-400 mr-3 group-hover:scale-110 transition-transform" />
                    <span className="text-gray-900">Sīrupi</span>
                  </Link>
                  <Link 
                    href="/blog?category=pulveri"
                    className="flex items-center p-3 rounded-lg bg-white shadow-sm hover:shadow-md transition-all group"
                  >
                    <span className="w-2 h-2 rounded-full bg-emerald-400 mr-3 group-hover:scale-110 transition-transform" />
                    <span className="text-gray-900">Pulveri</span>
                  </Link>
                  <Link 
                    href="/blog?category=sulas"
                    className="flex items-center p-3 rounded-lg bg-white shadow-sm hover:shadow-md transition-all group"
                  >
                    <span className="w-2 h-2 rounded-full bg-emerald-400 mr-3 group-hover:scale-110 transition-transform" />
                    <span className="text-gray-900">Sulas</span>
                  </Link>
                </div>
              </div>

              {/* Most Popular Posts */}
              <div className="block p-6 sm:p-8 rounded-xl sm:rounded-2xl bg-gradient-to-br from-emerald-50 to-green-50 shadow-md">
                <h3 className="text-lg sm:text-xl font-semibold mb-4">Populārākie raksti</h3>
                <div className="space-y-4">
                  {posts?.slice(0, 3).map((post) => (
                    <Link 
                      key={post.id}
                      href={`/blog/${post.slug}`}
                      className="block group"
                    >
                      <h4 className="text-gray-900 group-hover:text-emerald-600 transition-colors line-clamp-2 font-medium">
                        {post.title}
                      </h4>
                      <p className="text-sm text-gray-500 mt-1">
                        {new Date(post.created_at).toLocaleDateString('lv-LV')}
                      </p>
                    </Link>
                  ))}
                </div>
              </div>
            </div>
          </div>

          <h2 className="text-xl sm:text-2xl font-semibold mt-12 sm:mt-16 mb-6 sm:mb-8">Jaunākie ieraksti</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {posts?.slice(1).map((post) => (
              <BlogPostCard key={post.id} post={post} />
            ))}
          </div>
        </main>

        {/* Contact Form Section */}
        <div className="bg-gradient-to-b from-white to-emerald-50/30">
          <ContactForm />
        </div>
      </div>
    )
  } catch (error) {
    console.error('Error:', error)
    return (
      <div className="max-w-7xl mx-auto px-4 py-12">
        <h1 className="text-2xl font-bold text-red-600">Neizdevās ielādēt bloga ierakstus</h1>
        <p className="mt-2">Lūdzu, mēģiniet vēlreiz vēlāk.</p>
      </div>
    )
  }
}
