import { NextResponse } from 'next/server'
import { Resend } from 'resend'
import { contactFormSchema } from '@/lib/schemas/contact'

// Initialize Resend with error handling
if (!process.env.RESEND_API_KEY) {
  console.error('RESEND_API_KEY is not defined in environment variables')
}
const resend = new Resend(process.env.RESEND_API_KEY)

export async function POST(request: Request) {
  if (!process.env.RESEND_API_KEY) {
    return NextResponse.json(
      { error: 'Email service not configured' },
      { status: 503 }
    )
  }

  try {
    const body = await request.json()
    console.log('Received form data:', body)
    
    // Validate the request body
    const result = contactFormSchema.safeParse(body)
    if (!result.success) {
      console.error('Validation error:', result.error.errors)
      return NextResponse.json(
        { error: 'Invalid form data', details: result.error.errors },
        { status: 400 }
      )
    }

    const { name, email, subject, message } = result.data
    console.log('Validated data:', { name, email, subject, message })

    try {
      const { data, error } = await resend.emails.send({
        from: 'VeselibaTev <noreply@veselibatev.lv>',
        to: ['martins.martinsons@yahoo.com'],
        replyTo: email,
        subject: `[VeselibaTev] ${subject}`,
        html: `
          <h2>Jauns ziņojums no VeselibaTev kontaktformas</h2>
          <p><strong>No:</strong> ${name} (${email})</p>
          <p><strong>Tēma:</strong> ${subject}</p>
          <p><strong>Ziņojums:</strong></p>
          <p>${message.replace(/\n/g, '<br>')}</p>
        `,
      })

      if (error) {
        console.error('Resend API error:', error)
        return NextResponse.json(
          { error: 'Failed to send email', details: error },
          { status: 500 }
        )
      }

      console.log('Email sent successfully:', data)
      return NextResponse.json(
        { message: 'Email sent successfully', id: data?.id },
        { status: 200 }
      )
    } catch (emailError) {
      console.error('Resend error details:', emailError)
      return NextResponse.json(
        { error: 'Email service error', details: emailError },
        { status: 500 }
      )
    }
  } catch (error) {
    console.error('Server error details:', error)
    return NextResponse.json(
      { error: 'Internal server error', details: error },
      { status: 500 }
    )
  }
}
