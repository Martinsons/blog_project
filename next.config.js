/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
      },
      {
        protocol: 'https',
        hostname: '*.supabase.co',
      },
    ],
  },
  experimental: {
    serverActions: true,
  },
  async redirects() {
    return [
      {
        source: '/admin',
        destination: '/admin',
        permanent: true,
      },
      {
        source: '/login',
        destination: '/login',
        permanent: true,
      },
    ]
  },
}

module.exports = nextConfig
