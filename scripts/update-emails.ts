import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function updateEmails() {
  console.log('Updating admin email addresses...')

  try {
    // Update first admin user
    await prisma.user.update({
      where: { email: 'admin@kantor-bychawa.pl' },
      data: {
        email: 'marekkukier@gmail.com',
        name: 'Marek Kukier'
      }
    })

    // Update second admin user  
    await prisma.user.update({
      where: { email: 'beata@kantor-bychawa.pl' },
      data: {
        email: 'beatadorsz55@gmail.com',
        name: 'Beata Dorsz'
      }
    })

    console.log('✅ Email addresses updated successfully!')
    console.log('New admin credentials:')
    console.log('Email: marekkukier@gmail.com')
    console.log('Email: beatadorsz55@gmail.com')
    console.log('Password: admin123 (unchanged)')
    
  } catch (error) {
    console.error('Error updating emails:', error)
  }
}

updateEmails()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
