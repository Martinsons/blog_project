import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Missing Supabase environment variables')
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

export type BlogPost = {
  id: number
  title: string
  content: string
  slug: string
  created_at: string
  updated_at: string
  author_id?: string
  published: boolean
  tags?: string[]
}

export type NewBlogPost = Omit<BlogPost, 'id' | 'created_at' | 'updated_at'>
