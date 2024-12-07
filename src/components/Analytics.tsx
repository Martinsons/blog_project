'use client';

import { Analytics as VercelAnalytics } from '@vercel/analytics/react';
import CookieConsent from 'react-cookie-consent';
import Script from 'next/script';

export default function Analytics() {
  return (
    <>
      <VercelAnalytics />
      <Script
        src={`https://www.googletagmanager.com/gtag/js?id=G-6LCEB85RSK`}
        strategy="afterInteractive"
      />
      <Script id="google-analytics" strategy="afterInteractive">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', 'G-6LCEB85RSK');
        `}
      </Script>
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
  );
}
