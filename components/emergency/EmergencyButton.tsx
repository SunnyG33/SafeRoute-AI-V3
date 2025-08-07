"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { AlertTriangle, Phone, MapPin } from "lucide-react"

interface EmergencyButtonProps {
  variant?: "general" | "medical" | "fire" | "police"
  size?: "sm" | "md" | "lg"
  onEmergencyActivated?: () => void
}

export function EmergencyButton({ variant = "general", size = "md", onEmergencyActivated }: EmergencyButtonProps) {
  const [isActivated, setIsActivated] = useState(false)
  const [countdown, setCountdown] = useState(0)

  const handleEmergencyClick = () => {
    setIsActivated(true)
    setCountdown(3)

    const timer = setInterval(() => {
      setCountdown((prev) => {
        if (prev <= 1) {
          clearInterval(timer)
          onEmergencyActivated?.()
          return 0
        }
        return prev - 1
      })
    }, 1000)
  }

  const getButtonConfig = () => {
    switch (variant) {
      case "medical":
        return {
          color: "bg-red-600 hover:bg-red-700",
          icon: <Phone className="h-6 w-6" />,
          text: "MEDICAL EMERGENCY",
          description: "Heart attack, stroke, severe injury",
        }
      case "fire":
        return {
          color: "bg-orange-600 hover:bg-orange-700",
          icon: <AlertTriangle className="h-6 w-6" />,
          text: "FIRE EMERGENCY",
          description: "Structure fire, wildfire, explosion",
        }
      case "police":
        return {
          color: "bg-blue-600 hover:bg-blue-700",
          icon: <Phone className="h-6 w-6" />,
          text: "POLICE EMERGENCY",
          description: "Crime in progress, violence, threat",
        }
      default:
        return {
          color: "bg-red-600 hover:bg-red-700",
          icon: <AlertTriangle className="h-6 w-6" />,
          text: "EMERGENCY",
          description: "Any life-threatening situation",
        }
    }
  }

  const getSizeClasses = () => {
    switch (size) {
      case "sm":
        return "px-4 py-2 text-sm"
      case "lg":
        return "px-8 py-6 text-xl"
      default:
        return "px-6 py-4 text-lg"
    }
  }

  const config = getButtonConfig()

  if (isActivated) {
    return (
      <div className="text-center space-y-4">
        <div className="bg-red-100 border-2 border-red-500 rounded-lg p-6">
          <div className="text-6xl font-bold text-red-600 mb-2">{countdown}</div>
          <p className="text-red-800 font-semibold">Emergency services being contacted...</p>
          <div className="flex items-center justify-center gap-2 mt-2">
            <MapPin className="h-4 w-4 text-green-600" />
            <span className="text-sm text-green-700">Location: 54.7267° N, 113.3000° W</span>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="text-center space-y-2">
      <Button
        onClick={handleEmergencyClick}
        className={`${config.color} ${getSizeClasses()} font-bold text-white shadow-lg transform transition-all duration-200 hover:scale-105 active:scale-95`}
      >
        <div className="flex items-center gap-3">
          {config.icon}
          <span>{config.text}</span>
        </div>
      </Button>
      <p className="text-xs text-gray-600 max-w-xs mx-auto">{config.description}</p>
    </div>
  )
}
