'use client'

import { useState, useEffect } from 'react'
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts'

interface ChartData {
  date: string
  askRate: number
  bidRate: number
}

interface CurrencyChartProps {
  currency: string
  days?: number
}

export default function CurrencyChart({ currency, days = 30 }: CurrencyChartProps) {
  const [data, setData] = useState<ChartData[]>([])
  const [loading, setLoading] = useState(true)
  const [period, setPeriod] = useState(days)

  useEffect(() => {
    fetchChartData()
  }, [currency, period])

  const fetchChartData = async () => {
    setLoading(true)
    try {
      const response = await fetch(`/api/currency/history?currency=${currency}&days=${period}`)
      if (response.ok) {
        const historyData = await response.json()
        const chartData = historyData.map((item: any) => ({
          date: new Date(item.date).toLocaleDateString('pl-PL'),
          askRate: item.askRate,
          bidRate: item.bidRate,
        }))
        setData(chartData)
      }
    } catch (error) {
      console.error('Error fetching chart data:', error)
    } finally {
      setLoading(false)
    }
  }

  if (loading) {
    return (
      <div className="bg-white p-6 rounded-lg shadow-lg">
        <div className="animate-pulse">
          <div className="h-4 bg-gray-200 rounded w-1/4 mb-4"></div>
          <div className="h-64 bg-gray-200 rounded"></div>
        </div>
      </div>
    )
  }

  return (
    <div className="bg-white p-6 rounded-lg shadow-lg">
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-lg font-semibold text-gray-900">
          Historia kursów {currency}/PLN
        </h3>
        <div className="flex space-x-2">
          {[7, 30, 90].map((days) => (
            <button
              key={days}
              onClick={() => setPeriod(days)}
              className={`px-3 py-1 text-sm rounded-md ${
                period === days
                  ? 'bg-primary-600 text-white'
                  : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
              }`}
            >
              {days}d
            </button>
          ))}
        </div>
      </div>

      {data.length > 0 ? (
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={data}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis 
              dataKey="date" 
              tick={{ fontSize: 12 }}
              interval="preserveStartEnd"
            />
            <YAxis 
              tick={{ fontSize: 12 }}
              domain={['dataMin - 0.01', 'dataMax + 0.01']}
            />
            <Tooltip 
              formatter={(value: number, name: string) => [
                value.toFixed(4) + ' PLN',
                name === 'askRate' ? 'Sprzedaż' : 'Kupno'
              ]}
            />
            <Legend />
            <Line 
              type="monotone" 
              dataKey="bidRate" 
              stroke="#10b981" 
              strokeWidth={2}
              name="Kupno"
              dot={{ r: 3 }}
            />
            <Line 
              type="monotone" 
              dataKey="askRate" 
              stroke="#ef4444" 
              strokeWidth={2}
              name="Sprzedaż"
              dot={{ r: 3 }}
            />
          </LineChart>
        </ResponsiveContainer>
      ) : (
        <div className="text-center py-12 text-gray-500">
          Brak danych historycznych dla wybranego okresu
        </div>
      )}
    </div>
  )
}
