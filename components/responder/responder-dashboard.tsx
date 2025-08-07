"use client"

import { useEffect, useMemo, useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { AlertTriangle, CheckCircle, MapPin, Shield, UserCheck } from 'lucide-react'
import type { Checkin } from "@/types/checkin"

type Summary = {
  total: number
  unassigned: number
  claimed: number
  en_route: number
  arrived: number
  completed: number
  need_help: number
  cant_evacuate: number
}

export default function ResponderDashboard() {
  const [items, setItems] = useState<Checkin[]>([])
  const [loading, setLoading] = useState(true)

  async function load() {
    try {
      const res = await fetch("/api/checkins", { cache: "no-store" })
      const json = await res.json()
      setItems(json?.data ?? [])
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    load()
    const id = setInterval(load, 3000)
    return () => clearInterval(id)
  }, [])

  const summary: Summary = useMemo(() => {
    const s: Summary = {
      total: items.length,
      unassigned: 0,
      claimed: 0,
      en_route: 0,
      arrived: 0,
      completed: 0,
      need_help: 0,
      cant_evacuate: 0,
    }
    for (const it of items) {
      // @ts-ignore dynamic key access
      s[it.assignmentStatus]++
      if (it.status === "need_help") s.need_help++
      if (it.status === "cant_evacuate") s.cant_evacuate++
    }
    return s
  }, [items])

  async function updateStatus(id: string, assignmentStatus: Checkin["assignmentStatus"], assignedTo?: string) {
    const res = await fetch("/api/checkins", {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id, assignmentStatus, assignedTo }),
    })
    const json = await res.json()
    if (res.ok && json?.record) {
      setItems((prev) => prev.map((p) => (p.id === id ? json.record : p)))
    }
  }

  return (
    <div className="space-y-6">
      <Card className="border-l-8 border-l-blue-600">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Shield className="h-5 w-5 text-blue-700" />
            Responder Portal
          </CardTitle>
          <CardDescription>Live feed of civilian check-ins with assignment workflow.</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-6 gap-3">
            <Stat label="Total" value={summary.total} />
            <Stat label="Unassigned" value={summary.unassigned} />
            <Stat label="Claimed" value={summary.claimed} />
            <Stat label="En Route" value={summary.en_route} />
            <Stat label="Arrived" value={summary.arrived} />
            <Stat label="Completed" value={summary.completed} />
          </div>
          <div className="flex gap-2 mt-4">
            <Badge className="bg-amber-100 text-amber-800 border-2 border-amber-600">
              <AlertTriangle className="h-3 w-3 mr-1" /> Need Help: {summary.need_help}
            </Badge>
            <Badge className="bg-red-100 text-red-800 border-2 border-red-600">
              <MapPin className="h-3 w-3 mr-1" /> Can't Evacuate: {summary.cant_evacuate}
            </Badge>
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
        {!loading && items.length === 0 && (
          <Card>
            <CardContent className="p-6 text-sm text-slate-600">
              No check-ins yet. Ask a participant to submit via Civilian Portal.
            </CardContent>
          </Card>
        )}
        {items.map((it) => (
          <Card key={it.id} className="border-2 border-slate-200">
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <CardTitle className="text-base">
                  {it.status === "safe" ? (
                    <span className="text-emerald-700 font-semibold">I'm Safe</span>
                  ) : it.status === "need_help" ? (
                    <span className="text-amber-700 font-semibold">Need Help</span>
                  ) : (
                    <span className="text-red-700 font-semibold">Can't Evacuate</span>
                  )}
                </CardTitle>
                <Badge className="bg-white border-2 border-slate-400 text-slate-700">{it.id.slice(0, 6)}</Badge>
              </div>
              <CardDescription>
                {it.name ? it.name : "Anonymous"}
                {it.contact ? ` • ${it.contact}` : ""}
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="text-sm text-slate-700">
                {it.location ? (
                  <>
                    <MapPin className="inline h-4 w-4 mr-1 text-blue-700" />
                    {it.location.lat.toFixed(4)}, {it.location.lng.toFixed(4)} {it.location.accuracy ? `• ±${Math.round(it.location.accuracy)}m` : ""}
                    {it.location.territory ? ` • ${it.location.territory}` : ""}
                  </>
                ) : (
                  "No location shared"
                )}
              </div>
              {it.notes && <div className="text-sm text-slate-600 line-clamp-3">{it.notes}</div>}
              <div className="flex flex-wrap gap-2">
                <Badge className="bg-slate-100 text-slate-700 border-2 border-slate-400">Mobility: {it.mobility ?? "n/a"}</Badge>
                {(it.dependents?.children || it.dependents?.elders || it.dependents?.pets) && (
                  <Badge className="bg-slate-100 text-slate-700 border-2 border-slate-400">
                    Dependents: {[it.dependents.children ? "Children" : null, it.dependents.elders ? "Elders" : null, it.dependents.pets ? "Pets" : null].filter(Boolean).join(", ")}
                  </Badge>
                )}
              </div>
              <div className="flex flex-wrap gap-2 pt-2">
                {it.assignmentStatus === "unassigned" && (
                  <Button className="bg-blue-600 hover:bg-blue-700 text-white border-2 border-black" onClick={() => updateStatus(it.id, "claimed", "Responder #1")}>
                    <UserCheck className="h-4 w-4 mr-2" />
                    Claim
                  </Button>
                )}
                {it.assignmentStatus === "claimed" && (
                  <Button className="bg-blue-600 hover:bg-blue-700 text-white border-2 border-black" onClick={() => updateStatus(it.id, "en_route", it.assignedTo ?? "Responder #1")}>
                    En Route
                  </Button>
                )}
                {it.assignmentStatus === "en_route" && (
                  <Button className="bg-amber-600 hover:bg-amber-700 text-white border-2 border-black" onClick={() => updateStatus(it.id, "arrived", it.assignedTo ?? "Responder #1")}>
                    Arrived
                  </Button>
                )}
                {it.assignmentStatus === "arrived" && (
                  <Button className="bg-emerald-600 hover:bg-emerald-700 text-white border-2 border-black" onClick={() => updateStatus(it.id, "completed", it.assignedTo ?? "Responder #1")}>
                    <CheckCircle className="h-4 w-4 mr-2" />
                    Completed
                  </Button>
                )}
                {it.assignedTo && <Badge className="bg-white border-2 border-slate-400 text-slate-700">{it.assignedTo} • {it.assignmentStatus.replace("_", " ")}</Badge>}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}

function Stat({ label, value }: { label: string; value: number }) {
  return (
    <div className="p-3 rounded-lg border-2 border-slate-200 bg-white text-center">
      <div className="text-2xl font-bold">{value}</div>
      <div className="text-xs text-slate-600">{label}</div>
    </div>
  )
}
