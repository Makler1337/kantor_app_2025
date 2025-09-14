'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'

interface HiddenLoginProps {
  children: React.ReactNode
}

export default function HiddenLogin({ children }: HiddenLoginProps) {
  const [clickCount, setClickCount] = useState(0)
  const router = useRouter()

  const handleClick = () => {
    const newCount = clickCount + 1
    setClickCount(newCount)
    
    if (newCount === 5) {
      router.push('/admin/login')
      setClickCount(0)
    }
    
    // Reset counter after 3 seconds of no clicks
    setTimeout(() => {
      setClickCount(0)
    }, 3000)
  }

  return (
    <div 
      onClick={handleClick}
      className="cursor-default select-none"
    >
      {children}
    </div>
  )
}
