"use client"

import { useEffect, useMemo, useRef, useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { AlertTriangle, ClipboardCopy, MapPin, Send, Shield, ToggleLeft, Phone } from 'lucide-react'
import { LegalBanner } from "@/components/common/legal-banner"
import { ElderOverrideToggle } from "@/components/common/elder-override-toggle"
import { RAPTRNavRoute } from "@/components/common/raptrnav-route"
import { ConsentControls } from "@/components/common/consent-controls"
import { ComingSoonButton } from "@/components/common/coming-soon"
import { offlineFetch } from "@/lib/offline-queue"

type Loc = { lat: number; lng: number; acc?: number }

export default function HeroCivilianLive({ incidentId }: { incidentId: string }) {
  const [since, setSince] = useState<number>(0)
  const [messages, setMessages] = useState<{ id: string; from: string; text: string }[]>([])
  const [input, setInput] = useState("")
  const [location, setLocation] = useState<Loc | null>(null)
  const [showConsent, setShowConsent] = useState(false)
  const [shareApprox, setShareApprox] = useState(true)
  const [form, setForm] = useState({
    name: "",
    age: "",
    bloodType: "",
    allergies: "",
    medications: "",
    conditions: "",
  })
  const [tlrtOn, setTlrtOn] = useState(false)
  const pollRef = useRef<number | null>(null)

  // Poll for events
  useEffect(() => {
    async function poll() {
      try {
        const res = await fetch(`/api/incidents/${incidentId}/events?since=${since}`, { cache: "no-store" })
        const { events, now } = await res.json()
        if (Array.isArray(events) && events.length) {
          const newMsgs = events
            .filter((e: any) => e.type === "message")
            .map((e: any) => ({ id: e.id, from: e.from, text: e.payload?.text ?? "" }))
          setMessages((prev) => {
            const merged = [...prev, ...newMsgs]
            const seen = new Set<string>()
            return merged.filter((m) => (seen.has(m.id) ? false : (seen.add(m.id), true)))
          })
          const locEv = events.find((e: any) => e.type === "location")
          if (locEv?.payload) setLocation(locEv.payload)
          const medReq = events.find((e: any) => e.type === "med_request")
          if (medReq) setShowConsent(true)
        }
        if (now) setSince(now)
      } catch {}
    }
    poll()
    pollRef.current = window.setInterval(poll, 1200)
    return () => {
      if (pollRef.current) window.clearInterval(pollRef.current)
    }
  }, [incidentId, since])

  async function sendMessage() {
    if (!input.trim()) return
    const text = input.trim()
    setInput("")
    await offlineFetch(`/api/incidents/${incidentId}/events`, {
      method: "POST",
      body: { type: "message", from: "civilian", payload: { text } },
    })
  }

  async function sendLocation() {
    if (!("geolocation" in navigator)) return
    navigator.geolocation.getCurrentPosition(
      async (pos) => {
        let lat = pos.coords.latitude
        let lng = pos.coords.longitude
        if (shareApprox) {
          const round = (n: number, dp: number) => Math.round(n * 10 ** dp) / 10 ** dp
          lat = round(lat, 3)
          lng = round(lng, 3)
        }
        await offlineFetch(`/api/incidents/${incidentId}/events`, {
          method: "POST",
          body: { type: "location", from: "civilian", payload: { lat, lng, acc: pos.coords.accuracy } },
        })
        setLocation({ lat, lng, acc: pos.coords.accuracy })
      },
      () => {},
      { enableHighAccuracy: true, maximumAge: 10_000, timeout: 10_000 },
    )
  }

  async function shareMedical() {
    await offlineFetch(`/api/incidents/${incidentId}/events`, {
      method: "POST",
      body: { type: "med_share", from: "civilian", payload: form },
    })
    setShowConsent(false)
  }

  const responderUrl = useMemo(() => {
    if (typeof window === "undefined") return ""
    const u = new URL(window.location.href)
    u.pathname = `/responder-portal/live/${incidentId}`
    u.search = ""
    return u.toString()
  }, [incidentId])

  return (
    <div className="grid gap-6">
      <LegalBanner />
      <Card className="border-l-8 border-l-emerald-600">
        <CardHeader>
          <CardTitle className="flex flex-wrap items-center gap-2">
            <Shield className="h-5 w-5 text-emerald-700" />
            HERO CP — Civilian Live Session
            <Badge className="ml-2 bg-emerald-100 text-emerald-800 border-2 border-emerald-600">Incident {incidentId.slice(0, 8)}</Badge>
          </CardTitle>
        </CardHeader>

        <CardContent className="grid grid-cols-1 lg:grid-cols-3 gap-4">
          {/* Column 1: Scene + TLRT */}
          <div className="space-y-3">
            <div className="rounded border p-3 bg-white">
              <div className="text-sm font-semibold flex items-center gap-2">
                <MapPin className="h-4 w-4 text-emerald-700" /> Your Scene
              </div>
              <div className="mt-2 text-sm">
                {location ? (
                  <div>
                    Lat {location.lat.toFixed(5)}, Lng {location.lng.toFixed(5)} {location.acc ? <>• ±{Math.round(location.acc)}m</> : null}
                  </div>
                ) : (
                  <div className="text-slate-500">No location shared yet</div>
                )}
              </div>
              <div className="flex items-center justify-between mt-2 text-xs">
                <span>Share approximate location only</span>
                <button
                  aria-label="Toggle approximate sharing"
                  className={`w-12 h-6 rounded-full border-2 border-black ${shareApprox ? "bg-emerald-600" : "bg-slate-300"}`}
                  aria-pressed={shareApprox}
                  onClick={() => setShareApprox((s) => !s)}
                />
              </div>
              <div className="flex gap-2 mt-2">
                <Button className="border-2" onClick={sendLocation}>
                  <MapPin className="h-4 w-4 mr-2" /> Share Location
                </Button>
              </div>
              <div className="flex items-center justify-between mt-2 text-xs">
                <span>Traditional Lands overlay</span>
                <button
                  aria-label="Toggle Traditional Lands overlay"
                  className={`w-12 h-6 rounded-full border-2 border-black ${tlrtOn ? "bg-emerald-600" : "bg-slate-300"}`}
                  aria-pressed={tlrtOn}
                  onClick={() => setTlrtOn((s) => !s)}
                />
              </div>
              {tlrtOn && location && <div className="mt-2 text-xs text-emerald-900">Consult local Nations. Demo overlay only.</div>}
            </div>

            <RAPTRNavRoute origin={location} />

            <div className="rounded border p-2 bg-amber-50 text-xs text-amber-800 flex items-center gap-2">
              <AlertTriangle className="h-4 w-4" />
              Demo system. Call 911 in an emergency.
            </div>

            <div className="flex flex-wrap gap-2">
              <Button variant="outline" className="border-2" onClick={() => navigator.clipboard?.writeText(incidentId)}>
                <ClipboardCopy className="h-4 w-4 mr-2" /> Copy Incident ID
              </Button>
              <Button variant="outline" className="border-2" onClick={() => navigator.clipboard?.writeText(responderUrl)}>
                <ClipboardCopy className="h-4 w-4 mr-2" /> Copy Responder Link
              </Button>
              <Button className="border-2" onClick={() => (window.location.href = `/sim-911/${incidentId}`)}>
                <Phone className="h-4 w-4 mr-2" /> Call 911 (Sim)
              </Button>
            </div>
          </div>

          {/* Column 2: Chat */}
          <div className="flex flex-col">
            <div className="flex-1 rounded border p-2 bg-white overflow-auto max-h-[320px]" aria-live="polite">
              {messages.length === 0 ? (
                <div className="text-sm text-slate-500">Awaiting responder...</div>
              ) : (
                <div className="space-y-2">
                  {messages.map((m) => (
                    <div key={m.id} className={`text-sm ${m.from === "responder" ? "text-blue-800" : "text-emerald-800"}`}>
                      <span className="font-semibold">{m.from === "responder" ? "Responder" : "You"}:</span> {m.text}
                    </div>
                  ))}
                </div>
              )}
            </div>
            <div className="mt-2 flex gap-2">
              <Input value={input} onChange={(e) => setInput(e.target.value)} placeholder="Type a message..." onKeyDown={(e) => e.key === "Enter" && sendMessage()} />
              <Button className="border-2" onClick={sendMessage}>
                <Send className="h-4 w-4 mr-1" /> Send
              </Button>
            </div>
            <div className="mt-2">
              <ComingSoonButton label="Start CPR Guidance" message="Live CPR/First Aid guidance will be available soon." />
            </div>
          </div>

          {/* Column 3: Consent-first Share (shows when responder requests) */}
          <div className="space-y-3">
            <ConsentControls incidentId={incidentId} />
            {showConsent ? (
              <Card className="border">
                <CardHeader className="py-2">
                  <CardTitle className="text-sm flex items-center gap-2">
                    <ToggleLeft className="h-4 w-4" /> Share Medical Summary (Consent)
                  </CardTitle>
                </CardHeader>
                <CardContent className="text-sm space-y-2">
                  <div className="text-slate-600">A responder requested your medical summary. Share only what you’re comfortable with.</div>
                  <Input placeholder="Name" value={form.name} onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))} />
                  <div className="grid grid-cols-2 gap-2">
                    <Input placeholder="Age" value={form.age} onChange={(e) => setForm((f) => ({ ...f, age: e.target.value }))} />
                    <Input placeholder="Blood Type (e.g., O+)" value={form.bloodType} onChange={(e) => setForm((f) => ({ ...f, bloodType: e.target.value }))} />
                  </div>
                  <Textarea placeholder="Allergies" value={form.allergies} onChange={(e) => setForm((f) => ({ ...f, allergies: e.target.value }))} />
                  <Textarea placeholder="Medications" value={form.medications} onChange={(e) => setForm((f) => ({ ...f, medications: e.target.value }))} />
                  <Textarea placeholder="Conditions (e.g., Asthma, Diabetes)" value={form.conditions} onChange={(e) => setForm((f) => ({ ...f, conditions: e.target.value }))} />
                  <div className="flex gap-2">
                    <Button className="border-2" onClick={shareMedical}>Share</Button>
                    <Button variant="outline" className="border-2" onClick={() => setShowConsent(false)}>Not Now</Button>
                  </div>
                  <div className="text-xs text-slate-500">Demo-only. No PHI is stored server-side beyond this incident session.</div>
                </CardContent>
              </Card>
            ) : (
              <Card className="border bg-slate-50">
                <CardHeader className="py-2">
                  <CardTitle className="text-sm">Share Medical Summary</CardTitle>
                </CardHeader>
                <CardContent className="text-sm text-slate-600">You’ll be prompted if a responder requests it.</CardContent>
              </Card>
            )}
            <ElderOverrideToggle incidentId={incidentId} />
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
