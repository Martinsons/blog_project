import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Privātuma politika | VeselībaTev',
  description: 'VeselībaTev privātuma politika - uzziniet, kā mēs aizsargājam jūsu datus un nodrošinām jūsu privātumu.',
}

export default function PrivacyPolicy() {
  return (
    <article className="prose prose-emerald lg:prose-lg max-w-4xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Privātuma politika</h1>
      
      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">1. Vispārīgā informācija</h2>
        <p className="mb-4">
          VeselībaTev ciena jūsu privātumu un apņemas aizsargāt jūsu personas datus.
          Šī privātuma politika informē par to, kā mēs apstrādājam jūsu personas datus.
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">2. Datu vākšana un izmantošana</h2>
        <p className="mb-4">
          Mēs vācam šādus datus:
        </p>
        <ul className="list-disc pl-6 mb-4">
          <li>Kontaktinformācija (vārds, e-pasts)</li>
          <li>Sīkdatnes un lietošanas dati</li>
          <li>Google Analytics dati</li>
        </ul>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">3. Sīkdatnes</h2>
        <p className="mb-4">
          Mēs izmantojam sīkdatnes, lai uzlabotu jūsu pārlūkošanas pieredzi.
          Jūs varat kontrolēt sīkdatņu izmantošanu savā pārlūkprogrammā.
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">4. Jūsu tiesības</h2>
        <p className="mb-4">
          Jums ir tiesības:
        </p>
        <ul className="list-disc pl-6 mb-4">
          <li>Piekļūt saviem datiem</li>
          <li>Labot savus datus</li>
          <li>Dzēst savus datus</li>
          <li>Iebilst pret datu apstrādi</li>
        </ul>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">5. Kontaktinformācija</h2>
        <p className="mb-4">
          Ja jums ir jautājumi par šo privātuma politiku, lūdzu sazinieties ar mums:
          <br />
          E-pasts: info@veselibatev.lv
        </p>
      </section>
    </article>
  )
}