"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Heart, Volume2, VolumeX } from 'lucide-react'

interface CalmingOverlayProps {
  isActive: boolean
  onClose: () => void
}

export function CalmingOverlay({ isActive, onClose }: CalmingOverlayProps) {
  const [breathePhase, setBreathePhase] = useState<"in" | "hold" | "out">("in")
  const [count, setCount] = useState(4)
  const [audioEnabled, setAudioEnabled] = useState(false)

  useEffect(() => {
    if (!isActive) return

    const interval = setInterval(() => {
      setCount((prev) => {
        if (prev <= 1) {
          setBreathePhase((phase) => {
            if (phase === "in") return "hold"
            if (phase === "hold") return "out"
            return "in"
          })
          return 4
        }
        return prev - 1
      })
    }, 1000)

    return () => clearInterval(interval)
  }, [isActive])

  useEffect(() => {
    if (!audioEnabled || !isActive) return
    if (typeof window === "undefined" || !("speechSynthesis" in window)) return

    const messages = {
      in: "Breathe in slowly",
      hold: "Hold your breath",
      out: "Breathe out slowly"
    }

    if (count === 4) {
      const utterance = new SpeechSynthesisUtterance(messages[breathePhase])
      utterance.rate = 0.8
      utterance.pitch = 0.9
      window.speechSynthesis.speak(utterance)
    }
  }, [breathePhase, count, audioEnabled, isActive])

  if (!isActive) return null

  const phaseText = {
    in: "Breathe In",
    hold: "Hold",
    out: "Breathe Out"
  }

  const circleScale = breathePhase === "in" ? "scale-150" : breathePhase === "hold" ? "scale-150" : "scale-100"

  return (
    <div className="fixed inset-0 bg-gradient-to-br from-blue-50 to-green-50 flex items-center justify-center z-50 p-4">
      <Card className="w-full max-w-md text-center border-none shadow-2xl bg-white/90 backdrop-blur">
        <CardContent className="p-8">
          <div className="mb-6">
            <h2 className="text-2xl font-semibold text-gray-800 mb-2">Take a Moment</h2>
            <p className="text-gray-600">Let's breathe together and stay calm</p>
          </div>

          <div className="mb-8 flex justify-center">
            <div className={`w-32 h-32 rounded-full bg-gradient-to-br from-blue-400 to-green-400 flex items-center justify-center transition-transform duration-1000 ${circleScale}`}>
              <Heart className="w-12 h-12 text-white" />
            </div>
          </div>

          <div className="mb-6">
            <div className="text-3xl font-bold text-gray-800 mb-2">{phaseText[breathePhase]}</div>
            <div className="text-6xl font-mono text-blue-600">{count}</div>
          </div>

          <div className="flex justify-center gap-4 mb-6">
            <Button
              variant="outline"
              size="sm"
              onClick={() => setAudioEnabled(!audioEnabled)}
              className="border-2"
            >
              {audioEnabled ? <Volume2 className="h-4 w-4 mr-2" /> : <VolumeX className="h-4 w-4 mr-2" />}
              {audioEnabled ? "Audio On" : "Audio Off"}
            </Button>
          </div>

          <div className="space-y-3">
            <p className="text-sm text-gray-600">
              You're doing great. Help is on the way.
            </p>
            <Button onClick={onClose} className="w-full bg-green-600 hover:bg-green-700 text-white">
              I'm Ready to Continue
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
