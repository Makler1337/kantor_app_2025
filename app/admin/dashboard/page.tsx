'use client'

import { useState, useEffect } from 'react'
import { useSession, signOut } from 'next-auth/react'
import { useRouter } from 'next/navigation'

interface CurrencyRate {
  currency: string
  askRate: number
  bidRate: number
  updatedAt: string
}

const currencies = [
  { code: 'EUR', name: 'Euro', flag: '🇪🇺' },
  { code: 'USD', name: 'Dolar amerykański', flag: '🇺🇸' },
  { code: 'GBP', name: 'Funt brytyjski', flag: '🇬🇧' },
  { code: 'CHF', name: 'Frank szwajcarski', flag: '🇨🇭' },
  { code: 'CAD', name: 'Dolar kanadyjski', flag: '🇨🇦' },
]

export default function AdminDashboard() {
  const { data: session, status } = useSession()
  const router = useRouter()
  const [rates, setRates] = useState<CurrencyRate[]>([])
  const [loading, setLoading] = useState(true)
  const [updating, setUpdating] = useState<string | null>(null)

  useEffect(() => {
    if (status === 'loading') return
    if (!session) {
      router.push('/admin/login')
      return
    }
    fetchRates()
  }, [session, status, router])

  const fetchRates = async () => {
    try {
      const response = await fetch('/api/admin/rates')
      if (response.ok) {
        const data = await response.json()
        setRates(data)
      }
    } catch (error) {
      console.error('Error fetching rates:', error)
    } finally {
      setLoading(false)
    }
  }

  const updateRate = async (currency: string, askRate: number, bidRate: number) => {
    setUpdating(currency)
    try {
      const response = await fetch('/api/admin/rates', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ currency, askRate, bidRate })
      })

      if (response.ok) {
        await fetchRates()
      } else {
        alert('Błąd podczas aktualizacji kursu')
      }
    } catch (error) {
      console.error('Error updating rate:', error)
      alert('Błąd podczas aktualizacji kursu')
    } finally {
      setUpdating(null)
    }
  }

  if (status === 'loading' || loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-xl">Ładowanie...</div>
      </div>
    )
  }

  if (!session) {
    return null
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-6">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">
                Panel Administracyjny
              </h1>
              <p className="text-sm text-gray-600">
                Witaj, {session.user?.name || session.user?.email}
              </p>
            </div>
            <div className="flex space-x-4">
              <a
                href="/admin/dashboard/charts"
                className="bg-primary-600 hover:bg-primary-700 text-white px-4 py-2 rounded-md text-sm font-medium"
              >
                Wykresy
              </a>
              <button
                onClick={() => signOut()}
                className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-md text-sm font-medium"
              >
                Wyloguj się
              </button>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <div className="px-4 py-6 sm:px-0">
          <div className="bg-white shadow rounded-lg">
            <div className="px-6 py-4 border-b border-gray-200">
              <h2 className="text-lg font-medium text-gray-900">
                Zarządzanie Kursami Walut
              </h2>
              <p className="text-sm text-gray-600">
                Aktualizuj kursy kupna i sprzedaży walut
              </p>
            </div>

            <div className="p-6">
              <div className="space-y-6">
                {currencies.map((currency) => {
                  const currentRate = rates.find(r => r.currency === currency.code)
                  return (
                    <CurrencyRateForm
                      key={currency.code}
                      currency={currency}
                      currentRate={currentRate}
                      onUpdate={updateRate}
                      updating={updating === currency.code}
                    />
                  )
                })}
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}

interface CurrencyRateFormProps {
  currency: { code: string; name: string; flag: string }
  currentRate?: CurrencyRate
  onUpdate: (currency: string, askRate: number, bidRate: number) => void
  updating: boolean
}

function CurrencyRateForm({ currency, currentRate, onUpdate, updating }: CurrencyRateFormProps) {
  const [askRate, setAskRate] = useState(currentRate?.askRate?.toString() || '')
  const [bidRate, setBidRate] = useState(currentRate?.bidRate?.toString() || '')

  useEffect(() => {
    if (currentRate) {
      setAskRate(currentRate.askRate.toString())
      setBidRate(currentRate.bidRate.toString())
    }
  }, [currentRate])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const ask = parseFloat(askRate)
    const bid = parseFloat(bidRate)

    if (isNaN(ask) || isNaN(bid)) {
      alert('Wprowadź prawidłowe wartości kursów')
      return
    }

    if (ask <= bid) {
      alert('Kurs sprzedaży musi być wyższy od kursu kupna')
      return
    }

    onUpdate(currency.code, ask, bid)
  }

  return (
    <form onSubmit={handleSubmit} className="border border-gray-200 rounded-lg p-4">
      <div className="flex items-center space-x-3 mb-4">
        <span className="text-2xl">{currency.flag}</span>
        <div>
          <h3 className="font-semibold text-gray-900">{currency.code}</h3>
          <p className="text-sm text-gray-600">{currency.name}</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Kupujemy (PLN)
          </label>
          <input
            type="number"
            step="0.0001"
            value={bidRate}
            onChange={(e) => setBidRate(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
            placeholder="0.0000"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Sprzedajemy (PLN)
          </label>
          <input
            type="number"
            step="0.0001"
            value={askRate}
            onChange={(e) => setAskRate(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
            placeholder="0.0000"
            required
          />
        </div>

        <div className="flex items-end">
          <button
            type="submit"
            disabled={updating}
            className="w-full bg-primary-600 hover:bg-primary-700 text-white px-4 py-2 rounded-md font-medium disabled:opacity-50"
          >
            {updating ? 'Aktualizowanie...' : 'Aktualizuj'}
          </button>
        </div>
      </div>

      {currentRate && (
        <div className="mt-3 text-xs text-gray-500">
          Ostatnia aktualizacja: {new Date(currentRate.updatedAt).toLocaleString('pl-PL')}
        </div>
      )}
    </form>
  )
}
