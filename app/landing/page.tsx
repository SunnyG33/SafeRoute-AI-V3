"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useToast } from "@/hooks/use-toast"
import HeroModeRedesigned from "@/components/emergency/HeroModeRedesigned"
import Link from "next/link"
import {
  Shield,
  Satellite,
  Heart,
  Users,
  MapPin,
  Globe,
  AlertTriangle,
  CheckCircle,
  Star,
  ArrowRight,
  Wifi,
  Radio,
  Navigation,
  Activity,
  Crown,
  Zap,
} from "lucide-react"

export default function SafeRouteAILanding() {
  const [activeDemo, setActiveDemo] = useState("mobile")
  const [isLoading, setIsLoading] = useState(true)
  const { toast } = useToast()
  const [showHeroMode, setShowHeroMode] = useState(false)

  useEffect(() => {
    // Simulate loading
    const timer = setTimeout(() => setIsLoading(false), 2000)
    return () => clearTimeout(timer)
  }, [])

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-[#2E3192] via-[#1E40AF] to-[#1BFFFF] flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-white mb-4"></div>
          <h2 className="text-2xl font-bold text-white mb-2">SafeRoute AI</h2>
          <p className="text-slate-200">Loading emergency response platform...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-black">
      {/* Custom CSS for slower pulse animation */}
      <style jsx>{`
        @keyframes slow-pulse {
          0%, 100% {
            opacity: 1;
          }
          50% {
            opacity: 0.7;
          }
        }
        .slow-pulse {
          animation: slow-pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite;
        }
      `}</style>

      {/* Hero Mode Overlay */}
      {showHeroMode && (
        <div className="fixed inset-0 z-50 overflow-y-auto bg-black">
          <HeroModeRedesigned onExit={() => setShowHeroMode(false)} />
        </div>
      )}

      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <div className="relative container mx-auto px-4 py-20">
          <div className="text-center max-w-4xl mx-auto">
            {/* Top Left - Elder Portal Button */}
            <div className="absolute top-4 left-4">
              <Link href="/elder-portal">
                <Button
                  size="lg"
                  className="border-amber-600 text-amber-600 hover:bg-amber-100 px-8 py-4 bg-amber-50 border-4"
                >
                  <Crown className="w-5 h-5 mr-2" />
                  Elder Council Portal
                </Button>
              </Link>
            </div>

            {/* Top Right - Government Dashboard Button */}
            <div className="absolute top-4 right-4">
              <Link href="/government-dashboard">
                <Button
                  size="lg"
                  className="bg-blue-600 hover:bg-blue-700 text-white font-semibold shadow-lg border-4 border-white px-8 py-4"
                >
                  <Activity className="w-5 h-5 mr-2" />
                  Government Dashboard
                </Button>
              </Link>
            </div>

            {/* Bottom Right - Hero Network Button */}
            <div className="absolute bottom-4 right-4">
              <Link href="/community-portal">
                <Button
                  size="lg"
                  className="bg-emerald-600 hover:bg-emerald-700 text-white font-semibold shadow-lg border-4 border-white px-8 py-4"
                >
                  <Users className="w-5 h-5 mr-2" />
                  Community Portal
                </Button>
              </Link>
            </div>

            {/* Bottom Left - AED Finder Button */}
            <div className="absolute bottom-4 left-4">
              <Link href="/aed-finder-complete">
                <Button
                  size="lg"
                  className="bg-slate-700 hover:bg-slate-600 text-white font-semibold shadow-lg border-4 border-white px-8 py-4"
                >
                  <Zap className="mr-2 h-5 w-5" />
                  AED Finder™
                </Button>
              </Link>
            </div>

            <Badge className="mb-6 bg-black text-emerald-300 border-emerald-500/30 text-sm font-semibold border-2">
              🛰️ STARLINK INTEGRATED • L.A.B.™ TECHNOLOGY ENABLED • PATENT PENDING
            </Badge>
            <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 tracking-tight">SafeRoute AI</h1>
            <p className="text-xl md:text-2xl text-slate-200 mb-4 font-medium">
              Emergency Response Platform Trusted by First Responders
            </p>

            <p className="text-lg text-slate-300 mb-8">
              Indigenous-First Design • Satellite Integration • Last-known Auto Beacon Technology
            </p>

            <div className="flex flex-col items-center space-y-4">
              <Link href="/hero-mode-landing">
                <Button
                  size="lg"
                  className="bg-red-600 hover:bg-red-700 text-white font-bold shadow-2xl border-4 border-black px-12 py-6 text-2xl slow-pulse hover:animate-none transition-all duration-300 transform hover:scale-105"
                >
                  <Heart className="mr-4 h-8 w-8" />
                  Emergency Hero Mode
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Key Features Overview - Updated Dark Theme */}
      <section className="py-20 bg-slate-900">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-white mb-4">Life-Saving Technology</h2>
            <p className="text-xl text-slate-300">Five critical innovations working together</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-5 gap-6">
            <Card className="bg-slate-800 border-slate-700 shadow-lg hover:shadow-xl transition-shadow border-l-8 border-l-red-600">
              <CardHeader className="text-center">
                <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4 border-4 border-red-600">
                  <Heart className="h-8 w-8 text-red-600" />
                </div>
                <CardTitle className="text-white">Hero Mode™</CardTitle>
                <CardDescription className="text-slate-300">
                  Voice-guided CPR that turns anyone into a lifesaver in critical moments
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="bg-slate-800 border-slate-700 shadow-lg hover:shadow-xl transition-shadow border-l-8 border-l-yellow-600">
              <CardHeader className="text-center">
                <div className="w-16 h-16 bg-yellow-100 rounded-full flex items-center justify-center mx-auto mb-4 border-4 border-yellow-600">
                  <Zap className="h-8 w-8 text-yellow-600" />
                </div>
                <CardTitle className="text-white">AED Finder™</CardTitle>
                <CardDescription className="text-slate-300">
                  Instant location of nearest AEDs with voice-guided directions and EMS verification
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="bg-slate-800 border-slate-700 shadow-lg hover:shadow-xl transition-shadow border-l-8 border-l-emerald-600">
              <CardHeader className="text-center">
                <div className="w-16 h-16 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-4 border-4 border-emerald-600">
                  <Navigation className="h-8 w-8 text-emerald-600" />
                </div>
                <CardTitle className="text-white">AI Navigation</CardTitle>
                <CardDescription className="text-slate-300">
                  Real-time disaster routing with L.A.B.™ (Last-known Auto Beacon) around wildfires, floods, and
                  hazardous conditions
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="bg-slate-800 border-slate-700 shadow-lg hover:shadow-xl transition-shadow border-l-8 border-l-blue-600">
              <CardHeader className="text-center">
                <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4 border-4 border-blue-600">
                  <Satellite className="h-8 w-8 text-blue-600" />
                </div>
                <CardTitle className="text-white">Starlink Integration</CardTitle>
                <CardDescription className="text-slate-300">
                  Guaranteed connectivity when cellular networks fail during emergencies
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="bg-slate-800 border-slate-700 shadow-lg hover:shadow-xl transition-shadow border-l-8 border-l-amber-600">
              <CardHeader className="text-center">
                <div className="w-16 h-16 bg-amber-100 rounded-full flex items-center justify-center mx-auto mb-4 border-4 border-amber-600">
                  <Radio className="h-8 w-8 text-amber-600" />
                </div>
                <CardTitle className="text-white">L.A.B.™ Technology</CardTitle>
                <CardDescription className="text-slate-300">
                  Last-known Auto Beacon for precise emergency location tracking
                </CardDescription>
              </CardHeader>
            </Card>
          </div>
        </div>
      </section>

      {/* Interactive Demo Section */}
      <section className="py-20 bg-slate-100">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-slate-900 mb-4">Platform Demonstration</h2>
            <p className="text-xl text-slate-600">Experience SafeRoute AI's emergency response capabilities</p>
          </div>

          <Tabs value={activeDemo} onValueChange={setActiveDemo} className="w-full">
            <TabsList className="grid w-full grid-cols-3 bg-white border border-slate-200 shadow-sm">
              <TabsTrigger
                value="mobile"
                className="data-[state=active]:bg-red-50 data-[state=active]:text-red-700 data-[state=active]:border-red-200 data-[state=active]:border-4"
              >
                Mobile App
              </TabsTrigger>
              <TabsTrigger
                value="dashboard"
                className="data-[state=active]:bg-blue-50 data-[state=active]:text-blue-700 data-[state=active]:border-blue-200 data-[state=active]:border-4"
              >
                Gov Dashboard
              </TabsTrigger>
              <TabsTrigger
                value="satellite"
                className="data-[state=active]:bg-amber-50 data-[state=active]:text-amber-700 data-[state=active]:border-amber-200 data-[state=active]:border-4"
              >
                Starlink + L.A.B.
              </TabsTrigger>
            </TabsList>

            <TabsContent value="mobile" className="mt-8">
              <Card className="bg-white border-slate-200 shadow-lg border-l-8 border-l-red-600">
                <CardHeader>
                  <CardTitle className="text-slate-900 flex items-center">
                    <Shield className="mr-2 h-6 w-6 text-red-600" />
                    Mobile Emergency Response App
                  </CardTitle>
                  <CardDescription className="text-slate-600">
                    Critical emergency features with Hero Mode™, Confidence Score™, and disaster-aware routing designed
                    for high-stress situations
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  {/* Beta Disclaimer Banner */}
                  <div className="bg-amber-50 border-4 border-amber-200 rounded-lg p-3 mb-6">
                    <div className="flex items-center">
                      <AlertTriangle className="h-5 w-5 text-amber-600 mr-2" />
                      <p className="text-sm text-amber-800 font-semibold">
                        ⚠️ BETA WARNING: SafeRoute AI is in pilot testing. Data may be incomplete. Use at your own risk.
                      </p>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    {/* Mobile Interface Simulation */}
                    <div className="bg-slate-900 rounded-lg p-6 border-4 border-slate-700">
                      <div className="bg-white rounded-2xl p-4 max-w-sm mx-auto shadow-2xl border-4 border-slate-300">
                        {/* Confidence Score™ Meter */}
                        <div className="mb-4 p-3 bg-slate-50 rounded-lg border-2 border-slate-300">
                          <div className="flex items-center justify-between mb-2">
                            <span className="text-sm font-bold text-slate-700">Confidence Score™</span>
                            <span className="text-lg font-bold text-emerald-600 bg-emerald-100 px-2 py-1 rounded border-2 border-emerald-600">
                              86%
                            </span>
                          </div>
                          <div className="w-full bg-slate-200 rounded-full h-4 mb-1 border-2 border-slate-400">
                            <div
                              className="bg-emerald-500 h-4 rounded-full border-r-2 border-emerald-700"
                              style={{ width: "86%" }}
                            ></div>
                          </div>
                          <p className="text-xs text-slate-600 font-semibold">
                            MODERATE RISK - Based on AQI, fire distance, cell signal, road access
                          </p>
                        </div>

                        {/* Hero Mode Active */}
                        <div className="bg-red-600 text-white p-4 rounded-lg mb-4 border-4 border-black">
                          <Heart className="h-8 w-8 mx-auto mb-2" />
                          <h3 className="font-bold text-center text-lg">HERO MODE™ ACTIVE</h3>
                          <p className="text-sm opacity-90 text-center font-semibold">Voice guidance ready</p>
                        </div>

                        {/* Voice Command Interface */}
                        <div className="mb-4 p-3 bg-blue-50 rounded-lg border-2 border-blue-300">
                          <Button
                            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold mb-2 border-2 border-black"
                            onClick={() => setShowHeroMode(true)}
                          >
                            🎙️ Say "Help Me" to Activate Hero Mode™
                          </Button>
                          <p className="text-xs text-blue-700 text-center font-semibold">
                            Microphone: Always Listening (Beta)
                          </p>
                        </div>

                        {/* Emergency Actions */}
                        <div className="space-y-3 mb-4">
                          <Button className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-bold border-2 border-black">
                            <CheckCircle className="mr-2 h-4 w-4" />
                            I'm Safe - Check In
                          </Button>
                          <Button className="w-full bg-amber-600 hover:bg-amber-700 text-white font-bold border-2 border-black">
                            <AlertTriangle className="mr-2 h-4 w-4" />
                            Need Help
                          </Button>
                          <Button className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold border-2 border-black">
                            <MapPin className="mr-2 h-4 w-4" />
                            Find Safe Route
                          </Button>
                        </div>

                        {/* Satellite Fallback Status */}
                        <div className="p-2 bg-emerald-50 rounded border-2 border-emerald-200 mb-3">
                          <div className="flex items-center justify-between">
                            <span className="text-xs text-emerald-700 font-bold">Starlink Connection Active</span>
                            <Satellite className="h-4 w-4 text-emerald-600" />
                          </div>
                        </div>

                        {/* Offline Mode Indicator */}
                        <div className="p-2 bg-slate-100 rounded text-center border-2 border-slate-300">
                          <p className="text-xs text-slate-600 font-semibold">Offline Mode – Last Synced 22m ago</p>
                          <div className="flex justify-center items-center mt-1">
                            <Wifi className="h-3 w-3 text-slate-500 mr-1" />
                            <span className="text-xs text-slate-500 font-semibold">Signal: 3 Bars</span>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Feature Details */}
                    <div className="space-y-4">
                      {/* Emergency Broadcast Feed */}
                      <Card className="border-red-200 border-l-8 border-l-red-600">
                        <CardHeader className="pb-3">
                          <CardTitle className="text-sm text-red-700 font-bold">🚨 Emergency Broadcast Feed</CardTitle>
                        </CardHeader>
                        <CardContent>
                          <div className="bg-red-50 border-4 border-red-200 rounded-lg p-3 mb-3">
                            <div className="flex items-center justify-between mb-2">
                              <Badge className="bg-red-600 text-white border-2 border-black font-bold">
                                🔴 CRITICAL ALERT
                              </Badge>
                            </div>
                            <p className="text-sm text-red-800 mb-2 font-semibold">
                              "Wildfire 2.1km SE. Evacuate West. Issued by BC Wildfire Service"
                            </p>
                            <Button
                              size="sm"
                              className="bg-red-600 hover:bg-red-700 text-white border-2 border-black font-bold"
                            >
                              <CheckCircle className="mr-1 h-3 w-3" />
                              Got It
                            </Button>
                          </div>
                        </CardContent>
                      </Card>

                      {/* Safe Zones */}
                      <Card className="border-emerald-200 border-l-8 border-l-emerald-600">
                        <CardHeader className="pb-3">
                          <CardTitle className="text-sm text-emerald-700 font-bold">
                            🟢 Safe Zones / Rally Points
                          </CardTitle>
                        </CardHeader>
                        <CardContent>
                          <div className="space-y-2">
                            <div className="flex items-center justify-between p-2 bg-emerald-50 rounded border-2 border-emerald-200">
                              <span className="text-sm font-bold">🟢 Community Center</span>
                              <Badge className="bg-emerald-100 text-emerald-700 border-2 border-emerald-600 font-bold">
                                Gov Verified
                              </Badge>
                            </div>
                            <div className="flex items-center justify-between p-2 bg-blue-50 rounded border-2 border-blue-200">
                              <span className="text-sm font-bold">🔵 School Gymnasium</span>
                              <Badge className="bg-blue-100 text-blue-700 border-2 border-blue-600 font-bold">
                                Community Added
                              </Badge>
                            </div>
                            <p className="text-xs text-slate-600 font-semibold">Last confirmed safe 1h ago</p>
                          </div>
                        </CardContent>
                      </Card>

                      {/* Safety Override */}
                      <Card className="border-blue-200 border-l-8 border-l-blue-600">
                        <CardHeader className="pb-3">
                          <CardTitle className="text-sm text-blue-700 font-bold">
                            📡 Safety Override + Satellite Fallback
                          </CardTitle>
                        </CardHeader>
                        <CardContent>
                          <div className="flex items-center justify-between p-2 bg-blue-50 rounded border-2 border-blue-200">
                            <span className="text-sm font-bold">Auto-switch to Satellite Mode</span>
                            <div className="w-8 h-4 bg-blue-600 rounded-full border-2 border-black"></div>
                          </div>
                          <p className="text-xs text-blue-600 mt-2 font-semibold">When signal is lost</p>
                        </CardContent>
                      </Card>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Other tab contents would follow the same pattern with enhanced borders, contrast, and text labels */}
            <TabsContent value="dashboard" className="mt-8">
              <Card className="bg-white border-slate-200 shadow-lg border-l-8 border-l-blue-600">
                <CardHeader>
                  <CardTitle className="text-slate-900 flex items-center">
                    <Activity className="mr-2 h-6 w-6 text-blue-600" />
                    Government Emergency Operations Center
                  </CardTitle>
                  <CardDescription className="text-slate-600">
                    Real-time emergency coordination and community management dashboard
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="text-center py-8">
                    <p className="text-lg text-slate-600 font-semibold">
                      🏛️ Government Dashboard with Color-Blind Friendly Design
                    </p>
                    <p className="text-sm text-slate-500 mt-2">
                      High contrast charts, pattern-based data visualization, and text-labeled status indicators
                    </p>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="satellite" className="mt-8">
              <Card className="bg-white border-slate-200 shadow-lg border-l-8 border-l-amber-600">
                <CardHeader>
                  <CardTitle className="text-slate-900 flex items-center">
                    <Satellite className="mr-2 h-6 w-6 text-amber-600" />
                    Starlink Integration & L.A.B.™ Technology
                  </CardTitle>
                  <CardDescription className="text-slate-600">
                    Satellite connectivity and Last-known Auto Beacon for emergency location tracking
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="text-center py-8">
                    <p className="text-lg text-slate-600 font-semibold">
                      📡 Satellite Technology with Accessible Design
                    </p>
                    <p className="text-sm text-slate-500 mt-2">
                      Pattern-based signal indicators, text-labeled connection status, and shape-coded network states
                    </p>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </section>

      {/* Indigenous Partnership Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-slate-900 mb-4">Indigenous-First Technology</h2>
            <p className="text-xl text-slate-600">Built in partnership with First Nations communities</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <Card className="bg-slate-50 border-slate-200 shadow-lg hover:shadow-xl transition-shadow border-l-8 border-l-emerald-600">
              <CardHeader className="text-center">
                <div className="w-16 h-16 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-4 border-4 border-emerald-600">
                  <Globe className="h-8 w-8 text-emerald-600" />
                </div>
                <CardTitle className="text-slate-900">Traditional Knowledge Integration</CardTitle>
                <CardDescription className="text-slate-600">
                  Respectful integration of ancestral wisdom with modern AI technology
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="bg-slate-50 border-slate-200 shadow-lg hover:shadow-xl transition-shadow border-l-8 border-l-blue-600">
              <CardHeader className="text-center">
                <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4 border-4 border-blue-600">
                  <Users className="h-8 w-8 text-blue-600" />
                </div>
                <CardTitle className="text-slate-900">Community Ownership</CardTitle>
                <CardDescription className="text-slate-600">
                  Indigenous communities maintain control over their data and technology
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="bg-slate-50 border-slate-200 shadow-lg hover:shadow-xl transition-shadow border-l-8 border-l-amber-600">
              <CardHeader className="text-center">
                <div className="w-16 h-16 bg-amber-100 rounded-full flex items-center justify-center mx-auto mb-4 border-4 border-amber-600">
                  <Star className="h-8 w-8 text-amber-600" />
                </div>
                <CardTitle className="text-slate-900">Cultural Protocols</CardTitle>
                <CardDescription className="text-slate-600">
                  Technology that respects and follows traditional governance structures
                </CardDescription>
              </CardHeader>
            </Card>
          </div>
        </div>
      </section>

      {/* Coming Soon Section */}
      <section className="py-16 bg-slate-100">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-slate-900 mb-4">Future Integrations</h2>
            <p className="text-lg text-slate-600">Expanding connectivity partnerships</p>
          </div>

          <div className="max-w-2xl mx-auto">
            <Card className="bg-white border-slate-200 shadow-lg border-l-8 border-l-purple-600">
              <CardHeader className="text-center">
                <div className="w-16 h-16 bg-gradient-to-r from-red-500 to-blue-500 rounded-full flex items-center justify-center mx-auto mb-4 border-4 border-purple-600">
                  <Satellite className="h-8 w-8 text-white" />
                </div>
                <CardTitle className="text-slate-900">Rogers Satellite Integration</CardTitle>
                <CardDescription className="text-slate-600">
                  Expanding satellite coverage with Rogers Communications partnership for enhanced connectivity across
                  Canada's remote regions
                </CardDescription>
              </CardHeader>
              <CardContent className="text-center">
                <Badge className="bg-blue-100 text-blue-700 border-2 border-blue-600 font-bold">
                  Partnership in Development
                </Badge>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-20 bg-slate-900">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl font-bold text-white mb-6">Ready to Save Lives?</h2>
          <p className="text-xl text-slate-300 mb-8">Join the emergency response revolution with SafeRoute AI</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              size="lg"
              className="bg-red-600 hover:bg-red-700 text-white font-bold shadow-lg border-4 border-white"
              onClick={() => setShowHeroMode(true)}
            >
              <Shield className="mr-2 h-5 w-5" />
              Request Emergency Demo
            </Button>
            <Button size="lg" className="bg-slate-700 hover:bg-slate-600 text-white border-4 border-slate-400">
              <ArrowRight className="mr-2 h-5 w-5" />
              Learn More
            </Button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 bg-slate-800">
        <div className="container mx-auto px-4">
          <div className="text-center">
            <h3 className="text-2xl font-bold text-white mb-4">SafeRoute AI</h3>
            <p className="text-slate-300 mb-4 font-semibold">
              Traditional Wisdom + Modern Protection + Satellite Integration
            </p>
            <div className="flex justify-center space-x-6 text-slate-400 mb-4 font-semibold">
              <span>saferouteai.com</span>
              <span>•</span>
              <span>Vancouver, BC</span>
              <span>•</span>
              <span>Indigenous-Led Technology</span>
            </div>
            <div className="flex justify-center space-x-6 text-slate-400 text-sm mb-4 font-semibold">
              <a href="#" className="hover:text-white border-b-2 border-transparent hover:border-white">
                Terms of Service
              </a>
              <span>•</span>
              <a href="#" className="hover:text-white border-b-2 border-transparent hover:border-white">
                Privacy Policy
              </a>
              <span>•</span>
              <a href="#" className="hover:text-white border-b-2 border-transparent hover:border-white">
                IP Notice
              </a>
              <span>•</span>
              <a href="#" className="hover:text-white border-b-2 border-transparent hover:border-white">
                Legal Disclaimers
              </a>
            </div>
            <div className="text-xs text-slate-500 font-semibold">
              <p>
                Hero Mode™, L.A.B.™, Confidence Score™, and Community Hero Response Network™ are trademarks of SafeRoute
                AI.
              </p>
              <p>Patent Pending. © 2024 SafeRoute AI. All rights reserved.</p>
              <p className="bg-amber-100 text-amber-800 p-2 rounded border-2 border-amber-600 mt-2">
                ⚠️ BETA WARNING - Use Caution. Routing may be inaccurate during emergency situations.
              </p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}
