import Link from 'next/link'
import Image from 'next/image'
import { createServerSupabaseClient } from '../lib/supabase/server'
import BlogPostCard from '@/components/BlogPostCard'
import ContactForm from '@/components/ContactForm'
import Footer from '@/components/Footer'

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
        <div className="py-24 px-4 relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-b from-emerald-50/50 to-transparent" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(74,222,128,0.08),transparent_50%)]" />
          
          <div className="text-center max-w-4xl mx-auto relative">
            <div className="inline-block">
              <h1 className="text-[110px] font-bold mb-8 bg-gradient-to-r from-emerald-600 to-emerald-400 text-transparent bg-clip-text relative">
                Veselība
                <span className="absolute -right-8 bottom-4 text-emerald-500">.</span>
              </h1>
              <div className="absolute -inset-x-20 -inset-y-10 bg-gradient-to-r from-emerald-100/20 to-green-100/20 blur-3xl -z-10" />
            </div>
            
            <h2 className="text-4xl font-semibold text-gray-900 mb-6 leading-tight">
              Jūsu ceļvedis veselīgā dzīvesveidā
            </h2>
            <p className="text-xl text-gray-600 mb-12 max-w-2xl mx-auto">
              Uzzini vairāk par veselīgu dzīvesveidu un labsajūtu ar mūsu dabīgajiem produktiem
            </p>

            <div className="flex justify-center gap-4 mb-16">
              <Link 
                href="/blog"
                className="px-6 py-3 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 transition-colors"
              >
                Skatīt rakstus
              </Link>
              <Link 
                href="#categories"
                className="px-6 py-3 bg-white text-emerald-600 rounded-lg border-2 border-emerald-600 hover:bg-emerald-50 transition-colors"
              >
                Mūsu produkti
              </Link>
            </div>
          </div>
        </div>

        <main className="max-w-7xl mx-auto px-4 pb-24">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Featured Section */}
            <div className="lg:col-span-2">
              <Link href="#" className="block group">
                <div className="relative aspect-[16/9] rounded-2xl overflow-hidden mb-6 shadow-lg">
                  <Image
                    src={posts?.[0]?.featured_image_url || '/placeholder.jpg'}
                    alt="Featured post"
                    fill
                    className="object-cover transition-transform duration-300 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                  <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                    <h3 className="text-2xl font-semibold mb-2">Jaunākie raksti</h3>
                    <p className="text-white/80">Izpēti mūsu jaunāko saturu</p>
                  </div>
                </div>
              </Link>
            </div>

            {/* Quick Links */}
            <div className="space-y-6">
              <div id="categories" className="block p-8 rounded-2xl bg-gradient-to-br from-emerald-50 to-green-50 shadow-md">
                <h3 className="text-xl font-semibold mb-4">Mūsu produkti</h3>
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
              <div className="block p-8 rounded-2xl bg-gradient-to-br from-emerald-50 to-green-50 shadow-md">
                <h3 className="text-xl font-semibold mb-4">Populārākie raksti</h3>
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

          <h2 className="text-2xl font-semibold mt-16 mb-8">Jaunākie ieraksti</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {posts?.slice(1).map((post) => (
              <BlogPostCard key={post.id} post={post} />
            ))}
          </div>
        </main>

        {/* Contact Form Section */}
        <div className="bg-gradient-to-b from-white to-emerald-50/30">
          <ContactForm />
        </div>

        {/* Footer */}
        <Footer />
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
