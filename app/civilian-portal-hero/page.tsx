"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import FloatingEmergencyButtons from "@/components/emergency/FloatingEmergencyButtons"
import {
  Heart,
  MapPin,
  Phone,
  Shield,
  Zap,
  Satellite,
  Users,
  AlertTriangle,
  Navigation,
  Activity,
  CheckCircle,
  ArrowRight,
  Play,
  RotateCcw,
} from "lucide-react"

export default function CivilianPortalHero() {
  const [heroMode, setHeroMode] = useState(false)
  const [currentStep, setCurrentStep] = useState(0)
  const [responseTime, setResponseTime] = useState(0)
  const [isConnected, setIsConnected] = useState(true)
  const [emergencyType, setEmergencyType] = useState<string | null>(null)

  useEffect(() => {
    if (heroMode) {
      const timer = setInterval(() => {
        setResponseTime((prev) => prev + 1)
      }, 1000)
      return () => clearInterval(timer)
    }
  }, [heroMode])

  const emergencyTypes = [
    {
      id: "cardiac",
      label: "Cardiac Emergency",
      icon: Heart,
      color: "bg-red-500",
      description: "Heart attack, cardiac arrest",
    },
    {
      id: "trauma",
      label: "Trauma/Injury",
      icon: AlertTriangle,
      color: "bg-orange-500",
      description: "Accidents, falls, wounds",
    },
    {
      id: "medical",
      label: "Medical Emergency",
      icon: Activity,
      color: "bg-blue-500",
      description: "Stroke, seizure, breathing",
    },
    {
      id: "evacuation",
      label: "Evacuation",
      icon: Navigation,
      color: "bg-purple-500",
      description: "Fire, flood, disaster",
    },
  ]

  const heroSteps = [
    { title: "Emergency Detected", description: "AI analyzing situation", icon: Zap },
    { title: "Responders Notified", description: "EMS, Fire, Police alerted", icon: Phone },
    { title: "Location Shared", description: "Precise coordinates sent", icon: MapPin },
    { title: "Guidance Active", description: "Step-by-step instructions", icon: Shield },
    { title: "Help En Route", description: "ETA: 4 minutes", icon: Users },
  ]

  const activateHeroMode = (type: string) => {
    setEmergencyType(type)
    setHeroMode(true)
    setCurrentStep(0)
    setResponseTime(0)

    // Simulate progression through steps
    const stepTimer = setInterval(() => {
      setCurrentStep((prev) => {
        if (prev < heroSteps.length - 1) {
          return prev + 1
        } else {
          clearInterval(stepTimer)
          return prev
        }
      })
    }, 2000)
  }

  const handleCallForHelp = () => {
    // This could trigger immediate emergency response
    activateHeroMode("medical")
  }

  const handleCheckInToSafety = () => {
    // This could open a safety check-in interface
    alert("Safety check-in initiated - confirming your status...")
  }

  if (heroMode) {
    const selectedType = emergencyTypes.find((t) => t.id === emergencyType)
    const IconComponent = selectedType?.icon

    return (
      <div className="min-h-screen bg-gradient-to-br from-cyan-50 via-teal-100 to-emerald-200">
        {/* HERO Mode Active Interface */}
        <div className="relative overflow-hidden">
          {/* Animated background */}
          <div className="absolute inset-0 bg-gradient-to-r from-red-500/10 via-teal-500/10 to-blue-500/10 animate-pulse" />

          {/* Header */}
          <div className="relative z-10 p-6 border-b border-red-500/30 bg-black/20 backdrop-blur-sm">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 bg-red-500 rounded-full flex items-center justify-center animate-pulse">
                  <Shield className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h1 className="text-2xl font-bold text-white">HERO MODE ACTIVE</h1>
                  <p className="text-red-300">Emergency Response Coordinated</p>
                </div>
              </div>
              <div className="text-right">
                <div className="text-3xl font-mono text-white">
                  {Math.floor(responseTime / 60)}:{(responseTime % 60).toString().padStart(2, "0")}
                </div>
                <p className="text-sm text-gray-300">Response Time</p>
              </div>
            </div>
          </div>

          {/* Main Content */}
          <div className="relative z-10 p-6 space-y-6">
            {/* Emergency Type */}
            <Card className="bg-black/40 border-red-500/30 backdrop-blur-sm">
              <CardContent className="p-6">
                <div className="flex items-center space-x-4">
                  {selectedType && (
                    <>
                      <div className={`w-16 h-16 ${selectedType.color} rounded-full flex items-center justify-center`}>
                        {IconComponent && <IconComponent className="w-8 h-8 text-white" />}
                      </div>
                      <div>
                        <h2 className="text-2xl font-bold text-white">{selectedType.label}</h2>
                        <p className="text-gray-300">{selectedType.description}</p>
                      </div>
                    </>
                  )}
                </div>
              </CardContent>
            </Card>

            {/* Progress Steps */}
            <Card className="bg-black/40 border-teal-500/30 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="text-white flex items-center space-x-2">
                  <Activity className="w-5 h-5" />
                  <span>Response Progress</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {heroSteps.map((step, index) => (
                  <div
                    key={index}
                    className={`flex items-center space-x-4 p-3 rounded-lg transition-all duration-500 ${
                      index <= currentStep
                        ? "bg-green-500/20 border border-green-500/30"
                        : "bg-gray-500/10 border border-gray-500/20"
                    }`}
                  >
                    <div
                      className={`w-10 h-10 rounded-full flex items-center justify-center ${
                        index <= currentStep ? "bg-green-500" : "bg-gray-500"
                      }`}
                    >
                      {index <= currentStep ? (
                        <CheckCircle className="w-5 h-5 text-white" />
                      ) : (
                        <step.icon className="w-5 h-5 text-white" />
                      )}
                    </div>
                    <div className="flex-1">
                      <h3 className={`font-semibold ${index <= currentStep ? "text-green-300" : "text-gray-400"}`}>
                        {step.title}
                      </h3>
                      <p className={`text-sm ${index <= currentStep ? "text-green-200" : "text-gray-500"}`}>
                        {step.description}
                      </p>
                    </div>
                    {index === currentStep && (
                      <div className="w-6 h-6 border-2 border-green-500 border-t-transparent rounded-full animate-spin" />
                    )}
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* Live Guidance */}
            {emergencyType === "cardiac" && (
              <Card className="bg-black/40 border-red-500/30 backdrop-blur-sm">
                <CardHeader>
                  <CardTitle className="text-white flex items-center space-x-2">
                    <Heart className="w-5 h-5 text-red-500" />
                    <span>CPR Guidance Active</span>
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="text-center">
                    <div className="text-6xl font-bold text-red-500 animate-pulse">30</div>
                    <p className="text-white">Compressions Remaining</p>
                  </div>
                  <div className="flex justify-center space-x-4">
                    <Button size="lg" className="bg-red-500 hover:bg-red-600">
                      <Play className="w-5 h-5 mr-2" />
                      Start CPR
                    </Button>
                    <Button size="lg" variant="outline" className="border-red-500 text-red-500 bg-transparent">
                      <RotateCcw className="w-5 h-5 mr-2" />
                      Reset Count
                    </Button>
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Connection Status */}
            <Card className="bg-black/40 border-blue-500/30 backdrop-blur-sm">
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <Satellite className="w-5 h-5 text-blue-400" />
                    <span className="text-white">SkyBridge™ Active</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                    <span className="text-green-400 text-sm">Connected</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Exit HERO Mode */}
            <div className="flex justify-center pt-6">
              <Button
                onClick={() => setHeroMode(false)}
                variant="outline"
                className="border-gray-500 text-gray-300 hover:bg-gray-500/20"
              >
                Exit HERO Mode
              </Button>
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-cyan-50 via-teal-100 to-emerald-200">
      {/* Background Effects */}
      <div className="absolute inset-0 bg-[url('/api/placeholder/1920/1080')] bg-cover bg-center opacity-5" />
      <div className="absolute inset-0 bg-gradient-to-br from-teal-500/10 via-cyan-500/10 to-emerald-500/10" />

      {/* Header */}
      <div className="relative z-10 p-6 border-b border-white/10 bg-black/20 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-teal-500 rounded-full flex items-center justify-center">
              <Shield className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-2xl font-bold bg-gradient-to-r from-white via-blue-200 to-teal-200 bg-clip-text text-transparent">
                SafeRoute AI
              </h1>
              <p className="text-gray-300">Civilian Emergency Portal</p>
            </div>
          </div>
          <div className="flex items-center space-x-4">
            <Badge variant="outline" className="border-green-500 text-green-400">
              <div className="w-2 h-2 bg-green-500 rounded-full mr-2 animate-pulse" />
              Online
            </Badge>
            <Badge variant="outline" className="border-blue-500 text-blue-400">
              <Satellite className="w-3 h-3 mr-1" />
              Satellite Ready
            </Badge>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="relative z-10 p-6">
        <div className="max-w-7xl mx-auto space-y-8">
          {/* Hero Section */}
          <div className="text-center space-y-6">
            <h2 className="text-4xl font-bold bg-gradient-to-r from-white via-blue-200 to-teal-200 bg-clip-text text-transparent">
              Emergency Response in Seconds
            </h2>
            <p className="text-lg text-gray-300 max-w-3xl mx-auto">
              AI-powered emergency coordination connecting you to help when every second counts. Indigenous-led
              innovation serving all communities.
            </p>
          </div>

          {/* Prominent Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center max-w-2xl mx-auto">
            <Button
              onClick={handleCallForHelp}
              size="lg"
              className="w-full sm:w-auto bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white font-bold py-4 px-8 text-lg shadow-lg"
            >
              <Phone className="w-6 h-6 mr-3" />
              Call for Help
            </Button>
            <Button
              onClick={handleCheckInToSafety}
              size="lg"
              variant="outline"
              className="w-full sm:w-auto border-2 border-green-500 text-green-400 hover:bg-green-500/20 bg-transparent font-bold py-4 px-8 text-lg"
            >
              <CheckCircle className="w-6 h-6 mr-3" />
              Check-in to Safety
            </Button>
          </div>

          {/* Emergency Types Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {emergencyTypes.map((type) => (
              <Card
                key={type.id}
                className="bg-black/40 border-white/10 backdrop-blur-sm hover:border-white/30 transition-all duration-300 cursor-pointer group"
                onClick={() => activateHeroMode(type.id)}
              >
                <CardContent className="p-6 text-center space-y-4">
                  <div
                    className={`w-16 h-16 ${type.color} rounded-full flex items-center justify-center mx-auto group-hover:scale-110 transition-transform duration-300`}
                  >
                    {type.icon && <type.icon className="w-8 h-8 text-white" />}
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-white">{type.label}</h3>
                    <p className="text-sm text-gray-400">{type.description}</p>
                  </div>
                  <Button className="w-full bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700">
                    <ArrowRight className="w-4 h-4 mr-2" />
                    Activate HERO Mode
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Features Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card className="bg-black/40 border-blue-500/30 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="text-white flex items-center space-x-2">
                  <MapPin className="w-5 h-5 text-blue-400" />
                  <span>RAPTRnav™ Routing</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-300 mb-4">
                  Satellite-optimized evacuation routing that adapts in real-time as conditions change.
                </p>
                <Button variant="outline" className="border-blue-500 text-blue-400 hover:bg-blue-500/20 bg-transparent">
                  View Routes
                </Button>
              </CardContent>
            </Card>

            <Card className="bg-black/40 border-teal-500/30 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="text-white flex items-center space-x-2">
                  <Heart className="w-5 h-5 text-teal-400" />
                  <span>ShareSafe™ Medical</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-300 mb-4">
                  Encrypted, consent-based medical data sharing with first responders and hospitals.
                </p>
                <Button variant="outline" className="border-teal-500 text-teal-400 hover:bg-teal-500/20 bg-transparent">
                  Manage Profile
                </Button>
              </CardContent>
            </Card>

            <Card className="bg-black/40 border-green-500/30 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="text-white flex items-center space-x-2">
                  <Users className="w-5 h-5 text-green-400" />
                  <span>Family Reunification</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-300 mb-4">
                  Coordinate with family members and track their safety during emergencies.
                </p>
                <Button
                  variant="outline"
                  className="border-green-500 text-green-400 hover:bg-green-500/20 bg-transparent"
                >
                  Family Network
                </Button>
              </CardContent>
            </Card>
          </div>

          {/* Stats */}
          <Card className="bg-black/40 border-white/10 backdrop-blur-sm">
            <CardContent className="p-8">
              <div className="grid grid-cols-1 md:grid-cols-4 gap-8 text-center">
                <div>
                  <div className="text-3xl font-bold text-blue-400">35,000+</div>
                  <p className="text-gray-400">Lives at Risk Annually</p>
                </div>
                <div>
                  <div className="text-3xl font-bold text-teal-400">12</div>
                  <p className="text-gray-400">Patented Technologies</p>
                </div>
                <div>
                  <div className="text-3xl font-bold text-green-400">500+</div>
                  <p className="text-gray-400">Communities Served</p>
                </div>
                <div>
                  <div className="text-3xl font-bold text-red-400">&lt;30s</div>
                  <p className="text-gray-400">Average Response Time</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
      <FloatingEmergencyButtons />
    </div>
  )
}
