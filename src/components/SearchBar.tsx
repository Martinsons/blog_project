'use client'

import { useState, useEffect, Suspense } from 'react'
import { Search, X } from 'lucide-react'
import { Input } from './ui/input'
import { useRouter, useSearchParams, usePathname } from 'next/navigation'
import { useDebounce } from '@/lib/hooks/useDebounce'

function SearchBarContent() {
  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()
  const [searchQuery, setSearchQuery] = useState(searchParams.get('search') || '')
  const debouncedSearch = useDebounce(searchQuery, 300)

  useEffect(() => {
    const handleClearSearch = () => {
      setSearchQuery('')
    }

    window.addEventListener('clearSearch', handleClearSearch)
    return () => {
      window.removeEventListener('clearSearch', handleClearSearch)
    }
  }, [])

  useEffect(() => {
    if (debouncedSearch && debouncedSearch.trim() !== '') {
      router.push(`/blog?search=${encodeURIComponent(debouncedSearch)}`)
    }
  }, [debouncedSearch, router])

  const clearSearch = () => {
    setSearchQuery('')
    if (pathname === '/blog') {
      router.push('/blog')
    }
  }

  return (
    <div className="relative w-full md:w-64">
      <div className="absolute inset-y-0 left-3 flex items-center pointer-events-none">
        <Search className="h-4 w-4 text-gray-400" />
      </div>
      <Input
        type="search"
        inputMode="search"
        placeholder="Meklēt rakstus..."
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        className="pl-10 pr-10"
      />
      {searchQuery && (
        <button
          onClick={clearSearch}
          className="absolute inset-y-0 right-3 flex items-center"
          aria-label="Clear search"
        >
          <X className="h-4 w-4 text-gray-400 hover:text-gray-600" />
        </button>
      )}
    </div>
  )
}

export default function SearchBar() {
  return (
    <Suspense fallback={
      <div className="relative w-full md:w-64">
        <div className="absolute inset-y-0 left-3 flex items-center pointer-events-none">
          <Search className="h-4 w-4 text-gray-400" />
        </div>
        <Input
          type="search"
          inputMode="search"
          placeholder="Meklēt rakstus..."
          className="pl-10"
          disabled
        />
      </div>
    }>
      <SearchBarContent />
    </Suspense>
  )
}
