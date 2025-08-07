"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Phone, Mic, MicOff, Volume2, VolumeX, MapPin } from "lucide-react"

interface EmergencyUnit {
  type: "ambulance" | "fire" | "police"
  unitNumber: string
  eta: number // seconds
  status: "dispatched" | "en_route" | "arrived"
  personnel?: string
}

interface Live911InterfaceProps {
  dispatcherName?: string
  dispatcherBadge?: string
  location?: string
  onDispatcherMessage?: (message: string) => void
  isCallActive?: boolean
}

export default function Live911Interface({
  dispatcherName = "Sarah Johnson",
  dispatcherBadge = "#4721",
  location = "123 Main St, Vancouver",
  onDispatcherMessage,
  isCallActive = true,
}: Live911InterfaceProps) {
  const [callDuration, setCallDuration] = useState(154) // 2:34 in seconds
  const [isMuted, setIsMuted] = useState(false)
  const [speakerOn, setSpeakerOn] = useState(true)
  const [connectionStrength, setConnectionStrength] = useState(3) // 0-3 bars

  const [emergencyUnits] = useState<EmergencyUnit[]>([
    {
      type: "ambulance",
      unitNumber: "Unit 47",
      eta: 240, // 4 minutes
      status: "en_route",
      personnel: "2 Advanced Life Support",
    },
    {
      type: "police",
      unitNumber: "Unit 23",
      eta: 120, // 2 minutes
      status: "en_route",
    },
  ])

  const [latestMessage] = useState(
    "I can see your location. Continue CPR. Ambulance is 4 minutes away. You're doing great.",
  )

  // Update call duration every second
  useEffect(() => {
    if (isCallActive) {
      const interval = setInterval(() => {
        setCallDuration((prev) => prev + 1)
      }, 1000)
      return () => clearInterval(interval)
    }
  }, [isCallActive])

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins}:${secs.toString().padStart(2, "0")}`
  }

  const formatETA = (seconds: number) => {
    const mins = Math.floor(seconds / 60)
    return `${mins} min${mins !== 1 ? "s" : ""}`
  }

  const getUnitIcon = (type: EmergencyUnit["type"]) => {
    switch (type) {
      case "ambulance":
        return "🚑"
      case "fire":
        return "🚒"
      case "police":
        return "👮"
      default:
        return "🚨"
    }
  }

  const getConnectionBars = () => {
    return Array.from({ length: 3 }, (_, i) => (
      <div key={i} className={`w-1 h-3 ${i < connectionStrength ? "bg-green-500" : "bg-gray-300"}`} />
    ))
  }

  const handleSpeakToDispatcher = () => {
    // Voice activation logic would go here
    console.log("Activating microphone for dispatcher communication")
  }

  const handleSendStatusUpdate = () => {
    const statusUpdate = "CPR in progress, patient unresponsive, compressions ongoing"
    onDispatcherMessage?.(statusUpdate)
    console.log("Status update sent:", statusUpdate)
  }

  return (
    <div className="min-h-screen bg-blue-50 flex items-center justify-center p-4">
      <Card className="w-full max-w-2xl">
        <CardContent className="p-6">
          {/* Header - Dispatcher Info */}
          <div className="text-center mb-6">
            <div className="flex items-center justify-center gap-2 mb-2">
              <Phone className="w-6 h-6 text-blue-600" />
              <h1 className="text-xl font-bold text-blue-800">911 Dispatcher - {dispatcherName}</h1>
            </div>
            <p className="text-sm text-gray-600">Badge {dispatcherBadge}, Vancouver 911</p>
          </div>

          {/* Call Status */}
          <Card className="bg-red-50 border-red-200 mb-6">
            <CardContent className="p-4">
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 bg-red-500 rounded-full animate-pulse"></div>
                  <span className="font-bold text-red-800">LIVE CALL</span>
                  <span className="text-red-700">- {formatTime(callDuration)}</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-sm text-green-700">🛰️ Satellite</span>
                  <div className="flex gap-1">{getConnectionBars()}</div>
                </div>
              </div>
              <div className="text-sm text-red-700">
                Connection stable • Location shared • Emergency services coordinated
              </div>
            </CardContent>
          </Card>

          {/* Latest Message */}
          <Card className="bg-white border-gray-200 mb-6">
            <CardContent className="p-4">
              <div className="flex items-start gap-3">
                <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                  <span className="text-blue-600 font-bold text-sm">SJ</span>
                </div>
                <div className="flex-1">
                  <div className="font-semibold text-gray-800 mb-1">Latest Message:</div>
                  <div className="text-gray-700 italic">"{latestMessage}"</div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Communication Controls */}
          <div className="grid grid-cols-2 gap-3 mb-6">
            <Button
              onClick={handleSpeakToDispatcher}
              className={`h-14 text-sm font-semibold ${isMuted ? "bg-gray-400" : "bg-green-600 hover:bg-green-700"}`}
            >
              {isMuted ? <MicOff className="w-5 h-5 mr-2" /> : <Mic className="w-5 h-5 mr-2" />}
              {isMuted ? "UNMUTE" : "SPEAK TO DISPATCHER"}
            </Button>

            <Button
              onClick={() => setIsMuted(!isMuted)}
              variant="outline"
              className="h-14 text-sm font-semibold border-2"
            >
              {isMuted ? <MicOff className="w-5 h-5 mr-2" /> : <Mic className="w-5 h-5 mr-2" />}
              {isMuted ? "UNMUTE CALL" : "MUTE CALL"}
            </Button>

            <Button
              onClick={() => setSpeakerOn(!speakerOn)}
              variant="outline"
              className="h-14 text-sm font-semibold border-2"
            >
              {speakerOn ? <Volume2 className="w-5 h-5 mr-2" /> : <VolumeX className="w-5 h-5 mr-2" />}
              SPEAKER {speakerOn ? "ON" : "OFF"}
            </Button>

            <Button
              onClick={handleSendStatusUpdate}
              className="h-14 text-sm font-semibold bg-blue-600 hover:bg-blue-700"
            >
              📊 SEND STATUS UPDATE
            </Button>
          </div>

          {/* Emergency Units Status */}
          <Card className="bg-yellow-50 border-yellow-200 mb-6">
            <CardContent className="p-4">
              <div className="font-semibold text-yellow-800 mb-3">Emergency Response Status:</div>
              <div className="space-y-3">
                {emergencyUnits.map((unit, index) => (
                  <div key={index} className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <span className="text-2xl">{getUnitIcon(unit.type)}</span>
                      <div>
                        <div className="font-semibold text-gray-800">{unit.unitNumber}</div>
                        {unit.personnel && <div className="text-sm text-gray-600">{unit.personnel}</div>}
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="font-bold text-yellow-700">{formatETA(unit.eta)} ETA</div>
                      <Badge variant="outline" className="text-xs">
                        {unit.status.replace("_", " ").toUpperCase()}
                      </Badge>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Location Confirmation */}
          <Card className="bg-green-50 border-green-200 mb-6">
            <CardContent className="p-4">
              <div className="flex items-center gap-2 mb-2">
                <MapPin className="w-5 h-5 text-green-600" />
                <span className="font-semibold text-green-800">Location Confirmed & Shared:</span>
              </div>
              <div className="text-green-700">{location}</div>
              <div className="text-sm text-green-600 mt-1">GPS coordinates transmitted • Access route confirmed</div>
            </CardContent>
          </Card>

          {/* Voice Commands */}
          <Card className="bg-blue-50 border-blue-200">
            <CardContent className="p-4">
              <div className="flex items-center gap-2 mb-2">
                <span className="text-xl">🎤</span>
                <span className="font-semibold text-blue-800">Voice Commands:</span>
              </div>
              <div className="text-sm text-blue-700 space-y-1">
                <div>"Update dispatcher" → Send current status</div>
                <div>"Mute call" → Mute microphone</div>
                <div>"Speaker on/off" → Toggle speaker</div>
                <div>"Send status" → Automated status update</div>
              </div>
            </CardContent>
          </Card>

          {/* Beta Disclaimer */}
          <div className="mt-4 text-center">
            <Badge variant="outline" className="bg-gray-100">
              ⚠️ BETA - Emergency services integration in testing
            </Badge>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
