"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import UniversalNavigation from "@/components/navigation/UniversalNavigation"
import {
  Shield,
  Radio,
  MapPin,
  Users,
  Truck,
  Clock,
  Flame,
  Car,
  Plane,
  Heart,
  Target,
  Database,
  Phone,
  Video,
  Globe,
  TrendingUp,
  Stethoscope,
  Crown,
  Info,
  Cloud,
  Wind,
  Thermometer,
  Building2,
} from "lucide-react"

export default function ResponderPortalHero() {
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

  const emsUnits = [
    { id: "EMS-01", location: "Downtown", status: "Available" },
    { id: "EMS-02", location: "Uptown", status: "En Route" },
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
          <div className="absolute inset-0 bg-[url('/api/placeholder/1920/1080')] bg-cover bg-center opacity-5" />
          <div className="absolute inset-0 bg-gradient-to-br from-blue-500/20 via-slate-500/15 to-blue-500/20" />

          {/* Header */}
          <div className="relative z-10 p-6 border-b border-blue-500/30 bg-slate-800/80 backdrop-blur-sm">
            <div className="max-w-7xl mx-auto flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-slate-500 rounded-full flex items-center justify-center">
                  <Shield className="w-6 h-6 text-white" />
                </div>
                <div>
                  <div className="flex items-center space-x-2">
                    <h1 className="text-2xl font-bold bg-gradient-to-r from-white via-blue-200 to-slate-200 bg-clip-text text-transparent">
                      HERO OS™
                    </h1>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <button>
                          <Info className="w-4 h-4 text-gray-400 hover:text-white transition-colors" />
                        </button>
                      </TooltipTrigger>
                      <TooltipContent className="max-w-sm bg-slate-800 border-slate-600 text-white z-[60]">
                        <p>
                          <strong>HERO OS™:</strong> Patent-protected modular emergency response operating system
                          providing multi-agency orchestration, evidence-based protocols, and ecosystem integration.
                          Serves as the professional responder backbone coordinating with civilian HERO CP™ systems.
                        </p>
                      </TooltipContent>
                    </Tooltip>
                  </div>
                  <p className="text-gray-300">Professional Responder Coordination</p>
                </div>
              </div>
              <div className="flex items-center space-x-6">
                <div className="text-center">
                  <div className="text-2xl font-bold text-white">{activeIncidents}</div>
                  <div className="flex items-center space-x-1">
                    <p className="text-sm text-gray-300">Active Incidents</p>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <button>
                          <Info className="w-3 h-3 text-gray-400 hover:text-white transition-colors" />
                        </button>
                      </TooltipTrigger>
                      <TooltipContent className="bg-slate-800 border-slate-600 text-white z-[60]">
                        <p>
                          Real-time active incident count with AI-driven triage and priority assignment. Integrates with
                          civilian HERO CP™ activations and professional dispatch systems.
                        </p>
                      </TooltipContent>
                    </Tooltip>
                  </div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-green-400">{unitsOnline}</div>
                  <div className="flex items-center space-x-1">
                    <p className="text-sm text-gray-300">Units Online</p>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <button>
                          <Info className="w-3 h-3 text-gray-400 hover:text-green-400 transition-colors" />
                        </button>
                      </TooltipTrigger>
                      <TooltipContent className="bg-slate-800 border-slate-600 text-white z-[60]">
                        <p>
                          Multi-agency units connected to HERO OS™ with real-time status, capabilities, and location
                          tracking. Enables coordinated resource optimization across EMS, Fire, and Police.
                        </p>
                      </TooltipContent>
                    </Tooltip>
                  </div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-blue-400">{avgResponse}</div>
                  <div className="flex items-center space-x-1">
                    <p className="text-sm text-gray-300">Avg Response</p>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <button>
                          <Info className="w-3 h-3 text-gray-400 hover:text-blue-400 transition-colors" />
                        </button>
                      </TooltipTrigger>
                      <TooltipContent className="bg-slate-800 border-slate-600 text-white z-[60]">
                        <p>
                          AI-optimized average response time using predictive resource positioning, weather integration,
                          and multi-agency coordination. 30-50% improvement through patent-protected algorithms.
                        </p>
                      </TooltipContent>
                    </Tooltip>
                  </div>
                </div>
                <Badge variant="outline" className="border-green-500 text-green-400">
                  <div className="w-2 h-2 bg-green-500 rounded-full mr-2 animate-pulse" />
                  HERO OS Active
                </Badge>
              </div>
            </div>
          </div>

          {/* Weather Integration Banner */}
          <div className="relative z-10 bg-gradient-to-r from-orange-600/20 via-red-600/20 to-orange-600/20 border-b border-orange-500/30 p-4">
            <div className="max-w-7xl mx-auto flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <div className="w-8 h-8 bg-orange-500 rounded-full flex items-center justify-center">
                  <Cloud className="w-4 h-4 text-white" />
                </div>
                <div>
                  <div className="flex items-center space-x-2">
                    <h3 className="text-white font-semibold">Weather Alert: High Fire Risk</h3>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <button>
                          <Info className="w-4 h-4 text-gray-400 hover:text-white transition-colors" />
                        </button>
                      </TooltipTrigger>
                      <TooltipContent className="max-w-sm bg-slate-800 border-slate-600 text-white z-[60]">
                        <p>
                          <strong>Weather Integration:</strong> Patent-protected weather-informed emergency response
                          with predictive resource positioning, indigenous traditional knowledge integration, and
                          real-time hazard monitoring for optimal emergency coordination.
                        </p>
                      </TooltipContent>
                    </Tooltip>
                  </div>
                  <p className="text-orange-200 text-sm">Wind: 45 km/h, Humidity: 15%, Temperature: 32°C</p>
                </div>
              </div>
              <div className="flex items-center space-x-4">
                <Badge variant="outline" className="border-orange-500 text-orange-400">
                  <Wind className="w-3 h-3 mr-1" />
                  Pre-positioned Units: 8
                </Badge>
                <Badge variant="outline" className="border-yellow-500 text-yellow-400">
                  <Thermometer className="w-3 h-3 mr-1" />
                  Elder Advisory Active
                </Badge>
              </div>
            </div>
          </div>

          {/* Main Content */}
          <div className="relative z-10 p-6">
            <div className="max-w-7xl mx-auto">
              <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
                <TabsList className="grid w-full grid-cols-4 bg-slate-800/60 backdrop-blur-sm">
                  <TabsTrigger value="incidents" className="data-[state=active]:bg-red-600">
                    Active Incidents
                  </TabsTrigger>
                  <TabsTrigger value="units" className="data-[state=active]:bg-blue-600">
                    Unit Status
                  </TabsTrigger>
                  <TabsTrigger value="coordination" className="data-[state=active]:bg-green-600">
                    Coordination
                  </TabsTrigger>
                  <TabsTrigger value="analytics" className="data-[state=active]:bg-purple-600">
                    LOGIQ™ Analytics
                  </TabsTrigger>
                </TabsList>

                {/* Active Incidents Tab */}
                <TabsContent value="incidents" className="space-y-6">
                  {/* Critical Incident */}
                  <Card className="bg-red-900/40 border-red-500/50 backdrop-blur-sm">
                    <CardHeader>
                      <CardTitle className="text-white flex items-center space-x-2">
                        <Heart className="w-5 h-5 text-red-500" />
                        <span>CRITICAL: Cardiac Emergency</span>
                        <Badge variant="outline" className="border-red-500 text-red-400">
                          HERO CP™ Active
                        </Badge>
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <button>
                              <Info className="w-4 h-4 text-gray-400 hover:text-white transition-colors" />
                            </button>
                          </TooltipTrigger>
                          <TooltipContent className="max-w-sm bg-slate-800 border-slate-600 text-white z-[60]">
                            <p>
                              <strong>Critical Incident Integration:</strong> Real-time coordination between civilian
                              HERO CP™ activation and professional responder systems. Features ShareSafe™ medical data
                              access and LOGIQ™ evidence-based protocols.
                            </p>
                          </TooltipContent>
                        </Tooltip>
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div>
                          <p className="text-gray-300 text-sm">Location</p>
                          <p className="text-white font-medium">Downtown Community Center</p>
                          <p className="text-gray-400 text-xs">ETA: 3 minutes</p>
                        </div>
                        <div>
                          <p className="text-gray-300 text-sm">HERO CP™ Status</p>
                          <p className="text-green-400 font-medium">CPR in Progress</p>
                          <p className="text-gray-400 text-xs">Visual-Rhythm Active</p>
                        </div>
                        <div>
                          <p className="text-gray-300 text-sm">ShareSafe™ Data</p>
                          <p className="text-blue-400 font-medium">Medical History Available</p>
                          <p className="text-gray-400 text-xs">Consent: Emergency Override</p>
                        </div>
                      </div>
                      <div className="flex space-x-2">
                        <Button size="sm" className="bg-red-600 hover:bg-red-700">
                          <Phone className="w-4 h-4 mr-2" />
                          Voice
                        </Button>
                        <Button size="sm" className="bg-blue-600 hover:bg-blue-700">
                          <Video className="w-4 h-4 mr-2" />
                          Video Link
                        </Button>
                      </div>
                    </CardContent>
                  </Card>

                  {/* Other Incidents */}
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    {incidents.map((incident, index) => (
                      <Card key={index} className="bg-slate-800/60 border-slate-700/50 backdrop-blur-sm">
                        <CardContent className="p-6">
                          <div className="flex items-start justify-between mb-4">
                            <div className="flex items-center space-x-3">
                              <div
                                className={`w-10 h-10 rounded-full flex items-center justify-center ${
                                  incident.priority === "Critical"
                                    ? "bg-red-600"
                                    : incident.priority === "High"
                                      ? "bg-orange-600"
                                      : "bg-yellow-600"
                                }`}
                              >
                                <incident.icon className="w-5 h-5 text-white" />
                              </div>
                              <div>
                                <div className="flex items-center space-x-2">
                                  <h3 className="text-white font-semibold">{incident.type}</h3>
                                  <Tooltip>
                                    <TooltipTrigger asChild>
                                      <button>
                                        <Info className="w-3 h-3 text-gray-400 hover:text-white transition-colors" />
                                      </button>
                                    </TooltipTrigger>
                                    <TooltipContent className="max-w-sm bg-slate-800 border-slate-600 text-white z-[60]">
                                      <p>
                                        <strong>Multi-Agency Incident:</strong> Coordinated response across{" "}
                                        {incident.agencies.join(", ")} with predictive outcome modeling, resource
                                        optimization, and seamless handoff protocols.
                                      </p>
                                    </TooltipContent>
                                  </Tooltip>
                                </div>
                                <p className="text-gray-400 text-sm">{incident.id}</p>
                              </div>
                            </div>
                            <Badge
                              variant="outline"
                              className={`${
                                incident.priority === "Critical"
                                  ? "border-red-500 text-red-400"
                                  : incident.priority === "High"
                                    ? "border-orange-500 text-orange-400"
                                    : "border-yellow-500 text-yellow-400"
                              }`}
                            >
                              {incident.priority}
                            </Badge>
                          </div>

                          <div className="space-y-2 mb-4">
                            <div className="flex items-center space-x-2">
                              <MapPin className="w-4 h-4 text-gray-400" />
                              <span className="text-gray-300 text-sm">{incident.location}</span>
                            </div>
                            <div className="flex items-center space-x-2">
                              <Globe className="w-4 h-4 text-gray-400" />
                              <span className="text-gray-300 text-sm">{incident.coordinates}</span>
                            </div>
                            <div className="flex items-center space-x-2">
                              <Clock className="w-4 h-4 text-gray-400" />
                              <span className="text-gray-300 text-sm">ETA: {incident.eta}</span>
                            </div>
                            <div className="flex items-center space-x-2">
                              <Users className="w-4 h-4 text-gray-400" />
                              <span className="text-gray-300 text-sm">{incident.units} units</span>
                            </div>
                          </div>

                          <div className="flex flex-wrap gap-2 mb-4">
                            {incident.agencies.map((agency, agencyIndex) => (
                              <Badge key={agencyIndex} variant="outline" className="border-blue-500 text-blue-400">
                                {agency}
                              </Badge>
                            ))}
                          </div>

                          <Button
                            size="sm"
                            className={`w-full ${
                              incident.status === "Active"
                                ? "bg-green-600 hover:bg-green-700"
                                : incident.status === "En Route"
                                  ? "bg-blue-600 hover:bg-blue-700"
                                  : "bg-yellow-600 hover:bg-yellow-700"
                            }`}
                          >
                            {incident.status}
                          </Button>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </TabsContent>

                {/* Unit Status Tab */}
                <TabsContent value="units" className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {/* EMS Units */}
                    <Card className="bg-slate-800/60 border-red-500/30 backdrop-blur-sm">
                      <CardHeader>
                        <CardTitle className="text-white flex items-center space-x-2">
                          <Stethoscope className="w-5 h-5 text-red-500" />
                          <span>EMS Units</span>
                          <Tooltip>
                            <TooltipTrigger asChild>
                              <button>
                                <Info className="w-4 h-4 text-gray-400 hover:text-red-400 transition-colors" />
                              </button>
                            </TooltipTrigger>
                            <TooltipContent className="bg-slate-800 border-slate-600 text-white z-[60]">
                              <p>
                                EMS units with HERO CP™ integration, ShareSafe™ access, and LOGIQ™ protocol compliance.
                                Real-time status and capability tracking.
                              </p>
                            </TooltipContent>
                          </Tooltip>
                        </CardTitle>
                      </CardHeader>
                      <CardContent className="space-y-4">
                        {emsUnits.map((unit, index) => (
                          <div key={index} className="flex items-center justify-between p-3 bg-slate-700/50 rounded-lg">
                            <div>
                              <p className="text-white font-medium">{unit.id}</p>
                              <p className="text-gray-400 text-sm">{unit.location}</p>
                            </div>
                            <Badge
                              variant="outline"
                              className={`${
                                unit.status === "Available"
                                  ? "border-green-500 text-green-400"
                                  : unit.status === "En Route"
                                    ? "border-blue-500 text-blue-400"
                                    : unit.status === "Redeploying"
                                      ? "border-red-500 text-red-400"
                                      : "border-red-500 text-red-400"
                              }`}
                            >
                              {unit.status}
                            </Badge>
                          </div>
                        ))}
                      </CardContent>
                    </Card>

                    {/* Fire Units */}
                    <Card className="bg-slate-800/60 border-orange-500/30 backdrop-blur-sm">
                      <CardHeader>
                        <CardTitle className="text-white flex items-center space-x-2">
                          <Flame className="w-5 h-5 text-orange-500" />
                          <span>Fire Units</span>
                          <Tooltip>
                            <TooltipTrigger asChild>
                              <button>
                                <Info className="w-4 h-4 text-gray-400 hover:text-orange-400 transition-colors" />
                              </button>
                            </TooltipTrigger>
                            <TooltipContent className="bg-slate-800 border-slate-600 text-white z-[60]">
                              <p>
                                Fire department units with weather integration, hazard monitoring, and coordinated
                                response capabilities through HERO OS™ orchestration.
                              </p>
                            </TooltipContent>
                          </Tooltip>
                        </CardTitle>
                      </CardHeader>
                      <CardContent className="space-y-4">
                        {fireUnits.map((unit, index) => (
                          <div key={index} className="flex items-center justify-between p-3 bg-slate-700/50 rounded-lg">
                            <div>
                              <p className="text-white font-medium">{unit.id}</p>
                              <p className="text-gray-400 text-sm">{unit.location}</p>
                            </div>
                            <Badge
                              variant="outline"
                              className={`${
                                unit.status === "Available"
                                  ? "border-green-500 text-green-400"
                                  : unit.status === "En Route"
                                    ? "border-blue-500 text-blue-400"
                                    : "border-red-500 text-red-400"
                              }`}
                            >
                              {unit.status}
                            </Badge>
                          </div>
                        ))}
                      </CardContent>
                    </Card>

                    {/* Police Units */}
                    <Card className="bg-slate-800/60 border-blue-500/30 backdrop-blur-sm">
                      <CardHeader>
                        <CardTitle className="text-white flex items-center space-x-2">
                          <Shield className="w-5 h-5 text-blue-500" />
                          <span>Police Units</span>
                          <Tooltip>
                            <TooltipTrigger asChild>
                              <button>
                                <Info className="w-4 h-4 text-gray-400 hover:text-blue-400 transition-colors" />
                              </button>
                            </TooltipTrigger>
                            <TooltipContent className="bg-slate-800 border-slate-600 text-white z-[60]">
                              <p>
                                Police units with scene security, traffic management, and crowd control coordination
                                through multi-agency HERO OS™ integration.
                              </p>
                            </TooltipContent>
                          </Tooltip>
                        </CardTitle>
                      </CardHeader>
                      <CardContent className="space-y-4">
                        {policeUnits.map((unit, index) => (
                          <div key={index} className="flex items-center justify-between p-3 bg-slate-700/50 rounded-lg">
                            <div>
                              <p className="text-white font-medium">{unit.id}</p>
                              <p className="text-gray-400 text-sm">{unit.location}</p>
                            </div>
                            <Badge
                              variant="outline"
                              className={`${
                                unit.status === "Available"
                                  ? "border-green-500 text-green-400"
                                  : unit.status === "En Route"
                                    ? "border-blue-500 text-blue-400"
                                    : "border-red-500 text-red-400"
                              }`}
                            >
                              {unit.status}
                            </Badge>
                          </div>
                        ))}
                      </CardContent>
                    </Card>
                  </div>
                </TabsContent>

                {/* Coordination Tab */}
                <TabsContent value="coordination" className="space-y-6">
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    {/* VITALsync Hospital Integration */}
                    <Card className="bg-slate-800/60 border-green-500/30 backdrop-blur-sm">
                      <CardHeader>
                        <CardTitle className="text-white flex items-center space-x-2">
                          <Building2 className="w-5 h-5 text-green-500" />
                          <span>VITALsync™ Hospital Integration</span>
                          <Tooltip>
                            <TooltipTrigger asChild>
                              <button>
                                <Info className="w-4 h-4 text-gray-400 hover:text-white transition-colors" />
                              </button>
                            </TooltipTrigger>
                            <TooltipContent className="max-w-sm bg-slate-800 border-slate-600 text-white z-[60]">
                              <p>
                                <strong>VITALsync™ Integration:</strong> Patent-protected real-time hospital capacity
                                management with automated patient routing, surge capacity prediction, and clinical
                                handoff automation. Reduces ED wait times by 40%.
                              </p>
                            </TooltipContent>
                          </Tooltip>
                        </CardTitle>
                      </CardHeader>
                      <CardContent className="space-y-4">
                        {hospitals.map((hospital, index) => (
                          <div key={index} className="p-4 bg-slate-700/50 rounded-lg">
                            <div className="flex items-center justify-between mb-2">
                              <h4 className="text-white font-medium">{hospital.name}</h4>
                              <Badge
                                variant="outline"
                                className={`${
                                  hospital.status === "Available"
                                    ? "border-green-500 text-green-400"
                                    : hospital.status === "Limited"
                                      ? "border-yellow-500 text-yellow-400"
                                      : "border-red-500 text-red-400"
                                }`}
                              >
                                {hospital.status}
                              </Badge>
                            </div>
                            <div className="grid grid-cols-2 gap-4 text-sm">
                              <div>
                                <p className="text-gray-400">ED Beds</p>
                                <p className="text-white">{hospital.beds}</p>
                              </div>
                              <div>
                                <p className="text-gray-400">Wait Time</p>
                                <p className="text-white">{hospital.waitTime}</p>
                              </div>
                              <div>
                                <p className="text-gray-400">Specialties</p>
                                <p className="text-blue-400">{hospital.specialties.join(", ")}</p>
                              </div>
                              <div>
                                <p className="text-gray-400">Distance</p>
                                <p className="text-white">{hospital.distance}</p>
                              </div>
                            </div>
                          </div>
                        ))}
                      </CardContent>
                    </Card>

                    {/* LAB™ Beacon Tracking */}
                    <Card className="bg-slate-800/60 border-purple-500/30 backdrop-blur-sm">
                      <CardHeader>
                        <CardTitle className="text-white flex items-center space-x-2">
                          <Target className="w-5 h-5 text-purple-500" />
                          <span>LAB™ Beacon Tracking</span>
                          <Tooltip>
                            <TooltipTrigger asChild>
                              <button>
                                <Info className="w-4 h-4 text-gray-400 hover:text-white transition-colors" />
                              </button>
                            </TooltipTrigger>
                            <TooltipContent className="max-w-sm bg-slate-800 border-slate-600 text-white z-[60]">
                              <p>
                                <strong>LAB™ (Last Active Beacon):</strong> Patent-protected resilient location tracking
                                system with mesh networking, satellite fallback, and offline operation. Maintains
                                coordination during infrastructure failures.
                              </p>
                            </TooltipContent>
                          </Tooltip>
                        </CardTitle>
                      </CardHeader>
                      <CardContent className="space-y-4">
                        <div className="grid grid-cols-2 gap-4">
                          <div className="p-3 bg-slate-700/50 rounded-lg text-center">
                            <div className="text-2xl font-bold text-purple-400">24</div>
                            <p className="text-gray-400 text-sm">Active Beacons</p>
                          </div>
                          <div className="p-3 bg-slate-700/50 rounded-lg text-center">
                            <div className="text-2xl font-bold text-green-400">98%</div>
                            <p className="text-gray-400 text-sm">Network Coverage</p>
                          </div>
                        </div>
                        <div className="space-y-2">
                          <div className="flex items-center justify-between">
                            <span className="text-gray-300">Cellular Network</span>
                            <Badge variant="outline" className="border-green-500 text-green-400">
                              Online
                            </Badge>
                          </div>
                          <div className="flex items-center justify-between">
                            <span className="text-gray-300">Mesh Network</span>
                            <Badge variant="outline" className="border-blue-500 text-blue-400">
                              Ready
                            </Badge>
                          </div>
                          <div className="flex items-center justify-between">
                            <span className="text-gray-300">Satellite Backup</span>
                            <Badge variant="outline" className="border-yellow-500 text-yellow-400">
                              Standby
                            </Badge>
                          </div>
                          <div className="flex items-center justify-between">
                            <span className="text-gray-300">P2P Beacons</span>
                            <Badge variant="outline" className="border-purple-500 text-purple-400">
                              Active
                            </Badge>
                          </div>
                        </div>
                      </CardContent>
                    </Card>

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
                                <strong>Elder Portal Authority:</strong> Patent-protected indigenous sovereignty
                                integration with cryptographic authentication, routing override authority, sacred land
                                protection, and traditional healing protocol integration.
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
                            <div className="flex items-center justify-between">
                              <span className="text-gray-300">Traditional Protocols</span>
                              <Badge variant="outline" className="border-purple-500 text-purple-400">
                                Available
                              </Badge>
                            </div>
                          </div>
                        </div>
                        <div className="grid grid-cols-2 gap-4 text-sm">
                          <div>
                            <p className="text-gray-400">Protected Areas</p>
                            <p className="text-white">7 Sacred Sites</p>
                          </div>
                          <div>
                            <p className="text-gray-400">Override Events</p>
                            <p className="text-white">3 This Month</p>
                          </div>
                        </div>
                      </CardContent>
                    </Card>

                    {/* Communications Hub */}
                    <Card className="bg-slate-800/60 border-blue-500/30 backdrop-blur-sm">
                      <CardHeader>
                        <CardTitle className="text-white flex items-center space-x-2">
                          <Radio className="w-5 h-5 text-blue-500" />
                          <span>Multi-Agency Communications</span>
                          <Tooltip>
                            <TooltipTrigger asChild>
                              <button>
                                <Info className="w-4 h-4 text-gray-400 hover:text-white transition-colors" />
                              </button>
                            </TooltipTrigger>
                            <TooltipContent className="max-w-sm bg-slate-800 border-slate-600 text-white z-[60]">
                              <p>
                                <strong>Multi-Agency Communications:</strong> Unified communication hub with encrypted
                                channels, priority routing, and seamless handoffs between agencies. Maintains
                                interoperability across all emergency services.
                              </p>
                            </TooltipContent>
                          </Tooltip>
                        </CardTitle>
                      </CardHeader>
                      <CardContent className="space-y-4">
                        <div className="space-y-3">
                          <div className="flex items-center justify-between p-3 bg-slate-700/50 rounded-lg">
                            <div className="flex items-center space-x-3">
                              <div className="w-8 h-8 bg-red-600 rounded-full flex items-center justify-center">
                                <Stethoscope className="w-4 h-4 text-white" />
                              </div>
                              <span className="text-white">EMS Channel</span>
                            </div>
                            <Badge variant="outline" className="border-green-500 text-green-400">
                              Active
                            </Badge>
                          </div>
                          <div className="flex items-center justify-between p-3 bg-slate-700/50 rounded-lg">
                            <div className="flex items-center space-x-3">
                              <div className="w-8 h-8 bg-orange-600 rounded-full flex items-center justify-center">
                                <Flame className="w-4 h-4 text-white" />
                              </div>
                              <span className="text-white">Fire Channel</span>
                            </div>
                            <Badge variant="outline" className="border-green-500 text-green-400">
                              Active
                            </Badge>
                          </div>
                          <div className="flex items-center justify-between p-3 bg-slate-700/50 rounded-lg">
                            <div className="flex items-center space-x-3">
                              <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center">
                                <Shield className="w-4 h-4 text-white" />
                              </div>
                              <span className="text-white">Police Channel</span>
                            </div>
                            <Badge variant="outline" className="border-green-500 text-green-400">
                              Active
                            </Badge>
                          </div>
                          <div className="flex items-center justify-between p-3 bg-slate-700/50 rounded-lg">
                            <div className="flex items-center space-x-3">
                              <div className="w-8 h-8 bg-purple-600 rounded-full flex items-center justify-center">
                                <Users className="w-4 h-4 text-white" />
                              </div>
                              <span className="text-white">Command Channel</span>
                            </div>
                            <Badge variant="outline" className="border-green-500 text-green-400">
                              Active
                            </Badge>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                </TabsContent>

                {/* LOGIQ™ Analytics Tab */}
                <TabsContent value="analytics" className="space-y-6">
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    {/* Evidence-Based Protocol Engine */}
                    <Card className="bg-slate-800/60 border-purple-500/30 backdrop-blur-sm">
                      <CardHeader>
                        <CardTitle className="text-white flex items-center space-x-2">
                          <Database className="w-5 h-5 text-purple-500" />
                          <span>LOGIQ™ Evidence Engine</span>
                          <Tooltip>
                            <TooltipTrigger asChild>
                              <button>
                                <Info className="w-4 h-4 text-gray-400 hover:text-white transition-colors" />
                              </button>
                            </TooltipTrigger>
                            <TooltipContent className="max-w-sm bg-slate-800 border-slate-600 text-white z-[60]">
                              <p>
                                <strong>LOGIQ™ Evidence Engine:</strong> Patent-protected continuous learning system
                                with automated research ingestion, 147-factor quality scoring, and real-time protocol
                                updates based exclusively on peer-reviewed medical research.
                              </p>
                            </TooltipContent>
                          </Tooltip>
                        </CardTitle>
                      </CardHeader>
                      <CardContent className="space-y-4">
                        <div className="grid grid-cols-2 gap-4">
                          <div className="p-3 bg-slate-700/50 rounded-lg text-center">
                            <div className="text-2xl font-bold text-purple-400">2,847</div>
                            <p className="text-gray-400 text-sm">Studies Analyzed</p>
                          </div>
                          <div className="p-3 bg-slate-700/50 rounded-lg text-center">
                            <div className="text-2xl font-bold text-green-400">94%</div>
                            <p className="text-gray-400 text-sm">Evidence Quality</p>
                          </div>
                        </div>
                        <div className="space-y-3">
                          <div className="p-3 bg-green-900/20 border border-green-500/30 rounded-lg">
                            <div className="flex items-center justify-between mb-2">
                              <h4 className="text-green-400 font-medium">Protocol Update Available</h4>
                              <Badge variant="outline" className="border-green-500 text-green-400">
                                New
                              </Badge>
                            </div>
                            <p className="text-gray-300 text-sm">
                              CPR compression depth updated based on 2024 AHA guidelines
                            </p>
                            <p className="text-gray-400 text-xs mt-1">Evidence Score: 96/100 • 3 Systematic Reviews</p>
                          </div>
                          <div className="p-3 bg-blue-900/20 border border-blue-500/30 rounded-lg">
                            <div className="flex items-center justify-between mb-2">
                              <h4 className="text-blue-400 font-medium">Under Review</h4>
                              <Badge variant="outline" className="border-blue-500 text-blue-400">
                                Pending
                              </Badge>
                            </div>
                            <p className="text-gray-300 text-sm">Stroke assessment timing modifications</p>
                            <p className="text-gray-400 text-xs mt-1">Evidence Score: 87/100 • Awaiting validation</p>
                          </div>
                        </div>
                      </CardContent>
                    </Card>

                    {/* Predictive Analytics */}
                    <Card className="bg-slate-800/60 border-green-500/30 backdrop-blur-sm">
                      <CardHeader>
                        <CardTitle className="text-white flex items-center space-x-2">
                          <TrendingUp className="w-5 h-5 text-green-500" />
                          <span>Predictive Analytics</span>
                          <Tooltip>
                            <TooltipTrigger asChild>
                              <button>
                                <Info className="w-4 h-4 text-gray-400 hover:text-white transition-colors" />
                              </button>
                            </TooltipTrigger>
                            <TooltipContent className="max-w-sm bg-slate-800 border-slate-600 text-white z-[60]">
                              <p>
                                <strong>Predictive Analytics:</strong> AI-driven resource optimization using historical
                                patterns, weather integration, and real-time data. Reduces response times by 30-50%
                                through predictive positioning and surge capacity planning.
                              </p>
                            </TooltipContent>
                          </Tooltip>
                        </CardTitle>
                      </CardHeader>
                      <CardContent className="space-y-4">
                        <div className="grid grid-cols-2 gap-4">
                          <div className="p-3 bg-slate-700/50 rounded-lg text-center">
                            <div className="text-2xl font-bold text-green-400">87%</div>
                            <p className="text-gray-400 text-sm">Prediction Accuracy</p>
                          </div>
                          <div className="p-3 bg-slate-700/50 rounded-lg text-center">
                            <div className="text-2xl font-bold text-blue-400">-42%</div>
                            <p className="text-gray-400 text-sm">Response Time</p>
                          </div>
                        </div>
                        <div className="space-y-3">
                          <div className="p-3 bg-orange-900/20 border border-orange-500/30 rounded-lg">
                            <h4 className="text-orange-400 font-medium mb-2">High Risk Period</h4>
                            <p className="text-gray-300 text-sm">
                              Cardiac events likely to increase 15% in next 4 hours
                            </p>
                            <p className="text-gray-400 text-xs mt-1">
                              Weather: High pressure system, elderly population
                            </p>
                          </div>
                          <div className="p-3 bg-blue-900/20 border border-blue-500/30 rounded-lg">
                            <h4 className="text-blue-400 font-medium mb-2">Resource Recommendation</h4>
                            <p className="text-gray-300 text-sm">Pre-position 2 additional units in downtown core</p>
                            <p className="text-gray-400 text-xs mt-1">Confidence: 94% • Historical pattern match</p>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                </TabsContent>
              </Tabs>
            </div>
          </div>
        </div>
      </TooltipProvider>
    </>
  )
}
