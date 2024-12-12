'use client'

import { useState } from 'react'
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'
import ImageUpload from './ImageUpload'
import NextImage from 'next/image'
import { Card, CardContent } from '../components/ui/card'
import { Button } from '../components/ui/button'
import { 
  Eye, 
  EyeOff, 
  Trash2
} from 'lucide-react'
import TipTapEditor from './TipTapEditor'

interface Post {
  id: number
  title: string
  content: string
  slug: string
  published: boolean
  category: string
  featured_image?: string
  featured_image_url?: string
  created_at: string
  updated_at: string
}

interface AdminDashboardProps {
  posts: Post[]
  onPostsChange: () => Promise<void>
}

const CATEGORIES = [
  { value: 'sirupi', label: 'Sīrupi' },
  { value: 'pulveri', label: 'Pulveri' },
  { value: 'sulas', label: 'Sulas' }
] as const

export default function AdminDashboard({ posts, onPostsChange }: AdminDashboardProps) {
  const [isEditing, setIsEditing] = useState(false)
  const [currentPost, setCurrentPost] = useState<Partial<Post>>({})
  const supabase = createClientComponentClient()

  const handleEditorChange = (content: string) => {
    setCurrentPost(prev => ({
      ...prev,
      content
    }))
  }

  const handleSaveAsDraft = async (content: string) => {
    if (!currentPost.id) return

    try {
      const { error } = await supabase
        .from('posts')
        .update({ content })
        .eq('id', currentPost.id)

      if (error) throw error
    } catch (error) {
      console.error('Error saving draft:', error)
    }
  }

  const handleCreatePost = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      if (!currentPost.title) throw new Error('Title is required')

      const slug = currentPost.title.toLowerCase().replace(/[^a-z0-9]+/g, '-')
      
      if (currentPost.id) {
        // Update existing post
        const { data: post, error } = await supabase
          .from('posts')
          .update({
            title: currentPost.title,
            content: currentPost.content || '',
            category: currentPost.category,
            slug,
            featured_image: currentPost.featured_image,
            featured_image_url: currentPost.featured_image_url
          })
          .eq('id', currentPost.id)
          .select('*')
          .headers({
            'Accept': 'application/json',
            'Content-Type': 'application/json'
          })
          .single()

        if (error) throw error
        await onPostsChange()
      } else {
        // Create new post
        const { data: post, error } = await supabase
          .from('posts')
          .insert([{
            title: currentPost.title,
            content: currentPost.content || '',
            category: currentPost.category || 'sirupi', // default category
            slug,
            published: false,
            featured_image: currentPost.featured_image,
            featured_image_url: currentPost.featured_image_url
          }])
          .select('*')
          .headers({
            'Accept': 'application/json',
            'Content-Type': 'application/json'
          })
          .single()

        if (error) throw error
        await onPostsChange()
      }

      setCurrentPost({})
      setIsEditing(false)
    } catch (error) {
      console.error('Error:', error)
      alert(error instanceof Error ? error.message : 'Error saving post')
    }
  }

  const handleUpdatePost = async (post: Post) => {
    try {
      const { error } = await supabase
        .from('posts')
        .update({
          published: !post.published
        })
        .eq('id', post.id)

      if (error) throw error

      await onPostsChange()
    } catch (error) {
      console.error('Error updating post:', error)
    }
  }

  const handleDeletePost = async (id: number) => {
    if (!confirm('Vai tiešām vēlaties dzēst šo rakstu?')) return

    try {
      const post = posts.find(p => p.id === id)
      if (post?.featured_image) {
        await supabase.storage
          .from('blog-assets')
          .remove([post.featured_image])
      }

      const { error } = await supabase
        .from('posts')
        .delete()
        .eq('id', id)

      if (error) throw error

      await onPostsChange()
    } catch (error) {
      console.error('Error deleting post:', error)
    }
  }

  const handleImageUpload = (imagePath: string, imageUrl: string) => {
    setCurrentPost({
      ...currentPost,
      featured_image: imagePath,
      featured_image_url: imageUrl
    })
  }

  const handleEditPost = (post: Post) => {
    setCurrentPost(post)
    setIsEditing(true)
  }

  if (!posts) return null

  return (
    <div className="container mx-auto px-4 py-8 sm:px-6 lg:px-8">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 gap-4">
        <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">Rakstu pārvaldība</h1>
        <button
          onClick={() => {
            setIsEditing(true)
            setCurrentPost({})
          }}
          className="w-full sm:w-auto px-4 py-2 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 transition-colors"
        >
          Pievienot jaunu rakstu
        </button>
      </div>

      {isEditing ? (
        <div className="bg-white rounded-lg shadow p-4 sm:p-6">
          <div className="mb-4">
            <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-1">
              Virsraksts
            </label>
            <input
              type="text"
              id="title"
              value={currentPost.title || ''}
              onChange={(e) => setCurrentPost({ ...currentPost, title: e.target.value })}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-emerald-500 focus:border-emerald-500"
            />
          </div>

          <div className="mb-4">
            <label htmlFor="slug" className="block text-sm font-medium text-gray-700 mb-1">
              Slug
            </label>
            <input
              type="text"
              id="slug"
              value={currentPost.slug || ''}
              onChange={(e) => setCurrentPost({ ...currentPost, slug: e.target.value })}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-emerald-500 focus:border-emerald-500"
            />
          </div>

          <div className="mb-4">
            <label htmlFor="category" className="block text-sm font-medium text-gray-700 mb-1">
              Kategorija
            </label>
            <select
              id="category"
              value={currentPost.category || ''}
              onChange={(e) => setCurrentPost({ ...currentPost, category: e.target.value })}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-emerald-500 focus:border-emerald-500"
            >
              <option value="">Izvēlies kategoriju</option>
              {CATEGORIES.map((cat) => (
                <option key={cat.value} value={cat.value}>
                  {cat.label}
                </option>
              ))}
            </select>
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Saturs
            </label>
            <TipTapEditor
              content={currentPost.content || ''}
              onChange={(content) => setCurrentPost({ ...currentPost, content })}
            />
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-4">
              Attēls
            </label>
            <ImageUpload
              publicURL={currentPost.featured_image_url}
              onUploadComplete={(url) => setCurrentPost({ ...currentPost, featured_image_url: url })}
            />
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-end">
            <button
              onClick={() => {
                setIsEditing(false)
                setCurrentPost({})
              }}
              className="w-full sm:w-auto px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
            >
              Atcelt
            </button>
            <button
              onClick={handleCreatePost}
              className="w-full sm:w-auto px-4 py-2 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 transition-colors"
            >
              Saglabāt
            </button>
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {posts.map((post) => (
            <Card key={post.id} className="flex flex-col">
              <CardContent className="flex-1 p-4">
                <div className="relative aspect-video w-full mb-4 overflow-hidden rounded-lg">
                  {post.featured_image_url ? (
                    <NextImage
                      src={post.featured_image_url}
                      alt={post.title}
                      fill
                      className="object-cover"
                    />
                  ) : (
                    <div className="w-full h-full bg-gray-100 flex items-center justify-center">
                      <span className="text-gray-400">Nav attēla</span>
                    </div>
                  )}
                </div>
                <div className="mb-2">
                  <span className="inline-block px-2 py-1 text-xs font-semibold text-emerald-800 bg-emerald-100 rounded-full">
                    {CATEGORIES.find(cat => cat.value === post.category)?.label || 'Nav kategorijas'}
                  </span>
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">{post.title}</h3>
                <div className="flex flex-col sm:flex-row gap-2 mt-4">
                  <button
                    onClick={() => handleUpdatePost(post)}
                    className="flex items-center justify-center gap-2 px-3 py-1.5 text-sm border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
                  >
                    {post.published ? <EyeOff size={16} /> : <Eye size={16} />}
                    {post.published ? 'Paslēpt' : 'Publicēt'}
                  </button>
                  <button
                    onClick={() => {
                      setCurrentPost(post)
                      setIsEditing(true)
                    }}
                    className="px-3 py-1.5 text-sm border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
                  >
                    Rediģēt
                  </button>
                  <button
                    onClick={() => handleDeletePost(post.id)}
                    className="flex items-center justify-center gap-2 px-3 py-1.5 text-sm text-red-600 border border-red-200 rounded-lg hover:bg-red-50 transition-colors"
                  >
                    <Trash2 size={16} />
                    Dzēst
                  </button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  )
}