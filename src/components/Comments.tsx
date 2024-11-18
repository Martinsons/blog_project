'use client'

import { useState, useEffect } from 'react'
import { supabase } from '@/lib/supabase/client'
import { formatDate } from '@/lib/utils'

type Comment = {
  id: number
  author_name: string
  content: string
  created_at: string
}

export default function Comments({ postId }: { postId: number }) {
  const [authorName, setAuthorName] = useState('')
  const [content, setContent] = useState('')
  const [comments, setComments] = useState<Comment[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  // Load comments when component mounts
  useEffect(() => {
    loadComments()
  }, [postId])

  async function loadComments() {
    const { data, error } = await supabase
      .from('comments')
      .select('*')
      .eq('post_id', postId)
      .order('created_at', { ascending: false })

    if (error) {
      console.error('Error loading comments:', error)
      return
    }

    if (data) {
      setComments(data)
    }
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setIsLoading(true)
    setError(null)

    if (!authorName.trim() || !content.trim()) {
      setError('Please fill in all fields')
      setIsLoading(false)
      return
    }

    try {
      const { error } = await supabase
        .from('comments')
        .insert([
          {
            post_id: postId,
            author_name: authorName.trim(),
            content: content.trim(),
          },
        ])

      if (error) throw error

      // Clear form
      setAuthorName('')
      setContent('')
      
      // Reload comments
      await loadComments()
    } catch (err) {
      console.error('Error posting comment:', err)
      setError('Failed to post comment. Please try again.')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="mt-12">
      <h2 className="text-2xl font-bold mb-6">Comments</h2>
      
      {/* Comment Form */}
      <form onSubmit={handleSubmit} className="mb-8 bg-white p-6 rounded-lg shadow-sm">
        <div className="mb-4">
          <label htmlFor="authorName" className="block text-gray-700 font-medium mb-2">
            Name
          </label>
          <input
            type="text"
            id="authorName"
            value={authorName}
            onChange={(e) => setAuthorName(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Your name"
            required
          />
        </div>
        
        <div className="mb-4">
          <label htmlFor="content" className="block text-gray-700 font-medium mb-2">
            Comment
          </label>
          <textarea
            id="content"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            rows={4}
            placeholder="Write your comment here..."
            required
          />
        </div>

        {error && (
          <div className="mb-4 text-red-600">
            {error}
          </div>
        )}

        <button
          type="submit"
          disabled={isLoading}
          className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-50"
        >
          {isLoading ? 'Posting...' : 'Post Comment'}
        </button>
      </form>

      {/* Comments List */}
      <div className="space-y-6">
        {comments.map((comment) => (
          <div key={comment.id} className="bg-white p-6 rounded-lg shadow-sm">
            <div className="flex justify-between items-start mb-2">
              <h3 className="font-medium text-gray-900">{comment.author_name}</h3>
              <time className="text-sm text-gray-500">{formatDate(comment.created_at)}</time>
            </div>
            <p className="text-gray-700 whitespace-pre-wrap">{comment.content}</p>
          </div>
        ))}
        
        {comments.length === 0 && (
          <p className="text-gray-500 text-center py-4">No comments yet. Be the first to comment!</p>
        )}
      </div>
    </div>
  )
}
