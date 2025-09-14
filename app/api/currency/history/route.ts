import { NextRequest, NextResponse } from 'next/server'
import { getCurrencyHistory } from '@/lib/currency'

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const currency = searchParams.get('currency')
    const days = parseInt(searchParams.get('days') || '30')

    if (!currency) {
      return NextResponse.json({ error: 'Currency parameter is required' }, { status: 400 })
    }

    const history = await getCurrencyHistory(currency, days)
    return NextResponse.json(history)
  } catch (error) {
    console.error('Error fetching currency history:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
