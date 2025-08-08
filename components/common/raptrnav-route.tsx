"use client"

import { useEffect, useMemo, useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { MapPin, Navigation, Clock } from 'lucide-react'

type Loc = { lat: number; lng: number; acc?: number }

type Place = {
  name: string
  type: "AED" | "Hospital"
  lat: number
  lng: number
  accessHours?: string
  specialInstructions?: string
}

const PLACES: Place[] = [
  { 
    name: "Community Centre AED", 
    type: "AED", 
    lat: 49.2827, 
    lng: -123.1207,
    accessHours: "24/7",
    specialInstructions: "Located in main lobby, left of reception desk"
  },
  { 
    name: "City Hall AED", 
    type: "AED", 
    lat: 49.2814, 
    lng: -123.1167,
    accessHours: "8AM-6PM weekdays",
    specialInstructions: "Security desk has access code"
  },
  { 
    name: "General Hospital ER", 
    type: "Hospital", 
    lat: 49.2620, 
    lng: -123.1230,
    accessHours: "24/7",
    specialInstructions: "Emergency entrance on west side"
  },
]

function haversineKm(a: Loc, b: Loc) {
  const R = 6371
  const dLat = ((b.lat - a.lat) * Math.PI) / 180
  const dLon = ((b.lng - a.lng) * Math.PI) / 180
  const lat1 = (a.lat * Math.PI) / 180
  const lat2 = (b.lat * Math.PI) / 180

  const sinDLat = Math.sin(dLat / 2)
  const sinDLon = Math.sin(dLon / 2)

  const c = 2 * Math.asin(
    Math.sqrt(
      sinDLat * sinDLat + Math.cos(lat1) * Math.cos(lat2) * sinDLon * sinDLon,
    ),
  )
  return R * c
}

function estimateWalkTime(distanceKm: number): number {
  // Average walking speed: 5 km/h, but slower in emergency situations
  return Math.ceil((distanceKm / 4) * 60) // 4 km/h for stressed walking
}

export function RAPTRNavRoute({ origin }: { origin: Loc | null }) {
  const [mode, setMode] = useState<"AED" | "Hospital">("AED")
  const [isNavigating, setIsNavigating] = useState(false)

  const nearest = useMemo(() => {
    if (!origin) return null
    const candidates = PLACES.filter((p) => p.type === mode)
    let best: { place: Place; dist: number; walkTime: number } | null = null
    for (const p of candidates) {
      const d = haversineKm(origin, { lat: p.lat, lng: p.lng })
      const walkTime = estimateWalkTime(d)
      if (!best || d < best.dist) {
        best = { place: p, dist: d, walkTime }
      }
    }
    return best
  }, [origin, mode])

  function openDirections() {
    if (!nearest) return
    
    setIsNavigating(true)
    const p = nearest.place
    const base = "https://www.google.com/maps/dir/?api=1"
    const dest = `&destination=${encodeURIComponent(`${p.lat},${p.lng}`)}`
    const originParam = origin ? `&origin=${encodeURIComponent(`${origin.lat},${origin.lng}`)}` : ""
    const url = `${base}${originParam}${dest}&travelmode=walking`
    window.open(url, "_blank", "noopener")
    
    // Reset after a delay
    setTimeout(() => setIsNavigating(false), 3000)
  }

  return (
    <Card className="border-2 border-blue-200 bg-blue-50">
      <CardHeader className="py-2">
        <CardTitle className="text-sm flex items-center gap-2">
          <Navigation className="h-4 w-4 text-blue-600" /> RAPTRnav Emergency Route
        </CardTitle>
      </CardHeader>
      <CardContent className="text-sm space-y-3">
        <div className="flex items-center gap-2">
          <span className="text-xs font-medium">Find nearest:</span>
          <select
            className="border-2 border-blue-300 rounded px-2 py-1 text-sm bg-white"
            value={mode}
            onChange={(e) => setMode(e.target.value as any)}
          >
            <option value="AED">🔋 AED Device</option>
            <option value="Hospital">🏥 Hospital</option>
          </select>
        </div>
        
        {!origin ? (
          <div className="text-slate-600 bg-white border border-blue-200 rounded p-3">
            📍 Share your location to see emergency routes
          </div>
        ) : nearest ? (
          <div className="space-y-3">
            <div className="bg-white border-2 border-blue-300 rounded p-3">
              <div className="font-semibold text-blue-800 mb-1">
                {nearest.place.name}
              </div>
              <div className="flex items-center gap-4 text-xs text-blue-600 mb-2">
                <span className="flex items-center gap-1">
                  <MapPin className="h-3 w-3" />
                  {nearest.dist.toFixed(1)} km
                </span>
                <span className="flex items-center gap-1">
                  <Clock className="h-3 w-3" />
                  ~{nearest.walkTime} min walk
                </span>
              </div>
              {nearest.place.accessHours && (
                <div className="text-xs text-gray-600 mb-1">
                  🕒 {nearest.place.accessHours}
                </div>
              )}
              {nearest.place.specialInstructions && (
                <div className="text-xs text-gray-600">
                  ℹ️ {nearest.place.specialInstructions}
                </div>
              )}
            </div>
            
            <Button 
              onClick={openDirections}
              className="w-full bg-blue-600 hover:bg-blue-700 text-white border-2 border-blue-800 h-12 text-base font-bold"
              disabled={isNavigating}
            >
              {isNavigating ? (
                "Opening Navigation..."
              ) : (
                <>
                  <Navigation className="h-5 w-5 mr-2" />
                  Get Walking Directions
                </>
              )}
            </Button>
          </div>
        ) : (
          <div className="text-slate-500 bg-white border border-gray-200 rounded p-3">
            No {mode.toLowerCase()} locations found nearby
          </div>
        )}
        
        <div className="text-xs text-blue-600 bg-blue-100 border border-blue-200 rounded p-2">
          🚨 Demo routing only. Verify location and access before traveling.
        </div>
      </CardContent>
    </Card>
  )
}
