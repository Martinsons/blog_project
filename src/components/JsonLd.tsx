export function JsonLd() {
  const structuredData = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: 'VeselībaTev',
    alternateName: ['Veseliba tev', 'Veselība', 'Veseliba', 'Veselibatev'],
    url: 'https://veselibatev.lv',
    description: 'Jūsu ceļvedis imunitātei un slimību ārstēšanai. Stipriniet imunitāti, ārstējiet sezonālās un hroniskās saslimšanas un rūpējieties par savu veselību ar mūsu dabīgajiem produktiem.',
    inLanguage: 'lv',
    publisher: {
      '@type': 'Organization',
      name: 'VeselībaTev',
      logo: {
        '@type': 'ImageObject',
        url: 'https://veselibatev.lv/logo.png'
      }
    }
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(structuredData)
      }}
    />
  )
} 