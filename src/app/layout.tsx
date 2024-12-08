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
  icons: {
    icon: [
      { url: '/favicon-32.png', sizes: '32x32', type: 'image/png' },
      { url: '/favicon-16.png', sizes: '16x16', type: 'image/png' },
    ],
    apple: [
      { url: '/apple-touch-icon.png', sizes: '180x180', type: 'image/png' },
    ],
  },
  title: {
    default: 'VeselībaTev - Jūsu ceļvedis imunitātei un slimību ārstēšanai',
    template: '%s | VeselībaTev'
  },
  description: 'Stipriniet imunitāti, ārstējiet sezonālās un hroniskās saslimšanas un rūpējieties par savu veselību ar mūsu dabīgajiem produktiem. Padomi, raksti un dabīgie produkti labākai dzīves kvalitātei.',
  keywords: [
    // Existing keywords
    'veselīgs dzīvesveids', 'dabīgie produkti', 'veselība', 'labsajūta', 'sīrupi', 'pulveri', 'sulas', 'latvija',
    
    // Health conditions & immunity
    'imunitāte', 'iesnas', 'klepus', 'vitamīni', 'minerālvielas', 'alerģija',
    
    // Natural remedies
    'dabīgie līdzekļi', 'ārstniecības augi', 'tējas', 'medus produkti', 'propoliss',
    
    // Seasonal terms
    'sezonālās slimības', 'saaukstēšanās', 'gripa', 'pavasara vitamīni', 'ziemas imunitāte',
    
    // Specific products
    'ehinācija', 'kumelītes', 'piparmētra', 'kliņģerītes', 'ingvers', 'ķiploki',
    
    // Wellness & prevention
    'profilakse', 'organisma attīrīšana', 'detoks', 'dabīgā ārstēšana', 'imūnsistēma',
    
    // Location specific
    'latvijas produkti', 'rīga', 'talsi', 'talsu rajons', 'dabīgie līdzekļi latvijā', 'veselības veikals'
  ],
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
