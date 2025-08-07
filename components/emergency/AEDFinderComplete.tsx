"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import {
  MapPin,
  Navigation,
  AlertTriangle,
  Mic,
  MicOff,
  ArrowLeft,
  Settings,
  RefreshCw,
  ExternalLink,
  X,
} from "lucide-react"

interface AEDLocation {
  id: string
  name: string
  address: string
  distance: string
  verified: boolean
  accessible: boolean
  hours: string
  lastChecked: string
}

interface AEDFinderCompleteProps {
  emergencyMode?: boolean
  onExit?: () => void
}

export default function AEDFinderComplete({ emergencyMode = false, onExit }: AEDFinderCompleteProps) {
  const [currentScreen, setCurrentScreen] = useState("search")
  const [isListening, setIsListening] = useState(false)
  const [jumboText, setJumboText] = useState(false)
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedAED, setSelectedAED] = useState<AEDLocation | null>(null)
  const [isRefreshing, setIsRefreshing] = useState(false)

  const mockAEDs: AEDLocation[] = [
    {
      id: "1",
      name: "City Library",
      address: "123 Main St",
      distance: "300 ft away",
      verified: true,
      accessible: true,
      hours: "Mon-Fri: 9:00 AM - 8:00 PM",
      lastChecked: "2h ago",
    },
    {
      id: "2",
      name: "Central Café",
      address: "456 Park Ave",
      distance: "0.2 mi away",
      verified: true,
      accessible: true,
      hours: "Mon-Fri: 7:00 AM - 8:00 PM, Sat-Sun: 8:00 AM - 8:00 PM",
      lastChecked: "1h ago",
    },
    {
      id: "3",
      name: "Community Center",
      address: "789 Oak Street",
      distance: "0.4 mi away",
      verified: false,
      accessible: true,
      hours: "Daily: 6:00 AM - 10:00 PM",
      lastChecked: "4h ago",
    },
  ]

  const handleVoiceCommand = () => {
    setIsListening(!isListening)
    if (!isListening) {
      setTimeout(() => {
        setIsListening(false)
        setSearchQuery("Find nearest AED")
      }, 2000)
    }
  }

  const handleRefresh = () => {
    setIsRefreshing(true)
    setTimeout(() => {
      setIsRefreshing(false)
    }, 1500)
  }

  const renderSearchScreen = () => (
    <div className="min-h-screen bg-black text-white p-4">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-4">
          {onExit && (
            <Button
              onClick={onExit}
              className="bg-slate-700 hover:bg-slate-600 text-white border-2 border-white"
              size="sm"
            >
              <X className="h-4 w-4" />
            </Button>
          )}
          <h1 className={`font-bold text-white ${jumboText ? "text-3xl" : "text-2xl"}`}>AED FINDER</h1>
        </div>
        <div className="flex items-center space-x-2">
          <Button
            onClick={() => setJumboText(!jumboText)}
            className="bg-slate-700 hover:bg-slate-600 text-white border-2 border-white"
            size="sm"
          >
            <Settings className="h-4 w-4" />
            {jumboText ? "Normal" : "Jumbo"}
          </Button>
          {emergencyMode && (
            <Badge className="bg-red-600 text-white border-2 border-white font-bold">EMERGENCY MODE</Badge>
          )}
        </div>
      </div>

      {/* Emergency Warning */}
      {emergencyMode && (
        <div className="bg-red-600 border-4 border-white rounded-lg p-4 mb-6">
          <div className="flex items-center">
            <AlertTriangle className="h-6 w-6 text-white mr-3" />
            <div>
              <p className={`text-white font-bold ${jumboText ? "text-xl" : "text-lg"}`}>
                ⚠️ EMERGENCY: Call 911 First!
              </p>
              <p className={`text-white ${jumboText ? "text-lg" : "text-sm"}`}>
                Then use AED if person is unconscious and not breathing
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Search Bar */}
      <div className="mb-6">
        <div className="relative">
          <Input
            placeholder="Search for a location..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className={`bg-slate-800 border-2 border-white text-white placeholder-slate-400 ${
              jumboText ? "text-xl p-4" : "text-lg p-3"
            }`}
          />
          <Button
            onClick={handleVoiceCommand}
            className={`absolute right-2 top-1/2 transform -translate-y-1/2 bg-[#00C2FF] hover:bg-cyan-600 text-black border-2 border-white ${
              isListening ? "animate-pulse" : ""
            }`}
            size="sm"
          >
            {isListening ? <MicOff className="h-4 w-4" /> : <Mic className="h-4 w-4" />}
          </Button>
        </div>
      </div>

      {/* Nearby AEDs Header */}
      <div className="flex items-center justify-between mb-4">
        <h2 className={`font-bold text-white ${jumboText ? "text-2xl" : "text-xl"}`}>Nearby AEDs</h2>
        <Button
          onClick={handleRefresh}
          className="bg-slate-700 hover:bg-slate-600 text-white border-2 border-white"
          size="sm"
          disabled={isRefreshing}
        >
          <RefreshCw className={`h-4 w-4 ${isRefreshing ? "animate-spin" : ""}`} />
        </Button>
      </div>

      {/* AED List */}
      <div className="space-y-4">
        {mockAEDs.map((aed) => (
          <Card
            key={aed.id}
            className="bg-slate-800 border-2 border-white hover:border-[#00C2FF] cursor-pointer transition-colors"
            onClick={() => {
              setSelectedAED(aed)
              setCurrentScreen("map")
            }}
          >
            <CardContent className="p-4">
              <div className="flex items-center justify-between mb-2">
                <h3 className={`font-bold text-white ${jumboText ? "text-xl" : "text-lg"}`}>{aed.name}</h3>
                <div className="flex items-center space-x-2">
                  {aed.verified && (
                    <Badge className="bg-[#58D68D] text-black border-2 border-white font-bold">EMS VERIFIED</Badge>
                  )}
                  {aed.accessible && (
                    <Badge className="bg-blue-600 text-white border-2 border-white font-bold">ACCESSIBLE</Badge>
                  )}
                </div>
              </div>
              <p className={`text-slate-300 ${jumboText ? "text-lg" : "text-base"}`}>
                {aed.address} • {aed.distance}
              </p>
              <p className={`text-slate-400 ${jumboText ? "text-base" : "text-sm"}`}>
                Publicly accessible • Last verified {aed.lastChecked}
              </p>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Floating Voice Button */}
      <Button
        onClick={handleVoiceCommand}
        className={`fixed bottom-6 left-6 w-16 h-16 rounded-full bg-[#00C2FF] hover:bg-cyan-600 text-black border-4 border-white shadow-lg ${
          isListening ? "animate-pulse" : ""
        }`}
      >
        <Mic className="h-6 w-6" />
      </Button>
    </div>
  )

  const renderMapScreen = () => (
    <div className="min-h-screen bg-black text-white p-4">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <Button
          onClick={() => setCurrentScreen("search")}
          className="bg-slate-700 hover:bg-slate-600 text-white border-2 border-white"
        >
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back
        </Button>
        <h1 className={`font-bold text-white ${jumboText ? "text-3xl" : "text-2xl"}`}>AED FINDER</h1>
        <Button
          onClick={() => setJumboText(!jumboText)}
          className="bg-slate-700 hover:bg-slate-600 text-white border-2 border-white"
          size="sm"
        >
          <Settings className="h-4 w-4" />
        </Button>
      </div>

      {/* Map Placeholder */}
      <div className="bg-slate-800 border-4 border-white rounded-lg p-8 mb-6 h-64 flex items-center justify-center relative">
        <div className="text-center">
          <MapPin className="h-16 w-16 text-[#00C2FF] mx-auto mb-4 animate-pulse" />
          <p className={`text-white font-bold ${jumboText ? "text-xl" : "text-lg"}`}>{selectedAED?.name} Location</p>
        </div>
        {/* Mock map pins */}
        <div className="absolute top-4 left-8">
          <MapPin className="h-6 w-6 text-slate-400" />
        </div>
        <div className="absolute top-12 right-12">
          <MapPin className="h-6 w-6 text-slate-400" />
        </div>
        <div className="absolute bottom-8 left-16">
          <MapPin className="h-6 w-6 text-slate-400" />
        </div>
        <div className="absolute bottom-4 right-8">
          <MapPin className="h-6 w-6 text-slate-400" />
        </div>
      </div>

      {/* Action Button */}
      <Button
        onClick={() => setCurrentScreen("directions")}
        className="w-full bg-[#00C2FF] hover:bg-cyan-600 text-black font-bold border-4 border-white shadow-lg mb-4"
        size="lg"
      >
        <Navigation className="mr-2 h-5 w-5" />
        OPEN DIRECTIONS
      </Button>

      {/* AED Info */}
      {selectedAED && (
        <Card className="bg-slate-800 border-2 border-white">
          <CardContent className="p-4">
            <h3 className={`font-bold text-white mb-2 ${jumboText ? "text-xl" : "text-lg"}`}>{selectedAED.name}</h3>
            <p className={`text-slate-300 ${jumboText ? "text-lg" : "text-base"}`}>
              {selectedAED.address} • {selectedAED.distance}
            </p>
            <div className="flex items-center space-x-2 mt-2">
              {selectedAED.verified && (
                <Badge className="bg-[#58D68D] text-black border-2 border-white font-bold">EMS VERIFIED</Badge>
              )}
              {selectedAED.accessible && (
                <Badge className="bg-blue-600 text-white border-2 border-white font-bold">ACCESSIBLE</Badge>
              )}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  )

  const renderDirectionsScreen = () => (
    <div className="min-h-screen bg-black text-white p-4">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <Button
          onClick={() => setCurrentScreen("map")}
          className="bg-slate-700 hover:bg-slate-600 text-white border-2 border-white"
        >
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back
        </Button>
        <h1 className={`font-bold text-white ${jumboText ? "text-3xl" : "text-2xl"}`}>AED FINDER</h1>
        <Button
          onClick={() => setJumboText(!jumboText)}
          className="bg-slate-700 hover:bg-slate-600 text-white border-2 border-white"
          size="sm"
        >
          <Settings className="h-4 w-4" />
        </Button>
      </div>

      <div className="text-center mb-6">
        <h2 className={`font-bold text-white ${jumboText ? "text-2xl" : "text-xl"}`}>DIRECTIONS</h2>
      </div>

      {/* Step-by-step directions */}
      <div className="space-y-4 mb-6">
        <div className="bg-slate-800 border-2 border-white rounded-lg p-4">
          <div className="flex items-center space-x-4">
            <div className="bg-[#00C2FF] text-black rounded-full w-8 h-8 flex items-center justify-center font-bold">
              1
            </div>
            <p className={`text-white ${jumboText ? "text-lg" : "text-base"}`}>Head north on Smith St</p>
          </div>
        </div>
        <div className="bg-slate-800 border-2 border-white rounded-lg p-4">
          <div className="flex items-center space-x-4">
            <div className="bg-[#00C2FF] text-black rounded-full w-8 h-8 flex items-center justify-center font-bold">
              2
            </div>
            <p className={`text-white ${jumboText ? "text-lg" : "text-base"}`}>Turn left onto King St</p>
          </div>
        </div>
        <div className="bg-slate-800 border-2 border-white rounded-lg p-4">
          <div className="flex items-center space-x-4">
            <div className="bg-[#00C2FF] text-black rounded-full w-8 h-8 flex items-center justify-center font-bold">
              3
            </div>
            <p className={`text-white ${jumboText ? "text-lg" : "text-base"}`}>Central Café will be on the right</p>
          </div>
        </div>
      </div>

      {/* Action Button */}
      <Button
        onClick={() => setCurrentScreen("info")}
        className="w-full bg-[#00C2FF] hover:bg-cyan-600 text-black font-bold border-4 border-white shadow-lg"
        size="lg"
      >
        <ExternalLink className="mr-2 h-5 w-5" />
        OPEN IN MAPS
      </Button>
    </div>
  )

  const renderInfoScreen = () => (
    <div className="min-h-screen bg-black text-white p-4">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <Button
          onClick={() => setCurrentScreen("directions")}
          className="bg-slate-700 hover:bg-slate-600 text-white border-2 border-white"
        >
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back
        </Button>
        <h1 className={`font-bold text-white ${jumboText ? "text-3xl" : "text-2xl"}`}>AED FINDER</h1>
        <Button
          onClick={() => setJumboText(!jumboText)}
          className="bg-slate-700 hover:bg-slate-600 text-white border-2 border-white"
          size="sm"
        >
          <Settings className="h-4 w-4" />
        </Button>
      </div>

      <div className="text-center mb-6">
        <h2 className={`font-bold text-white ${jumboText ? "text-2xl" : "text-xl"}`}>AED INFO</h2>
      </div>

      {selectedAED && (
        <div className="space-y-4">
          <Card className="bg-slate-800 border-2 border-white">
            <CardHeader>
              <CardTitle className={`text-white ${jumboText ? "text-2xl" : "text-xl"}`}>{selectedAED.name}</CardTitle>
            </CardHeader>
            <CardContent>
              <p className={`text-white mb-2 ${jumboText ? "text-lg" : "text-base"}`}>{selectedAED.address}</p>
              <p className={`text-white mb-4 ${jumboText ? "text-lg" : "text-base"}`}>{selectedAED.distance}</p>
              <p className={`text-slate-300 ${jumboText ? "text-base" : "text-sm"}`}>Publicly accessible</p>
              <div className="mt-4">
                <p className={`text-white font-bold ${jumboText ? "text-lg" : "text-base"}`}>Hours:</p>
                <p className={`text-slate-300 ${jumboText ? "text-base" : "text-sm"}`}>{selectedAED.hours}</p>
              </div>
              <div className="flex items-center space-x-2 mt-4">
                {selectedAED.verified && (
                  <Badge className="bg-[#58D68D] text-black border-2 border-white font-bold">EMS VERIFIED</Badge>
                )}
                {selectedAED.accessible && (
                  <Badge className="bg-blue-600 text-white border-2 border-white font-bold">ACCESSIBLE</Badge>
                )}
              </div>
            </CardContent>
          </Card>

          <Button
            className="w-full bg-[#FF4C4C] hover:bg-red-600 text-white font-bold border-4 border-white shadow-lg"
            size="lg"
          >
            <AlertTriangle className="mr-2 h-5 w-5" />
            REPORT ISSUE
          </Button>
        </div>
      )}
    </div>
  )

  // Render different screens based on current state
  switch (currentScreen) {
    case "map":
      return renderMapScreen()
    case "directions":
      return renderDirectionsScreen()
    case "info":
      return renderInfoScreen()
    default:
      return renderSearchScreen()
  }
}
