"use client"

import { useRouter } from "next/navigation"
import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Shield, Play, Link2 } from 'lucide-react'

export default function ResponderLiveEntry() {
  const router = useRouter()
  const [joinId, setJoinId] = useState("")

  async function startNew() {
    const res = await fetch("/api/incidents", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ participants: [{ role: "responder", name: "Responder" }] }),
    })
    const { incident } = await res.json()
    router.push(`/responder-portal/live/${incident.id}`)
  }

  function join() {
    if (!joinId.trim()) return
    router.push(`/responder-portal/live/${joinId.trim()}`)
  }

  return (
    <main className="min-h-screen bg-white">
      <div className="container mx-auto px-4 py-10">
        <Card className="max-w-2xl mx-auto">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-xl">
              <Shield className="h-5 w-5 text-blue-700" />
              HERO OS Live Demo — Responder
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <Button className="border-2" onClick={startNew}>
              <Play className="h-4 w-4 mr-2" /> Start New Responder Demo
            </Button>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
              <Input placeholder="Incident ID" value={joinId} onChange={(e) => setJoinId(e.target.value)} />
              <Button variant="outline" className="border-2 sm:col-span-1" onClick={join}>
                <Link2 className="h-4 w-4 mr-2" /> Join by ID
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </main>
  )
}
