"use client"

import { useState } from "react"
import HeroModeLanding from "@/components/emergency/HeroModeLanding"
import CPRGuide from "@/components/emergency/CPRGuide"
import { Button } from "@/components/ui/button"
import { ArrowLeft } from "lucide-react"

export default function HeroModeLandingPage() {
  const [selectedMode, setSelectedMode] = useState<string | null>(null)

  const handleSelectMode = (mode: string) => {
    setSelectedMode(mode)
  }

  const handleBack = () => {
    setSelectedMode(null)
  }

  const handleExit = () => {
    // Go back to main landing page
    window.location.href = "/"
  }

  // Route to specific emergency screens with black backgrounds
  if (selectedMode === "cpr") {
    return <CPRGuide onBack={handleBack} emergencyMode={true} />
  }

  if (selectedMode === "bleeding") {
    return (
      <div className="min-h-screen bg-black text-white p-6 flex items-center justify-center">
        <div className="text-center space-y-6">
          <h1 className="text-4xl font-bold text-white">BLEEDING CONTROL MODE</h1>
          <p className="text-xl text-white/90">High-contrast bleeding control guidance would load here</p>
          <Button onClick={handleBack} className="bg-white text-black hover:bg-gray-200 font-bold">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Hero Mode
          </Button>
        </div>
      </div>
    )
  }

  if (selectedMode === "choking") {
    return (
      <div className="min-h-screen bg-black text-white p-6 flex items-center justify-center">
        <div className="text-center space-y-6">
          <h1 className="text-4xl font-bold text-white">CHOKING AID MODE</h1>
          <p className="text-xl text-white/90">High-contrast choking aid guidance would load here</p>
          <Button onClick={handleBack} className="bg-white text-black hover:bg-gray-200 font-bold">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Hero Mode
          </Button>
        </div>
      </div>
    )
  }

  if (selectedMode === "stroke") {
    return (
      <div className="min-h-screen bg-black text-white p-6 flex items-center justify-center">
        <div className="text-center space-y-6">
          <h1 className="text-4xl font-bold text-white">STROKE ASSESSMENT MODE</h1>
          <p className="text-xl text-white/90">High-contrast stroke assessment guidance would load here</p>
          <Button onClick={handleBack} className="bg-white text-black hover:bg-gray-200 font-bold">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Hero Mode
          </Button>
        </div>
      </div>
    )
  }

  if (selectedMode === "seizure1" || selectedMode === "seizure2") {
    return (
      <div className="min-h-screen bg-black text-white p-6 flex items-center justify-center">
        <div className="text-center space-y-6">
          <h1 className="text-4xl font-bold text-white">SEIZURE AID MODE</h1>
          <p className="text-xl text-white/90">High-contrast seizure aid guidance would load here</p>
          <Button onClick={handleBack} className="bg-white text-black hover:bg-gray-200 font-bold">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Hero Mode
          </Button>
        </div>
      </div>
    )
  }

  // Show the Hero Mode landing page
  return <HeroModeLanding />
}
