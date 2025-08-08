"use client"

import { useEffect, useState } from "react"

export function OfflineBanner() {
  const [online, setOnline] = useState<boolean>(true)

  useEffect(() => {
    const update = () => setOnline(navigator.onLine)
    update()
    window.addEventListener("online", update)
    window.addEventListener("offline", update)
    return () => {
      window.removeEventListener("online", update)
      window.removeEventListener("offline", update)
    }
  }, [])

  if (online) return null

  return (
    <div className="w-full bg-amber-100 text-amber-900 text-sm px-4 py-2 text-center border-b border-amber-300">
      You are offline. Some features are unavailable. Changes will retry when connection returns.
    </div>
  )
}
