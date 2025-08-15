"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Progress } from "@/components/ui/progress"
import { Alert, AlertDescription } from "@/components/ui/alert"
import FloatingEmergencyButtons from "@/components/emergency/FloatingEmergencyButtons"
import UniversalNavigation from "@/components/navigation/UniversalNavigation"
import {
  AlertTriangle,
  Users,
  MapPin,
  Satellite,
  Heart,
  Shield,
  Phone,
  Radio,
  Crown,
  CheckCircle,
  Clock,
  Eye,
  FileText,
  Globe,
  Settings,
  Mic,
  Volume2,
  Languages,
  Lock,
  Database,
  Zap,
} from "lucide-react"

interface EmergencyIncident {
  id: string
  type: "medical" | "search-rescue" | "natural-disaster" | "community"
  location: string
  status: "active" | "responding" | "resolved"
  priority: "low" | "medium" | "high" | "critical"
  timestamp: string
  description: string
  assignedHeroes: string[]
  culturalProtocols: string[]
  elderApproval?: "pending" | "approved" | "requires-review"
  traditionalTerritory?: string
  sacredSiteProximity?: number
  tlrtActive?: boolean
}

interface HeroVolunteer {
  id: string
  name: string
  status: "available" | "responding" | "offline"
  location: string
  skills: string[]
  lastSeen: string
  culturalTraining: boolean
  elderApproved: boolean
}

interface CulturalProtocol {
  id: string
  name: string
  description: string
  status: "active" | "pending" | "inactive"
  applicableIncidents: string[]
  lastUpdated: string
  autoActivated?: boolean
  ocapCompliant?: boolean
}

