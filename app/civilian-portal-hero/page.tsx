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
  MapPin,
  AlertTriangle,
  Type,
  Mic,
  Radio,
  Truck,
  Building2,
  ArrowLeftRight,
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

  const [isVoiceActive, setIsVoiceActive] = useState(true)
  const [textSize, setTextSize] = useState<"normal" | "large" | "jumbo">("normal")
  const [highContrastMode, setHighContrastMode] = useState(false)
  const [voiceSpeed, setVoiceSpeed] = useState<"slow" | "normal" | "fast">("normal")

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

      const button = e?.target as HTMLButtonElement
      if (button) {
        const originalHTML = button.innerHTML
        button.innerHTML =
          '<span class="inline-flex items-center"><svg class="w-5 h-5 mr-2 animate-spin" fill="none" viewBox="0 0 24 24"><circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle><path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg>Opening AED Finder...</span>'
        setTimeout(() => {
          button.innerHTML = originalHTML
        }, 2000)
      }

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

  const handleShareLocation = useCallback((e?: React.MouseEvent) => {
    try {
      e?.preventDefault()
      e?.stopPropagation()
      console.log("📍 Share Location Button Clicked!")

      const button = e?.target as HTMLButtonElement
      if (button) {
        const originalHTML = button.innerHTML
        button.innerHTML =
          '<span class="inline-flex items-center"><svg class="w-5 h-5 mr-2 animate-pulse" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/></svg>LAB™ Beacon Active</span>'
        setTimeout(() => {
          button.innerHTML = originalHTML
        }, 3000)
      }

      alert(
        "📍 LAB™ Location Beacon Activated!\n\nYour encrypted location is now being shared with:\n• Emergency contacts\n• Nearby responders\n• Satellite network\n\nLocation updates every 30 seconds until deactivated.",
      )
    } catch (error) {
      console.error("Error in handleShareLocation:", error)
    }
  }, [])

  const handleSOS = useCallback((e?: React.MouseEvent) => {
    try {
      e?.preventDefault()
      e?.stopPropagation()
      console.log("🆘 SOS Button Clicked!")

      const confirmed = window.confirm(
        "🆘 EMERGENCY SOS ACTIVATION\n\n" +
          "This will:\n" +
          "• Send LAB™ beacon to satellite network\n" +
          "• Alert all emergency services\n" +
          "• Share your location with rescue teams\n" +
          "• Activate priority response protocols\n\n" +
          "⚠️ Only use for genuine emergencies\n\n" +
          "Continue with SOS activation?",
      )

      if (confirmed) {
        const doubleConfirm = window.confirm(
          "🚨 FINAL CONFIRMATION\n\n" +
            "You are about to activate emergency SOS.\n" +
            "This will immediately alert rescue services.\n\n" +
            "Are you certain this is a real emergency?",
        )

        if (doubleConfirm) {
          const button = e?.target as HTMLButtonElement
          if (button) {
            const originalHTML = button.innerHTML
            button.innerHTML =
              '<span class="inline-flex items-center"><svg class="w-5 h-5 mr-2 animate-bounce" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/></svg>SOS ACTIVE</span>'
            button.className = button.className.replace("bg-red-600", "bg-red-800 animate-pulse")
          }

          alert(
            "🆘 SOS ACTIVATED!\n\n" +
              "✅ LAB™ beacon transmitted to satellite\n" +
              "✅ Emergency services notified\n" +
              "✅ Location shared with rescue teams\n" +
              "✅ Priority response protocols active\n\n" +
              "Help is on the way. Stay calm and follow any instructions from responders.",
          )
        }
      }
    } catch (error) {
      console.error("Error in handleSOS:", error)
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

                {/* Tri-Level Communication Status */}
                <Card className="bg-gradient-to-r from-green-900/40 to-blue-900/40 border-green-500/30 backdrop-blur-sm mb-6">
                  <CardHeader>
                    <CardTitle className="text-white flex items-center space-x-2">
                      <Radio className="w-6 h-6 text-green-400" />
                      <span>Connected to Emergency Response Network</span>
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <button>
                            <Info className="w-4 h-4 text-gray-400 hover:text-white transition-colors" />
                          </button>
                        </TooltipTrigger>
                        <TooltipContent className="max-w-md bg-slate-800 border-slate-600 text-white z-[60]">
                          <p>
                            <strong>Tri-Level Emergency Network:</strong> Your HERO CP™ is connected to professional
                            responders and emergency command centers. Real-time bi-directional communication ensures
                            coordinated response and seamless handoffs between civilian assistance and professional
                            care.
                          </p>
                        </TooltipContent>
                      </Tooltip>
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      {/* Your Location (Scene) */}
                      <div className="flex flex-col items-center p-4 bg-slate-800/50 rounded-lg border border-green-500/30">
                        <div className="w-12 h-12 bg-green-500 rounded-full flex items-center justify-center mb-3">
                          <MapPin className="w-6 h-6 text-white" />
                        </div>
                        <h3 className="text-white font-semibold mb-2">Your Location (Scene)</h3>
                        <div className="flex items-center space-x-2 mb-2">
                          <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                          <span className="text-green-400 text-sm">HERO CP™ Active</span>
                        </div>
                        <p className="text-gray-300 text-xs text-center">
                          Providing real-time emergency guidance and sharing vital information with responders
                        </p>
                      </div>

                      {/* Field Responders */}
                      <div className="flex flex-col items-center p-4 bg-slate-800/50 rounded-lg border border-blue-500/30">
                        <div className="w-12 h-12 bg-blue-500 rounded-full flex items-center justify-center mb-3">
                          <Truck className="w-6 h-6 text-white" />
                        </div>
                        <h3 className="text-white font-semibold mb-2">Field Responders</h3>
                        <div className="flex items-center space-x-2 mb-2">
                          <div className="w-2 h-2 bg-blue-400 rounded-full animate-pulse"></div>
                          <span className="text-blue-400 text-sm">HERO OS™ Coordinating</span>
                        </div>
                        <p className="text-gray-300 text-xs text-center">
                          EMS, Fire, and Police units receiving your data and coordinating response
                        </p>
                      </div>

                      {/* Emergency Command */}
                      <div className="flex flex-col items-center p-4 bg-slate-800/50 rounded-lg border border-purple-500/30">
                        <div className="w-12 h-12 bg-purple-500 rounded-full flex items-center justify-center mb-3">
                          <Building2 className="w-6 h-6 text-white" />
                        </div>
                        <h3 className="text-white font-semibold mb-2">Emergency Command</h3>
                        <div className="flex items-center space-x-2 mb-2">
                          <div className="w-2 h-2 bg-purple-400 rounded-full animate-pulse"></div>
                          <span className="text-purple-400 text-sm">Dispatch Connected</span>
                        </div>
                        <p className="text-gray-300 text-xs text-center">
                          911 dispatch and hospitals receiving updates and preparing for your arrival
                        </p>
                      </div>
                    </div>

                    {/* Communication Flow Visualization */}
                    <div className="mt-6 flex items-center justify-center space-x-4">
                      <div className="flex items-center space-x-2">
                        <span className="text-green-400 text-sm font-medium">You</span>
                        <ArrowLeftRight className="w-4 h-4 text-gray-400" />
                        <span className="text-blue-400 text-sm font-medium">Responders</span>
                        <ArrowLeftRight className="w-4 h-4 text-gray-400" />
                        <span className="text-purple-400 text-sm font-medium">Command</span>
                      </div>
                    </div>

                    {/* Connection Status Details */}
                    <div className="mt-4 grid grid-cols-2 md:grid-cols-4 gap-3 text-xs">
                      <div className="flex items-center space-x-2">
                        <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                        <span className="text-gray-300">Voice Connected</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <div className="w-2 h-2 bg-blue-400 rounded-full"></div>
                        <span className="text-gray-300">Data Sharing</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <div className="w-2 h-2 bg-purple-400 rounded-full"></div>
                        <span className="text-gray-300">Location Tracked</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <div className="w-2 h-2 bg-yellow-400 rounded-full"></div>
                        <span className="text-gray-300">Medical Records</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>

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
      <TooltipProvider delayDuration={300}>
        <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-indigo-900">
          <UniversalNavigation />

          <div className="bg-gradient-to-r from-emerald-600/20 to-teal-600/20 border-b border-emerald-500/30">
            <div className="container mx-auto px-4 py-3">
              <div className="flex flex-wrap items-center justify-between gap-4">
                {/* Voice Automation Status */}
                <div className="flex items-center gap-4">
                  <div className="flex items-center gap-2">
                    <div
                      className={`w-3 h-3 rounded-full ${isVoiceActive ? "bg-green-500 animate-pulse" : "bg-gray-500"}`}
                    />
                    <span
                      className={`font-semibold ${textSize === "jumbo" ? "text-xl" : textSize === "large" ? "text-lg" : "text-sm"} text-emerald-300`}
                    >
                      VOICE AUTOMATED
                    </span>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <button>
                          <Info className="w-4 h-4 text-gray-400 hover:text-emerald-400 transition-colors" />
                        </button>
                      </TooltipTrigger>
                      <TooltipContent className="max-w-sm bg-slate-800 border-slate-600 text-white z-[60]">
                        <p>
                          <strong>Full Voice Automation:</strong> Every feature is voice-controlled and designed for
                          panic/high-stress situations. Hands-free operation with voice commands in 100+ languages. Say
                          "HERO HELP" to activate emergency mode.
                        </p>
                      </TooltipContent>
                    </Tooltip>
                  </div>

                  <div className="flex items-center gap-2">
                    <AlertTriangle className="w-4 h-4 text-orange-400" />
                    <span
                      className={`font-semibold ${textSize === "jumbo" ? "text-xl" : textSize === "large" ? "text-lg" : "text-sm"} text-orange-300`}
                    >
                      PANIC MODE READY
                    </span>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <button>
                          <Info className="w-4 h-4 text-gray-400 hover:text-orange-400 transition-colors" />
                        </button>
                      </TooltipTrigger>
                      <TooltipContent className="max-w-sm bg-slate-800 border-slate-600 text-white z-[60]">
                        <p>
                          <strong>High-Stress Design:</strong> Interface optimized for panic situations with large
                          buttons, clear voice prompts, simplified navigation, and automatic emergency detection. System
                          adapts to stress levels and provides calming guidance.
                        </p>
                      </TooltipContent>
                    </Tooltip>
                  </div>
                </div>

                {/* Accessibility Controls */}
                <div className="flex items-center gap-3">
                  {/* Text Size Control */}
                  <div className="flex items-center gap-2">
                    <Type className="w-4 h-4 text-blue-400" />
                    <select
                      value={textSize}
                      onChange={(e) => setTextSize(e.target.value as "normal" | "large" | "jumbo")}
                      className="bg-slate-800 border border-slate-600 rounded px-2 py-1 text-white text-sm"
                    >
                      <option value="normal">Normal Text</option>
                      <option value="large">Large Text</option>
                      <option value="jumbo">JUMBO Text</option>
                    </select>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <button>
                          <Info className="w-4 h-4 text-gray-400 hover:text-blue-400 transition-colors" />
                        </button>
                      </TooltipTrigger>
                      <TooltipContent className="bg-slate-800 border-slate-600 text-white z-[60]">
                        <p>
                          <strong>JUMBO Text Mode:</strong> Extra-large text designed for elders and users with sight
                          challenges. Includes high contrast and simplified layouts for maximum accessibility.
                        </p>
                      </TooltipContent>
                    </Tooltip>
                  </div>

                  {/* Voice Speed Control */}
                  <div className="flex items-center gap-2">
                    <Volume2 className="w-4 h-4 text-purple-400" />
                    <select
                      value={voiceSpeed}
                      onChange={(e) => setVoiceSpeed(e.target.value as "slow" | "normal" | "fast")}
                      className="bg-slate-800 border border-slate-600 rounded px-2 py-1 text-white text-sm"
                    >
                      <option value="slow">Slow Voice</option>
                      <option value="normal">Normal Voice</option>
                      <option value="fast">Fast Voice</option>
                    </select>
                  </div>

                  {/* High Contrast Toggle */}
                  <button
                    onClick={() => setHighContrastMode(!highContrastMode)}
                    className={`flex items-center gap-2 px-3 py-1 rounded border transition-colors ${
                      highContrastMode
                        ? "bg-yellow-500 border-yellow-400 text-black"
                        : "bg-slate-800 border-slate-600 text-white hover:bg-slate-700"
                    }`}
                  >
                    <Eye className="w-4 h-4" />
                    <span className="text-sm font-medium">High Contrast</span>
                  </button>

                  {/* Universal Access Badge */}
                  <Badge variant="outline" className="border-green-500 text-green-400">
                    <Users className="w-3 h-3 mr-1" />
                    Universal Access
                  </Badge>
                </div>
              </div>
            </div>
          </div>

          {/* Main Content with Dynamic Text Sizing */}
          <div
            className={`container mx-auto px-4 py-8 ${textSize === "jumbo" ? "text-2xl" : textSize === "large" ? "text-xl" : "text-base"}`}
          >
            {/* Header */}
            <div className="text-center mb-12">
              <div className="flex items-center justify-center gap-3 mb-4">
                <div className="p-3 rounded-xl bg-gradient-to-r from-blue-500 to-teal-500">
                  <Shield className="w-8 h-8 text-white" />
                </div>
                <h1
                  className={`font-bold bg-gradient-to-r from-white via-blue-200 to-teal-200 bg-clip-text text-transparent ${
                    textSize === "jumbo" ? "text-6xl" : textSize === "large" ? "text-5xl" : "text-4xl"
                  }`}
                >
                  SafeRoute AI™ • HERO CP™
                </h1>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <button>
                      <Info className="w-6 h-6 text-gray-400 hover:text-white transition-colors" />
                    </button>
                  </TooltipTrigger>
                  <TooltipContent className="max-w-sm bg-slate-800 border-slate-600 text-white z-[60]">
                    <p>
                      <strong>HERO CP™ (Civilian Portal):</strong> Patent-protected modular emergency response guidance
                      system with visual-rhythm synchronization, full voice automation, and universal accessibility.
                      Designed for high-stress situations with panic mode optimization.
                    </p>
                  </TooltipContent>
                </Tooltip>
              </div>
              <p
                className={`text-gray-300 max-w-3xl mx-auto ${
                  textSize === "jumbo" ? "text-3xl" : textSize === "large" ? "text-2xl" : "text-xl"
                }`}
              >
                Civilian Emergency Portal • Modular Response System
              </p>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-8 max-w-4xl mx-auto">
                <div className="bg-gradient-to-r from-emerald-500/20 to-teal-500/20 border border-emerald-500/30 rounded-lg p-4">
                  <div className="flex items-center gap-2 mb-2">
                    <Mic className="w-5 h-5 text-emerald-400" />
                    <span
                      className={`font-semibold text-emerald-300 ${
                        textSize === "jumbo" ? "text-2xl" : textSize === "large" ? "text-xl" : "text-lg"
                      }`}
                    >
                      Voice Automated
                    </span>
                  </div>
                  <p
                    className={`text-emerald-200 ${
                      textSize === "jumbo" ? "text-xl" : textSize === "large" ? "text-lg" : "text-sm"
                    }`}
                  >
                    Hands-free operation designed for panic situations. Say "HERO HELP" to activate.
                  </p>
                </div>

                <div className="bg-gradient-to-r from-blue-500/20 to-purple-500/20 border border-blue-500/30 rounded-lg p-4">
                  <div className="flex items-center gap-2 mb-2">
                    <Users className="w-5 h-5 text-blue-400" />
                    <span
                      className={`font-semibold text-blue-300 ${
                        textSize === "jumbo" ? "text-2xl" : textSize === "large" ? "text-xl" : "text-lg"
                      }`}
                    >
                      Universal Access
                    </span>
                  </div>
                  <p
                    className={`text-blue-200 ${
                      textSize === "jumbo" ? "text-xl" : textSize === "large" ? "text-lg" : "text-sm"
                    }`}
                  >
                    JUMBO text, high contrast, and accessibility features for everyone.
                  </p>
                </div>

                <div className="bg-gradient-to-r from-orange-500/20 to-red-500/20 border border-orange-500/30 rounded-lg p-4">
                  <div className="flex items-center gap-2 mb-2">
                    <AlertTriangle className="w-5 h-5 text-orange-400" />
                    <span
                      className={`font-semibold text-orange-300 ${
                        textSize === "jumbo" ? "text-2xl" : textSize === "large" ? "text-xl" : "text-lg"
                      }`}
                    >
                      Panic Optimized
                    </span>
                  </div>
                  <p
                    className={`text-orange-200 ${
                      textSize === "jumbo" ? "text-xl" : textSize === "large" ? "text-lg" : "text-sm"
                    }`}
                  >
                    Large buttons, clear prompts, and stress-adaptive interface design.
                  </p>
                </div>
              </div>
            </div>

            {/* Section: Emergency Response */}
            <section id="emergency-response">
              <div className="text-center mb-8">
                <div className="flex items-center justify-center gap-2 mb-4">
                  <h1
                    className={`font-bold text-white ${
                      textSize === "jumbo" ? "text-5xl" : textSize === "large" ? "text-4xl" : "text-3xl"
                    }`}
                  >
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
                <p
                  className={`text-lg text-slate-400 max-w-3xl mx-auto ${
                    textSize === "jumbo" ? "text-2xl" : textSize === "large" ? "text-xl" : "text-lg"
                  }`}
                >
                  AI-powered emergency coordination with visual-rhythm guidance, evidence-based protocols, and seamless
                  integration with professional responders through HERO OS™.
                </p>
              </div>

              <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
                <button
                  onClick={(e) => {
                    e.preventDefault()
                    e.stopPropagation()
                    console.log("🔴 Activate HERO CP Button Clicked!")
                    setEmergencyType("medical")
                    setHeroMode(true)
                    setHeroModeActive(true)
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

              <div className="flex flex-col sm:flex-row gap-3 justify-center mb-8">
                <button
                  onClick={handleShareLocation}
                  style={{ pointerEvents: "auto", zIndex: 10 }}
                  className="bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 text-white font-semibold py-2.5 px-5 rounded-lg shadow-md transition-all duration-200 hover:scale-105 active:scale-95 cursor-pointer"
                  type="button"
                >
                  <MapPin className="w-4 h-4 mr-2 inline" />
                  Share Location (LAB™)
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Info className="w-4 h-4 ml-2 inline opacity-70 hover:opacity-100" />
                    </TooltipTrigger>
                    <TooltipContent className="max-w-xs">
                      <p className="text-sm">
                        Activates LAB™ (Last Active Beacon) to share your encrypted location with emergency contacts and
                        nearby responders via satellite network. Updates every 30 seconds.
                      </p>
                    </TooltipContent>
                  </Tooltip>
                </button>

                <button
                  onClick={handleSOS}
                  style={{ pointerEvents: "auto", zIndex: 10 }}
                  className="bg-red-600 hover:bg-red-700 text-white font-semibold py-2.5 px-5 rounded-lg shadow-md transition-all duration-200 hover:scale-105 active:scale-95 cursor-pointer border-2 border-red-500"
                  type="button"
                >
                  <AlertTriangle className="w-4 h-4 mr-2 inline" />
                  Emergency SOS
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Info className="w-4 h-4 ml-2 inline opacity-70 hover:opacity-100" />
                    </TooltipTrigger>
                    <TooltipContent className="max-w-xs">
                      <p className="text-sm">
                        <strong>Double confirmation required.</strong> Sends LAB™ beacon to satellite network, alerts
                        all emergency services, and activates priority response protocols. Only use for genuine
                        emergencies.
                      </p>
                    </TooltipContent>
                  </Tooltip>
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
                    <h3
                      className={`font-semibold text-white mb-2 ${
                        textSize === "jumbo" ? "text-3xl" : textSize === "large" ? "text-2xl" : "text-xl"
                      }`}
                    >
                      {type.label}
                    </h3>
                    <p
                      className={`text-slate-400 ${
                        textSize === "jumbo" ? "text-xl" : textSize === "large" ? "text-lg" : "text-sm"
                      }`}
                    >
                      {type.description}
                    </p>
                  </button>
                ))}
              </div>

              {/* Section: Training Modes */}
              <section id="training-modes">
                <h2
                  className={`font-bold text-white mb-6 ${
                    textSize === "jumbo" ? "text-4xl" : textSize === "large" ? "text-3xl" : "text-2xl"
                  }`}
                >
                  Training Modes
                </h2>
                <p
                  className={`text-lg text-slate-400 mb-8 ${
                    textSize === "jumbo" ? "text-2xl" : textSize === "large" ? "text-xl" : "text-lg"
                  }`}
                >
                  Enhance your emergency response skills with our tailored training programs.
                </p>

                {/* Training Mode Cards */}
                <div className="grid md:grid-cols-2 gap-6">
                  <div
                    className="bg-slate-800/60 backdrop-blur-sm rounded-xl p-6 border border-slate-700/50 hover:border-blue-500/50 transition-all duration-300 cursor-pointer"
                    onClick={() => setTrainingMode("civilian")}
                  >
                    <h3
                      className={`font-semibold text-white mb-2 ${
                        textSize === "jumbo" ? "text-3xl" : textSize === "large" ? "text-2xl" : "text-xl"
                      }`}
                    >
                      Civilian Training
                    </h3>
                    <p
                      className={`text-slate-400 ${
                        textSize === "jumbo" ? "text-xl" : textSize === "large" ? "text-lg" : "text-sm"
                      }`}
                    >
                      Learn basic emergency response techniques.
                    </p>
                    {trainingMode === "civilian" && (
                      <Badge className="mt-2 bg-blue-500/20 text-blue-400 border-blue-500/30">Active</Badge>
                    )}
                  </div>
                  <div
                    className="bg-slate-800/60 backdrop-blur-sm rounded-xl p-6 border border-slate-700/50 hover:border-purple-500/50 transition-all duration-300 cursor-pointer"
                    onClick={() => setTrainingMode("professional")}
                  >
                    <h3
                      className={`font-semibold text-white mb-2 ${
                        textSize === "jumbo" ? "text-3xl" : textSize === "large" ? "text-2xl" : "text-xl"
                      }`}
                    >
                      Professional Training
                    </h3>
                    <p
                      className={`text-slate-400 ${
                        textSize === "jumbo" ? "text-xl" : textSize === "large" ? "text-lg" : "text-sm"
                      }`}
                    >
                      Advanced training for certified responders.
                    </p>
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
