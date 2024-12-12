'use client'

import { useState } from 'react'
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'
import Image from 'next/image'
import { Upload, X } from 'lucide-react'

interface ImageUploadProps {
  publicURL?: string | null
  onUploadComplete: (imagePath: string, imageUrl: string) => void
}

export default function ImageUpload({ publicURL, onUploadComplete }: ImageUploadProps) {
  const [uploading, setUploading] = useState(false)
  const [preview, setPreview] = useState<string | null>(publicURL || null)
  const supabase = createClientComponentClient()

  const uploadImage = async (file: File) => {
    try {
      setUploading(true)

      // Optimize image before upload
      const optimizedImage = await optimizeImage(file)
      
      // Generate a more unique filename with timestamp and original name
      const timestamp = Date.now()
      const sanitizedName = file.name.toLowerCase().replace(/[^a-z0-9]+/g, '-')
      const fileExt = file.name.split('.').pop()
      const fileName = `${timestamp}-${sanitizedName}.${fileExt}`
      
      const { error: uploadError, data } = await supabase.storage
        .from('blog-assets')
        .upload(fileName, optimizedImage, {
          cacheControl: '3600',
          upsert: false
        })

      if (uploadError) {
        console.error('Upload error:', uploadError)
        throw uploadError
      }

      if (!data) {
        throw new Error('No data returned from upload')
      }

      const { data: { publicUrl } } = supabase.storage
        .from('blog-assets')
        .getPublicUrl(data.path)

      // Ensure the URL is using HTTPS
      const secureUrl = publicUrl.replace('http://', 'https://')
      
      setPreview(secureUrl)
      onUploadComplete(data.path, secureUrl)
    } catch (error) {
      console.error('Error uploading image:', error)
      alert('Failed to upload image. Please try again.')
    } finally {
      setUploading(false)
    }
  }

  const optimizeImage = async (file: File): Promise<Blob> => {
    return new Promise((resolve, reject) => {
      const img = document.createElement('img')
      const url = URL.createObjectURL(file)
      img.src = url
      
      img.onload = () => {
        URL.revokeObjectURL(url) // Clean up the object URL
        const canvas = document.createElement('canvas')
        const ctx = canvas.getContext('2d')
        if (!ctx) {
          reject(new Error('Failed to get canvas context'))
          return
        }

        // Calculate new dimensions while maintaining aspect ratio
        let { width, height } = img
        const maxDimension = 1920 // Max dimension for blog images
        
        if (width > height && width > maxDimension) {
          height = (height * maxDimension) / width
          width = maxDimension
        } else if (height > maxDimension) {
          width = (width * maxDimension) / height
          height = maxDimension
        }

        canvas.width = width
        canvas.height = height

        // Use better quality settings
        ctx.imageSmoothingEnabled = true
        ctx.imageSmoothingQuality = 'high'
        
        // Draw and compress
        ctx.drawImage(img, 0, 0, width, height)
        
        canvas.toBlob(
          (blob) => {
            if (blob) {
              resolve(blob)
            } else {
              reject(new Error('Failed to create blob'))
            }
          },
          'image/webp',
          0.85 // Good balance between quality and size
        )
      }

      img.onerror = () => {
        URL.revokeObjectURL(url) // Clean up the object URL on error
        reject(new Error('Failed to load image'))
      }
    })
  }

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    if (file.size > 5 * 1024 * 1024) { // Increased to 5MB since we'll optimize it
      alert('Attēls nedrīkst būt lielāks par 5MB')
      return
    }

    await uploadImage(file)
  }

  const removeImage = () => {
    setPreview(null)
    onUploadComplete('', '')
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
            unoptimized
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
            <p className="text-xs text-gray-500">PNG, JPG līdz 5MB</p>
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
