import './globals.css'
import { Plus_Jakarta_Sans } from 'next/font/google'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import Analytics from '../components/Analytics'
import { Metadata } from 'next'

const jakarta = Plus_Jakarta_Sans({ 
  subsets: ['latin', 'latin-ext'],
  variable: '--font-jakarta'
})

export const metadata: Metadata = {
  title: {
    default: 'VeselībaTev - Jūsu ceļvedis veselīgā dzīvesveidā',
    template: '%s | VeselībaTev'
  },
  description: 'Atklājiet veselīga dzīvesveida noslēpumus ar VeselībaTev. Padomi, raksti un dabīgie produkti labākai dzīves kvalitātei.',
  keywords: ['veselīgs dzīvesveids', 'dabīgie produkti', 'veselība', 'labsajūta', 'sīrupi', 'pulveri', 'sulas', 'latvija'],
  verification: {
    google: 'oXNV5W8X4-hdy7XmInyUeIDg3ywxWRRdWl3RMUh1EDU'
  }
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="lv">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </head>
      <body className={`${jakarta.variable} min-h-screen flex flex-col font-sans antialiased`}>
        <Navbar />
        <main className="flex-1">{children}</main>
        <Analytics />
        <Footer />
      </body>
    </html>
  )
}
