import { getCurrencyRates } from '@/lib/currency'

const currencies = [
  { code: 'EUR', name: 'Euro', flag: '🇪🇺' },
  { code: 'USD', name: 'Dolar amerykański', flag: '🇺🇸' },
  { code: 'GBP', name: 'Funt brytyjski', flag: '🇬🇧' },
  { code: 'CHF', name: 'Frank szwajcarski', flag: '🇨🇭' },
  { code: 'CAD', name: 'Dolar kanadyjski', flag: '🇨🇦' },
]

export default async function CurrencyTable() {
  const rates = await getCurrencyRates()

  return (
    <div className="currency-table">
      <div className="bg-primary-600 text-white px-6 py-4">
        <div className="grid grid-cols-4 gap-4 font-semibold">
          <div>Waluta</div>
          <div className="text-center">Kupujemy</div>
          <div className="text-center">Sprzedajemy</div>
          <div className="text-center">Różnica</div>
        </div>
      </div>
      
      <div className="divide-y divide-gray-200">
        {currencies.map((currency) => {
          const rate = rates.find(r => r.currency === currency.code)
          const spread = rate ? ((rate.askRate - rate.bidRate) / rate.bidRate * 100).toFixed(2) : '0.00'
          
          return (
            <div key={currency.code} className="currency-row">
              <div className="grid grid-cols-4 gap-4 currency-cell">
                <div className="flex items-center space-x-3">
                  <span className="text-2xl">{currency.flag}</span>
                  <div>
                    <div className="font-semibold text-gray-900">{currency.code}</div>
                    <div className="text-sm text-gray-500">{currency.name}</div>
                  </div>
                </div>
                
                <div className="text-center">
                  <div className="text-lg font-semibold text-green-600">
                    {rate ? rate.bidRate.toFixed(4) : '-.----'}
                  </div>
                  <div className="text-xs text-gray-500">PLN</div>
                </div>
                
                <div className="text-center">
                  <div className="text-lg font-semibold text-red-600">
                    {rate ? rate.askRate.toFixed(4) : '-.----'}
                  </div>
                  <div className="text-xs text-gray-500">PLN</div>
                </div>
                
                <div className="text-center">
                  <div className="text-sm font-medium text-gray-700">
                    {spread}%
                  </div>
                  <div className="text-xs text-gray-500">spread</div>
                </div>
              </div>
            </div>
          )
        })}
      </div>
      
      <div className="bg-gray-50 px-6 py-4 text-center">
        <p className="text-sm text-gray-600">
          Kursy aktualizowane: {new Date().toLocaleString('pl-PL')}
        </p>
        <p className="text-xs text-gray-500 mt-1">
          * Kursy mogą się różnić w zależności od kwoty transakcji
        </p>
      </div>
    </div>
  )
}
