"use client"

import type React from "react"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { VoiceCommandSystem } from "./VoiceCommandSystem"
import { Shield, Heart, Phone, Satellite, X, Crown, Activity } from "lucide-react"

export const HeroModeFloating: React.FC = () => {
  const [isVisible, setIsVisible] = useState(true)
  const [isExpanded, setIsExpanded] = useState(false)
  const [isListening, setIsListening] = useState(false)
  const [currentStep, setCurrentStep] = useState("initial")

  const handleVoiceCommand = (command: string) => {
    switch (command) {
      case "activate_hero_mode":
        setIsExpanded(true)
        break
      case "show_help":
        break
      default:
        console.log("Voice command:", command)
    }
  }

  if (!isVisible) return null

  // Show just the activation button when not expanded
  if (!isExpanded) {
    return (
      <div className="fixed top-6 right-6 z-50">
        <Button
          onClick={() => setIsExpanded(true)}
          className="bg-red-600 hover:bg-red-700 text-white font-bold py-4 px-6 text-lg shadow-2xl border-2 border-red-500 animate-pulse"
        >
          <Heart className="w-6 h-6 mr-2" />★ ACTIVATE HERO MODE
        </Button>

        {/* Hidden voice command system for activation */}
        <div className="sr-only">
          <VoiceCommandSystem
            isActive={true}
            onCommand={handleVoiceCommand}
            currentStep={currentStep}
            isListening={isListening}
            onToggleListening={() => setIsListening(!isListening)}
          />
        </div>
      </div>
    )
  }

  // Show full interface when expanded
  return (
    <div className="fixed top-6 right-6 z-50 max-w-sm">
      <Card className="bg-white border-2 border-red-500 shadow-2xl">
        {/* Header */}
        <div className="bg-red-600 text-white p-4 rounded-t-lg">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Crown className="w-6 h-6" />
              <div>
                <div className="font-bold text-lg">SafeRoute Initiate HERO MODE</div>
                <div className="text-red-100 text-sm">Voice Command: "SafeRoute initiate HERO MODE"</div>
              </div>
            </div>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsExpanded(false)}
              className="text-white hover:bg-red-700"
            >
              <X className="w-4 h-4" />
            </Button>
          </div>
        </div>

        {/* Main Action Button */}
        <div className="p-4">
          <Button
            onClick={() => (window.location.href = "/wireframes/mobile")}
            className="w-full bg-red-600 hover:bg-red-700 text-white font-bold py-4 text-lg shadow-lg"
          >
            <Heart className="w-6 h-6 mr-2" />★ ACTIVATE HERO MODE
          </Button>
        </div>

        {/* Status Indicators */}
        <div className="px-4 pb-4 space-y-2">
          <div className="flex items-center justify-between">
            <Badge className="bg-emerald-100 text-emerald-700 border-emerald-300">
              <Satellite className="w-3 h-3 mr-1" />
              Satellite Ready
            </Badge>
            <Badge className="bg-blue-100 text-blue-700 border-blue-300">
              <Activity className="w-3 h-3 mr-1" />
              GPS Active
            </Badge>
          </div>
          <div className="text-center text-sm text-slate-600">Emergency CPR training & 911 coordination</div>
        </div>

        {/* Voice Commands Section */}
        <div className="border-t border-slate-200">
          <VoiceCommandSystem
            isActive={true}
            onCommand={handleVoiceCommand}
            currentStep={currentStep}
            isListening={isListening}
            onToggleListening={() => setIsListening(!isListening)}
          />
        </div>

        {/* Quick Actions */}
        <div className="p-4 border-t border-slate-200 bg-slate-50 rounded-b-lg">
          <div className="grid grid-cols-3 gap-2 text-xs">
            <Button
              variant="outline"
              size="sm"
              className="flex flex-col items-center gap-1 h-auto py-2 bg-transparent"
              onClick={() => (window.location.href = "/elder-portal")}
            >
              <Crown className="w-4 h-4" />
              Elder Portal
            </Button>
            <Button
              variant="outline"
              size="sm"
              className="flex flex-col items-center gap-1 h-auto py-2 bg-transparent"
              onClick={() => (window.location.href = "/wireframes/dashboard")}
            >
              <Shield className="w-4 h-4" />
              Dashboard
            </Button>
            <Button
              variant="outline"
              size="sm"
              className="flex flex-col items-center gap-1 h-auto py-2 bg-transparent"
              onClick={() => setIsExpanded(!isExpanded)}
            >
              <Phone className="w-4 h-4" />
              Help
            </Button>
          </div>
        </div>
      </Card>
    </div>
  )
}
