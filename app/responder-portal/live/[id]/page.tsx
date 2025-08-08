"use client"

import { useParams } from "next/navigation"
import HeroResponderConsole from "@/components/hero/hero-responder-console"

export default function ResponderLiveByIdPage() {
  const params = useParams<{ id: string }>()
  const id = Array.isArray(params.id) ? params.id[0] : params.id

  return (
    <main className="min-h-screen bg-white">
      <div className="container mx-auto px-4 py-6">
        <HeroResponderConsole incidentId={id} />
      </div>
    </main>
  )
}
