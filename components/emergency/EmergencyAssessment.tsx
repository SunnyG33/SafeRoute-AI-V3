"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

export type EmergencyType =
  | "person_collapsed"
  | "fire_smoke"
  | "vehicle_accident"
  | "natural_disaster"
  | "home_emergency"
  | "other_unsure"

interface EmergencyAssessmentProps {
  onEmergencyTypeSelected: (type: EmergencyType) => void
  voiceCommandActive?: boolean
}

export default function EmergencyAssessment({
  onEmergencyTypeSelected,
  voiceCommandActive = true,
}: EmergencyAssessmentProps) {
  const [selectedType, setSelectedType] = useState<EmergencyType | null>(null)

  const emergencyTypes = [
    {
      type: "person_collapsed" as EmergencyType,
      icon: "👤",
      title: "PERSON COLLAPSED",
      description: "Unconscious, not breathing",
      color: "bg-red-600 hover:bg-red-700",
    },
    {
      type: "fire_smoke" as EmergencyType,
      icon: "🔥",
      title: "FIRE/SMOKE",
      description: "Building fire, smoke inhalation",
      color: "bg-orange-600 hover:bg-orange-700",
    },
    {
      type: "vehicle_accident" as EmergencyType,
      icon: "🚗",
      title: "VEHICLE ACCIDENT",
      description: "Car crash, injuries",
      color: "bg-yellow-600 hover:bg-yellow-700",
    },
    {
      type: "natural_disaster" as EmergencyType,
      icon: "🌊",
      title: "NATURAL DISASTER",
      description: "Flood, earthquake, severe storm",
      color: "bg-blue-600 hover:bg-blue-700",
    },
    {
      type: "home_emergency" as EmergencyType,
      icon: "🏠",
      title: "HOME EMERGENCY",
      description: "Fall, medical emergency at home",
      color: "bg-green-600 hover:bg-green-700",
    },
    {
      type: "other_unsure" as EmergencyType,
      icon: "❓",
      title: "OTHER/UNSURE",
      description: "Describe the emergency",
      color: "bg-gray-600 hover:bg-gray-700",
    },
  ]

  const handleTypeSelection = (type: EmergencyType) => {
    setSelectedType(type)
    // Small delay for visual feedback
    setTimeout(() => {
      onEmergencyTypeSelected(type)
    }, 300)
  }

  return (
    <div className="min-h-screen bg-red-50 flex items-center justify-center p-4">
      <Card className="w-full max-w-2xl">
        <CardContent className="p-6">
          {/* Header */}
          <div className="text-center mb-6">
            <div className="flex items-center justify-center gap-2 mb-2">
              <span className="text-2xl">🚨</span>
              <h1 className="text-2xl font-bold text-red-800">Emergency Assessment</h1>
            </div>
            <p className="text-lg text-gray-700">Help me understand the situation:</p>
          </div>

          {/* Emergency Type Selection */}
          <div className="space-y-3 mb-6">
            {emergencyTypes.map((emergency) => (
              <Button
                key={emergency.type}
                onClick={() => handleTypeSelection(emergency.type)}
                className={`w-full h-auto p-4 text-left justify-start ${emergency.color} text-white transition-all duration-200 ${
                  selectedType === emergency.type ? "ring-4 ring-white scale-105" : ""
                }`}
                variant="default"
              >
                <div className="flex items-center gap-4 w-full">
                  <span className="text-2xl">{emergency.icon}</span>
                  <div className="flex-1">
                    <div className="font-bold text-lg">{emergency.title}</div>
                    <div className="text-sm opacity-90">{emergency.description}</div>
                  </div>
                </div>
              </Button>
            ))}
          </div>

          {/* Voice Command Section */}
          {voiceCommandActive && (
            <Card className="bg-blue-50 border-blue-200">
              <CardContent className="p-4">
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-xl">🎤</span>
                  <span className="font-semibold text-blue-800">Voice Commands Available:</span>
                </div>
                <div className="text-sm text-blue-700 space-y-1">
                  <div>"Person collapsed" → CPR guidance</div>
                  <div>"Fire" or "Smoke" → Fire emergency</div>
                  <div>"Car accident" → Trauma response</div>
                  <div>"Not sure" → General assessment</div>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Emergency Services Notice */}
          <div className="mt-6 p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
            <div className="flex items-center gap-2">
              <span className="text-yellow-600">⚠️</span>
              <span className="font-semibold text-yellow-800">All emergency types connect to 911</span>
            </div>
          </div>

          {/* Beta Disclaimer */}
          <div className="mt-4 text-center">
            <Badge variant="outline" className="bg-gray-100">
              ⚠️ BETA - Not for sole use in emergencies
            </Badge>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
