"use client"

import { useState, useEffect, useRef } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Mic, MicOff, Volume2, VolumeX, Play, Pause } from 'lucide-react'

interface VoiceGuidanceProps {
  isActive: boolean
  currentInstruction: string
  onVoiceCommand?: (command: string) => void
  autoSpeak?: boolean
}

export function VoiceGuidance({ 
  isActive, 
  currentInstruction, 
  onVoiceCommand,
  autoSpeak = true 
}: VoiceGuidanceProps) {
  const [isListening, setIsListening] = useState(false)
  const [audioEnabled, setAudioEnabled] = useState(autoSpeak)
  const [isPlaying, setIsPlaying] = useState(false)
  const recognitionRef = useRef<any>(null)

  // Text-to-Speech
  useEffect(() => {
    if (!audioEnabled || !currentInstruction || !isActive) return
    if (typeof window === "undefined" || !("speechSynthesis" in window)) return

    const utterance = new SpeechSynthesisUtterance(currentInstruction)
    utterance.rate = 0.9
    utterance.pitch = 1.0
    utterance.volume = 0.8
    
    utterance.onstart = () => setIsPlaying(true)
    utterance.onend = () => setIsPlaying(false)
    
    window.speechSynthesis.cancel()
    window.speechSynthesis.speak(utterance)

    return () => {
      window.speechSynthesis.cancel()
      setIsPlaying(false)
    }
  }, [currentInstruction, audioEnabled, isActive])

  // Speech Recognition
  useEffect(() => {
    if (typeof window === "undefined" || !("webkitSpeechRecognition" in window)) return

    const SpeechRecognition = (window as any).webkitSpeechRecognition
    recognitionRef.current = new SpeechRecognition()
    
    recognitionRef.current.continuous = true
    recognitionRef.current.interimResults = false
    recognitionRef.current.lang = "en-US"

    recognitionRef.current.onresult = (event: any) => {
      const transcript = event.results[event.results.length - 1][0].transcript.toLowerCase().trim()
      
      // Common emergency voice commands
      if (transcript.includes("help") || transcript.includes("emergency")) {
        onVoiceCommand?.("emergency")
      } else if (transcript.includes("call 911") || transcript.includes("call nine one one")) {
        onVoiceCommand?.("call_911")
      } else if (transcript.includes("start cpr") || transcript.includes("begin cpr")) {
        onVoiceCommand?.("start_cpr")
      } else if (transcript.includes("next") || transcript.includes("continue")) {
        onVoiceCommand?.("next")
      } else if (transcript.includes("repeat") || transcript.includes("say again")) {
        onVoiceCommand?.("repeat")
      } else if (transcript.includes("stop") || transcript.includes("pause")) {
        onVoiceCommand?.("stop")
      }
    }

    recognitionRef.current.onerror = () => {
      setIsListening(false)
    }

    return () => {
      if (recognitionRef.current) {
        recognitionRef.current.stop()
      }
    }
  }, [onVoiceCommand])

  const toggleListening = () => {
    if (!recognitionRef.current) return

    if (isListening) {
      recognitionRef.current.stop()
      setIsListening(false)
    } else {
      recognitionRef.current.start()
      setIsListening(true)
    }
  }

  const toggleAudio = () => {
    if (audioEnabled) {
      window.speechSynthesis?.cancel()
      setIsPlaying(false)
    }
    setAudioEnabled(!audioEnabled)
  }

  const repeatInstruction = () => {
    if (!currentInstruction || !audioEnabled) return
    if (typeof window === "undefined" || !("speechSynthesis" in window)) return

    const utterance = new SpeechSynthesisUtterance(currentInstruction)
    utterance.rate = 0.9
    utterance.pitch = 1.0
    
    utterance.onstart = () => setIsPlaying(true)
    utterance.onend = () => setIsPlaying(false)
    
    window.speechSynthesis.cancel()
    window.speechSynthesis.speak(utterance)
  }

  if (!isActive) return null

  return (
    <Card className="border-2 border-blue-200 bg-blue-50">
      <CardContent className="p-4">
        <div className="flex items-center justify-between mb-3">
          <div className="text-sm font-semibold text-blue-800">Voice Guidance</div>
          <div className="flex gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={toggleAudio}
              className={audioEnabled ? "bg-blue-100" : ""}
            >
              {audioEnabled ? <Volume2 className="h-4 w-4" /> : <VolumeX className="h-4 w-4" />}
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={toggleListening}
              className={isListening ? "bg-red-100 border-red-300" : ""}
            >
              {isListening ? <Mic className="h-4 w-4 text-red-600" /> : <MicOff className="h-4 w-4" />}
            </Button>
          </div>
        </div>

        <div className="text-sm text-blue-700 mb-3">
          {currentInstruction}
        </div>

        <div className="flex gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={repeatInstruction}
            disabled={!audioEnabled}
            className="border-2"
          >
            {isPlaying ? <Pause className="h-4 w-4 mr-1" /> : <Play className="h-4 w-4 mr-1" />}
            Repeat
          </Button>
        </div>

        {isListening && (
          <div className="mt-2 text-xs text-blue-600">
            🎤 Listening... Try: "Help", "Call 911", "Start CPR", "Next", "Repeat"
          </div>
        )}
      </CardContent>
    </Card>
  )
}
