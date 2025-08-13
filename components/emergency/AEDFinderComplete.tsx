"use client"

import { useState, useEffect } from "react"
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
  Zap,
  CheckCircle,
  Clock,
  Phone,
  Search,
} from "lucide-react"

interface AEDLocation {
  id: string
  name: string
  address: string
  distance: string
  walkTime: number
  verified: boolean
  accessible: boolean
  hours: string
  lastChecked: string
  availability: "available" | "in-use" | "maintenance" | "unknown"
  buildingType: "hospital" | "school" | "mall" | "office" | "gym" | "community" | "transit"
  instructions: string
  contactPhone?: string
  accessCode?: string
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
  const [isLoading, setIsLoading] = useState(true)

  const mockAEDs: AEDLocation[] = [
    {
      id: "1",
      name: "Vancouver General Hospital - Main Entrance",
      address: "899 W 12th Ave, Vancouver, BC",
      distance: "300 ft away",
      walkTime: 4,
      verified: true,
      accessible: true,
      hours: "24/7",
      lastChecked: "2h ago",
      availability: "available",
      buildingType: "hospital",
      instructions: "Located in main lobby, left of information desk",
      contactPhone: "+1-604-875-4111",
    },
    {
      id: "2",
      name: "Pacific Centre Mall - Food Court",
      address: "701 W Georgia St, Vancouver, BC",
      distance: "0.2 mi away",
      walkTime: 6,
      verified: true,
      accessible: true,
      hours: "Mall hours: 10AM-9PM",
      lastChecked: "1h ago",
      availability: "available",
      buildingType: "mall",
      instructions: "Food court level, near customer service",
    },
    {
      id: "3",
      name: "SkyTrain Stadium-Chinatown Station",
      address: "150 Dunsmuir St, Vancouver, BC",
      distance: "0.4 mi away",
      walkTime: 10,
      verified: false,
      accessible: true,
      hours: "Transit hours: 5AM-1AM",
      lastChecked: "4h ago",
      availability: "in-use",
      buildingType: "transit",
      instructions: "Concourse level, near fare gates",
    },
  ]

  useEffect(() => {
    // Simulate loading
    const timer = setTimeout(() => setIsLoading(false), 1500)
    return () => clearTimeout(timer)
  }, [])

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

  const getAvailabilityColor = (availability: AEDLocation["availability"]) => {
    switch (availability) {
      case "available":
        return "bg-gradient-to-r from-green-500 to-emerald-500"
      case "in-use":
        return "bg-gradient-to-r from-yellow-500 to-orange-500"
      case "maintenance":
        return "bg-gradient-to-r from-red-500 to-pink-500"
      default:
        return "bg-gray-600"
    }
  }

  const getAvailabilityText = (availability: AEDLocation["availability"]) => {
    switch (availability) {
      case "available":
        return "AVAILABLE"
      case "in-use":
        return "IN USE"
      case "maintenance":
        return "MAINTENANCE"
      default:
        return "UNKNOWN"
    }
  }

