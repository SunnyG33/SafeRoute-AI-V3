"use client"

import { useEffect, useRef, useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { AlertTriangle, Camera, MapPin, Mic, MicOff, Send, ShieldCheck, Video, VideoOff } from 'lucide-react'

type Props = {
  incidentId: string
}

type ChatMsg = { id: string; from: "civilian" | "responder"; text: string; at: number }

export default function HeroCivilianLive({ incidentId }: Props) {
  const [connected, setConnected] = useState(false)
  const [micOn, setMicOn] = useState(true)
  const [camOn, setCamOn] = useState(false) // Webcam preview optional
  const [consent, setConsent] = useState(false)
  const [coords, setCoords] = useState<{ lat: number; lng: number; acc?: number } | null>(null)
  const [messages, setMessages] = useState<ChatMsg[]>([])
  const [input, setInput] = useState("")
  const [since, setSince] = useState<number>(0)
  const videoRef = useRef<HTMLVideoElement | null>(null)

  // Poll events
  useEffect(() => {
    let t: any
    let stopped = false
    async function poll() {
      try {
        const res = await fetch(`/api/incidents/${incidentId}/events?since=${since}`, { cache: "no-store" })
        const json = await res.json()
        if (json?.events?.length) {
          const incoming = json.events
            .filter((e: any) => e.type === "message")
            .map((e: any) => ({ id: e.id, from: e.from, text: e.payload?.text ?? "", at: e.at }))
          setMessages((prev) => {
            const merged = [...prev, ...incoming]
            // dedupe by id
            const seen = new Set<string>()
            return merged.filter((m) => (seen.has(m.id) ? false : (seen.add(m.id), true)))
          })
        }
        if (json?.now) setSince(json.now)
      } catch {
        // ignore
      }
      if (!stopped) t = setTimeout(poll, 1500)
    }
    poll()
    return () => {
      stopped = true
      if (t) clearTimeout(t)
    }
  }, [incidentId, since])

  // Geolocation
  useEffect(() => {
    if (!connected) return
    if (!("geolocation" in navigator)) return
    const watchId = navigator.geolocation.watchPosition(
      (pos) => {
        const c = { lat: pos.coords.latitude, lng: pos.coords.longitude, acc: pos.coords.accuracy }
        setCoords(c)
        if (consent) {
          fetch(`/api/incidents/${incidentId}/events`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ type: "location", from: "civilian", payload: c }),
          })
        }
      },
      () => {},
      { enableHighAccuracy: true, maximumAge: 10000, timeout: 10000 },
    )
    return () => {
      if (watchId) navigator.geolocation.clearWatch(watchId)
    }
  }, [connected, incidentId, consent])

  async function toggleConnect() {
    if (!connected) {
      // mark consent if granted
      if (consent) {
        await fetch(`/api/incidents/${incidentId}/events`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ type: "consent", from: "civilian", payload: { location: true, media: camOn || micOn } }),
        })
      }
      setConnected(true)
    } else {
      setConnected(false)
    }
  }

  async function sendMessage() {
    if (!input.trim()) return
    const text = input.trim()
    setInput("")
    // optimistic
    const now = Date.now()
    setMessages((prev) => [...prev, { id: `local_${now}`, from: "civilian", text, at: now }])
    await fetch(`/api/incidents/${incidentId}/events`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ type: "message", from: "civilian", payload: { text } }),
    })
  }

  async function sendStatus(s: string) {
    await fetch(`/api/incidents/${incidentId}/events`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ type: "status", from: "civilian", payload: { status: s } }),
    })
  }

  // Optional webcam preview (no upload)
  async function startCam() {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: true, audio: false })
      if (videoRef.current) {
        videoRef.current.srcObject = stream
        await videoRef.current.play()
        setCamOn(true)
      }
    } catch {
      setCamOn(false)
    }
  }
  function stopCam() {
    const media = videoRef.current?.srcObject as MediaStream | null
    media?.getTracks().forEach((t) => t.stop())
    if (videoRef.current) videoRef.current.srcObject = null
    setCamOn(false)
  }

  // TLRT toggle local
  const [tlrtOn, setTlrtOn] = useState(false)

  return (
    <div className="grid gap-6">
      <Card className="border-l-8 border-l-emerald-600">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <ShieldCheck className="h-5 w-5 text-emerald-700" />
            HERO CP — Civilian Live Session
            <Badge className="ml-2 bg-emerald-100 text-emerald-800 border-2 border-emerald-600">Incident {incidentId.slice(0, 6)}</Badge>
          </CardTitle>
        </CardHeader>
        <CardContent className="grid grid-cols-1 lg:grid-cols-3 gap-4">
          {/* Column 1: Connection + Media */}
          <div className="space-y-3">
            <div className="flex flex-wrap gap-2">
              <Button onClick={toggleConnect} className={`border-2 ${connected ? "bg-red-600 text-white border-black" : "bg-emerald-600 text-white border-black"}`}>
                {connected ? "Disconnect" : "Connect to Responder"}
              </Button>
              <Button variant="outline" className="border-2" onClick={() => setMicOn((s) => !s)}>
                {micOn ? <Mic className="h-4 w-4 mr-2" /> : <MicOff className="h-4 w-4 mr-2" />} Mic
              </Button>
              {!camOn ? (
                <Button variant="outline" className="border-2" onClick={startCam}>
                  <Video className="h-4 w-4 mr-2" />
                  Camera
                </Button>
              ) : (
                <Button variant="outline" className="border-2" onClick={stopCam}>
                  <VideoOff className="h-4 w-4 mr-2" />
                  Camera
                </Button>
              )}
            </div>

            <div className="p-2 rounded border bg-slate-50">
              <div className="text-xs mb-2">Consent</div>
              <div className="flex items-center gap-2">
                <input id="consent" type="checkbox" className="h-4 w-4" checked={consent} onChange={(e) => setConsent(e.target.checked)} />
                <label htmlFor="consent" className="text-sm">I consent to share info for emergency coordination.</label>
              </div>
            </div>

            <div className="rounded border overflow-hidden bg-black/5 aspect-video flex items-center justify-center">
              {camOn ? (
                <video ref={videoRef} className="w-full h-full object-cover" muted playsInline />
              ) : (
                <div className="text-slate-500 text-sm flex items-center gap-2">
                  <Camera className="h-4 w-4" /> Camera preview off
                </div>
              )}
            </div>

            <div className="p-2 rounded border bg-slate-50 text-sm">
              <div className="flex items-center gap-2">
                <MapPin className="h-4 w-4 text-blue-700" />
                {coords ? (
                  <span>Lat {coords.lat.toFixed(5)}, Lng {coords.lng.toFixed(5)} {coords.acc ? <>• ±{Math.round(coords.acc)}m</> : null}</span>
                ) : (
                  <span>Location not available</span>
                )}
              </div>
              <div className="flex items-center justify-between mt-2">
                <div className="text-xs">Traditional Lands overlay</div>
                <button
                  className={`w-12 h-6 rounded-full border-2 border-black ${tlrtOn ? "bg-blue-600" : "bg-slate-300"}`}
                  aria-pressed={tlrtOn}
                  onClick={() => setTlrtOn((s) => !s)}
                />
              </div>
              {tlrtOn && (
                <div className="mt-2 text-xs text-blue-900">
                  Respectful Notice: You may be on Indigenous lands. Confirm with local Nation. Demo overlay only.
                </div>
              )}
            </div>
          </div>

          {/* Column 2: Messaging */}
          <div className="flex flex-col">
            <div className="flex-1 rounded border p-2 bg-white overflow-auto max-h-[300px]">
              {messages.length === 0 ? (
                <div className="text-sm text-slate-500">No messages yet.</div>
              ) : (
                <div className="space-y-2">
                  {messages.map((m) => (
                    <div key={m.id} className={`text-sm ${m.from === "civilian" ? "text-emerald-800" : "text-blue-800"}`}>
                      <span className="font-semibold">{m.from === "civilian" ? "You" : "Responder"}:</span> {m.text}
                    </div>
                  ))}
                </div>
              )}
            </div>
            <div className="mt-2 flex gap-2">
              <Input value={input} onChange={(e) => setInput(e.target.value)} placeholder="Type message..." onKeyDown={(e) => e.key === "Enter" && sendMessage()} />
              <Button onClick={sendMessage} className="border-2">
                <Send className="h-4 w-4 mr-1" /> Send
              </Button>
            </div>
          </div>

          {/* Column 3: Quick Actions */}
          <div className="space-y-3">
            <Card className="border bg-red-50">
              <CardHeader className="py-2">
                <CardTitle className="text-sm text-red-800 flex items-center gap-2">
                  <AlertTriangle className="h-4 w-4" /> Quick Status
                </CardTitle>
              </CardHeader>
              <CardContent className="flex flex-wrap gap-2">
                <Button className="bg-red-600 text-white border-2 border-black" onClick={() => sendStatus("CPR needed")}>CPR needed</Button>
                <Button className="bg-amber-600 text-white border-2 border-black" onClick={() => sendStatus("AED nearby")}>AED nearby</Button>
                <Button className="bg-blue-600 text-white border-2 border-black" onClick={() => sendStatus("Breathing")}>Breathing</Button>
                <Button variant="outline" className="border-2" onClick={() => sendStatus("Scene safe")}>Scene safe</Button>
              </CardContent>
            </Card>

            <div className="space-y-2">
              <div className="text-sm font-semibold">Notes (not shared unless sent)</div>
              <Textarea placeholder="Hazards, access, patient info..." className="min-h-[100px]" />
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="text-center text-xs text-slate-600">
        Guidance is informational only. Always call 911. Demo media stays local and is not transmitted.
      </div>
    </div>
  )
}
