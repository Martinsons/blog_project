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
          .select()
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
          .select()
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
    <div className="max-w-6xl mx-auto p-6">
      <Button
        onClick={() => setIsEditing(!isEditing)}
        className="mb-6"
        variant="default"
      >
        {isEditing ? 'Atcelt' : 'Izveidot jaunu rakstu'}
      </Button>

      {isEditing && (
        <form onSubmit={handleCreatePost} className="space-y-6">
          <input
            type="text"
            value={currentPost.title || ''}
            onChange={e => setCurrentPost({ ...currentPost, title: e.target.value })}
            placeholder="Raksta virsraksts"
            className="w-full p-2 border rounded"
            required
          />
          
          <select
            value={currentPost.category || 'sirupi'}
            onChange={(e) => setCurrentPost({ ...currentPost, category: e.target.value })}
            className="w-full p-2 border rounded bg-white"
          >
            {CATEGORIES.map(({ value, label }) => (
              <option key={value} value={value}>
                {label}
              </option>
            ))}
          </select>

          <ImageUpload
            onUploadComplete={handleImageUpload}
            currentImageUrl={currentPost.featured_image_url}
          />

          <TipTapEditor 
            content={currentPost.content}
            onChange={handleEditorChange}
          />

          <div className="flex justify-end space-x-4">
            <Button type="submit">
              {currentPost.id ? 'Atjaunot rakstu' : 'Izveidot rakstu'}
            </Button>
          </div>
        </form>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
        {posts.map(post => (
          <Card key={post.id} className="flex flex-col">
            <CardContent className="p-4 flex-1">
              {post.featured_image_url && (
                <div className="relative aspect-video mb-4 rounded-lg overflow-hidden">
                  <NextImage
                    src={post.featured_image_url}
                    alt={post.title}
                    fill
                    className="object-cover"
                  />
                </div>
              )}
              <h3 className="text-lg font-semibold mb-2">{post.title}</h3>
              <div className="flex items-center gap-2 text-sm text-gray-500 mb-2">
                <span>{new Date(post.created_at).toLocaleDateString()}</span>
                <span>•</span>
                <span className="capitalize">{post.category || 'Sīrupi'}</span>
              </div>
              <div className="flex justify-between items-center mt-4">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => handleUpdatePost(post)}
                >
                  {post.published ? (
                    <>
                      <EyeOff className="h-4 w-4 mr-2" />
                      Atcelt publicēšanu
                    </>
                  ) : (
                    <>
                      <Eye className="h-4 w-4 mr-2" />
                      Publicēt
                    </>
                  )}
                </Button>
                <div className="space-x-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleEditPost(post)}
                  >
                    Rediģēt
                  </Button>
                  <Button
                    variant="destructive"
                    size="sm"
                    onClick={() => handleDeletePost(post.id)}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}