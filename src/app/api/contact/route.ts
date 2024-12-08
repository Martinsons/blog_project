import { NextResponse } from 'next/server'
import nodemailer from 'nodemailer'
import { contactFormSchema } from '@/lib/schemas/contact'

// Configure Nodemailer transporter
const transporter = nodemailer.createTransport({
  host: 'smtp.zoho.eu',
  port: 465,
  secure: true,
  auth: {
    user: 'info@veselibatev.lv',
    pass: process.env.EMAIL_PASSWORD
  }
})

export async function POST(request: Request) {
  if (!process.env.EMAIL_PASSWORD) {
    return NextResponse.json(
      { error: 'Email service not configured' },
      { status: 503 }
    )
  }

  try {
    const body = await request.json()
    console.log('Received form data:', body)
    
    const result = contactFormSchema.safeParse(body)
    if (!result.success) {
      console.error('Validation error:', result.error.errors)
      return NextResponse.json(
        { error: 'Invalid form data', details: result.error.errors },
        { status: 400 }
      )
    }

    const { name, email, subject, message } = result.data

    try {
      await transporter.sendMail({
        from: 'VeselībaTev <info@veselibatev.lv>',
        to: 'info@veselibatev.lv',
        replyTo: email,
        subject: `[VeselibaTev] ${subject}`,
        html: `
          <h2>Jauns ziņojums no VeselibaTev kontaktformas</h2>
          <p><strong>No:</strong> ${name} (${email})</p>
          <p><strong>Tēma:</strong> ${subject}</p>
          <p><strong>Ziņojums:</strong></p>
          <p>${message.replace(/\n/g, '<br>')}</p>
        `
      })

      return NextResponse.json({ success: true })
    } catch (error) {
      console.error('Error sending email:', error)
      return NextResponse.json(
        { error: 'Failed to send email' },
        { status: 500 }
      )
    }
  } catch (error) {
    console.error('Error processing request:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}
