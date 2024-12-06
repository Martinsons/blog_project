'use client'

import { useState, useEffect } from 'react'
import { Search, X } from 'lucide-react'
import { Input } from './ui/input'
import { useRouter, useSearchParams, usePathname } from 'next/navigation'
import { useDebounce } from '@/lib/hooks/useDebounce'

export default function SearchBar() {
  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()
  const [searchQuery, setSearchQuery] = useState(searchParams.get('search') || '')
  const debouncedSearch = useDebounce(searchQuery, 300)

  useEffect(() => {
    // Only navigate if we're actually searching
    if (debouncedSearch) {
      // If we're not already on the blog page, navigate there with the search
      if (pathname !== '/blog') {
        router.push(`/blog?search=${encodeURIComponent(debouncedSearch)}`)
      } else {
        // If we're on the blog page, just update the search parameter
        router.push(`/blog?search=${encodeURIComponent(debouncedSearch)}`)
      }
    }
  }, [debouncedSearch, router, pathname])

  const clearSearch = () => {
    setSearchQuery('')
    // Only navigate to /blog if we're already on the blog page
    if (pathname === '/blog') {
      router.push('/blog')
    }
  }

  return (
    <div className="relative w-64">
      <div className="absolute inset-y-0 left-3 flex items-center pointer-events-none">
        <Search className="h-4 w-4 text-gray-400" />
      </div>
      <Input
        type="text"
        placeholder="Meklēt rakstus..."
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        className="w-full pl-10 pr-10 py-2 text-sm border-0 bg-gray-100/80 rounded-full focus:ring-2 focus:ring-blue-500"
      />
      {searchQuery && (
        <button
          onClick={clearSearch}
          className="absolute inset-y-0 right-3 flex items-center text-gray-400 hover:text-gray-600"
        >
          <X className="h-4 w-4" />
        </button>
      )}
    </div>
  )
}
