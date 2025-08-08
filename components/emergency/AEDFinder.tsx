"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { MapPin, Navigation, Phone, Clock, Zap, AlertTriangle, CheckCircle, ArrowRight, Landmark } from 'lucide-react'
import TLRTBanner from "@/components/common/tlrt-banner"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"

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
  const [showLand, setShowLand] = useState(false)

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
        return "bg-green-600"
      case "in-use":
        return "bg-yellow-600"
      case "maintenance":
        return "bg-red-600"
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
      <div className="min-h-screen bg-red-50 flex items-center justify-center p-4">
        <Card className="w-full max-w-md">
          <CardContent className="p-8 text-center">
            <div className="w-16 h-16 mx-auto mb-4 border-4 border-red-600 border-t-transparent rounded-full animate-spin"></div>
            <h2 className="text-xl font-bold text-red-800 mb-2">Finding Nearby AEDs</h2>
            <p className="text-gray-600">Getting your location and searching for AED devices...</p>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className={`min-h-screen ${emergencyMode ? "bg-red-50" : "bg-gray-50"} p-4`}>
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <Zap className="w-8 h-8 text-red-600" />
            <div>
              <h1 className="text-2xl font-bold text-red-800">AED Finder</h1>
              <p className="text-sm text-gray-600">Automated External Defibrillators Near You</p>
            </div>
          </div>
          {onBack && (
            <Button onClick={onBack} variant="outline" className="bg-white">
              ← Back
            </Button>
          )}
          <div className="flex items-center gap-2">
            <Landmark className="w-4 h-4 text-purple-700" />
            <Switch id="land" checked={showLand} onCheckedChange={setShowLand} />
            <Label htmlFor="land" className="text-sm">Land Overview</Label>
          </div>
        </div>

        {/* Emergency Alert */}
        {showLand ? <TLRTBanner className="mb-4" /> : null}
        {emergencyMode && (
          <Card className="mb-6 border-red-500 bg-red-100">
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <AlertTriangle className="w-6 h-6 text-red-600" />
                <div>
                  <h3 className="font-bold text-red-800">EMERGENCY MODE ACTIVE</h3>
                  <p className="text-red-700">Call 911 first, then get the nearest AED if needed</p>
                </div>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Location Status */}
        <Card className="mb-6">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <MapPin className="w-5 h-5 text-blue-600" />
                <div>
                  <p className="font-semibold">Your Location</p>
                  <p className="text-sm text-gray-600">{locationError ? locationError : "Location found"}</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-sm text-gray-600">Search radius:</span>
                <select
                  value={searchRadius}
                  onChange={(e) => setSearchRadius(Number(e.target.value))}
                  className="border rounded px-2 py-1 text-sm"
                >
                  <option value={0.5}>0.5 km</option>
                  <option value={1}>1 km</option>
                  <option value={2}>2 km</option>
                  <option value={5}>5 km</option>
                </select>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* AED List */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-bold text-gray-800">Nearby AEDs ({nearbyAEDs.length} found)</h2>
            <Button onClick={getCurrentLocation} variant="outline" size="sm" className="bg-white">
              🔄 Refresh
            </Button>
          </div>

          {nearbyAEDs.length === 0 ? (
            <Card>
              <CardContent className="p-8 text-center">
                <Zap className="w-16 h-16 mx-auto mb-4 text-gray-400" />
                <h3 className="text-lg font-semibold text-gray-600 mb-2">No AEDs Found</h3>
                <p className="text-gray-500 mb-4">Try expanding your search radius or check your location settings.</p>
                <Button onClick={() => setSearchRadius(5)} className="bg-red-600 hover:bg-red-700">
                  Search 5km Radius
                </Button>
              </CardContent>
            </Card>
          ) : (
            nearbyAEDs.map((aed) => (
              <Card
                key={aed.id}
                className={`transition-all duration-200 hover:shadow-lg ${
                  selectedAED?.id === aed.id ? "ring-2 ring-red-500" : ""
                } ${
                  aed.availability === "available"
                    ? "border-green-200"
                    : aed.availability === "in-use"
                      ? "border-yellow-200"
                      : "border-red-200"
                }`}
              >
                <CardHeader className="pb-3">
                  <div className="flex items-start justify-between">
                    <div className="flex items-start gap-3">
                      <div className="text-2xl">{getBuildingIcon(aed.buildingType)}</div>
                      <div>
                        <CardTitle className="text-lg text-gray-800">{aed.name}</CardTitle>
                        <p className="text-sm text-gray-600">{aed.address}</p>
                      </div>
                    </div>
                    <Badge className={`${getAvailabilityColor(aed.availability)} text-white`}>
                      {getAvailabilityText(aed.availability)}
                    </Badge>
                  </div>
                </CardHeader>

                <CardContent className="pt-0">
                  {/* Distance and Time */}
                  <div className="flex items-center gap-4 mb-3">
                    <div className="flex items-center gap-1">
                      <MapPin className="w-4 h-4 text-gray-500" />
                      <span className="text-sm font-semibold">{aed.distance} km</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Clock className="w-4 h-4 text-gray-500" />
                      <span className="text-sm">{aed.walkTime} min walk</span>
                    </div>
                  </div>

                  {/* Access Hours */}
                  <div className="mb-3">
                    <p className="text-sm text-gray-600">
                      <strong>Access:</strong> {aed.accessHours}
                    </p>
                    {aed.accessCode && (
                      <p className="text-sm text-blue-600">
                        <strong>Access Code:</strong> {aed.accessCode}
                      </p>
                    )}
                  </div>

                  {/* Instructions */}
                  <div className="mb-4">
                    <p className="text-sm text-gray-700">
                      <strong>Location:</strong> {aed.instructions}
                    </p>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex gap-2 flex-wrap">
                    <Button
                      onClick={() => handleGetDirections(aed)}
                      className="bg-blue-600 hover:bg-blue-700 text-white flex-1"
                      disabled={aed.availability === "maintenance"}
                    >
                      <Navigation className="w-4 h-4 mr-2" />
                      Get Directions
                    </Button>

                    {aed.contactPhone && (
                      <Button
                        onClick={() => handleCallLocation(aed.contactPhone!)}
                        variant="outline"
                        className="bg-white"
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
                        className="bg-red-600 hover:bg-red-700 text-white"
                      >
                        <ArrowRight className="w-4 h-4 mr-2" />
                        Select AED
                      </Button>
                    )}
                  </div>

                  {/* Last Checked */}
                  <div className="mt-3 pt-3 border-t border-gray-200">
                    <p className="text-xs text-gray-500">
                      Last checked: {new Date(aed.lastChecked).toLocaleDateString()} at{" "}
                      {new Date(aed.lastChecked).toLocaleTimeString()}
                    </p>
                  </div>
                </CardContent>
              </Card>
            ))
          )}
        </div>

        {/* Emergency Instructions */}
        <Card className="mt-8 border-red-200 bg-red-50">
          <CardHeader>
            <CardTitle className="text-red-800 flex items-center gap-2">
              <AlertTriangle className="w-5 h-5" />
              AED Usage Instructions
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2 text-sm text-red-700">
              <div className="flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-red-600" />
                <span>Call 911 first before getting AED</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-red-600" />
                <span>Turn on AED and follow voice prompts</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-red-600" />
                <span>Attach pads as shown in diagrams</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-red-600" />
                <span>Stand clear when AED analyzes and shocks</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-red-600" />
                <span>Continue CPR between AED cycles</span>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Legal Disclaimer */}
        <div className="mt-6 p-4 bg-gray-100 rounded-lg">
          <p className="text-xs text-gray-600 text-center">
            ⚠️ AED locations are provided for informational purposes only. Always call 911 first. Availability and access
            may change without notice. Verify AED functionality before use.
          </p>
        </div>
      </div>
    </div>
  )
}
