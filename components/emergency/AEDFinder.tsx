"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import {
  MapPin,
  Navigation,
  Phone,
  Clock,
  Zap,
  AlertTriangle,
  CheckCircle,
  ArrowRight,
  Search,
  RefreshCw,
} from "lucide-react"

interface AEDLocation {
  id: string
  name: string
  address: string
  distance: number
  walkTime: number
  availability: "available" | "in-use" | "maintenance" | "unknown"
  accessHours: string
  instructions: string
  lastChecked: string
  coordinates: { lat: number; lng: number }
  buildingType: "hospital" | "school" | "mall" | "office" | "gym" | "community" | "transit"
  accessCode?: string
  contactPhone?: string
}

interface AEDFinderProps {
  onAEDSelected?: (aed: AEDLocation) => void
  onBack?: () => void
  emergencyMode?: boolean
}

export default function AEDFinder({ onAEDSelected, onBack, emergencyMode = false }: AEDFinderProps) {
  const [userLocation, setUserLocation] = useState<{ lat: number; lng: number } | null>(null)
  const [nearbyAEDs, setNearbyAEDs] = useState<AEDLocation[]>([])
  const [selectedAED, setSelectedAED] = useState<AEDLocation | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [locationError, setLocationError] = useState<string | null>(null)
  const [searchRadius, setSearchRadius] = useState(1) // km

  // Mock AED data - in real app this would come from API
  const mockAEDs: AEDLocation[] = [
    {
      id: "aed-001",
      name: "Vancouver General Hospital - Main Entrance",
      address: "899 W 12th Ave, Vancouver, BC",
      distance: 0.3,
      walkTime: 4,
      availability: "available",
      accessHours: "24/7",
      instructions: "Located in main lobby, left of information desk",
      lastChecked: "2025-01-20T10:30:00Z",
      coordinates: { lat: 49.2606, lng: -123.1216 },
      buildingType: "hospital",
      contactPhone: "+1-604-875-4111",
    },
    {
      id: "aed-002",
      name: "Queen Elizabeth Theatre",
      address: "630 Hamilton St, Vancouver, BC",
      distance: 0.5,
      walkTime: 6,
      availability: "available",
      accessHours: "Event hours only",
      instructions: "Box office lobby, mounted on wall near restrooms",
      lastChecked: "2025-01-19T14:15:00Z",
      coordinates: { lat: 49.282, lng: -123.1171 },
      buildingType: "community",
      accessCode: "2580",
    },
    {
      id: "aed-003",
      name: "Pacific Centre Mall - Food Court",
      address: "701 W Georgia St, Vancouver, BC",
      distance: 0.7,
      walkTime: 9,
      availability: "available",
      accessHours: "Mall hours: 10AM-9PM",
      instructions: "Food court level, near customer service",
      lastChecked: "2025-01-20T09:00:00Z",
      coordinates: { lat: 49.2845, lng: -123.1156 },
      buildingType: "mall",
    },
    {
      id: "aed-004",
      name: "SkyTrain Stadium-Chinatown Station",
      address: "150 Dunsmuir St, Vancouver, BC",
      distance: 0.8,
      walkTime: 10,
      availability: "in-use",
      accessHours: "Transit hours: 5AM-1AM",
      instructions: "Concourse level, near fare gates",
      lastChecked: "2025-01-20T08:45:00Z",
      coordinates: { lat: 49.2794, lng: -123.1094 },
      buildingType: "transit",
    },
    {
      id: "aed-005",
      name: "YMCA Downtown",
      address: "955 Burrard St, Vancouver, BC",
      distance: 1.2,
      walkTime: 15,
      availability: "maintenance",
      accessHours: "6AM-10PM",
      instructions: "Main gym entrance, wall-mounted",
      lastChecked: "2025-01-18T16:20:00Z",
      coordinates: { lat: 49.2781, lng: -123.1207 },
      buildingType: "gym",
    },
  ]

  useEffect(() => {
    getCurrentLocation()
  }, [])

  useEffect(() => {
    if (userLocation) {
      findNearbyAEDs()
    }
  }, [userLocation, searchRadius])

  const getCurrentLocation = () => {
    setIsLoading(true)

    if (!navigator.geolocation) {
      setLocationError("Geolocation not supported by this browser")
      setIsLoading(false)
      return
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        setUserLocation({
          lat: position.coords.latitude,
          lng: position.coords.longitude,
        })
        setLocationError(null)
        setIsLoading(false)
      },
      (error) => {
        setLocationError("Unable to get your location. Using default area.")
        // Default to Vancouver downtown for demo
        setUserLocation({ lat: 49.2827, lng: -123.1207 })
        setIsLoading(false)
      },
      { enableHighAccuracy: true, timeout: 10000, maximumAge: 300000 },
    )
  }

  const findNearbyAEDs = () => {
    if (!userLocation) return

    // Filter and sort AEDs by distance
    const filtered = mockAEDs.filter((aed) => aed.distance <= searchRadius).sort((a, b) => a.distance - b.distance)

    setNearbyAEDs(filtered)
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

  const handleGetDirections = (aed: AEDLocation) => {
    const url = `https://www.google.com/maps/dir/?api=1&destination=${aed.coordinates.lat},${aed.coordinates.lng}&travelmode=walking`
    window.open(url, "_blank")
  }

  const handleCallLocation = (phone: string) => {
    window.location.href = `tel:${phone}`
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

  return (
    <div
      className={`min-h-screen ${emergencyMode ? "bg-gradient-to-br from-red-100 via-red-50 to-orange-50" : "bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50"} p-4`}
    >
      <div className="max-w-6xl mx-auto">
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
                <h1 className="text-3xl font-bold bg-gradient-to-r from-red-600 to-orange-600 bg-clip-text text-transparent">
                  AED Finder™
                </h1>
                <p className="text-gray-600 text-lg">Automated External Defibrillators Near You</p>
              </div>
            </div>
            {onBack && (
              <Button
                onClick={onBack}
                variant="outline"
                className="bg-white/90 backdrop-blur-sm border-gray-200 hover:bg-gray-50 shadow-lg"
              >
                ← Back
              </Button>
            )}
          </div>
        </div>

        {emergencyMode && (
          <Card className="mb-8 border-0 bg-gradient-to-r from-red-500 to-orange-500 shadow-2xl">
            <CardContent className="p-6">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center animate-pulse">
                  <AlertTriangle className="w-6 h-6 text-white" />
                </div>
                <div className="flex-1">
                  <h3 className="font-bold text-white text-xl mb-1">EMERGENCY MODE ACTIVE</h3>
                  <p className="text-white/90 text-lg">Call 911 first, then get the nearest AED if needed</p>
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

        <Card className="mb-8 border-0 bg-white/80 backdrop-blur-sm shadow-xl">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-500 rounded-xl flex items-center justify-center">
                  <MapPin className="w-6 h-6 text-white" />
                </div>
                <div>
                  <p className="font-bold text-gray-800 text-lg">Your Location</p>
                  <p className="text-gray-600">{locationError ? locationError : "Location found successfully"}</p>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-2">
                  <span className="text-gray-600 font-medium">Search radius:</span>
                  <select
                    value={searchRadius}
                    onChange={(e) => setSearchRadius(Number(e.target.value))}
                    className="border-2 border-gray-200 rounded-lg px-3 py-2 bg-white shadow-sm focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
                  >
                    <option value={0.5}>0.5 km</option>
                    <option value={1}>1 km</option>
                    <option value={2}>2 km</option>
                    <option value={5}>5 km</option>
                  </select>
                </div>
                <Button
                  onClick={getCurrentLocation}
                  variant="outline"
                  size="sm"
                  className="bg-white/90 backdrop-blur-sm border-gray-200 hover:bg-gray-50 shadow-lg"
                >
                  <RefreshCw className="w-4 h-4 mr-2" />
                  Refresh
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <h2 className="text-2xl font-bold text-gray-800">Nearby AEDs</h2>
            <Badge className="bg-gradient-to-r from-green-500 to-emerald-500 text-white px-3 py-1 text-lg font-bold shadow-lg">
              {nearbyAEDs.length} found
            </Badge>
          </div>
          <div className="flex items-center gap-2">
            <Search className="w-5 h-5 text-gray-400" />
            <span className="text-gray-600">Showing closest results</span>
          </div>
        </div>

        {nearbyAEDs.length === 0 ? (
          <Card className="border-0 bg-white/80 backdrop-blur-sm shadow-xl">
            <CardContent className="p-12 text-center">
              <div className="w-24 h-24 bg-gradient-to-r from-gray-300 to-gray-400 rounded-2xl flex items-center justify-center mx-auto mb-6">
                <Zap className="w-12 h-12 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-gray-600 mb-3">No AEDs Found</h3>
              <p className="text-gray-500 mb-6 text-lg">
                Try expanding your search radius or check your location settings.
              </p>
              <Button
                onClick={() => setSearchRadius(5)}
                className="bg-gradient-to-r from-red-500 to-orange-500 hover:from-red-600 hover:to-orange-600 text-white px-8 py-3 text-lg font-bold shadow-lg"
              >
                Search 5km Radius
              </Button>
            </CardContent>
          </Card>
        ) : (
          <div className="grid gap-6">
            {nearbyAEDs.map((aed, index) => (
              <Card
                key={aed.id}
                className={`transition-all duration-300 hover:shadow-2xl hover:scale-[1.02] border-0 bg-white/90 backdrop-blur-sm ${
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
              >
                <CardHeader className="pb-4">
                  <div className="flex items-start justify-between">
                    <div className="flex items-start gap-4">
                      <div className="text-4xl bg-gradient-to-r from-blue-100 to-purple-100 p-3 rounded-xl">
                        {getBuildingIcon(aed.buildingType)}
                      </div>
                      <div className="flex-1">
                        <CardTitle className="text-xl text-gray-800 mb-2">{aed.name}</CardTitle>
                        <p className="text-gray-600 text-base mb-3">{aed.address}</p>

                        <div className="flex items-center gap-6 mb-3">
                          <div className="flex items-center gap-2 bg-blue-50 px-3 py-1 rounded-full">
                            <MapPin className="w-4 h-4 text-blue-600" />
                            <span className="text-sm font-bold text-blue-800">{aed.distance} km</span>
                          </div>
                          <div className="flex items-center gap-2 bg-green-50 px-3 py-1 rounded-full">
                            <Clock className="w-4 h-4 text-green-600" />
                            <span className="text-sm font-bold text-green-800">{aed.walkTime} min walk</span>
                          </div>
                        </div>
                      </div>
                    </div>

                    <Badge
                      className={`${
                        aed.availability === "available"
                          ? "bg-gradient-to-r from-green-500 to-emerald-500"
                          : aed.availability === "in-use"
                            ? "bg-gradient-to-r from-yellow-500 to-orange-500"
                            : "bg-gradient-to-r from-red-500 to-pink-500"
                      } text-white font-bold px-4 py-2 text-sm shadow-lg`}
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
                        <p className="text-sm text-gray-600">{aed.accessHours}</p>
                      </div>
                      {aed.accessCode && (
                        <div>
                          <p className="text-sm font-bold text-blue-700 mb-1">Access Code</p>
                          <p className="text-sm text-blue-600 font-mono bg-blue-50 px-2 py-1 rounded">
                            {aed.accessCode}
                          </p>
                        </div>
                      )}
                    </div>

                    <div className="mt-3 pt-3 border-t border-gray-200">
                      <p className="text-sm font-bold text-gray-700 mb-1">Location Details</p>
                      <p className="text-sm text-gray-600">{aed.instructions}</p>
                    </div>
                  </div>

                  <div className="flex gap-3 flex-wrap">
                    <Button
                      onClick={() => handleGetDirections(aed)}
                      className="bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white flex-1 min-w-[140px] shadow-lg"
                      disabled={aed.availability === "maintenance"}
                    >
                      <Navigation className="w-4 h-4 mr-2" />
                      Get Directions
                    </Button>

                    {aed.contactPhone && (
                      <Button
                        onClick={() => handleCallLocation(aed.contactPhone!)}
                        variant="outline"
                        className="bg-white/90 backdrop-blur-sm border-gray-200 hover:bg-gray-50 shadow-lg"
                      >
                        <Phone className="w-4 h-4 mr-2" />
                        Call
                      </Button>
                    )}

                    {onAEDSelected && aed.availability === "available" && (
                      <Button
                        onClick={() => {
                          setSelectedAED(aed)
                          onAEDSelected(aed)
                        }}
                        className="bg-gradient-to-r from-red-500 to-orange-500 hover:from-red-600 hover:to-orange-600 text-white shadow-lg"
                      >
                        <ArrowRight className="w-4 h-4 mr-2" />
                        Select AED
                      </Button>
                    )}
                  </div>

                  <div className="mt-4 pt-4 border-t border-gray-200">
                    <div className="flex items-center justify-between">
                      <p className="text-xs text-gray-500">
                        Last verified: {new Date(aed.lastChecked).toLocaleDateString()} at{" "}
                        {new Date(aed.lastChecked).toLocaleTimeString()}
                      </p>
                      <div className="flex items-center gap-1">
                        <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                        <span className="text-xs text-green-600 font-medium">Live Status</span>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}

        <Card className="mt-12 border-0 bg-gradient-to-r from-red-50 to-orange-50 shadow-xl">
          <CardHeader className="bg-gradient-to-r from-red-500 to-orange-500 text-white rounded-t-xl">
            <CardTitle className="text-xl flex items-center gap-3">
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
                  <span className="text-gray-700 font-medium">{instruction}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <div className="mt-8 p-6 bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl border-0">
          <p className="text-sm text-gray-600 text-center leading-relaxed">
            ⚠️ AED locations are provided for informational purposes only. Always call 911 first. Availability and access
            may change without notice. Verify AED functionality before use.
          </p>
        </div>
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
}
