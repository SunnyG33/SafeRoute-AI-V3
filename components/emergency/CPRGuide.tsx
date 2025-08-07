"use client"

import type React from "react"
import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ArrowLeft, Heart, Mic, MicOff, Volume2, ChevronLeft, ChevronRight, Activity, Zap } from "lucide-react"

type CPRStep = "setup" | "positioning" | "compressions" | "breathing" | "cycles"

interface CPRGuideProps {
  onBack: () => void
}

const CPRGuide: React.FC<CPRGuideProps> = ({ onBack }) => {
  const [currentStep, setCurrentStep] = useState<CPRStep>("setup")
  const [isActive, setIsActive] = useState(false)
  const [compressionCount, setCompressionCount] = useState(0)
  const [cycleCount, setCycleCount] = useState(0)
  const [currentPhase, setCurrentPhase] = useState<"compressions" | "breaths">("compressions")
  const [timer, setTimer] = useState(0)
  const [isListening, setIsListening] = useState(false)
  const [audioEnabled, setAudioEnabled] = useState(true)

  // Placeholder images - in production these would be actual CPR demonstration images
  const cprSetup = "/placeholder.svg?height=300&width=400&text=Check+Responsiveness"
  const cprPositioning = "/placeholder.svg?height=300&width=400&text=Hand+Positioning"
  const cprCompressions = "/placeholder.svg?height=300&width=400&text=Chest+Compressions"
  const cprAirway = "/placeholder.svg?height=300&width=400&text=Open+Airway"
  const cprRescueBreath = "/placeholder.svg?height=300&width=400&text=Rescue+Breathing"
  const cprRescueBreathSimple = "/placeholder.svg?height=300&width=400&text=Mouth+to+Mouth"

  useEffect(() => {
    let interval: NodeJS.Timeout
    if (isActive) {
      interval = setInterval(() => {
        setTimer((prev) => prev + 1)
      }, 1000)
    }
    return () => clearInterval(interval)
  }, [isActive])

  const startCPR = () => {
    setIsActive(true)
    setCurrentStep("compressions")
    speak("Starting CPR. Place hands on center of chest. Push hard and fast.")
  }

  const pauseCPR = () => {
    setIsActive(false)
    speak("CPR paused. Resume when ready.")
  }

  const resetCPR = () => {
    setIsActive(false)
    setCompressionCount(0)
    setCycleCount(0)
    setCurrentPhase("compressions")
    setTimer(0)
    setCurrentStep("setup")
    speak("CPR reset. Ready to start again.")
  }

  const handleCompression = () => {
    if (!isActive) return

    const newCount = compressionCount + 1
    setCompressionCount(newCount)

    if (newCount === 30) {
      setCurrentPhase("breaths")
      speak("30 compressions complete. Give 2 rescue breaths.")
      setTimeout(() => {
        setCurrentPhase("compressions")
        setCompressionCount(0)
        setCycleCount((prev) => prev + 1)
        speak("Resume compressions. Push hard and fast.")
      }, 10000) // 10 seconds for breaths
    } else if (newCount % 10 === 0) {
      speak(`${newCount} compressions`)
    }
  }

  const speak = (text: string) => {
    if ("speechSynthesis" in window && audioEnabled) {
      const utterance = new SpeechSynthesisUtterance(text)
      utterance.rate = 1.2
      utterance.pitch = 1
      utterance.volume = 0.9
      speechSynthesis.speak(utterance)
    }
  }

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins}:${secs.toString().padStart(2, "0")}`
  }

  const renderStepAnimation = (step: CPRStep) => {
    switch (step) {
      case "setup":
        return (
          <div className="relative w-full max-w-2xl mx-auto bg-white rounded-xl shadow-2xl border-4 border-red-500 overflow-hidden">
            {/* Header Banner */}
            <div className="bg-red-600 text-white py-3 px-6 text-center">
              <div className="flex items-center justify-center gap-2">
                <Heart className="w-8 h-8" />
                <span className="text-2xl font-black">STEP 1: CHECK RESPONSIVENESS</span>
                <Heart className="w-8 h-8" />
              </div>
            </div>

            {/* Main Visual */}
            <div className="relative h-80 bg-white overflow-hidden">
              {/* Navigation arrows */}
              <button
                onClick={previousStep}
                className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-red-600 text-white p-3 rounded-full shadow-2xl hover:bg-red-700 transition-colors z-20"
                disabled={currentStep === "setup"}
              >
                <ChevronLeft className="w-6 h-6" />
              </button>

              <button
                onClick={nextStep}
                className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-red-600 text-white p-3 rounded-full shadow-2xl hover:bg-red-700 transition-colors z-20"
              >
                <ChevronRight className="w-6 h-6" />
              </button>

              <img
                src={cprSetup || "/placeholder.svg"}
                alt="Person checking responsiveness by tapping shoulders"
                className="w-full h-full object-contain"
              />

              {/* Instruction overlays */}
              <div className="absolute top-8 left-8 bg-red-600 text-white px-4 py-2 rounded-lg font-bold shadow-lg">
                👋 TAP SHOULDERS
              </div>

              <div className="absolute top-8 right-8 bg-blue-600 text-white px-4 py-2 rounded-lg font-bold shadow-lg">
                📢 SHOUT "ARE YOU OK?"
              </div>

              <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 bg-yellow-500 text-black px-6 py-3 rounded-xl font-black shadow-2xl border-4 border-yellow-600">
                📱 CALL 911 IMMEDIATELY
              </div>
            </div>

            {/* Action Guide */}
            <div className="bg-red-50 p-4 border-t-4 border-red-500">
              <div className="grid grid-cols-3 gap-4 text-center">
                <div className="bg-white rounded-lg p-3 border-2 border-red-300">
                  <div className="text-3xl">👋</div>
                  <div className="text-sm font-bold text-red-600">TAP FIRMLY</div>
                </div>
                <div className="bg-white rounded-lg p-3 border-2 border-red-300">
                  <div className="text-3xl">📢</div>
                  <div className="text-sm font-bold text-red-600">SHOUT LOUD</div>
                </div>
                <div className="bg-white rounded-lg p-3 border-2 border-red-300">
                  <div className="text-3xl">📱</div>
                  <div className="text-sm font-bold text-red-600">CALL 911</div>
                </div>
              </div>
            </div>
          </div>
        )

      case "positioning":
        return (
          <div className="relative w-full max-w-2xl mx-auto bg-white rounded-xl shadow-2xl border-4 border-blue-500 overflow-hidden">
            {/* Header Banner */}
            <div className="bg-blue-600 text-white py-3 px-6 text-center">
              <div className="flex items-center justify-center gap-2">
                <Activity className="w-8 h-8" />
                <span className="text-2xl font-black">STEP 2: HAND POSITIONING</span>
                <Activity className="w-8 h-8" />
              </div>
            </div>

            {/* Main Visual */}
            <div className="relative h-80 bg-white overflow-hidden">
              {/* Navigation arrows */}
              <button
                onClick={previousStep}
                className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-blue-600 text-white p-3 rounded-full shadow-2xl hover:bg-blue-700 transition-colors z-20"
              >
                <ChevronLeft className="w-6 h-6" />
              </button>

              <button
                onClick={nextStep}
                className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-blue-600 text-white p-3 rounded-full shadow-2xl hover:bg-blue-700 transition-colors z-20"
              >
                <ChevronRight className="w-6 h-6" />
              </button>

              <img
                src={cprPositioning || "/placeholder.svg"}
                alt="Proper hand positioning for CPR on chest"
                className="w-full h-full object-contain"
              />

              {/* Positioning guides */}
              <div className="absolute top-8 left-8 bg-blue-600 text-white px-4 py-2 rounded-lg font-bold shadow-lg">
                🎯 CENTER OF CHEST
              </div>

              <div className="absolute top-8 right-8 bg-green-600 text-white px-4 py-2 rounded-lg font-bold shadow-lg">
                🤝 INTERLACE FINGERS
              </div>

              <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 bg-yellow-500 text-black px-6 py-3 rounded-xl font-black shadow-2xl border-4 border-yellow-600">
                💪 ARMS STRAIGHT
              </div>
            </div>

            {/* Positioning Guide */}
            <div className="bg-blue-50 p-4 border-t-4 border-blue-500">
              <div className="grid grid-cols-4 gap-2 text-center">
                <div className="bg-white rounded-lg p-2 border-2 border-blue-300">
                  <div className="text-2xl">🎯</div>
                  <div className="text-xs font-bold text-blue-600">CENTER</div>
                </div>
                <div className="bg-white rounded-lg p-2 border-2 border-blue-300">
                  <div className="text-2xl">👐</div>
                  <div className="text-xs font-bold text-blue-600">HEEL OF HAND</div>
                </div>
                <div className="bg-white rounded-lg p-2 border-2 border-blue-300">
                  <div className="text-2xl">🤝</div>
                  <div className="text-xs font-bold text-blue-600">INTERLACE</div>
                </div>
                <div className="bg-white rounded-lg p-2 border-2 border-blue-300">
                  <div className="text-2xl">💪</div>
                  <div className="text-xs font-bold text-blue-600">STRAIGHT</div>
                </div>
              </div>
            </div>
          </div>
        )

      case "compressions":
        return (
          <div className="relative w-full max-w-2xl mx-auto bg-white rounded-xl shadow-2xl border-4 border-green-500 overflow-hidden">
            {/* Header Banner */}
            <div className="bg-green-600 text-white py-3 px-6 text-center relative">
              <div className="flex items-center justify-center gap-2">
                <Heart className="w-8 h-8" />
                <span className="text-2xl font-black">STEP 3: COMPRESSIONS</span>
                <Heart className="w-8 h-8" />
              </div>

              {/* Compression Counter */}
              {isActive && (
                <div className="absolute -bottom-12 left-1/2 transform -translate-x-1/2 bg-green-700 text-white rounded-2xl shadow-2xl border-8 border-green-800 px-6 py-3 z-20">
                  <div className="text-3xl font-black">{compressionCount}/30</div>
                </div>
              )}
            </div>

            {/* Main Visual */}
            <div className="relative h-80 bg-white overflow-hidden flex pt-16">
              {/* Navigation arrows */}
              <button
                onClick={previousStep}
                className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-green-600 text-white p-3 rounded-full shadow-2xl hover:bg-green-700 transition-colors z-20"
              >
                <ChevronLeft className="w-6 h-6" />
              </button>

              <button
                onClick={nextStep}
                className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-green-600 text-white p-3 rounded-full shadow-2xl hover:bg-green-700 transition-colors z-20"
              >
                <ChevronRight className="w-6 h-6" />
              </button>

              {/* Main compression image */}
              <div className="w-3/4 relative">
                <img
                  src={cprCompressions || "/placeholder.svg"}
                  alt="Person performing chest compressions"
                  className="w-full h-full object-contain"
                />
              </div>

              {/* Metronome/BPM indicator */}
              <div className="w-1/4 flex flex-col items-center justify-center bg-gray-100">
                <div
                  className={`w-16 h-16 rounded-full border-4 flex items-center justify-center mb-4 ${
                    isActive
                      ? "bg-green-500 border-green-600 animate-[pulse_0.5s_ease-in-out_infinite]"
                      : "bg-gray-400 border-gray-500"
                  }`}
                >
                  <div className="text-white font-bold text-xs">
                    120
                    <br />
                    BPM
                  </div>
                </div>
              </div>

              {/* Critical overlays */}
              <div className="absolute top-8 left-16 bg-red-600 text-white px-4 py-2 rounded-lg font-bold shadow-lg animate-pulse">
                💥 PUSH HARD
              </div>

              <div className="absolute bottom-8 left-4 bg-yellow-500 text-black px-4 py-2 rounded-lg font-bold shadow-lg">
                📏 2 INCHES DEEP
              </div>

              <div className="absolute bottom-8 right-16 bg-blue-600 text-white px-4 py-2 rounded-lg font-bold shadow-lg">
                ↩️ FULL RECOIL
              </div>
            </div>

            {/* Progress Bar */}
            <div className="bg-red-50 p-4 border-t-4 border-red-500">
              <div className="w-full bg-gray-300 rounded-full h-4 shadow-inner">
                <div
                  className="bg-red-500 h-4 rounded-full transition-all duration-300 shadow-lg"
                  style={{ width: `${(compressionCount / 30) * 100}%` }}
                ></div>
              </div>
              <div className="text-center mt-2 text-red-600 font-bold">
                {isActive ? `${compressionCount} / 30 Compressions` : "Ready to Start"}
              </div>
            </div>
          </div>
        )

      case "breathing":
        return (
          <div className="relative w-full max-w-2xl mx-auto bg-white rounded-xl shadow-2xl border-4 border-blue-500 overflow-hidden">
            {/* Header Banner */}
            <div className="bg-blue-600 text-white py-3 px-6 text-center">
              <div className="flex items-center justify-center gap-2">
                <Activity className="w-8 h-8" />
                <span className="text-2xl font-black">STEP 4: RESCUE BREATHS</span>
                <Activity className="w-8 h-8" />
              </div>
            </div>

            {/* Dual Image Display for Breathing Steps */}
            <div className="relative h-80 bg-white overflow-hidden flex">
              {/* Navigation arrows for breathing step */}
              <button
                onClick={previousStep}
                className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-blue-600 text-white p-3 rounded-full shadow-2xl hover:bg-blue-700 transition-colors z-20"
              >
                <ChevronLeft className="w-6 h-6" />
              </button>

              <button
                onClick={nextStep}
                className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-blue-600 text-white p-3 rounded-full shadow-2xl hover:bg-blue-700 transition-colors z-20"
              >
                <ChevronRight className="w-6 h-6" />
              </button>

              {/* Airway Management */}
              <div className="w-1/2 relative">
                <img
                  src={cprAirway || "/placeholder.svg"}
                  alt="Head tilt chin lift for airway opening"
                  className="w-full h-full object-contain"
                />
                <div className="absolute top-4 left-2 bg-blue-600 text-white px-2 py-1 rounded font-bold text-xs">
                  🔄 TILT & LIFT
                </div>
              </div>

              {/* Rescue Breathing */}
              <div className="w-1/2 relative">
                <img
                  src={cprRescueBreath || "/placeholder.svg"}
                  alt="Person giving rescue breath during CPR"
                  className="w-full h-full object-contain"
                />
                <div className="absolute top-4 right-2 bg-red-600 text-white px-2 py-1 rounded font-bold text-xs">
                  💨 2 BREATHS
                </div>
              </div>

              {/* Central divider with instructions */}
              <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-yellow-500 text-black px-4 py-2 rounded-lg font-bold shadow-lg border-2 border-yellow-600">
                ⏱️ 1 SEC EACH
              </div>

              {/* Step indicators */}
              <div className="absolute bottom-4 left-4 bg-white border-2 border-blue-500 rounded-lg p-2 shadow-lg">
                <div className="text-blue-600 font-bold text-sm">1️⃣ OPEN AIRWAY</div>
              </div>

              <div className="absolute bottom-4 right-4 bg-white border-2 border-blue-500 rounded-lg p-2 shadow-lg">
                <div className="text-blue-600 font-bold text-sm">2️⃣ GIVE BREATHS</div>
              </div>
            </div>

            {/* Action Guide */}
            <div className="bg-blue-50 p-4 border-t-4 border-blue-500">
              <div className="grid grid-cols-4 gap-2 text-center">
                <div className="bg-white rounded-lg p-2 border-2 border-blue-300">
                  <div className="text-2xl">🔄</div>
                  <div className="text-xs font-bold text-blue-600">TILT HEAD</div>
                </div>
                <div className="bg-white rounded-lg p-2 border-2 border-blue-300">
                  <div className="text-2xl">☝️</div>
                  <div className="text-xs font-bold text-blue-600">LIFT CHIN</div>
                </div>
                <div className="bg-white rounded-lg p-2 border-2 border-blue-300">
                  <div className="text-2xl">🤏</div>
                  <div className="text-xs font-bold text-blue-600">PINCH NOSE</div>
                </div>
                <div className="bg-white rounded-lg p-2 border-2 border-blue-300">
                  <div className="text-2xl">💨</div>
                  <div className="text-xs font-bold text-blue-600">2 BREATHS</div>
                </div>
              </div>
            </div>
          </div>
        )

      case "cycles":
        return (
          <div className="relative w-full max-w-2xl mx-auto bg-white rounded-xl shadow-2xl border-4 border-green-500 overflow-hidden">
            {/* Header Banner */}
            <div className="bg-green-600 text-white py-3 px-6 text-center relative">
              <div className="flex items-center justify-center gap-2">
                <Zap className="w-8 h-8" />
                <span className="text-2xl font-black">STEP 5: REPEAT CYCLES</span>
                <Zap className="w-8 h-8" />
              </div>

              {/* Cycle Counter */}
              {isActive && (
                <div className="absolute -bottom-12 left-1/2 transform -translate-x-1/2 bg-green-700 text-white rounded-2xl shadow-2xl border-8 border-green-800 px-6 py-3 z-20">
                  <div className="text-3xl font-black">CYCLE {cycleCount + 1}</div>
                </div>
              )}
            </div>

            {/* Main Visual - Real Human Demonstration */}
            <div className="relative h-80 bg-white overflow-hidden flex pt-16">
              {/* Navigation arrows */}
              <button
                onClick={previousStep}
                className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-green-600 text-white p-3 rounded-full shadow-2xl hover:bg-green-700 transition-colors z-20"
              >
                <ChevronLeft className="w-6 h-6" />
              </button>

              <button
                onClick={nextStep}
                className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-green-600 text-white p-3 rounded-full shadow-2xl hover:bg-green-700 transition-colors z-20"
              >
                <ChevronRight className="w-6 h-6" />
              </button>

              {/* Compression Demonstration */}
              <div className="w-1/2 relative border-r-2 border-green-500">
                <img
                  src={cprCompressions || "/placeholder.svg"}
                  alt="Person performing chest compressions"
                  className="w-full h-full object-contain"
                />
                <div className="absolute top-4 left-2 bg-red-600 text-white px-3 py-2 rounded-lg font-bold text-sm shadow-lg">
                  COMPRESSIONS
                </div>
                <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 bg-red-600 text-white px-4 py-2 rounded-xl font-black text-lg shadow-lg">
                  30 PUSHES
                </div>
              </div>

              {/* Breathing Demonstration */}
              <div className="w-1/2 relative">
                <img
                  src={cprRescueBreathSimple || "/placeholder.svg"}
                  alt="Simple rescue breathing diagram - less graphic"
                  className="w-full h-full object-contain"
                />
                <div className="absolute top-4 right-2 bg-blue-600 text-white px-3 py-2 rounded-lg font-bold text-sm shadow-lg">
                  BREATHS
                </div>
                <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 bg-blue-600 text-white px-4 py-2 rounded-xl font-black text-lg shadow-lg">
                  2 BREATHS
                </div>
              </div>

              {/* Flow arrows */}
              <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-4xl text-green-600 animate-pulse z-10 bg-white rounded-full p-2 shadow-lg">
                ↔️
              </div>

              {/* Critical warning */}
              <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 bg-red-600 text-white px-6 py-3 rounded-2xl font-black shadow-2xl border-4 border-red-700 animate-pulse text-center">
                ⚠️ DON'T STOP UNTIL EMS ARRIVES ⚠️
              </div>
            </div>

            {/* Cycle Guide */}
            <div className="bg-green-50 p-4 border-t-4 border-green-500">
              <div className="text-center space-y-2">
                <div className="text-2xl font-black text-green-600">30 COMPRESSIONS ➡️ 2 BREATHS ➡️ REPEAT</div>
                <div className="text-sm text-green-700 font-bold">Continue until emergency medical services arrive</div>
              </div>
            </div>
          </div>
        )

      default:
        return null
    }
  }

  const getStepInstructions = (step: CPRStep) => {
    switch (step) {
      case "setup":
        return {
          title: "1. Check Responsiveness",
          instruction:
            "• Tap the person's shoulders firmly\n• Shout 'Are you okay?'\n• Check for normal breathing\n• Call 911 or have someone else call",
          audio:
            "Tap the person's shoulders firmly and shout 'Are you okay?'. Check for normal breathing. Call 911 immediately.",
        }
      case "positioning":
        return {
          title: "2. Position Hands",
          instruction:
            "• Place heel of one hand on center of chest\n• Between the nipples on breastbone\n• Place other hand on top, interlace fingers\n• Keep arms straight, shoulders over hands",
          audio:
            "Place the heel of one hand on the center of the chest between the nipples. Place your other hand on top and interlace your fingers. Keep your arms straight.",
        }
      case "compressions":
        return {
          title: "3. Chest Compressions",
          instruction:
            "• Push hard and fast at least 2 inches deep\n• Allow complete chest recoil\n• Minimize interruptions\n• Count out loud: 1, 2, 3...",
          audio:
            "Push hard and fast at least 2 inches deep. Allow the chest to come back up completely between compressions.",
        }
      case "breathing":
        return {
          title: "4. Rescue Breaths",
          instruction:
            "• Tilt head back, lift chin\n• Pinch nose closed\n• Make seal over mouth\n• Give 2 breaths, 1 second each",
          audio:
            "Tilt the head back and lift the chin. Pinch the nose closed and give 2 rescue breaths, one second each.",
        }
      case "cycles":
        return {
          title: "5. Continue Cycles",
          instruction:
            "• Continue 30 compressions, 2 breaths\n• Don't stop until help arrives\n• Switch with someone every 2 minutes if possible",
          audio:
            "Continue cycles of 30 compressions followed by 2 rescue breaths. Don't stop until emergency help arrives.",
        }
      default:
        return { title: "", instruction: "", audio: "" }
    }
  }

  const currentInstructions = getStepInstructions(currentStep)

  const previousStep = () => {
    const steps: CPRStep[] = ["setup", "positioning", "compressions", "breathing", "cycles"]
    const currentIndex = steps.indexOf(currentStep)
    if (currentIndex > 0) {
      setCurrentStep(steps[currentIndex - 1])
    }
  }

  const nextStep = () => {
    const steps: CPRStep[] = ["setup", "positioning", "compressions", "breathing", "cycles"]
    const currentIndex = steps.indexOf(currentStep)
    if (currentIndex < steps.length - 1) {
      setCurrentStep(steps[currentIndex + 1])
    }
  }

  return (
    <div className="min-h-screen bg-emergency-50 p-4 flex flex-col">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <Button variant="ghost" onClick={onBack} className="text-emergency-700 hover:bg-emergency-100" size="lg">
          <ArrowLeft className="w-6 h-6 mr-2" />
          Back
        </Button>

        <div className="flex gap-2">
          <Button
            variant={isListening ? "default" : "outline"}
            onClick={() => setIsListening(!isListening)}
            size="lg"
            className="bg-emergency-600 hover:bg-emergency-700"
          >
            {isListening ? <Mic className="w-5 h-5" /> : <MicOff className="w-5 h-5" />}
          </Button>

          <Button
            variant={audioEnabled ? "default" : "outline"}
            onClick={() => setAudioEnabled(!audioEnabled)}
            size="lg"
            className="bg-emergency-600 hover:bg-emergency-700"
          >
            <Volume2 className="w-5 h-5" />
          </Button>
        </div>
      </div>

      {/* Status Display */}
      {isActive && (
        <Card className="mb-6 p-6 bg-emergency-600 text-white border-none">
          <div className="text-center">
            <div className="flex items-center justify-center gap-4 mb-4">
              <Heart className="w-8 h-8 animate-pulse text-emergency-200" />
              <div className="text-4xl font-bold">{compressionCount}/30</div>
              <Badge variant="secondary" className="text-lg px-4 py-2">
                Cycle {cycleCount + 1}
              </Badge>
            </div>
            <div className="text-2xl font-semibold">
              {currentPhase === "compressions" ? "PUSH HARD & FAST" : "RESCUE BREATHS"}
            </div>
          </div>
        </Card>
      )}

      {/* Main Instructions */}
      <Card className="flex-1 p-8 mb-6">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-emergency-800 mb-6">{currentInstructions.title}</h2>
          <div className="mb-6">{renderStepAnimation(currentStep)}</div>
        </div>

        <div className="space-y-6">
          <div className="bg-emergency-50 p-6 rounded-lg">
            <h3 className="text-xl font-semibold text-emergency-800 mb-3">Instructions:</h3>
            <pre className="text-lg text-emergency-700 whitespace-pre-line font-sans">
              {currentInstructions.instruction}
            </pre>
          </div>

          {/* Voice Commands Help */}
          <div className="bg-muted p-4 rounded-lg">
            <h4 className="font-semibold mb-2">Voice Commands:</h4>
            <div className="text-sm text-muted-foreground grid grid-cols-2 gap-2">
              <div>"Start CPR" - Begin CPR</div>
              <div>"Stop" - Pause CPR</div>
              <div>"Next step" - Next instruction</div>
              <div>"Repeat" - Repeat instruction</div>
            </div>
          </div>
        </div>
      </Card>

      {/* Action Buttons */}
      <div className="grid grid-cols-1 gap-4">
        {!isActive ? (
          <Button
            onClick={startCPR}
            size="lg"
            className="h-16 text-xl bg-emergency-600 hover:bg-emergency-700 text-white"
          >
            <Heart className="w-6 h-6 mr-2" />
            START CPR
          </Button>
        ) : (
          <Button onClick={pauseCPR} variant="destructive" size="lg" className="h-16 text-xl">
            PAUSE CPR
          </Button>
        )}

        <div className="grid grid-cols-2 gap-4">
          <Button
            onClick={previousStep}
            variant="outline"
            size="lg"
            className="h-12 bg-transparent"
            disabled={currentStep === "setup"}
          >
            Previous
          </Button>
          <Button
            onClick={nextStep}
            variant="outline"
            size="lg"
            className="h-12 bg-transparent"
            disabled={currentStep === "cycles"}
          >
            Next Step
          </Button>
        </div>

        <Button onClick={resetCPR} variant="outline" className="font-bold bg-transparent">
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Emergency Type
        </Button>
      </div>

      {/* Status Display */}
      <div className="grid grid-cols-3 gap-2 text-center">
        <div className="bg-red-50 border border-red-200 rounded p-2">
          <div className="text-lg font-bold text-red-600">{compressionCount}</div>
          <div className="text-xs text-red-700">Compressions</div>
        </div>
        <div className="bg-blue-50 border border-blue-200 rounded p-2">
          <div className="text-lg font-bold text-blue-600">{cycleCount}</div>
          <div className="text-xs text-blue-700">Cycles</div>
        </div>
        <div className="bg-green-50 border border-green-200 rounded p-2">
          <div className="text-lg font-bold text-green-600">{formatTime(timer)}</div>
          <div className="text-xs text-green-700">Time</div>
        </div>
      </div>

      {/* Current Phase */}
      <Card
        className={`border-2 ${currentPhase === "compressions" ? "border-red-500 bg-red-50" : "border-blue-500 bg-blue-50"}`}
      >
        <CardContent className="p-4 text-center">
          <Badge className={currentPhase === "compressions" ? "bg-red-600" : "bg-blue-600"}>
            {currentPhase === "compressions" ? "COMPRESSIONS" : "RESCUE BREATHS"}
          </Badge>
          <div className="mt-2 text-sm">
            {currentPhase === "compressions" ? (
              <>
                <p className="font-medium">Push hard and fast on center of chest</p>
                <p className="text-xs text-slate-600">100-120 compressions per minute</p>
              </>
            ) : (
              <>
                <p className="font-medium">Give 2 rescue breaths</p>
                <p className="text-xs text-slate-600">Tilt head back, lift chin, seal mouth</p>
              </>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Voice Guidance */}
      <div className="bg-slate-50 border border-slate-200 rounded p-3">
        <div className="flex items-center gap-2 mb-2">
          <Volume2 className="w-4 h-4 text-slate-600" />
          <span className="text-sm font-medium text-slate-700">Voice Guidance Active</span>
        </div>
        <div className="text-xs text-slate-600">
          Listen for instructions and compression counts. Continue until paramedics arrive.
        </div>
      </div>
    </div>
  )
}

export default CPRGuide
