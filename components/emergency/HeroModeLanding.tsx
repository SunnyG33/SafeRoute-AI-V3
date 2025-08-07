"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Switch } from "@/components/ui/switch"
import { Heart, Droplet, UserX, Brain, Zap, Mic, X, Phone, AlertTriangle } from "lucide-react"
import Link from "next/link"

interface EmergencyTile {
  id: string
  label: string
  icon: React.ReactNode
  voiceHint: string
  route: string
}

export default function HeroModeLanding() {
  const [isListening, setIsListening] = useState(true)
  const [autoCall911, setAutoCall911] = useState(true)
  const [showEmergencyModal, setShowEmergencyModal] = useState(false)
  const [inactivityTimer, setInactivityTimer] = useState<NodeJS.Timeout | null>(null)

  const emergencyTiles: EmergencyTile[] = [
    {
      id: "cpr",
      label: "CPR",
      icon: <Heart className="h-16 w-16 text-white" />,
      voiceHint: "Say 'CPR' to start",
      route: "/cpr-guide",
    },
    {
      id: "bleeding",
      label: "Bleeding",
      icon: <Droplet className="h-16 w-16 text-white" />,
      voiceHint: "Say 'Bleeding' to start",
      route: "/bleeding-aid",
    },
    {
      id: "choking",
      label: "Choking",
      icon: <UserX className="h-16 w-16 text-white" />,
      voiceHint: "Say 'Choking' to start",
      route: "/choking-aid",
    },
    {
      id: "stroke",
      label: "Stroke",
      icon: <Brain className="h-16 w-16 text-white" />,
      voiceHint: "Say 'Seizure' to start",
      route: "/stroke-aid",
    },
    {
      id: "seizure1",
      label: "Seizure",
      icon: <Zap className="h-16 w-16 text-white" />,
      voiceHint: "Say 'Spicue' to start",
      route: "/seizure-aid",
    },
    {
      id: "seizure2",
      label: "Seizure",
      icon: <Zap className="h-16 w-16 text-white" />,
      voiceHint: "Say 'Seizure' to start",
      route: "/seizure-aid",
    },
  ]

  // Start inactivity timer when component mounts
  useEffect(() => {
    if (autoCall911) {
      const timer = setTimeout(() => {
        setShowEmergencyModal(true)
      }, 10000) // 10 seconds

      setInactivityTimer(timer)

      return () => {
        if (timer) clearTimeout(timer)
      }
    }
  }, [autoCall911])

  // Reset timer on any user interaction
  const resetInactivityTimer = () => {
    if (inactivityTimer) {
      clearTimeout(inactivityTimer)
    }

    if (autoCall911) {
      const timer = setTimeout(() => {
        setShowEmergencyModal(true)
      }, 10000)
      setInactivityTimer(timer)
    }
  }

  const handleTileClick = (tile: EmergencyTile) => {
    resetInactivityTimer()
    // Simulate voice command detection
    console.log(`Voice command detected: ${tile.label}`)
    // Navigate to emergency mode with black background
    window.location.href = tile.route
  }

  const handleCall911 = () => {
    setShowEmergencyModal(false)
    // Simulate calling 911
    console.log("Calling 911...")
    alert("Emergency services have been contacted!")
  }

  const handleDismissModal = () => {
    setShowEmergencyModal(false)
    resetInactivityTimer()
  }

  return (
    <div
      className="min-h-screen bg-gradient-to-b from-[#2D3D56] to-[#5E7BA7] text-white p-4"
      onClick={resetInactivityTimer}
      onKeyDown={resetInactivityTimer}
    >
      {/* Header */}
      <div className="max-w-4xl mx-auto">
        {/* Exit Button */}
        <div className="flex justify-between items-start mb-8">
          <Link href="/landing">
            <Button variant="ghost" size="sm" className="text-white hover:bg-white/20 border border-white/30">
              <X className="h-4 w-4 mr-2" />
              Exit
            </Button>
          </Link>

          {/* Mic Status */}
          <div className="flex items-center space-x-2">
            <div className={`p-2 rounded-full ${isListening ? "bg-green-500/30 animate-pulse" : "bg-gray-500/30"}`}>
              <Mic className={`h-5 w-5 ${isListening ? "text-green-300" : "text-gray-300"}`} />
            </div>
            <span className="text-sm font-medium">Voice Enabled</span>
          </div>
        </div>

        {/* Main Header */}
        <div className="text-center mb-12">
          <h1 className="text-6xl font-bold mb-4">Hero Mode™</h1>
          <p className="text-xl text-white/80">Select an emergency aid mode below</p>
        </div>

        {/* Emergency Tiles Grid */}
        <div className="grid grid-cols-2 gap-6 mb-12 max-w-3xl mx-auto">
          {emergencyTiles.map((tile) => (
            <button
              key={tile.id}
              onClick={() => handleTileClick(tile)}
              className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 text-center hover:bg-white/20 hover:scale-105 transition-all duration-300 border border-white/20 shadow-lg"
            >
              <div className="flex justify-center mb-4">{tile.icon}</div>
              <h3 className="text-2xl font-bold mb-2">{tile.label}</h3>
              <p className="text-white/70 text-sm">{tile.voiceHint}</p>
            </button>
          ))}
        </div>

        {/* Auto-call 911 Toggle */}
        <div className="max-w-2xl mx-auto">
          <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20">
            <div className="flex items-center justify-between mb-4">
              <span className="text-lg font-medium">Auto-call 911 if inactive</span>
              <Switch
                checked={autoCall911}
                onCheckedChange={setAutoCall911}
                className="data-[state=checked]:bg-white data-[state=unchecked]:bg-white/30"
              />
            </div>
            <p className="text-white/70 text-sm">Your emergency status will activate hands-free if needed.</p>
          </div>
        </div>
      </div>

      {/* Emergency Modal */}
      {showEmergencyModal && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl p-8 max-w-md w-full text-center text-gray-900">
            <div className="mb-6">
              <AlertTriangle className="h-16 w-16 text-red-500 mx-auto mb-4" />
              <h2 className="text-2xl font-bold mb-2">Emergency Detected</h2>
              <p className="text-gray-600">No activity detected. Do you want us to call emergency services now?</p>
            </div>

            <div className="flex space-x-4">
              <Button onClick={handleCall911} className="flex-1 bg-red-600 hover:bg-red-700 text-white font-bold py-3">
                <Phone className="h-5 w-5 mr-2" />
                Call 911 Now
              </Button>
              <Button
                onClick={handleDismissModal}
                variant="outline"
                className="flex-1 border-gray-300 text-gray-700 hover:bg-gray-50 py-3 bg-transparent"
              >
                I'm OK
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
