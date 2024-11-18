import Link from 'next/link'

export default function Navbar() {
  return (
    <nav className="sticky top-0 w-full bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 z-50 shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <Link href="/" className="text-xl font-bold text-white">
            Blog
          </Link>
          <div className="flex space-x-4">
            <Link href="/blog" className="text-white hover:text-gray-200">
              Blog
            </Link>
            <Link href="/about" className="text-white hover:text-gray-200">
              About
            </Link>
          </div>
        </div>
      </div>
    </nav>
  )
}
