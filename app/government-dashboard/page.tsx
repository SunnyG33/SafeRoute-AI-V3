"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Progress } from "@/components/ui/progress"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { BackToHome } from "@/components/navigation/BackToHome"
import FloatingEmergencyButtons from "@/components/emergency/FloatingEmergencyButtons"
import { Flame, Users, Award, MapPin } from "lucide-react"
import Link from "next/link"

export default function GovernmentDashboard() {
  const [activeTab, setActiveTab] = useState("overview")
  const [realTimeData, setRealTimeData] = useState({
    starlink_uptime: 99.94,
    active_emergencies: 27,
    heroes_deployed: 89,
    indigenous_communities_safe: 6,
    ai_predictions_accuracy: 94.7,
    cross_jurisdictional_coordination: 8,
  })

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
            <span className="text-slate-800">👤 Government Admin Portal</span>
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
              value="ai-coordination"
              className="data-[state=active]:bg-blue-500/20 data-[state=active]:text-blue-700"
            >
              AI Coordination
            </TabsTrigger>
            <TabsTrigger
              value="starlink-integration"
              className="data-[state=active]:bg-green-500/20 data-[state=active]:text-green-700"
            >
              Starlink Integration
            </TabsTrigger>
            <TabsTrigger
              value="indigenous-protocols"
              className="data-[state=active]:bg-purple-500/20 data-[state=active]:text-purple-700"
            >
              Indigenous Protocols
            </TabsTrigger>
            <TabsTrigger
              value="cross-jurisdictional"
              className="data-[state=active]:bg-orange-500/20 data-[state=active]:text-orange-700"
            >
              Cross-Jurisdictional
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

                {/* Critical Emergency Incidents with AI Analysis */}
                <div className="space-y-4">
                  <h3 className="text-lg font-bold text-slate-800">🔥 AI-Analyzed Critical Incidents</h3>

                  {/* Updated incident card backgrounds to complement blue-gray theme */}
                  <div className="bg-red-500/20 border border-red-500/30 p-4 rounded backdrop-blur-sm">
                    <div className="flex justify-between items-start">
                      <div>
                        <h4 className="font-bold text-red-700">WILDFIRE - North Shore Mountains</h4>
                        <p className="text-sm text-red-600">
                          Squamish Nation Territory - Cultural Protocols Auto-Activated
                        </p>
                        <div className="flex items-center space-x-4 mt-2 text-xs">
                          <span className="bg-red-500/20 text-red-700 px-2 py-1 rounded border border-red-500/30">
                            AI Risk: CRITICAL
                          </span>
                          <span className="bg-blue-500/20 text-blue-700 px-2 py-1 rounded border border-blue-500/30">
                            Starlink Priority: MAX
                          </span>
                          <span className="bg-purple-500/20 text-purple-700 px-2 py-1 rounded border border-purple-500/30">
                            Cultural: COMPLIANT
                          </span>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="text-2xl font-bold text-red-600">12</div>
                        <div className="text-xs text-red-700">Heroes Deployed</div>
                        <div className="text-xs text-slate-600">AI-Selected</div>
                      </div>
                    </div>
                    <div className="mt-3 bg-white/20 p-3 rounded border border-white/20">
                      <div className="text-xs font-semibold text-slate-700">🤖 AI Analysis:</div>
                      <div className="text-xs text-slate-700">
                        Wind patterns suggest 73% probability of eastward spread. Recommended evacuation of 3 Indigenous
                        communities within 2-hour window. Starlink bandwidth auto-allocated for emergency
                        communications.
                      </div>
                    </div>
                  </div>

                  <div className="bg-orange-500/20 border border-orange-500/30 p-4 rounded backdrop-blur-sm">
                    <div className="flex justify-between items-start">
                      <div>
                        <h4 className="font-bold text-orange-700">MEDICAL EMERGENCY - Downtown Vancouver</h4>
                        <p className="text-sm text-orange-600">Multi-casualty incident - AI triage activated</p>
                        <div className="flex items-center space-x-4 mt-2 text-xs">
                          <span className="bg-orange-500/20 text-orange-700 px-2 py-1 rounded border border-orange-500/30">
                            AI Risk: HIGH
                          </span>
                          <span className="bg-green-500/20 text-green-700 px-2 py-1 rounded border border-green-500/30">
                            Hero ETA: 2.1 min
                          </span>
                          <span className="bg-blue-500/20 text-blue-700 px-2 py-1 rounded border border-blue-500/30">
                            Satellite: OPTIMAL
                          </span>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="text-2xl font-bold text-orange-600">8</div>
                        <div className="text-xs text-orange-700">Heroes En Route</div>
                        <div className="text-xs text-slate-600">Skill-Matched</div>
                      </div>
                    </div>
                    <div className="mt-3 bg-white/20 p-3 rounded border border-white/20">
                      <div className="text-xs font-semibold text-slate-700">🤖 AI Triage Protocol:</div>
                      <div className="text-xs text-slate-700">
                        Deployed 3 medical specialists, 2 trauma responders, 3 support heroes. Predicted resource needs:
                        2 ambulances, 1 helicopter. Hospital capacity confirmed via real-time integration.
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
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

          <TabsContent value="starlink-integration" className="space-y-6">
            <Card className="bg-white/40 border-slate-300 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="text-slate-800">🛰️ Starlink Satellite Integration System</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="bg-gradient-to-r from-slate-200/80 to-blue-200/80 text-slate-800 p-6 rounded-lg backdrop-blur-sm border border-blue-500/30">
                  <h3 className="text-lg font-bold mb-4">
                    Patent Innovation: Emergency-Priority Satellite Network Management
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                    <div className="text-center">
                      <div className="text-2xl font-bold text-green-600">4,847</div>
                      <div className="text-sm text-slate-700">Active Satellites</div>
                      <div className="text-xs text-slate-600">Real-time tracking</div>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-bold text-blue-600">99.94%</div>
                      <div className="text-sm text-slate-700">Network Uptime</div>
                      <div className="text-xs text-slate-600">Emergency priority</div>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-bold text-purple-600">2.1 Gbps</div>
                      <div className="text-sm text-slate-700">Peak Bandwidth</div>
                      <div className="text-xs text-slate-600">Emergency allocation</div>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-bold text-yellow-600">23ms</div>
                      <div className="text-sm text-slate-700">Avg Latency</div>
                      <div className="text-xs text-slate-600">Optimized routing</div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="indigenous-protocols" className="space-y-6">
            <Card className="bg-white/40 border-slate-300 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="text-slate-800">🏛️ Indigenous Cultural Protocol Integration</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="bg-gradient-to-r from-purple-200/80 to-red-200/80 text-slate-800 p-6 rounded-lg backdrop-blur-sm border border-purple-500/30">
                  <h3 className="text-lg font-bold mb-4">
                    Patent Innovation: Automated Cultural Protocol Compliance System
                  </h3>
                  <p className="text-sm">
                    First system to automatically activate Indigenous cultural protocols in emergency response with 100%
                    compliance rate.
                  </p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="cross-jurisdictional" className="space-y-6">
            <Card className="bg-white/40 border-slate-300 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="text-slate-800">🌐 Cross-Jurisdictional Coordination System</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="bg-gradient-to-r from-green-200/80 to-blue-200/80 text-slate-800 p-6 rounded-lg backdrop-blur-sm border border-green-500/30">
                  <h3 className="text-lg font-bold mb-4">
                    Patent Innovation: Real-Time Multi-Agency Coordination Platform
                  </h3>
                  <p className="text-sm">
                    Coordinating {realTimeData.cross_jurisdictional_coordination} agencies with 99.2% success rate and
                    2.1s data sync time.
                  </p>
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

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* SafeRoute AI Patent Innovations */}
                  <div className="bg-gradient-to-r from-blue-200/80 to-purple-200/80 p-6 rounded-lg border border-blue-500/30">
                    <h3 className="text-lg font-bold text-slate-800 mb-4 flex items-center gap-2">
                      <span className="text-2xl">🛡️</span>
                      SafeRoute AI™ Patent (CA 3280872)
                      <Badge className="bg-green-500/20 text-green-700 border-green-500/30 text-xs">FILED</Badge>
                    </h3>
                    <div className="space-y-3">
                      <div className="bg-white/40 p-3 rounded border border-blue-500/20">
                        <h4 className="font-semibold text-blue-800 mb-2 flex items-center justify-between">
                          Traditional Land Recognition Technology™ (TLRT™)
                          <Badge className="bg-blue-500/20 text-blue-700 border-blue-500/30 text-xs">LIVE</Badge>
                        </h4>
                        <div className="space-y-2 text-sm">
                          <div className="flex items-center justify-between">
                            <span className="text-slate-700">Territory Recognition Accuracy:</span>
                            <span className="font-bold text-blue-700">
                              {patentInnovations.indigenousProtocols.tlrtAccuracy}%
                            </span>
                          </div>
                          <div className="flex items-center justify-between">
                            <span className="text-slate-700">Cultural Sites Protected:</span>
                            <span className="font-bold text-blue-700">
                              {patentInnovations.indigenousProtocols.culturalSiteProtection}
                            </span>
                          </div>
                          <div className="flex items-center justify-between">
                            <span className="text-slate-700">Auto-Activation:</span>
                            <Badge className="bg-green-500/20 text-green-700 border-green-500/30 text-xs">ACTIVE</Badge>
                          </div>
                        </div>
                      </div>

                      <div className="bg-white/40 p-3 rounded border border-purple-500/20">
                        <h4 className="font-semibold text-purple-800 mb-2 flex items-center justify-between">
                          OCAP® Data Sovereignty Layer
                          <Badge className="bg-purple-500/20 text-purple-700 border-purple-500/30 text-xs">100%</Badge>
                        </h4>
                        <div className="space-y-2 text-sm">
                          <div className="flex items-center justify-between">
                            <span className="text-slate-700">Compliance Rate:</span>
                            <span className="font-bold text-purple-700">
                              {patentInnovations.indigenousProtocols.ocapCompliance}%
                            </span>
                          </div>
                          <Progress value={patentInnovations.indigenousProtocols.ocapCompliance} className="h-2" />
                          <div className="text-xs text-slate-600">Ownership • Control • Access • Possession</div>
                        </div>
                      </div>

                      <div className="bg-white/40 p-3 rounded border border-green-500/20">
                        <h4 className="font-semibold text-green-800 mb-2 flex items-center justify-between">
                          Hero Mode™ AI-Guided Response
                          <Badge className="bg-green-500/20 text-green-700 border-green-500/30 text-xs">VOICE</Badge>
                        </h4>
                        <div className="space-y-2 text-sm">
                          <div className="flex items-center justify-between">
                            <span className="text-slate-700">Voice Activation:</span>
                            <Badge className="bg-green-500/20 text-green-700 border-green-500/30 text-xs">
                              HANDS-FREE
                            </Badge>
                          </div>
                          <div className="flex items-center justify-between">
                            <span className="text-slate-700">Offline Capable:</span>
                            <Badge className="bg-blue-500/20 text-blue-700 border-blue-500/30 text-xs">100%</Badge>
                          </div>
                          <div className="text-xs text-slate-600">CPR • AED • Emergency Dispatch</div>
                        </div>
                      </div>

                      <div className="bg-gradient-to-r from-green-500/20 to-blue-500/20 p-3 rounded border border-green-500/30">
                        <div className="text-center">
                          <div className="text-lg font-bold text-slate-800">
                            {patentInnovations.indigenousProtocols.estimatedValue}
                          </div>
                          <div className="text-sm text-slate-600">Indigenous Innovation Value</div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* SafeRoute OS Patent Innovations */}
                  <div className="bg-gradient-to-r from-green-200/80 to-teal-200/80 p-6 rounded-lg border border-green-500/30">
                    <h3 className="text-lg font-bold text-slate-800 mb-4 flex items-center gap-2">
                      <span className="text-2xl">⚙️</span>
                      SafeRoute OS™ Patent (CA 3280894)
                      <Badge className="bg-green-500/20 text-green-700 border-green-500/30 text-xs">FILED</Badge>
                    </h3>
                    <div className="space-y-3">
                      <div className="bg-white/40 p-3 rounded border border-green-500/20">
                        <h4 className="font-semibold text-green-800 mb-2 flex items-center justify-between">
                          AI Decision Engine
                          <Badge className="bg-green-500/20 text-green-700 border-green-500/30 text-xs">LIVE</Badge>
                        </h4>
                        <div className="space-y-2 text-sm">
                          <div className="flex items-center justify-between">
                            <span className="text-slate-700">Response Time:</span>
                            <span className="font-bold text-green-700">
                              {patentInnovations.aiDecisionEngine.responseTime}
                            </span>
                          </div>
                          <div className="flex items-center justify-between">
                            <span className="text-slate-700">Prediction Accuracy:</span>
                            <span className="font-bold text-green-700">
                              {patentInnovations.aiDecisionEngine.accuracy}%
                            </span>
                          </div>
                          <Progress value={patentInnovations.aiDecisionEngine.accuracy} className="h-2" />
                        </div>
                      </div>

                      <div className="bg-white/40 p-3 rounded border border-blue-500/20">
                        <h4 className="font-semibold text-blue-800 mb-2 flex items-center justify-between">
                          Multi-Agency Coordination
                          <Badge className="bg-blue-500/20 text-blue-700 border-blue-500/30 text-xs">SYNC</Badge>
                        </h4>
                        <div className="space-y-2 text-sm">
                          <div className="flex items-center justify-between">
                            <span className="text-slate-700">Active Agencies:</span>
                            <span className="font-bold text-blue-700">
                              {patentInnovations.multiAgencyCoordination.activeAgencies}
                            </span>
                          </div>
                          <div className="flex items-center justify-between">
                            <span className="text-slate-700">Sync Time:</span>
                            <span className="font-bold text-blue-700">
                              {patentInnovations.multiAgencyCoordination.syncTime}
                            </span>
                          </div>
                          <div className="flex items-center justify-between">
                            <span className="text-slate-700">Success Rate:</span>
                            <span className="font-bold text-blue-700">
                              {patentInnovations.multiAgencyCoordination.coordinationSuccess}%
                            </span>
                          </div>
                        </div>
                      </div>

                      <div className="bg-white/40 p-3 rounded border border-purple-500/20">
                        <h4 className="font-semibold text-purple-800 mb-2 flex items-center justify-between">
                          Satellite Integration
                          <Badge className="bg-purple-500/20 text-purple-700 border-purple-500/30 text-xs">MAX</Badge>
                        </h4>
                        <div className="space-y-2 text-sm">
                          <div className="flex items-center justify-between">
                            <span className="text-slate-700">Active Satellites:</span>
                            <span className="font-bold text-purple-700">
                              {patentInnovations.satelliteIntegration.activeSatellites.toLocaleString()}
                            </span>
                          </div>
                          <div className="flex items-center justify-between">
                            <span className="text-slate-700">Emergency Priority:</span>
                            <span className="font-bold text-purple-700">
                              {patentInnovations.satelliteIntegration.emergencyPriority}
                            </span>
                          </div>
                          <div className="flex items-center justify-between">
                            <span className="text-slate-700">Uptime:</span>
                            <span className="font-bold text-purple-700">
                              {patentInnovations.satelliteIntegration.uptime}%
                            </span>
                          </div>
                        </div>
                      </div>

                      <div className="bg-gradient-to-r from-blue-500/20 to-purple-500/20 p-3 rounded border border-blue-500/30">
                        <div className="text-center">
                          <div className="text-lg font-bold text-slate-800">
                            {patentInnovations.aiDecisionEngine.estimatedValue}
                          </div>
                          <div className="text-sm text-slate-600">Core AI System Value</div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Patent Portfolio Value & Innovation Impact */}
                <div className="mt-6 bg-gradient-to-r from-yellow-200/80 to-orange-200/80 p-6 rounded-lg border border-yellow-500/30">
                  <h3 className="text-lg font-bold text-slate-800 mb-4 flex items-center gap-2">
                    <span className="text-2xl">💎</span>
                    Patent Portfolio Innovation Impact
                  </h3>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
                    <div className="text-center">
                      <div className="text-2xl font-bold text-green-600">$18M</div>
                      <div className="text-sm text-slate-700">Core AI System</div>
                      <div className="text-xs text-slate-600">Emergency Response OS</div>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-bold text-purple-600">$12M</div>
                      <div className="text-sm text-slate-700">Indigenous Integration</div>
                      <div className="text-xs text-slate-600">TLRT™ + OCAP®</div>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-bold text-blue-600">$9M</div>
                      <div className="text-sm text-slate-700">Multi-Agency Coord</div>
                      <div className="text-xs text-slate-600">Cross-Jurisdictional</div>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-bold text-orange-600">$8M</div>
                      <div className="text-sm text-slate-700">Satellite Integration</div>
                      <div className="text-xs text-slate-600">Emergency Priority</div>
                    </div>
                  </div>
                  <div className="text-center pt-4 border-t border-yellow-500/30">
                    <div className="text-3xl font-bold text-slate-800">$47M</div>
                    <div className="text-sm text-slate-600">Total Conservative Portfolio Valuation</div>
                    <div className="text-xs text-slate-500 mt-1">
                      Based on comparable emergency response and AI patents
                    </div>
                  </div>
                </div>

                {/* Live Patent Demonstration Metrics */}
                <div className="mt-6 bg-gradient-to-r from-slate-200/80 to-blue-200/80 p-6 rounded-lg border border-slate-400/30">
                  <h3 className="text-lg font-bold text-slate-800 mb-4 flex items-center gap-2">
                    <span className="text-2xl">📊</span>
                    Live Patent Technology Metrics
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="bg-white/40 p-4 rounded border border-green-500/20">
                      <h4 className="font-semibold text-green-800 mb-2">Indigenous Innovation Impact</h4>
                      <div className="space-y-2 text-sm">
                        <div className="flex justify-between">
                          <span>Cultural Protocol Automation:</span>
                          <span className="font-bold text-green-700">100%</span>
                        </div>
                        <div className="flex justify-between">
                          <span>OCAP® Compliance:</span>
                          <span className="font-bold text-green-700">100%</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Territory Recognition:</span>
                          <span className="font-bold text-green-700">99.7%</span>
                        </div>
                      </div>
                    </div>
                    <div className="bg-white/40 p-4 rounded border border-blue-500/20">
                      <h4 className="font-semibold text-blue-800 mb-2">AI System Performance</h4>
                      <div className="space-y-2 text-sm">
                        <div className="flex justify-between">
                          <span>Response Optimization:</span>
                          <span className="font-bold text-blue-700">94.7%</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Multi-Variable Analysis:</span>
                          <span className="font-bold text-blue-700">Active</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Decision Time:</span>
                          <span className="font-bold text-blue-700">2.3s</span>
                        </div>
                      </div>
                    </div>
                    <div className="bg-white/40 p-4 rounded border border-purple-500/20">
                      <h4 className="font-semibold text-purple-800 mb-2">Coordination Excellence</h4>
                      <div className="space-y-2 text-sm">
                        <div className="flex justify-between">
                          <span>Agency Sync Time:</span>
                          <span className="font-bold text-purple-700">2.1s</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Coordination Success:</span>
                          <span className="font-bold text-purple-700">99.2%</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Satellite Uptime:</span>
                          <span className="font-bold text-purple-700">99.94%</span>
                        </div>
                      </div>
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
