"use client"

import { useState, useEffect, useRef } from "react"
import { Button } from "@/components/ui/button"
import { Phone, Zap, Play } from "lucide-react"

export default function AEDHelpScreen() {
  const [isListening, setIsListening] = useState(false)
  const [showDemo, setShowDemo] = useState(false)
  const recognitionRef = useRef<any>(null)
  const wakeLockRef = useRef<any>(null)

  // Initialize wake lock and voice recognition
  useEffect(() => {
    const initializeScreen = async () => {
      // Request wake lock
      try {
        if ("wakeLock" in navigator) {
          wakeLockRef.current = await (navigator as any).wakeLock.request("screen")
        }
      } catch (error) {
        console.log("Wake lock not supported or failed:", error)
      }

      // Set max brightness
      try {
        if ("screen" in navigator && "brightness" in (navigator as any).screen) {
          await (navigator as any).screen.brightness.set(1.0)
        }
      } catch (error) {
        console.log("Brightness control not supported:", error)
      }

      // Initialize voice recognition
      initializeVoiceRecognition()
    }

    initializeScreen()

    // Auto-speak key instructions
    const speakInstructions = () => {
      if ("speechSynthesis" in window) {
        const utterance = new SpeechSynthesisUtterance("Call for help or keep doing CPR until help arrives.")
        utterance.volume = 0.8
        utterance.rate = 0.9
        speechSynthesis.speak(utterance)
      }
    }

    // Speak after 1 second delay
    const timer = setTimeout(speakInstructions, 1000)

    return () => {
      clearTimeout(timer)
      if (wakeLockRef.current) {
        wakeLockRef.current.release()
      }
      if (recognitionRef.current) {
        recognitionRef.current.stop()
      }
    }
  }, [])

  const initializeVoiceRecognition = () => {
    try {
      if ("webkitSpeechRecognition" in window || "SpeechRecognition" in window) {
        const SpeechRecognition = (window as any).webkitSpeechRecognition || (window as any).SpeechRecognition
        recognitionRef.current = new SpeechRecognition()

        recognitionRef.current.continuous = true
        recognitionRef.current.interimResults = false
        recognitionRef.current.lang = "en-US"

        recognitionRef.current.onstart = () => {
          setIsListening(true)
        }

        recognitionRef.current.onresult = (event: any) => {
          const transcript = event.results[event.results.length - 1][0].transcript.toLowerCase().trim()

          if (transcript.includes("aed found") || transcript.includes("aed")) {
            handleAEDFound()
          } else if (transcript.includes("call 911") || transcript.includes("call nine one one")) {
            handleCall911()
          }
        }

        recognitionRef.current.onerror = (event: any) => {
          console.log("Speech recognition error:", event.error)
          // Restart recognition after error
          setTimeout(() => {
            if (recognitionRef.current) {
              recognitionRef.current.start()
            }
          }, 1000)
        }

        recognitionRef.current.onend = () => {
          setIsListening(false)
          // Restart recognition to keep listening
          setTimeout(() => {
            if (recognitionRef.current) {
              recognitionRef.current.start()
            }
          }, 500)
        }

        recognitionRef.current.start()
      }
    } catch (error) {
      console.log("Voice recognition not supported:", error)
    }
  }

  const handleCall911 = () => {
    // Try to make actual phone call on mobile
    if (typeof window !== "undefined") {
      window.location.href = "tel:911"
    }
  }

  const handleAEDFound = () => {
    // Navigate to recovery screen
    if (typeof window !== "undefined") {
      window.location.href = "/recovery-screen"
    }
  }

  const toggleDemo = () => {
    setShowDemo(!showDemo)
  }

  return (
    <div className="min-h-screen bg-black text-white flex flex-col font-sans">
      {/* Header */}
      <div className="text-center pt-8 pb-6 px-4">
        <h1 className="text-3xl md:text-4xl font-bold mb-2">GET AN AED OR CALL FOR HELP</h1>
      </div>

      {/* Instructions */}
      <div className="px-6 mb-8">
        <div className="space-y-4 text-lg font-bold">
          <div className="flex items-start">
            <span className="text-red-500 mr-3">•</span>
            <span>Send someone to get an AED now.</span>
          </div>
          <div className="flex items-start">
            <span className="text-red-500 mr-3">•</span>
            <span>If alone, call 911 (or use the button below).</span>
          </div>
          <div className="flex items-start">
            <span className="text-red-500 mr-3">•</span>
            <span>Do not stop CPR unless you're too tired or help arrives.</span>
          </div>
        </div>
      </div>

      {/* Center Focus Area */}
      <div className="flex-1 flex flex-col items-center justify-center px-6 mb-8">
        {/* Glowing AED Icon */}
        <div className="relative mb-8">
          <div className="w-32 h-32 bg-yellow-400 rounded-lg flex items-center justify-center relative animate-pulse">
            <Zap className="w-16 h-16 text-black" />
            {/* Glow effect */}
            <div className="absolute inset-0 bg-yellow-400 rounded-lg opacity-50 animate-ping"></div>
          </div>
        </div>

        {/* Loop Reminder */}
        <div className="text-center mb-8">
          <p className="text-xl font-bold text-yellow-400">"Keep doing CPR until help arrives."</p>
        </div>

        {/* Voice Prompts */}
        <div className="text-center text-sm text-gray-300 mb-6">
          <p>Say "AED Found" to move to the next step.</p>
          <p>Say "Call 911" to trigger emergency call.</p>
          {isListening && <p className="text-green-400 mt-2">🎤 Voice commands active</p>}
        </div>
      </div>

      {/* Bottom Buttons */}
      <div className="px-6 pb-8 space-y-4">
        {/* Call 911 Button */}
        <Button
          onClick={handleCall911}
          className="w-full h-16 bg-red-600 hover:bg-red-700 text-white text-xl font-bold rounded-lg flex items-center justify-center gap-3"
        >
          <Phone className="w-6 h-6" />🆘 Call 911 Now
        </Button>

        {/* AED Found Button */}
        <Button
          onClick={handleAEDFound}
          className="w-full h-14 bg-green-600 hover:bg-green-700 text-white text-lg font-bold rounded-lg"
        >
          📦 AED Found? Tap to continue
        </Button>

        {/* Watch Demo Button */}
        <Button
          onClick={toggleDemo}
          variant="outline"
          className="w-full h-12 bg-transparent border-white text-white hover:bg-white hover:text-black text-base rounded-lg flex items-center justify-center gap-2"
        >
          <Play className="w-4 h-4" />🎥 Watch AED Setup Demo
        </Button>
      </div>

      {/* Demo Modal */}
      {showDemo && (
        <div className="fixed inset-0 bg-black bg-opacity-90 flex items-center justify-center z-50 p-4">
          <div className="bg-transparent border border-white rounded-lg p-6 max-w-md w-full">
            <div className="text-center mb-4">
              <h3 className="text-xl font-bold mb-2">AED Setup Demo</h3>
              <p className="text-gray-300 text-sm mb-4">15-second silent demonstration</p>
            </div>

            {/* Demo Animation */}
            <div className="bg-gray-800 rounded-lg p-8 mb-4 text-center">
              <div className="space-y-4">
                <div className="animate-pulse">
                  <Zap className="w-12 h-12 text-yellow-400 mx-auto mb-2" />
                  <p className="text-sm">1. Turn on AED</p>
                </div>
                <div className="animate-pulse delay-1000">
                  <div className="w-16 h-8 bg-gray-600 rounded mx-auto mb-2"></div>
                  <p className="text-sm">2. Attach pads to chest</p>
                </div>
                <div className="animate-pulse delay-2000">
                  <div className="w-12 h-6 bg-red-500 rounded mx-auto mb-2"></div>
                  <p className="text-sm">3. Follow AED voice prompts</p>
                </div>
              </div>
            </div>

            <Button onClick={toggleDemo} className="w-full bg-white text-black hover:bg-gray-200">
              Close Demo
            </Button>
          </div>
        </div>
      )}
    </div>
  )
}
