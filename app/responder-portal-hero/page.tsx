"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import FloatingEmergencyButtons from "@/components/emergency/FloatingEmergencyButtons"
import {
  Shield,
  Radio,
  MapPin,
  Users,
  Truck,
  Clock,
  AlertTriangle,
  Zap,
  Satellite,
  Hospital,
  Flame,
  Car,
  Plane,
  Heart,
  Navigation,
  Target,
  Database,
  BarChart3,
  Phone,
  Video,
} from "lucide-react"

export default function ResponderPortalHero() {
  const [activeIncidents, setActiveIncidents] = useState(3)
  const [responseTime, setResponseTime] = useState(0)
  const [connectedUnits, setConnectedUnits] = useState(12)
  const [selectedIncident, setSelectedIncident] = useState<string | null>(null)

  useEffect(() => {
    const timer = setInterval(() => {
      setResponseTime((prev) => prev + 1)
    }, 1000)
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
    },
  ]

  const units = [
    { id: "EMS-01", type: "Ambulance", status: "En Route", location: "Downtown", crew: 2, icon: Truck },
    { id: "FIRE-03", type: "Fire Engine", status: "Available", location: "Station 5", crew: 4, icon: Flame },
    { id: "POLICE-12", type: "Patrol Unit", status: "On Scene", location: "5th Ave", crew: 2, icon: Shield },
    { id: "EMS-04", type: "Paramedic Unit", status: "Available", location: "Central", crew: 2, icon: Heart },
    { id: "FIRE-01", type: "Ladder Truck", status: "En Route", location: "Highway 1", crew: 3, icon: Truck },
    { id: "HELI-01", type: "Air Rescue", status: "Standby", location: "Helipad", crew: 3, icon: Plane },
  ]

  const hospitals = [
    { name: "General Hospital", beds: 12, eta: "8 min", status: "Ready", trauma: true },
    { name: "Regional Medical", beds: 6, eta: "15 min", status: "Busy", trauma: false },
    { name: "Emergency Clinic", beds: 3, eta: "5 min", status: "Ready", trauma: false },
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      {/* Background Effects */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 via-purple-500/5 to-red-500/5" />

      {/* Header */}
      <div className="relative z-10 p-6 border-b border-white/10 bg-black/20 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <div className="w-12 h-12 bg-gradient-to-r from-red-500 to-orange-500 rounded-full flex items-center justify-center">
              <Shield className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-2xl font-bold bg-gradient-to-r from-white via-red-200 to-orange-200 bg-clip-text text-transparent">
                HERO OS™
              </h1>
              <p className="text-gray-300">Professional Responder Coordination</p>
            </div>
          </div>

          <div className="flex items-center space-x-6">
            <div className="text-center">
              <div className="text-2xl font-bold text-white">{activeIncidents}</div>
              <p className="text-xs text-gray-400">Active Incidents</p>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-green-400">{connectedUnits}</div>
              <p className="text-xs text-gray-400">Units Online</p>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-blue-400">
                {Math.floor(responseTime / 60)}:{(responseTime % 60).toString().padStart(2, "0")}
              </div>
              <p className="text-xs text-gray-400">Avg Response</p>
            </div>
            <Badge variant="outline" className="border-green-500 text-green-400">
              <div className="w-2 h-2 bg-green-500 rounded-full mr-2 animate-pulse" />
              HERO OS Active
            </Badge>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="relative z-10 p-6">
        <div className="max-w-7xl mx-auto">
          <Tabs defaultValue="incidents" className="space-y-6">
            <TabsList className="bg-black/40 border border-white/10">
              <TabsTrigger value="incidents" className="data-[state=active]:bg-red-500/20">
                <AlertTriangle className="w-4 h-4 mr-2" />
                Active Incidents
              </TabsTrigger>
              <TabsTrigger value="units" className="data-[state=active]:bg-blue-500/20">
                <Truck className="w-4 h-4 mr-2" />
                Unit Status
              </TabsTrigger>
              <TabsTrigger value="coordination" className="data-[state=active]:bg-purple-500/20">
                <Radio className="w-4 h-4 mr-2" />
                Coordination
              </TabsTrigger>
              <TabsTrigger value="analytics" className="data-[state=active]:bg-green-500/20">
                <BarChart3 className="w-4 h-4 mr-2" />
                LOGIQ™ Analytics
              </TabsTrigger>
            </TabsList>

            <TabsContent value="incidents" className="space-y-6">
              {/* Critical Incident Alert */}
              <Card className="bg-gradient-to-r from-red-500/20 to-orange-500/20 border-red-500/30 backdrop-blur-sm">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                      <div className="w-12 h-12 bg-red-500 rounded-full flex items-center justify-center animate-pulse">
                        <Heart className="w-6 h-6 text-white" />
                      </div>
                      <div>
                        <h3 className="text-xl font-bold text-white">CRITICAL: Cardiac Emergency</h3>
                        <p className="text-red-200">Downtown Community Center • ETA: 3 minutes</p>
                      </div>
                    </div>
                    <div className="flex space-x-2">
                      <Button className="bg-red-500 hover:bg-red-600">
                        <Phone className="w-4 h-4 mr-2" />
                        Voice
                      </Button>
                      <Button className="bg-blue-500 hover:bg-blue-600">
                        <Video className="w-4 h-4 mr-2" />
                        Video Link
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Incidents Grid */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {incidents.map((incident) => (
                  <Card
                    key={incident.id}
                    className={`bg-black/40 ${incident.borderColor} backdrop-blur-sm hover:border-white/30 transition-all duration-300 cursor-pointer`}
                    onClick={() => setSelectedIncident(incident.id)}
                  >
                    <CardHeader className="pb-3">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-3">
                          <div className={`w-10 h-10 ${incident.color} rounded-full flex items-center justify-center`}>
                            <incident.icon className="w-5 h-5 text-white" />
                          </div>
                          <div>
                            <CardTitle className="text-white text-lg">{incident.type}</CardTitle>
                            <p className="text-sm text-gray-400">{incident.id}</p>
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
                    </CardHeader>
                    <CardContent className="space-y-3">
                      <div className="flex items-center space-x-2 text-gray-300">
                        <MapPin className="w-4 h-4" />
                        <span className="text-sm">{incident.location}</span>
                      </div>
                      <div className="flex items-center space-x-2 text-gray-400">
                        <Target className="w-4 h-4" />
                        <span className="text-xs font-mono">{incident.coordinates}</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-4">
                          <div className="flex items-center space-x-1">
                            <Clock className="w-4 h-4 text-blue-400" />
                            <span className="text-sm text-blue-400">ETA: {incident.eta}</span>
                          </div>
                          <div className="flex items-center space-x-1">
                            <Users className="w-4 h-4 text-green-400" />
                            <span className="text-sm text-green-400">{incident.unitsAssigned} units</span>
                          </div>
                        </div>
                        <Badge variant="outline" className="border-blue-500 text-blue-400">
                          {incident.status}
                        </Badge>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="units" className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {units.map((unit) => (
                  <Card key={unit.id} className="bg-black/40 border-white/10 backdrop-blur-sm">
                    <CardHeader className="pb-3">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-3">
                          <div className="w-10 h-10 bg-blue-500 rounded-full flex items-center justify-center">
                            <unit.icon className="w-5 h-5 text-white" />
                          </div>
                          <div>
                            <CardTitle className="text-white text-lg">{unit.id}</CardTitle>
                            <p className="text-sm text-gray-400">{unit.type}</p>
                          </div>
                        </div>
                        <Badge
                          variant="outline"
                          className={`${
                            unit.status === "Available"
                              ? "border-green-500 text-green-400"
                              : unit.status === "En Route"
                                ? "border-yellow-500 text-yellow-400"
                                : unit.status === "On Scene"
                                  ? "border-red-500 text-red-400"
                                  : "border-gray-500 text-gray-400"
                          }`}
                        >
                          {unit.status}
                        </Badge>
                      </div>
                    </CardHeader>
                    <CardContent className="space-y-3">
                      <div className="flex items-center space-x-2 text-gray-300">
                        <MapPin className="w-4 h-4" />
                        <span className="text-sm">{unit.location}</span>
                      </div>
                      <div className="flex items-center space-x-2 text-gray-300">
                        <Users className="w-4 h-4" />
                        <span className="text-sm">{unit.crew} crew members</span>
                      </div>
                      <div className="flex space-x-2">
                        <Button
                          size="sm"
                          variant="outline"
                          className="border-blue-500 text-blue-400 hover:bg-blue-500/20 bg-transparent"
                        >
                          <Radio className="w-3 h-3 mr-1" />
                          Contact
                        </Button>
                        <Button
                          size="sm"
                          variant="outline"
                          className="border-purple-500 text-purple-400 hover:bg-purple-500/20 bg-transparent"
                        >
                          <Navigation className="w-3 h-3 mr-1" />
                          Track
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="coordination" className="space-y-6">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* VITALsync™ Hospital Integration */}
                <Card className="bg-black/40 border-green-500/30 backdrop-blur-sm">
                  <CardHeader>
                    <CardTitle className="text-white flex items-center space-x-2">
                      <Hospital className="w-5 h-5 text-green-400" />
                      <span>VITALsync™ Hospital Status</span>
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {hospitals.map((hospital, index) => (
                      <div key={index} className="flex items-center justify-between p-3 bg-white/5 rounded-lg">
                        <div>
                          <h4 className="text-white font-medium">{hospital.name}</h4>
                          <p className="text-sm text-gray-400">
                            {hospital.beds} beds • ETA: {hospital.eta}
                            {hospital.trauma && <span className="text-red-400 ml-2">• Trauma Center</span>}
                          </p>
                        </div>
                        <Badge
                          variant="outline"
                          className={
                            hospital.status === "Ready"
                              ? "border-green-500 text-green-400"
                              : "border-yellow-500 text-yellow-400"
                          }
                        >
                          {hospital.status}
                        </Badge>
                      </div>
                    ))}
                  </CardContent>
                </Card>

                {/* LAB™ System Tracking */}
                <Card className="bg-black/40 border-purple-500/30 backdrop-blur-sm">
                  <CardHeader>
                    <CardTitle className="text-white flex items-center space-x-2">
                      <Satellite className="w-5 h-5 text-purple-400" />
                      <span>LAB™ Beacon Tracking</span>
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="text-center">
                      <div className="text-4xl font-bold text-purple-400">8</div>
                      <p className="text-gray-400">Active Beacons</p>
                    </div>
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-400">Signal Strength</span>
                        <span className="text-green-400">Excellent</span>
                      </div>
                      <Progress value={92} className="h-2" />
                    </div>
                    <Button className="w-full bg-purple-500 hover:bg-purple-600">
                      <Target className="w-4 h-4 mr-2" />
                      View All Beacons
                    </Button>
                  </CardContent>
                </Card>
              </div>

              {/* SkyBridge™ Communications */}
              <Card className="bg-black/40 border-blue-500/30 backdrop-blur-sm">
                <CardHeader>
                  <CardTitle className="text-white flex items-center space-x-2">
                    <Radio className="w-5 h-5 text-blue-400" />
                    <span>SkyBridge™ Multi-Layer Communications</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                    <div className="text-center p-4 bg-green-500/20 rounded-lg border border-green-500/30">
                      <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-2">
                        <Zap className="w-4 h-4 text-white" />
                      </div>
                      <p className="text-green-400 font-medium">LTE</p>
                      <p className="text-xs text-green-300">Active</p>
                    </div>
                    <div className="text-center p-4 bg-blue-500/20 rounded-lg border border-blue-500/30">
                      <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center mx-auto mb-2">
                        <Radio className="w-4 h-4 text-white" />
                      </div>
                      <p className="text-blue-400 font-medium">Mesh</p>
                      <p className="text-xs text-blue-300">Standby</p>
                    </div>
                    <div className="text-center p-4 bg-purple-500/20 rounded-lg border border-purple-500/30">
                      <div className="w-8 h-8 bg-purple-500 rounded-full flex items-center justify-center mx-auto mb-2">
                        <Satellite className="w-4 h-4 text-white" />
                      </div>
                      <p className="text-purple-400 font-medium">Satellite</p>
                      <p className="text-xs text-purple-300">Ready</p>
                    </div>
                    <div className="text-center p-4 bg-orange-500/20 rounded-lg border border-orange-500/30">
                      <div className="w-8 h-8 bg-orange-500 rounded-full flex items-center justify-center mx-auto mb-2">
                        <Target className="w-4 h-4 text-white" />
                      </div>
                      <p className="text-orange-400 font-medium">Beacon</p>
                      <p className="text-xs text-orange-300">Backup</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="analytics" className="space-y-6">
              {/* LOGIQ™ Learning Engine */}
              <Card className="bg-black/40 border-green-500/30 backdrop-blur-sm">
                <CardHeader>
                  <CardTitle className="text-white flex items-center space-x-2">
                    <Database className="w-5 h-5 text-green-400" />
                    <span>LOGIQ™ Evidence-Based Learning</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="text-center">
                      <div className="text-3xl font-bold text-green-400">94%</div>
                      <p className="text-gray-400">Protocol Accuracy</p>
                    </div>
                    <div className="text-center">
                      <div className="text-3xl font-bold text-blue-400">2.3min</div>
                      <p className="text-gray-400">Avg Response Time</p>
                    </div>
                    <div className="text-center">
                      <div className="text-3xl font-bold text-purple-400">847</div>
                      <p className="text-gray-400">Cases Analyzed</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Performance Metrics */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Card className="bg-black/40 border-blue-500/30 backdrop-blur-sm">
                  <CardHeader>
                    <CardTitle className="text-white">Response Time Trends</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="flex justify-between items-center">
                        <span className="text-gray-400">This Month</span>
                        <span className="text-green-400">↓ 15% improvement</span>
                      </div>
                      <Progress value={85} className="h-3" />
                      <p className="text-sm text-gray-400">Average response time reduced from 4.2 to 3.6 minutes</p>
                    </div>
                  </CardContent>
                </Card>

                <Card className="bg-black/40 border-purple-500/30 backdrop-blur-sm">
                  <CardHeader>
                    <CardTitle className="text-white">Success Rate</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="flex justify-between items-center">
                        <span className="text-gray-400">Positive Outcomes</span>
                        <span className="text-green-400">96.8%</span>
                      </div>
                      <Progress value={97} className="h-3" />
                      <p className="text-sm text-gray-400">Highest success rate in regional network</p>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </div>
      <FloatingEmergencyButtons />
    </div>
  )
}
