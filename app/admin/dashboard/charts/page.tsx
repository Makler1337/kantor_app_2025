'use client'

import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { useEffect } from 'react'
import CurrencyChart from '@/components/CurrencyChart'

const currencies = [
  { code: 'EUR', name: 'Euro', flag: '🇪🇺' },
  { code: 'USD', name: 'Dolar amerykański', flag: '🇺🇸' },
  { code: 'GBP', name: 'Funt brytyjski', flag: '🇬🇧' },
  { code: 'CHF', name: 'Frank szwajcarski', flag: '🇨🇭' },
  { code: 'CAD', name: 'Dolar kanadyjski', flag: '🇨🇦' },
]

export default function ChartsPage() {
  const { data: session, status } = useSession()
  const router = useRouter()

  useEffect(() => {
    if (status === 'loading') return
    if (!session) {
      router.push('/admin/login')
    }
  }, [session, status, router])

  if (status === 'loading') {
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
                Wykresy Historyczne
              </h1>
              <p className="text-sm text-gray-600">
                Historia kursów walut
              </p>
            </div>
            <div className="flex space-x-4">
              <a
                href="/admin/dashboard"
                className="bg-primary-600 hover:bg-primary-700 text-white px-4 py-2 rounded-md text-sm font-medium"
              >
                Powrót do panelu
              </a>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <div className="px-4 py-6 sm:px-0">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {currencies.map((currency) => (
              <CurrencyChart key={currency.code} currency={currency.code} />
            ))}
          </div>
        </div>
      </main>
    </div>
  )
}
