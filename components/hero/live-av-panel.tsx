"use client"

import { useCallback, useEffect, useMemo, useRef, useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { AlertTriangle, Loader2, Mic, MicOff, PhoneCall, PhoneOff, Shield, Video, VideoOff } from 'lucide-react'
import { offlineFetch } from "@/lib/offline-queue"

type Role = "civilian" | "responder"

type AVState =
  | "idle"
  | "requesting"
  | "consent"
  | "connecting"
  | "connected"
  | "ended"
  | "error"

type LiveAVPanelProps = {
  incidentId: string
  role: Role
  className?: string
}

export function LiveAVPanel({ incidentId, role, className }: LiveAVPanelProps) {
  const [phase, setPhase] = useState<AVState>("idle")
  const [since, setSince] = useState<number>(0)
  const [reason, setReason] = useState<string>("")
  const [micOn, setMicOn] = useState(true)
  const [camOn, setCamOn] = useState(true)
  const [permsDenied, setPermsDenied] = useState(false)
  const localVideoRef = useRef<HTMLVideoElement | null>(null)
  const localStreamRef = useRef<MediaStream | null>(null)
  const pollRef = useRef<number | null>(null)

  const youAreRequester = role === "responder"

  const statusBadge = useMemo(() => {
    const map: Record<AVState, { label: string; color: string }> = {
      idle: { label: "Idle", color: "bg-slate-100 text-slate-800 border-slate-400" },
      requesting: { label: "Requesting", color: "bg-amber-100 text-amber-800 border-amber-500" },
      consent: { label: "Awaiting Consent", color: "bg-amber-100 text-amber-800 border-amber-500" },
      connecting: { label: "Connecting", color: "bg-blue-100 text-blue-800 border-blue-500" },
      connected: { label: "Connected", color: "bg-emerald-100 text-emerald-800 border-emerald-500" },
      ended: { label: "Ended", color: "bg-slate-100 text-slate-800 border-slate-400" },
      error: { label: "Error", color: "bg-red-100 text-red-800 border-red-500" },
    }
    return map[phase]
  }, [phase])

  const startLocalMedia = useCallback(async () => {
    try {
      setPermsDenied(false)
      const stream = await navigator.mediaDevices.getUserMedia({ video: true, audio: true })
      localStreamRef.current = stream
      if (localVideoRef.current) {
        localVideoRef.current.srcObject = stream
      }
      for (const track of stream.getAudioTracks()) track.enabled = micOn
      for (const track of stream.getVideoTracks()) track.enabled = camOn
    } catch {
      setPermsDenied(true)
      setPhase("error")
      setReason("Microphone/Camera permission denied or unavailable.")
    }
  }, [camOn, micOn])

  const stopLocalMedia = useCallback(() => {
    const s = localStreamRef.current
    if (s) {
      s.getTracks().forEach((t) => t.stop())
      localStreamRef.current = null
    }
    if (localVideoRef.current) localVideoRef.current.srcObject = null
  }, [])

  const toggleMic = useCallback(() => {
    const next = !micOn
    setMicOn(next)
    const s = localStreamRef.current
    if (s) for (const track of s.getAudioTracks()) track.enabled = next
  }, [micOn])

  const toggleCam = useCallback(() => {
    const next = !camOn
    setCamOn(next)
    const s = localStreamRef.current
    if (s) for (const track of s.getVideoTracks()) track.enabled = next
  }, [camOn])

  async function requestAV() {
    setPhase("requesting")
    await offlineFetch(`/api/incidents/${incidentId}/events`, {
      method: "POST",
      body: { type: "av_request", from: role, payload: { medium: "webrtc", at: Date.now() } },
    })
    setPhase("consent")
  }

  async function acceptAV() {
    setPhase("connecting")
    await startLocalMedia()
    await offlineFetch(`/api/incidents/${incidentId}/events`, {
      method: "POST",
      body: { type: "av_accept", from: role, payload: { at: Date.now() } },
    })
    setPhase("connected")
  }

  async function declineAV() {
    await offlineFetch(`/api/incidents/${incidentId}/events`, {
      method: "POST",
      body: { type: "av_end", from: role, payload: { at: Date.now(), reason: "declined" } },
    })
    stopLocalMedia()
    setPhase("idle")
  }

  async function endAV() {
    await offlineFetch(`/api/incidents/${incidentId}/events`, {
      method: "POST",
      body: { type: "av_end", from: role, payload: { at: Date.now(), reason: "ended" } },
    })
    stopLocalMedia()
    setPhase("ended")
  }

  useEffect(() => {
    let cancelled = false
    async function poll() {
      try {
        const res = await fetch(`/api/incidents/${incidentId}/events?since=${since}`, { cache: "no-store" })
        const { events, now } = await res.json()
        if (Array.isArray(events) && events.length) {
          let sawRequest = false
          let sawAccept = false
          let sawEnd = false
          for (const e of events) {
            if (e.type === "av_request") sawRequest = true
            if (e.type === "av_accept") sawAccept = true
            if (e.type === "av_end") sawEnd = true
          }

          if (role === "civilian" && sawRequest && phase === "idle") {
            setPhase("consent")
          }
          if (role === "responder" && sawAccept && (phase === "consent" || phase === "requesting")) {
            setPhase("connected")
            if (!localStreamRef.current) startLocalMedia().catch(() => {})
          }
          if (sawEnd) {
            stopLocalMedia()
            setPhase("ended")
          }
        }
        if (now) setSince(now)
      } catch {}
      if (!cancelled) {
        pollRef.current = window.setTimeout(poll, 1200)
      }
    }
    poll()
    return () => {
      cancelled = true
      if (pollRef.current) window.clearTimeout(pollRef.current)
    }
  }, [incidentId, since, phase, role, startLocalMedia, stopLocalMedia])

  useEffect(() => {
    return () => stopLocalMedia()
  }, [stopLocalMedia])

  const title = role === "responder" ? "Live A/V — Responder" : "Live A/V — Civilian"

  return (
    <Card className={className ? className : ""}>
      <CardHeader className="py-3">
        <CardTitle className="text-sm sm:text-base flex items-center gap-2">
          <Shield className="h-4 w-4" />
          {title}
          <Badge className={`ml-auto border ${statusBadge.color}`}>{statusBadge.label}</Badge>
        </CardTitle>
      </CardHeader>
      <CardContent className="grid gap-3">
        {phase === "error" ? (
          <div className="rounded border bg-red-50 text-red-800 p-3 text-sm flex items-center gap-2">
            <AlertTriangle className="h-4 w-4" />
            {reason || "A/V error"}
          </div>
        ) : null}

        {phase === "consent" && role === "civilian" ? (
          <div className="rounded border bg-amber-50 text-amber-900 p-3 text-sm">
            A responder is requesting secure audio/video to assist you. Share only if you are comfortable.
          </div>
        ) : null}

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <div className="rounded-lg border overflow-hidden bg-black aspect-video relative">
            <video ref={localVideoRef} className="h-full w-full object-cover" autoPlay playsInline muted />
            {!localStreamRef.current ? (
              <div className="absolute inset-0 grid place-items-center text-white/80 text-xs sm:text-sm">
                {phase === "connected" || phase === "connecting" ? (
                  <div className="flex items-center gap-2">
                    <Loader2 className="h-4 w-4 animate-spin" /> Starting your camera…
                  </div>
                ) : (
                  <div className="text-center px-6">
                    Local preview
                    <div className="text-white/60">Camera is off</div>
                  </div>
                )}
              </div>
            ) : null}
          </div>
          <div className="rounded-lg border overflow-hidden bg-slate-900 aspect-video relative">
            <div className="absolute inset-0 grid place-items-center text-slate-200 text-center px-6">
              <div className="space-y-1">
                <div className="text-sm sm:text-base">Remote preview</div>
                <div className="text-xs text-slate-400">
                  Demo mode: remote video not streamed. Connect signaling to enable.
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          {role === "civilian" && phase === "consent" ? (
            <>
              <Button className="border-2" onClick={acceptAV}>
                <PhoneCall className="h-4 w-4 mr-2" />
                Accept and Start
              </Button>
              <Button variant="outline" className="border-2" onClick={declineAV}>
                Not Now
              </Button>
            </>
          ) : null}

          {role === "responder" && (phase === "idle" || phase === "ended") ? (
            <Button className="border-2" onClick={requestAV}>
              <PhoneCall className="h-4 w-4 mr-2" />
              Request A/V
            </Button>
          ) : null}

          {role === "responder" && phase === "consent" ? (
            <div className="flex items-center gap-2 text-sm text-amber-700">
              <Loader2 className="h-4 w-4 animate-spin" />
              Awaiting civilian consent…
              <Button variant="outline" size="sm" className="ml-2 border-2" onClick={declineAV}>
                Cancel
              </Button>
            </div>
          ) : null}

          {(phase === "connected" || phase === "connecting") && (
            <>
              <Button variant={micOn ? "default" : "outline"} className="border-2" onClick={toggleMic} aria-pressed={micOn}>
                {micOn ? <Mic className="h-4 w-4 mr-2" /> : <MicOff className="h-4 w-4 mr-2" />}
                {micOn ? "Mic On" : "Mic Off"}
              </Button>
              <Button variant={camOn ? "default" : "outline"} className="border-2" onClick={toggleCam} aria-pressed={camOn}>
                {camOn ? <Video className="h-4 w-4 mr-2" /> : <VideoOff className="h-4 w-4 mr-2" />}
                {camOn ? "Camera On" : "Camera Off"}
              </Button>
              <Button variant="destructive" className="border-2" onClick={endAV}>
                <PhoneOff className="h-4 w-4 mr-2" />
                End Session
              </Button>
            </>
          )}

          {permsDenied ? (
            <div className="text-xs text-red-700 flex items-center gap-2">
              <AlertTriangle className="h-3 w-3" />
              Enable camera and mic in your browser permissions to use A/V.
            </div>
          ) : null}
        </div>

        <div className="text-[11px] text-slate-500">
          Demo only — no recordings are stored. For emergencies, call 911.
        </div>
      </CardContent>
    </Card>
  )
}
