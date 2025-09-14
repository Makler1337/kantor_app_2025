import { PrismaClient } from '@prisma/client'
import bcrypt from 'bcryptjs'

const prisma = new PrismaClient()

async function checkUsers() {
  console.log('Checking database users...')

  try {
    const users = await prisma.user.findMany()
    
    console.log('Found users:')
    users.forEach(user => {
      console.log(`- Email: ${user.email}`)
      console.log(`- Name: ${user.name}`)
      console.log(`- ID: ${user.id}`)
      console.log('---')
    })

    // Test password verification
    if (users.length > 0) {
      const testUser = users[0]
      const isValidPassword = await bcrypt.compare('admin123', testUser.password)
      console.log(`Password test for ${testUser.email}: ${isValidPassword ? 'VALID' : 'INVALID'}`)
    }

  } catch (error) {
    console.error('Error checking users:', error)
  }
}

checkUsers()
  .finally(async () => {
    await prisma.$disconnect()
  })
