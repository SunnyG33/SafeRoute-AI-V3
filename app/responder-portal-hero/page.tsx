"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import UniversalNavigation from "@/components/navigation/UniversalNavigation"
import { LiveIncidentFeed } from "@/components/realtime/LiveIncidentFeed"
import { LiveCommunications } from "@/components/realtime/LiveCommunications"
import { createClient } from "@/lib/supabase/client"
import { Shield, Radio, MapPin, Users, Truck, Flame, Car, Plane, Heart, Phone, Crown, Info } from "lucide-react"

interface User {
  id: string
  email: string
  role: string
  first_name: string
  last_name: string
  status: string
}

export default function ResponderPortalHero() {
  const router = useRouter()
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)
  const [activeIncidents, setActiveIncidents] = useState(3)
  const [responseTime, setResponseTime] = useState(50) // Average in seconds
  const [connectedUnits, setConnectedUnits] = useState(12)
  const [selectedIncident, setSelectedIncident] = useState<string | null>(null)
  const [protocolVersion, setProtocolVersion] = useState("2024.3.1")
  const [evidenceUpdates, setEvidenceUpdates] = useState(3)
  const [elderPortalActive, setElderPortalActive] = useState(false)
  const [weatherAlert, setWeatherAlert] = useState("Wildfire Risk - High")
  const [activeTab, setActiveTab] = useState("incidents")
  const [unitsOnline, setUnitsOnline] = useState(15)
  const [avgResponse, setAvgResponse] = useState("0:47")

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

      // Check if user has responder role
      const { data: profile } = await supabase.from("users").select("*").eq("id", session.user.id).single()

      if (!profile || profile.role !== "responder") {
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

    const fetchRealTimeData = async () => {
      const { data: incidents } = await supabase.from("incidents").select("*").eq("status", "active")

      const { data: responders } = await supabase
        .from("users")
        .select("*")
        .eq("role", "responder")
        .eq("status", "active")

      if (incidents) {
        setActiveIncidents(incidents.length)
      }

      if (responders) {
        setConnectedUnits(responders.length)
        setUnitsOnline(responders.length)
      }
    }

    fetchRealTimeData()

    // Set up real-time subscriptions
    const incidentsSubscription = supabase
      .channel("responder-incidents")
      .on("postgres_changes", { event: "*", schema: "public", table: "incidents" }, () => fetchRealTimeData())
      .subscribe()

    return () => {
      incidentsSubscription.unsubscribe()
    }
  }, [user])

  const emsUnits = [
    {
      id: "EMS-001",
      type: "Ambulance",
      status: "Available",
      location: "Downtown Station",
      crew: ["Sarah M.", "Tom K."],
      equipment: ["AED", "Oxygen", "Trauma Kit"],
      lastUpdate: "2 min ago",
    },
    {
      id: "FIRE-003",
      type: "Fire Engine",
      status: "En Route",
      location: "Highway 1 - KM 45",
      crew: ["Mike R.", "Lisa P.", "David C."],
      equipment: ["Ladder", "Hose", "Rescue Tools"],
      lastUpdate: "30 sec ago",
    },
    {
      id: "POLICE-007",
      type: "Patrol Unit",
      status: "On Scene",
      location: "Main St & 5th Ave",
      crew: ["Officer Johnson"],
      equipment: ["First Aid", "Traffic Control"],
      lastUpdate: "1 min ago",
    },
  ]

  const fireUnits = [
    { id: "FIRE-01", location: "Station 1", status: "Available" },
    { id: "FIRE-02", location: "Industrial", status: "En Route" },
  ]

  const policeUnits = [
    { id: "POLICE-01", location: "Precinct A", status: "Available" },
    { id: "POLICE-02", location: "Downtown", status: "On Scene" },
  ]

  const hospitals = [
    {
      name: "General Hospital",
      beds: 12,
      waitTime: "15 min",
      status: "Available",
      specialties: ["Trauma", "Cardiac"],
      distance: "3.2 km",
    },
    {
      name: "Regional Medical",
      beds: 6,
      waitTime: "45 min",
      status: "Limited",
      specialties: ["Pediatrics", "General"],
      distance: "8.7 km",
    },
  ]

  useEffect(() => {
    const timer = setInterval(() => {
      setResponseTime((prev) => Math.max(30, prev + Math.floor(Math.random() * 10) - 5))
    }, 5000)
    return () => clearInterval(timer)
  }, [])

  const incidents = [
    {
      id: "INC-001",
      type: "Cardiac Emergency",
      priority: "Critical",
      location: "Downtown Community Center",
      coordinates: "49.2827° N, 123.1207° W",
      status: "Active",
      eta: "3 min",
      unitsAssigned: 4,
      icon: Heart,
      color: "bg-red-500",
      borderColor: "border-red-500/30",
      agencies: ["EMS", "Fire", "Police"],
      heroCP: true, // Connected to civilian HERO CP
      sharesSafe: true,
      predictedOutcome: "Positive",
      units: 4,
    },
    {
      id: "INC-002",
      type: "Structure Fire",
      priority: "High",
      location: "Residential Building - 5th Ave",
      coordinates: "49.2845° N, 123.1312° W",
      status: "En Route",
      eta: "7 min",
      unitsAssigned: 6,
      icon: Flame,
      color: "bg-orange-500",
      borderColor: "border-orange-500/30",
      agencies: ["Fire", "EMS", "Police"],
      heroCP: false,
      sharesSafe: false,
      predictedOutcome: "Monitoring",
      units: 6,
    },
    {
      id: "INC-003",
      type: "Vehicle Accident",
      priority: "Medium",
      location: "Highway 1 - Exit 22",
      coordinates: "49.2734° N, 123.1456° W",
      status: "Responding",
      eta: "12 min",
      unitsAssigned: 3,
      icon: Car,
      color: "bg-yellow-500",
      borderColor: "border-yellow-500/30",
      agencies: ["Police", "EMS"],
      heroCP: false,
      sharesSafe: true,
      predictedOutcome: "Stable",
      units: 3,
    },
  ]

  const units = [
    {
      id: "EMS-01",
      type: "Ambulance",
      status: "En Route",
      location: "Downtown",
      crew: 2,
      icon: Truck,
      capabilities: ["ALS", "HERO CP Integration", "ShareSafe Access"],
      agency: "EMS",
    },
    {
      id: "FIRE-03",
      type: "Fire Engine",
      status: "Available",
      location: "Station 5",
      crew: 4,
      icon: Flame,
      capabilities: ["Suppression", "Rescue", "First Aid"],
      agency: "Fire",
    },
    {
      id: "POLICE-12",
      type: "Patrol Unit",
      status: "On Scene",
      location: "5th Ave",
      crew: 2,
      icon: Shield,
      capabilities: ["Traffic Control", "Scene Security", "AED"],
      agency: "Police",
    },
    {
      id: "EMS-04",
      type: "Paramedic Unit",
      status: "Available",
      location: "Central",
      crew: 2,
      icon: Heart,
      capabilities: ["ALS", "LOGIQ Protocols", "VITALsync"],
      agency: "EMS",
    },
    {
      id: "FIRE-01",
      type: "Ladder Truck",
      status: "En Route",
      location: "Highway 1",
      crew: 3,
      icon: Truck,
      capabilities: ["Aerial", "Heavy Rescue", "Ventilation"],
      agency: "Fire",
    },
    {
      id: "HELI-01",
      type: "Air Rescue",
      status: "Standby",
      location: "Helipad",
      crew: 3,
      icon: Plane,
      capabilities: ["HEMS", "SAR", "LAB Tracking"],
      agency: "EMS",
    },
  ]

  const recentUpdates = [
    {
      protocol: "CPR Compression Depth",
      evidence: "Cochrane Review 2024",
      change: "Updated depth guidance to 5-6cm",
      impact: "12% improvement in ROSC",
      implemented: "2024-03-15",
    },
    {
      protocol: "Stroke Recognition",
      evidence: "NEJM Meta-Analysis",
      change: "Added BE-FAST protocol",
      impact: "23% faster recognition",
      implemented: "2024-03-10",
    },
    {
      protocol: "Hemorrhage Control",
      evidence: "JAMA Trauma Study",
      change: "Tourniquet placement timing",
      impact: "31% reduction in blood loss",
      implemented: "2024-03-08",
    },
  ]

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-purple-600 rounded-2xl flex items-center justify-center mb-4 mx-auto">
            <Shield className="w-10 h-10 text-white" />
          </div>
          <p className="text-white">Loading Responder Portal...</p>
        </div>
      </div>
    )
  }

  return (
    <>
      <UniversalNavigation
        showBackButton={true}
        customBackPath="/landing"
        customBackLabel="Home"
        showNextPrevious={true}
      />
      <TooltipProvider delayDuration={300}>
        <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900">
          {/* Background Effects */}
          <div className="absolute inset-0 bg-gradient-to-br from-purple-500/10 via-blue-500/10 to-slate-500/10" />

          {/* Header */}
          <div className="relative z-10 bg-gradient-to-r from-purple-900/80 via-blue-900/80 to-slate-900/80 backdrop-blur-sm border-b border-purple-500/30">
            <div className="max-w-7xl mx-auto flex justify-between items-center p-4">
              <div>
                <h1 className="text-3xl font-bold bg-gradient-to-r from-purple-400 via-blue-400 to-white bg-clip-text text-transparent">
                  🚨 SafeRoute AI™ - Emergency Response Portal
                </h1>
                <p className="text-purple-300">Real-Time Emergency Coordination & Response Management</p>
              </div>
              <div className="flex items-center space-x-6 text-sm">
                <div className="flex items-center space-x-2 bg-black/30 backdrop-blur-sm rounded-lg px-3 py-2 border border-green-500/30">
                  <span className="w-3 h-3 bg-green-400 rounded-full animate-pulse"></span>
                  <span className="text-white">🛰️ Starlink: Connected</span>
                </div>
                <div className="flex items-center space-x-2 bg-black/30 backdrop-blur-sm rounded-lg px-3 py-2 border border-blue-500/30">
                  <span className="w-3 h-3 bg-blue-400 rounded-full animate-pulse"></span>
                  <span className="text-white">📡 Units: {unitsOnline}</span>
                </div>
                <div className="flex items-center space-x-2 bg-black/30 backdrop-blur-sm rounded-lg px-3 py-2 border border-purple-500/30">
                  <span className="w-3 h-3 bg-purple-400 rounded-full animate-pulse"></span>
                  <span className="text-white">⚡ Response: {avgResponse}</span>
                </div>
                <span className="text-white">
                  👤 {user?.first_name} {user?.last_name} - Responder
                </span>
              </div>
            </div>
          </div>

          <div className="relative z-10 max-w-7xl mx-auto p-6">
            <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
              <TabsList className="bg-slate-800/60 border border-slate-600 backdrop-blur-sm">
                <TabsTrigger
                  value="incidents"
                  className="data-[state=active]:bg-red-500/20 data-[state=active]:text-red-400"
                >
                  <Flame className="w-4 h-4 mr-2" />
                  Active Incidents
                </TabsTrigger>
                <TabsTrigger
                  value="live-feed"
                  className="data-[state=active]:bg-orange-500/20 data-[state=active]:text-orange-400"
                >
                  <Radio className="w-4 h-4 mr-2" />
                  Live Feed
                </TabsTrigger>
                <TabsTrigger
                  value="communications"
                  className="data-[state=active]:bg-purple-500/20 data-[state=active]:text-purple-400"
                >
                  <Phone className="w-4 h-4 mr-2" />
                  Communications
                </TabsTrigger>
                <TabsTrigger
                  value="units"
                  className="data-[state=active]:bg-blue-500/20 data-[state=active]:text-blue-400"
                >
                  <Truck className="w-4 h-4 mr-2" />
                  Response Units
                </TabsTrigger>
                <TabsTrigger
                  value="coordination"
                  className="data-[state=active]:bg-green-500/20 data-[state=active]:text-green-400"
                >
                  <Users className="w-4 h-4 mr-2" />
                  Coordination
                </TabsTrigger>
              </TabsList>

              <TabsContent value="live-feed" className="space-y-6">
                <LiveIncidentFeed />
              </TabsContent>

              <TabsContent value="communications" className="space-y-6">
                <LiveCommunications />
              </TabsContent>

              <TabsContent value="incidents" className="space-y-6">
                {/* Critical Incidents Overview */}
                <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-6">
                  <Card className="bg-red-900/40 border-red-500/30 backdrop-blur-sm">
                    <CardHeader className="pb-3">
                      <CardTitle className="text-red-400 text-sm">Critical Incidents</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="text-3xl font-bold text-white">{activeIncidents}</div>
                      <p className="text-red-300 text-xs">Requiring immediate response</p>
                    </CardContent>
                  </Card>

                  <Card className="bg-orange-900/40 border-orange-500/30 backdrop-blur-sm">
                    <CardHeader className="pb-3">
                      <CardTitle className="text-orange-400 text-sm">Avg Response Time</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="text-3xl font-bold text-white">{avgResponse}</div>
                      <p className="text-orange-300 text-xs">Minutes to first responder</p>
                    </CardContent>
                  </Card>

                  <Card className="bg-blue-900/40 border-blue-500/30 backdrop-blur-sm">
                    <CardHeader className="pb-3">
                      <CardTitle className="text-blue-400 text-sm">Connected Units</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="text-3xl font-bold text-white">{connectedUnits}</div>
                      <p className="text-blue-300 text-xs">Active emergency responders</p>
                    </CardContent>
                  </Card>

                  <Card className="bg-green-900/40 border-green-500/30 backdrop-blur-sm">
                    <CardHeader className="pb-3">
                      <CardTitle className="text-green-400 text-sm">Success Rate</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="text-3xl font-bold text-white">97.3%</div>
                      <p className="text-green-300 text-xs">Successful emergency responses</p>
                    </CardContent>
                  </Card>
                </div>
              </TabsContent>

              <TabsContent value="units" className="space-y-6">
                <div className="grid gap-6">
                  {emsUnits.map((unit) => (
                    <Card key={unit.id} className="bg-slate-800/60 border-slate-600 backdrop-blur-sm">
                      <CardHeader>
                        <div className="flex justify-between items-start">
                          <div>
                            <CardTitle className="text-white flex items-center space-x-2">
                              <Truck className="w-5 h-5 text-blue-400" />
                              <span>
                                {unit.id} - {unit.type}
                              </span>
                            </CardTitle>
                            <p className="text-gray-400 text-sm">{unit.location}</p>
                          </div>
                          <Badge
                            className={
                              unit.status === "Available"
                                ? "bg-green-500/20 text-green-400 border-green-500/30"
                                : unit.status === "En Route"
                                  ? "bg-yellow-500/20 text-yellow-400 border-yellow-500/30"
                                  : "bg-red-500/20 text-red-400 border-red-500/30"
                            }
                          >
                            {unit.status}
                          </Badge>
                        </div>
                      </CardHeader>
                      <CardContent>
                        <div className="grid md:grid-cols-3 gap-4">
                          <div>
                            <h4 className="text-white font-medium mb-2">Crew</h4>
                            <div className="space-y-1">
                              {unit.crew.map((member, index) => (
                                <p key={index} className="text-gray-300 text-sm">
                                  {member}
                                </p>
                              ))}
                            </div>
                          </div>
                          <div>
                            <h4 className="text-white font-medium mb-2">Equipment</h4>
                            <div className="flex flex-wrap gap-1">
                              {unit.equipment.map((item, index) => (
                                <Badge key={index} variant="outline" className="text-xs border-gray-500 text-gray-400">
                                  {item}
                                </Badge>
                              ))}
                            </div>
                          </div>
                          <div>
                            <h4 className="text-white font-medium mb-2">Status</h4>
                            <p className="text-gray-300 text-sm">Last update: {unit.lastUpdate}</p>
                            <div className="flex space-x-2 mt-2">
                              <Button size="sm" className="bg-blue-600 hover:bg-blue-700">
                                <Radio className="w-4 h-4 mr-1" />
                                Contact
                              </Button>
                              <Button
                                size="sm"
                                variant="outline"
                                className="border-gray-600 text-gray-300 hover:bg-gray-700 bg-transparent"
                              >
                                <MapPin className="w-4 h-4 mr-1" />
                                Track
                              </Button>
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </TabsContent>

              <TabsContent value="coordination" className="space-y-6">
                {/* Elder Portal Authority */}
                <Card className="bg-slate-800/60 border-yellow-500/30 backdrop-blur-sm">
                  <CardHeader>
                    <CardTitle className="text-white flex items-center space-x-2">
                      <Crown className="w-5 h-5 text-yellow-500" />
                      <span>Elder Portal Authority</span>
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <button>
                            <Info className="w-4 h-4 text-gray-400 hover:text-white transition-colors" />
                          </button>
                        </TooltipTrigger>
                        <TooltipContent className="max-w-sm bg-slate-800 border-slate-600 text-white z-[60]">
                          <p>
                            <strong>Elder Portal Authority:</strong> Patent-protected indigenous sovereignty integration
                            with cryptographic authentication, routing override authority, sacred land protection, and
                            traditional healing protocol integration.
                          </p>
                        </TooltipContent>
                      </Tooltip>
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="p-4 bg-yellow-900/20 border border-yellow-500/30 rounded-lg">
                      <div className="flex items-center space-x-3 mb-3">
                        <div className="w-10 h-10 bg-yellow-600 rounded-full flex items-center justify-center">
                          <Crown className="w-5 h-5 text-white" />
                        </div>
                        <div>
                          <h4 className="text-white font-medium">Elder Mary Littlewolf</h4>
                          <p className="text-yellow-400 text-sm">Authorized Override • Cree Nation</p>
                        </div>
                      </div>
                      <div className="space-y-2 text-sm">
                        <div className="flex items-center justify-between">
                          <span className="text-gray-300">Routing Authority</span>
                          <Badge variant="outline" className="border-green-500 text-green-400">
                            Active
                          </Badge>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-gray-300">Sacred Land Protection</span>
                          <Badge variant="outline" className="border-blue-500 text-blue-400">
                            Enabled
                          </Badge>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </TooltipProvider>
    </>
  )
}
