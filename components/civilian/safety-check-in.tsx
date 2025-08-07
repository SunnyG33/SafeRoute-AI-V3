"use client"

import { useEffect, useMemo, useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { AlertTriangle, CheckCircle, HeartPulse, MapPin } from 'lucide-react'
import type { CheckinStatus, MobilityLevel, Checkin } from "@/types/checkin"

type Geo = { lat: number; lng: number; accuracy?: number }

export default function SafetyCheckIn() {
  const [status, setStatus] = useState<CheckinStatus>("safe")
  const [shareLocation, setShareLocation] = useState<boolean>(true)
  const [geo, setGeo] = useState<Geo | null>(null)
  const [name, setName] = useState("")
  const [contact, setContact] = useState("")
  const [language, setLanguage] = useState("")
  const [mobility, setMobility] = useState<MobilityLevel>("none")
  const [dependents, setDependents] = useState({ children: false, elders: false, pets: false })
  const [notes, setNotes] = useState("")
  const [submitting, setSubmitting] = useState(false)

  useEffect(() => {
    if (!shareLocation) {
      setGeo(null)
      return
    }
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(
        (pos) => {
          setGeo({
            lat: pos.coords.latitude,
            lng: pos.coords.longitude,
            accuracy: pos.coords.accuracy,
          })
        },
        () => setGeo(null),
        { enableHighAccuracy: true, maximumAge: 60_000, timeout: 10_000 },
      )
    }
  }, [shareLocation])

  const statusLabel = useMemo(() => {
    switch (status) {
      case "safe":
        return "I'm Safe - Check In"
      case "need_help":
        return "Need Help"
      case "cant_evacuate":
        return "Can't Evacuate"
    }
  }, [status])

  async function onSubmit() {
    setSubmitting(true)
    try {
      const body = {
        status,
        name: name || undefined,
        contact: contact || undefined,
        language: language || undefined,
        notes: notes || undefined,
        mobility,
        dependents,
        location: shareLocation && geo ? { ...geo } : null,
      }
      const res = await fetch("/api/checkins", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      })
      const json = await res.json()
      if (!res.ok || !json?.ok) throw new Error(json?.error || "Submit failed")
      const record: Checkin = json.record
      // Save a tiny local history for offline UX
      const local = JSON.parse(localStorage.getItem("sr_checkins") || "[]")
      local.unshift(record)
      localStorage.setItem("sr_checkins", JSON.stringify(local.slice(0, 10)))

      alert(`Status submitted (${statusLabel}). Ref: ${record.id.slice(0, 6)}`)
      setNotes("")
    } catch (e: any) {
      alert(`Submission failed: ${e?.message || "Please try again"}`)
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      <Card className="border-l-8 border-l-emerald-600">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <HeartPulse className="h-5 w-5 text-emerald-700" />
            Civilian Safety Check-In
          </CardTitle>
          <CardDescription>Consent-first status update. Share only what you choose.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <Button
              type="button"
              className={`border-2 ${status === "safe" ? "bg-emerald-600 text-white border-black" : "bg-emerald-50 text-emerald-700 border-emerald-600"}`}
              onClick={() => setStatus("safe")}
            >
              <CheckCircle className="h-4 w-4 mr-2" />
              I'm Safe
            </Button>
            <Button
              type="button"
              className={`border-2 ${status === "need_help" ? "bg-amber-600 text-white border-black" : "bg-amber-50 text-amber-700 border-amber-600"}`}
              onClick={() => setStatus("need_help")}
            >
              <AlertTriangle className="h-4 w-4 mr-2" />
              Need Help
            </Button>
            <Button
              type="button"
              className={`border-2 ${status === "cant_evacuate" ? "bg-red-600 text-white border-black" : "bg-red-50 text-red-700 border-red-600"}`}
              onClick={() => setStatus("cant_evacuate")}
            >
              <MapPin className="h-4 w-4 mr-2" />
              Can't Evacuate
            </Button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="text-sm font-semibold text-slate-700">Name (optional)</label>
              <Input value={name} onChange={(e) => setName(e.target.value)} placeholder="First name or alias" />
            </div>
            <div>
              <label className="text-sm font-semibold text-slate-700">Contact (optional)</label>
              <Input value={contact} onChange={(e) => setContact(e.target.value)} placeholder="Phone or email" />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="text-sm font-semibold text-slate-700">Language</label>
              <Input value={language} onChange={(e) => setLanguage(e.target.value)} placeholder="e.g., English, Halq’eméylem" />
            </div>
            <div>
              <label className="text-sm font-semibold text-slate-700">Mobility</label>
              <select
                className="w-full border border-slate-300 rounded-md px-3 py-2"
                value={mobility}
                onChange={(e) => setMobility(e.target.value as MobilityLevel)}
              >
                <option value="none">No limitation</option>
                <option value="limited">Limited mobility</option>
                <option value="wheelchair">Wheelchair</option>
                <option value="bedbound">Bedbound</option>
              </select>
            </div>
            <div>
              <label className="text-sm font-semibold text-slate-700">Dependents</label>
              <div className="flex gap-3 mt-2">
                <label className="text-sm">
                  <input type="checkbox" className="mr-1" checked={dependents.children} onChange={(e) => setDependents({ ...dependents, children: e.target.checked })} />
                  Children
                </label>
                <label className="text-sm">
                  <input type="checkbox" className="mr-1" checked={dependents.elders} onChange={(e) => setDependents({ ...dependents, elders: e.target.checked })} />
                  Elders
                </label>
                <label className="text-sm">
                  <input type="checkbox" className="mr-1" checked={dependents.pets} onChange={(e) => setDependents({ ...dependents, pets: e.target.checked })} />
                  Pets
                </label>
              </div>
            </div>
          </div>

          <div>
            <label className="text-sm font-semibold text-slate-700">Notes (optional)</label>
            <Textarea value={notes} onChange={(e) => setNotes(e.target.value)} placeholder="Medical needs, hazards nearby, headcount, etc." className="min-h-[100px]" />
          </div>

          <div className="flex items-center gap-3">
            <Button disabled={submitting} onClick={onSubmit} className="bg-emerald-600 hover:bg-emerald-700 text-white font-bold border-2 border-black">
              Submit {statusLabel}
            </Button>
            <Badge className="bg-slate-100 text-slate-700 border-2 border-slate-400">Calm Mode UI</Badge>
          </div>
        </CardContent>
      </Card>

      <Card className="border-l-8 border-l-blue-600">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <MapPin className="h-5 w-5 text-blue-700" />
            Location & Territory (Consent-Based)
          </CardTitle>
          <CardDescription>Share location to speed response. You can turn this off.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between p-3 rounded-lg border-2 border-blue-200 bg-blue-50">
            <div className="text-sm">
              <div className="font-semibold text-blue-800">Share Location</div>
              <div className="text-blue-700">{shareLocation ? "On (recommended)" : "Off"}</div>
            </div>
            <button className={`w-12 h-6 rounded-full border-2 border-black ${shareLocation ? "bg-blue-600" : "bg-slate-300"}`} aria-pressed={shareLocation} onClick={() => setShareLocation((s) => !s)} />
          </div>

          <div className="p-3 rounded-lg border-2 border-slate-200 bg-slate-50">
            <div className="text-sm font-semibold text-slate-700 mb-1">Location Preview</div>
            <div className="text-xs text-slate-600">
              {geo ? (
                <>
                  Lat {geo.lat.toFixed(5)}, Lng {geo.lng.toFixed(5)} {geo.accuracy ? <>• ±{Math.round(geo.accuracy)}m</> : null}
                </>
              ) : (
                "Location not available or not granted"
              )}
            </div>
          </div>

          <div className="text-xs text-slate-600">
            By submitting, you consent to share only the above data. This demo stores data in memory for this session.
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
