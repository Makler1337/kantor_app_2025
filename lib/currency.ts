import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export interface CurrencyRate {
  currency: string
  askRate: number
  bidRate: number
  updatedAt: Date
}

export async function getCurrencyRates(): Promise<CurrencyRate[]> {
  try {
    const rates = await prisma.currencyRate.findMany({
      orderBy: { currency: 'asc' }
    })
    
    // If no rates exist, return default rates
    if (rates.length === 0) {
      return getDefaultRates()
    }
    
    return rates
  } catch (error) {
    console.error('Error fetching currency rates:', error)
    return getDefaultRates()
  }
}

export async function updateCurrencyRate(currency: string, askRate: number, bidRate: number) {
  try {
    // Update current rate
    const updatedRate = await prisma.currencyRate.upsert({
      where: { currency },
      update: { askRate, bidRate, updatedAt: new Date() },
      create: { currency, askRate, bidRate }
    })
    
    // Save to history
    await prisma.currencyHistory.create({
      data: {
        currency,
        askRate,
        bidRate,
        date: new Date()
      }
    })
    
    return updatedRate
  } catch (error) {
    console.error('Error updating currency rate:', error)
    throw error
  }
}

export async function getCurrencyHistory(currency: string, days: number = 30) {
  try {
    const startDate = new Date()
    startDate.setDate(startDate.getDate() - days)
    
    return await prisma.currencyHistory.findMany({
      where: {
        currency,
        date: { gte: startDate }
      },
      orderBy: { date: 'asc' }
    })
  } catch (error) {
    console.error('Error fetching currency history:', error)
    return []
  }
}

function getDefaultRates(): CurrencyRate[] {
  return [
    { currency: 'EUR', askRate: 4.3500, bidRate: 4.2800, updatedAt: new Date() },
    { currency: 'USD', askRate: 4.0200, bidRate: 3.9500, updatedAt: new Date() },
    { currency: 'GBP', askRate: 5.1000, bidRate: 5.0200, updatedAt: new Date() },
    { currency: 'CHF', askRate: 4.4800, bidRate: 4.4000, updatedAt: new Date() },
    { currency: 'CAD', askRate: 2.9500, bidRate: 2.8800, updatedAt: new Date() },
  ]
}
