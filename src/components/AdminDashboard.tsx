'use client'

import { useState } from 'react'
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'
import { Post } from '@/types/blog'
import ImageUpload from './ImageUpload'
import Image from 'next/image'

interface AdminDashboardProps {
  initialPosts: Post[]
}

export default function AdminDashboard({ initialPosts }: AdminDashboardProps) {
  const [posts, setPosts] = useState<Post[]>(initialPosts)
  const [isEditing, setIsEditing] = useState<boolean>(false)
  const [currentPost, setCurrentPost] = useState<Partial<Post>>({})
  const supabase = createClientComponentClient()

  const handleCreatePost = async (e: React.FormEvent) => {
    e.preventDefault()
    
    try {
      if (!currentPost.title) {
        throw new Error('Title is required')
      }

      const slug = currentPost.title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '')
      
      const { data: post, error } = await supabase
        .from('posts')
        .insert([{
          title: currentPost.title,
          content: currentPost.content || '',
          slug: slug,
          published: false,
          featured_image: currentPost.featured_image,
          featured_image_url: currentPost.featured_image_url
        }])
        .select()
        .single()

      if (error) {
        console.error('Error creating post:', error)
        alert(error.message)
        return
      }

      setPosts([post, ...posts])
      setCurrentPost({})
      setIsEditing(false)
    } catch (error) {
      console.error('Error:', error)
      alert(error instanceof Error ? error.message : 'Error creating post')
    }
  }

  const handleUpdatePost = async (post: Post) => {
    const { error } = await supabase
      .from('posts')
      .update({
        title: post.title,
        content: post.content,
        published: post.published,
        featured_image: post.featured_image,
        featured_image_url: post.featured_image_url
      })
      .eq('id', post.id)

    if (error) {
      console.error('Error updating post:', error)
      return
    }

    setPosts(posts.map(p => p.id === post.id ? { ...p, ...post } : p))
  }

  const handleDeletePost = async (id: number) => {
    if (!confirm('Are you sure you want to delete this post?')) return

    // Delete the post's image from storage if it exists
    const post = posts.find(p => p.id === id)
    if (post?.featured_image) {
      const { error: storageError } = await supabase.storage
        .from('blog-assets')
        .remove([post.featured_image])
      
      if (storageError) {
        console.error('Error deleting image:', storageError)
      }
    }

    const { error } = await supabase
      .from('posts')
      .delete()
      .eq('id', id)

    if (error) {
      console.error('Error deleting post:', error)
      return
    }

    setPosts(posts.filter(p => p.id !== id))
  }

  const handleImageUpload = (imagePath: string, imageUrl: string) => {
    setCurrentPost({
      ...currentPost,
      featured_image: imagePath,
      featured_image_url: imageUrl
    })
  }

  return (
    <div>
      <button
        onClick={() => setIsEditing(!isEditing)}
        className="mb-6 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
      >
        {isEditing ? 'Cancel' : 'Create New Post'}
      </button>

      {isEditing && (
        <form onSubmit={handleCreatePost} className="mb-8 space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">Title</label>
            <input
              type="text"
              value={currentPost.title || ''}
              onChange={e => setCurrentPost({ ...currentPost, title: e.target.value })}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              required
            />
          </div>
          
          <ImageUpload
            onUploadComplete={handleImageUpload}
            currentImageUrl={currentPost.featured_image_url}
          />

          <div>
            <label className="block text-sm font-medium text-gray-700">Content</label>
            <textarea
              value={currentPost.content || ''}
              onChange={e => setCurrentPost({ ...currentPost, content: e.target.value })}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              rows={10}
              required
            />
          </div>
          <button
            type="submit"
            className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
          >
            Save Post
          </button>
        </form>
      )}

      <div className="space-y-6">
        {posts.map(post => (
          <div key={post.id} className="border rounded-lg p-6 bg-white shadow-sm">
            <div className="flex justify-between items-start mb-4">
              <h2 className="text-xl font-semibold">{post.title}</h2>
              <div className="space-x-2">
                <button
                  onClick={() => handleUpdatePost({ ...post, published: !post.published })}
                  className={`px-3 py-1 rounded text-sm ${
                    post.published
                      ? 'bg-green-100 text-green-800'
                      : 'bg-yellow-100 text-yellow-800'
                  }`}
                >
                  {post.published ? 'Published' : 'Draft'}
                </button>
                <button
                  onClick={() => handleDeletePost(post.id)}
                  className="bg-red-100 text-red-800 px-3 py-1 rounded text-sm"
                >
                  Delete
                </button>
              </div>
            </div>
            {post.featured_image_url && (
              <div className="relative w-full h-48 mb-4">
                <Image
                  src={post.featured_image_url}
                  alt={post.title}
                  fill
                  className="object-cover rounded-lg"
                />
              </div>
            )}
            <p className="text-gray-600">{post.content}</p>
            <div className="mt-2 text-sm text-gray-500">
              Created: {new Date(post.created_at).toLocaleDateString()}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
