import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { Providers } from './providers'
import AdminButton from '@/components/AdminButton'
import HiddenLogin from '@/components/HiddenLogin'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Kantor Bychawa - Beata Dorsz | Wymiana Walut',
  description: 'Profesjonalny kantor w Bychawie. Najlepsze kursy wymiany walut EUR, USD, GBP, CHF, CAD. Beata Dorsz - zaufany kantor z wieloletnim doświadczeniem.',
  keywords: 'kantor, kantor bychawa, beata dorsz, wymiana walut, kursy walut, EUR, USD, GBP, CHF, CAD, PLN',
  authors: [{ name: 'Beata Dorsz' }],
  creator: 'Beata Dorsz',
  publisher: 'Kantor Bychawa',
  robots: 'index, follow',
  openGraph: {
    title: 'Kantor Bychawa - Beata Dorsz',
    description: 'Najlepsze kursy wymiany walut w Bychawie',
    url: 'https://kantor-bychawa.pl',
    siteName: 'Kantor Bychawa',
    locale: 'pl_PL',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Kantor Bychawa - Beata Dorsz',
    description: 'Najlepsze kursy wymiany walut w Bychawie',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="pl">
      <head>
        <link rel="canonical" href="https://kantor-bychawa.pl" />
        <meta name="geo.region" content="PL-LU" />
        <meta name="geo.placename" content="Bychawa" />
        <meta name="geo.position" content="51.3167;22.9333" />
        <meta name="ICBM" content="51.3167, 22.9333" />
      </head>
      <body className={inter.className}>
        <Providers>
          <div className="min-h-screen bg-gray-50">
            <header className="bg-white shadow-sm">
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center py-6">
                  <div className="relative">
                    <HiddenLogin>
                      <h1 className="text-3xl font-bold text-gray-900">
                        Kantor Bychawa
                      </h1>
                      <p className="text-sm text-gray-600">Beata Dorsz - Wymiana Walut</p>
                    </HiddenLogin>
                  </div>
                  <nav className="hidden md:flex space-x-8">
                    <a href="/" className="text-gray-700 hover:text-primary-600">
                      Kursy Walut
                    </a>
                    <a href="/wykresy" className="text-gray-700 hover:text-primary-600">
                      Historia Kursów
                    </a>
                    <a href="#kontakt" className="text-gray-700 hover:text-primary-600">
                      Kontakt
                    </a>
                    <AdminButton />
                  </nav>
                </div>
              </div>
            </header>
            <main>{children}</main>
            <footer className="bg-gray-800 text-white py-8 mt-12">
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                  <div>
                    <h3 className="text-lg font-semibold mb-4">Kantor Bychawa</h3>
                    <p className="text-gray-300">
                      Profesjonalna wymiana walut z wieloletnim doświadczeniem.
                      Najlepsze kursy w regionie.
                    </p>
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold mb-4">Kontakt</h3>
                    <div className="text-gray-300 space-y-2">
                      <p>Beata Dorsz</p>
                      <p>Bychawa, Polska</p>
                      <p>Tel: [Numer telefonu]</p>
                    </div>
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold mb-4">Godziny Otwarcia</h3>
                    <div className="text-gray-300 space-y-1">
                      <p>Pon-Pt: 9:00 - 17:00</p>
                      <p>Sobota: 9:00 - 14:00</p>
                      <p>Niedziela: Zamknięte</p>
                    </div>
                  </div>
                </div>
                <div className="border-t border-gray-700 mt-8 pt-8 text-center text-gray-400">
                  <p>&copy; 2024 Kantor Bychawa - Beata Dorsz. Wszystkie prawa zastrzeżone.</p>
                </div>
              </div>
            </footer>
          </div>
        </Providers>
      </body>
    </html>
  )
}
