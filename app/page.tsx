import { Suspense } from 'react'
import CurrencyTable from '@/components/CurrencyTable'
import { getCurrencyRates } from '@/lib/currency'

export default async function Home() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Hero Section */}
      <section className="text-center mb-12">
        <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
          Kantor Bychawa - Najlepsze Kursy Walut
        </h1>
        <p className="text-xl text-gray-600 mb-6">
          Profesjonalna wymiana walut z Beatą Dorsz. Konkurencyjne kursy EUR, USD, GBP, CHF, CAD.
        </p>
        <div className="bg-primary-50 border border-primary-200 rounded-lg p-6 max-w-2xl mx-auto">
          <h2 className="text-lg font-semibold text-primary-700 mb-2">
            Dlaczego wybrać nasz kantor w Bychawie?
          </h2>
          <ul className="text-left text-gray-700 space-y-2">
            <li>✓ Najlepsze kursy wymiany walut w regionie</li>
            <li>✓ Wieloletnie doświadczenie Beaty Dorsz</li>
            <li>✓ Szybka i bezpieczna obsługa</li>
            <li>✓ Aktualne kursy walut online</li>
          </ul>
        </div>
      </section>

      {/* Currency Rates Section */}
      <section className="mb-12">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            Aktualne Kursy Walut
          </h2>
          <p className="text-gray-600">
            Sprawdź najnowsze kursy kupna i sprzedaży walut w naszym kantorze
          </p>
        </div>
        
        <Suspense fallback={<CurrencyTableSkeleton />}>
          <CurrencyTable />
        </Suspense>
        
        <div className="text-center mt-8">
          <a 
            href="/wykresy"
            className="bg-primary-600 hover:bg-primary-700 text-white px-6 py-3 rounded-md font-medium inline-flex items-center"
          >
            📊 Zobacz historię kursów walut
          </a>
        </div>
      </section>

      {/* Contact Section */}
      <section id="kontakt" className="bg-white rounded-lg shadow-lg p-8">
        <h2 className="text-3xl font-bold text-gray-900 mb-6 text-center">
          Kontakt
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div>
            <h3 className="text-xl font-semibold text-gray-900 mb-4">
              Informacje Kontaktowe
            </h3>
            <div className="space-y-3">
              <p className="flex items-center text-gray-700">
                <span className="font-medium">Właściciel:</span>
                <span className="ml-2">Beata Dorsz</span>
              </p>
              <p className="flex items-center text-gray-700">
                <span className="font-medium">Lokalizacja:</span>
                <span className="ml-2">Bychawa, woj. lubelskie</span>
              </p>
              <p className="flex items-center text-gray-700">
                <span className="font-medium">Telefon:</span>
                <span className="ml-2">[Numer telefonu]</span>
              </p>
            </div>
          </div>
          <div>
            <h3 className="text-xl font-semibold text-gray-900 mb-4">
              Godziny Otwarcia
            </h3>
            <div className="space-y-2 text-gray-700">
              <div className="flex justify-between">
                <span>Poniedziałek - Piątek:</span>
                <span className="font-medium">9:00 - 17:00</span>
              </div>
              <div className="flex justify-between">
                <span>Sobota:</span>
                <span className="font-medium">9:00 - 14:00</span>
              </div>
              <div className="flex justify-between">
                <span>Niedziela:</span>
                <span className="font-medium text-red-600">Zamknięte</span>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

function CurrencyTableSkeleton() {
  return (
    <div className="bg-white shadow-lg rounded-lg overflow-hidden">
      <div className="animate-pulse">
        <div className="bg-gray-200 h-12"></div>
        {[...Array(5)].map((_, i) => (
          <div key={i} className="border-b border-gray-200 p-4">
            <div className="flex justify-between items-center">
              <div className="h-4 bg-gray-200 rounded w-16"></div>
              <div className="h-4 bg-gray-200 rounded w-20"></div>
              <div className="h-4 bg-gray-200 rounded w-20"></div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
