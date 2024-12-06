'use client'

import { useState } from 'react'

export default function ContactForm() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    // TODO: Implement form submission logic
    console.log('Form submitted:', formData)
  }

  return (
    <div className="w-full max-w-4xl mx-auto px-4 py-16">
      <div className="text-center mb-12">
        <h2 className="text-3xl font-semibold mb-4 bg-gradient-to-r from-emerald-600 to-emerald-400 text-transparent bg-clip-text">
          Sazinies ar mums
        </h2>
        <p className="text-gray-600 max-w-2xl mx-auto">
          Ja Tev ir kādi jautājumi vai ieteikumi, droši sazinies ar mums. Mēs cenšamies atbildēt 24 stundu laikā.
        </p>
      </div>

      <div className="bg-white rounded-2xl p-8 shadow-lg relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-emerald-50/50 to-green-50/50" />
        
        <form onSubmit={handleSubmit} className="relative space-y-6">
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
              Vārds, uzvārds
            </label>
            <input
              type="text"
              id="name"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-shadow"
              placeholder="Jānis Bērziņš"
              required
            />
          </div>

          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
              E-pasta adrese
            </label>
            <input
              type="email"
              id="email"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-shadow"
              placeholder="janis.berzins@epasts.lv"
              required
            />
          </div>

          <div>
            <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">
              Ziņojums
            </label>
            <textarea
              id="message"
              value={formData.message}
              onChange={(e) => setFormData({ ...formData, message: e.target.value })}
              rows={4}
              className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-shadow resize-none"
              placeholder="Raksti savu ziņojumu šeit..."
              required
            />
          </div>

          <div className="text-right">
            <button
              type="submit"
              className="px-6 py-3 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 transition-colors"
            >
              Nosūtīt ziņojumu
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
