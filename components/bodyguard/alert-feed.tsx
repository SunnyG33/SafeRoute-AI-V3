"use client"

import { useEffect, useMemo, useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import type { AlertRecord } from "@/types/alert"
import { AlertCircle, Bell, CircleOff, MapPin } from 'lucide-react'
import { useToast } from "@/hooks/use-toast"

interface Props {
  title?: string
  showAdminControls?: boolean
  nearbyFilter?: { lat: number; lng: number; radiusMeters: number } | null
  compact?: boolean
}

export default function AlertFeed({
  title = "Active Alerts",
  showAdminControls = false,
  nearbyFilter = null,
  compact = false,
}: Props) {
  const { toast } = useToast()
  const [data, setData] = useState<AlertRecord[]>([])
  const [loading, setLoading] = useState(true)
  const [typeFilter, setTypeFilter] = useState<string>("all")

  async function load() {
    try {
      setLoading(true)
      const params = new URLSearchParams()
      if (nearbyFilter) {
        params.set("lat", String(nearbyFilter.lat))
        params.set("lng", String(nearbyFilter.lng))
        params.set("radiusMeters", String(nearbyFilter.radiusMeters))
      }
      const res = await fetch(`/api/alerts?${params.toString()}`)
      const json = await res.json()
      setData(json.data)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    load()
    const t = setInterval(load, 5000)
    return () => clearInterval(t)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [nearbyFilter?.lat, nearbyFilter?.lng, nearbyFilter?.radiusMeters])

  const filtered = useMemo(
    () => (typeFilter === "all" ? data : data.filter((a) => a.type === typeFilter)),
    [data, typeFilter]
  )

  async function cancel(id: string) {
    const res = await fetch("/api/alerts", {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id, status: "cancelled" }),
    })
    const json = await res.json()
    if (!res.ok) {
      toast({ title: "Cancel failed", description: json.error || "Unknown error", variant: "destructive" as any })
      return
    }
    toast({ title: "Alert cancelled", description: json.record.title })
    await load()
  }

  function severityColor(s: AlertRecord["severity"]) {
    switch (s) {
      case "critical":
        return "bg-red-600 text-white"
      case "high":
        return "bg-orange-600 text-white"
      case "medium":
        return "bg-amber-500 text-black"
      default:
        return "bg-slate-300 text-black"
    }
  }

  return (
    <Card className="border-2">
      <CardHeader className="flex flex-col md:flex-row md:items-center md:justify-between gap-2">
        <CardTitle className="flex items-center gap-2">
          <Bell className="h-5 w-5 text-slate-700" />
          {title}
        </CardTitle>
        <div className="flex items-center gap-2">
          <select
            className="border rounded px-2 py-1 text-sm"
            value={typeFilter}
            onChange={(e) => setTypeFilter(e.target.value)}
          >
            <option value="all">All</option>
            <option value="evacuation">Evacuation</option>
            <option value="shelter">Shelter</option>
            <option value="warning">Warning</option>
            <option value="info">Info</option>
            <option value="all-clear">All-Clear</option>
          </select>
          <Button variant="outline" onClick={load} className="text-sm">
            Refresh
          </Button>
        </div>
      </CardHeader>
      <CardContent className="grid gap-3">
        {loading ? <div className="text-sm text-slate-600">Loading alerts…</div> : null}
        {!loading && filtered.length === 0 ? (
          <div className="flex items-center gap-2 text-sm text-slate-600">
            <AlertCircle className="h-4 w-4" />
            {"No alerts to display"}
          </div>
        ) : null}

        <div className="grid gap-3">
          {filtered.map((a) => (
            <div key={a.id} className="border rounded p-3">
              <div className="flex flex-wrap items-center justify-between gap-2">
                <div className="flex items-center gap-2">
                  <Badge className={`${severityColor(a.severity)} uppercase`}>{a.severity}</Badge>
                  <Badge variant="secondary" className="uppercase">{a.type}</Badge>
                </div>
                <div className="text-xs text-slate-500">
                  {"Created "}{new Date(a.createdAt).toLocaleString()}
                </div>
              </div>
              <div className="mt-2 font-semibold">{a.title}</div>
              <div className={`mt-1 text-sm ${compact ? "line-clamp-2" : ""}`}>{a.message}</div>
              <div className="mt-2 flex flex-wrap items-center gap-2 text-xs text-slate-600">
                {a.area ? (
                  <span className="inline-flex items-center gap-1">
                    <MapPin className="h-3 w-3" />
                    {a.area.lat.toFixed(4)},{' '}{a.area.lng.toFixed(4)} • {a.area.radiusMeters}m
                  </span>
                ) : (
                  <span>Global broadcast</span>
                )}
                <span>Channels: {a.channels.join(", ")}</span>
                <span>Lang: {a.languages.join(", ")}</span>
                {a.expiresAt ? <span>Expires: {new Date(a.expiresAt).toLocaleString()}</span> : null}
              </div>
              {showAdminControls ? (
                <div className="mt-2 flex items-center gap-2">
                  {a.status === "active" ? (
                    <Button variant="destructive" size="sm" onClick={() => cancel(a.id)}>
                      <CircleOff className="h-4 w-4 mr-1" />
                      Cancel
                    </Button>
                  ) : (
                    <Badge variant="outline" className="uppercase">{a.status}</Badge>
                  )}
                </div>
              ) : null}
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
