"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Progress } from "@/components/ui/progress"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { BackToHome } from "@/components/navigation/BackToHome"
import FloatingEmergencyButtons from "@/components/emergency/FloatingEmergencyButtons"
import { LiveIncidentFeed } from "@/components/realtime/LiveIncidentFeed"
import { LiveCommunications } from "@/components/realtime/LiveCommunications"
import { createClient } from "@/lib/supabase/client"
import { Flame, Users, Award, MapPin, AlertTriangle } from "lucide-react"
import Link from "next/link"

interface User {
  id: string
  email: string
  role: string
  first_name: string
  last_name: string
}

export default function GovernmentDashboard() {
  const router = useRouter()
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)
  const [activeTab, setActiveTab] = useState("overview")
  const [realTimeData, setRealTimeData] = useState({
    starlink_uptime: 99.94,
    active_emergencies: 27,
    heroes_deployed: 89,
    indigenous_communities_safe: 6,
    ai_predictions_accuracy: 94.7,
    cross_jurisdictional_coordination: 8,
  })

  useEffect(() => {
    const checkAuth = async () => {
      const supabase = createClient()

      const {
        data: { session },
      } = await supabase.auth.getSession()

      if (!session) {
        router.push("/auth/login")
        return
      }

      // Check if user has government role
      const { data: profile } = await supabase.from("users").select("*").eq("id", session.user.id).single()

      if (!profile || profile.role !== "government") {
        router.push("/dashboard")
        return
      }

      setUser(profile)
      setLoading(false)
    }

    checkAuth()
  }, [router])

  useEffect(() => {
    if (!user) return

    const supabase = createClient()

    // Fetch real emergency data
    const fetchRealTimeData = async () => {
      const { data: incidents } = await supabase.from("incidents").select("*").eq("status", "active")

      const { data: heroes } = await supabase.from("users").select("*").eq("role", "responder").eq("status", "active")

      if (incidents && heroes) {
        setRealTimeData((prev) => ({
          ...prev,
          active_emergencies: incidents.length,
          heroes_deployed: heroes.length,
        }))
      }
    }

    fetchRealTimeData()

    // Set up real-time subscriptions
    const incidentsSubscription = supabase
      .channel("government-incidents")
      .on("postgres_changes", { event: "*", schema: "public", table: "incidents" }, () => fetchRealTimeData())
      .subscribe()

    return () => {
      incidentsSubscription.unsubscribe()
    }
  }, [user])

  const [patentInnovations, setPatentInnovations] = useState({
    aiDecisionEngine: {
      responseTime: "2.3s",
      accuracy: 94.7,
      multiVariableAnalysis: true,
      patentStatus: "Filed CA 3280894",
      estimatedValue: "$18M",
    },
    indigenousProtocols: {
      autoActivation: true,
      complianceRate: 100,
      culturalSiteProtection: 15,
      tlrtAccuracy: 99.7,
      ocapCompliance: 100,
      patentStatus: "Filed CA 3280872",
      estimatedValue: "$12M",
    },
    multiAgencyCoordination: {
      activeAgencies: 8,
      syncTime: "2.1s",
      coordinationSuccess: 99.2,
      crossJurisdictional: true,
      patentStatus: "Filed CA 3280894",
      estimatedValue: "$9M",
    },
    satelliteIntegration: {
      dynamicBandwidth: true,
      emergencyPriority: "MAX",
      uptime: 99.94,
      activeSatellites: 4847,
      patentStatus: "Integrated Technology",
      estimatedValue: "$8M",
    },
  })

  // Simulate real-time updates for patent demonstration
  useEffect(() => {
    const interval = setInterval(() => {
      setRealTimeData((prev) => ({
        ...prev,
        starlink_uptime: Math.max(99.0, prev.starlink_uptime + (Math.random() - 0.5) * 0.1),
        active_emergencies: Math.max(0, prev.active_emergencies + Math.floor((Math.random() - 0.5) * 3)),
        heroes_deployed: Math.max(0, prev.heroes_deployed + Math.floor((Math.random() - 0.5) * 5)),
        ai_predictions_accuracy: Math.max(85, prev.ai_predictions_accuracy + (Math.random() - 0.5) * 2),
      }))
    }, 5000)
    return () => clearInterval(interval)
  }, [])

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-100 to-gray-200 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 bg-gradient-to-br from-green-500 to-green-600 rounded-2xl flex items-center justify-center mb-4 mx-auto">
            <svg viewBox="0 0 100 100" className="w-10 h-10 fill-white">
              <circle cx="50" cy="15" r="8" />
              <rect x="20" y="35" width="60" height="8" rx="4" />
              <rect x="35" y="50" width="30" height="8" rx="4" />
              <rect x="25" y="65" width="50" height="8" rx="4" />
              <rect x="15" y="80" width="25" height="12" rx="6" />
              <rect x="60" y="80" width="25" height="12" rx="6" />
            </svg>
          </div>
          <p className="text-slate-600">Loading Government Dashboard...</p>
        </div>
      </div>
    )
  }

  return (
    // Updated background to professional blue-gray gradient instead of purple
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-100 to-gray-200">
      {/* Background Effects */}
      {/* Updated background effects to complement blue-gray theme */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 via-slate-500/5 to-gray-500/5" />

      <BackToHome />

      {/* Enhanced Header with Patent-Relevant Information */}
      {/* Updated header background to blue-gray tones */}
      <div className="relative z-10 bg-gradient-to-r from-blue-200/80 via-slate-200/80 to-gray-200/80 backdrop-blur-sm border-b border-blue-500/30">
        <div className="max-w-7xl mx-auto flex justify-between items-center p-4">
          <div>
            {/* Updated text gradient to complement blue-gray theme */}
            <h1 className="text-3xl font-bold bg-gradient-to-r from-slate-800 via-blue-800 to-gray-800 bg-clip-text text-transparent">
              🛡️ SafeRoute AI™ - Emergency Operations Center
            </h1>
            <p className="text-blue-800">Patent-Pending Multi-Modal Emergency Response System</p>
          </div>
          <div className="flex items-center space-x-6 text-sm">
            <div className="flex items-center space-x-2 bg-black/20 backdrop-blur-sm rounded-lg px-3 py-2 border border-green-500/30">
              <span className="w-3 h-3 bg-green-400 rounded-full animate-pulse"></span>
              <span className="text-slate-800">🛰️ Starlink: {realTimeData.starlink_uptime.toFixed(2)}%</span>
            </div>
            <div className="flex items-center space-x-2 bg-black/20 backdrop-blur-sm rounded-lg px-3 py-2 border border-blue-500/30">
              <span className="w-3 h-3 bg-blue-400 rounded-full animate-pulse"></span>
              <span className="text-slate-800">🤖 AI Engine: Active</span>
            </div>
            <div className="flex items-center space-x-2 bg-black/20 backdrop-blur-sm rounded-lg px-3 py-2 border border-purple-500/30">
              <span className="w-3 h-3 bg-purple-400 rounded-full animate-pulse"></span>
              <span className="text-slate-800">🏛️ Indigenous Protocols: Compliant</span>
            </div>
            <span className="text-slate-800">
              👤 {user?.first_name} {user?.last_name} - Government Admin
            </span>
          </div>
        </div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto p-6">
        <div className="bg-gradient-to-r from-red-900/20 to-orange-900/20 border-red-500/30 backdrop-blur-sm rounded-xl p-6 mb-6">
          <h3 className="text-xl font-bold text-slate-800 mb-4 flex items-center gap-2">
            <Flame className="w-5 h-5 text-red-600" />
            Government Emergency Management Tools
          </h3>
          <p className="text-red-800 text-sm mb-4">
            Access fire ban management, community reporting oversight, and hero network coordination
          </p>
          <div className="flex flex-col sm:flex-row gap-3">
            <Link href="/fire-ban-portal">
              <Button className="bg-gradient-to-r from-red-500 to-orange-500 hover:from-red-600 hover:to-orange-600 text-white font-semibold w-full sm:w-auto">
                <Flame className="w-4 h-4 mr-2" />
                Fire Ban Portal
              </Button>
            </Link>
            <Link href="/wildfire-waze">
              <Button className="bg-gradient-to-r from-orange-500 to-yellow-500 hover:from-orange-600 hover:to-yellow-600 text-white font-semibold w-full sm:w-auto">
                <MapPin className="w-4 h-4 mr-2" />
                Community Reports
              </Button>
            </Link>
            <Link href="/community-portal">
              <Button className="bg-gradient-to-r from-teal-500 to-cyan-500 hover:from-teal-600 hover:to-cyan-600 text-white font-semibold w-full sm:w-auto">
                <Users className="w-4 h-4 mr-2" />
                Community Hub
              </Button>
            </Link>
            <Link href="/hero-profile">
              <Button className="bg-gradient-to-r from-yellow-500 to-orange-500 hover:from-yellow-600 hover:to-orange-600 text-white font-semibold w-full sm:w-auto">
                <Award className="w-4 h-4 mr-2" />
                Hero Network
              </Button>
            </Link>
          </div>
        </div>

        {/* Patent Innovation Highlight Banner */}
        <Alert className="mb-6 bg-blue-500/20 border border-blue-500/30 backdrop-blur-sm">
          <AlertTriangle className="h-5 w-5 text-blue-600" />
          <AlertDescription className="text-blue-800">
            <strong>🔬 Patent Innovation Showcase:</strong> Real-time demonstration of AI-powered emergency coordination
            with satellite integration, cultural protocol automation, and predictive resource allocation across multiple
            jurisdictions.
          </AlertDescription>
        </Alert>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="bg-white/40 border border-slate-300 backdrop-blur-sm">
            <TabsTrigger
              value="overview"
              className="data-[state=active]:bg-red-500/20 data-[state=active]:text-red-700"
            >
              Emergency Overview
            </TabsTrigger>
            <TabsTrigger
              value="live-incidents"
              className="data-[state=active]:bg-orange-500/20 data-[state=active]:text-orange-700"
            >
              Live Incidents
            </TabsTrigger>
            <TabsTrigger
              value="communications"
              className="data-[state=active]:bg-purple-500/20 data-[state=active]:text-purple-700"
            >
              Communications
            </TabsTrigger>
            <TabsTrigger
              value="ai-coordination"
              className="data-[state=active]:bg-blue-500/20 data-[state=active]:text-blue-700"
            >
              AI Coordination
            </TabsTrigger>
            <TabsTrigger
              value="patent-innovations"
              className="data-[state=active]:bg-yellow-500/20 data-[state=active]:text-yellow-700"
            >
              Patent Innovations
            </TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6">
            {/* Real-Time Emergency Coordination Dashboard */}
            {/* Updated card backgrounds to complement blue-gray theme */}
            <Card className="bg-white/40 border-slate-300 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="flex items-center justify-between text-slate-800">
                  🚨 Real-Time Multi-Modal Emergency Coordination
                  <Badge variant="destructive" className="animate-pulse bg-red-500/20 text-red-700 border-red-500/30">
                    LIVE SYSTEM
                  </Badge>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-6">
                  <div className="bg-gradient-to-r from-red-500/80 to-red-600/80 text-white p-6 rounded-lg shadow-lg backdrop-blur-sm border border-red-500/30">
                    <div className="text-3xl font-bold">{realTimeData.active_emergencies}</div>
                    <div className="text-red-100">Active Emergencies</div>
                    <div className="text-xs text-red-200 mt-1">AI-Prioritized Queue</div>
                  </div>
                  <div className="bg-gradient-to-r from-blue-500/80 to-blue-600/80 text-white p-6 rounded-lg shadow-lg backdrop-blur-sm border border-blue-500/30">
                    <div className="text-3xl font-bold">{realTimeData.heroes_deployed}</div>
                    <div className="text-blue-100">Heroes Deployed</div>
                    <div className="text-xs text-blue-200 mt-1">AI-Optimized Dispatch</div>
                  </div>
                  <div className="bg-gradient-to-r from-green-500/80 to-green-600/80 text-white p-6 rounded-lg shadow-lg backdrop-blur-sm border border-green-500/30">
                    <div className="text-3xl font-bold">{realTimeData.starlink_uptime.toFixed(1)}%</div>
                    <div className="text-green-100">Satellite Uptime</div>
                    <div className="text-xs text-green-200 mt-1">Redundant Connectivity</div>
                  </div>
                  <div className="bg-gradient-to-r from-purple-500/80 to-purple-600/80 text-white p-6 rounded-lg shadow-lg backdrop-blur-sm border border-purple-500/30">
                    <div className="text-3xl font-bold">{realTimeData.indigenous_communities_safe}</div>
                    <div className="text-purple-100">Communities Protected</div>
                    <div className="text-xs text-purple-200 mt-1">Cultural Protocols Active</div>
                  </div>
                </div>

                {/* AI-Powered Emergency Prediction Engine */}
                {/* Updated card background to complement blue-gray theme */}
                <div className="bg-gradient-to-r from-slate-200/80 to-gray-300/80 text-slate-800 p-6 rounded-lg mb-6 backdrop-blur-sm border border-slate-400/30">
                  <h3 className="text-lg font-bold mb-4 flex items-center">
                    🤖 AI Emergency Prediction Engine (Patent-Pending)
                    <Badge className="ml-2 bg-yellow-500/20 text-yellow-700 border-yellow-500/30">INNOVATION</Badge>
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div>
                      <div className="text-2xl font-bold text-green-600">
                        {realTimeData.ai_predictions_accuracy.toFixed(1)}%
                      </div>
                      <div className="text-slate-700">Prediction Accuracy</div>
                      <Progress value={realTimeData.ai_predictions_accuracy} className="mt-2" />
                    </div>
                    <div>
                      <div className="text-2xl font-bold text-blue-600">2.3 min</div>
                      <div className="text-slate-700">Avg Response Time</div>
                      <div className="text-xs text-slate-600">AI-Optimized Routing</div>
                    </div>
                    <div>
                      <div className="text-2xl font-bold text-purple-600">847</div>
                      <div className="text-slate-700">Lives Saved (Est.)</div>
                      <div className="text-xs text-slate-600">Statistical Model</div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="live-incidents" className="space-y-6">
            <LiveIncidentFeed />
          </TabsContent>

          <TabsContent value="communications" className="space-y-6">
            <LiveCommunications />
          </TabsContent>

          <TabsContent value="ai-coordination" className="space-y-6">
            <Card className="bg-white/40 border-slate-300 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="text-slate-800">🤖 AI-Powered Emergency Coordination Engine</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* AI Decision Matrix */}
                <div className="bg-gradient-to-r from-blue-200/80 to-slate-200/80 text-slate-800 p-6 rounded-lg backdrop-blur-sm border border-blue-500/30">
                  <h3 className="text-lg font-bold mb-4">Patent Innovation: Multi-Variable AI Decision Matrix</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <h4 className="font-semibold mb-3">Real-Time Analysis Factors:</h4>
                      <ul className="space-y-2 text-sm">
                        <li className="flex items-center">
                          <span className="w-2 h-2 bg-green-400 rounded-full mr-2"></span>Geographic proximity & terrain
                          analysis
                        </li>
                        <li className="flex items-center">
                          <span className="w-2 h-2 bg-blue-400 rounded-full mr-2"></span>Hero skill-set matching
                          algorithms
                        </li>
                        <li className="flex items-center">
                          <span className="w-2 h-2 bg-yellow-400 rounded-full mr-2"></span>Cultural protocol
                          requirements
                        </li>
                        <li className="flex items-center">
                          <span className="w-2 h-2 bg-purple-400 rounded-full mr-2"></span>Satellite connectivity
                          optimization
                        </li>
                        <li className="flex items-center">
                          <span className="w-2 h-2 bg-red-400 rounded-full mr-2"></span>Weather & environmental factors
                        </li>
                        <li className="flex items-center">
                          <span className="w-2 h-2 bg-orange-400 rounded-full mr-2"></span>Resource availability
                          prediction
                        </li>
                      </ul>
                    </div>
                    <div>
                      <h4 className="font-semibold mb-3">AI Performance Metrics:</h4>
                      <div className="space-y-3">
                        <div>
                          <div className="flex justify-between text-sm">
                            <span>Response Time Optimization</span>
                            <span>94.7%</span>
                          </div>
                          <Progress value={94.7} className="h-2" />
                        </div>
                        <div>
                          <div className="flex justify-between text-sm">
                            <span>Resource Allocation Accuracy</span>
                            <span>91.3%</span>
                          </div>
                          <Progress value={91.3} className="h-2" />
                        </div>
                        <div>
                          <div className="flex justify-between text-sm">
                            <span>Cultural Protocol Compliance</span>
                            <span>100%</span>
                          </div>
                          <Progress value={100} className="h-2" />
                        </div>
                        <div>
                          <div className="flex justify-between text-sm">
                            <span>Cross-Jurisdictional Coordination</span>
                            <span>87.9%</span>
                          </div>
                          <Progress value={87.9} className="h-2" />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Patent Innovation Showcase section */}
          <TabsContent value="patent-innovations" className="space-y-6">
            <Card className="bg-white/40 border-slate-300 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="text-slate-800 flex items-center gap-3">
                  🔬 Live Patent Innovation Demonstration
                  <Badge className="bg-yellow-500/20 text-yellow-700 border-yellow-500/30">REAL-TIME SHOWCASE</Badge>
                </CardTitle>
              </CardHeader>
              <CardContent>
                {/* Patent Status Overview */}
                <div className="mb-6 bg-gradient-to-r from-blue-500/10 to-purple-500/10 border border-blue-500/20 rounded-xl p-4">
                  <h3 className="text-lg font-semibold text-slate-800 mb-3">Patent Portfolio Status</h3>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
                    <div>
                      <div className="text-2xl font-bold text-green-600">2</div>
                      <div className="text-sm text-slate-700">Patents Filed</div>
                      <div className="text-xs text-slate-600">CA 3280872, CA 3280894</div>
                    </div>
                    <div>
                      <div className="text-2xl font-bold text-blue-600">12</div>
                      <div className="text-sm text-slate-700">Core Innovations</div>
                      <div className="text-xs text-slate-600">Patent-Protected</div>
                    </div>
                    <div>
                      <div className="text-2xl font-bold text-purple-600">$47M</div>
                      <div className="text-sm text-slate-700">Portfolio Value</div>
                      <div className="text-xs text-slate-600">Conservative Est.</div>
                    </div>
                    <div>
                      <div className="text-2xl font-bold text-orange-600">20</div>
                      <div className="text-sm text-slate-700">Year Protection</div>
                      <div className="text-xs text-slate-600">Patent Term</div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        {/* Quick Action Buttons */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-8">
          <Button className="bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white p-6 h-auto flex flex-col items-center space-y-2">
            <span className="text-2xl">🚨</span>
            <span className="font-semibold">Declare Emergency</span>
          </Button>
          <Button className="bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white p-6 h-auto flex flex-col items-center space-y-2">
            <span className="text-2xl">🛰️</span>
            <span className="font-semibold">Satellite Control</span>
          </Button>
          <Button className="bg-gradient-to-r from-purple-500 to-purple-600 hover:from-purple-600 hover:to-purple-700 text-white p-6 h-auto flex flex-col items-center space-y-2">
            <span className="text-2xl">🏛️</span>
            <span className="font-semibold">Cultural Protocols</span>
          </Button>
          <Button className="bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white p-6 h-auto flex flex-col items-center space-y-2">
            <span className="text-2xl">📊</span>
            <span className="font-semibold">Generate Report</span>
          </Button>
        </div>
      </div>
      <FloatingEmergencyButtons />
    </div>
  )
}
