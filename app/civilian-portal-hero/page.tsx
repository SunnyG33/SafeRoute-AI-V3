"use client"

import type React from "react"

import { useState, useEffect, useCallback } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import FloatingEmergencyButtons from "@/components/emergency/FloatingEmergencyButtons"
import UniversalNavigation from "@/components/navigation/UniversalNavigation"
import {
  Heart,
  Phone,
  Shield,
  Zap,
  Satellite,
  Users,
  Navigation,
  Activity,
  CheckCircle,
  Play,
  RotateCcw,
  Droplets,
  Wind,
  Brain,
  Database,
  Globe,
  Wifi,
  WifiOff,
  Target,
  Stethoscope,
  Eye,
  Volume2,
  Vibrate,
  Info,
  X,
  Clock,
} from "lucide-react"

export default function CivilianPortalHero() {
  const [heroMode, setHeroMode] = useState(false)
  const [currentStep, setCurrentStep] = useState(0)
  const [responseTime, setResponseTime] = useState(0)
  const [isConnected, setIsConnected] = useState(true)
  const [emergencyType, setEmergencyType] = useState<string | null>(null)
  const [compressionCount, setCompressionCount] = useState(0)
  const [compressionRate, setCompressionRate] = useState(110) // BPM
  const [visualMetronome, setVisualMetronome] = useState(false)
  const [trainingMode, setTrainingMode] = useState<"civilian" | "professional">("civilian")
  const [meshNetworkActive, setMeshNetworkActive] = useState(false)
  const [protocolVersion, setProtocolVersion] = useState("2024.3.1")

  const [heroModeActive, setHeroModeActive] = useState(false)
  const [emergencyDuration, setEmergencyDuration] = useState(0)

  useEffect(() => {
    let intervalId: NodeJS.Timeout

    if (heroModeActive) {
      setEmergencyDuration(0)
      intervalId = setInterval(() => {
        setEmergencyDuration((prev) => prev + 1)
      }, 1000)
    }

    return () => clearInterval(intervalId)
  }, [heroModeActive])

  const formatTime = (timeInSeconds: number): string => {
    const minutes = Math.floor(timeInSeconds / 60)
    const seconds = timeInSeconds % 60
    return `${minutes.toString().padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`
  }

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
      description: "CPR, AED, cardiac arrest",
      protocols: ["Visual-Rhythm CPR", "AED Integration", "Compression Guidance"],
      bgColor: "bg-red-600",
      title: "Cardiac Emergency",
    },
    {
      id: "bleeding",
      label: "Bleeding Control",
      icon: Droplets,
      color: "bg-red-600",
      description: "Hemorrhage, pressure points, tourniquets",
      protocols: ["Pressure Point ID", "Tourniquet Application", "Wound Packing"],
      bgColor: "bg-orange-600",
      title: "Bleeding Control",
    },
    {
      id: "choking",
      label: "Choking Response",
      icon: Wind,
      color: "bg-orange-500",
      description: "Airway obstruction, Heimlich maneuver",
      protocols: ["Position Detection", "Heimlich Guidance", "Infant Adaptation"],
      bgColor: "bg-yellow-600",
      title: "Choking Response",
    },
    {
      id: "stroke",
      label: "Stroke Assessment",
      icon: Brain,
      color: "bg-purple-500",
      description: "FAST protocol, time-critical",
      protocols: ["FAST Assessment", "Timer-Driven", "Auto-911 Trigger"],
      bgColor: "bg-purple-600",
      title: "Stroke Assessment",
    },
  ]

  const ecosystemStatus = [
    { name: "HERO OS™", status: "Connected", description: "Responder Coordination", icon: Shield },
    { name: "ShareSafe™", status: "Ready", description: "Medical Records", icon: Stethoscope },
    { name: "LOGIQ™", status: "Learning", description: "Evidence Updates", icon: Database },
    { name: "RAPTRnav™", status: "Active", description: "Emergency Routing", icon: Navigation },
    { name: "LAB™", status: "Tracking", description: "Location Beacons", icon: Target },
  ]

  const heroSteps = [
    { title: "Emergency Detected", description: "AI analyzing situation", icon: Zap },
    { title: "HERO OS™ Notified", description: "Professional responders alerted", icon: Shield },
    { title: "ShareSafe™ Activated", description: "Medical data shared with consent", icon: Stethoscope },
    { title: "RAPTRnav™ Routing", description: "Optimal paths calculated", icon: Navigation },
    { title: "LAB™ Tracking", description: "Location beacons active", icon: Target },
    { title: "Guidance Active", description: "Evidence-based protocols", icon: Database },
    { title: "Help En Route", description: "ETA: 4 minutes", icon: Users },
  ]

  const handleCallForHelp = useCallback((e?: React.MouseEvent) => {
    try {
      e?.preventDefault()
      e?.stopPropagation()
      console.log("🔴 HERO CP™ Button Clicked!")
      console.log("Activating HERO CP™...")
      activateHeroMode("medical")
    } catch (error) {
      console.error("Error in handleCallForHelp:", error)
    }
  }, [])

  const handleCheckInToSafety = useCallback((e?: React.MouseEvent) => {
    try {
      e?.preventDefault()
      e?.stopPropagation()
      console.log("🟢 Check-in Button Clicked!")
      console.log("Checking in to safety...")
      setIsConnected(true)

      // Show immediate visual feedback
      const button = e?.currentTarget as HTMLButtonElement
      if (button) {
        const originalHTML = button.innerHTML
        button.textContent = "✅ Checked In!"
        setTimeout(() => {
          button.innerHTML = originalHTML
        }, 2000)
      }
      alert("✅ Safety check-in successful! Your status has been updated and shared with emergency contacts.")
    } catch (error) {
      console.error("Error in handleCheckInToSafety:", error)
    }
  }, [])

  const handleAEDFinder = useCallback((e?: React.MouseEvent) => {
    try {
      e?.preventDefault()
      e?.stopPropagation()
      console.log("🟡 AED Finder Button Clicked!")
      console.log("Opening AED Finder...")

      // Show immediate feedback
      const button = e?.currentTarget as HTMLButtonElement
      if (button) {
        const originalHTML = button.innerHTML
        button.textContent = "Opening AED Finder..."
        setTimeout(() => {
          button.innerHTML = originalHTML
        }, 1000)
      }

      // Try multiple approaches to open the page
      try {
        window.open("/aed-finder-complete", "_blank")
      } catch (popupError) {
        console.log("Popup blocked, trying location.href...")
        window.location.href = "/aed-finder-complete"
      }
    } catch (error) {
      console.error("Error in handleAEDFinder:", error)
    }
  }, [])

  const handleEmergencyTypeClick = (typeId: string, e?: React.MouseEvent) => {
    e?.preventDefault()
    console.log(`Activating emergency type: ${typeId}`)
    activateHeroMode(typeId)
  }

  const activateHeroMode = (type: string) => {
    console.log(`Activating HERO Mode for: ${type}`)
    setEmergencyType(type)
    setHeroMode(true)
    setHeroModeActive(true)
    setCurrentStep(0)
    setResponseTime(0)
    setCompressionCount(0)

    const stepTimer = setInterval(() => {
      setCurrentStep((prev) => {
        if (prev < heroSteps.length - 1) {
          return prev + 1
        } else {
          clearInterval(stepTimer)
          return prev
        }
      })
    }, 1500)
  }

  const startVisualMetronome = () => {
    setVisualMetronome(true)
    const interval = 60000 / compressionRate // Convert BPM to milliseconds

    const metronomeTimer = setInterval(() => {
      if (compressionCount < 30) {
        setCompressionCount((prev) => prev + 1)
      } else {
        // Reset for next cycle
        setCompressionCount(0)
      }
    }, interval)

    // Clear timer after 30 seconds
    setTimeout(() => {
      clearInterval(metronomeTimer)
      setVisualMetronome(false)
    }, 30000)
  }

  const handleExitHeroMode = () => {
    setHeroMode(false)
    setHeroModeActive(false)
    setEmergencyType(null)
    setCurrentStep(0)
    setResponseTime(0)
    setCompressionCount(0)
    setVisualMetronome(false)
  }

  const handleToggleTrainingMode = () => {
    setTrainingMode(trainingMode === "civilian" ? "professional" : "civilian")
  }

  const handleResetCompression = () => {
    setCompressionCount(0)
    setVisualMetronome(false)
  }

  if (heroMode) {
    const selectedType = emergencyTypes.find((t) => t.id === emergencyType)
    const IconComponent = selectedType?.icon

    return (
      <>
        <UniversalNavigation showBackButton={true} customBackPath="/landing" customBackLabel="Exit HERO Mode" />
        <TooltipProvider delayDuration={300}>
          <div className="min-h-screen bg-gradient-to-br from-slate-900 via-teal-900 to-emerald-900">
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
                      <div className="flex items-center space-x-2">
                        <h1 className="text-2xl font-bold text-white">HERO CP™ ACTIVE</h1>
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <button>
                              <Info className="w-4 h-4 text-gray-400 hover:text-white transition-colors" />
                            </button>
                          </TooltipTrigger>
                          <TooltipContent className="max-w-sm bg-slate-800 border-slate-600 text-white z-[60]">
                            <p>
                              <strong>HERO CP™ Active Mode:</strong> Patent-protected civilian emergency response system
                              providing visual-rhythm guidance, evidence-based protocols, and seamless integration with
                              professional responders. Features measurement-free CPR guidance and multi-modal feedback
                              systems.
                            </p>
                          </TooltipContent>
                        </Tooltip>
                      </div>
                      <p className="text-red-300">Civilian Emergency Portal • Protocol v{protocolVersion}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-3xl font-mono text-white">
                      {Math.floor(responseTime / 60)}:{(responseTime % 60).toString().padStart(2, "0")}
                    </div>
                    <div className="flex items-center space-x-2">
                      <p className="text-sm text-gray-300">Response Time</p>
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <button>
                            <Info className="w-3 h-3 text-gray-400 hover:text-white transition-colors" />
                          </button>
                        </TooltipTrigger>
                        <TooltipContent className="bg-slate-800 border-slate-600 text-white z-[60]">
                          <p>
                            Real-time tracking of emergency response duration. Critical for medical outcome correlation
                            and quality improvement analytics.
                          </p>
                        </TooltipContent>
                      </Tooltip>
                    </div>
                    <Badge variant="outline" className="border-green-500 text-green-400 mt-1">
                      <Database className="w-3 h-3 mr-1" />
                      LOGIQ™ Evidence-Based
                    </Badge>
                  </div>
                </div>
              </div>

              {/* Main Content */}
              <div className="relative z-10 p-6 space-y-6">
                {/* Emergency Type with Enhanced Protocols */}
                <Card className="bg-black/40 border-red-500/30 backdrop-blur-sm">
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-4">
                        {selectedType && (
                          <>
                            <div
                              className={`w-16 h-16 ${selectedType.color} rounded-full flex items-center justify-center`}
                            >
                              {IconComponent && <IconComponent className="w-8 h-8 text-white" />}
                            </div>
                            <div>
                              <div className="flex items-center space-x-2">
                                <h2 className="text-2xl font-bold text-white">{selectedType.label}</h2>
                                <Tooltip>
                                  <TooltipTrigger asChild>
                                    <button>
                                      <Info className="w-4 h-4 text-gray-400 hover:text-white transition-colors" />
                                    </button>
                                  </TooltipTrigger>
                                  <TooltipContent className="max-w-sm bg-slate-800 border-slate-600 text-white z-[60]">
                                    <p>
                                      <strong>Modular Emergency Protocol:</strong> Patent-protected emergency-specific
                                      guidance modules sharing core visual timing infrastructure while implementing
                                      protocol-specific logic. Each module validated against peer-reviewed medical
                                      research and updated via LOGIQ™ evidence engine.
                                    </p>
                                  </TooltipContent>
                                </Tooltip>
                              </div>
                              <p className="text-gray-300">{selectedType.description}</p>
                              <div className="flex flex-wrap gap-2 mt-2">
                                {selectedType.protocols.map((protocol, index) => (
                                  <Badge key={index} variant="outline" className="border-blue-500 text-blue-400">
                                    {protocol}
                                  </Badge>
                                ))}
                              </div>
                            </div>
                          </>
                        )}
                      </div>
                      <div className="text-center">
                        <div className="flex items-center space-x-2">
                          <Badge variant="outline" className="border-green-500 text-green-400 mb-2">
                            {trainingMode === "civilian" ? "Civilian Mode" : "Professional Mode"}
                          </Badge>
                          <Tooltip>
                            <TooltipTrigger asChild>
                              <button>
                                <Info className="w-3 h-3 text-gray-400 hover:text-white transition-colors" />
                              </button>
                            </TooltipTrigger>
                            <TooltipContent className="max-w-sm bg-slate-800 border-slate-600 text-white z-[60]">
                              <p>
                                <strong>Dual-Mode Training Architecture:</strong> Patent-protected differentiated
                                pathways optimizing for user categories. Civilian mode features simplified interfaces
                                and gamification; Professional mode includes certification pathways and compliance
                                tracking.
                              </p>
                            </TooltipContent>
                          </Tooltip>
                        </div>
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={handleToggleTrainingMode}
                          className="border-blue-500 text-blue-400 hover:bg-blue-500/20 bg-transparent"
                        >
                          Switch Mode
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Enhanced Progress Steps with Ecosystem Integration */}
                <Card className="bg-black/40 border-teal-500/30 backdrop-blur-sm">
                  <CardHeader>
                    <CardTitle className="text-white flex items-center space-x-2">
                      <Activity className="w-5 h-5" />
                      <span>HERO Ecosystem Response</span>
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <button>
                            <Info className="w-4 h-4 text-gray-400 hover:text-white transition-colors" />
                          </button>
                        </TooltipTrigger>
                        <TooltipContent className="max-w-sm bg-slate-800 border-slate-600 text-white z-[60]">
                          <p>
                            <strong>Ecosystem Integration:</strong> Real-time coordination between HERO CP™ (civilian)
                            and HERO OS™ (responder) systems. Demonstrates seamless handoffs, data sharing, and unified
                            emergency response across the entire SafeRoute AI patent portfolio.
                          </p>
                        </TooltipContent>
                      </Tooltip>
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

                {/* Enhanced CPR Guidance with Visual-Rhythm Synchronization */}
                {emergencyType === "cardiac" && (
                  <Card className="bg-black/40 border-red-500/30 backdrop-blur-sm">
                    <CardHeader>
                      <CardTitle className="text-white flex items-center space-x-2">
                        <Heart className="w-5 h-5 text-red-500" />
                        <span>Visual-Rhythm CPR Guidance</span>
                        <Badge variant="outline" className="border-blue-500 text-blue-400">
                          Patent Protected
                        </Badge>
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <button>
                              <Info className="w-4 h-4 text-gray-400 hover:text-white transition-colors" />
                            </button>
                          </TooltipTrigger>
                          <TooltipContent className="max-w-sm bg-slate-800 border-slate-600 text-white z-[60]">
                            <p>
                              <strong>Visual-Rhythm Synchronization:</strong> Core patent innovation enabling
                              measurement-free CPR guidance using visual metronome with non-linear expansion curves,
                              color-phase correlation, and peripheral vision activation. Achieves medical effectiveness
                              without hardware sensors.
                            </p>
                          </TooltipContent>
                        </Tooltip>
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-6">
                      {/* Visual Metronome */}
                      <div className="text-center relative">
                        <div
                          className={`w-32 h-32 mx-auto rounded-full border-4 border-red-500 flex items-center justify-center transition-all duration-300 ${
                            visualMetronome ? "animate-pulse scale-110" : ""
                          }`}
                          style={{
                            background: visualMetronome
                              ? `radial-gradient(circle, rgba(239, 68, 68, 0.3) 0%, rgba(239, 68, 68, 0.1) 70%)`
                              : "transparent",
                          }}
                        >
                          <div className="text-4xl font-bold text-red-500">{compressionCount}</div>
                        </div>
                        <div className="flex items-center justify-center space-x-2 mt-2">
                          <p className="text-white">Compressions: {compressionCount}/30</p>
                          <Tooltip>
                            <TooltipTrigger asChild>
                              <button>
                                <Info className="w-3 h-3 text-gray-400 hover:text-white transition-colors" />
                              </button>
                            </TooltipTrigger>
                            <TooltipContent className="bg-slate-800 border-slate-600 text-white z-[60]">
                              <p>
                                Real-time compression tracking using patent-protected visual-rhythm synchronization.
                                Maintains AHA/ERC guideline compliance without physical measurement devices.
                              </p>
                            </TooltipContent>
                          </Tooltip>
                        </div>
                        <p className="text-gray-400 text-sm">Rate: {compressionRate} BPM</p>
                      </div>

                      {/* Multi-Modal Guidance */}
                      <div className="grid grid-cols-3 gap-4">
                        <Card className="bg-slate-800/60 border-blue-500/30">
                          <CardContent className="p-4 text-center">
                            <div className="flex items-center justify-center space-x-1">
                              <Eye className="w-6 h-6 text-blue-400 mx-auto mb-2" />
                              <Tooltip>
                                <TooltipTrigger asChild>
                                  <button>
                                    <Info className="w-3 h-3 text-gray-400 hover:text-blue-400 transition-colors" />
                                  </button>
                                </TooltipTrigger>
                                <TooltipContent className="bg-slate-800 border-slate-600 text-white z-[60]">
                                  <p>
                                    Visual guidance using dynamic metronome, color-phase correlation, and peripheral
                                    vision activation for natural synchronization.
                                  </p>
                                </TooltipContent>
                              </Tooltip>
                            </div>
                            <p className="text-blue-400 text-sm">Visual</p>
                            <p className="text-xs text-gray-400">Rhythm Guide</p>
                          </CardContent>
                        </Card>
                        <Card className="bg-slate-800/60 border-green-500/30">
                          <CardContent className="p-4 text-center">
                            <div className="flex items-center justify-center space-x-1">
                              <Volume2 className="w-6 h-6 text-green-400 mx-auto mb-2" />
                              <Tooltip>
                                <TooltipTrigger asChild>
                                  <button>
                                    <Info className="w-3 h-3 text-gray-400 hover:text-green-400 transition-colors" />
                                  </button>
                                </TooltipTrigger>
                                <TooltipContent className="bg-slate-800 border-slate-600 text-white z-[60]">
                                  <p>
                                    Audio reinforcement with metronome clicks, voice counting, and encouraging phrases
                                    in 100+ languages.
                                  </p>
                                </TooltipContent>
                              </Tooltip>
                            </div>
                            <p className="text-green-400 text-sm">Audio</p>
                            <p className="text-xs text-gray-400">Voice Cues</p>
                          </CardContent>
                        </Card>
                        <Card className="bg-slate-800/60 border-purple-500/30">
                          <CardContent className="p-4 text-center">
                            <div className="flex items-center justify-center space-x-1">
                              <Vibrate className="w-6 h-6 text-purple-400 mx-auto mb-2" />
                              <Tooltip>
                                <TooltipTrigger asChild>
                                  <button>
                                    <Info className="w-3 h-3 text-gray-400 hover:text-purple-400 transition-colors" />
                                  </button>
                                </TooltipTrigger>
                                <TooltipContent className="bg-slate-800 border-slate-600 text-white z-[60]">
                                  <p>
                                    Haptic feedback providing tactile rhythm cues when available, enhancing multi-modal
                                    guidance effectiveness.
                                  </p>
                                </TooltipContent>
                              </Tooltip>
                            </div>
                            <p className="text-purple-400 text-sm">Haptic</p>
                            <p className="text-xs text-gray-400">Vibration</p>
                          </CardContent>
                        </Card>
                      </div>

                      <div className="flex justify-center space-x-4">
                        <Button
                          size="lg"
                          className="bg-red-500 hover:bg-red-600 transition-all duration-200 hover:scale-105 active:scale-95"
                          onClick={(e) => {
                            e.preventDefault()
                            startVisualMetronome()
                          }}
                          type="button"
                        >
                          <Play className="w-5 h-5 mr-2" />
                          Start Visual-Rhythm CPR
                        </Button>

                        <Button
                          size="lg"
                          className="bg-gradient-to-r from-yellow-500 to-orange-500 hover:from-yellow-600 hover:to-orange-600 transition-all duration-200 hover:scale-105 active:scale-95"
                          onClick={(e) => handleAEDFinder(e)}
                          type="button"
                        >
                          <Zap className="w-5 h-5 mr-2" />
                          Find AED
                        </Button>

                        <Button
                          size="lg"
                          variant="outline"
                          className="border-red-500 text-red-500 bg-transparent hover:bg-red-500/20 transition-all duration-200 hover:scale-105 active:scale-95"
                          onClick={(e) => {
                            e.preventDefault()
                            handleResetCompression()
                          }}
                          type="button"
                        >
                          <RotateCcw className="w-5 h-5 mr-2" />
                          Reset Count
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                )}

                {/* HERO Ecosystem Status */}
                <Card className="bg-black/40 border-blue-500/30 backdrop-blur-sm">
                  <CardHeader>
                    <CardTitle className="text-white flex items-center space-x-2">
                      <Globe className="w-5 h-5" />
                      <span>HERO Ecosystem Integration</span>
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <button>
                            <Info className="w-4 h-4 text-gray-400 hover:text-white transition-colors" />
                          </button>
                        </TooltipTrigger>
                        <TooltipContent className="max-w-sm bg-slate-800 border-slate-600 text-white z-[60]">
                          <p>
                            <strong>Patent Portfolio Integration:</strong> Real-time status of all SafeRoute AI
                            emergency response systems. Creates network effects and competitive moats through
                            ecosystem-wide coordination and data sharing.
                          </p>
                        </TooltipContent>
                      </Tooltip>
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                      {ecosystemStatus.map((system, index) => (
                        <div key={index} className="flex items-center space-x-3 p-3 bg-slate-800/60 rounded-lg">
                          <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center">
                            <system.icon className="w-4 h-4 text-white" />
                          </div>
                          <div className="flex-1">
                            <h4 className="text-white font-medium">{system.name}</h4>
                            <p className="text-xs text-gray-400">{system.description}</p>
                          </div>
                          <Badge variant="outline" className="border-green-500 text-green-400">
                            {system.status}
                          </Badge>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                {/* Resilient Communication Status */}
                <Card className="bg-black/40 border-blue-500/30 backdrop-blur-sm">
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        <div className="flex items-center space-x-2">
                          {isConnected ? (
                            <Wifi className="w-5 h-5 text-green-400" />
                          ) : (
                            <WifiOff className="w-5 h-5 text-red-400" />
                          )}
                          <span className="text-white">Multi-Layer Communications</span>
                          <Tooltip>
                            <TooltipTrigger asChild>
                              <button>
                                <Info className="w-4 h-4 text-gray-400 hover:text-white transition-colors" />
                              </button>
                            </TooltipTrigger>
                            <TooltipContent className="max-w-sm bg-slate-800 border-slate-600 text-white z-[60]">
                              <p>
                                <strong>Resilient Infrastructure:</strong> Patent-protected multi-layer communication
                                system with cellular, mesh networking, and satellite fallback. Ensures emergency
                                response continues during infrastructure failures.
                              </p>
                            </TooltipContent>
                          </Tooltip>
                        </div>
                      </div>
                      <div className="flex items-center space-x-4">
                        <div className="flex items-center space-x-2">
                          <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                          <span className="text-green-400 text-sm">Cellular</span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <div className="w-2 h-2 bg-blue-500 rounded-full" />
                          <span className="text-blue-400 text-sm">Mesh Ready</span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Satellite className="w-4 h-4 text-yellow-400" />
                          <span className="text-yellow-400 text-sm">Satellite</span>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Exit HERO Mode */}
                <div className="flex justify-center pt-6">
                  <Button
                    onClick={handleExitHeroMode}
                    variant="outline"
                    className="border-gray-500 text-gray-300 hover:bg-gray-500/20 bg-transparent"
                  >
                    Exit HERO CP™ Mode
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </TooltipProvider>
      </>
    )
  }

  return (
    <>
      <UniversalNavigation
        showBackButton={true}
        customBackPath="/landing"
        customBackLabel="Home"
        showNextPrevious={true}
      />
      <TooltipProvider delayDuration={300}>
        <div className="min-h-screen bg-gradient-to-br from-slate-900 via-teal-900 to-emerald-900">
          {/* Background Effects */}
          <div className="absolute inset-0 bg-[url('/api/placeholder/1920/1080')] bg-cover bg-center opacity-5" />
          <div className="absolute inset-0 bg-gradient-to-br from-teal-500/20 via-cyan-500/15 to-emerald-500/20" />

          {/* Header */}
          <div className="relative z-10 p-6 border-b border-teal-500/30 bg-slate-800/80 backdrop-blur-sm">
            <div className="max-w-7xl mx-auto flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-teal-500 rounded-full flex items-center justify-center">
                  <Shield className="w-6 h-6 text-white" />
                </div>
                <div>
                  <div className="flex items-center space-x-2">
                    <h1 className="text-2xl font-bold bg-gradient-to-r from-white via-blue-200 to-teal-200 bg-clip-text text-transparent">
                      SafeRoute AI™ • HERO CP™
                    </h1>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <button>
                          <Info className="w-4 h-4 text-gray-400 hover:text-white transition-colors" />
                        </button>
                      </TooltipTrigger>
                      <TooltipContent className="max-w-sm bg-slate-800 border-slate-600 text-white z-[60]">
                        <p>
                          <strong>HERO CP™ (Civilian Portal):</strong> Patent-protected modular emergency response
                          guidance system with visual-rhythm synchronization and multi-protocol support. Provides
                          measurement-free emergency guidance while integrating with professional responder systems.
                        </p>
                      </TooltipContent>
                    </Tooltip>
                  </div>
                  <p className="text-gray-300">Civilian Emergency Portal • Modular Response System</p>
                </div>
              </div>
              <div className="flex items-center space-x-4">
                <Badge variant="outline" className="border-green-500 text-green-400">
                  <div className="w-2 h-2 bg-green-500 rounded-full mr-2 animate-pulse" />
                  HERO OS™ Connected
                </Badge>
                <Badge variant="outline" className="border-blue-500 text-blue-400">
                  <Database className="w-3 h-3 mr-1" />
                  LOGIQ™ v{protocolVersion}
                </Badge>
                <Badge variant="outline" className="border-purple-500 text-purple-400">
                  <Satellite className="w-3 h-3 mr-1" />
                  Mesh Ready
                </Badge>
              </div>
            </div>
          </div>

          {/* Hero Mode Active Interface */}
          {heroModeActive && (
            <div className="fixed inset-0 bg-slate-900/95 backdrop-blur-sm z-50 flex items-center justify-center p-4">
              <div className="bg-slate-800/90 backdrop-blur-md rounded-2xl p-8 max-w-2xl w-full border border-slate-700/50 shadow-2xl">
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 bg-red-600 rounded-full flex items-center justify-center">
                      <Shield className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <h2 className="text-xl font-bold text-white">HERO CP™ Active</h2>
                      <p className="text-slate-300 text-sm">Emergency Response Mode</p>
                    </div>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <button className="ml-2">
                          <Info className="w-4 h-4 text-slate-400 hover:text-white transition-colors" />
                        </button>
                      </TooltipTrigger>
                      <TooltipContent className="max-w-sm bg-slate-800 border-slate-600 text-white z-[60]">
                        <p>
                          <strong>HERO CP™ Active Mode:</strong> Patent-protected civilian emergency response system
                          providing visual-rhythm guidance, evidence-based protocols, and seamless integration with
                          professional responders. Features measurement-free CPR guidance and multi-modal feedback
                          systems.
                        </p>
                      </TooltipContent>
                    </Tooltip>
                  </div>
                  <button
                    onClick={() => setHeroModeActive(false)}
                    className="text-slate-400 hover:text-white transition-colors"
                  >
                    <X className="w-6 h-6" />
                  </button>
                </div>

                {/* Emergency Duration */}
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center gap-2">
                    <Clock className="w-5 h-5 text-blue-400" />
                    <span className="text-white font-medium">Duration: {formatTime(emergencyDuration)}</span>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <button>
                          <Info className="w-3 h-3 text-slate-400 hover:text-white transition-colors" />
                        </button>
                      </TooltipTrigger>
                      <TooltipContent className="bg-slate-800 border-slate-600 text-white z-[60]">
                        <p>
                          Real-time tracking of emergency response duration. Critical for medical outcome correlation
                          and quality improvement analytics.
                        </p>
                      </TooltipContent>
                    </Tooltip>
                  </div>
                  <div className="text-slate-300 text-sm">
                    {emergencyType === "cardiac" ? "CPR in Progress" : "Emergency Active"}
                  </div>
                </div>

                {/* Progress Bar (Illustrative) */}
                {emergencyType === "cardiac" && (
                  <div className="mb-6">
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-white text-sm font-medium">CPR Progress</span>
                      <span className="text-slate-400 text-sm">60%</span>
                    </div>
                    <div className="w-full bg-slate-700 rounded-full h-2">
                      <div className="bg-red-500 h-2 rounded-full" style={{ width: "60%" }}></div>
                    </div>
                  </div>
                )}

                {/* Action Buttons */}
                <div className="flex justify-center gap-4">
                  <Button variant="outline" className="text-white border-slate-600 hover:bg-slate-700 bg-transparent">
                    Pause
                  </Button>
                  <Button className="bg-red-600 hover:bg-red-700 text-white" onClick={handleExitHeroMode}>
                    End Emergency
                  </Button>
                </div>
              </div>
            </div>
          )}

          {/* Main Interface */}
          <div className="container mx-auto px-4 py-8">
            {/* Section: Emergency Response */}
            <section id="emergency-response">
              <div className="text-center mb-8">
                <div className="flex items-center justify-center gap-2 mb-4">
                  <h1 className="text-4xl md:text-6xl font-bold text-white">
                    Emergency Response in <span className="text-teal-400">Seconds</span>
                  </h1>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <button>
                        <Info className="w-5 h-5 text-slate-400 hover:text-white transition-colors" />
                      </button>
                    </TooltipTrigger>
                    <TooltipContent className="max-w-sm bg-slate-800 border-slate-600 text-white z-[60]">
                      <p>
                        <strong>HERO CP™ Emergency Response:</strong> AI-powered emergency coordination connecting you
                        to help when every second counts. Features visual-rhythm guidance, multi-modal feedback, and
                        seamless integration with professional responders through HERO OS™.
                      </p>
                    </TooltipContent>
                  </Tooltip>
                </div>
                <p className="text-lg text-slate-400 max-w-3xl mx-auto">
                  AI-powered emergency coordination with visual-rhythm guidance, evidence-based protocols, and seamless
                  integration with professional responders through HERO OS™.
                </p>
              </div>

              <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
                <button
                  onClick={(e) => {
                    e.preventDefault()
                    e.stopPropagation()
                    console.log("🔴 HERO CP™ Button Clicked!")
                    activateHeroMode("medical")
                  }}
                  style={{ pointerEvents: "auto", zIndex: 10 }}
                  className="bg-red-600 hover:bg-red-700 text-white font-bold py-3 px-6 rounded-xl shadow-lg transition-all duration-200 hover:scale-105 active:scale-95 cursor-pointer"
                  type="button"
                >
                  <Phone className="w-5 h-5 mr-2 inline" />
                  Activate HERO CP™
                </button>

                <button
                  onClick={(e) => {
                    e.preventDefault()
                    e.stopPropagation()
                    console.log("🟡 AED Finder Button Clicked!")
                    setEmergencyType("aed")
                    setHeroMode(true)
                    setHeroModeActive(true)
                  }}
                  style={{ pointerEvents: "auto", zIndex: 10 }}
                  className="bg-gradient-to-r from-yellow-500 to-orange-500 hover:from-yellow-600 hover:to-orange-600 text-white font-bold py-3 px-6 rounded-xl shadow-lg transition-all duration-200 hover:scale-105 active:scale-95 cursor-pointer"
                  type="button"
                >
                  <Zap className="w-5 h-5 mr-2 inline" />
                  Find Nearest AED
                </button>

                <button
                  onClick={(e) => {
                    e.preventDefault()
                    e.stopPropagation()
                    console.log("🟢 Check-in Button Clicked!")
                    setEmergencyType("checkin")
                    setHeroMode(true)
                    setHeroModeActive(true)
                  }}
                  style={{ pointerEvents: "auto", zIndex: 10 }}
                  className="text-green-400 border-green-500 hover:bg-green-700/20 font-bold py-3 px-6 rounded-xl bg-transparent border-2 transition-all duration-200 hover:scale-105 active:scale-95 cursor-pointer"
                  type="button"
                >
                  <CheckCircle className="w-5 h-5 mr-2 inline" />
                  Check-in to Safety
                </button>
              </div>

              <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
                {emergencyTypes.map((type, index) => (
                  <button
                    key={index}
                    className="bg-slate-800/60 backdrop-blur-sm rounded-xl p-6 border border-slate-700/50 hover:border-teal-500/50 transition-all duration-300 group cursor-pointer text-left w-full hover:scale-105 active:scale-95"
                    onClick={(e) => handleEmergencyTypeClick(type.id, e)}
                    type="button"
                  >
                    <div className="flex items-start justify-between mb-4">
                      <div className={`w-12 h-12 rounded-full flex items-center justify-center ${type.bgColor}`}>
                        <type.icon className="w-6 h-6 text-white" />
                      </div>
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <button type="button" onClick={(e) => e.stopPropagation()}>
                            <Info className="w-4 h-4 text-slate-400 hover:text-white transition-colors" />
                          </button>
                        </TooltipTrigger>
                        <TooltipContent className="max-w-sm bg-slate-800 border-slate-600 text-white z-[60]">
                          <p>
                            <strong>{type.title}:</strong> {type.description} Features evidence-based protocols, visual
                            guidance, and real-time coordination with professional responders.
                          </p>
                        </TooltipContent>
                      </Tooltip>
                    </div>
                    <h3 className="text-xl font-semibold text-white mb-2">{type.label}</h3>
                    <p className="text-slate-400">{type.description}</p>
                  </button>
                ))}
              </div>

              {/* Section: Training Modes */}
              <section id="training-modes">
                <h2 className="text-3xl font-bold text-white mb-6">Training Modes</h2>
                <p className="text-lg text-slate-400 mb-8">
                  Enhance your emergency response skills with our tailored training programs.
                </p>

                {/* Training Mode Cards */}
                <div className="grid md:grid-cols-2 gap-6">
                  <div
                    className="bg-slate-800/60 backdrop-blur-sm rounded-xl p-6 border border-slate-700/50 hover:border-blue-500/50 transition-all duration-300 cursor-pointer"
                    onClick={() => setTrainingMode("civilian")}
                  >
                    <h3 className="text-xl font-semibold text-white mb-2">Civilian Training</h3>
                    <p className="text-slate-400">Learn basic emergency response techniques.</p>
                    {trainingMode === "civilian" && (
                      <Badge className="mt-2 bg-blue-500/20 text-blue-400 border-blue-500/30">Active</Badge>
                    )}
                  </div>
                  <div
                    className="bg-slate-800/60 backdrop-blur-sm rounded-xl p-6 border border-slate-700/50 hover:border-purple-500/50 transition-all duration-300 cursor-pointer"
                    onClick={() => setTrainingMode("professional")}
                  >
                    <h3 className="text-xl font-semibold text-white mb-2">Professional Training</h3>
                    <p className="text-slate-400">Advanced training for certified responders.</p>
                    {trainingMode === "professional" && (
                      <Badge className="mt-2 bg-purple-500/20 text-purple-400 border-purple-500/30">Active</Badge>
                    )}
                  </div>
                </div>
              </section>
            </section>
          </div>
          <FloatingEmergencyButtons />
        </div>
      </TooltipProvider>
    </>
  )
}