  const getBuildingIcon = (type: AEDLocation["buildingType"]) => {
    switch (type) {
      case "hospital":
        return "🏥"
      case "school":
        return "🏫"
      case "mall":
        return "🏬"
      case "office":
        return "🏢"
      case "gym":
        return "💪"
      case "community":
        return "🏛️"
      case "transit":
        return "🚇"
      default:
        return "📍"
    }
  }

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-red-50 via-orange-50 to-yellow-50 flex items-center justify-center p-4">
        <Card className="w-full max-w-md shadow-2xl border-0 bg-white/90 backdrop-blur-sm">
          <CardContent className="p-8 text-center">
            <div className="relative w-20 h-20 mx-auto mb-6">
              <div className="absolute inset-0 bg-gradient-to-r from-red-500 to-orange-500 rounded-full animate-spin">
                <div className="absolute inset-2 bg-white rounded-full"></div>
              </div>
              <Zap className="absolute inset-0 m-auto w-8 h-8 text-red-600 animate-pulse" />
            </div>
            <h2 className="text-2xl font-bold bg-gradient-to-r from-red-600 to-orange-600 bg-clip-text text-transparent mb-3">
              Finding Nearby AEDs
            </h2>
            <p className="text-gray-600 text-lg">Locating life-saving devices near you...</p>
          </CardContent>
        </Card>
      </div>
    )
  }

  const renderSearchScreen = () => (
    <div
      className={`min-h-screen ${emergencyMode ? "bg-gradient-to-br from-red-100 via-red-50 to-orange-50" : "bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50"} p-4`}
    >
      <div className="max-w-6xl mx-auto">
        {/* Enhanced Header */}
        <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl border-0 p-6 mb-8">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="relative">
                <div className="w-16 h-16 bg-gradient-to-r from-red-500 to-orange-500 rounded-2xl flex items-center justify-center shadow-lg">
                  <Zap className="w-8 h-8 text-white" />
                </div>
                <div className="absolute -top-1 -right-1 w-6 h-6 bg-green-500 rounded-full border-2 border-white flex items-center justify-center">
                  <CheckCircle className="w-3 h-3 text-white" />
                </div>
              </div>
              <div>
                <h1
                  className={`font-bold bg-gradient-to-r from-red-600 to-orange-600 bg-clip-text text-transparent ${jumboText ? "text-4xl" : "text-3xl"}`}
                >
                  AED Finder™
                </h1>
                <p className={`text-gray-600 ${jumboText ? "text-xl" : "text-lg"}`}>
                  Automated External Defibrillators Near You
                </p>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <Button
                onClick={() => setJumboText(!jumboText)}
                className="bg-white/90 backdrop-blur-sm border-gray-200 hover:bg-gray-50 shadow-lg"
                size="sm"
              >
                <Settings className="h-4 w-4 mr-2" />
                {jumboText ? "Normal" : "Jumbo"}
              </Button>
              {onExit && (
                <Button
                  onClick={onExit}
                  variant="outline"
                  className="bg-white/90 backdrop-blur-sm border-gray-200 hover:bg-gray-50 shadow-lg"
                  size="sm"
                >
                  <X className="h-4 w-4" />
                </Button>
              )}
              {emergencyMode && (
                <Badge className="bg-gradient-to-r from-red-500 to-orange-500 text-white font-bold px-4 py-2 shadow-lg">
                  EMERGENCY MODE
                </Badge>
              )}
            </div>
          </div>
        </div>

        {/* Emergency Warning */}
        {emergencyMode && (
          <Card className="mb-8 border-0 bg-gradient-to-r from-red-500 to-orange-500 shadow-2xl">
            <CardContent className="p-6">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center animate-pulse">
                  <AlertTriangle className="w-6 h-6 text-white" />
                </div>
                <div className="flex-1">
                  <h3 className={`font-bold text-white mb-1 ${jumboText ? "text-2xl" : "text-xl"}`}>
                    ⚠️ EMERGENCY: Call 911 First!
                  </h3>
                  <p className={`text-white/90 ${jumboText ? "text-xl" : "text-lg"}`}>
                    Then use AED if person is unconscious and not breathing
                  </p>
                </div>
                <Button
                  onClick={() => (window.location.href = "tel:911")}
                  className="bg-white text-red-600 hover:bg-gray-100 font-bold px-6 py-3 text-lg shadow-lg"
                >
                  📞 Call 911
                </Button>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Enhanced Search Bar */}
        <Card className="mb-8 border-0 bg-white/80 backdrop-blur-sm shadow-xl">
          <CardContent className="p-6">
            <div className="relative">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-500 rounded-xl flex items-center justify-center">
                  <Search className="w-6 h-6 text-white" />
                </div>
                <div className="flex-1">
                  <Input
                    placeholder="Search for a location or say 'Find nearest AED'..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className={`bg-white border-2 border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 ${
                      jumboText ? "text-xl p-4" : "text-lg p-3"
                    }`}
                  />
                </div>
                <Button
                  onClick={handleVoiceCommand}
                  className={`bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-600 hover:to-blue-600 text-white shadow-lg ${
                    isListening ? "animate-pulse ring-4 ring-cyan-300" : ""
                  }`}
                  size="lg"
                >
                  {isListening ? <MicOff className="h-5 w-5" /> : <Mic className="h-5 w-5" />}
                  <span className="ml-2 hidden sm:inline">{isListening ? "Listening..." : "Voice"}</span>
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Nearby AEDs Header */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <h2 className={`font-bold text-gray-800 ${jumboText ? "text-3xl" : "text-2xl"}`}>Nearby AEDs</h2>
            <Badge className="bg-gradient-to-r from-green-500 to-emerald-500 text-white px-3 py-1 text-lg font-bold shadow-lg">
              {mockAEDs.length} found
            </Badge>
          </div>
          <Button
            onClick={handleRefresh}
            className="bg-white/90 backdrop-blur-sm border-gray-200 hover:bg-gray-50 shadow-lg"
            size="sm"
            disabled={isRefreshing}
          >
            <RefreshCw className={`h-4 w-4 mr-2 ${isRefreshing ? "animate-spin" : ""}`} />
            Refresh
          </Button>
        </div>

        {/* Enhanced AED List */}
        <div className="grid gap-6">
          {mockAEDs.map((aed, index) => (
            <Card
              key={aed.id}
              className={`transition-all duration-300 hover:shadow-2xl hover:scale-[1.02] border-0 bg-white/90 backdrop-blur-sm cursor-pointer ${
                selectedAED?.id === aed.id ? "ring-4 ring-red-400 shadow-2xl" : "shadow-xl"
              } ${
                aed.availability === "available"
                  ? "border-l-4 border-l-green-500"
                  : aed.availability === "in-use"
                    ? "border-l-4 border-l-yellow-500"
                    : "border-l-4 border-l-red-500"
              }`}
              style={{
                animationDelay: `${index * 100}ms`,
                animation: "fadeInUp 0.6s ease-out forwards",
              }}
              onClick={() => {
                setSelectedAED(aed)
                setCurrentScreen("map")
              }}
            >
              <CardHeader className="pb-4">
                <div className="flex items-start justify-between">
                  <div className="flex items-start gap-4">
                    <div className="text-4xl bg-gradient-to-r from-blue-100 to-purple-100 p-3 rounded-xl">
                      {getBuildingIcon(aed.buildingType)}
                    </div>
                    <div className="flex-1">
                      <CardTitle className={`text-gray-800 mb-2 ${jumboText ? "text-2xl" : "text-xl"}`}>
                        {aed.name}
                      </CardTitle>
                      <p className={`text-gray-600 mb-3 ${jumboText ? "text-lg" : "text-base"}`}>{aed.address}</p>

                      <div className="flex items-center gap-6 mb-3">
                        <div className="flex items-center gap-2 bg-blue-50 px-3 py-1 rounded-full">
                          <MapPin className="w-4 h-4 text-blue-600" />
                          <span className="text-sm font-bold text-blue-800">{aed.distance}</span>
                        </div>
                        <div className="flex items-center gap-2 bg-green-50 px-3 py-1 rounded-full">
                          <Clock className="w-4 h-4 text-green-600" />
                          <span className="text-sm font-bold text-green-800">{aed.walkTime} min walk</span>
                        </div>
                      </div>

                      <div className="flex items-center space-x-2">
                        {aed.verified && (
                          <Badge className="bg-gradient-to-r from-green-500 to-emerald-500 text-white font-bold shadow-lg">
                            EMS VERIFIED
                          </Badge>
                        )}
                        {aed.accessible && (
                          <Badge className="bg-gradient-to-r from-blue-500 to-purple-500 text-white font-bold shadow-lg">
                            ACCESSIBLE
                          </Badge>
                        )}
                      </div>
                    </div>
                  </div>

                  <Badge
                    className={`${getAvailabilityColor(aed.availability)} text-white font-bold px-4 py-2 text-sm shadow-lg`}
                  >
                    {getAvailabilityText(aed.availability)}
                  </Badge>
                </div>
              </CardHeader>

              <CardContent className="pt-0">
                <div className="bg-gray-50 rounded-xl p-4 mb-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    <div>
                      <p className="text-sm font-bold text-gray-700 mb-1">Access Hours</p>
                      <p className={`text-gray-600 ${jumboText ? "text-base" : "text-sm"}`}>{aed.hours}</p>
                    </div>
                    <div>
                      <p className="text-sm font-bold text-gray-700 mb-1">Last Verified</p>
                      <p className={`text-gray-600 ${jumboText ? "text-base" : "text-sm"}`}>{aed.lastChecked}</p>
                    </div>
                  </div>

                  {aed.instructions && (
                    <div className="mt-3 pt-3 border-t border-gray-200">
                      <p className="text-sm font-bold text-gray-700 mb-1">Location Details</p>
                      <p className={`text-gray-600 ${jumboText ? "text-base" : "text-sm"}`}>{aed.instructions}</p>
                    </div>
                  )}
                </div>

                <div className="flex gap-3">
                  <Button
                    className="bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white flex-1 shadow-lg"
                    disabled={aed.availability === "maintenance"}
                  >
                    <Navigation className="w-4 h-4 mr-2" />
                    Get Directions
                  </Button>

                  {aed.contactPhone && (
                    <Button
                      onClick={(e) => {
                        e.stopPropagation()
                        window.location.href = `tel:${aed.contactPhone}`
                      }}
                      variant="outline"
                      className="bg-white/90 backdrop-blur-sm border-gray-200 hover:bg-gray-50 shadow-lg"
                    >
                      <Phone className="w-4 h-4 mr-2" />
                      Call
                    </Button>
                  )}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Enhanced Floating Voice Button */}
        <Button
          onClick={handleVoiceCommand}
          className={`fixed bottom-6 right-6 w-16 h-16 rounded-full bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-600 hover:to-blue-600 text-white shadow-2xl border-4 border-white ${
            isListening ? "animate-pulse ring-4 ring-cyan-300" : ""
          }`}
        >
          <Mic className="h-6 w-6" />
        </Button>

        {/* Instructions Card */}
        <Card className="mt-12 border-0 bg-gradient-to-r from-red-50 to-orange-50 shadow-xl">
          <CardHeader className="bg-gradient-to-r from-red-500 to-orange-500 text-white rounded-t-xl">
            <CardTitle className={`flex items-center gap-3 ${jumboText ? "text-2xl" : "text-xl"}`}>
              <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center">
                <AlertTriangle className="w-5 h-5" />
              </div>
              AED Usage Instructions
            </CardTitle>
          </CardHeader>
          <CardContent className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {[
                "Call 911 first before getting AED",
                "Turn on AED and follow voice prompts",
                "Attach pads as shown in diagrams",
                "Stand clear when AED analyzes and shocks",
                "Continue CPR between AED cycles",
              ].map((instruction, index) => (
                <div key={index} className="flex items-center gap-3 p-3 bg-white rounded-lg shadow-sm">
                  <div className="w-8 h-8 bg-gradient-to-r from-red-500 to-orange-500 rounded-full flex items-center justify-center flex-shrink-0">
                    <span className="text-white font-bold text-sm">{index + 1}</span>
                  </div>
                  <span className={`text-gray-700 font-medium ${jumboText ? "text-lg" : "text-base"}`}>
                    {instruction}
                  </span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      <style jsx>{`
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </div>
  )

  const renderMapScreen = () => (
    <div
      className={`min-h-screen ${emergencyMode ? "bg-gradient-to-br from-red-100 via-red-50 to-orange-50" : "bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50"} p-4`}
    >
      <div className="max-w-4xl mx-auto">
        {/* Enhanced Header */}
        <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl border-0 p-6 mb-8">
          <div className="flex items-center justify-between">
            <Button
              onClick={() => setCurrentScreen("search")}
              className="bg-white/90 backdrop-blur-sm border-gray-200 hover:bg-gray-50 shadow-lg"
            >
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Search
            </Button>
            <h1
              className={`font-bold bg-gradient-to-r from-red-600 to-orange-600 bg-clip-text text-transparent ${jumboText ? "text-4xl" : "text-3xl"}`}
            >
              AED Location
            </h1>
            <Button
              onClick={() => setJumboText(!jumboText)}
              className="bg-white/90 backdrop-blur-sm border-gray-200 hover:bg-gray-50 shadow-lg"
              size="sm"
            >
              <Settings className="h-4 w-4 mr-2" />
              {jumboText ? "Normal" : "Jumbo"}
            </Button>
          </div>
        </div>

        {/* Enhanced Map Placeholder */}
        <Card className="mb-8 border-0 bg-white/90 backdrop-blur-sm shadow-xl">
          <CardContent className="p-8">
            <div className="bg-gradient-to-br from-blue-100 to-purple-100 rounded-2xl p-8 h-64 flex items-center justify-center relative overflow-hidden">
              <div className="text-center z-10">
                <div className="w-20 h-20 bg-gradient-to-r from-red-500 to-orange-500 rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg animate-pulse">
                  <MapPin className="h-10 w-10 text-white" />
                </div>
                <p className={`text-gray-800 font-bold ${jumboText ? "text-2xl" : "text-xl"}`}>{selectedAED?.name}</p>
                <p className={`text-gray-600 ${jumboText ? "text-lg" : "text-base"}`}>{selectedAED?.distance}</p>
              </div>
              {/* Mock map pins with enhanced styling */}
              <div
                className="absolute top-4 left-8 w-6 h-6 bg-blue-500 rounded-full shadow-lg animate-bounce"
                style={{ animationDelay: "0s" }}
              ></div>
              <div
                className="absolute top-12 right-12 w-6 h-6 bg-green-500 rounded-full shadow-lg animate-bounce"
                style={{ animationDelay: "0.5s" }}
              ></div>
              <div
                className="absolute bottom-8 left-16 w-6 h-6 bg-purple-500 rounded-full shadow-lg animate-bounce"
                style={{ animationDelay: "1s" }}
              ></div>
              <div
                className="absolute bottom-4 right-8 w-6 h-6 bg-yellow-500 rounded-full shadow-lg animate-bounce"
                style={{ animationDelay: "1.5s" }}
              ></div>
            </div>
          </CardContent>
        </Card>

        {/* Enhanced Action Button */}
        <Button
          onClick={() => setCurrentScreen("directions")}
          className={`w-full bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white font-bold shadow-2xl mb-6 ${jumboText ? "text-2xl py-6" : "text-xl py-4"}`}
        >
          <Navigation className="mr-3 h-6 w-6" />
          GET DIRECTIONS
        </Button>

        {/* Enhanced AED Info */}
        {selectedAED && (
          <Card className="border-0 bg-white/90 backdrop-blur-sm shadow-xl">
            <CardContent className="p-6">
              <div className="flex items-start gap-4 mb-4">
                <div className="text-4xl bg-gradient-to-r from-blue-100 to-purple-100 p-3 rounded-xl">
                  {getBuildingIcon(selectedAED.buildingType)}
                </div>
                <div className="flex-1">
                  <h3 className={`font-bold text-gray-800 mb-2 ${jumboText ? "text-2xl" : "text-xl"}`}>
                    {selectedAED.name}
                  </h3>
                  <p className={`text-gray-600 mb-3 ${jumboText ? "text-lg" : "text-base"}`}>
                    {selectedAED.address} • {selectedAED.distance}
                  </p>
                  <div className="flex items-center space-x-2">
                    {selectedAED.verified && (
                      <Badge className="bg-gradient-to-r from-green-500 to-emerald-500 text-white font-bold shadow-lg">
                        EMS VERIFIED
                      </Badge>
                    )}
                    {selectedAED.accessible && (
                      <Badge className="bg-gradient-to-r from-blue-500 to-purple-500 text-white font-bold shadow-lg">
                        ACCESSIBLE
                      </Badge>
                    )}
                    <Badge
                      className={`${getAvailabilityColor(selectedAED.availability)} text-white font-bold shadow-lg`}
                    >
                      {getAvailabilityText(selectedAED.availability)}
                    </Badge>
                  </div>
                </div>
              </div>

              <div className="bg-gray-50 rounded-xl p-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  <div>
                    <p className="text-sm font-bold text-gray-700 mb-1">Access Hours</p>
                    <p className={`text-gray-600 ${jumboText ? "text-base" : "text-sm"}`}>{selectedAED.hours}</p>
                  </div>
                  <div>
                    <p className="text-sm font-bold text-gray-700 mb-1">Last Verified</p>
                    <p className={`text-gray-600 ${jumboText ? "text-base" : "text-sm"}`}>{selectedAED.lastChecked}</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  )

  const renderDirectionsScreen = () => (
    <div
      className={`min-h-screen ${emergencyMode ? "bg-gradient-to-br from-red-100 via-red-50 to-orange-50" : "bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50"} p-4`}
    >
      <div className="max-w-4xl mx-auto">
        {/* Enhanced Header */}
        <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl border-0 p-6 mb-8">
          <div className="flex items-center justify-between">
            <Button
              onClick={() => setCurrentScreen("map")}
              className="bg-white/90 backdrop-blur-sm border-gray-200 hover:bg-gray-50 shadow-lg"
            >
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Map
            </Button>
            <h1
              className={`font-bold bg-gradient-to-r from-red-600 to-orange-600 bg-clip-text text-transparent ${jumboText ? "text-4xl" : "text-3xl"}`}
            >
              Directions
            </h1>
            <Button
              onClick={() => setJumboText(!jumboText)}
              className="bg-white/90 backdrop-blur-sm border-gray-200 hover:bg-gray-50 shadow-lg"
              size="sm"
            >
              <Settings className="h-4 w-4 mr-2" />
              {jumboText ? "Normal" : "Jumbo"}
            </Button>
          </div>
        </div>

        {/* Enhanced Step-by-step directions */}
        <div className="space-y-6 mb-8">
          {[
            { step: 1, instruction: "Head north on Smith St", distance: "100 ft" },
            { step: 2, instruction: "Turn left onto King St", distance: "200 ft" },
            { step: 3, instruction: `${selectedAED?.name || "Destination"} will be on the right`, distance: "50 ft" },
          ].map((direction, index) => (
            <Card
              key={index}
              className="border-0 bg-white/90 backdrop-blur-sm shadow-xl hover:shadow-2xl transition-all duration-300"
              style={{
                animationDelay: `${index * 200}ms`,
                animation: "fadeInUp 0.6s ease-out forwards",
              }}
            >
              <CardContent className="p-6">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center flex-shrink-0 shadow-lg">
                    <span className="text-white font-bold text-lg">{direction.step}</span>
                  </div>
                  <div className="flex-1">
                    <p className={`text-gray-800 font-bold ${jumboText ? "text-xl" : "text-lg"}`}>
                      {direction.instruction}
                    </p>
                    <p className={`text-gray-600 ${jumboText ? "text-lg" : "text-base"}`}>{direction.distance}</p>
                  </div>
                  <Navigation className="w-6 h-6 text-blue-500" />
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Enhanced Action Button */}
        <Button
          onClick={() => setCurrentScreen("info")}
          className={`w-full bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600 text-white font-bold shadow-2xl ${jumboText ? "text-2xl py-6" : "text-xl py-4"}`}
        >
          <ExternalLink className="mr-3 h-6 w-6" />
          OPEN IN MAPS APP
        </Button>
      </div>
    </div>
  )

  const renderInfoScreen = () => (
    <div
      className={`min-h-screen ${emergencyMode ? "bg-gradient-to-br from-red-100 via-red-50 to-orange-50" : "bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50"} p-4`}
    >
      <div className="max-w-4xl mx-auto">
        {/* Enhanced Header */}
        <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl border-0 p-6 mb-8">
          <div className="flex items-center justify-between">
            <Button
              onClick={() => setCurrentScreen("directions")}
              className="bg-white/90 backdrop-blur-sm border-gray-200 hover:bg-gray-50 shadow-lg"
            >
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Directions
            </Button>
            <h1
              className={`font-bold bg-gradient-to-r from-red-600 to-orange-600 bg-clip-text text-transparent ${jumboText ? "text-4xl" : "text-3xl"}`}
            >
              AED Information
            </h1>
            <Button
              onClick={() => setJumboText(!jumboText)}
              className="bg-white/90 backdrop-blur-sm border-gray-200 hover:bg-gray-50 shadow-lg"
              size="sm"
            >
              <Settings className="h-4 w-4 mr-2" />
              {jumboText ? "Normal" : "Jumbo"}
            </Button>
          </div>
        </div>

        {selectedAED && (
          <div className="space-y-6">
            <Card className="border-0 bg-white/90 backdrop-blur-sm shadow-xl">
              <CardHeader className="bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-t-xl">
                <div className="flex items-center gap-4">
                  <div className="text-4xl bg-white/20 p-3 rounded-xl">{getBuildingIcon(selectedAED.buildingType)}</div>
                  <div>
                    <CardTitle className={`text-white ${jumboText ? "text-3xl" : "text-2xl"}`}>
                      {selectedAED.name}
                    </CardTitle>
                    <p className={`text-white/90 ${jumboText ? "text-xl" : "text-lg"}`}>{selectedAED.address}</p>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="p-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                  <div className="bg-gray-50 rounded-xl p-4">
                    <p className="text-sm font-bold text-gray-700 mb-2">Distance & Time</p>
                    <p className={`text-gray-800 font-bold ${jumboText ? "text-xl" : "text-lg"}`}>
                      {selectedAED.distance}
                    </p>
                    <p className={`text-gray-600 ${jumboText ? "text-lg" : "text-base"}`}>
                      {selectedAED.walkTime} minute walk
                    </p>
                  </div>
                  <div className="bg-gray-50 rounded-xl p-4">
                    <p className="text-sm font-bold text-gray-700 mb-2">Access Hours</p>
                    <p className={`text-gray-800 ${jumboText ? "text-lg" : "text-base"}`}>{selectedAED.hours}</p>
                  </div>
                </div>

                {selectedAED.instructions && (
                  <div className="bg-blue-50 rounded-xl p-4 mb-6">
                    <p className="text-sm font-bold text-blue-700 mb-2">Location Details</p>
                    <p className={`text-blue-800 ${jumboText ? "text-lg" : "text-base"}`}>{selectedAED.instructions}</p>
                  </div>
                )}

                <div className="flex flex-wrap gap-3 mb-6">
                  {selectedAED.verified && (
                    <Badge className="bg-gradient-to-r from-green-500 to-emerald-500 text-white font-bold px-4 py-2 shadow-lg">
                      EMS VERIFIED
                    </Badge>
                  )}
                  {selectedAED.accessible && (
                    <Badge className="bg-gradient-to-r from-blue-500 to-purple-500 text-white font-bold px-4 py-2 shadow-lg">
                      ACCESSIBLE
                    </Badge>
                  )}
                  <Badge
                    className={`${getAvailabilityColor(selectedAED.availability)} text-white font-bold px-4 py-2 shadow-lg`}
                  >
                    {getAvailabilityText(selectedAED.availability)}
                  </Badge>
                </div>

                <div className="text-center">
                  <p className={`text-gray-500 ${jumboText ? "text-base" : "text-sm"}`}>
                    Last verified: {selectedAED.lastChecked}
                  </p>
                </div>
              </CardContent>
            </Card>

            <Button
              className={`w-full bg-gradient-to-r from-red-500 to-orange-500 hover:from-red-600 hover:to-orange-600 text-white font-bold shadow-2xl ${jumboText ? "text-2xl py-6" : "text-xl py-4"}`}
            >
              <AlertTriangle className="mr-3 h-6 w-6" />
              REPORT ISSUE WITH THIS AED
            </Button>
          </div>
        )}
      </div>
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
