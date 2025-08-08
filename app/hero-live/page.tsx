"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import AccessibilityToolbar from "@/components/common/accessibility-toolbar"
import { Link2, Play } from 'lucide-react'

export default function HeroLiveEntry() {
  const [code, setCode] = useState("")
  const router = useRouter()

  async function startDemo() {
    const res = await fetch("/api/incidents", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        participants: [{ role: "civilian", name: "Anonymous", connected: true }],
      }),
    })
    const json = await res.json()
    if (json?.incident?.id) {
      router.push(`/hero-live/${json.incident.id}`)
    }
  }

  function join() {
    if (!code.trim()) return
    router.push(`/hero-live/${code.trim()}`)
  }

  return (
    <main className="min-h-screen bg-white">
      <div className="container mx-auto px-4 py-6">
        <div className="flex justify-end mb-4">
          <AccessibilityToolbar />
        </div>
        <Card className="max-w-2xl mx-auto border-2">
          <CardHeader>
            <CardTitle>HERO CP — Join Live Incident</CardTitle>
          </CardHeader>
          <CardContent className="grid gap-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
              <div className="md:col-span-2">
                <Input placeholder="Enter Incident ID (from Responder)" value={code} onChange={(e) => setCode(e.target.value)} />
              </div>
              <Button className="border-2" onClick={join}>
                <Link2 className="h-4 w-4 mr-2" /> Join
              </Button>
            </div>
            <div className="text-xs text-slate-600">Privacy note: You can join without sharing media; consent is required to transmit info.</div>
            <div>
              <Button onClick={startDemo} className="bg-emerald-600 text-white border-2 border-black">
                <Play className="h-4 w-4 mr-2" /> Start New Demo Incident
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </main>
  )
}
