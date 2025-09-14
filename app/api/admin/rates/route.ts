import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth/next'
import { authOptions } from '@/lib/auth'
import { getCurrencyRates, updateCurrencyRate } from '@/lib/currency'

export async function GET() {
  try {
    const session = await getServerSession(authOptions)
    
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const rates = await getCurrencyRates()
    return NextResponse.json(rates)
  } catch (error) {
    console.error('Error fetching rates:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions)
    
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const { currency, askRate, bidRate } = await request.json()

    if (!currency || !askRate || !bidRate) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 })
    }

    if (askRate <= bidRate) {
      return NextResponse.json({ error: 'Ask rate must be higher than bid rate' }, { status: 400 })
    }

    const updatedRate = await updateCurrencyRate(currency, askRate, bidRate)
    return NextResponse.json(updatedRate)
  } catch (error) {
    console.error('Error updating rate:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
