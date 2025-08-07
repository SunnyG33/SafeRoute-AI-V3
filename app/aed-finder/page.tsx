"use client"

import { useState } from "react"
import AEDFinder from "@/components/emergency/AEDFinder"
import AEDGuidance from "@/components/emergency/AEDGuidance"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { ArrowLeft } from "lucide-react"

type AEDMode = "finder" | "guidance"

export default function AEDFinderPage() {
  const [currentMode, setCurrentMode] = useState<AEDMode>("finder")

  if (currentMode === "guidance") {
    return (
      <AEDGuidance
        onBack={() => setCurrentMode("finder")}
        onComplete={() => setCurrentMode("finder")}
        emergencyMode={true}
      />
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="p-4">
        <Link href="/">
          <Button variant="outline" className="mb-4 bg-white">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to SafeRoute AI
          </Button>
        </Link>
      </div>

      <AEDFinder
        onAEDSelected={(aed) => {
          console.log("AED Selected:", aed)
          setCurrentMode("guidance")
        }}
        emergencyMode={false}
      />
    </div>
  )
}
