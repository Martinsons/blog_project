import { z } from 'zod'

export const contactFormSchema = z.object({
  name: z.string().min(2, 'Vārdam jābūt vismaz 2 rakstzīmes garam'),
  email: z.string().email('Lūdzu, ievadiet derīgu e-pasta adresi'),
  subject: z.string().min(5, 'Tēmai jābūt vismaz 5 rakstzīmes garai'),
  message: z.string().min(10, 'Ziņojumam jābūt vismaz 10 rakstzīmes garam'),
})

export type ContactFormData = z.infer<typeof contactFormSchema>
