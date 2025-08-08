"use client"

import { useParams } from "next/navigation"
import HeroCivilianLive from "@/components/hero/hero-civilian-live"
import AccessibilityToolbar from "@/components/common/accessibility-toolbar"

export default function HeroLiveSessionPage() {
  const params = useParams<{ id: string }>()
  const id = params?.id as string

  return (
    <main className="min-h-screen bg-white">
      <div className="container mx-auto px-4 py-6">
        <div className="flex justify-end mb-4">
          <AccessibilityToolbar />
        </div>
        <HeroCivilianLive incidentId={id} />
      </div>
    </main>
  )
}
