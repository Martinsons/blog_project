import { supabase } from './supabase'
import type { BlogPost, NewBlogPost } from './supabase'

export async function getAllPosts() {
  const { data, error } = await supabase
    .from('posts')
    .select('*')
    .order('created_at', { ascending: false })

  if (error) throw error
  return data as BlogPost[]
}

export async function getPostBySlug(slug: string) {
  const { data, error } = await supabase
    .from('posts')
    .select('*')
    .eq('slug', slug)
    .single()

  if (error) throw error
  return data as BlogPost
}

export async function createPost(post: NewBlogPost) {
  const { data, error } = await supabase
    .from('posts')
    .insert([post])
    .select()
    .single()

  if (error) throw error
  return data as BlogPost
}

export async function updatePost(id: number, post: Partial<BlogPost>) {
  const { data, error } = await supabase
    .from('posts')
    .update(post)
    .eq('id', id)
    .select()
    .single()

  if (error) throw error
  return data as BlogPost
}

export async function deletePost(id: number) {
  const { error } = await supabase
    .from('posts')
    .delete()
    .eq('id', id)

  if (error) throw error
}
