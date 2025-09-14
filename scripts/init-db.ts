import { PrismaClient } from '@prisma/client'
import bcrypt from 'bcryptjs'

const prisma = new PrismaClient()

async function main() {
  console.log('Initializing database...')

  // Create default admin users
  const hashedPassword = await bcrypt.hash('admin123', 12)
  
  // Create first admin user (you)
  await prisma.user.upsert({
    where: { email: 'admin@kantor-bychawa.pl' },
    update: {},
    create: {
      email: 'admin@kantor-bychawa.pl',
      password: hashedPassword,
      name: 'Administrator',
      role: 'admin',
    },
  })

  // Create second admin user (your mom)
  await prisma.user.upsert({
    where: { email: 'beata@kantor-bychawa.pl' },
    update: {},
    create: {
      email: 'beata@kantor-bychawa.pl',
      password: hashedPassword,
      name: 'Beata Dorsz',
      role: 'admin',
    },
  })

  // Create default currency rates
  const defaultRates = [
    { currency: 'EUR', askRate: 4.3500, bidRate: 4.2800 },
    { currency: 'USD', askRate: 4.0200, bidRate: 3.9500 },
    { currency: 'GBP', askRate: 5.1000, bidRate: 5.0200 },
    { currency: 'CHF', askRate: 4.4800, bidRate: 4.4000 },
    { currency: 'CAD', askRate: 2.9500, bidRate: 2.8800 },
  ]

  for (const rate of defaultRates) {
    await prisma.currencyRate.upsert({
      where: { currency: rate.currency },
      update: rate,
      create: rate,
    })

    // Add initial history entry
    await prisma.currencyHistory.create({
      data: {
        currency: rate.currency,
        askRate: rate.askRate,
        bidRate: rate.bidRate,
        date: new Date(),
      },
    })
  }

  console.log('Database initialized successfully!')
  console.log('Default admin credentials:')
  console.log('Email: admin@kantor-bychawa.pl')
  console.log('Email: beata@kantor-bychawa.pl')
  console.log('Password: admin123')
  console.log('Please change these passwords after first login!')
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
