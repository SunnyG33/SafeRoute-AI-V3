"use client"

import { useMemo } from "react"
import { territoriesAt } from "@/data/tlrt-territories"
import { useGeolocation } from "@/hooks/use-geolocation"
import { AlertTriangle } from 'lucide-react'

export default function TLRTBanner({ className = "" }: { className?: string }) {
  const { coords } = useGeolocation()

  const terr = useMemo(() => {
    if (!coords) return []
    return territoriesAt(coords.lat, coords.lng)
  }, [coords])

  if (!coords) {
    return (
      <div className={`rounded border bg-purple-50 border-purple-300 p-3 text-sm ${className}`}>
        Determining your location to show traditional lands respectfully…
      </div>
    )
  }

  if (!terr.length) {
    return (
      <div className={`rounded border bg-purple-50 border-purple-300 p-3 text-sm ${className}`}>
        No territory match in demo dataset. This map is approximate and for demonstration only.
      </div>
    )
  }

  return (
    <div className={`rounded border-l-4 border-l-purple-600 bg-purple-50 p-3 ${className}`}>
      <div className="text-sm text-purple-900">
        <div className="font-semibold">Traditional Lands Overview</div>
        <ul className="list-disc ml-5">
          {terr.map((t) => (
            <li key={t.id}>
              <span className="font-medium">{t.name}</span>
              {t.people ? <span className="text-purple-800">{` • ${t.people}`}</span> : null}
            </li>
          ))}
        </ul>
        <div className="mt-2 text-xs text-purple-800 flex items-center gap-2">
          <AlertTriangle className="h-4 w-4" />
          These boundaries are approximate for demo only. Seek consent and guidance from the Nations involved.
        </div>
      </div>
    </div>
  )
}
