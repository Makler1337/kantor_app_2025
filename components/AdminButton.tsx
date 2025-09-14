'use client'

import { useSession } from 'next-auth/react'

export default function AdminButton() {
  const { data: session } = useSession()

  if (!session) return null

  return (
    <a
      href="/admin/dashboard"
      className="bg-red-600 hover:bg-red-700 text-white px-3 py-1 rounded text-sm font-medium"
    >
      Admin Panel
    </a>
  )
}
