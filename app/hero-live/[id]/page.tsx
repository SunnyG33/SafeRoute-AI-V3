"use client"

import { useParams } from "next/navigation"
import HeroCivilianLive from "@/components/hero/hero-civilian-live"

export default function HeroLiveById() {
  const params = useParams<{ id: string }>()
  const id = Array.isArray(params.id) ? params.id[0] : params.id
  return (
    <main className="min-h-screen bg-white">
      <div className="container mx-auto px-4 py-6">
        <HeroCivilianLive incidentId={id} />
      </div>
    </main>
  )
}
