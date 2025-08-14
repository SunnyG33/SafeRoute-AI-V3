"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useToast } from "@/hooks/use-toast"
import HeroModeRedesigned from "@/components/emergency/HeroModeRedesigned"
import Link from "next/link"
import UniversalNavigation from "@/components/navigation/UniversalNavigation"
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
  UserCheck,
  Headphones,
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
      <div className="min-h-screen bg-gradient-to-br from-slate-900 to-slate-800 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-teal-400 mb-4"></div>
          <h2 className="text-2xl font-bold bg-gradient-to-r from-white via-teal-200 to-emerald-200 bg-clip-text text-transparent mb-2">
            SafeRoute AI
          </h2>
          <p className="text-teal-200">Loading emergency response platform...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-slate-900 relative overflow-hidden">
      <UniversalNavigation showBackButton={false} showNextPrevious={true} />
      {/* Hero Mode Overlay */}
      {showHeroMode && (
        <div className="fixed inset-0 z-50 overflow-y-auto bg-black">
          <HeroModeRedesigned onExit={() => setShowHeroMode(false)} />
        </div>
      )}

      <section className="relative overflow-hidden z-10 min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
        <div className="relative container mx-auto px-4 py-12 min-h-screen flex items-center justify-center">
          <div className="text-center max-w-6xl mx-auto relative">
            {/* Top Row - Primary Users */}
            <div className="absolute -top-20 left-1/2 transform -translate-x-1/2 flex space-x-8">
              {/* Civilian Portal */}
              <Link href="/civilian-portal-hero">
                <Button
                  size="lg"
                  className="bg-gradient-to-r from-emerald-500 to-emerald-600 hover:from-emerald-600 hover:to-emerald-700 text-white px-6 py-3 shadow-lg backdrop-blur-sm border border-emerald-500/30 text-sm font-bold"
                >
                  <UserCheck className="w-4 h-4 mr-2" />
                  Civilian Portal
                </Button>
              </Link>

              {/* Responder Portal */}
              <Link href="/responder-portal-hero">
                <Button
                  size="lg"
                  className="bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white px-6 py-3 shadow-lg backdrop-blur-sm border border-blue-500/30 text-sm font-bold"
                >
                  <Headphones className="w-4 h-4 mr-2" />
                  Responder Portal
                </Button>
              </Link>
            </div>

            {/* Side Utility - AED Finder */}
            <div className="absolute top-1/2 -right-20 transform -translate-y-1/2">
              <Link href="/aed-finder-complete">
                <Button
                  size="lg"
                  className="bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white px-4 py-3 shadow-lg backdrop-blur-sm border border-red-500/30 text-sm font-bold writing-mode-vertical"
                >
                  <Zap className="w-4 h-4 mb-2" />
                  AED Finder™
                </Button>
              </Link>
            </div>

            {/* Bottom Row - Community & Governance */}
            <div className="absolute -bottom-20 left-1/2 transform -translate-x-1/2 flex space-x-6">
              {/* Community Portal */}
              <Link href="/community-portal">
                <Button
                  size="lg"
                  className="bg-gradient-to-r from-teal-500 to-teal-600 hover:from-teal-600 hover:to-teal-700 text-white px-4 py-2 shadow-lg backdrop-blur-sm border border-teal-500/30 text-sm font-bold"
                >
                  <Users className="w-4 h-4 mr-2" />
                  Community Portal
                </Button>
              </Link>

              {/* Elder Portal */}
              <Link href="/elder-portal">
                <Button
                  size="lg"
                  className="bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-white px-4 py-2 shadow-lg backdrop-blur-sm border border-amber-500/30 text-sm font-bold"
                >
                  <Crown className="w-4 h-4 mr-2" />
                  Elder Portal
                </Button>
              </Link>

              {/* Patent Wheel */}
              <Link href="/patent-wheel">
                <Button
                  size="lg"
                  className="bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700 text-white px-4 py-2 shadow-lg backdrop-blur-sm border border-indigo-500/30 text-sm font-bold"
                >
                  <Star className="w-4 h-4 mr-2" />
                  Patent Wheel
                </Button>
              </Link>

              {/* Government Dashboard */}
              <Link href="/government-dashboard">
                <Button
                  size="lg"
                  className="bg-gradient-to-r from-purple-500 to-purple-600 hover:from-purple-600 hover:to-purple-700 text-white px-4 py-2 shadow-lg backdrop-blur-sm border border-purple-500/30 text-sm font-bold"
                >
                  <Activity className="w-4 h-4 mr-2" />
                  Government Dashboard
                </Button>
              </Link>
            </div>

            {/* Main Content - Exact Pitch Deck Layout - Reduced text sizes for full screen fit */}
            <div className="flex items-center justify-center mb-6">
              {/* SafeRoute AI Logo - Reduced from w-24 h-24 to w-16 h-16 */}
              <div className="w-16 h-16 bg-gradient-to-br from-cyan-400 to-teal-500 rounded-2xl flex items-center justify-center mr-6 shadow-2xl">
                <Shield className="w-8 h-8 text-white" />
              </div>

              {/* Title and Subtitle */}
              <div className="text-left">
                <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-cyan-400 via-teal-400 to-cyan-300 bg-clip-text text-transparent mb-2 tracking-tight">
                  SafeRoute AI
                </h1>
                <p className="text-lg md:text-xl text-cyan-300 font-medium">Emergency Response Infrastructure</p>
              </div>
            </div>

            {/* Main Headline - Reduced from text-4xl md:text-5xl to text-2xl md:text-3xl */}
            <h2 className="text-2xl md:text-3xl font-bold text-white mb-4 leading-tight">
              SafeRoute AI is the world's first
            </h2>

            {/* Key Features Line - Reduced from text-3xl md:text-4xl to text-xl md:text-2xl */}
            <p className="text-xl md:text-2xl font-bold mb-4 leading-tight">
              <span className="text-emerald-400">offline-capable</span>
              <span className="text-white">, </span>
              <span className="text-emerald-400">Indigenous-led</span>
              <span className="text-white">, </span>
              <span className="text-emerald-400">modular</span>
            </p>

            {/* Description - Reduced from text-2xl md:text-3xl to text-lg md:text-xl */}
            <p className="text-lg md:text-xl text-white font-bold mb-6 leading-tight">
              ecosystem that revolutionizes emergency response,
              <br />
              disaster relief, and public safety.
            </p>

            {/* Central Hero Mode Button - Reduced from text-3xl py-8 to text-xl py-4 */}
            <div className="mb-8">
              <Link href="/civilian-portal-hero">
                <Button
                  size="lg"
                  className="bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white font-bold shadow-2xl px-12 py-4 text-xl transition-all duration-300 transform hover:scale-105 backdrop-blur-sm border border-red-500/30"
                >
                  <Heart className="mr-3 h-6 w-6" />
                  Emergency Hero Mode
                </Button>
              </Link>
            </div>

            {/* Tagline - Reduced from text-3xl md:text-4xl to text-xl md:text-2xl */}
            <h3 className="text-xl md:text-2xl font-bold text-emerald-400 mb-6">"No Life Left Behind"</h3>

            {/* Funding Statement - Reduced margin from mb-8 to mb-4 */}
            <p className="text-base text-gray-300 font-medium">
              Seeking $3.5M CAD to deploy life-saving infrastructure across Indigenous communities
            </p>
          </div>
        </div>
      </section>

      {/* Key Features Overview - Updated Dark Theme */}
      <section className="relative z-10 py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold bg-gradient-to-r from-white via-teal-200 to-emerald-200 bg-clip-text text-transparent mb-4">
              Life-Saving Technology
            </h2>
            <p className="text-xl text-gray-300">Five critical innovations working together</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-5 gap-6">
            <Card className="bg-black/40 border-red-500/30 backdrop-blur-sm hover:border-red-500/50 transition-all duration-300">
              <CardHeader className="text-center">
                <div className="w-16 h-16 bg-gradient-to-r from-red-500 to-red-600 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Heart className="h-8 w-8 text-white" />
                </div>
                <CardTitle className="text-white">Hero Mode™</CardTitle>
                <CardDescription className="text-gray-300">
                  Voice-guided CPR that turns anyone into a lifesaver in critical moments
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="bg-black/40 border-yellow-500/30 backdrop-blur-sm hover:border-yellow-500/50 transition-all duration-300">
              <CardHeader className="text-center">
                <div className="w-16 h-16 bg-gradient-to-r from-yellow-500 to-yellow-600 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Zap className="h-8 w-8 text-white" />
                </div>
                <CardTitle className="text-white">AED Finder™</CardTitle>
                <CardDescription className="text-gray-300">
                  Instant location of nearest AEDs with voice-guided directions and EMS verification
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="bg-black/40 border-emerald-500/30 backdrop-blur-sm hover:border-emerald-500/50 transition-all duration-300">
              <CardHeader className="text-center">
                <div className="w-16 h-16 bg-gradient-to-r from-emerald-500 to-emerald-600 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Navigation className="h-8 w-8 text-white" />
                </div>
                <CardTitle className="text-white">AI Navigation</CardTitle>
                <CardDescription className="text-gray-300">
                  Real-time disaster routing with L.A.B.™ (Last-known Auto Beacon) around wildfires, floods, and
                  hazardous conditions
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="bg-black/40 border-blue-500/30 backdrop-blur-sm hover:border-blue-500/50 transition-all duration-300">
              <CardHeader className="text-center">
                <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-blue-600 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Satellite className="h-8 w-8 text-white" />
                </div>
                <CardTitle className="text-white">Starlink Integration</CardTitle>
                <CardDescription className="text-gray-300">
                  Guaranteed connectivity when cellular networks fail during emergencies
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="bg-black/40 border-amber-500/30 backdrop-blur-sm hover:border-amber-500/50 transition-all duration-300">
              <CardHeader className="text-center">
                <div className="w-16 h-16 bg-gradient-to-r from-amber-500 to-amber-600 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Radio className="h-8 w-8 text-white" />
                </div>
                <CardTitle className="text-white">L.A.B.™ Technology</CardTitle>
                <CardDescription className="text-gray-300">
                  Last-known Auto Beacon for precise emergency location tracking
                </CardDescription>
              </CardHeader>
            </Card>
          </div>
        </div>
      </section>

      {/* Interactive Demo Section */}
      <section className="relative z-10 py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold bg-gradient-to-r from-white via-teal-200 to-emerald-200 bg-clip-text text-transparent mb-4">
              Platform Demonstration
            </h2>
            <p className="text-xl text-gray-300">Experience SafeRoute AI's emergency response capabilities</p>
          </div>

          <Tabs value={activeDemo} onValueChange={setActiveDemo} className="w-full">
            <TabsList className="bg-black/40 border border-white/10 backdrop-blur-sm">
              <TabsTrigger
                value="mobile"
                className="data-[state=active]:bg-red-500/20 data-[state=active]:text-red-300"
              >
                Mobile App
              </TabsTrigger>
              <TabsTrigger
                value="dashboard"
                className="data-[state=active]:bg-blue-500/20 data-[state=active]:text-blue-300"
              >
                Gov Dashboard
              </TabsTrigger>
              <TabsTrigger
                value="satellite"
                className="data-[state=active]:bg-amber-500/20 data-[state=active]:text-amber-300"
              >
                Starlink + L.A.B.
              </TabsTrigger>
            </TabsList>

            <TabsContent value="mobile" className="mt-8">
              <Card className="bg-black/40 border-white/10 backdrop-blur-sm">
                <CardHeader>
                  <CardTitle className="text-white flex items-center">
                    <Shield className="mr-2 h-6 w-6 text-red-400" />
                    Mobile Emergency Response App
                  </CardTitle>
                  <CardDescription className="text-gray-300">
                    Critical emergency features with Hero Mode™, Confidence Score™, and disaster-aware routing designed
                    for high-stress situations
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  {/* Beta Disclaimer Banner */}
                  <div className="bg-amber-500/20 border border-amber-500/30 rounded-lg p-3 mb-6 backdrop-blur-sm">
                    <div className="flex items-center">
                      <AlertTriangle className="h-5 w-5 text-amber-400 mr-2" />
                      <p className="text-sm text-amber-200 font-semibold">
                        ⚠️ BETA WARNING: SafeRoute AI is in pilot testing. Data may be incomplete. Use at your own risk.
                      </p>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    {/* Mobile Interface Simulation */}
                    <div className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-lg p-6 border border-gray-600/30 backdrop-blur-sm">
                      <div className="bg-white rounded-2xl p-4 max-w-sm mx-auto shadow-2xl border border-gray-300">
                        {/* Confidence Score™ Meter */}
                        <div className="mb-4 p-3 bg-gray-50 rounded-lg border border-gray-300">
                          <div className="flex items-center justify-between mb-2">
                            <span className="text-sm font-bold text-gray-700">Confidence Score™</span>
                            <span className="text-lg font-bold text-emerald-600 bg-emerald-100 px-2 py-1 rounded border border-emerald-600">
                              86%
                            </span>
                          </div>
                          <div className="w-full bg-gray-200 rounded-full h-4 mb-1 border border-gray-400">
                            <div
                              className="bg-emerald-500 h-4 rounded-full border-r border-emerald-700"
                              style={{ width: "86%" }}
                            ></div>
                          </div>
                          <p className="text-xs text-gray-600 font-semibold">
                            MODERATE RISK - Based on AQI, fire distance, cell signal, road access
                          </p>
                        </div>

                        {/* Hero Mode Active */}
                        <div className="bg-red-600 text-white p-4 rounded-lg mb-4 border border-black">
                          <Heart className="h-8 w-8 mx-auto mb-2" />
                          <h3 className="font-bold text-center text-lg">HERO MODE™ ACTIVE</h3>
                          <p className="text-sm opacity-90 text-center font-semibold">Voice guidance ready</p>
                        </div>

                        {/* Voice Command Interface */}
                        <div className="mb-4 p-3 bg-blue-50 rounded-lg border border-blue-300">
                          <Button
                            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold mb-2 border border-black"
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
                          <Button className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-bold border border-black">
                            <CheckCircle className="mr-2 h-4 w-4" />
                            I'm Safe - Check In
                          </Button>
                          <Button className="w-full bg-amber-600 hover:bg-amber-700 text-white font-bold border border-black">
                            <AlertTriangle className="mr-2 h-4 w-4" />
                            Need Help
                          </Button>
                          <Button className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold border border-black">
                            <MapPin className="mr-2 h-4 w-4" />
                            Find Safe Route
                          </Button>
                        </div>

                        {/* Satellite Fallback Status */}
                        <div className="p-2 bg-emerald-50 rounded border border-emerald-200 mb-3">
                          <div className="flex items-center justify-between">
                            <span className="text-xs text-emerald-700 font-bold">Starlink Connection Active</span>
                            <Satellite className="h-4 w-4 text-emerald-600" />
                          </div>
                        </div>

                        {/* Offline Mode Indicator */}
                        <div className="p-2 bg-gray-100 rounded text-center border border-gray-300">
                          <p className="text-xs text-gray-600 font-semibold">Offline Mode – Last Synced 22m ago</p>
                          <div className="flex justify-center items-center mt-1">
                            <Wifi className="h-3 w-3 text-gray-500 mr-1" />
                            <span className="text-xs text-gray-500 font-semibold">Signal: 3 Bars</span>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Feature Details */}
                    <div className="space-y-4">
                      {/* Emergency Broadcast Feed */}
                      <Card className="bg-black/40 border-red-500/30 backdrop-blur-sm">
                        <CardHeader className="pb-3">
                          <CardTitle className="text-sm text-red-300 font-bold">🚨 Emergency Broadcast Feed</CardTitle>
                        </CardHeader>
                        <CardContent>
                          <div className="bg-red-500/20 border border-red-500/30 rounded-lg p-3 mb-3 backdrop-blur-sm">
                            <div className="flex items-center justify-between mb-2">
                              <Badge className="bg-red-500/20 text-red-300 border-red-500/30 font-bold">
                                🔴 CRITICAL ALERT
                              </Badge>
                            </div>
                            <p className="text-sm text-red-200 mb-2 font-semibold">
                              "Wildfire 2.1km SE. Evacuate West. Issued by BC Wildfire Service"
                            </p>
                            <Button
                              size="sm"
                              className="bg-red-500 hover:bg-red-600 text-white border border-red-400 font-bold"
                            >
                              <CheckCircle className="mr-1 h-3 w-3" />
                              Got It
                            </Button>
                          </div>
                        </CardContent>
                      </Card>

                      {/* Safe Zones */}
                      <Card className="bg-black/40 border-emerald-500/30 backdrop-blur-sm">
                        <CardHeader className="pb-3">
                          <CardTitle className="text-sm text-emerald-300 font-bold">
                            🟢 Safe Zones / Rally Points
                          </CardTitle>
                        </CardHeader>
                        <CardContent>
                          <div className="space-y-2">
                            <div className="flex items-center justify-between p-2 bg-emerald-500/20 rounded border border-emerald-500/30">
                              <span className="text-sm font-bold text-white">🟢 Community Center</span>
                              <Badge className="bg-emerald-500/20 text-emerald-300 border-emerald-500/30 font-bold">
                                Gov Verified
                              </Badge>
                            </div>
                            <div className="flex items-center justify-between p-2 bg-blue-500/20 rounded border border-blue-500/30">
                              <span className="text-sm font-bold text-white">🔵 School Gymnasium</span>
                              <Badge className="bg-blue-500/20 text-blue-300 border-blue-500/30 font-bold">
                                Community Added
                              </Badge>
                            </div>
                            <p className="text-xs text-gray-300 font-semibold">Last confirmed safe 1h ago</p>
                          </div>
                        </CardContent>
                      </Card>

                      {/* Safety Override */}
                      <Card className="bg-black/40 border-blue-500/30 backdrop-blur-sm">
                        <CardHeader className="pb-3">
                          <CardTitle className="text-sm text-blue-300 font-bold">
                            📡 Safety Override + Satellite Fallback
                          </CardTitle>
                        </CardHeader>
                        <CardContent>
                          <div className="flex items-center justify-between p-2 bg-blue-500/20 rounded border border-blue-500/30">
                            <span className="text-sm font-bold text-white">Auto-switch to Satellite Mode</span>
                            <div className="w-8 h-4 bg-blue-500 rounded-full border border-blue-400"></div>
                          </div>
                          <p className="text-xs text-blue-300 mt-2 font-semibold">When signal is lost</p>
                        </CardContent>
                      </Card>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="dashboard" className="mt-8">
              <Card className="bg-black/40 border-white/10 backdrop-blur-sm">
                <CardHeader>
                  <CardTitle className="text-white flex items-center">
                    <Activity className="mr-2 h-6 w-6 text-blue-400" />
                    Government Emergency Operations Center
                  </CardTitle>
                  <CardDescription className="text-gray-300">
                    Real-time emergency coordination and community management dashboard
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="text-center py-8">
                    <p className="text-lg text-gray-300 font-semibold">
                      🏛️ Government Dashboard with Color-Blind Friendly Design
                    </p>
                    <p className="text-sm text-gray-400 mt-2">
                      High contrast charts, pattern-based data visualization, and text-labeled status indicators
                    </p>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="satellite" className="mt-8">
              <Card className="bg-black/40 border-white/10 backdrop-blur-sm">
                <CardHeader>
                  <CardTitle className="text-white flex items-center">
                    <Satellite className="mr-2 h-6 w-6 text-amber-400" />
                    Starlink Integration & L.A.B.™ Technology
                  </CardTitle>
                  <CardDescription className="text-gray-300">
                    Satellite connectivity and Last-known Auto Beacon for emergency location tracking
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="text-center py-8">
                    <p className="text-lg text-gray-300 font-semibold">
                      📡 Satellite Technology with Accessible Design
                    </p>
                    <p className="text-sm text-gray-400 mt-2">
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
      <section className="relative z-10 py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold bg-gradient-to-r from-white via-teal-200 to-emerald-200 bg-clip-text text-transparent mb-4">
              Indigenous-First Technology
            </h2>
            <p className="text-xl text-gray-300">Built in partnership with First Nations communities</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <Card className="bg-black/40 border-emerald-500/30 backdrop-blur-sm hover:border-emerald-500/50 transition-all duration-300">
              <CardHeader className="text-center">
                <div className="w-16 h-16 bg-gradient-to-r from-emerald-500 to-emerald-600 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Globe className="h-8 w-8 text-white" />
                </div>
                <CardTitle className="text-white">Traditional Knowledge Integration</CardTitle>
                <CardDescription className="text-gray-300">
                  Respectful integration of ancestral wisdom with modern AI technology
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="bg-black/40 border-blue-500/30 backdrop-blur-sm hover:border-blue-500/50 transition-all duration-300">
              <CardHeader className="text-center">
                <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-blue-600 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Users className="h-8 w-8 text-white" />
                </div>
                <CardTitle className="text-white">Community Ownership</CardTitle>
                <CardDescription className="text-gray-300">
                  Indigenous communities maintain control over their data and technology
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="bg-black/40 border-amber-500/30 backdrop-blur-sm hover:border-amber-500/50 transition-all duration-300">
              <CardHeader className="text-center">
                <div className="w-16 h-16 bg-gradient-to-r from-amber-500 to-amber-600 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Star className="h-8 w-8 text-white" />
                </div>
                <CardTitle className="text-white">Cultural Protocols</CardTitle>
                <CardDescription className="text-gray-300">
                  Technology that respects and follows traditional governance structures
                </CardDescription>
              </CardHeader>
            </Card>
          </div>
        </div>
      </section>

      {/* Coming Soon Section */}
      <section className="relative z-10 py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold bg-gradient-to-r from-white via-teal-200 to-emerald-200 bg-clip-text text-transparent mb-4">
              Future Integrations
            </h2>
            <p className="text-lg text-gray-300">Expanding connectivity partnerships</p>
          </div>

          <div className="max-w-2xl mx-auto">
            <Card className="bg-black/40 border-purple-500/30 backdrop-blur-sm">
              <CardHeader className="text-center">
                <div className="w-16 h-16 bg-gradient-to-r from-red-500 to-blue-500 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Satellite className="h-8 w-8 text-white" />
                </div>
                <CardTitle className="text-white">Rogers Satellite Integration</CardTitle>
                <CardDescription className="text-gray-300">
                  Expanding satellite coverage with Rogers Communications partnership for enhanced connectivity across
                  Canada's remote regions
                </CardDescription>
              </CardHeader>
              <CardContent className="text-center">
                <Badge className="bg-blue-500/20 text-blue-300 border-blue-500/30 font-bold">
                  Partnership in Development
                </Badge>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="relative z-10 py-20">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl font-bold bg-gradient-to-r from-white via-teal-200 to-emerald-200 bg-clip-text text-transparent mb-6">
            Ready to Save Lives?
          </h2>
          <p className="text-xl text-gray-300 mb-8">Join the emergency response revolution with SafeRoute AI</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              size="lg"
              className="bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white font-bold shadow-lg backdrop-blur-sm border border-red-500/30"
              onClick={() => setShowHeroMode(true)}
            >
              <Shield className="mr-2 h-5 w-5" />
              Request Emergency Demo
            </Button>
            <Button
              size="lg"
              className="bg-gradient-to-r from-slate-600 to-slate-700 hover:from-slate-700 hover:to-slate-800 text-white backdrop-blur-sm border border-slate-500/30"
            >
              <ArrowRight className="mr-2 h-5 w-5" />
              Learn More
            </Button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="relative z-10 py-12 bg-black/40 backdrop-blur-sm border-t border-white/10">
        <div className="container mx-auto px-4">
          <div className="text-center">
            <h3 className="text-2xl font-bold bg-gradient-to-r from-white via-teal-200 to-emerald-200 bg-clip-text text-transparent mb-4">
              SafeRoute AI
            </h3>
            <p className="text-gray-300 mb-4 font-semibold">
              Traditional Wisdom + Modern Protection + Satellite Integration
            </p>
            <div className="flex justify-center space-x-6 text-gray-400 mb-4 font-semibold">
              <span>saferouteai.com</span>
              <span>•</span>
              <span>Vancouver, BC</span>
              <span>•</span>
              <span>Indigenous-Led Technology</span>
            </div>
            <div className="flex justify-center space-x-6 text-gray-400 text-sm mb-4 font-semibold">
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
            <div className="text-xs text-gray-500 font-semibold">
              <p>
                Hero Mode™, L.A.B.™, Confidence Score™, and Community Hero Response Network™ are trademarks of SafeRoute
                AI.
              </p>
              <p>Patent Pending. © 2024 SafeRoute AI. All rights reserved.</p>
              <p className="bg-amber-500/20 text-amber-300 p-2 rounded border border-amber-500/30 mt-2 backdrop-blur-sm">
                ⚠️ BETA WARNING - Use Caution. Routing may be inaccurate during emergency situations.
              </p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}
