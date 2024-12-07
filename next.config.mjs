/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  images: {
    unoptimized: true,
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
  trailingSlash: true,
}

export default nextConfig
