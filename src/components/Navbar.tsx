'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Menu, X } from 'lucide-react'
import SearchBar from './SearchBar'
import { useRouter } from 'next/navigation'

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const router = useRouter()

  const handleLogoClick = (e: React.MouseEvent) => {
    e.preventDefault()
    // First navigate to home
    router.push('/')
    // Then dispatch a custom event that SearchBar will listen for
    window.dispatchEvent(new CustomEvent('clearSearch'))
  }

  return (
    <nav className="sticky top-0 w-full bg-white/80 backdrop-blur-sm border-b border-green-100 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Left: Logo */}
          <Link 
            href="/" 
            className="flex items-center space-x-2 group"
            onClick={handleLogoClick}
          >
            <span className="text-xl sm:text-2xl font-bold">
              <span className="text-emerald-600">Veselība</span>
              <span className="text-emerald-500">Tev</span>
            </span>
            <div className="h-2 w-2 rounded-full bg-emerald-500 group-hover:animate-pulse" />
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <Link href="/blog" className="text-gray-600 hover:text-emerald-600 transition-colors">
              Raksti
            </Link>
            <Link href="/#categories" className="text-gray-600 hover:text-emerald-600 transition-colors">
              Produkti
            </Link>
            <SearchBar />
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden p-2 rounded-lg hover:bg-gray-100 transition-colors"
            aria-label={isMenuOpen ? 'Aizvērt izvēlni' : 'Atvērt izvēlni'}
          >
            {isMenuOpen ? (
              <X className="h-6 w-6 text-gray-600" />
            ) : (
              <Menu className="h-6 w-6 text-gray-600" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden border-t border-gray-100">
          <div className="px-4 py-4 space-y-4">
            <Link
              href="/blog"
              className="block py-2 text-gray-600 hover:text-emerald-600 transition-colors"
              onClick={() => setIsMenuOpen(false)}
            >
              Raksti
            </Link>
            <Link
              href="/#categories"
              className="block py-2 text-gray-600 hover:text-emerald-600 transition-colors"
              onClick={() => setIsMenuOpen(false)}
            >
              Produkti
            </Link>
            <div className="py-2">
              <SearchBar />
            </div>
          </div>
        </div>
      )}
    </nav>
  )
}
