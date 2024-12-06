'use client'

import Link from 'next/link'
import { Suspense } from 'react'

export const dynamic = 'force-dynamic'
export const runtime = 'edge'

function NotFoundContent() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-emerald-50/50 to-transparent">
      <div className="text-center">
        <h2 className="text-4xl font-bold text-gray-900 mb-4">404 - Lapa nav atrasta</h2>
        <p className="text-lg text-gray-600 mb-8">Atvainojiet, meklētā lapa neeksistē.</p>
        <Link 
          href="/"
          className="px-6 py-3 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 transition-colors"
        >
          Atgriezties sākumlapā
        </Link>
      </div>
    </div>
  )
}

export default function NotFound() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <NotFoundContent />
    </Suspense>
  )
}
