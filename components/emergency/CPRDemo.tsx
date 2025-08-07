"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Heart, Phone, MapPin, Satellite, Clock, Activity, ArrowLeft } from "lucide-react"

interface CPRDemoProps {
  onComplete: () => void
}

export function CPRDemo({ onComplete }: CPRDemoProps) {
  const [currentStep, setCurrentStep] = useState(0)
  const [compressionCount, setCompressionCount] = useState(0)
  const [bpm, setBpm] = useState(0)
  const [isCompressing, setIsCompressing] = useState(false)
  const [timer, setTimer] = useState(0)
  const [satelliteConnected, setSatelliteConnected] = useState(true)

  const steps = [
    {
      title: "🚨 Emergency Detected",
      description: "Cardiac arrest emergency - Hero Mode activated",
      action: "Check responsiveness and breathing",
      color: "bg-red-100 border-red-500",
    },
    {
      title: "📞 911 Contacted",
      description: "Emergency services notified via Starlink",
      action: "Begin chest compressions immediately",
      color: "bg-orange-100 border-orange-500",
    },
    {
      title: "💓 CPR in Progress",
      description: "Maintain 100-120 compressions per minute",
      action: "Press the compression button to the rhythm",
      color: "bg-blue-100 border-blue-500",
    },
    {
      title: "🦸 Heroes Dispatched",
      description: "Local community heroes en route",
      action: "Continue CPR until help arrives",
      color: "bg-green-100 border-green-500",
    },
    {
      title: "🚑 Paramedics Arrived",
      description: "Professional medical team taking over",
      action: "Hand off to paramedics - Hero Mode complete",
      color: "bg-purple-100 border-purple-500",
    },
  ]

  useEffect(() => {
    const interval = setInterval(() => {
      setTimer((prev) => prev + 1)
    }, 1000)
    return () => clearInterval(interval)
  }, [])

  const handleCompression = () => {
    setCompressionCount((prev) => prev + 1)
    setIsCompressing(true)

    // Calculate BPM based on compression timing
    const newBpm = Math.min(120, Math.max(80, 100 + Math.random() * 20))
    setBpm(Math.round(newBpm))

    setTimeout(() => setIsCompressing(false), 200)

    // Auto advance after 30 compressions
    if (compressionCount >= 29 && currentStep === 2) {
      setTimeout(() => setCurrentStep(3), 1000)
    }
  }

  const nextStep = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1)
    } else {
      onComplete()
    }
  }

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins}:${secs.toString().padStart(2, "0")}`
  }

  return (
    <div className="min-h-screen bg-red-50 p-4">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <Button onClick={onComplete} variant="ghost" className="text-red-700 hover:bg-red-100">
          <ArrowLeft className="h-4 w-4 mr-2" />
          Exit CPR Training
        </Button>
        <Badge variant="destructive" className="animate-pulse">
          CPR TRAINING ACTIVE
        </Badge>
      </div>

      <Card className="w-full max-w-md mx-auto bg-white shadow-2xl border-2 border-red-500">
        <CardHeader className="bg-gradient-to-r from-red-500 to-orange-500 text-white">
          <CardTitle className="flex items-center gap-2">
            <Heart className="h-6 w-6" />
            HERO MODE: CPR Training
            <Badge variant="secondary" className="ml-auto">
              Step {currentStep + 1}/5
            </Badge>
          </CardTitle>
        </CardHeader>

        <CardContent className="p-6 space-y-4">
          {/* Satellite Status */}
          <div className="flex items-center justify-between bg-blue-50 p-3 rounded-lg">
            <div className="flex items-center gap-2">
              <Satellite className={`h-5 w-5 ${satelliteConnected ? "text-green-600" : "text-red-600"}`} />
              <span className="text-sm font-medium">{satelliteConnected ? "Starlink Connected" : "Connecting..."}</span>
            </div>
            <div className="flex items-center gap-2">
              <Clock className="h-4 w-4 text-gray-600" />
              <span className="text-sm">{formatTime(timer)}</span>
            </div>
          </div>

          {/* Current Step */}
          <div className={`p-4 rounded-lg border-2 ${steps[currentStep].color}`}>
            <h3 className="font-bold text-lg mb-2">{steps[currentStep].title}</h3>
            <p className="text-sm text-gray-700 mb-2">{steps[currentStep].description}</p>
            <p className="text-sm font-medium">{steps[currentStep].action}</p>
          </div>

          {/* CPR Compression Interface */}
          {currentStep === 2 && (
            <div className="space-y-4">
              <div className="text-center">
                <Button
                  onClick={handleCompression}
                  className={`w-32 h-32 rounded-full text-2xl font-bold transition-all duration-200 ${
                    isCompressing ? "bg-red-700 scale-95 shadow-inner" : "bg-red-600 hover:bg-red-700 shadow-lg"
                  }`}
                >
                  💓<br />
                  PUSH
                </Button>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="text-center">
                  <div className="text-2xl font-bold text-red-600">{compressionCount}</div>
                  <div className="text-sm text-gray-600">Compressions</div>
                </div>
                <div className="text-center">
                  <div className="flex items-center justify-center gap-1">
                    <Activity className="h-5 w-5 text-blue-600" />
                    <span className="text-2xl font-bold text-blue-600">{bpm}</span>
                  </div>
                  <div className="text-sm text-gray-600">BPM</div>
                </div>
              </div>

              <Progress value={(compressionCount / 30) * 100} className="w-full" />
              <p className="text-xs text-center text-gray-600">Target: 30 compressions at 100-120 BPM</p>
            </div>
          )}

          {/* 911 Dispatcher Simulation */}
          {currentStep === 1 && (
            <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
              <div className="flex items-center gap-2 mb-2">
                <Phone className="h-5 w-5 text-blue-600" />
                <span className="font-semibold text-blue-800">911 Dispatcher</span>
              </div>
              <p className="text-sm text-blue-700 italic">
                "Emergency services have been notified. We have your location via satellite. Local Indigenous community
                heroes are also being dispatched. Begin CPR immediately."
              </p>
            </div>
          )}

          {/* Location Status */}
          <div className="flex items-center gap-2 bg-green-50 p-3 rounded-lg">
            <MapPin className="h-5 w-5 text-green-600" />
            <span className="text-sm">Location shared: 54.7267° N, 113.3000° W (Fort McMurray, AB)</span>
          </div>

          {/* Progress Indicator */}
          <div className="flex justify-between items-center">
            {steps.map((_, index) => (
              <div
                key={index}
                className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold ${
                  index <= currentStep ? "bg-green-500 text-white" : "bg-gray-200 text-gray-500"
                }`}
              >
                {index + 1}
              </div>
            ))}
          </div>

          {/* Action Button */}
          <div className="flex gap-2">
            {currentStep !== 2 && (
              <Button onClick={nextStep} className="flex-1 bg-red-600 hover:bg-red-700">
                {currentStep === steps.length - 1 ? "Complete Training" : "Next Step"}
              </Button>
            )}
            <Button onClick={onComplete} variant="outline" className="border-gray-400 bg-transparent">
              Exit Hero Mode
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
