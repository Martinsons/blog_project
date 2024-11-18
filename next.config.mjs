/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
      },
      // Add any other image domains you plan to use
      {
        protocol: 'https',
        hostname: '*.supabase.co', // For Supabase Storage URLs
      },
    ],
  },
}

export default nextConfig
