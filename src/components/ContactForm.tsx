'use client'

import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { contactFormSchema, type ContactFormData } from '@/lib/schemas/contact'
import { Loader2 } from 'lucide-react'

export default function ContactForm() {
  const [submitStatus, setSubmitStatus] = useState<{
    type: 'success' | 'error' | null
    message: string | null
  }>({ type: null, message: null })

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting }
  } = useForm<ContactFormData>({
    resolver: zodResolver(contactFormSchema)
  })

  const onSubmit = async (data: ContactFormData) => {
    try {
      setSubmitStatus({ type: null, message: null })
      
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      })

      const result = await response.json()

      if (!response.ok) {
        console.error('Server response:', result)
        throw new Error(result.error || 'Failed to send message')
      }

      setSubmitStatus({
        type: 'success',
        message: 'Paldies! Jūsu ziņojums ir nosūtīts. Mēs ar Jums sazināsimies tuvākajā laikā.'
      })
      reset()
    } catch (error) {
      console.error('Submission error:', error)
      setSubmitStatus({
        type: 'error',
        message: error instanceof Error ? error.message : 'Diemžēl, radās kļūda sūtot ziņojumu. Lūdzu, mēģiniet vēlreiz vai sazinieties ar mums pa e-pastu.'
      })
    }
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
        
        {submitStatus.type && (
          <div
            className={`mb-6 p-4 rounded-lg ${
              submitStatus.type === 'success'
                ? 'bg-emerald-50 text-emerald-800 border border-emerald-200'
                : 'bg-red-50 text-red-800 border border-red-200'
            }`}
          >
            {submitStatus.message}
          </div>
        )}
        
        <form onSubmit={handleSubmit(onSubmit)} className="relative space-y-6">
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
              Vārds, uzvārds
            </label>
            <input
              type="text"
              id="name"
              {...register('name')}
              className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-shadow"
              placeholder="Jānis Bērziņš"
            />
            {errors.name && (
              <p className="mt-1 text-sm text-red-600">{errors.name.message}</p>
            )}
          </div>

          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
              E-pasta adrese
            </label>
            <input
              type="email"
              id="email"
              {...register('email')}
              className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-shadow"
              placeholder="janis.berzins@epasts.lv"
            />
            {errors.email && (
              <p className="mt-1 text-sm text-red-600">{errors.email.message}</p>
            )}
          </div>

          <div>
            <label htmlFor="subject" className="block text-sm font-medium text-gray-700 mb-1">
              Tēma
            </label>
            <input
              type="text"
              id="subject"
              {...register('subject')}
              className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-shadow"
              placeholder="Par ko vēlaties runāt?"
            />
            {errors.subject && (
              <p className="mt-1 text-sm text-red-600">{errors.subject.message}</p>
            )}
          </div>

          <div>
            <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">
              Ziņojums
            </label>
            <textarea
              id="message"
              {...register('message')}
              rows={4}
              className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-shadow resize-none"
              placeholder="Raksti savu ziņojumu šeit..."
            />
            {errors.message && (
              <p className="mt-1 text-sm text-red-600">{errors.message.message}</p>
            )}
          </div>

          <div className="text-right">
            <button
              type="submit"
              disabled={isSubmitting}
              className="px-6 py-3 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed inline-flex items-center"
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                  Sūta ziņojumu...
                </>
              ) : (
                'Nosūtīt ziņojumu'
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
