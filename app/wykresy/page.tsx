import CurrencyChart from '@/components/CurrencyChart'

const currencies = [
  { code: 'EUR', name: 'Euro', flag: '🇪🇺' },
  { code: 'USD', name: 'Dolar amerykański', flag: '🇺🇸' },
  { code: 'GBP', name: 'Funt brytyjski', flag: '🇬🇧' },
  { code: 'CHF', name: 'Frank szwajcarski', flag: '🇨🇭' },
  { code: 'CAD', name: 'Dolar kanadyjski', flag: '🇨🇦' },
]

export const metadata = {
  title: 'Historia Kursów Walut - Kantor Bychawa | Beata Dorsz',
  description: 'Sprawdź historyczne kursy wymiany walut EUR, USD, GBP, CHF, CAD w kantorze Bychawa. Wykresy zmian kursów walut z ostatnich dni, tygodni i miesięcy.',
  keywords: 'historia kursów walut, wykresy walut, kantor bychawa, kursy historyczne, EUR USD GBP CHF CAD',
}

export default function ChartsPage() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header Section */}
      <section className="text-center mb-12">
        <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
          Historia Kursów Walut
        </h1>
        <p className="text-xl text-gray-600 mb-6">
          Sprawdź jak zmieniały się kursy wymiany walut w naszym kantorze w Bychawie
        </p>
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 max-w-2xl mx-auto">
          <h2 className="text-lg font-semibold text-blue-700 mb-2">
            Transparentność naszych kursów
          </h2>
          <p className="text-blue-600">
            Udostępniamy pełną historię naszych kursów wymiany walut, abyś mógł śledzić trendy 
            i podejmować najlepsze decyzje dotyczące wymiany walut.
          </p>
        </div>
      </section>

      {/* Charts Grid */}
      <section className="mb-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {currencies.map((currency) => (
            <CurrencyChart key={currency.code} currency={currency.code} />
          ))}
        </div>
      </section>

      {/* Information Section */}
      <section className="bg-white rounded-lg shadow-lg p-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">
          Informacje o wykresach
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-3">
              Jak czytać wykresy?
            </h3>
            <ul className="text-gray-700 space-y-2">
              <li>🟢 <strong>Linia zielona (Kupno):</strong> Kurs po którym kupujemy od Ciebie walutę</li>
              <li>🔴 <strong>Linia czerwona (Sprzedaż):</strong> Kurs po którym sprzedajemy Ci walutę</li>
              <li>📅 <strong>Okresy:</strong> 7 dni, 30 dni, 90 dni</li>
              <li>⏰ <strong>Aktualizacja:</strong> Kursy aktualizowane na bieżąco</li>
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-3">
              Dlaczego warto śledzić trendy?
            </h3>
            <ul className="text-gray-700 space-y-2">
              <li>📈 Planowanie wymiany w najkorzystniejszym momencie</li>
              <li>💡 Zrozumienie wahań kursów walut</li>
              <li>🎯 Podejmowanie świadomych decyzji finansowych</li>
              <li>⭐ Transparentność i zaufanie do naszego kantoru</li>
            </ul>
          </div>
        </div>
        
        <div className="mt-8 text-center">
          <a 
            href="/"
            className="bg-primary-600 hover:bg-primary-700 text-white px-6 py-3 rounded-md font-medium inline-flex items-center"
          >
            ← Powrót do aktualnych kursów
          </a>
        </div>
      </section>
    </div>
  )
}