export default function ElderPortal() {
  const [activeIncidents, setActiveIncidents] = useState<EmergencyIncident[]>([
    {
      id: "1",
      type: "medical",
      location: "Traditional Territory - Sector 7",
      status: "active",
      priority: "critical",
      timestamp: "2024-01-18 14:30",
      description: "Elder requires immediate medical assistance",
      assignedHeroes: ["Sarah M.", "Tom K."],
      culturalProtocols: ["Elder respect protocols", "Traditional medicine consultation"],
      elderApproval: "approved",
      traditionalTerritory: "Squamish Nation Territory",
      sacredSiteProximity: 0.3,
      tlrtActive: true,
    },
    {
      id: "2",
      type: "search-rescue",
      location: "Sacred Site - Grid B4",
      status: "responding",
      priority: "high",
      timestamp: "2024-01-18 13:15",
      description: "Missing hiker near ceremonial grounds",
      assignedHeroes: ["Mike R.", "Lisa P.", "David C."],
      culturalProtocols: ["Sacred site protocols", "Traditional territory acknowledgment"],
      elderApproval: "pending",
      traditionalTerritory: "Tsleil-Waututh Nation Territory",
      sacredSiteProximity: 0.1,
      tlrtActive: true,
    },
    {
      id: "3",
      type: "community",
      location: "Community Center - Main Reserve",
      status: "resolved",
      priority: "medium",
      timestamp: "2024-01-18 11:45",
      description: "Community gathering emergency preparedness",
      assignedHeroes: ["Anna T.", "Robert S."],
      culturalProtocols: ["Community consultation", "Traditional governance"],
      elderApproval: "approved",
      traditionalTerritory: "Musqueam Nation Territory",
      sacredSiteProximity: 2.1,
      tlrtActive: true,
    },
  ])

  const [heroVolunteers, setHeroVolunteers] = useState<HeroVolunteer[]>([
    {
      id: "1",
      name: "Sarah Mitchell",
      status: "responding",
      location: "En route to Sector 7",
      skills: ["EMT", "Indigenous Cultural Liaison", "Wilderness First Aid"],
      lastSeen: "2 minutes ago",
      culturalTraining: true,
      elderApproved: true,
    },
    {
      id: "2",
      name: "Tom Kawasaki",
      status: "available",
      location: "Community Center",
      skills: ["Paramedic", "Search & Rescue", "Traditional Medicine"],
      lastSeen: "5 minutes ago",
      culturalTraining: true,
      elderApproved: true,
    },
    {
      id: "3",
      name: "Mike Roberts",
      status: "responding",
      location: "Sacred Site Grid B4",
      skills: ["Search & Rescue", "Mountain Rescue", "Starlink Technician"],
      lastSeen: "1 minute ago",
      culturalTraining: false,
      elderApproved: false,
    },
  ])

  const [culturalProtocols, setCulturalProtocols] = useState<CulturalProtocol[]>([
    {
      id: "1",
      name: "Elder Respect Protocols",
      description: "Traditional protocols for interacting with community Elders during emergencies",
      status: "active",
      applicableIncidents: ["1"],
      lastUpdated: "2024-01-15",
      autoActivated: true,
      ocapCompliant: true,
    },
    {
      id: "2",
      name: "Sacred Site Protection",
      description: "Protocols for emergency response near sacred and ceremonial sites",
      status: "active",
      applicableIncidents: ["2"],
      lastUpdated: "2024-01-10",
      autoActivated: true,
      ocapCompliant: true,
    },
    {
      id: "3",
      name: "Traditional Medicine Integration",
      description: "Guidelines for incorporating traditional healing practices with modern emergency response",
      status: "pending",
      applicableIncidents: [],
      lastUpdated: "2024-01-18",
      autoActivated: false,
      ocapCompliant: true,
    },
  ])

  const [starlinkStatus, setStarlinkStatus] = useState({
    connected: true,
    signalStrength: 85,
    activeConnections: 12,
    lastUpdate: "30 seconds ago",
  })

  const [patentSystems, setPatentSystems] = useState({
    tlrt: {
      active: true,
      territoriesRecognized: 47,
      accuracy: 99.7,
      elderNarrationActive: true,
      languagesSupported: 52,
    },
    ocap: {
      complianceRate: 100,
      dataOwnershipVerified: true,
      accessControlActive: true,
      possessionSecured: true,
    },
    elderVoice: {
      narratorsActive: 8,
      languagesAvailable: 15,
      culturalAccuracy: 98.4,
      voiceActivationReady: true,
    },
    culturalProtocolAutomation: {
      autoActivationRate: 100,
      protocolsActive: 12,
      complianceScore: 99.2,
      sacredSitesProtected: 23,
    },
  })

  useEffect(() => {
    const interval = setInterval(() => {
      setPatentSystems((prev) => ({
        ...prev,
        tlrt: {
          ...prev.tlrt,
          accuracy: Math.max(99.0, prev.tlrt.accuracy + (Math.random() - 0.5) * 0.1),
        },
        elderVoice: {
          ...prev.elderVoice,
          culturalAccuracy: Math.max(97.0, prev.elderVoice.culturalAccuracy + (Math.random() - 0.5) * 0.3),
        },
        culturalProtocolAutomation: {
          ...prev.culturalProtocolAutomation,
          complianceScore: Math.max(
            98.0,
            prev.culturalProtocolAutomation.complianceScore + (Math.random() - 0.5) * 0.2,
          ),
        },
      }))
    }, 3000)
    return () => clearInterval(interval)
  }, [])

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "critical":
        return "bg-red-600 text-white"
      case "high":
        return "bg-red-500 text-white"
      case "medium":
        return "bg-yellow-500 text-white"
      case "low":
        return "bg-blue-500 text-white"
      default:
        return "bg-gray-500 text-white"
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "active":
        return "bg-red-100 text-red-800 border-red-200"
      case "responding":
        return "bg-yellow-100 text-yellow-800 border-yellow-200"
      case "resolved":
        return "bg-green-100 text-green-800 border-green-200"
      case "available":
        return "bg-green-100 text-green-800 border-green-200"
      case "offline":
        return "bg-gray-100 text-gray-800 border-gray-200"
      default:
        return "bg-gray-100 text-gray-800 border-gray-200"
    }
  }

  const getApprovalColor = (approval?: string) => {
    switch (approval) {
      case "approved":
        return "bg-green-100 text-green-800 border-green-200"
      case "pending":
        return "bg-yellow-100 text-yellow-800 border-yellow-200"
      case "requires-review":
        return "bg-red-100 text-red-800 border-red-200"
      default:
        return "bg-gray-100 text-gray-800 border-gray-200"
    }
  }

  return (
    <>
      <UniversalNavigation
        showBackButton={true}
        customBackPath="/landing"
        customBackLabel="Home"
        showNextPrevious={true}
      />
      <div className="min-h-screen bg-gradient-to-br from-orange-50 via-amber-50 to-orange-100">
        {/* Enhanced Header with Patent Innovation Showcase */}
        <div className="relative z-10 bg-gradient-to-r from-amber-800 via-orange-800 to-red-800 backdrop-blur-sm border-b border-amber-600">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center py-6">
              <div className="flex items-center space-x-4">
                <div className="flex items-center space-x-3">
                  <div className="w-12 h-12 bg-gradient-to-r from-yellow-400 to-amber-500 rounded-full flex items-center justify-center">
                    <Crown className="h-6 w-6 text-amber-900" />
                  </div>
                  <div className="w-10 h-10 bg-gradient-to-r from-amber-500 to-yellow-500 rounded-full flex items-center justify-center">
                    <Shield className="h-5 w-5 text-amber-900" />
                  </div>
                </div>
                <div>
                  <h1 className="text-3xl font-bold text-white">Elder Council Portal™</h1>
                  <p className="text-amber-200">
                    TLRT™ • OCAP® Compliant • Traditional Governance • Cultural Protocol Automation
                  </p>
                </div>
              </div>
              <div className="flex items-center space-x-4">
                <div className="flex items-center space-x-2 bg-black/30 backdrop-blur-sm rounded-lg px-3 py-2 border border-purple-500/30">
                  <Database className="h-4 w-4 text-purple-400" />
                  <span className="text-xs font-medium text-white">TLRT™</span>
                  <Badge className="bg-purple-500/20 text-purple-300 border-purple-400/30 text-xs">
                    {patentSystems.tlrt.accuracy.toFixed(1)}%
                  </Badge>
                </div>
                <div className="flex items-center space-x-2 bg-black/30 backdrop-blur-sm rounded-lg px-3 py-2 border border-green-500/30">
                  <Lock className="h-4 w-4 text-green-400" />
                  <span className="text-xs font-medium text-white">OCAP®</span>
                  <Badge className="bg-green-500/20 text-green-300 border-green-400/30 text-xs">
                    {patentSystems.ocap.complianceRate}%
                  </Badge>
                </div>
                <div className="flex items-center space-x-2 bg-black/30 backdrop-blur-sm rounded-lg px-4 py-2 border border-green-500/30">
                  <Satellite className="h-5 w-5 text-green-400" />
                  <span className="text-sm font-medium text-white">Starlink Connected</span>
                  <Badge className="bg-green-500/20 text-green-300 border-green-400/30">
                    {starlinkStatus.signalStrength}%
                  </Badge>
                </div>
                <Button className="bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white shadow-lg">
                  <AlertTriangle className="h-4 w-4 mr-2" />
                  Emergency Override
                </Button>
              </div>
            </div>
          </div>
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <Alert className="mb-6 bg-gradient-to-r from-purple-500/20 via-amber-500/20 to-red-500/20 border border-purple-500/30 backdrop-blur-sm">
            <Zap className="h-5 w-5 text-purple-600" />
            <AlertDescription className="text-slate-800">
              <strong>🔬 Patent-Protected Indigenous Innovation:</strong> Real-time demonstration of Traditional Land
              Recognition Technology™ (TLRT™), OCAP® Data Sovereignty, Elder Voice Narration, and Cultural Protocol
              Automation - the world's first Indigenous-governed emergency response system.
            </AlertDescription>
          </Alert>

          {/* Critical Alerts Banner */}
          {activeIncidents.some((incident) => incident.priority === "critical") && (
            <div className="mb-8 bg-gradient-to-r from-red-100 to-orange-100 border border-red-300 rounded-xl p-6 shadow-lg">
              <div className="flex items-center">
                <AlertTriangle className="h-6 w-6 text-red-600 mr-3" />
                <div>
                  <h3 className="text-xl font-bold text-red-800">Critical Emergency Requires Elder Oversight</h3>
                  <p className="text-red-700 mt-1">
                    {activeIncidents.filter((i) => i.priority === "critical").length} critical incident(s) need
                    immediate traditional governance review
                  </p>
                </div>
              </div>
            </div>
          )}

          <Tabs defaultValue="incidents" className="space-y-8">
            <TabsList className="bg-white border border-gray-300 shadow-sm">
              <TabsTrigger
                value="incidents"
                className="data-[state=active]:bg-red-100 data-[state=active]:text-red-800"
              >
                <AlertTriangle className="w-4 h-4 mr-2" />
                Active Incidents
              </TabsTrigger>
              <TabsTrigger value="heroes" className="data-[state=active]:bg-blue-100 data-[state=active]:text-blue-800">
                <Users className="w-4 h-4 mr-2" />
                Hero Volunteers
              </TabsTrigger>
              <TabsTrigger
                value="protocols"
                className="data-[state=active]:bg-amber-100 data-[state=active]:text-amber-800"
              >
                <FileText className="w-4 h-4 mr-2" />
                Cultural Protocols
              </TabsTrigger>
              <TabsTrigger
                value="governance"
                className="data-[state=active]:bg-purple-100 data-[state=active]:text-purple-800"
              >
                <Crown className="w-4 h-4 mr-2" />
                Governance
              </TabsTrigger>
              <TabsTrigger
                value="community"
                className="data-[state=active]:bg-green-100 data-[state=active]:text-green-800"
              >
                <Globe className="w-4 h-4 mr-2" />
                Community Status
              </TabsTrigger>
              <TabsTrigger
                value="patent-innovations"
                className="data-[state=active]:bg-yellow-100 data-[state=active]:text-yellow-800"
              >
                <Zap className="w-4 h-4 mr-2" />
                Patent Innovations
              </TabsTrigger>
            </TabsList>

            {/* Active Incidents Tab */}
            <TabsContent value="incidents" className="space-y-6">
              <div className="grid gap-6">
                {activeIncidents.map((incident) => (
                  <Card
                    key={incident.id}
                    className="bg-white border-gray-200 shadow-sm hover:shadow-md transition-all duration-300"
                  >
                    <CardHeader className="pb-4">
                      <div className="flex justify-between items-start">
                        <div className="flex items-center space-x-4">
                          <Badge className={`${getPriorityColor(incident.priority)}`}>
                            {incident.priority.toUpperCase()}
                          </Badge>
                          <Badge className="bg-yellow-100 text-yellow-800 border-yellow-200">
                            {incident.status.toUpperCase()}
                          </Badge>
                          <Badge className="bg-green-100 text-green-800 border-green-200">
                            Elder: {incident.elderApproval?.toUpperCase() || "PENDING"}
                          </Badge>
                          {incident.tlrtActive && (
                            <Badge className="bg-purple-100 text-purple-800 border-purple-200">TLRT™ ACTIVE</Badge>
                          )}
                          <span className="text-sm text-gray-600 flex items-center">
                            <Clock className="h-4 w-4 mr-1" />
                            {incident.timestamp}
                          </span>
                        </div>
                        <div className="flex space-x-2">
                          <Button size="sm" className="bg-blue-500 hover:bg-blue-600">
                            <Phone className="h-4 w-4 mr-1" />
                            Contact Heroes
                          </Button>
                          <Button size="sm" className="bg-purple-500 hover:bg-purple-600">
                            <Crown className="h-4 w-4 mr-1" />
                            Elder Review
                          </Button>
                          <Button size="sm" className="bg-amber-500 hover:bg-amber-600">
                            <Volume2 className="h-4 w-4 mr-1" />
                            Elder Voice
                          </Button>
                        </div>
                      </div>
                      <CardTitle className="text-xl text-gray-900">{incident.description}</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="grid md:grid-cols-2 gap-6">
                        <div className="space-y-3">
                          <div className="flex items-center text-gray-700">
                            <MapPin className="h-5 w-5 mr-2 text-red-500" />
                            <span className="font-medium">{incident.location}</span>
                          </div>
                          {incident.traditionalTerritory && (
                            <div className="flex items-center text-gray-700">
                              <Globe className="h-5 w-5 mr-2 text-purple-500" />
                              <span className="font-medium">{incident.traditionalTerritory}</span>
                            </div>
                          )}
                          {incident.sacredSiteProximity !== undefined && incident.sacredSiteProximity < 1.0 && (
                            <div className="flex items-center text-amber-700 bg-amber-50 p-2 rounded border border-amber-200">
                              <Shield className="h-5 w-5 mr-2 text-amber-600" />
                              <span className="font-medium text-sm">
                                Sacred Site: {incident.sacredSiteProximity}km - Cultural Protocols Active
                              </span>
                            </div>
                          )}
                          <div className="flex items-center text-gray-700">
                            <Users className="h-5 w-5 mr-2 text-blue-500" />
                            <span>Assigned Heroes: {incident.assignedHeroes.join(", ")}</span>
                          </div>
                        </div>
                        <div>
                          <p className="text-sm font-semibold text-gray-900 mb-2">Active Cultural Protocols:</p>
                          <div className="flex flex-wrap gap-2">
                            {incident.culturalProtocols.map((protocol, index) => (
                              <Badge
                                key={index}
                                variant="outline"
                                className="text-xs border-amber-300 text-amber-700 bg-amber-50"
                              >
                                {protocol}
                              </Badge>
                            ))}
                          </div>
                        </div>
                      </div>
                      <div className="mt-6 flex flex-wrap gap-3">
                        <Button
                          size="sm"
                          variant="outline"
                          className="border-gray-300 text-gray-700 hover:bg-gray-50 bg-transparent"
                        >
                          <Eye className="h-4 w-4 mr-1" />
                          View Details
                        </Button>
                        <Button
                          size="sm"
                          variant="outline"
                          className="border-gray-300 text-gray-700 hover:bg-gray-50 bg-transparent"
                        >
                          <Settings className="h-4 w-4 mr-1" />
                          Update Status
                        </Button>
                        <Button
                          size="sm"
                          variant="outline"
                          className="border-amber-300 text-amber-700 hover:bg-amber-50 bg-transparent"
                        >
                          <FileText className="h-4 w-4 mr-1" />
                          Add Cultural Guidance
                        </Button>
                        {incident.elderApproval === "pending" && (
                          <Button size="sm" className="bg-green-500 hover:bg-green-600">
                            <CheckCircle className="h-4 w-4 mr-1" />
                            Approve Response
                          </Button>
                        )}
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>

            {/* Hero Volunteers Tab */}
            <TabsContent value="heroes" className="space-y-6">
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {heroVolunteers.map((hero) => (
                  <Card
                    key={hero.id}
                    className="bg-white border-gray-200 shadow-sm hover:shadow-md transition-all duration-300"
                  >
                    <CardHeader className="pb-3">
                      <div className="flex justify-between items-start">
                        <CardTitle className="text-lg text-gray-900">{hero.name}</CardTitle>
                        <div className="flex flex-col items-end space-y-1">
                          <Badge className="bg-green-100 text-green-800 border-green-200">
                            {hero.status.toUpperCase()}
                          </Badge>
                          {hero.elderApproved && (
                            <Badge className="bg-purple-100 text-purple-800 border-purple-200 text-xs">
                              Elder Approved
                            </Badge>
                          )}
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-3">
                        <div className="flex items-center text-sm text-gray-600">
                          <MapPin className="h-4 w-4 mr-2" />
                          {hero.location}
                        </div>
                        <div className="text-sm text-gray-600">
                          <Clock className="h-4 w-4 mr-1 inline" />
                          Last seen: {hero.lastSeen}
                        </div>
                        <div>
                          <p className="text-sm font-medium text-gray-900 mb-2">Skills & Training:</p>
                          <div className="flex flex-wrap gap-1">
                            {hero.skills.map((skill, index) => (
                              <Badge key={index} variant="outline" className="text-xs border-gray-300 text-gray-700">
                                {skill}
                              </Badge>
                            ))}
                          </div>
                        </div>
                        <div className="flex items-center justify-between text-sm">
                          <span className="text-gray-600">Cultural Training:</span>
                          <Badge
                            className={
                              hero.culturalTraining
                                ? "bg-green-100 text-green-800 border-green-200"
                                : "bg-red-100 text-red-800 border-red-200"
                            }
                          >
                            {hero.culturalTraining ? "Completed" : "Required"}
                          </Badge>
                        </div>
                      </div>
                      <div className="mt-4 flex space-x-2">
                        <Button size="sm" className="flex-1 bg-blue-500 hover:bg-blue-600">
                          <Radio className="h-4 w-4 mr-1" />
                          Contact
                        </Button>
                        <Button
                          size="sm"
                          variant="outline"
                          className="border-gray-300 text-gray-700 hover:bg-gray-50 bg-transparent"
                        >
                          Assign
                        </Button>
                        {!hero.elderApproved && (
                          <Button size="sm" className="bg-purple-500 hover:bg-purple-600">
                            <Crown className="h-4 w-4 mr-1" />
                            Review
                          </Button>
                        )}
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>

            {/* Cultural Protocols Tab */}
            <TabsContent value="protocols" className="space-y-6">
              <div className="grid gap-6">
                {culturalProtocols.map((protocol) => (
                  <Card
                    key={protocol.id}
                    className="bg-white border-gray-200 shadow-sm hover:shadow-md transition-all duration-300"
                  >
                    <CardHeader>
                      <div className="flex justify-between items-start">
                        <CardTitle className="text-gray-900">{protocol.name}</CardTitle>
                        <div className="flex items-center space-x-2">
                          <Badge className="bg-green-100 text-green-800 border-green-200">
                            {protocol.status.toUpperCase()}
                          </Badge>
                          {protocol.ocapCompliant && (
                            <Badge className="bg-purple-100 text-purple-800 border-purple-200 text-xs">
                              OCAP® COMPLIANT
                            </Badge>
                          )}
                          {protocol.autoActivated && (
                            <Badge className="bg-blue-100 text-blue-800 border-blue-200 text-xs">AUTO-ACTIVATED</Badge>
                          )}
                          <Badge variant="outline" className="text-xs border-gray-300 text-gray-600">
                            Updated: {protocol.lastUpdated}
                          </Badge>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <p className="text-gray-700 mb-4">{protocol.description}</p>
                      <div className="flex items-center justify-between">
                        <div>
                          <span className="text-sm text-gray-600">
                            Applied to {protocol.applicableIncidents.length} active incident(s)
                          </span>
                        </div>
                        <div className="flex space-x-2">
                          <Button
                            size="sm"
                            variant="outline"
                            className="border-gray-300 text-gray-700 hover:bg-gray-50 bg-transparent"
                          >
                            <Eye className="h-4 w-4 mr-1" />
                            View Details
                          </Button>
                          <Button size="sm" className="bg-amber-500 hover:bg-amber-600">
                            <Settings className="h-4 w-4 mr-1" />
                            Edit Protocol
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>

            {/* Governance Tab */}
            <TabsContent value="governance" className="space-y-6">
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                <Card className="bg-white border-purple-200 shadow-sm">
                  <CardHeader>
                    <CardTitle className="text-gray-900 flex items-center">
                      <Crown className="w-6 h-6 mr-2 text-purple-600" />
                      Elder Council Decisions
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="bg-gray-50 rounded-lg p-4 border border-purple-200">
                        <div className="flex items-center justify-between mb-2">
                          <span className="font-medium text-gray-900">Pending Approvals</span>
                          <Badge className="bg-yellow-100 text-yellow-800 border-yellow-200">3</Badge>
                        </div>
                        <p className="text-sm text-purple-700">Hero applications and protocol updates</p>
                      </div>
                      <div className="bg-gray-50 rounded-lg p-4 border border-purple-200">
                        <div className="flex items-center justify-between mb-2">
                          <span className="font-medium text-gray-900">Recent Decisions</span>
                          <Badge className="bg-green-100 text-green-800 border-green-200">5</Badge>
                        </div>
                        <p className="text-sm text-purple-700">Approved in last 7 days</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card className="bg-white border-amber-200 shadow-sm">
                  <CardHeader>
                    <CardTitle className="text-gray-900 flex items-center">
                      <Shield className="w-6 h-6 mr-2 text-amber-600" />
                      Traditional Protocols
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="bg-gray-50 rounded-lg p-4 border border-amber-200">
                        <div className="flex items-center justify-between mb-2">
                          <span className="font-medium text-gray-900">Active Protocols</span>
                          <Badge className="bg-green-100 text-green-800 border-green-200">12</Badge>
                        </div>
                        <p className="text-sm text-amber-700">Currently enforced cultural guidelines</p>
                      </div>
                      <div className="bg-gray-50 rounded-lg p-4 border border-amber-200">
                        <div className="flex items-center justify-between mb-2">
                          <span className="font-medium text-gray-900">Compliance Rate</span>
                          <Badge className="bg-green-100 text-green-800 border-green-200">98%</Badge>
                        </div>
                        <p className="text-sm text-amber-700">Emergency response compliance</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card className="bg-white border-green-200 shadow-sm">
                  <CardHeader>
                    <CardTitle className="text-gray-900 flex items-center">
                      <Globe className="w-6 h-6 mr-2 text-green-600" />
                      Territory Oversight
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="bg-gray-50 rounded-lg p-4 border border-green-200">
                        <div className="flex items-center justify-between mb-2">
                          <span className="font-medium text-gray-900">Territories Served</span>
                          <Badge className="bg-blue-100 text-blue-800 border-blue-200">47</Badge>
                        </div>
                        <p className="text-sm text-green-700">Traditional territories under protection</p>
                      </div>
                      <div className="bg-gray-50 rounded-lg p-4 border border-green-200">
                        <div className="flex items-center justify-between mb-2">
                          <span className="font-medium text-gray-900">Sacred Sites</span>
                          <Badge className="bg-purple-100 text-purple-800 border-purple-200">23</Badge>
                        </div>
                        <p className="text-sm text-green-700">Protected ceremonial locations</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Recent Governance Activities */}
              <Card className="bg-white border-gray-200 shadow-sm">
                <CardHeader>
                  <CardTitle className="text-gray-900">Recent Elder Council Activities</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-start space-x-4 p-4 bg-purple-50 rounded-lg border border-purple-200">
                      <div className="w-3 h-3 bg-purple-500 rounded-full mt-2"></div>
                      <div className="flex-1">
                        <div className="flex items-center justify-between mb-1">
                          <h4 className="font-medium text-gray-900">Elder Council Approval</h4>
                          <span className="text-sm text-purple-600">2 hours ago</span>
                        </div>
                        <p className="text-sm text-purple-800">
                          Sarah M. approved for traditional territory emergency response
                        </p>
                      </div>
                    </div>

                    <div className="flex items-start space-x-4 p-4 bg-amber-50 rounded-lg border border-amber-200">
                      <div className="w-3 h-3 bg-amber-500 rounded-full mt-2"></div>
                      <div className="flex-1">
                        <div className="flex items-center justify-between mb-1">
                          <h4 className="font-medium text-gray-900">Protocol Update</h4>
                          <span className="text-sm text-amber-600">5 hours ago</span>
                        </div>
                        <p className="text-sm text-amber-800">Sacred site emergency response protocols updated</p>
                      </div>
                    </div>

                    <div className="flex items-start space-x-4 p-4 bg-green-50 rounded-lg border border-green-200">
                      <div className="w-3 h-3 bg-green-500 rounded-full mt-2"></div>
                      <div className="flex-1">
                        <div className="flex items-center justify-between mb-1">
                          <h4 className="font-medium text-gray-900">Territory Agreement</h4>
                          <span className="text-sm text-green-600">1 day ago</span>
                        </div>
                        <p className="text-sm text-green-800">New partnership established with coastal First Nation</p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Community Status Tab */}
            <TabsContent value="community" className="space-y-6">
              <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                <Card className="bg-white border-blue-200 shadow-sm">
                  <CardHeader>
                    <CardTitle className="flex items-center text-gray-900">
                      <Satellite className="h-5 w-5 mr-2 text-blue-600" />
                      Network Status
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      <div className="flex justify-between">
                        <span className="text-sm text-gray-600">Starlink Signal:</span>
                        <span className="text-sm font-medium text-green-600">{starlinkStatus.signalStrength}%</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm text-gray-600">Connections:</span>
                        <span className="text-sm font-medium text-gray-900">{starlinkStatus.activeConnections}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm text-gray-600">Last Update:</span>
                        <span className="text-sm font-medium text-gray-900">{starlinkStatus.lastUpdate}</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card className="bg-white border-red-200 shadow-sm">
                  <CardHeader>
                    <CardTitle className="flex items-center text-gray-900">
                      <Heart className="h-5 w-5 mr-2 text-red-600" />
                      L.A.B. Technology
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      <div className="flex justify-between">
                        <span className="text-sm text-gray-600">Active Beacons:</span>
                        <span className="text-sm font-medium text-gray-900">47</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm text-gray-600">Emergency Alerts:</span>
                        <span className="text-sm font-medium text-red-600">2 Active</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm text-gray-600">Privacy Mode:</span>
                        <span className="text-sm font-medium text-green-600">Enabled</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card className="bg-white border-green-200 shadow-sm">
                  <CardHeader>
                    <CardTitle className="flex items-center text-gray-900">
                      <Users className="h-5 w-5 mr-2 text-green-600" />
                      Community Members
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      <div className="flex justify-between">
                        <span className="text-sm text-gray-600">Total Registered:</span>
                        <span className="text-sm font-medium text-gray-900">234</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm text-gray-600">Currently Active:</span>
                        <span className="text-sm font-medium text-gray-900">89</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm text-gray-600">Elders Online:</span>
                        <span className="text-sm font-medium text-purple-600">12</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card className="bg-white border-purple-200 shadow-sm">
                  <CardHeader>
                    <CardTitle className="text-gray-900 flex items-center">
                      <Crown className="w-6 h-6 mr-2 text-purple-600" />
                      Leadership
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      <div className="flex justify-between">
                        <span className="text-sm text-gray-600">Council Members:</span>
                        <span className="text-sm font-medium text-gray-900">8</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm text-gray-600">Active Decisions:</span>
                        <span className="text-sm font-medium text-gray-900">3</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm text-gray-600">Protocols Active:</span>
                        <span className="text-sm font-medium text-amber-600">12</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Community Territory Map */}
              <Card className="bg-white border-gray-200 shadow-sm">
                <CardHeader>
                  <CardTitle className="text-gray-900">Traditional Territory Overview</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="h-64 bg-gradient-to-br from-green-100 via-blue-100 to-purple-100 rounded-lg relative overflow-hidden border border-gray-200">
                    <div className="absolute inset-0 flex items-center justify-center text-gray-600">
                      🗺️ Interactive Territory Map
                    </div>
                    {/* Territory Markers */}
                    <div className="absolute top-8 left-16 w-4 h-4 bg-purple-500 rounded-full border-2 border-white shadow-lg"></div>
                    <div className="absolute top-32 right-20 w-4 h-4 bg-amber-500 rounded-full border-2 border-white shadow-lg"></div>
                    <div className="absolute bottom-16 left-12 w-4 h-4 bg-green-500 rounded-full border-2 border-white shadow-lg"></div>

                    {/* Sacred Site Markers */}
                    <div className="absolute top-20 left-32 text-2xl">🏛️</div>
                    <div className="absolute bottom-20 right-16 text-2xl">🏛️</div>
                    <div className="absolute top-40 right-32 text-2xl">🏛️</div>
                  </div>
                  <div className="flex justify-center space-x-6 mt-4 text-sm">
                    <span className="flex items-center">
                      <div className="w-3 h-3 bg-purple-500 rounded-full mr-2"></div>
                      <span className="text-purple-600">Elder Territories</span>
                    </span>
                    <span className="flex items-center">
                      <div className="w-3 h-3 bg-amber-500 rounded-full mr-2"></div>
                      <span className="text-amber-600">Sacred Sites</span>
                    </span>
                    <span className="flex items-center">
                      <div className="w-3 h-3 bg-green-500 rounded-full mr-2"></div>
                      <span className="text-green-600">Community Centers</span>
                    </span>
                    <span className="flex items-center">
                      <span className="text-lg mr-2">🏛️</span>
                      <span className="text-gray-600">Traditional Governance</span>
                    </span>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="patent-innovations" className="space-y-6">
              <Card className="bg-white border-yellow-300 shadow-lg">
                <CardHeader>
                  <CardTitle className="text-gray-900 flex items-center gap-3">
                    🔬 Patent-Protected Indigenous Innovation Showcase
                    <Badge className="bg-yellow-500/20 text-yellow-700 border-yellow-500/30">LIVE DEMONSTRATION</Badge>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Traditional Land Recognition Technology™ (TLRT™) */}
                    <div className="bg-gradient-to-r from-purple-100 to-blue-100 p-6 rounded-lg border border-purple-300">
                      <h3 className="text-lg font-bold text-gray-800 mb-4 flex items-center gap-2">
                        <Database className="h-6 w-6 text-purple-600" />
                        Traditional Land Recognition Technology™ (TLRT™)
                      </h3>
                      <div className="space-y-3">
                        <div className="bg-white/60 p-3 rounded border border-purple-200">
                          <div className="flex items-center justify-between text-sm">
                            <span className="text-gray-700">Territories Recognized:</span>
                            <span className="font-bold text-purple-700">
                              {patentSystems.tlrt.territoriesRecognized}
                            </span>
                          </div>
                          <div className="flex items-center justify-between text-sm">
                            <span className="text-gray-700">Recognition Accuracy:</span>
                            <span className="font-bold text-purple-700">{patentSystems.tlrt.accuracy.toFixed(1)}%</span>
                          </div>
                          <Progress value={patentSystems.tlrt.accuracy} className="h-2 mt-2" />
                        </div>
                        <div className="bg-white/60 p-3 rounded border border-purple-200">
                          <div className="flex items-center justify-between text-sm">
                            <span className="text-gray-700">Elder Narration:</span>
                            <Badge className="bg-green-500/20 text-green-700 border-green-500/30 text-xs">ACTIVE</Badge>
                          </div>
                          <div className="flex items-center justify-between text-sm">
                            <span className="text-gray-700">Languages Supported:</span>
                            <span className="font-bold text-purple-700">{patentSystems.tlrt.languagesSupported}</span>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* OCAP® Data Sovereignty */}
                    <div className="bg-gradient-to-r from-green-100 to-teal-100 p-6 rounded-lg border border-green-300">
                      <h3 className="text-lg font-bold text-gray-800 mb-4 flex items-center gap-2">
                        <Lock className="h-6 w-6 text-green-600" />
                        OCAP® Data Sovereignty Layer
                      </h3>
                      <div className="space-y-3">
                        <div className="bg-white/60 p-3 rounded border border-green-200">
                          <div className="flex items-center justify-between text-sm">
                            <span className="text-gray-700">Compliance Rate:</span>
                            <span className="font-bold text-green-700">{patentSystems.ocap.complianceRate}%</span>
                          </div>
                          <Progress value={patentSystems.ocap.complianceRate} className="h-2 mt-1" />
                        </div>
                        <div className="grid grid-cols-2 gap-2">
                          <div className="bg-white/60 p-2 rounded border border-green-200 text-center">
                            <div className="text-xs text-gray-600">Ownership</div>
                            <Badge className="bg-green-500/20 text-green-700 border-green-500/30 text-xs">✓</Badge>
                          </div>
                          <div className="bg-white/60 p-2 rounded border border-green-200 text-center">
                            <div className="text-xs text-gray-600">Control</div>
                            <Badge className="bg-green-500/20 text-green-700 border-green-500/30 text-xs">✓</Badge>
                          </div>
                          <div className="bg-white/60 p-2 rounded border border-green-200 text-center">
                            <div className="text-xs text-gray-600">Access</div>
                            <Badge className="bg-green-500/20 text-green-700 border-green-500/30 text-xs">✓</Badge>
                          </div>
                          <div className="bg-white/60 p-2 rounded border border-green-200 text-center">
                            <div className="text-xs text-gray-600">Possession</div>
                            <Badge className="bg-green-500/20 text-green-700 border-green-500/30 text-xs">✓</Badge>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Elder Voice Narration System */}
                    <div className="bg-gradient-to-r from-amber-100 to-orange-100 p-6 rounded-lg border border-amber-300">
                      <h3 className="text-lg font-bold text-gray-800 mb-4 flex items-center gap-2">
                        <Volume2 className="h-6 w-6 text-amber-600" />
                        Elder Voice Narration System
                      </h3>
                      <div className="space-y-3">
                        <div className="bg-white/60 p-3 rounded border border-amber-200">
                          <div className="flex items-center justify-between text-sm">
                            <span className="text-gray-700">Active Narrators:</span>
                            <span className="font-bold text-amber-700">{patentSystems.elderVoice.narratorsActive}</span>
                          </div>
                          <div className="flex items-center justify-between text-sm">
                            <span className="text-gray-700">Cultural Accuracy:</span>
                            <span className="font-bold text-amber-700">
                              {patentSystems.elderVoice.culturalAccuracy.toFixed(1)}%
                            </span>
                          </div>
                          <Progress value={patentSystems.elderVoice.culturalAccuracy} className="h-2 mt-1" />
                        </div>
                        <div className="flex space-x-2">
                          <Button size="sm" className="bg-amber-500 hover:bg-amber-600 flex-1">
                            <Mic className="h-4 w-4 mr-1" />
                            Voice Activation
                          </Button>
                          <Button size="sm" className="bg-orange-500 hover:bg-orange-600 flex-1">
                            <Languages className="h-4 w-4 mr-1" />
                            {patentSystems.elderVoice.languagesAvailable} Languages
                          </Button>
                        </div>
                      </div>
                    </div>

                    {/* Cultural Protocol Automation */}
                    <div className="bg-gradient-to-r from-red-100 to-pink-100 p-6 rounded-lg border border-red-300">
                      <h3 className="text-lg font-bold text-gray-800 mb-4 flex items-center gap-2">
                        <Zap className="h-6 w-6 text-red-600" />
                        Cultural Protocol Automation
                      </h3>
                      <div className="space-y-3">
                        <div className="bg-white/60 p-3 rounded border border-red-200">
                          <div className="flex items-center justify-between text-sm">
                            <span className="text-gray-700">Auto-Activation Rate:</span>
                            <span className="font-bold text-red-700">
                              {patentSystems.culturalProtocolAutomation.autoActivationRate}%
                            </span>
                          </div>
                          <div className="flex items-center justify-between text-sm">
                            <span className="text-gray-700">Compliance Score:</span>
                            <span className="font-bold text-red-700">
                              {patentSystems.culturalProtocolAutomation.complianceScore.toFixed(1)}%
                            </span>
                          </div>
                          <Progress
                            value={patentSystems.culturalProtocolAutomation.complianceScore}
                            className="h-2 mt-1"
                          />
                        </div>
                        <div className="bg-white/60 p-3 rounded border border-red-200">
                          <div className="flex items-center justify-between text-sm">
                            <span className="text-gray-700">Sacred Sites Protected:</span>
                            <span className="font-bold text-red-700">
                              {patentSystems.culturalProtocolAutomation.sacredSitesProtected}
                            </span>
                          </div>
                          <div className="flex items-center justify-between text-sm">
                            <span className="text-gray-700">Active Protocols:</span>
                            <span className="font-bold text-red-700">
                              {patentSystems.culturalProtocolAutomation.protocolsActive}
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Patent Portfolio Value */}
                  <div className="mt-6 bg-gradient-to-r from-yellow-100 to-gold-100 p-6 rounded-lg border border-yellow-300">
                    <h3 className="text-lg font-bold text-gray-800 mb-4 flex items-center gap-2">
                      <span className="text-2xl">💎</span>
                      Indigenous Innovation Portfolio Value
                    </h3>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                      <div className="text-center">
                        <div className="text-2xl font-bold text-purple-600">$12M</div>
                        <div className="text-sm text-gray-700">TLRT™ System</div>
                      </div>
                      <div className="text-center">
                        <div className="text-2xl font-bold text-green-600">$8M</div>
                        <div className="text-sm text-gray-700">OCAP® Layer</div>
                      </div>
                      <div className="text-center">
                        <div className="text-2xl font-bold text-amber-600">$6M</div>
                        <div className="text-sm text-gray-700">Elder Voice System</div>
                      </div>
                      <div className="text-center">
                        <div className="text-2xl font-bold text-red-600">$4M</div>
                        <div className="text-sm text-gray-700">Protocol Automation</div>
                      </div>
                    </div>
                    <div className="text-center mt-4 pt-4 border-t border-yellow-300">
                      <div className="text-3xl font-bold text-gray-800">$30M</div>
                      <div className="text-sm text-gray-600">Indigenous Innovation Value</div>
                      <div className="text-xs text-gray-500 mt-1">
                        World's First Indigenous-Governed Emergency Response System
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
        <FloatingEmergencyButtons />
      </div>
    </>
  )
}
