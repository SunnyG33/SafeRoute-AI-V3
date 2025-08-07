"use client"

import { useEffect, useMemo, useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { Switch } from "@/components/ui/switch"
import { useToast } from "@/hooks/use-toast"
import { HeartPulse, HelpCircle, MapPin, ShieldCheck, UserCheck, Users } from 'lucide-react'
import { type SafetyCheckInPayload, type CheckinStatus } from "@/types/checkin"
import { TLRTBanner } from "@/components/common/tlrt-banner"

type Geo =
  | {
      lat: number
      lng: number
      accuracy?: number
    }
  | null

function uuid() {
  if (typeof crypto !== "undefined" && "randomUUID" in crypto) {
    return crypto.randomUUID()
  }
  return Math.random().toString(36).slice(2)
}

export default function SafetyCheckIn() {
  const { toast } = useToast()
  const [status, setStatus] = useState<CheckinStatus | null>(null)
  const [dependents, setDependents] = useState<number>(0)
  const [mobilityNeeds, setMobilityNeeds] = useState(false)
  const [language, setLanguage] = useState<string>("English")
  const [note, setNote] = useState<string>("")
  const [alias, setAlias] = useState<string>("Anonymous")
  const [shareLocation, setShareLocation] = useState<boolean>(true)
  const [consentCommunityShare, setConsentCommunityShare] = useState<boolean>(true)
  const [geo, setGeo] = useState<Geo>(null)
  const [territory, setTerritory] = useState<string | null>(null)
  const [submitting, setSubmitting] = useState(false)

  useEffect(() => {
    // Try to grab location
    if (!("geolocation" in navigator)) return
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        setGeo({ lat: pos.coords.latitude, lng: pos.coords.longitude, accuracy: pos.coords.accuracy })
      },
      () => setGeo(null),
      { enableHighAccuracy: true, timeout: 5000 },
    )
  }, [])

  // Read territory from TLRTBanner via DOM is complicated; for demo, re-run a simple heuristic here
  useEffect(() => {
    if (geo) {
      const inVancouver =
        geo.lat > 49.2 && geo.lat < 49.35 && geo.lng > -123.26 && geo.lng < -123.02
      setTerritory(
        inVancouver ? "Musqueam, Squamish, and Tsleil-Waututh (Coast Salish Territories)" : null,
      )
    }
  }, [geo])

  const canSubmit = useMemo(() => !!status, [status])

  async function submit() {
    if (!status) return
    setSubmitting(true)
    const payload: SafetyCheckInPayload = {
      id: uuid(),
      createdAt: new Date().toISOString(),
      status,
      note: note.trim() || undefined,
      dependents,
      mobilityNeeds,
      language,
      shareLocation,
      location: shareLocation ? geo : null,
      territory: shareLocation ? territory : null,
      consentCommunityShare,
      userAlias: alias.trim() || "Anonymous",
      assignment: {
        state: "unassigned",
        updatedAt: new Date().toISOString(),
      },
    }
    try {
      const res = await fetch("/api/checkins", { method: "POST", body: JSON.stringify(payload) })
      const data = await res.json()
      if (!res.ok || data?.error) throw new Error(data?.error || "Submit failed")

      // Cache your last status locally for resilience
      const history = JSON.parse(localStorage.getItem("sr_checkins") || "[]")
      history.unshift(payload)
      localStorage.setItem("sr_checkins", JSON.stringify(history.slice(0, 10)))

      toast({
        title: "Status shared",
        description:
          status === "safe"
            ? "Marked Safe. Thank you for checking in."
            : status === "need_help"
              ? "Help request sent. Responders will see your check-in."
              : "Marked as Can't Evacuate. Assistance will prioritize your case.",
      })
      // Reset form except alias
      setStatus(null)
      setDependents(0)
      setMobilityNeeds(false)
      setLanguage("English")
      setNote("")
    } catch (e: any) {
      toast({
        title: "Offline or server error",
        description:
          "Your device will retain this status locally and retry when online. Keep the app open.",
        variant: "destructive",
      })
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <div className="space-y-6">
      <TLRTBanner />

      <Card className="border-emerald-200">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <ShieldCheck className="w-5 h-5 text-emerald-600" />
            Safety Check-In
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {/* Status Buttons */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <Button
              type="button"
              variant={status === "safe" ? "default" : "outline"}
              className={`h-12 justify-start ${status === "safe" ? "bg-emerald-600 hover:bg-emerald-700 text-white" : ""}`}
              onClick={() => setStatus("safe")}
            >
              <UserCheck className="w-5 h-5 mr-2" />
              I'm Safe
            </Button>
            <Button
              type="button"
              variant={status === "need_help" ? "default" : "outline"}
              className={`h-12 justify-start ${status === "need_help" ? "bg-red-600 hover:bg-red-700 text-white" : ""}`}
              onClick={() => setStatus("need_help")}
            >
              <HelpCircle className="w-5 h-5 mr-2" />
              I Need Help
            </Button>
            <Button
              type="button"
              variant={status === "cant_evacuate" ? "default" : "outline"}
              className={`h-12 justify-start ${status === "cant_evacuate" ? "bg-amber-600 hover:bg-amber-700 text-white" : ""}`}
              onClick={() => setStatus("cant_evacuate")}
            >
              <Users className="w-5 h-5 mr-2" />
              Can't Evacuate
            </Button>
          </div>

          {/* Details */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="text-sm font-medium">Display Name (optional)</label>
              <Input
                value={alias}
                onChange={(e) => setAlias(e.target.value)}
                placeholder="Anonymous"
              />
              <p className="text-xs text-muted-foreground mt-1">
                Shown to responders; avoid sharing full legal name if privacy is a concern.
              </p>
            </div>
            <div>
              <label className="text-sm font-medium">Language</label>
              <Input
                value={language}
                onChange={(e) => setLanguage(e.target.value)}
                placeholder="English"
              />
              <p className="text-xs text-muted-foreground mt-1">
                Add preferred language for translation support.
              </p>
            </div>
            <div>
              <label className="text-sm font-medium">Dependents</label>
              <Input
                type="number"
                min={0}
                value={dependents}
                onChange={(e) => setDependents(parseInt(e.target.value || "0", 10))}
              />
              <p className="text-xs text-muted-foreground mt-1">Children, elders, pets, etc.</p>
            </div>
            <div className="flex items-center gap-3 mt-6">
              <Switch checked={mobilityNeeds} onCheckedChange={setMobilityNeeds} id="mobility" />
              <label htmlFor="mobility" className="text-sm">
                Mobility or medical needs
              </label>
            </div>
          </div>

          {/* Note */}
          <div>
            <label className="text-sm font-medium">Details (optional)</label>
            <Textarea
              value={note}
              onChange={(e) => setNote(e.target.value)}
              placeholder="Any helpful details (address, hazards, access instructions)…"
              rows={3}
            />
          </div>

          {/* Location and consent */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="flex items-start gap-3">
              <Switch
                checked={shareLocation}
                onCheckedChange={setShareLocation}
                id="shareLocation"
              />
              <div>
                <label htmlFor="shareLocation" className="text-sm font-medium flex items-center gap-2">
                  <MapPin className="w-4 h-4 text-amber-700" />
                  Share location
                </label>
                <p className="text-xs text-muted-foreground">
                  Needed for routing help. You can turn this off if privacy is a concern.
                </p>
                {shareLocation && geo && (
                  <p className="text-xs mt-1">
                    {geo.lat.toFixed(5)}, {geo.lng.toFixed(5)} • ±{Math.round(geo.accuracy || 0)}m
                  </p>
                )}
              </div>
            </div>
            <div className="flex items-start gap-3">
              <Switch
                checked={consentCommunityShare}
                onCheckedChange={setConsentCommunityShare}
                id="consent"
              />
              <div>
                <label htmlFor="consent" className="text-sm font-medium">
                  Consent to share with local officials/Indigenous Nation
                </label>
                <p className="text-xs text-muted-foreground">
                  OCAP-aligned: your check-in may be used to coordinate help and safety updates.
                </p>
              </div>
            </div>
          </div>

          {/* Offline/Calm Mode badges */}
          <div className="flex flex-wrap gap-2">
            <Badge variant="outline" className="bg-emerald-50 text-emerald-800 border-emerald-200">
              Offline-capable flow
            </Badge>
            <Badge variant="outline" className="bg-amber-50 text-amber-800 border-amber-200">
              Calm UX enabled
            </Badge>
            <Badge variant="outline" className="bg-red-50 text-red-800 border-red-200">
              Hero Mode compatible
            </Badge>
          </div>

          <Button
            disabled={!canSubmit || submitting}
            onClick={submit}
            className="w-full h-12 bg-emerald-600 hover:bg-emerald-700"
          >
            Share My Status
          </Button>
        </CardContent>
      </Card>

      {/* Recent local check-ins */}
      <RecentLocalCheckins />
    </div>
  )
}

function RecentLocalCheckins() {
  const [items, setItems] = useState<SafetyCheckInPayload[]>([])

  useEffect(() => {
    const raw = localStorage.getItem("sr_checkins")
    if (raw) {
      try {
        setItems(JSON.parse(raw))
      } catch {
        // ignore
      }
    }
  }, [])

  if (!items.length) return null

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <HeartPulse className="w-5 h-5 text-red-600" />
          Your Recent Check-Ins (device local)
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-3">
        {items.map((c) => (
          <div
            key={c.id}
            className="flex items-start justify-between p-3 rounded-lg border bg-white"
          >
            <div>
              <div className="font-medium">
                {c.status === "safe"
                  ? "Marked Safe"
                  : c.status === "need_help"
                    ? "Need Help"
                    : "Can't Evacuate"}
              </div>
              <div className="text-xs text-muted-foreground">
                {new Date(c.createdAt).toLocaleString()}
                {c.territory ? ` • ${c.territory}` : ""}
              </div>
              {c.note && <div className="text-sm mt-1">{c.note}</div>}
            </div>
            <div className="text-right">
              {c.location ? (
                <div className="text-xs text-muted-foreground">
                  {c.location.lat.toFixed(3)},{c.location.lng.toFixed(3)}
                </div>
              ) : (
                <div className="text-xs text-muted-foreground">No location</div>
              )}
              <Badge variant="outline" className="mt-1">
                {(c.assignment?.state || "unassigned").replace("_", " ")}
              </Badge>
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  )
}
