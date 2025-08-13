"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Progress } from "@/components/ui/progress"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { BackToHome } from "@/components/navigation/BackToHome"

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
    <div className="min-h-screen bg-gray-50">
      <BackToHome />
      {/* Enhanced Header with Patent-Relevant Information */}
      <div className="bg-blue-900 text-white p-4 border-b-4 border-red-600">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-bold">🛡️ SafeRoute AI™ - Emergency Operations Center</h1>
            <p className="text-sm text-blue-200">Patent-Pending Multi-Modal Emergency Response System</p>
          </div>
          <div className="flex items-center space-x-6 text-sm">
            <div className="flex items-center space-x-2">
              <span className="w-3 h-3 bg-green-400 rounded-full animate-pulse"></span>
              <span>🛰️ Starlink: {realTimeData.starlink_uptime.toFixed(2)}%</span>
            </div>
            <div className="flex items-center space-x-2">
              <span className="w-3 h-3 bg-blue-400 rounded-full animate-pulse"></span>
              <span>🤖 AI Engine: Active</span>
            </div>
            <div className="flex items-center space-x-2">
              <span className="w-3 h-3 bg-purple-400 rounded-full animate-pulse"></span>
              <span>🏛️ Indigenous Protocols: Compliant</span>
            </div>
            <span>👤 Government Admin Portal</span>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto p-6">
        {/* Patent Innovation Highlight Banner */}
        <Alert className="mb-6 border-l-4 border-l-blue-600 bg-blue-50">
          <AlertDescription className="text-blue-800">
            <strong>🔬 Patent Innovation Showcase:</strong> Real-time demonstration of AI-powered emergency coordination
            with satellite integration, cultural protocol automation, and predictive resource allocation across multiple
            jurisdictions.
          </AlertDescription>
        </Alert>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-6">
            <TabsTrigger value="overview">Emergency Overview</TabsTrigger>
            <TabsTrigger value="ai-coordination">AI Coordination</TabsTrigger>
            <TabsTrigger value="starlink-integration">Starlink Integration</TabsTrigger>
            <TabsTrigger value="indigenous-protocols">Indigenous Protocols</TabsTrigger>
            <TabsTrigger value="cross-jurisdictional">Cross-Jurisdictional</TabsTrigger>
            <TabsTrigger value="patent-innovations">Patent Innovations</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6">
            {/* Real-Time Emergency Coordination Dashboard */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  🚨 Real-Time Multi-Modal Emergency Coordination
                  <Badge variant="destructive" className="animate-pulse">
                    LIVE SYSTEM
                  </Badge>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-6">
                  <div className="bg-gradient-to-r from-red-500 to-red-600 text-white p-6 rounded-lg shadow-lg">
                    <div className="text-3xl font-bold">{realTimeData.active_emergencies}</div>
                    <div className="text-red-100">Active Emergencies</div>
                    <div className="text-xs text-red-200 mt-1">AI-Prioritized Queue</div>
                  </div>
                  <div className="bg-gradient-to-r from-blue-500 to-blue-600 text-white p-6 rounded-lg shadow-lg">
                    <div className="text-3xl font-bold">{realTimeData.heroes_deployed}</div>
                    <div className="text-blue-100">Heroes Deployed</div>
                    <div className="text-xs text-blue-200 mt-1">AI-Optimized Dispatch</div>
                  </div>
                  <div className="bg-gradient-to-r from-green-500 to-green-600 text-white p-6 rounded-lg shadow-lg">
                    <div className="text-3xl font-bold">{realTimeData.starlink_uptime.toFixed(1)}%</div>
                    <div className="text-green-100">Satellite Uptime</div>
                    <div className="text-xs text-green-200 mt-1">Redundant Connectivity</div>
                  </div>
                  <div className="bg-gradient-to-r from-purple-500 to-purple-600 text-white p-6 rounded-lg shadow-lg">
                    <div className="text-3xl font-bold">{realTimeData.indigenous_communities_safe}</div>
                    <div className="text-purple-100">Communities Protected</div>
                    <div className="text-xs text-purple-200 mt-1">Cultural Protocols Active</div>
                  </div>
                </div>

                {/* AI-Powered Emergency Prediction Engine */}
                <div className="bg-gradient-to-r from-gray-800 to-gray-900 text-white p-6 rounded-lg mb-6">
                  <h3 className="text-lg font-bold mb-4 flex items-center">
                    🤖 AI Emergency Prediction Engine (Patent-Pending)
                    <Badge className="ml-2 bg-yellow-600">INNOVATION</Badge>
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div>
                      <div className="text-2xl font-bold text-green-400">
                        {realTimeData.ai_predictions_accuracy.toFixed(1)}%
                      </div>
                      <div className="text-gray-300">Prediction Accuracy</div>
                      <Progress value={realTimeData.ai_predictions_accuracy} className="mt-2" />
                    </div>
                    <div>
                      <div className="text-2xl font-bold text-blue-400">2.3 min</div>
                      <div className="text-gray-300">Avg Response Time</div>
                      <div className="text-xs text-gray-400">AI-Optimized Routing</div>
                    </div>
                    <div>
                      <div className="text-2xl font-bold text-purple-400">847</div>
                      <div className="text-gray-300">Lives Saved (Est.)</div>
                      <div className="text-xs text-gray-400">Statistical Model</div>
                    </div>
                  </div>
                </div>

                {/* Critical Emergency Incidents with AI Analysis */}
                <div className="space-y-4">
                  <h3 className="text-lg font-bold">🔥 AI-Analyzed Critical Incidents</h3>

                  <div className="bg-red-50 border-l-4 border-red-500 p-4 rounded">
                    <div className="flex justify-between items-start">
                      <div>
                        <h4 className="font-bold text-red-800">WILDFIRE - North Shore Mountains</h4>
                        <p className="text-sm text-red-600">
                          Squamish Nation Territory - Cultural Protocols Auto-Activated
                        </p>
                        <div className="flex items-center space-x-4 mt-2 text-xs">
                          <span className="bg-red-100 text-red-800 px-2 py-1 rounded">AI Risk: CRITICAL</span>
                          <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded">Starlink Priority: MAX</span>
                          <span className="bg-purple-100 text-purple-800 px-2 py-1 rounded">Cultural: COMPLIANT</span>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="text-2xl font-bold text-red-600">12</div>
                        <div className="text-xs text-red-500">Heroes Deployed</div>
                        <div className="text-xs text-gray-500">AI-Selected</div>
                      </div>
                    </div>
                    <div className="mt-3 bg-white p-3 rounded border">
                      <div className="text-xs font-semibold text-gray-700">🤖 AI Analysis:</div>
                      <div className="text-xs text-gray-600">
                        Wind patterns suggest 73% probability of eastward spread. Recommended evacuation of 3 Indigenous
                        communities within 2-hour window. Starlink bandwidth auto-allocated for emergency
                        communications.
                      </div>
                    </div>
                  </div>

                  <div className="bg-orange-50 border-l-4 border-orange-500 p-4 rounded">
                    <div className="flex justify-between items-start">
                      <div>
                        <h4 className="font-bold text-orange-800">MEDICAL EMERGENCY - Downtown Vancouver</h4>
                        <p className="text-sm text-orange-600">Multi-casualty incident - AI triage activated</p>
                        <div className="flex items-center space-x-4 mt-2 text-xs">
                          <span className="bg-orange-100 text-orange-800 px-2 py-1 rounded">AI Risk: HIGH</span>
                          <span className="bg-green-100 text-green-800 px-2 py-1 rounded">Hero ETA: 2.1 min</span>
                          <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded">Satellite: OPTIMAL</span>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="text-2xl font-bold text-orange-600">8</div>
                        <div className="text-xs text-orange-500">Heroes En Route</div>
                        <div className="text-xs text-gray-500">Skill-Matched</div>
                      </div>
                    </div>
                    <div className="mt-3 bg-white p-3 rounded border">
                      <div className="text-xs font-semibold text-gray-700">🤖 AI Triage Protocol:</div>
                      <div className="text-xs text-gray-600">
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
            <Card>
              <CardHeader>
                <CardTitle>🤖 AI-Powered Emergency Coordination Engine</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* AI Decision Matrix */}
                <div className="bg-gradient-to-r from-blue-900 to-purple-900 text-white p-6 rounded-lg">
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
            <Card>
              <CardHeader>
                <CardTitle>🛰️ Starlink Satellite Integration System</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="bg-gradient-to-r from-gray-900 to-blue-900 text-white p-6 rounded-lg">
                  <h3 className="text-lg font-bold mb-4">
                    Patent Innovation: Emergency-Priority Satellite Network Management
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                    <div className="text-center">
                      <div className="text-2xl font-bold text-green-400">4,847</div>
                      <div className="text-sm text-gray-300">Active Satellites</div>
                      <div className="text-xs text-gray-400">Real-time tracking</div>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-bold text-blue-400">99.94%</div>
                      <div className="text-sm text-gray-300">Network Uptime</div>
                      <div className="text-xs text-gray-400">Emergency priority</div>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-bold text-purple-400">2.1 Gbps</div>
                      <div className="text-sm text-gray-300">Peak Bandwidth</div>
                      <div className="text-xs text-gray-400">Emergency allocation</div>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-bold text-yellow-400">23ms</div>
                      <div className="text-sm text-gray-300">Avg Latency</div>
                      <div className="text-xs text-gray-400">Optimized routing</div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="indigenous-protocols" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>🏛️ Indigenous Cultural Protocol Integration</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="bg-gradient-to-r from-purple-900 to-red-900 text-white p-6 rounded-lg">
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
            <Card>
              <CardHeader>
                <CardTitle>🌐 Cross-Jurisdictional Coordination System</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="bg-gradient-to-r from-green-900 to-blue-900 text-white p-6 rounded-lg">
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

          <TabsContent value="patent-innovations" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>🔬 Patent-Pending Innovations Summary</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="bg-gradient-to-r from-yellow-900 to-orange-900 text-white p-6 rounded-lg">
                  <h3 className="text-lg font-bold mb-4">
                    🏆 Core Patent Claims - SafeRoute AI™ Emergency Response System
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <h4 className="font-semibold mb-3">Primary Innovations:</h4>
                      <ul className="space-y-2 text-sm">
                        <li className="flex items-start">
                          <span className="w-2 h-2 bg-yellow-400 rounded-full mr-2 mt-2"></span>
                          <strong>AI-Powered Multi-Modal Emergency Coordination:</strong> Sub-3-second decision engine
                        </li>
                        <li className="flex items-start">
                          <span className="w-2 h-2 bg-blue-400 rounded-full mr-2 mt-2"></span>
                          <strong>Automated Cultural Protocol Integration:</strong> First Indigenous protocol system
                        </li>
                        <li className="flex items-start">
                          <span className="w-2 h-2 bg-green-400 rounded-full mr-2 mt-2"></span>
                          <strong>Dynamic Satellite Bandwidth Allocation:</strong> Emergency-priority management
                        </li>
                        <li className="flex items-start">
                          <span className="w-2 h-2 bg-purple-400 rounded-full mr-2 mt-2"></span>
                          <strong>Cross-Jurisdictional AI Coordination:</strong> Multi-agency optimization
                        </li>
                      </ul>
                    </div>
                    <div>
                      <h4 className="font-semibold mb-3">IP Portfolio Value:</h4>
                      <div className="text-center">
                        <div className="text-3xl font-bold text-green-400">$47M</div>
                        <div className="text-sm text-gray-300">Estimated Total Value</div>
                      </div>
                      <div className="space-y-2 text-sm mt-4">
                        <div className="flex justify-between">
                          <span>Core AI System</span>
                          <span className="font-semibold">$18M</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Cultural Integration</span>
                          <span className="font-semibold">$12M</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Satellite Integration</span>
                          <span className="font-semibold">$9M</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Hero Mode™ Interface</span>
                          <span className="font-semibold">$5M</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Cross-Jurisdictional</span>
                          <span className="font-semibold">$3M</span>
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
          <Button className="bg-red-600 hover:bg-red-700 text-white p-6 h-auto flex flex-col items-center space-y-2">
            <span className="text-2xl">🚨</span>
            <span className="font-semibold">Declare Emergency</span>
          </Button>
          <Button className="bg-blue-600 hover:bg-blue-700 text-white p-6 h-auto flex flex-col items-center space-y-2">
            <span className="text-2xl">🛰️</span>
            <span className="font-semibold">Satellite Control</span>
          </Button>
          <Button className="bg-purple-600 hover:bg-purple-700 text-white p-6 h-auto flex flex-col items-center space-y-2">
            <span className="text-2xl">🏛️</span>
            <span className="font-semibold">Cultural Protocols</span>
          </Button>
          <Button className="bg-green-600 hover:bg-green-700 text-white p-6 h-auto flex flex-col items-center space-y-2">
            <span className="text-2xl">📊</span>
            <span className="font-semibold">Generate Report</span>
          </Button>
        </div>
      </div>
    </div>
  )
}
