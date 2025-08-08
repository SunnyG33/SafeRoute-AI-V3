"use client"

import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Phone, Shield, MapPin } from 'lucide-react'

export function QuickActions() {
  const router = useRouter()

  async function startHeroSession() {
    // Try to create an incident; fallback to random id
    let id = ""
    try {
      const res = await fetch("/api/incidents", { method: "POST" })
      if (res.ok) {
        const data = await res.json()
        id = data?.id || ""
      }
    } catch {}
    if (!id) {
      id = Math.random().toString(36).slice(2, 10)
    }
    router.push(`/hero-live/${id}`)
  }

  function call911() {
    // Simulation route in this demo
    const id = Math.random().toString(36).slice(2, 10)
    window.location.href = `/sim-911/${id}`
  }

  async function shareLocationOnce() {
    if (!("geolocation" in navigator)) return
    navigator.geolocation.getCurrentPosition(
      async (pos) => {
        const lat = Math.round(pos.coords.latitude * 1000) / 1000
        const lng = Math.round(pos.coords.longitude * 1000) / 1000
        alert(`Approximate location shared:\nLat ${lat}, Lng ${lng}`)
      },
      () => alert("Unable to read location. Please check permissions."),
      { enableHighAccuracy: true, maximumAge: 10000, timeout: 10000 }
    )
  }

  return (
    <div className="grid sm:grid-cols-3 gap-3">
      <Button className="h-14 text-base border-2" onClick={startHeroSession}>
        <Shield className="h-5 w-5 mr-2" /> Open Hero Mode
      </Button>
      <Button variant="outline" className="h-14 text-base border-2" onClick={call911}>
        <Phone className="h-5 w-5 mr-2" /> Call 911 (Sim)
      </Button>
      <Button variant="outline" className="h-14 text-base border-2" onClick={shareLocationOnce}>
        <MapPin className="h-5 w-5 mr-2" /> Share Location
      </Button>
    </div>
  )
}
