import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'

export async function ensureBucketExists() {
  const supabase = createClientComponentClient()
  
  try {
    // Check if bucket exists
    const { data: buckets, error: bucketsError } = await supabase
      .storage
      .listBuckets()

    if (bucketsError) {
      console.error('Error listing buckets:', bucketsError)
      return false
    }

    const blogBucket = buckets?.find(bucket => bucket.name === 'blog-assets')
    
    if (!blogBucket) {
      console.log('Blog assets bucket not found, attempting to create...')
      // Bucket will be created via SQL if it doesn't exist
      return false
    }

    return true
  } catch (error) {
    console.error('Error checking bucket:', error)
    return false
  }
}
