"use client"

import { useEffect, useMemo, useRef, useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { LegalBanner } from "@/components/common/legal-banner"
import { EmergencyButton } from "@/components/common/emergency-button"
import { VoiceGuidance } from "@/components/common/voice-guidance"
import { CalmingOverlay } from "@/components/common/calming-overlay"
import { offlineFetch } from "@/lib/offline-queue"
import { Phone, Heart, Volume2, VolumeX } from 'lucide-react'

const DISPATCHER_PROMPTS = [
  {
    text: "911, what is your emergency?",
    guidance: "State clearly: 'Medical emergency' or 'Person collapsed'"
  },
  {
    text: "What is your exact location?",
    guidance: "Give your address or nearest landmark. Be specific."
  },
  {
    text: "Is the person conscious and breathing normally?",
    guidance: "Answer 'Yes' or 'No'. If unsure, say 'I don't know'"
  },
  {
    text: "Are you trained in CPR?",
    guidance: "Answer honestly. We can guide you if needed."
  },
  {
    text: "Help is on the way. Stay on the line and follow my instructions.",
    guidance: "Keep the line open. Do exactly as instructed."
  }
]

export default function Sim911Page({ params }: { params: { id: string } }) {
  const { id } = params
  const [step, setStep] = useState(0)
  const [input, setInput] = useState("")
  const [transcript, setTranscript] = useState<{ q: string; a: string; guidance: string }[]>([])
  const [voiceEnabled, setVoiceEnabled] = useState(true)
  const [showCalming, setShowCalming] = useState(false)
  const [callStartTime] = useState(Date.now())

  const currentPrompt = DISPATCHER_PROMPTS[step] || DISPATCHER_PROMPTS[DISPATCHER_PROMPTS.length - 1]
  const callDuration = Math.floor((Date.now() - callStartTime) / 1000)

  const formatDuration = (seconds: number) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins}:${secs.toString().padStart(2, "0")}`
  }

  async function sendResponse() {
    const response = input.trim()
    if (!response) return
    
    setTranscript(prev => [...prev, { 
      q: currentPrompt.text, 
      a: response,
      guidance: currentPrompt.guidance
    }])
    setInput("")
    
    await offlineFetch(`/api/incidents/${id}/events`, {
      method: "POST",
      body: { 
        type: "911_call", 
        from: "civilian", 
        payload: { 
          question: currentPrompt.text,
          answer: response,
          step,
          duration: callDuration
        } 
      },
    })
    
    if (step < DISPATCHER_PROMPTS.length - 1) {
      setTimeout(() => setStep(step + 1), 1500) // Realistic dispatcher delay
    }
  }

  const handleVoiceCommand = (command: string) => {
    switch (command) {
      case "emergency":
        setInput("Medical emergency, person collapsed")
        break
      case "call_911":
        // Already in 911 call
        break
      case "repeat":
        // Voice guidance will repeat automatically
        break
      case "help":
        setShowCalming(true)
        break
    }
  }

  return (
    <>
      <CalmingOverlay 
        isActive={showCalming} 
        onClose={() => setShowCalming(false)} 
      />
      
      <main className="min-h-screen bg-gradient-to-br from-red-50 to-orange-50">
        <div className="container mx-auto px-4 py-6 max-w-4xl">
          <LegalBanner context={["emergency"]} className="mb-4" />
          
          <Card className="border-4 border-red-500 shadow-2xl">
            <CardHeader className="bg-red-600 text-white">
              <CardTitle className="flex items-center justify-between text-xl">
                <div className="flex items-center gap-3">
                  <Phone className="h-6 w-6" />
                  911 Emergency Call
                  <span className="text-sm bg-red-700 px-2 py-1 rounded">
                    LIVE SIMULATION
                  </span>
                </div>
                <div className="text-sm font-mono">
                  {formatDuration(callDuration)}
                </div>
              </CardTitle>
            </CardHeader>
            
            <CardContent className="p-6 space-y-6">
              {/* Voice Guidance */}
              <VoiceGuidance
                isActive={true}
                currentInstruction={currentPrompt.text}
                onVoiceCommand={handleVoiceCommand}
                autoSpeak={voiceEnabled}
              />

              {/* Current Dispatcher Question */}
              <Card className="border-2 border-blue-300 bg-blue-50">
                <CardContent className="p-4">
                  <div className="flex items-center gap-2 mb-2">
                    <div className="w-3 h-3 bg-blue-600 rounded-full animate-pulse"></div>
                    <span className="font-semibold text-blue-800">911 Dispatcher</span>
                  </div>
                  <div className="text-lg text-blue-900 mb-3">
                    {currentPrompt.text}
                  </div>
                  <div className="text-sm text-blue-700 bg-blue-100 border border-blue-200 rounded p-2">
                    💡 {currentPrompt.guidance}
                  </div>
                </CardContent>
              </Card>

              {/* Response Input */}
              <Card className="border-2 border-green-300 bg-green-50">
                <CardContent className="p-4">
                  <div className="flex items-center gap-2 mb-3">
                    <div className="w-3 h-3 bg-green-600 rounded-full"></div>
                    <span className="font-semibold text-green-800">Your Response</span>
                  </div>
                  <div className="space-y-3">
                    <Input
                      value={input}
                      onChange={(e) => setInput(e.target.value)}
                      placeholder="Type your response here..."
                      className="text-lg h-12 border-2 border-green-300"
                      onKeyDown={(e) => e.key === "Enter" && sendResponse()}
                    />
                    <div className="flex gap-3">
                      <EmergencyButton
                        onClick={sendResponse}
                        variant="success"
                        size="lg"
                        disabled={!input.trim()}
                        className="flex-1"
                        icon="📞"
                      >
                        Send Response
                      </EmergencyButton>
                      <Button
                        variant="outline"
                        onClick={() => setShowCalming(true)}
                        className="border-2 border-blue-300 text-blue-700 hover:bg-blue-50"
                      >
                        <Heart className="h-4 w-4 mr-2" />
                        Stay Calm
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Call Progress */}
              <div className="flex items-center justify-center gap-2">
                {DISPATCHER_PROMPTS.map((_, index) => (
                  <div
                    key={index}
                    className={`w-3 h-3 rounded-full ${
                      index <= step ? "bg-green-500" : "bg-gray-300"
                    }`}
                  />
                ))}
              </div>

              {/* Transcript */}
              {transcript.length > 0 && (
                <Card className="border-2 border-gray-300">
                  <CardHeader className="py-3">
                    <CardTitle className="text-lg">Call Transcript</CardTitle>
                  </CardHeader>
                  <CardContent className="max-h-64 overflow-y-auto">
                    <div className="space-y-3">
                      {transcript.map((entry, index) => (
                        <div key={index} className="border-l-4 border-gray-300 pl-4">
                          <div className="text-sm text-blue-700 font-medium">
                            911 Dispatcher:
                          </div>
                          <div className="text-blue-900 mb-1">{entry.q}</div>
                          <div className="text-sm text-green-700 font-medium">
                            You:
                          </div>
                          <div className="text-green-900">{entry.a}</div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              )}

              {/* Emergency Reminder */}
              <Card className="border-2 border-amber-400 bg-amber-50">
                <CardContent className="p-4 text-center">
                  <div className="text-amber-800 font-semibold mb-2">
                    🚨 This is a training simulation
                  </div>
                  <div className="text-amber-700">
                    In a real emergency, call 911 immediately. This demo helps you practice what to say.
                  </div>
                </CardContent>
              </Card>
            </CardContent>
          </Card>
        </div>
      </main>
    </>
  )
}
