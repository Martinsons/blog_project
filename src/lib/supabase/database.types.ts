export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export interface Database {
  public: {
    Tables: {
      posts: {
        Row: {
          id: number
          title: string
          content: string
          slug: string
          created_at: string
          updated_at: string
          author_id: string | null
          published: boolean
          tags: string[] | null
          search_vector: unknown | null
          image_url: string | null
        }
        Insert: {
          title: string
          content: string
          slug: string
          created_at?: string
          updated_at?: string
          author_id?: string | null
          published?: boolean
          tags?: string[] | null
          image_url?: string | null
        }
        Update: {
          title?: string
          content?: string
          slug?: string
          created_at?: string
          updated_at?: string
          author_id?: string | null
          published?: boolean
          tags?: string[] | null
          image_url?: string | null
        }
      }
      comments: {
        Row: {
          id: number
          post_id: number
          author_name: string
          content: string
          created_at: string
        }
        Insert: {
          post_id: number
          author_name: string
          content: string
          created_at?: string
        }
        Update: {
          post_id?: number
          author_name?: string
          content?: string
          created_at?: string
        }
      }
      profiles: {
        Row: {
          id: string
          username: string | null
          display_name: string | null
          avatar_url: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id: string
          username?: string | null
          display_name?: string | null
          avatar_url?: string | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          username?: string | null
          display_name?: string | null
          avatar_url?: string | null
          created_at?: string
          updated_at?: string
        }
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
  }
}
