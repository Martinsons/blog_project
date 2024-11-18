import { supabase } from './client'
import type { Database } from './database.types'

type Post = Database['public']['Tables']['posts']['Row']
type NewPost = Database['public']['Tables']['posts']['Insert']
type UpdatePost = Database['public']['Tables']['posts']['Update']

export async function getAllPosts() {
  const { data, error } = await supabase
    .from('posts')
    .select('*')
    .order('created_at', { ascending: false })

  if (error) throw error
  return data
}

export async function getPublishedPosts() {
  const { data, error } = await supabase
    .from('posts')
    .select('*')
    .eq('published', true)
    .order('created_at', { ascending: false })

  if (error) throw error
  return data
}

export async function getPostBySlug(slug: string) {
  const { data, error } = await supabase
    .from('posts')
    .select('*')
    .eq('slug', slug)
    .single()

  if (error) throw error
  return data
}

export async function createPost(post: NewPost) {
  const { data, error } = await supabase
    .from('posts')
    .insert(post)
    .select()
    .single()

  if (error) throw error
  return data
}

export async function updatePost(id: number, post: UpdatePost) {
  const { data, error } = await supabase
    .from('posts')
    .update(post)
    .eq('id', id)
    .select()
    .single()

  if (error) throw error
  return data
}

export async function deletePost(id: number) {
  const { error } = await supabase
    .from('posts')
    .delete()
    .eq('id', id)

  if (error) throw error
}

export async function searchPosts(query: string) {
  const { data, error } = await supabase
    .from('posts')
    .select('*')
    .textSearch('search_vector', query)

  if (error) throw error
  return data
}

export async function getPopularPosts(currentPostId?: number, limit: number = 3) {
  const query = supabase
    .from('posts')
    .select('id, title, slug, image_url, created_at')
    .eq('published', true)
    .order('created_at', { ascending: false })
    .limit(limit)

  // If we have a current post ID, exclude it from the results
  if (currentPostId) {
    query.neq('id', currentPostId)
  }

  const { data, error } = await query

  if (error) throw error
  return data
}
