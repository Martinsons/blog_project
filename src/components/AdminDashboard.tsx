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
  featured_image?: string
  featured_image_url?: string
  created_at: string
  updated_at: string
}

interface AdminDashboardProps {
  initialPosts: Post[]
}

export default function AdminDashboard({ initialPosts }: AdminDashboardProps) {
  const [posts, setPosts] = useState<Post[]>(initialPosts)
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
            slug,
            featured_image: currentPost.featured_image,
            featured_image_url: currentPost.featured_image_url
          })
          .eq('id', currentPost.id)
          .select()
          .single()

        if (error) throw error
        setPosts(posts.map(p => p.id === currentPost.id ? { ...p, ...post } : p))
      } else {
        // Create new post
        const { data: post, error } = await supabase
          .from('posts')
          .insert([{
            title: currentPost.title,
            content: currentPost.content || '',
            slug,
            published: false,
            featured_image: currentPost.featured_image,
            featured_image_url: currentPost.featured_image_url
          }])
          .select()
          .single()

        if (error) throw error
        setPosts([post, ...posts])
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

      setPosts(posts.map(p => 
        p.id === post.id ? { ...p, published: !post.published } : p
      ))
    } catch (error) {
      console.error('Error updating post:', error)
    }
  }

  const handleDeletePost = async (id: number) => {
    if (!confirm('Are you sure you want to delete this post?')) return

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

      setPosts(posts.filter(p => p.id !== id))
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
        {isEditing ? 'Cancel' : 'Create New Post'}
      </Button>

      {isEditing && (
        <form onSubmit={handleCreatePost} className="space-y-6">
          <input
            type="text"
            value={currentPost.title || ''}
            onChange={e => setCurrentPost({ ...currentPost, title: e.target.value })}
            placeholder="Post title"
            className="w-full p-2 border rounded"
            required
          />
          
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
              {currentPost.id ? 'Update Post' : 'Create Post'}
            </Button>
          </div>
        </form>
      )}

      <div className="grid gap-6 mt-6">
        {posts.map(post => (
          <Card key={post.id} className="w-full">
            <CardContent className="flex items-center justify-between p-6">
              <div className="flex items-center space-x-4">
                {post.featured_image_url && (
                  <div className="relative w-16 h-16">
                    <NextImage
                      src={post.featured_image_url}
                      alt={post.title}
                      fill
                      sizes="(max-width: 64px) 100vw, 64px"
                      className="object-cover rounded"
                    />
                  </div>
                )}
                <div>
                  <h3 className="font-semibold">{post.title}</h3>
                  <p className="text-sm text-gray-500">
                    Last updated: {new Date(post.updated_at).toLocaleDateString()}
                  </p>
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => handleUpdatePost(post)}
                >
                  {post.published ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => handleEditPost(post)}
                >
                  Edit
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => handleDeletePost(post.id)}
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}