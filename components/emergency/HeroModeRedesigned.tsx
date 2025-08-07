"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import {
  Heart,
  Phone,
  MapPin,
  Clock,
  CheckCircle,
  X,
  Mic,
  MicOff,
  Volume2,
  VolumeX,
  Zap,
  Navigation,
  Users,
  Shield,
} from "lucide-react"

interface HeroModeRedesignedProps {
  onExit: () => void
}

export default function HeroModeRedesigned({ onExit }: HeroModeRedesignedProps) {
  const [currentStep, setCurrentStep] = useState(0)
  const [isListening, setIsListening] = useState(true)
  const [isSpeaking, setIsSpeaking] = useState(true)
  const [timer, setTimer] = useState(0)
  const [compressionCount, setCompressionCount] = useState(0)
  const [showAEDFinder, setShowAEDFinder] = useState(false)

  const steps = [
    {
      title: "Scene Safety Check",
      instruction: "Check if the scene is safe. Look for hazards like fire, traffic, or dangerous objects.",
      action: "Tap 'Scene is Safe' when ready",
      color: "bg-amber-600",
    },
    {
      title: "Check Responsiveness",
      instruction: "Tap the person's shoulders firmly and shout 'Are you okay?'",
      action: "Tap 'Person is Unresponsive' if no response",
      color: "bg-red-600",
    },
    {
      title: "Call for Help",
      instruction: "Call 911 immediately. Ask someone to find an AED if available.",
      action: "Tap 'Help is Coming' when 911 is called",
      color: "bg-blue-600",
    },
    {
      title: "Position & Compressions",
      instruction: "Place heel of hand on center of chest. Push hard and fast at least 2 inches deep.",
      action: "Follow the rhythm - 30 compressions, then 2 breaths",
      color: "bg-emerald-600",
    },
  ]

  useEffect(() => {
    const interval = setInterval(() => {
      setTimer((prev) => prev + 1)
    }, 1000)
    return () => clearInterval(interval)
  }, [])

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins}:${secs.toString().padStart(2, "0")}`
  }

  const nextStep = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1)
    }
  }

  const addCompression = () => {
    setCompressionCount((prev) => prev + 1)
  }

  return (
    <div className="min-h-screen bg-black text-white p-4">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-4">
          <div className="w-12 h-12 bg-red-600 rounded-full flex items-center justify-center border-4 border-white">
            <Heart className="h-6 w-6 text-white" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-white">HERO MODE™ ACTIVE</h1>
            <p className="text-red-300 font-semibold">Emergency CPR Guidance</p>
          </div>
        </div>

        <div className="flex items-center space-x-4">
          <div className="text-right">
            <div className="text-2xl font-bold text-white">{formatTime(timer)}</div>
            <div className="text-sm text-slate-300 font-semibold">Emergency Time</div>
          </div>
          <Button
            onClick={onExit}
            className="bg-slate-700 hover:bg-slate-600 text-white border-4 border-white"
            size="lg"
          >
            <X className="h-5 w-5" />
          </Button>
        </div>
      </div>

      {/* Progress Bar */}
      <div className="mb-8">
        <div className="flex justify-between items-center mb-2">
          <span className="text-sm font-bold text-white">
            Step {currentStep + 1} of {steps.length}
          </span>
          <span className="text-sm text-slate-300 font-semibold">
            {Math.round(((currentStep + 1) / steps.length) * 100)}% Complete
          </span>
        </div>
        <Progress value={((currentStep + 1) / steps.length) * 100} className="h-3 bg-slate-700 border-2 border-white" />
      </div>

      {/* Main Content */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Current Step */}
        <div className="lg:col-span-2">
          <Card className={`${steps[currentStep].color} text-white border-4 border-white shadow-2xl`}>
            <CardHeader>
              <CardTitle className="text-3xl font-bold text-white flex items-center">
                <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center mr-4">
                  <span className="text-2xl font-bold text-black">{currentStep + 1}</span>
                </div>
                {steps[currentStep].title}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <p className="text-xl text-white font-semibold leading-relaxed">{steps[currentStep].instruction}</p>

                {currentStep === 3 && (
                  <div className="bg-black/30 rounded-lg p-6 border-4 border-white">
                    <div className="text-center mb-4">
                      <div className="text-6xl font-bold text-white mb-2">{compressionCount}</div>
                      <p className="text-white font-semibold">Compressions</p>
                    </div>
                    <Button
                      onClick={addCompression}
                      className="w-full bg-white hover:bg-slate-200 text-black font-bold py-8 text-2xl border-4 border-black"
                    >
                      <Heart className="mr-4 h-8 w-8" />
                      PUSH HARD & FAST
                    </Button>
                    <p className="text-center text-white mt-4 font-semibold">Rhythm: 100-120 compressions per minute</p>
                  </div>
                )}

                <Button
                  onClick={nextStep}
                  disabled={currentStep === steps.length - 1}
                  className="w-full bg-white hover:bg-slate-200 text-black font-bold py-4 text-xl border-4 border-black"
                >
                  <CheckCircle className="mr-2 h-6 w-6" />
                  {steps[currentStep].action}
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Side Panel */}
        <div className="space-y-6">
          {/* Voice Controls */}
          <Card className="bg-slate-800 border-4 border-white text-white">
            <CardHeader>
              <CardTitle className="text-white font-bold">Voice Controls</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="font-semibold">Listening</span>
                <Button
                  onClick={() => setIsListening(!isListening)}
                  className={`${isListening ? "bg-emerald-600" : "bg-slate-600"} hover:bg-emerald-700 border-2 border-white`}
                >
                  {isListening ? <Mic className="h-4 w-4" /> : <MicOff className="h-4 w-4" />}
                </Button>
              </div>
              <div className="flex items-center justify-between">
                <span className="font-semibold">Voice Guidance</span>
                <Button
                  onClick={() => setIsSpeaking(!isSpeaking)}
                  className={`${isSpeaking ? "bg-blue-600" : "bg-slate-600"} hover:bg-blue-700 border-2 border-white`}
                >
                  {isSpeaking ? <Volume2 className="h-4 w-4" /> : <VolumeX className="h-4 w-4" />}
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Emergency Actions */}
          <Card className="bg-slate-800 border-4 border-white text-white">
            <CardHeader>
              <CardTitle className="text-white font-bold">Emergency Actions</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <Button
                onClick={() => setShowAEDFinder(true)}
                className="w-full bg-yellow-600 hover:bg-yellow-700 text-white font-bold border-2 border-white"
              >
                <Zap className="mr-2 h-4 w-4" />
                Find Nearest AED
              </Button>
              <Button className="w-full bg-red-600 hover:bg-red-700 text-white font-bold border-2 border-white">
                <Phone className="mr-2 h-4 w-4" />
                Call 911 Again
              </Button>
              <Button className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold border-2 border-white">
                <Users className="mr-2 h-4 w-4" />
                Request Hero Backup
              </Button>
            </CardContent>
          </Card>

          {/* Status Indicators */}
          <Card className="bg-slate-800 border-4 border-white text-white">
            <CardHeader>
              <CardTitle className="text-white font-bold">Emergency Status</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="font-semibold">911 Called</span>
                <Badge className="bg-emerald-600 text-white border-2 border-white font-bold">
                  <CheckCircle className="mr-1 h-3 w-3" />
                  ACTIVE
                </Badge>
              </div>
              <div className="flex items-center justify-between">
                <span className="font-semibold">EMS Response</span>
                <Badge className="bg-amber-600 text-white border-2 border-white font-bold">
                  <Clock className="mr-1 h-3 w-3" />
                  EN ROUTE
                </Badge>
              </div>
              <div className="flex items-center justify-between">
                <span className="font-semibold">Location Shared</span>
                <Badge className="bg-emerald-600 text-white border-2 border-white font-bold">
                  <MapPin className="mr-1 h-3 w-3" />
                  CONFIRMED
                </Badge>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* AED Finder Modal */}
      {showAEDFinder && (
        <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4">
          <Card className="bg-white text-black max-w-md w-full border-4 border-yellow-600">
            <CardHeader>
              <CardTitle className="flex items-center text-black">
                <Zap className="mr-2 h-6 w-6 text-yellow-600" />
                AED Finder™
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="bg-yellow-50 border-4 border-yellow-200 rounded-lg p-4">
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-bold text-black">Nearest AED</span>
                    <Badge className="bg-emerald-600 text-white border-2 border-black font-bold">120m away</Badge>
                  </div>
                  <p className="text-sm text-black font-semibold">Community Center - Main Entrance</p>
                  <p className="text-xs text-slate-600 font-semibold">Last verified: 2 days ago</p>
                </div>
                <div className="flex space-x-2">
                  <Button
                    onClick={() => setShowAEDFinder(false)}
                    className="flex-1 bg-yellow-600 hover:bg-yellow-700 text-white font-bold border-2 border-black"
                  >
                    <Navigation className="mr-2 h-4 w-4" />
                    Get Directions
                  </Button>
                  <Button
                    onClick={() => setShowAEDFinder(false)}
                    className="bg-slate-600 hover:bg-slate-700 text-white border-2 border-black"
                  >
                    <X className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      {/* Bottom Status Bar */}
      <div className="fixed bottom-0 left-0 right-0 bg-slate-900 border-t-4 border-white p-4">
        <div className="flex items-center justify-between max-w-7xl mx-auto">
          <div className="flex items-center space-x-6">
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 bg-emerald-500 rounded-full animate-pulse"></div>
              <span className="text-white font-semibold">Hero Mode™ Active</span>
            </div>
            <div className="flex items-center space-x-2">
              <Shield className="h-4 w-4 text-blue-400" />
              <span className="text-slate-300 font-semibold">Emergency Services Notified</span>
            </div>
          </div>
          <div className="text-right">
            <div className="text-white font-bold">SafeRoute AI</div>
            <div className="text-xs text-slate-400 font-semibold">Emergency Response Platform</div>
          </div>
        </div>
      </div>
    </div>
  )
}
