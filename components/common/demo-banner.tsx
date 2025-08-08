"use client"

import { useEffect, useState } from "react"
import { AlertTriangle } from 'lucide-react'

export default function DemoBanner() {
  const [hidden, setHidden] = useState<boolean>(false)

  useEffect(() => {
    try {
      const val = sessionStorage.getItem("sr_demo_banner_hidden")
      setHidden(val === "1")
    } catch {
      // ignore
    }
  }, [])

  const dismiss = () => {
    setHidden(true)
    try {
      sessionStorage.setItem("sr_demo_banner_hidden", "1")
    } catch {
      // ignore
    }
  }

  if (hidden) return null

  return (
    <div
      role="status"
      aria-live="polite"
      className="w-full border-b border-amber-300 bg-amber-50 text-amber-900"
    >
      <div className="container mx-auto px-4 py-2 flex items-start sm:items-center gap-3">
        <AlertTriangle className="h-5 w-5 shrink-0 mt-0.5 sm:mt-0" aria-hidden="true" />
        <p className="text-sm">
          Demo Mode: All on-screen data is simulated for demonstration. No real incidents, persons, or locations are displayed.
        </p>
        <button
          type="button"
          onClick={dismiss}
          className="ml-auto rounded border border-amber-300 px-2 py-1 text-xs hover:bg-amber-100"
          aria-label="Dismiss demo mode notice"
        >
          Dismiss
        </button>
      </div>
    </div>
  )
}
