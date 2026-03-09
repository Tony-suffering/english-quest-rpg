'use client'

import { useState, useEffect } from 'react'

export default function Nothing() {
  const [time, setTime] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      setTime(t => t + 1)
    }, 1000)
    return () => clearInterval(interval)
  }, [])

  return (
    <div className="min-h-screen bg-black flex items-center justify-center">
      <div className="text-center">
        <p className="text-stone-800 text-sm font-mono">
          {time}秒、何もしていない
        </p>
      </div>
    </div>
  )
}
