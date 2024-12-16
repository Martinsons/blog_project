import './globals.css'
import { Plus_Jakarta_Sans } from 'next/font/google'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import Analytics from '../components/Analytics'
import { JsonLd } from '../components/JsonLd'
import { Metadata } from 'next'

const jakarta = Plus_Jakarta_Sans({ 
  subsets: ['latin', 'latin-ext'],
  display: 'swap',
  preload: true,
  fallback: ['system-ui', 'sans-serif'],
  adjustFontFallback: true,
  variable: '--font-jakarta'
})

export const metadata: Metadata = {
  metadataBase: new URL('https://veselibatev.lv'),
  title: {
    default: 'VeselībaTev - Veselība tev | Jūsu ceļvedis imunitātei un slimību ārstēšanai',
    template: '%s | VeselībaTev'
  },
  description: 'Stipriniet imunitāti, ārstējiet sezonālās un hroniskās saslimšanas un rūpējieties par savu veselību ar mūsu dabīgajiem produktiem. Padomi, raksti un dabīgie produkti labākai dzīves kvalitātei.',
  keywords: [
    // Brand variations
    'veselibatev', 'veselība tev', 'veselība', 'veseliba',
    
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
  alternates: {
    canonical: 'https://veselibatev.lv'
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
    nocache: true,
  },
  icons: {
    icon: [
      { url: '/favicon-32.png', sizes: '32x32', type: 'image/png' },
      { url: '/favicon-16.png', sizes: '16x16', type: 'image/png' },
    ],
    apple: [
      { url: '/apple-touch-icon.png', sizes: '180x180', type: 'image/png' },
    ],
    other: [
      {
        rel: 'mask-icon',
        url: '/safari-pinned-tab.svg',
        color: '#5bbad5'
      }
    ]
  },
  manifest: '/site.webmanifest',
  verification: {
    google: 'oXNV5W8X4-hdy7XmInyUeIDg3ywxWRRdWl3RMUh1EDU',
    yandex: 'yandex-verification-code',
    other: {
      'facebook-domain-verification': ['facebook-domain-verification-code']
    }
  },
  openGraph: {
    type: 'website',
    locale: 'lv_LV',
    url: 'https://veselibatev.lv',
    title: 'VeselībaTev - Veselība tev | Jūsu ceļvedis imunitātei',
    description: 'Stipriniet imunitāti, ārstējiet sezonālās un hroniskās saslimšanas un rūpējieties par savu veselību ar mūsu dabīgajiem produktiem.',
    siteName: 'VeselībaTev',
    images: [
      {
        url: 'https://veselibatev.lv/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'VeselībaTev - Jūsu ceļvedis veselībai'
      }
    ]
  },
  twitter: {
    card: 'summary_large_image',
    site: '@veselibatev',
    creator: '@veselibatev',
    title: 'VeselībaTev - Veselība tev | Jūsu ceļvedis imunitātei',
    description: 'Stipriniet imunitāti, ārstējiet sezonālās un hroniskās saslimšanas un rūpējieties par savu veselību ar mūsu dabīgajiem produktiem.',
    images: ['https://veselibatev.lv/twitter-image.jpg']
  },
  category: 'health',
  classification: 'health and wellness',
  referrer: 'origin-when-cross-origin',
  creator: 'VeselībaTev',
  publisher: 'VeselībaTev',
  formatDetection: {
    telephone: true,
    date: true,
    address: true,
    email: true
  }
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="lv" className={jakarta.variable}>
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=5" />
        <link rel="alternate" href="https://veselibatev.lv" hrefLang="lv" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        <meta name="theme-color" content="#ffffff" />
        <meta name="mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="default" />
        <meta name="msapplication-TileColor" content="#ffffff" />
        <meta name="msapplication-config" content="/browserconfig.xml" />
      </head>
      <body className="min-h-screen flex flex-col font-sans antialiased">
        <JsonLd />
        <Navbar />
        <main className="flex-1">{children}</main>
        <Analytics />
        <Footer />
      </body>
    </html>
  )
}
