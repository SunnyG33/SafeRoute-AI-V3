"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Zap, AlertTriangle, CheckCircle, Phone, ArrowRight, ArrowLeft, Play, Pause } from "lucide-react"

interface AEDGuidanceProps {
  onBack?: () => void
  onComplete?: () => void
  emergencyMode?: boolean
}

type AEDStep =
  | "safety-check"
  | "power-on"
  | "pad-placement"
  | "analysis"
  | "shock-delivery"
  | "cpr-resume"
  | "continue-cycle"

export default function AEDGuidance({ onBack, onComplete, emergencyMode = true }: AEDGuidanceProps) {
  const [currentStep, setCurrentStep] = useState<AEDStep>("safety-check")
  const [isAudioEnabled, setIsAudioEnabled] = useState(true)
  const [elapsedTime, setElapsedTime] = useState(0)
  const [shockCount, setShockCount] = useState(0)

  const speak = (text: string) => {
    if ("speechSynthesis" in window && isAudioEnabled) {
      const utterance = new SpeechSynthesisUtterance(text)
      utterance.rate = 1.1
      utterance.pitch = 1
      utterance.volume = 0.9
      speechSynthesis.speak(utterance)
    }
  }

  const steps: Record<
    AEDStep,
    {
      title: string
      description: string
      instructions: string[]
      warning?: string
      nextStep: AEDStep | null
      audioPrompt: string
    }
  > = {
    "safety-check": {
      title: "1. SCENE SAFETY CHECK",
      description: "Ensure the area is safe before using AED",
      instructions: [
        "Check that the person is unresponsive and not breathing",
        "Make sure the area is dry - move person if needed",
        "Remove any metal jewelry from chest area",
        "Ensure no one is touching the person",
      ],
      warning: "Never use AED in water or on wet surfaces",
      nextStep: "power-on",
      audioPrompt: "Scene is safe. Person is unresponsive. Ready to power on AED.",
    },
    "power-on": {
      title: "2. POWER ON AED",
      description: "Turn on the AED device and listen for prompts",
      instructions: [
        "Press the power button or lift the lid",
        "AED will perform self-test automatically",
        "Listen carefully to voice prompts",
        "Follow all AED instructions exactly",
      ],
      nextStep: "pad-placement",
      audioPrompt: "AED is powered on. Listen to the device prompts and follow instructions.",
    },
    "pad-placement": {
      title: "3. ATTACH AED PADS",
      description: "Place electrode pads on bare chest as shown",
      instructions: [
        "Expose the person's chest completely",
        "Dry the chest if wet or sweaty",
        "Place first pad on upper right chest below collarbone",
        "Place second pad on lower left side below armpit",
        "Press pads firmly to ensure good contact",
        "Make sure pads don't touch each other",
      ],
      warning: "Remove any medication patches before placing pads",
      nextStep: "analysis",
      audioPrompt: "Pads are attached. AED will now analyze heart rhythm.",
    },
    analysis: {
      title: "4. AED ANALYSIS",
      description: "AED is analyzing heart rhythm - DO NOT TOUCH PATIENT",
      instructions: [
        "AED is analyzing the heart rhythm",
        "Do not touch the person during analysis",
        "Keep everyone away from the patient",
        "Wait for AED to complete analysis",
      ],
      warning: "CRITICAL: Do not touch patient during analysis",
      nextStep: "shock-delivery",
      audioPrompt: "Analysis complete. AED will advise if shock is needed.",
    },
    "shock-delivery": {
      title: "5. SHOCK DELIVERY",
      description: "If shock advised, ensure everyone is clear",
      instructions: [
        "If AED says 'Shock Advised', prepare for shock",
        "Loudly say 'EVERYONE CLEAR' and look around",
        "Make sure no one is touching the patient",
        "Press the flashing shock button when prompted",
        "If no shock advised, go directly to CPR",
      ],
      warning: "DANGER: Ensure no one touches patient during shock",
      nextStep: "cpr-resume",
      audioPrompt: "Shock delivered. Begin CPR immediately.",
    },
    "cpr-resume": {
      title: "6. RESUME CPR",
      description: "Immediately begin CPR after shock or if no shock advised",
      instructions: [
        "Place hands on center of chest between nipples",
        "Push hard and fast at least 2 inches deep",
        "Give 30 chest compressions at 100-120 BPM",
        "Give 2 rescue breaths",
        "Continue CPR until AED prompts to stop",
      ],
      nextStep: "continue-cycle",
      audioPrompt: "Continue CPR. AED will reanalyze in 2 minutes.",
    },
    "continue-cycle": {
      title: "7. CONTINUE AED CYCLE",
      description: "AED will reanalyze every 2 minutes",
      instructions: [
        "Continue CPR until AED says 'Stop CPR'",
        "AED will reanalyze heart rhythm every 2 minutes",
        "Follow AED prompts for additional shocks if needed",
        "Do not remove pads or turn off AED",
        "Continue until emergency services arrive",
      ],
      nextStep: null,
      audioPrompt: "Continue following AED prompts and performing CPR until help arrives.",
    },
  }

  const handleNextStep = () => {
    const current = steps[currentStep]
    speak(current.audioPrompt)

    if (current.nextStep) {
      setCurrentStep(current.nextStep)
      if (current.nextStep === "shock-delivery") {
        setShockCount((prev) => prev + 1)
      }
    } else if (onComplete) {
      onComplete()
    }
  }

  const handlePreviousStep = () => {
    const stepOrder: AEDStep[] = [
      "safety-check",
      "power-on",
      "pad-placement",
      "analysis",
      "shock-delivery",
      "cpr-resume",
      "continue-cycle",
    ]
    const currentIndex = stepOrder.indexOf(currentStep)
    if (currentIndex > 0) {
      setCurrentStep(stepOrder[currentIndex - 1])
    }
  }

  const currentStepData = steps[currentStep]

  return (
    <div className="min-h-screen bg-red-50 p-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <Zap className="w-8 h-8 text-red-600" />
            <div>
              <h1 className="text-2xl font-bold text-red-800">AED Guidance</h1>
              <p className="text-sm text-gray-600">Step-by-step AED usage instructions</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Button
              onClick={() => setIsAudioEnabled(!isAudioEnabled)}
              variant="outline"
              size="sm"
              className={`${isAudioEnabled ? "bg-blue-600 text-white" : "bg-white"}`}
            >
              {isAudioEnabled ? <Play className="w-4 h-4" /> : <Pause className="w-4 h-4" />}
            </Button>
            {onBack && (
              <Button onClick={onBack} variant="outline" className="bg-white">
                ← Back
              </Button>
            )}
          </div>
        </div>

        {/* Emergency Status */}
        {emergencyMode && (
          <Card className="mb-6 border-red-500 bg-red-100">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <AlertTriangle className="w-6 h-6 text-red-600" />
                  <div>
                    <h3 className="font-bold text-red-800">EMERGENCY AED GUIDANCE ACTIVE</h3>
                    <p className="text-red-700">Follow each step carefully - lives depend on it</p>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-lg font-bold text-red-800">Shocks: {shockCount}</div>
                  <div className="text-sm text-red-600">
                    Time: {Math.floor(elapsedTime / 60)}:{(elapsedTime % 60).toString().padStart(2, "0")}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Progress Indicator */}
        <div className="mb-6">
          <div className="flex items-center justify-between text-sm text-gray-600 mb-2">
            <span>Progress</span>
            <span>
              Step {Object.keys(steps).indexOf(currentStep) + 1} of {Object.keys(steps).length}
            </span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div
              className="bg-red-600 h-2 rounded-full transition-all duration-300"
              style={{ width: `${((Object.keys(steps).indexOf(currentStep) + 1) / Object.keys(steps).length) * 100}%` }}
            ></div>
          </div>
        </div>

        {/* Main Step Card */}
        <Card className="mb-6 border-red-200">
          <CardHeader className="bg-red-600 text-white">
            <CardTitle className="text-2xl flex items-center gap-3">
              <Zap className="w-8 h-8" />
              {currentStepData.title}
            </CardTitle>
            <p className="text-red-100 text-lg">{currentStepData.description}</p>
          </CardHeader>
          <CardContent className="p-6">
            {/* Warning */}
            {currentStepData.warning && (
              <div className="mb-6 p-4 bg-yellow-100 border border-yellow-400 rounded-lg">
                <div className="flex items-center gap-2">
                  <AlertTriangle className="w-5 h-5 text-yellow-600" />
                  <span className="font-bold text-yellow-800">WARNING:</span>
                </div>
                <p className="text-yellow-800 mt-1">{currentStepData.warning}</p>
              </div>
            )}

            {/* Instructions */}
            <div className="space-y-3 mb-6">
              {currentStepData.instructions.map((instruction, index) => (
                <div key={index} className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
                  <p className="text-gray-800">{instruction}</p>
                </div>
              ))}
            </div>

            {/* Special Step Content */}
            {currentStep === "analysis" && (
              <div className="mb-6 p-4 bg-blue-100 border border-blue-400 rounded-lg">
                <div className="flex items-center gap-2 mb-2">
                  <div className="w-4 h-4 bg-blue-600 rounded-full animate-pulse"></div>
                  <span className="font-bold text-blue-800">AED ANALYZING...</span>
                </div>
                <p className="text-blue-700">The AED is checking the heart rhythm. This takes 5-15 seconds.</p>
              </div>
            )}

            {currentStep === "shock-delivery" && (
              <div className="mb-6 p-4 bg-red-100 border border-red-400 rounded-lg">
                <div className="flex items-center gap-2 mb-2">
                  <Zap className="w-5 h-5 text-red-600" />
                  <span className="font-bold text-red-800">SHOCK READY</span>
                </div>
                <p className="text-red-700">
                  If AED advises shock, press the flashing button. If no shock advised, begin CPR immediately.
                </p>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Navigation Buttons */}
        <div className="flex gap-4 mb-6">
          <Button
            onClick={handlePreviousStep}
            variant="outline"
            className="bg-white flex-1"
            disabled={currentStep === "safety-check"}
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Previous Step
          </Button>

          <Button onClick={handleNextStep} className="bg-red-600 hover:bg-red-700 text-white flex-1">
            {currentStepData.nextStep ? (
              <>
                Next Step
                <ArrowRight className="w-4 h-4 ml-2" />
              </>
            ) : (
              <>
                Complete AED Guidance
                <CheckCircle className="w-4 h-4 ml-2" />
              </>
            )}
          </Button>
        </div>

        {/* Emergency Contacts */}
        <Card className="border-red-200 bg-red-50">
          <CardHeader>
            <CardTitle className="text-red-800 flex items-center gap-2">
              <Phone className="w-5 h-5" />
              Emergency Contacts
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Button
                onClick={() => (window.location.href = "tel:911")}
                className="bg-red-600 hover:bg-red-700 text-white h-12"
              >
                <Phone className="w-5 h-5 mr-2" />
                Call 911
              </Button>
              <Button
                onClick={() => (window.location.href = "tel:1-800-668-9111")}
                variant="outline"
                className="bg-white h-12"
              >
                <Phone className="w-5 h-5 mr-2" />
                Poison Control
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Legal Disclaimer */}
        <div className="mt-6 p-4 bg-gray-100 rounded-lg">
          <p className="text-xs text-gray-600 text-center">
            ⚠️ This guidance is for educational purposes. Always follow your AED device's specific instructions. Call 911
            immediately in all cardiac emergencies. Training from certified instructors is recommended.
          </p>
        </div>
      </div>
    </div>
  )
}
