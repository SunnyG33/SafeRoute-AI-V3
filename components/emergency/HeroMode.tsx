"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { AlertTriangle, Phone, Users, Zap, Heart, ArrowRight } from "lucide-react"
import CPRGuide from "./CPRGuide"
import AEDFinderComplete from "./AEDFinderComplete"

interface HeroModeProps {
  onClose?: () => void
}

export default function HeroMode({ onClose }: HeroModeProps) {
  const [currentStep, setCurrentStep] = useState<"assessment" | "cpr" | "aed" | "calling911">("assessment")
  const [emergencyType, setEmergencyType] = useState<string | null>(null)
  const [isEmergencyActive, setIsEmergencyActive] = useState(false)

  useEffect(() => {
    setIsEmergencyActive(true)
  }, [])

  const handleEmergencyTypeSelect = (type: string) => {
    setEmergencyType(type)

    switch (type) {
      case "cardiac":
        setCurrentStep("aed")
        break
      case "unconscious":
        setCurrentStep("cpr")
        break
      case "call911":
        setCurrentStep("calling911")
        break
      default:
        setCurrentStep("cpr")
    }
  }

  const handleAEDNotFound = () => {
    setCurrentStep("cpr")
  }

  if (currentStep === "aed") {
    return (
      <AEDFinderComplete
        heroModeActive={true}
        onNoAEDFound={handleAEDNotFound}
        onBack={() => setCurrentStep("assessment")}
      />
    )
  }

  if (currentStep === "cpr") {
    return <CPRGuide onBack={() => setCurrentStep("assessment")} emergencyMode={true} />
  }

  if (currentStep === "calling911") {
    return (
      <div className="min-h-screen bg-red-900 text-white p-4">
        <div className="max-w-md mx-auto text-center">
          <div className="mb-8">
            <Phone className="w-24 h-24 mx-auto mb-4 text-white animate-pulse" />
            <h1 className="text-3xl font-bold mb-2">CALLING 911</h1>
            <p className="text-red-200">Emergency services have been contacted</p>
          </div>

          <Card className="bg-red-800 border-red-600 mb-6">
            <CardContent className="p-6">
              <h2 className="text-xl font-bold mb-4">Stay on the line</h2>
              <p className="text-red-200">
                Emergency dispatcher will guide you through next steps. Keep the person comfortable and monitor their
                breathing.
              </p>
            </CardContent>
          </Card>

          <Button
            onClick={() => setCurrentStep("assessment")}
            className="bg-white text-red-900 hover:bg-red-100 font-bold py-3 px-6 rounded-full"
          >
            ← Back to Emergency Options
          </Button>
        </div>
      </div>
    )
  }

  // Main Hero Mode Assessment Screen
  return (
    <div className="min-h-screen bg-red-900 text-white p-4">
      <div className="max-w-md mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center mb-4">
            <div className="w-16 h-16 bg-red-600 rounded-full flex items-center justify-center animate-pulse">
              <AlertTriangle className="w-8 h-8 text-white" />
            </div>
          </div>
          <h1 className="text-3xl font-bold mb-2">HERO MODE™</h1>
          <Badge className="bg-red-600 text-white px-4 py-2 text-lg font-bold">🚨 EMERGENCY RESPONSE ACTIVE</Badge>
        </div>

        {/* Emergency Type Selection */}
        <Card className="bg-red-800 border-red-600 mb-6">
          <CardHeader>
            <CardTitle className="text-white text-xl text-center">What type of emergency?</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <Button
              onClick={() => handleEmergencyTypeSelect("cardiac")}
              className="w-full bg-purple-600 hover:bg-purple-700 text-white font-bold py-4 px-6 rounded-xl text-lg flex items-center justify-between"
            >
              <div className="flex items-center gap-3">
                <Zap className="w-6 h-6" />
                <span>⚡ FIND AED - HEART ATTACK</span>
              </div>
              <ArrowRight className="w-5 h-5" />
            </Button>

            <Button
              onClick={() => handleEmergencyTypeSelect("unconscious")}
              className="w-full bg-red-600 hover:bg-red-700 text-white font-bold py-4 px-6 rounded-xl text-lg flex items-center justify-between"
            >
              <div className="flex items-center gap-3">
                <Heart className="w-6 h-6" />
                <span>🫀 PERSON UNCONSCIOUS - CPR</span>
              </div>
              <ArrowRight className="w-5 h-5" />
            </Button>

            <Button
              onClick={() => handleEmergencyTypeSelect("call911")}
              className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-4 px-6 rounded-xl text-lg flex items-center justify-between"
            >
              <div className="flex items-center gap-3">
                <Phone className="w-6 h-6" />
                <span>📞 CALL 911 NOW</span>
              </div>
              <ArrowRight className="w-5 h-5" />
            </Button>

            <Button
              onClick={() => handleEmergencyTypeSelect("other")}
              className="w-full bg-orange-600 hover:bg-orange-700 text-white font-bold py-4 px-6 rounded-xl text-lg flex items-center justify-between"
            >
              <div className="flex items-center gap-3">
                <Users className="w-6 h-6" />
                <span>🦸 OTHER EMERGENCY</span>
              </div>
              <ArrowRight className="w-5 h-5" />
            </Button>
          </CardContent>
        </Card>

        {/* Quick Actions */}
        <div className="grid grid-cols-2 gap-4 mb-6">
          <Button
            onClick={() => (window.location.href = "tel:911")}
            className="bg-red-600 hover:bg-red-700 text-white font-bold py-3 px-4 rounded-xl"
          >
            <Phone className="w-5 h-5 mr-2" />
            Call 911
          </Button>

          <Button
            onClick={() => handleEmergencyTypeSelect("cardiac")}
            className="bg-purple-600 hover:bg-purple-700 text-white font-bold py-3 px-4 rounded-xl"
          >
            <Zap className="w-5 h-5 mr-2" />
            Find AED
          </Button>
        </div>

        {/* Close Button */}
        {onClose && (
          <div className="text-center">
            <Button
              onClick={onClose}
              variant="outline"
              className="border-white text-white hover:bg-white hover:text-red-900 font-bold py-3 px-6 rounded-full bg-transparent"
            >
              Exit Hero Mode
            </Button>
          </div>
        )}

        {/* Legal Notice */}
        <div className="mt-8 p-4 bg-red-800/50 rounded-xl">
          <p className="text-red-200 text-xs text-center">
            Hero Mode™ provides emergency guidance only. Always call 911 for medical emergencies. This is not a
            substitute for professional medical training.
          </p>
        </div>
      </div>
    </div>
  )
}
