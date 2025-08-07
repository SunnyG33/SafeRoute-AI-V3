"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Satellite, Power } from 'lucide-react'
import { useGeolocation } from "@/hooks/use-geolocation"
import { useToast } from "@/hooks/use-toast"

export default function LabBeacon() {
  const { coords, loading, error, refresh } = useGeolocation()
  const [active, setActive] = useState(false)
  const { toast } = useToast()

  async function activate() {
    // In demo, emit an SOS alert visible to responders
    try {
      const res = await fetch("/api/alerts", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          type: "warning",
          severity: "critical",
          title: "Personal SOS Beacon Activated",
          message:
            coords
              ? `Last known coordinates sent. lat=${coords.lat.toFixed(5)}, lng=${coords.lng.toFixed(5)}`
              : "Location unavailable. SOS broadcast issued.",
          area: coords ? { lat: coords.lat, lng: coords.lng, radiusMeters: 250 } : null,
          languages: ["en"],
          channels: ["LAB", "satellite", "mesh"],
          source: "LAB Beacon (demo)",
          expiresAt: Date.now() + 30 * 60 * 1000,
        }),
      })
      const json = await res.json()
      if (!res.ok) throw new Error(json.error || "Activation failed")
      setActive(true)
      toast({ title: "LAB Beacon active", description: "SOS broadcast sent to responders." })
    } catch (e: any) {
      toast({ title: "Beacon error", description: e.message, variant: "destructive" as any })
    }
  }

  function deactivate() {
    setActive(false)
    toast({ title: "LAB Beacon deactivated", description: "No further SOS broadcasts will be sent." })
  }

  return (
    <Card className="border-2">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Satellite className="h-5 w-5 text-slate-700" />
          {"LAB Beacon"}
        </CardTitle>
      </CardHeader>
      <CardContent className="grid gap-3">
        <div className="text-sm text-slate-700">
          {"In offline or disaster conditions, the LAB beacon attempts to broadcast your last known coordinates over available channels (mesh/satellite)."}
        </div>
        <div className="text-sm">
          {coords ? (
            <div>
              {"Current coordinates: "}
              <span className="font-mono">{coords.lat.toFixed(5)},{' '}{coords.lng.toFixed(5)}</span>
            </div>
          ) : (
            <div>{"Location not available."} {error ? <span className="text-red-600">{error}</span> : null}</div>
          )}
        </div>
        <div className="flex items-center gap-2">
          {!active ? (
            <Button onClick={activate} disabled={loading} className="border-2 bg-red-600 text-white">
              <Power className="h-4 w-4 mr-2" />
              {loading ? "Getting Location…" : "Activate SOS Beacon"}
            </Button>
          ) : (
            <Button variant="outline" onClick={deactivate}>
              <Power className="h-4 w-4 mr-2" />
              {"Deactivate"}
            </Button>
          )}
          <Button variant="outline" onClick={refresh}>Update Location</Button>
        </div>
        <div className="text-xs text-slate-600">
          {"Note: This is a demo. In production, beacon sends are encrypted, rate-limited, and authenticated."}
        </div>
      </CardContent>
    </Card>
  )
}
