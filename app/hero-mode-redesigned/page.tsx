"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { ArrowLeft } from "lucide-react"
import Link from "next/link"
import HeroModeRedesigned from "@/components/emergency/HeroModeRedesigned"

export default function HeroModeRedesignedPage() {
  const [showHeroMode, setShowHeroMode] = useState(true)

  if (showHeroMode) {
    return <HeroModeRedesigned onExit={() => setShowHeroMode(false)} />
  }

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <div className="text-center space-y-6">
        <h1 className="text-3xl font-bold text-gray-800">Hero Mode™ Exited</h1>
        <p className="text-lg text-gray-600">You have successfully exited Hero Mode™</p>
        <div className="space-y-3">
          <Button onClick={() => setShowHeroMode(true)} className="bg-red-600 hover:bg-red-700 text-white px-8 py-3">
            🦸 RE-ENTER HERO MODE™
          </Button>
          <Link href="/">
            <Button variant="outline" className="flex items-center gap-2 bg-transparent">
              <ArrowLeft className="w-4 h-4" />
              Back to SafeRoute AI
            </Button>
          </Link>
        </div>
      </div>
    </div>
  )
}
