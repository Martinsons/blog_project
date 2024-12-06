export interface Post {
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
