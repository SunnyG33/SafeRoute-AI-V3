"use client"

import { useEffect, useRef, useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Activity, Clock, MapPin, Send, Stethoscope, UserCheck, Video } from 'lucide-react'

type Props = { incidentId: string }

type ChatMsg = { id: string; from: "civilian" | "responder"; text: string; at: number }

export default function HeroResponderConsole({ incidentId }: Props) {
  const [status, setStatus] = useState<"open" | "closed">("open")
  const [since, setSince] = useState<number>(0)
  const [messages, setMessages] = useState<ChatMsg[]>([])
  const [input, setInput] = useState("")
  const [location, setLocation] = useState<string>("Unknown")
  const [timer, setTimer] = useState<number>(0)
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null)

  // Poll events
  useEffect(() => {
    let t: any
    let stopped = false
    async function poll() {
      try {
        const res = await fetch(`/api/incidents/${incidentId}/events?since=${since}`, { cache: "no-store" })
        const json = await res.json()
        if (Array.isArray(json?.events) && json.events.length) {
          const incomingMsgs = json.events
            .filter((e: any) => e.type === "message")
            .map((e: any) => ({ id: e.id, from: e.from, text: e.payload?.text ?? "", at: e.at }))
          const locEv = json.events.find((e: any) => e.type === "location")
          if (locEv?.payload?.lat && locEv?.payload?.lng) {
            setLocation(`${Number(locEv.payload.lat).toFixed(5)}, ${Number(locEv.payload.lng).toFixed(5)}${locEv.payload.acc ? ` • ±${Math.round(locEv.payload.acc)}m` : ""}`)
          }
          setMessages((prev) => {
            const merged = [...prev, ...incomingMsgs]
            const seen = new Set<string>()
            return merged.filter((m) => (seen.has(m.id) ? false : (seen.add(m.id), true)))
          })
        }
        if (json?.now) setSince(json.now)
      } catch {
        // ignore
      }
      if (!stopped) t = setTimeout(poll, 1200)
    }
    poll()
    return () => {
      stopped = true
      if (t) clearTimeout(t)
    }
  }, [incidentId, since])

  useEffect(() => {
    timerRef.current = setInterval(() => setTimer((s) => s + 1), 1000)
    return () => {
      if (timerRef.current) clearInterval(timerRef.current)
    }
  }, [])

  async function sendMessage() {
    if (!input.trim()) return
    const text = input.trim()
    setInput("")
    const now = Date.now()
    setMessages((prev) => [...prev, { id: `local_${now}`, from: "responder", text, at: now }])
    await fetch(`/api/incidents/${incidentId}/events`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ type: "message", from: "responder", payload: { text } }),
    })
  }

  async function closeIncident() {
    await fetch(`/api/incidents/${incidentId}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ status: "closed" }),
    })
    setStatus("closed")
  }

  const mins = Math.floor(timer / 60)
  const secs = (timer % 60).toString().padStart(2, "0")

  const [tlrtOn, setTlrtOn] = useState(false)

  return (
    <div className="grid gap-6">
      <Card className="border-l-8 border-l-blue-600">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Activity className="h-5 w-5 text-blue-700" />
            HERO OS — Responder Live Console
            <Badge className="ml-2 bg-blue-100 text-blue-800 border-2 border-blue-600">Incident {incidentId.slice(0, 6)}</Badge>
            <Badge variant="outline" className="ml-2">{status.toUpperCase()}</Badge>
          </CardTitle>
        </CardHeader>
        <CardContent className="grid grid-cols-1 lg:grid-cols-3 gap-4">
          {/* Column 1: Scene Overview */}
          <div className="space-y-3">
            <div className="rounded border bg-slate-50 p-3">
              <div className="flex items-center gap-2 text-sm font-semibold">
                <MapPin className="h-4 w-4 text-blue-700" /> Scene Overview
              </div>
              <div className="text-sm mt-2">Location: {location}</div>
              <div className="text-xs text-slate-600 mt-2 flex items-center justify-between">
                <span>Traditional Lands overlay</span>
                <button
                  className={`w-12 h-6 rounded-full border-2 border-black ${tlrtOn ? "bg-blue-600" : "bg-slate-300"}`}
                  aria-pressed={tlrtOn}
                  onClick={() => setTlrtOn((s) => !s)}
                />
              </div>
              {tlrtOn && <div className="text-xs mt-2 text-blue-900">Demo overlay: confirm with local Nation before actions.</div>}
            </div>

            <div className="rounded border bg-black/5 aspect-video flex items-center justify-center text-slate-600">
              <Video className="h-5 w-5 mr-2" /> Live Video (placeholder)
            </div>

            <div className="grid grid-cols-2 gap-2">
              <Button className="bg-blue-600 text-white border-2 border-black" onClick={() => window.open("tel:911")}>
                <UserCheck className="h-4 w-4 mr-2" /> Call Dispatch
              </Button>
              <Button variant="outline" className="border-2" onClick={closeIncident}>
                Close Incident
              </Button>
            </div>
          </div>

          {/* Column 2: Messaging */}
          <div className="flex flex-col">
            <div className="flex items-center justify-between mb-2">
              <div className="text-sm flex items-center gap-2">
                <Clock className="h-4 w-4" /> Timer: {mins}:{secs}
              </div>
              <Badge>Connected</Badge>
            </div>
            <div className="flex-1 rounded border p-2 bg-white overflow-auto max-h-[300px]">
              {messages.length === 0 ? (
                <div className="text-sm text-slate-500">No messages yet.</div>
              ) : (
                <div className="space-y-2">
                  {messages.map((m) => (
                    <div key={m.id} className={`text-sm ${m.from === "civilian" ? "text-emerald-800" : "text-blue-800"}`}>
                      <span className="font-semibold">{m.from === "civilian" ? "Civilian" : "Responder"}:</span> {m.text}
                    </div>
                  ))}
                </div>
              )}
            </div>
            <div className="mt-2 flex gap-2">
              <Input value={input} onChange={(e) => setInput(e.target.value)} placeholder="Type instruction..." onKeyDown={(e) => e.key === "Enter" && sendMessage()} />
              <Button onClick={sendMessage} className="border-2">
                <Send className="h-4 w-4 mr-1" /> Send
              </Button>
            </div>
          </div>

          {/* Column 3: Protocols + Notes */}
          <div className="space-y-3">
            <Card className="border bg-emerald-50">
              <CardHeader className="py-2">
                <CardTitle className="text-sm text-emerald-800 flex items-center gap-2">
                  <Stethoscope className="h-4 w-4" /> Protocol Prompts
                </CardTitle>
              </CardHeader>
              <CardContent className="flex flex-wrap gap-2">
                <Button variant="outline" className="border-2" onClick={() => setInput("Check breathing. Place hand on chest.")}>
                  Airway
                </Button>
                <Button variant="outline" className="border-2" onClick={() => setInput("Begin compressions: 100-120/min, depth 2 inches.")}>
                  CPR
                </Button>
                <Button variant="outline" className="border-2" onClick={() => setInput("Locate AED. Send a runner.")}>
                  AED
                </Button>
                <Button variant="outline" className="border-2" onClick={() => setInput("Clear scene hazards, ensure safety.")}>
                  Scene Safety
                </Button>
              </CardContent>
            </Card>

            <div className="space-y-2">
              <div className="text-sm font-semibold">Notes</div>
              <Textarea placeholder="Responder notes..." className="min-h-[120px]" />
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="text-center text-xs text-slate-600">
        Demo system. For emergencies, call 911. Protocol prompts are informational only.
      </div>
    </div>
  )
}
