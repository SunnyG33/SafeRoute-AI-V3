"use client"

import { useEffect, useState } from "react"
import { Badge } from "@/components/ui/badge"
import { MapPin } from 'lucide-react'

type TLRTBannerProps = {
  className?: string
}

// Very simple demo heuristic for Vancouver core area
function detectTerritory(lat: number, lng: number): string | null {
  // Rough bounding box around Vancouver for demo purposes
  const inVancouver =
    lat > 49.20 && lat < 49.35 && // approx latitude
    lng > -123.26 && lng < -123.02 // approx longitude
  if (inVancouver) {
    return "Musqueam, Squamish, and Tsleil-Waututh (Coast Salish Territories)"
  }
  return null
}

export function TLRTBanner({ className }: TLRTBannerProps) {
  const [territory, setTerritory] = useState<string | null>(null)
  const [status, setStatus] = useState<"idle" | "locating" | "done" | "error">("idle")

  useEffect(() => {
    if (!("geolocation" in navigator)) {
      setStatus("error")
      return
    }
    setStatus("locating")
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        const t = detectTerritory(pos.coords.latitude, pos.coords.longitude)
        setTerritory(t)
        setStatus("done")
      },
      () => setStatus("error"),
      { enableHighAccuracy: true, timeout: 5000 },
    )
  }, [])

  return (
    <div
      className={`rounded-lg p-3 border flex items-start gap-3 bg-amber-50 border-amber-200 text-amber-900 ${className || ""}`}
      role="region"
      aria-label="Traditional Land Recognition"
    >
      <div className="mt-0.5">
        <MapPin className="w-5 h-5 text-amber-700" />
      </div>
      <div className="flex-1">
        <div className="font-semibold">Traditional Land Recognition</div>
        {status === "locating" && <div className="text-sm">Detecting current territory…</div>}
        {status === "error" && (
          <div className="text-sm">
            Location unavailable. Territory will be shown when permission is granted.
          </div>
        )}
        {territory && (
          <div className="text-sm">
            You are within the traditional territories of {territory}. This app follows OCAP-aligned consent
            and cultural protocol settings.
          </div>
        )}
      </div>
      <Badge variant="outline" className="bg-white">
        TLRT Demo
      </Badge>
    </div>
  )
}
