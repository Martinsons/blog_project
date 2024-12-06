import Link from 'next/link'

export default function Footer() {
  return (
    <footer className="bg-white border-t border-gray-100">
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand Section */}
          <div className="md:col-span-2">
            <Link href="/" className="text-2xl font-bold bg-gradient-to-r from-emerald-600 to-emerald-400 text-transparent bg-clip-text">
              Veselība.
            </Link>
            <p className="mt-4 text-gray-600 max-w-md">
              Jūsu uzticamais ceļvedis veselīgā dzīvesveidā. Mēs piedāvājam kvalitatīvus dabīgos produktus un noderīgu informāciju par veselīgu dzīvesveidu.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-semibold text-gray-900 mb-4">Produkti</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/blog?category=sirupi" className="text-gray-600 hover:text-emerald-600 transition-colors">
                  Sīrupi
                </Link>
              </li>
              <li>
                <Link href="/blog?category=pulveri" className="text-gray-600 hover:text-emerald-600 transition-colors">
                  Pulveri
                </Link>
              </li>
              <li>
                <Link href="/blog?category=sulas" className="text-gray-600 hover:text-emerald-600 transition-colors">
                  Sulas
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="font-semibold text-gray-900 mb-4">Kontakti</h3>
            <ul className="space-y-2">
              <li className="text-gray-600">
                <span className="font-medium">E-pasts:</span> info@veseliba.lv
              </li>
              <li className="text-gray-600">
                <span className="font-medium">Tālrunis:</span> +371 20000000
              </li>
              <li className="text-gray-600">
                <span className="font-medium">Darba laiks:</span><br />
                Pirmdiena - Piektdiena<br />
                9:00 - 18:00
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-gray-100">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-600 text-sm">
              {new Date().getFullYear()} Veselība. Visas tiesības aizsargātas.
            </p>
            <div className="flex space-x-6 mt-4 md:mt-0">
              <Link href="/privatuma-politika" className="text-gray-600 hover:text-emerald-600 text-sm transition-colors">
                Privātuma politika
              </Link>
              <Link href="/lietosanas-noteikumi" className="text-gray-600 hover:text-emerald-600 text-sm transition-colors">
                Lietošanas noteikumi
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
