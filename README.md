# Kantor Bychawa - Currency Exchange Application

A modern, SEO-optimized currency exchange website built with Next.js for Beata Dorsz's currency exchange business in Bychawa.

## Features

- **SEO Optimized**: Targets keywords "kantor", "kantor bychawa", "beata dorsz"
- **Public Currency Table**: Shows ask/bid rates for EUR, USD, GBP, CHF, CAD vs PLN
- **Admin Panel**: Simple authentication for 2 users to manage currency rates
- **Historical Charts**: Track currency rate changes over time
- **Responsive Design**: Modern UI with Tailwind CSS

## Tech Stack

- Next.js 14 (App Router)
- TypeScript
- Prisma (SQLite database)
- NextAuth.js (Authentication)
- Tailwind CSS (Styling)
- Recharts (Charts)

## Getting Started

### 1. Install Dependencies

```bash
npm install
```

### 2. Set up Environment Variables

Copy `.env.local` and update the `NEXTAUTH_SECRET`:

```bash
# Generate a secret key
openssl rand -base64 32
```

### 3. Initialize Database

```bash
# Generate Prisma client
npx prisma generate

# Create database and run migrations
npx prisma db push

# Initialize with default data
npx tsx scripts/init-db.ts
```

### 4. Run Development Server

```bash
npm run dev
```

Visit [http://localhost:3000](http://localhost:3000) to see the application.

## Admin Access

Default admin credentials (change after first login):
- Email: `admin@kantor-bychawa.pl`
- Email: `beata@kantor-bychawa.pl`  
- Password: `admin123`

Access admin panel at: [http://localhost:3000/admin/login](http://localhost:3000/admin/login)

## Project Structure

```
├── app/                    # Next.js app directory
│   ├── admin/             # Admin panel pages
│   ├── api/               # API routes
│   └── globals.css        # Global styles
├── components/            # React components
├── lib/                   # Utility functions
├── prisma/               # Database schema
└── scripts/              # Database initialization
```

## Database Schema

- **User**: Admin users for authentication
- **CurrencyRate**: Current exchange rates
- **CurrencyHistory**: Historical rate data for charts

## Deployment

1. Build the application:
```bash
npm run build
```

2. Set up production database and environment variables
3. Run database initialization in production
4. Deploy to your preferred hosting platform

## SEO Features

- Optimized meta tags and structured data
- Polish language content
- Local business schema markup
- Responsive design for mobile SEO
- Fast loading with Next.js optimization
