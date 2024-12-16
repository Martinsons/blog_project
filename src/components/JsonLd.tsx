export function JsonLd() {
  const websiteData = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: 'VeselībaTev',
    alternateName: ['Veseliba tev', 'Veselība', 'Veseliba', 'Veselibatev'],
    url: 'https://veselibatev.lv',
    description: 'Jūsu ceļvedis imunitātei un slimību ārstēšanai. Stipriniet imunitāti, ārstējiet sezonālās un hroniskās saslimšanas un rūpējieties par savu veselību ar mūsu dabīgajiem produktiem.',
    inLanguage: 'lv'
  }

  const organizationData = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'VeselībaTev',
    url: 'https://veselibatev.lv',
    logo: {
      '@type': 'ImageObject',
      url: 'https://veselibatev.lv/logo.png',
      width: '180',
      height: '180'
    },
    sameAs: [
      'https://facebook.com/veselibatev',
      'https://instagram.com/veselibatev',
      'https://twitter.com/veselibatev'
    ],
    address: {
      '@type': 'PostalAddress',
      addressCountry: 'LV',
      addressLocality: 'Talsi'
    },
    contactPoint: {
      '@type': 'ContactPoint',
      telephone: '+371-XXXXXXXX',
      contactType: 'customer service',
      areaServed: 'LV',
      availableLanguage: 'lv'
    }
  }

  const breadcrumbData = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      {
        '@type': 'ListItem',
        position: 1,
        name: 'Sākums',
        item: 'https://veselibatev.lv'
      },
      {
        '@type': 'ListItem',
        position: 2,
        name: 'Blogs',
        item: 'https://veselibatev.lv/blog'
      }
    ]
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(websiteData)
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(organizationData)
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(breadcrumbData)
        }}
      />
    </>
  )
} 