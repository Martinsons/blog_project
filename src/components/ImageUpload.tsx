'use client'

import { useState } from 'react'
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'
import Image from 'next/image'
import { Upload, X } from 'lucide-react'

interface ImageUploadProps {
  publicURL?: string | null
  onUploadComplete: (url: string) => void
}

export default function ImageUpload({ publicURL, onUploadComplete }: ImageUploadProps) {
  const [uploading, setUploading] = useState(false)
  const [preview, setPreview] = useState<string | null>(publicURL || null)
  const supabase = createClientComponentClient()

  const uploadImage = async (file: File) => {
    try {
      setUploading(true)

      const fileExt = file.name.split('.').pop()
      const fileName = `${Math.random()}.${fileExt}`
      const { error: uploadError } = await supabase.storage
        .from('images')
        .upload(fileName, file)

      if (uploadError) {
        throw uploadError
      }

      const { data: { publicUrl } } = supabase.storage
        .from('images')
        .getPublicUrl(fileName)

      setPreview(publicUrl)
      onUploadComplete(publicUrl)
    } catch (error) {
      console.error('Error uploading image:', error)
      alert('Error uploading image!')
    } finally {
      setUploading(false)
    }
  }

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    if (file.size > 2 * 1024 * 1024) {
      alert('Attēls nedrīkst būt lielāks par 2MB')
      return
    }

    await uploadImage(file)
  }

  const removeImage = () => {
    setPreview(null)
    onUploadComplete('')
  }

  return (
    <div className="w-full">
      {preview ? (
        <div className="relative w-full aspect-video rounded-lg overflow-hidden">
          <Image
            src={preview}
            alt="Preview"
            fill
            className="object-cover"
          />
          <button
            onClick={removeImage}
            className="absolute top-2 right-2 p-1 bg-red-500 text-white rounded-full hover:bg-red-600 transition-colors"
            title="Noņemt attēlu"
          >
            <X size={20} />
          </button>
        </div>
      ) : (
        <label className="flex flex-col items-center justify-center w-full aspect-video border-2 border-dashed border-gray-300 rounded-lg cursor-pointer hover:bg-gray-50 transition-colors">
          <div className="flex flex-col items-center justify-center pt-5 pb-6">
            <Upload size={24} className="text-gray-400 mb-2" />
            <p className="mb-2 text-sm text-gray-500">
              <span className="font-semibold">Klikšķini</span> vai ievelc attēlu šeit
            </p>
            <p className="text-xs text-gray-500">PNG, JPG līdz 2MB</p>
          </div>
          <input
            type="file"
            className="hidden"
            accept="image/*"
            onChange={handleFileChange}
            disabled={uploading}
          />
        </label>
      )}
      {uploading && (
        <div className="mt-2 text-sm text-gray-500 text-center">
          Augšupielādē...
        </div>
      )}
    </div>
  )
}
