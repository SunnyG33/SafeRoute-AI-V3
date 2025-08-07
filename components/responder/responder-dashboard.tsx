"use client"

import { useEffect, useMemo, useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Input } from "@/components/ui/input"
import { useToast } from "@/hooks/use-toast"
import { type SafetyCheckInPayload } from "@/types/checkin"
import { Activity, Check, CheckCircle2, CircleDot, Hand, MapPin, PhoneCall, Shield, UserSearch } from 'lucide-react'

function timeSince(iso: string) {
  const diff = Date.now() - new Date(iso).getTime()
  const mins = Math.floor(diff / 60000)
  if (mins < 1) return "just now"
  if (mins < 60) return `${mins}m ago`
  const hrs = Math.floor(mins / 60)
  if (hrs < 24) return `${hrs}h ago`
  return `${Math.floor(hrs / 24)}d ago`
}

export default function ResponderDashboard() {
  const { toast } = useToast()
  const [items, setItems] = useState<SafetyCheckInPayload[]>([])
  const [query, setQuery] = useState("")
  const [filter, setFilter] = useState<"all" | "need_help" | "cant_evacuate" | "safe">("all")
  const [name, setName] = useState<string>("Responder 12")
  const [loading, setLoading] = useState(false)

  async function load() {
    setLoading(true)
    try {
      const res = await fetch("/api/checkins?limit=200")
      const data = await res.json()
      setItems(data.items || [])
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    load()
    const t = setInterval(load, 5000)
    return () => clearInterval(t)
  }, [])

  const filtered = useMemo(() => {
    return items.filter((i) => {
      if (filter !== "all" && i.status !== filter) return false
      if (!query) return true
      const hay = `${i.userAlias ?? ""} ${i.note ?? ""} ${i.territory ?? ""}`.toLowerCase()
      return hay.includes(query.toLowerCase())
    })
  }, [items, query, filter])

  async function patch(id: string, updates: Partial<SafetyCheckInPayload>) {
    const res = await fetch("/api/checkins", {
      method: "PATCH",
      body: JSON.stringify({ id, updates }),
    })
    const data = await res.json()
    if (!res.ok || data?.error) {
      toast({ title: "Update failed", description: data?.error || "Unknown error", variant: "destructive" })
      return null
    }
    setItems((prev) => prev.map((p) => (p.id === id ? data.item : p)))
    return data.item as SafetyCheckInPayload
  }

  async function claim(item: SafetyCheckInPayload) {
    await patch(item.id, {
      assignment: {
        responderId: name,
        responderName: name,
        state: "claimed",
      },
    })
  }
  async function enRoute(item: SafetyCheckInPayload) {
    await patch(item.id, {
      assignment: {
        responderId: name,
        responderName: name,
        state: "en_route",
      },
    })
  }
  async function arrived(item: SafetyCheckInPayload) {
    await patch(item.id, {
      assignment: {
        responderId: name,
        responderName: name,
        state: "arrived",
      },
    })
  }
  async function completed(item: SafetyCheckInPayload) {
    await patch(item.id, {
      assignment: {
        responderId: name,
        responderName: name,
        state: "completed",
      },
    })
  }

  const needHelpCount = items.filter((i) => i.status === "need_help").length
  const assignedCount = items.filter((i) => i.assignment?.state === "claimed" || i.assignment?.state === "en_route").length
  const completedCount = items.filter((i) => i.assignment?.state === "completed").length
  const progress = items.length ? Math.round((completedCount / items.length) * 100) : 0

  return (
    <div className="space-y-6">
      {/* Header summary */}
      <Card className="bg-stone-900 text-white border-stone-800">
        <CardContent className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="p-4 rounded-lg bg-red-700/40 border border-red-600">
              <div className="text-sm opacity-80">Open Help Requests</div>
              <div className="text-3xl font-bold">{needHelpCount}</div>
            </div>
            <div className="p-4 rounded-lg bg-amber-700/40 border border-amber-600">
              <div className="text-sm opacity-80">Assigned</div>
              <div className="text-3xl font-bold">{assignedCount}</div>
            </div>
            <div className="p-4 rounded-lg bg-emerald-700/40 border border-emerald-600">
              <div className="text-sm opacity-80">Completed</div>
              <div className="text-3xl font-bold">{completedCount}</div>
            </div>
            <div className="p-4 rounded-lg bg-stone-800 border border-stone-700">
              <div className="text-sm opacity-80 mb-1">Ops Progress</div>
              <Progress value={progress} />
              <div className="text-xs opacity-70 mt-1">{progress}% complete</div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Controls */}
      <Card>
        <CardContent className="p-4 flex flex-col md:flex-row gap-3 md:items-center md:justify-between">
          <div className="flex items-center gap-2">
            <Shield className="w-5 h-5 text-stone-700" />
            <span className="font-medium">Responder Name</span>
            <Input value={name} onChange={(e) => setName(e.target.value)} className="w-48" />
          </div>
          <div className="flex gap-2">
            <Button
              variant={filter === "all" ? "default" : "outline"}
              onClick={() => setFilter("all")}
              className={filter === "all" ? "bg-stone-900" : ""}
            >
              All
            </Button>
            <Button
              variant={filter === "need_help" ? "default" : "outline"}
              onClick={() => setFilter("need_help")}
              className={filter === "need_help" ? "bg-red-600" : ""}
            >
              Need Help
            </Button>
            <Button
              variant={filter === "cant_evacuate" ? "default" : "outline"}
              onClick={() => setFilter("cant_evacuate")}
              className={filter === "cant_evacuate" ? "bg-amber-600" : ""}
            >
              Can't Evacuate
            </Button>
            <Button
              variant={filter === "safe" ? "default" : "outline"}
              onClick={() => setFilter("safe")}
              className={filter === "safe" ? "bg-emerald-600" : ""}
            >
              Safe
            </Button>
          </div>
          <div className="flex items-center gap-2">
            <UserSearch className="w-5 h-5 text-stone-700" />
            <Input
              placeholder="Search notes, alias, territory"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className="w-64"
            />
          </div>
        </CardContent>
      </Card>

      {/* Feed */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {filtered.map((item) => (
          <Card key={item.id}>
            <CardHeader className="pb-3">
              <CardTitle className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  {item.status === "need_help" ? (
                    <Hand className="w-5 h-5 text-red-600" />
                  ) : item.status === "cant_evacuate" ? (
                    <CircleDot className="w-5 h-5 text-amber-600" />
                  ) : (
                    <CheckCircle2 className="w-5 h-5 text-emerald-600" />
                  )}
                  <span className="text-base">
                    {item.status === "need_help"
                      ? "Need Help"
                      : item.status === "cant_evacuate"
                        ? "Can't Evacuate"
                        : "Marked Safe"}
                  </span>
                </div>
                <Badge variant="outline">
                  {(item.assignment?.state || "unassigned").replace("_", " ")}
                </Badge>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex items-center justify-between text-sm">
                <div className="font-medium">{item.userAlias || "Anonymous"}</div>
                <div className="text-muted-foreground">{timeSince(item.createdAt)}</div>
              </div>
              {item.note && <div className="text-sm">{item.note}</div>}
              <div className="flex flex-wrap items-center gap-3 text-xs text-muted-foreground">
                {item.location ? (
                  <span className="inline-flex items-center gap-1">
                    <MapPin className="w-4 h-4" /> {item.location.lat.toFixed(3)},{" "}
                    {item.location.lng.toFixed(3)}
                  </span>
                ) : (
                  <span>No location</span>
                )}
                {typeof item.dependents === "number" && (
                  <span>Dependents: {item.dependents}</span>
                )}
                {item.mobilityNeeds && <span>Mobility needs</span>}
                {item.language && <span>Lang: {item.language}</span>}
                {item.territory && <span>Territory: {item.territory}</span>}
              </div>

              {/* Actions */}
              <div className="flex flex-wrap gap-2">
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => claim(item)}
                  disabled={!!item.assignment?.responderId && item.assignment?.state !== "unassigned"}
                >
                  <Shield className="w-4 h-4 mr-1" /> Claim
                </Button>
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => enRoute(item)}
                  disabled={item.assignment?.state === "en_route" || item.assignment?.state === "arrived" || item.assignment?.state === "completed"}
                >
                  <Activity className="w-4 h-4 mr-1" /> En Route
                </Button>
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => arrived(item)}
                  disabled={item.assignment?.state === "arrived" || item.assignment?.state === "completed"}
                >
                  <PhoneCall className="w-4 h-4 mr-1" /> Arrived
                </Button>
                <Button
                  size="sm"
                  className="bg-emerald-600 hover:bg-emerald-700 text-white"
                  onClick={() => completed(item)}
                  disabled={item.assignment?.state === "completed"}
                >
                  <Check className="w-4 h-4 mr-1" /> Complete
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
        {!filtered.length && !loading && (
          <div className="text-sm text-muted-foreground">No records match your filters.</div>
        )}
      </div>
    </div>
  )
}
