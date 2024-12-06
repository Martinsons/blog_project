import Link from 'next/link'
import SearchBar from './SearchBar'

export default function Navbar() {
  return (
    <nav className="sticky top-0 w-full bg-white/80 backdrop-blur-sm border-b border-green-100 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Left: Logo */}
          <Link href="/" className="flex items-center space-x-2 group">
            <span className="text-2xl font-bold">
              <span className="text-emerald-600">Veselība</span>
              <span className="text-emerald-500">Tev</span>
            </span>
            <div className="h-2 w-2 rounded-full bg-emerald-500 group-hover:animate-pulse" />
          </Link>

          {/* Right: Search */}
          <div className="flex items-center">
            <SearchBar />
          </div>
        </div>
      </div>
    </nav>
  )
}
