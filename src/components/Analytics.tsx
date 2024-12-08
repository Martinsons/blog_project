'use client';

import { useEffect } from 'react'
import dynamic from 'next/dynamic'
import Script from 'next/script'
import { Analytics as VercelAnalytics } from '@vercel/analytics/react'
import Cookies from 'js-cookie'

const CookieConsent = dynamic(() => import('react-cookie-consent'), {
  ssr: false
})

export default function Analytics() {
  useEffect(() => {
    // Only initialize GA if consent is given
    const hasConsent = Cookies.get('veselibatev-consent') === 'true'
    if (hasConsent && typeof window !== 'undefined') {
      window.dataLayer = window.dataLayer || []
      function gtag(...args: any[]) {
        window.dataLayer.push(args)
      }
      gtag('consent', 'default', {
        'analytics_storage': 'granted'
      })
    }
  }, [])

  return (
    <>
      <VercelAnalytics 
        mode={'production'} 
        debug={false}
      />
      {/* Only load GA scripts if consent is given */}
      {Cookies.get('veselibatev-consent') === 'true' && (
        <>
          <Script
            src={`https://www.googletagmanager.com/gtag/js?id=G-6LCEB85RSK`}
            strategy="afterInteractive"
          />
          <Script id="google-analytics" strategy="afterInteractive">
            {`
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', 'G-6LCEB85RSK', {
                page_path: window.location.pathname,
                cookie_flags: 'SameSite=None;Secure'
              });
            `}
          </Script>
        </>
      )}
      <CookieConsent
        location="bottom"
        buttonText="Piekrītu"
        declineButtonText="Nepiekrītu"
        cookieName="veselibatev-consent"
        style={{ background: "#059669" }}
        buttonStyle={{ 
          background: "#fff", 
          color: "#059669", 
          fontSize: "13px",
          borderRadius: "6px",
          padding: "8px 16px"
        }}
        declineButtonStyle={{
          background: "transparent",
          border: "1px solid #fff",
          color: "#fff",
          fontSize: "13px",
          borderRadius: "6px",
          padding: "8px 16px"
        }}
        expires={150}
        onAccept={() => {
          // Reload the page to initialize analytics after consent
          window.location.reload()
        }}
      >
        Mēs izmantojam sīkdatnes, lai uzlabotu jūsu pārlūkošanas pieredzi. 
        <span style={{ fontSize: "12px" }}> 
          Uzziniet vairāk mūsu{" "}
          <a href="/privatuma-politika" style={{ textDecoration: "underline", color: "#fff" }}>
            privātuma politikā
          </a>
          .
        </span>
      </CookieConsent>
    </>
  )
}
