"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import GeoTargetPicker from "./geo-target-picker"
import type { AlertRecord } from "@/types/alert"
import { AlertTriangle, Send } from 'lucide-react'
import { useToast } from "@/hooks/use-toast"

type FormState = {
  type: AlertRecord["type"]
  severity: AlertRecord["severity"]
  title: string
  message: string
  expiresMinutes: number
  languages: string
  channels: string
  source: string
  area: { lat: number; lng: number; radiusMeters: number } | null
}

export default function BroadcastConsole() {
  const { toast } = useToast()
  const [loading, setLoading] = useState(false)
  const [form, setForm] = useState<FormState>({
    type: "evacuation",
    severity: "high",
    title: "Evacuate to nearest high ground immediately",
    message:
      "Flood risk detected. Move to designated evacuation points. Assist elders and children. Do not enter flooded roadways.",
    expiresMinutes: 120,
    languages: "en, fr",
    channels: "push, sms, radio, satellite",
    source: "BodyGuard Console (demo)",
    area: { lat: 49.2827, lng: -123.1207, radiusMeters: 2000 },
  })

  async function submit() {
    setLoading(true)
    try {
      const expiresAt = Date.now() + form.expiresMinutes * 60 * 1000
      const res = await fetch("/api/alerts", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          type: form.type,
          severity: form.severity,
          title: form.title,
          message: form.message,
          area: form.area,
          languages: form.languages.split(",").map((s) => s.trim()).filter(Boolean),
          channels: form.channels.split(",").map((s) => s.trim()).filter(Boolean),
          source: form.source,
          expiresAt,
        }),
      })
      const json = await res.json()
      if (!res.ok) throw new Error(json.error || "Failed to broadcast")
      toast({ title: "Alert broadcasted", description: json.record.title })
      // reset title/message optionally
    } catch (e: any) {
      toast({ title: "Broadcast failed", description: e.message, variant: "destructive" as any })
    } finally {
      setLoading(false)
    }
  }

  return (
    <Card className="border-2">
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle className="flex items-center gap-2">
          <AlertTriangle className="h-5 w-5 text-orange-600" />
          {"Broadcast Console"}
        </CardTitle>
      </CardHeader>
      <CardContent className="grid gap-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
          <div>
            <label className="text-xs font-medium">Type</label>
            <select
              className="w-full border rounded px-2 py-2"
              value={form.type}
              onChange={(e) => setForm((f) => ({ ...f, type: e.target.value as any }))}
            >
              <option value="evacuation">Evacuation</option>
              <option value="shelter">Shelter</option>
              <option value="warning">Warning</option>
              <option value="info">Info</option>
              <option value="all-clear">All-Clear</option>
            </select>
          </div>
          <div>
            <label className="text-xs font-medium">Severity</label>
            <select
              className="w-full border rounded px-2 py-2"
              value={form.severity}
              onChange={(e) => setForm((f) => ({ ...f, severity: e.target.value as any }))}
            >
              <option value="critical">Critical</option>
              <option value="high">High</option>
              <option value="medium">Medium</option>
              <option value="low">Low</option>
            </select>
          </div>
          <div>
            <label className="text-xs font-medium">Expires (minutes)</label>
            <Input
              type="number"
              value={form.expiresMinutes}
              onChange={(e) => setForm((f) => ({ ...f, expiresMinutes: Number(e.target.value) }))}
            />
          </div>
        </div>

        <div className="grid gap-2">
          <label className="text-xs font-medium">Title</label>
          <Input
            value={form.title}
            onChange={(e) => setForm((f) => ({ ...f, title: e.target.value }))}
          />
        </div>

        <div className="grid gap-2">
          <label className="text-xs font-medium">Message</label>
          <Textarea
            value={form.message}
            onChange={(e) => setForm((f) => ({ ...f, message: e.target.value }))}
            rows={4}
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          <div className="grid gap-2">
            <label className="text-xs font-medium">Languages (comma-separated)</label>
            <Input
              value={form.languages}
              onChange={(e) => setForm((f) => ({ ...f, languages: e.target.value }))}
            />
          </div>
          <div className="grid gap-2">
            <label className="text-xs font-medium">Channels (comma-separated)</label>
            <Input
              value={form.channels}
              onChange={(e) => setForm((f) => ({ ...f, channels: e.target.value }))}
            />
          </div>
        </div>

        <div className="grid gap-2">
          <label className="text-xs font-medium">Source</label>
          <Input value={form.source} onChange={(e) => setForm((f) => ({ ...f, source: e.target.value }))} />
        </div>

        <div className="grid gap-2">
          <label className="text-xs font-medium">Geo Target (center + radius)</label>
          <GeoTargetPicker
            value={form.area}
            onChange={(area) => setForm((f) => ({ ...f, area }))}
          />
        </div>

        <div className="flex justify-end">
          <Button disabled={loading} onClick={submit} className="border-2 bg-orange-600 text-white">
            <Send className="h-4 w-4 mr-2" />
            {loading ? "Broadcasting..." : "Broadcast Alert"}
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}
