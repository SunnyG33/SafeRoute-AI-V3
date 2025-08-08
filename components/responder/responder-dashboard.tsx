"use client"

import { useEffect, useMemo, useState } from "react"
import type { CheckIn, CheckInStatus } from "@/types/checkin"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export default function ResponderDashboard() {
  const [feed, setFeed] = useState<CheckIn[]>([])
  const [loading, setLoading] = useState(true)

  async function load() {
    try {
      const res = await fetch("/api/checkins")
      const json = await res.json()
      setFeed(json.data || [])
    } catch {
      // ignore
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    load()
    const t = setInterval(load, 4000)
    return () => clearInterval(t)
  }, [])

  const grouped = useMemo(() => {
    const byStatus: Record<CheckInStatus, CheckIn[]> = {
      submitted: [],
      claimed: [],
      enroute: [],
      arrived: [],
      completed: [],
    }
    for (const item of feed) byStatus[item.status].push(item)
    return byStatus
  }, [feed])

  const updateStatus = async (id: string, status: CheckInStatus) => {
    await fetch("/api/checkins", {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id, status }),
    })
    await load()
  }

  const createIncidentFromCheckin = async (checkin: CheckIn) => {
    const res = await fetch("/api/incidents", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        checkinId: checkin.id,
        participants: [
          { role: "civilian", name: checkin.name || "Civilian", connected: true },
          { role: "responder", name: "Responder #1", connected: true },
        ],
      }),
    })
    const json = await res.json()
    if (json?.incident?.id) {
      window.open(`/responder-portal/live/${json.incident.id}`, "_blank")
    } else {
      alert("Failed to create incident")
    }
  }

  const statuses: CheckInStatus[] = ["submitted", "claimed", "enroute", "arrived", "completed"]

  return (
    <Card className="border-2">
      <CardHeader>
        <CardTitle>Responder Live Feed</CardTitle>
      </CardHeader>
      <CardContent className="grid gap-4">
        {loading ? <div>Loading…</div> : null}
        <Tabs defaultValue="submitted" className="w-full">
          <TabsList className="flex flex-wrap gap-2">
            {statuses.map((s) => (
              <TabsTrigger key={s} value={s}>
                {s.charAt(0).toUpperCase() + s.slice(1)} ({grouped[s].length})
              </TabsTrigger>
            ))}
          </TabsList>
          {statuses.map((s) => (
            <TabsContent key={s} value={s} className="grid gap-3">
              {grouped[s].length === 0 ? <div className="text-sm text-slate-600">No records</div> : null}
              {grouped[s].map((item) => (
                <Card key={item.id}>
                  <CardContent className="p-4 grid gap-2">
                    <div className="flex flex-wrap items-center justify-between gap-2">
                      <div>
                        <div className="font-medium">{item.name}</div>
                        <div className="text-xs text-slate-600">
                          {new Date(item.createdAt).toLocaleString()}
                          {item.lat && item.lng ? (
                            <>
                              {" • "}
                              <span className="font-mono">
                                {item.lat.toFixed(5)}, {item.lng.toFixed(5)}
                              </span>
                            </>
                          ) : null}
                        </div>
                      </div>
                      <div className="flex gap-2">
                        {statuses.map((st) => (
                          <Button
                            key={st}
                            size="sm"
                            variant={st === item.status ? "default" : "outline"}
                            onClick={() => updateStatus(item.id, st)}
                          >
                            {st}
                          </Button>
                        ))}
                        <Button
                          variant="outline"
                          className="border-2"
                          onClick={() => createIncidentFromCheckin(item)}
                          title="Open live connection between civilian and responder"
                        >
                          Live Connect
                        </Button>
                      </div>
                    </div>
                    {item.message ? <div className="text-sm">{item.message}</div> : null}
                  </CardContent>
                </Card>
              ))}
            </TabsContent>
          ))}
        </Tabs>
      </CardContent>
    </Card>
  )
}
