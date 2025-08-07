"use client"

import type React from "react"
import { useState, useEffect, useRef } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Mic, MicOff, Volume2, VolumeX, ChevronDown, ChevronUp } from "lucide-react"

interface VoiceCommandSystemProps {
  isActive: boolean
  onCommand: (command: string) => void
  currentStep?: string
  isListening?: boolean
  onToggleListening?: () => void
}

export const VoiceCommandSystem: React.FC<VoiceCommandSystemProps> = ({
  isActive,
  onCommand,
  currentStep = "initial",
  isListening = false,
  onToggleListening,
}) => {
  const [transcript, setTranscript] = useState("")
  const [confidence, setConfidence] = useState(0)
  const [speechSupported, setSpeechSupported] = useState(false)
  const [audioEnabled, setAudioEnabled] = useState(true)
  const [isExpanded, setIsExpanded] = useState(false)
  const recognitionRef = useRef<any>(null)

  useEffect(() => {
    if (typeof window !== "undefined" && "webkitSpeechRecognition" in window) {
      setSpeechSupported(true)
      const SpeechRecognition = (window as any).webkitSpeechRecognition
      recognitionRef.current = new SpeechRecognition()

      recognitionRef.current.continuous = true
      recognitionRef.current.interimResults = true
      recognitionRef.current.lang = "en-US"

      recognitionRef.current.onresult = (event: any) => {
        let finalTranscript = ""
        let interimTranscript = ""

        for (let i = event.resultIndex; i < event.results.length; i++) {
          const transcript = event.results[i][0].transcript
          const confidence = event.results[i][0].confidence

          if (event.results[i].isFinal) {
            finalTranscript += transcript
            setConfidence(confidence)
            processVoiceCommand(transcript.toLowerCase().trim())
          } else {
            interimTranscript += transcript
          }
        }

        setTranscript(finalTranscript || interimTranscript)
      }

      recognitionRef.current.onerror = (event: any) => {
        console.error("Speech recognition error:", event.error)
      }
    }

    return () => {
      if (recognitionRef.current) {
        recognitionRef.current.stop()
      }
    }
  }, [])

  useEffect(() => {
    if (isListening && recognitionRef.current) {
      recognitionRef.current.start()
    } else if (recognitionRef.current) {
      recognitionRef.current.stop()
    }
  }, [isListening])

  const processVoiceCommand = (command: string) => {
    const commands = {
      // Hero Mode Activation
      "saferoute initiate hero mode": "activate_hero_mode",
      "saferoute emergency": "activate_hero_mode",
      "hero mode activate": "activate_hero_mode",

      // 911 Responses
      yes: "confirm_911",
      "call 911": "confirm_911",
      no: "decline_911",
      continue: "decline_911",

      // Emergency Types
      cpr: "select_cpr",
      "i am helping someone": "select_cpr",
      "helping someone": "select_cpr",
      "heart attack": "select_personal",
      "i need help": "select_personal",
      "need help": "select_personal",

      // CPR Commands
      "start cpr": "start_cpr",
      "begin cpr": "start_cpr",
      stop: "stop_cpr",
      pause: "pause_cpr",

      // Navigation
      "next step": "next_step",
      "previous step": "previous_step",
      repeat: "repeat_instruction",
      help: "show_help",
      "what can i say": "show_commands",
    }

    const matchedCommand = Object.keys(commands).find((key) => command.includes(key) || key.includes(command))

    if (matchedCommand) {
      onCommand(commands[matchedCommand as keyof typeof commands])
      speak(`Command recognized: ${matchedCommand}`)
    } else {
      speak("Command not recognized. Say 'help' for available commands.")
    }
  }

  const speak = (text: string) => {
    if (audioEnabled && "speechSynthesis" in window) {
      const utterance = new SpeechSynthesisUtterance(text)
      utterance.rate = 1.1
      utterance.pitch = 1
      utterance.volume = 0.8
      speechSynthesis.speak(utterance)
    }
  }

  const getContextualCommands = () => {
    switch (currentStep) {
      case "initial":
        return ["SafeRoute initiate Hero Mode"]
      case "911_confirmation":
        return ["Yes", "No"]
      case "emergency_type":
        return ["CPR", "Heart attack"]
      case "cpr_training":
        return ["Start CPR", "Next step"]
      default:
        return ["Help"]
    }
  }

  if (!isActive) return null

  return (
    <Card className="bg-white/95 backdrop-blur-sm border border-slate-300 shadow-lg">
      <div className="p-3">
        {/* Compact Header */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className={`w-2 h-2 rounded-full ${isListening ? "bg-red-500 animate-pulse" : "bg-gray-400"}`} />
            <span className="text-sm font-medium text-slate-700">Voice Commands</span>
          </div>

          <div className="flex gap-1">
            <Button
              variant={isListening ? "default" : "outline"}
              size="sm"
              onClick={onToggleListening}
              className={`h-8 px-2 ${isListening ? "bg-red-600 hover:bg-red-700" : ""}`}
            >
              {isListening ? <Mic className="w-3 h-3" /> : <MicOff className="w-3 h-3" />}
            </Button>

            <Button variant="outline" size="sm" onClick={() => setAudioEnabled(!audioEnabled)} className="h-8 px-2">
              {audioEnabled ? <Volume2 className="w-3 h-3" /> : <VolumeX className="w-3 h-3" />}
            </Button>

            <Button variant="ghost" size="sm" onClick={() => setIsExpanded(!isExpanded)} className="h-8 px-2">
              {isExpanded ? <ChevronUp className="w-3 h-3" /> : <ChevronDown className="w-3 h-3" />}
            </Button>
          </div>
        </div>

        {/* Voice Input Display - Only when listening */}
        {isListening && (
          <div className="mt-2 bg-blue-50 border border-blue-200 rounded p-2">
            <div className="text-xs text-blue-900 font-medium mb-1">Listening...</div>
            <div className="text-sm text-blue-700 min-h-[16px]">{transcript || "Say a command..."}</div>
          </div>
        )}

        {/* Expandable Commands List */}
        {isExpanded && (
          <div className="mt-2 space-y-1">
            <div className="text-xs font-medium text-slate-700">Available Commands:</div>
            {getContextualCommands().map((command, index) => (
              <div key={index} className="text-xs text-slate-600 bg-slate-50 rounded px-2 py-1 border">
                "{command}"
              </div>
            ))}
          </div>
        )}

        {/* Quick Command Hints - Always visible */}
        {!isExpanded && (
          <div className="mt-2 text-xs text-slate-500 text-center">
            Say:{" "}
            {getContextualCommands()
              .slice(0, 2)
              .map((cmd) => `"${cmd}"`)
              .join(" or ")}
          </div>
        )}

        {/* Speech Support Status */}
        {!speechSupported && (
          <div className="mt-2 text-xs text-amber-600 bg-amber-50 border border-amber-200 rounded p-1 text-center">
            Voice recognition not supported
          </div>
        )}
      </div>
    </Card>
  )
}
