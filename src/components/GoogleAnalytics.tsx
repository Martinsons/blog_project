'use client';

import Script from 'next/script';
import { useEffect } from 'react';
import Cookies from 'js-cookie';

const GA_ID = 'G-6LCEB85RSK';

export default function GoogleAnalytics() {
  useEffect(() => {
    const consent = Cookies.get('veselibatev-consent');
    if (consent === 'true') {
      // Initialize GA only if user has consented
      window.dataLayer = window.dataLayer || [];
      function gtag(...args: any[]) {
        window.dataLayer.push(args);
      }
      gtag('js', new Date());
      gtag('config', GA_ID, {
        page_path: window.location.pathname,
      });
    }
  }, []);

  if (Cookies.get('veselibatev-consent') !== 'true') {
    return null;
  }

  return (
    <>
      <Script
        src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`}
        strategy="afterInteractive"
      />
      <Script id="google-analytics" strategy="afterInteractive">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', '${GA_ID}', {
            page_path: window.location.pathname,
          });
        `}
      </Script>
    </>
  );
}
