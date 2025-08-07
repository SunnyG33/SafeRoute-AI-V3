"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { useEffect, useMemo, useState } from "react"
import type { AlertRecord } from "@/types/alert"
import { Map } from 'lucide-react'
import { useGeolocation } from "@/hooks/use-geolocation"
import { haversineMeters } from "@/lib/geo"

export default function EvacuationMap() {
  const { coords, loading: geoLoading, error: geoError, refresh } = useGeolocation()
  const [alerts, setAlerts] = useState<AlertRecord[]>([])
  const [selected, setSelected] = useState<string | null>(null)

  useEffect(() => {
    async function load() {
      const res = await fetch("/api/alerts")
      const json = await res.json()
      setAlerts(json.data)
      if (json.data.length && !selected) setSelected(json.data[0].id)
    }
    load()
    const t = setInterval(load, 5000)
    return () => clearInterval(t)
  }, [selected])

  const currentAlert = useMemo(
    () => alerts.find((a) => a.id === selected) || null,
    [alerts, selected]
  )

  const distanceInfo = useMemo(() => {
    if (!coords || !currentAlert?.area) return null
    const meters = haversineMeters(coords, { lat: currentAlert.area.lat, lng: currentAlert.area.lng })
    const kmh = 4 // walking speed
    const etaMin = Math.ceil((meters / 1000 / kmh) * 60)
    return { meters: Math.round(meters), etaMin }
  }, [coords, currentAlert])

  return (
    <Card className="border-2">
      <CardHeader className="flex flex-col md:flex-row md:items-center md:justify-between gap-2">
        <CardTitle className="flex items-center gap-2">
          <Map className="h-5 w-5 text-slate-700" />
          {"Evacuation Guidance"}
        </CardTitle>
        <div className="flex items-center gap-2">
          <select
            className="border rounded px-2 py-1 text-sm"
            value={selected ?? ""}
            onChange={(e) => setSelected(e.target.value)}
          >
            {alerts.map((a) => (
              <option key={a.id} value={a.id}>{a.title}</option>
            ))}
          </select>
          <Button variant="outline" onClick={refresh}>{geoLoading ? "Locating..." : "Update Location"}</Button>
        </div>
      </CardHeader>
      <CardContent className="grid gap-3">
        {geoError ? <div className="text-sm text-red-600">{geoError}</div> : null}
        <div className="rounded border bg-slate-50 aspect-video grid place-items-center text-slate-600">
          {"Map preview placeholder (offline-safe). Visual map integration can be added later."}
        </div>
        <div className="text-sm text-slate-700">
          {coords ? (
            <div>
              {"Your location:"}{' '}
              <span className="font-mono">{coords.lat.toFixed(5)},{' '}{coords.lng.toFixed(5)}</span>
            </div>
          ) : (
            <div>{"Location not available. Use Update Location."}</div>
          )}
          {currentAlert?.area ? (
            <div className="mt-1">
              {"Target area center: "}
              <span className="font-mono">
                {currentAlert.area.lat.toFixed(5)},{' '}{currentAlert.area.lng.toFixed(5)}
              </span>{' '}
              • {currentAlert.area.radiusMeters}m radius
            </div>
          ) : (
            <div className="mt-1">{"Global broadcast (no specific target area)."}</div>
          )}
          {distanceInfo ? (
            <div className="mt-2">
              {"Approx. distance to target: "}<b>{distanceInfo.meters} m</b>{" • ETA on foot: "}<b>{distanceInfo.etaMin} min</b>
              <div className="mt-1 text-xs text-slate-600">
                {"If GPS is unavailable, follow local signage and pre-planned routes. Offline fallback in effect."}
              </div>
            </div>
          ) : null}
        </div>
        <div className="grid gap-1 text-sm">
          <div className="font-medium">Suggested steps:</div>
          <ol className="list-decimal ml-5 space-y-1">
            <li>{"Stay calm. Assist children and elders first."}</li>
            <li>{"Move towards higher ground or designated shelter."}</li>
            <li>{"Avoid flooded roads and downed power lines."}</li>
            <li>{"If driving, do not cross moving water."}</li>
            <li>{"On arrival, check in with responders if safe to do so."}</li>
          </ol>
        </div>
      </CardContent>
    </Card>
  )
}
