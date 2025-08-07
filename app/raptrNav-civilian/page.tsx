"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ArrowLeft, MapPin, Satellite, Radio, Wifi, WifiOff, Navigation, AlertTriangle, CheckCircle } from 'lucide-react'

type NetworkMode = 'lte' | 'mesh' | 'satellite' | 'lab'

export default function RAPTRNavCivilianPage() {
  const [networkMode, setNetworkMode] = useState<NetworkMode>('lte')
  const [isOffline, setIsOffline] = useState(false)
  const [location, setLocation] = useState<{ lat: number; lng: number } | null>(null)
  const [nearestSafe, setNearestSafe] = useState<string | null>(null)
  const [routeStatus, setRouteStatus] = useState<'idle' | 'calculating' | 'ready' | 'navigating'>('idle')

  useEffect(() => {
    // Simulate network detection
    const timer = setTimeout(() => {
      if (Math.random() > 0.7) {
        setNetworkMode('mesh')
        setIsOffline(true)
      }
    }, 2000)
    return () => clearTimeout(timer)
  }, [])

  useEffect(() => {
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(
        (pos) => {
          setLocation({ lat: pos.coords.latitude, lng: pos.coords.longitude })
          // Mock nearest safe location
          setNearestSafe("Community Center - 0.8km NE")
        },
        () => setLocation(null)
      )
    }
  }, [])

  const handleFindSafeLocation = () => {
    setRouteStatus('calculating')
    setTimeout(() => {
      setRouteStatus('ready')
      setNearestSafe("Community Center - 0.8km NE • Fire Station - 1.2km SW")
    }, 2000)
  }

  const handleStartNavigation = () => {
    setRouteStatus('navigating')
  }

  const handleSendLocation = () => {
    alert(`Location sent via ${networkMode.toUpperCase()} network to registered responders`)
  }

  const handleActivateLAB = () => {
    setNetworkMode('lab')
    alert("LAB Beacon activated. Last known coordinates transmitted via emergency frequency.")
  }

  return (
    <main className="min-h-screen bg-gradient-to-br from-blue-50 to-slate-50">
      <header className="sticky top-0 z-10 border-b bg-white/90 backdrop-blur">
        <div className="container mx-auto px-4 py-3 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Link href="/landing">
              <Button variant="outline" className="border-2">
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back
              </Button>
            </Link>
            <h1 className="text-xl font-bold">RAPTRnav™ Civilian</h1>
          </div>
          <Badge className={`border-2 ${isOffline ? 'bg-amber-100 text-amber-800 border-amber-600' : 'bg-emerald-100 text-emerald-800 border-emerald-600'}`}>
            {isOffline ? 'Offline Mode' : 'Online'}
          </Badge>
        </div>
      </header>

      <section className="container mx-auto px-4 py-6 space-y-6">
        {/* Network Status */}
        <Card className="border-l-8 border-l-blue-600">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Navigation className="h-5 w-5 text-blue-700" />
              Network Status & Routing
            </CardTitle>
            <CardDescription>
              Automatic fallback: LTE → Mesh → Satellite → LAB Beacon
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
              <div className={`p-4 rounded-lg border-2 text-center ${networkMode === 'lte' ? 'bg-emerald-100 border-emerald-600' : 'bg-slate-100 border-slate-300'}`}>
                <Wifi className={`h-6 w-6 mx-auto mb-2 ${networkMode === 'lte' ? 'text-emerald-700' : 'text-slate-500'}`} />
                <div className="font-semibold">LTE</div>
                <div className="text-xs">{networkMode === 'lte' ? 'Active' : 'Unavailable'}</div>
              </div>
              <div className={`p-4 rounded-lg border-2 text-center ${networkMode === 'mesh' ? 'bg-blue-100 border-blue-600' : 'bg-slate-100 border-slate-300'}`}>
                <Radio className={`h-6 w-6 mx-auto mb-2 ${networkMode === 'mesh' ? 'text-blue-700' : 'text-slate-500'}`} />
                <div className="font-semibold">Mesh</div>
                <div className="text-xs">{networkMode === 'mesh' ? 'Active' : 'Standby'}</div>
              </div>
              <div className={`p-4 rounded-lg border-2 text-center ${networkMode === 'satellite' ? 'bg-purple-100 border-purple-600' : 'bg-slate-100 border-slate-300'}`}>
                <Satellite className={`h-6 w-6 mx-auto mb-2 ${networkMode === 'satellite' ? 'text-purple-700' : 'text-slate-500'}`} />
                <div className="font-semibold">Satellite</div>
                <div className="text-xs">{networkMode === 'satellite' ? 'Active' : 'Standby'}</div>
              </div>
              <div className={`p-4 rounded-lg border-2 text-center ${networkMode === 'lab' ? 'bg-red-100 border-red-600' : 'bg-slate-100 border-slate-300'}`}>
                <WifiOff className={`h-6 w-6 mx-auto mb-2 ${networkMode === 'lab' ? 'text-red-700' : 'text-slate-500'}`} />
                <div className="font-semibold">LAB</div>
                <div className="text-xs">{networkMode === 'lab' ? 'Beacon Active' : 'Emergency Only'}</div>
              </div>
            </div>

            <div className="flex flex-wrap gap-3">
              <Button 
                onClick={() => setNetworkMode('mesh')}
                className="bg-blue-600 hover:bg-blue-700 text-white border-2 border-black"
              >
                Switch to Mesh
              </Button>
              <Button 
                onClick={() => setNetworkMode('satellite')}
                className="bg-purple-600 hover:bg-purple-700 text-white border-2 border-black"
              >
                Use Satellite
              </Button>
              <Button 
                onClick={handleActivateLAB}
                className="bg-red-600 hover:bg-red-700 text-white border-2 border-black"
              >
                Activate LAB Beacon
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Location & Routing */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card className="border-l-8 border-l-emerald-600">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <MapPin className="h-5 w-5 text-emerald-700" />
                Current Location
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {location ? (
                <div className="p-4 rounded-lg border-2 border-emerald-200 bg-emerald-50">
                  <div className="font-semibold text-emerald-800">GPS Coordinates</div>
                  <div className="text-sm text-emerald-700">
                    {location.lat.toFixed(5)}, {location.lng.toFixed(5)}
                  </div>
                  <div className="text-xs text-emerald-600 mt-2">
                    Signal via: {networkMode.toUpperCase()} network
                  </div>
                </div>
              ) : (
                <div className="p-4 rounded-lg border-2 border-amber-200 bg-amber-50">
                  <div className="font-semibold text-amber-800">Location Unavailable</div>
                  <div className="text-sm text-amber-700">
                    Using last known position for routing
                  </div>
                </div>
              )}

              <div className="flex gap-3">
                <Button 
                  onClick={handleSendLocation}
                  className="bg-emerald-600 hover:bg-emerald-700 text-white border-2 border-black"
                >
                  Send Location to Responders
                </Button>
              </div>
            </CardContent>
          </Card>

          <Card className="border-l-8 border-l-amber-600">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Navigation className="h-5 w-5 text-amber-700" />
                Safe Location Routing
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {nearestSafe && (
                <div className="p-4 rounded-lg border-2 border-amber-200 bg-amber-50">
                  <div className="font-semibold text-amber-800">Nearest Safe Locations</div>
                  <div className="text-sm text-amber-700 mt-1">
                    {nearestSafe}
                  </div>
                </div>
              )}

              <div className="flex flex-wrap gap-3">
                <Button 
                  onClick={handleFindSafeLocation}
                  disabled={routeStatus === 'calculating'}
                  className="bg-amber-600 hover:bg-amber-700 text-white border-2 border-black"
                >
                  {routeStatus === 'calculating' ? 'Calculating...' : 'Find Nearest Safe Location'}
                </Button>
                
                {routeStatus === 'ready' && (
                  <Button 
                    onClick={handleStartNavigation}
                    className="bg-blue-600 hover:bg-blue-700 text-white border-2 border-black"
                  >
                    Start Navigation
                  </Button>
                )}
              </div>

              {routeStatus === 'navigating' && (
                <div className="p-4 rounded-lg border-2 border-blue-200 bg-blue-50">
                  <div className="flex items-center gap-2 text-blue-800">
                    <CheckCircle className="h-4 w-4" />
                    <span className="font-semibold">Navigation Active</span>
                  </div>
                  <div className="text-sm text-blue-700 mt-1">
                    Route optimized for {networkMode} network conditions
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        {/* Offline Mode Features */}
        {isOffline && (
          <Card className="border-l-8 border-l-red-600">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <AlertTriangle className="h-5 w-5 text-red-700" />
                Offline Mode Active
              </CardTitle>
              <CardDescription>
                Limited connectivity detected. Using cached maps and mesh network.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="p-4 rounded-lg border-2 border-slate-200 bg-slate-50">
                  <div className="font-semibold text-slate-800">Cached Maps</div>
                  <div className="text-sm text-slate-600">Available for 50km radius</div>
                </div>
                <div className="p-4 rounded-lg border-2 border-blue-200 bg-blue-50">
                  <div className="font-semibold text-blue-800">Mesh Network</div>
                  <div className="text-sm text-blue-600">3 nodes detected nearby</div>
                </div>
                <div className="p-4 rounded-lg border-2 border-amber-200 bg-amber-50">
                  <div className="font-semibold text-amber-800">Emergency Protocols</div>
                  <div className="text-sm text-amber-600">LAB beacon ready</div>
                </div>
              </div>

              <div className="p-4 rounded-lg border-2 border-red-200 bg-red-50">
                <div className="font-semibold text-red-800 mb-2">Emergency LAB Beacon</div>
                <div className="text-sm text-red-700 mb-3">
                  If all networks fail, activate the LAB (Last Available Beacon) to transmit 
                  your last known coordinates via emergency frequency.
                </div>
                <Button 
                  onClick={handleActivateLAB}
                  className="bg-red-600 hover:bg-red-700 text-white border-2 border-black"
                >
                  Activate Emergency Beacon
                </Button>
              </div>
            </CardContent>
          </Card>
        )}
      </section>
    </main>
  )
}
