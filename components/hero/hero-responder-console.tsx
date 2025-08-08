"use client"

import { useEffect, useMemo, useRef, useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { AlertTriangle, ClipboardCopy, ClipboardList, MapPin, Send, Shield, Stethoscope, Timer, FileText, Users } from 'lucide-react'
import { LegalBanner } from "@/components/common/legal-banner"
import { VitalsPanel } from "@/components/responder/vitals-panel"
import { ElderOverrideToggle } from "@/components/common/elder-override-toggle"
import { offlineFetch } from "@/lib/offline-queue"
import { LiveAVPanel } from "@/components/hero/live-av-panel"

type Msg = { id: string; from: "civilian" | "responder"; text: string; at: number }
type Loc = { lat: number; lng: number; acc?: number }
type MedSummary = {
 name?: string
 age?: string
 bloodType?: string
 allergies?: string
 medications?: string
 conditions?: string
}

export default function HeroResponderConsole({ incidentId }: { incidentId: string }) {
 const [messages, setMessages] = useState<Msg[]>([])
 const [input, setInput] = useState("")
 const [since, setSince] = useState<number>(0)
 const [lastLoc, setLastLoc] = useState<Loc | null>(null)
 const [statuses, setStatuses] = useState<string[]>([])
 const [status, setStatus] = useState<"open" | "en_route" | "arrived" | "completed" | "closed">("open")
 const [tlrtOn, setTlrtOn] = useState(false)
 const [med, setMed] = useState<MedSummary | null>(null)
 const [timer, setTimer] = useState(0)
 const timerRef = useRef<number | null>(null)
 const [role, setRole] = useState("Lead")
 const [agency, setAgency] = useState("EMS")
 const [checks, setChecks] = useState<{ id: string; label: string; done: boolean }[]>([
   { id: "scene-safe", label: "Scene safe", done: false },
   { id: "airway", label: "Airway checked", done: false },
   { id: "breathing", label: "Breathing assessed", done: false },
 ])

 // Timer
 useEffect(() => {
   timerRef.current = window.setInterval(() => setTimer((t) => t + 1), 1000)
   return () => {
     if (timerRef.current) window.clearInterval(timerRef.current)
   }
 }, [])

 // Poll events
 useEffect(() => {
   let t: number | null = null
   let stopped = false
   async function poll() {
     try {
       const res = await fetch(`/api/incidents/${incidentId}/events?since=${since}`, { cache: "no-store" })
       const { events, now } = await res.json()
       if (Array.isArray(events) && events.length) {
         const newMsgs: Msg[] = []
         const newStatuses: string[] = []
         let newLoc: Loc | null = null
         let newMed: MedSummary | null = null
         for (const e of events) {
           if (e.type === "message") newMsgs.push({ id: e.id, from: e.from, text: e.payload?.text ?? "", at: e.at })
           if (e.type === "status") newStatuses.push(e.payload?.status ?? "")
           if (e.type === "location") newLoc = e.payload as Loc
           if (e.type === "med_share") newMed = e.payload as MedSummary
         }
         if (newMsgs.length) {
           setMessages((prev) => {
             const merged = [...prev, ...newMsgs]
             const seen = new Set<string>()
             return merged.filter((m) => (seen.has(m.id) ? false : (seen.add(m.id), true)))
           })
         }
         if (newStatuses.length) setStatuses((prev) => [...prev, ...newStatuses])
         if (newLoc) setLastLoc(newLoc)
         if (newMed) setMed(newMed)
       }
       if (now) setSince(now)
     } catch {}
     if (!stopped) t = window.setTimeout(poll, 1200)
   }
   poll()
   return () => {
     stopped = true
     if (t) window.clearTimeout(t)
   }
 }, [incidentId, since])

 async function sendMessage() {
   if (!input.trim()) return
   const text = input.trim()
   setInput("")
   await offlineFetch(`/api/incidents/${incidentId}/events`, {
     method: "POST",
     body: { type: "message", from: "responder", payload: { text } },
   })
 }

 async function pushStatus(next: typeof status) {
   await offlineFetch(`/api/incidents/${incidentId}`, {
     method: "PATCH",
     body: { status: next },
   })
   setStatus(next)
 }

 async function requestMedicalRecord() {
   await offlineFetch(`/api/incidents/${incidentId}/events`, {
     method: "POST",
     body: { type: "med_request", from: "responder", payload: { fields: ["name", "age", "bloodType", "allergies", "medications", "conditions"] } },
   })
 }

 const joinUrl = useMemo(() => {
   if (typeof window === "undefined") return ""
   const u = new URL(window.location.href)
   u.pathname = `/hero-live/${incidentId}`
   u.search = ""
   return u.toString()
 }, [incidentId])

 function copy(text: string) {
   navigator.clipboard?.writeText(text).catch(() => {})
 }

 const mins = Math.floor(timer / 60)
 const secs = (timer % 60).toString().padStart(2, "0")

 return (
   <>
     <LegalBanner context={["emergency", "ai-assist"]} className="mb-2" />
     <div className="grid gap-6">
       <Card className="border-l-8 border-l-blue-600">
         <CardHeader>
           <CardTitle className="flex flex-wrap items-center gap-2">
             <Shield className="h-5 w-5 text-blue-700" />
             HERO OS — Responder Console
             <Badge className="ml-2 bg-blue-100 text-blue-800 border-2 border-blue-600">Incident {incidentId.slice(0, 8)}</Badge>
             <Badge variant="outline">{status.toUpperCase()}</Badge>
             <Badge variant="secondary">
               <Timer className="h-3 w-3 mr-1" />
               {mins}:{secs}
             </Badge>
           </CardTitle>
         </CardHeader>

         <CardContent className="grid grid-cols-1 lg:grid-cols-3 gap-4">
           {/* Column 1: Scene Overview */}
           <div className="space-y-3">
             <div className="rounded border p-3 bg-white">
               <div className="text-sm font-semibold flex items-center gap-2">
                 <MapPin className="h-4 w-4 text-blue-700" /> Scene Overview
               </div>
               <div className="mt-2 text-sm">
                 {lastLoc ? (
                   <div>
                     Lat {lastLoc.lat.toFixed(5)}, Lng {lastLoc.lng.toFixed(5)} {lastLoc.acc ? <>• ±{Math.round(lastLoc.acc)}m</> : null}
                   </div>
                 ) : (
                   <div className="text-slate-500">No location yet</div>
                 )}
               </div>
               <div className="flex items-center justify-between mt-2 text-xs">
                 <span>Traditional Lands overlay</span>
                 <button
                   aria-label="Toggle Traditional Lands overlay"
                   className={`w-12 h-6 rounded-full border-2 border-black ${tlrtOn ? "bg-blue-600" : "bg-slate-300"}`}
                   aria-pressed={tlrtOn}
                   onClick={() => setTlrtOn((s) => !s)}
                 />
               </div>
               {tlrtOn && <div className="mt-2 text-xs text-blue-900">Demo overlay only. Confirm with local Nations.</div>}
             </div>

             <div className="rounded border p-3 bg-red-50">
               <div className="text-sm font-semibold flex items-center gap-2 text-red-800">
                 <AlertTriangle className="h-4 w-4" /> Incoming Status
               </div>
               <div className="mt-2 space-y-1 text-sm">
                 {statuses.length ? statuses.slice(-6).map((s, i) => <div key={i}>• {s}</div>) : <div className="text-slate-500">None yet</div>}
               </div>
             </div>

             <div className="flex gap-2">
               <Button onClick={() => copy(incidentId)} variant="outline" className="border-2">
                 <ClipboardCopy className="h-4 w-4 mr-2" /> Copy ID
               </Button>
               <Button onClick={() => copy(joinUrl)} variant="outline" className="border-2">
                 <ClipboardCopy className="h-4 w-4 mr-2" /> Copy Civilian Link
               </Button>
               <Button variant="outline" className="border-2" onClick={() => (window.location.href = `/incident/${incidentId}/report`)}>
                 <FileText className="h-4 w-4 mr-2" /> Report
               </Button>
             </div>
           </div>

           {/* Column 2: Messages + Checklist + A/V */}
           <div className="flex flex-col">
             <div className="flex items-center gap-2 mb-2">
               <Users className="h-4 w-4" />
               <select
                 className="border rounded px-2 py-1 text-sm"
                 value={agency}
                 onChange={async (e) => {
                   setAgency(e.target.value)
                   await offlineFetch(`/api/incidents/${incidentId}/events`, {
                     method: "POST",
                     body: { type: "agency", from: "responder", payload: { agency: e.target.value } },
                   })
                 }}
               >
                 <option>EMS</option>
                 <option>Fire</option>
                 <option>Police</option>
                 <option>Search & Rescue</option>
               </select>
               <select
                 className="border rounded px-2 py-1 text-sm"
                 value={role}
                 onChange={async (e) => {
                   setRole(e.target.value)
                   await offlineFetch(`/api/incidents/${incidentId}/events`, {
                     method: "POST",
                     body: { type: "role", from: "responder", payload: { role: e.target.value } },
                   })
                 }}
               >
                 <option>Lead</option>
                 <option>Medic</option>
                 <option>Driver</option>
                 <option>Comms</option>
               </select>
               <div className="ml-auto flex gap-2">
                 <Button className="border-2" onClick={() => pushStatus("en_route")}>En Route</Button>
                 <Button className="border-2" onClick={() => pushStatus("arrived")}>Arrived</Button>
                 <Button variant="outline" className="border-2" onClick={() => pushStatus("completed")}>Complete</Button>
               </div>
             </div>

             <div className="flex-1 rounded border p-2 bg-white overflow-auto max-h-[320px]" aria-live="polite" aria-atomic="false">
               {messages.length === 0 ? (
                 <div className="text-sm text-slate-500">No messages yet.</div>
               ) : (
                 <div className="space-y-2">
                   {messages.map((m) => (
                     <div key={m.id} className={`text-sm ${m.from === "responder" ? "text-blue-800" : "text-emerald-800"}`}>
                       <span className="font-semibold">{m.from === "responder" ? "You" : "Civilian"}:</span> {m.text}
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
             <div className="mt-3 border rounded p-2">
               <div className="text-sm font-semibold mb-1">Checklist</div>
               {checks.map((c, i) => (
                 <label key={c.id} className="flex items-center gap-2 text-sm">
                   <input
                     type="checkbox"
                     checked={c.done}
                     onChange={async (e) => {
                       const next = [...checks]
                       next[i] = { ...c, done: e.target.checked }
                       setChecks(next)
                       await offlineFetch(`/api/incidents/${incidentId}/events`, {
                         method: "POST",
                         body: { type: "checklist", from: "responder", payload: next },
                       })
                     }}
                   />
                   {c.label}
                 </label>
               ))}
             </div>
             <div className="mt-2">
               <LiveAVPanel incidentId={incidentId} role="responder" />
             </div>
           </div>

           {/* Column 3: Medical Record + Vitals + Elder Override */}
           <div className="space-y-3">
             <Card className="border">
               <CardHeader className="py-2">
                 <CardTitle className="text-sm flex items-center gap-2">
                   <Stethoscope className="h-4 w-4" /> Access Medical Record
                 </CardTitle>
               </CardHeader>
               <CardContent className="text-sm space-y-3">
                 {!med ? (
                   <>
                     <div className="text-slate-600">Request consent from the civilian to share a brief medical summary (name, age, blood type, allergies, medications, conditions).</div>
                     <Button className="border-2" onClick={requestMedicalRecord}>
                       Request Medical Summary
                     </Button>
                     <div className="text-xs text-slate-500">Consent-first. Civilian chooses what to share. Data is demo-only and not persisted.</div>
                   </>
                 ) : (
                   <div className="space-y-2">
                     <div className="font-semibold">Patient Summary</div>
                     <div>Name: {med.name || "—"}</div>
                     <div>Age: {med.age || "—"}</div>
                     <div>Blood Type: {med.bloodType || "—"}</div>
                     <div>Allergies: {med.allergies || "—"}</div>
                     <div>Medications: {med.medications || "—"}</div>
                     <div>Conditions: {med.conditions || "—"}</div>
                     <div className="text-xs text-slate-500">Source: Civilian consent share (SafeShare demo).</div>
                   </div>
                 )}
               </CardContent>
             </Card>
             <VitalsPanel incidentId={incidentId} />
             <ElderOverrideToggle incidentId={incidentId} />
           </div>
         </CardContent>
       </Card>
     </div>
   </>
 )
}
