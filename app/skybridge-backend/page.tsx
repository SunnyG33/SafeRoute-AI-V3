"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ArrowLeft, Satellite, Radio, Wifi, WifiOff, Settings, Shield, Globe, Activity } from 'lucide-react'

type NetworkLayer = 'lte' | 'mesh' | 'satellite' | 'lab'
type SystemStatus = 'online' | 'degraded' | 'offline'

export default function SkyBridgeBackendPage() {
  const [activeLayer, setActiveLayer] = useState<NetworkLayer>('lte')
  const [systemStatus, setSystemStatus] = useState<SystemStatus>('online')
  const [connectedNodes, setConnectedNodes] = useState(12)
  const [dataFlow, setDataFlow] = useState(0)

  useEffect(() => {
    // Simulate network switching
    const interval = setInterval(() => {
      setDataFlow(Math.floor(Math.random() * 100))
      if (Math.random() > 0.8) {
        const layers: NetworkLayer[] = ['lte', 'mesh', 'satellite', 'lab']
        setActiveLayer(layers[Math.floor(Math.random() * layers.length)])
      }
    }, 3000)
    return () => clearInterval(interval)
  }, [])

  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900 text-white">
      <header className="sticky top-0 z-10 border-b border-slate-700 bg-slate-900/90 backdrop-blur">
        <div className="container mx-auto px-4 py-3 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Link href="/landing">
              <Button variant="outline" className="border-2 border-slate-600 text-white hover:bg-slate-800">
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back
              </Button>
            </Link>
            <h1 className="text-xl font-bold">SkyBridge™ Network Control</h1>
          </div>
          <Badge className={`border-2 ${
            systemStatus === 'online' ? 'bg-emerald-900 text-emerald-100 border-emerald-600' :
            systemStatus === 'degraded' ? 'bg-amber-900 text-amber-100 border-amber-600' :
            'bg-red-900 text-red-100 border-red-600'
          }`}>
            System {systemStatus.toUpperCase()}
          </Badge>
        </div>
      </header>

      <section className="container mx-auto px-4 py-6">
        <Tabs defaultValue="network" className="space-y-6">
          <TabsList className="grid w-full grid-cols-4 bg-slate-800 border-2 border-slate-600">
            <TabsTrigger value="network" className="data-[state=active]:bg-blue-600">Network Layers</TabsTrigger>
            <TabsTrigger value="governance" className="data-[state=active]:bg-purple-600">Governance</TabsTrigger>
            <TabsTrigger value="audit" className="data-[state=active]:bg-amber-600">Audit Console</TabsTrigger>
            <TabsTrigger value="cultural" className="data-[state=active]:bg-emerald-600">Cultural Protocols</TabsTrigger>
          </TabsList>

          <TabsContent value="network" className="space-y-6">
            <Card className="border-2 border-blue-600 bg-slate-800/50">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-blue-100">
                  <Globe className="h-5 w-5" />
                  Network Layer Management
                </CardTitle>
                <CardDescription className="text-slate-300">
                  Real-time switching between LTE, Mesh, Satellite, and LAB networks
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                  <div className={`p-4 rounded-lg border-2 text-center transition-all ${
                    activeLayer === 'lte' 
                      ? 'bg-emerald-900 border-emerald-600 text-emerald-100' 
                      : 'bg-slate-700 border-slate-600 text-slate-300'
                  }`}>
                    <Wifi className="h-8 w-8 mx-auto mb-2" />
                    <div className="font-semibold">LTE Network</div>
                    <div className="text-xs">Primary Layer</div>
                    <div className="text-sm mt-1">Coverage: 85%</div>
                  </div>
                  
                  <div className={`p-4 rounded-lg border-2 text-center transition-all ${
                    activeLayer === 'mesh' 
                      ? 'bg-blue-900 border-blue-600 text-blue-100' 
                      : 'bg-slate-700 border-slate-600 text-slate-300'
                  }`}>
                    <Radio className="h-8 w-8 mx-auto mb-2" />
                    <div className="font-semibold">Mesh Network</div>
                    <div className="text-xs">Fallback Layer</div>
                    <div className="text-sm mt-1">Nodes: {connectedNodes}</div>
                  </div>
                  
                  <div className={`p-4 rounded-lg border-2 text-center transition-all ${
                    activeLayer === 'satellite' 
                      ? 'bg-purple-900 border-purple-600 text-purple-100' 
                      : 'bg-slate-700 border-slate-600 text-slate-300'
                  }`}>
                    <Satellite className="h-8 w-8 mx-auto mb-2" />
                    <div className="font-semibold">Starlink</div>
                    <div className="text-xs">Remote Layer</div>
                    <div className="text-sm mt-1">Latency: 45ms</div>
                  </div>
                  
                  <div className={`p-4 rounded-lg border-2 text-center transition-all ${
                    activeLayer === 'lab' 
                      ? 'bg-red-900 border-red-600 text-red-100' 
                      : 'bg-slate-700 border-slate-600 text-slate-300'
                  }`}>
                    <WifiOff className="h-8 w-8 mx-auto mb-2" />
                    <div className="font-semibold">LAB Beacon</div>
                    <div className="text-xs">Emergency Only</div>
                    <div className="text-sm mt-1">Range: 50km</div>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <Card className="border-2 border-slate-600 bg-slate-700/50">
                    <CardHeader>
                      <CardTitle className="text-slate-100">Data Flow Monitor</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-3">
                        <div className="flex justify-between items-center">
                          <span className="text-slate-300">Current Throughput:</span>
                          <Badge className="bg-blue-900 text-blue-100 border-blue-600">{dataFlow} Mbps</Badge>
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="text-slate-300">Active Connections:</span>
                          <Badge className="bg-emerald-900 text-emerald-100 border-emerald-600">47</Badge>
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="text-slate-300">Emergency Channels:</span>
                          <Badge className="bg-red-900 text-red-100 border-red-600">3 Active</Badge>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  <Card className="border-2 border-slate-600 bg-slate-700/50">
                    <CardHeader>
                      <CardTitle className="text-slate-100">Network Controls</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-3">
                      <Button 
                        onClick={() => setActiveLayer('mesh')}
                        className="w-full bg-blue-600 hover:bg-blue-700 border-2 border-blue-400"
                      >
                        Force Mesh Network
                      </Button>
                      <Button 
                        onClick={() => setActiveLayer('satellite')}
                        className="w-full bg-purple-600 hover:bg-purple-700 border-2 border-purple-400"
                      >
                        Switch to Satellite
                      </Button>
                      <Button 
                        onClick={() => setActiveLayer('lab')}
                        className="w-full bg-red-600 hover:bg-red-700 border-2 border-red-400"
                      >
                        Activate Emergency LAB
                      </Button>
                    </CardContent>
                  </Card>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="governance" className="space-y-6">
            <Card className="border-2 border-purple-600 bg-slate-800/50">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-purple-100">
                  <Settings className="h-5 w-5" />
                  System Governance Module
                </CardTitle>
                <CardDescription className="text-slate-300">
                  Configure system-wide policies and operational parameters
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <Card className="border-2 border-slate-600 bg-slate-700/50">
                    <CardHeader>
                      <CardTitle className="text-slate-100">Emergency Response Rules</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-3">
                      <div className="flex items-center justify-between">
                        <span className="text-slate-300">Auto-dispatch threshold:</span>
                        <select className="bg-slate-600 border border-slate-500 rounded px-2 py-1 text-white">
                          <option>High Priority</option>
                          <option>Medium Priority</option>
                          <option>All Calls</option>
                        </select>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-slate-300">Network failover delay:</span>
                        <select className="bg-slate-600 border border-slate-500 rounded px-2 py-1 text-white">
                          <option>30 seconds</option>
                          <option>60 seconds</option>
                          <option>120 seconds</option>
                        </select>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-slate-300">LAB beacon activation:</span>
                        <select className="bg-slate-600 border border-slate-500 rounded px-2 py-1 text-white">
                          <option>Manual only</option>
                          <option>Auto after 5 min</option>
                          <option>Auto after 10 min</option>
                        </select>
                      </div>
                    </CardContent>
                  </Card>

                  <Card className="border-2 border-slate-600 bg-slate-700/50">
                    <CardHeader>
                      <CardTitle className="text-slate-100">Data Privacy Controls</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-3">
                      <div className="flex items-center justify-between">
                        <span className="text-slate-300">Consent timeout:</span>
                        <select className="bg-slate-600 border border-slate-500 rounded px-2 py-1 text-white">
                          <option>24 hours</option>
                          <option>48 hours</option>
                          <option>7 days</option>
                        </select>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-slate-300">Override approval level:</span>
                        <select className="bg-slate-600 border border-slate-500 rounded px-2 py-1 text-white">
                          <option>Senior Paramedic</option>
                          <option>Medical Director</option>
                          <option>Hospital Physician</option>
                        </select>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-slate-300">Audit log retention:</span>
                        <select className="bg-slate-600 border border-slate-500 rounded px-2 py-1 text-white">
                          <option>1 year</option>
                          <option>3 years</option>
                          <option>7 years</option>
                        </select>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="audit" className="space-y-6">
            <Card className="border-2 border-amber-600 bg-slate-800/50">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-amber-100">
                  <Shield className="h-5 w-5" />
                  System Audit Console
                </CardTitle>
                <CardDescription className="text-slate-300">
                  Monitor all system activities, overrides, and security events
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="p-4 rounded-lg border-2 border-emerald-600 bg-emerald-900/20">
                    <div className="flex items-center justify-between mb-2">
                      <span className="font-semibold text-emerald-100">Network Layer Switch</span>
                      <span className="text-xs text-emerald-300">2 min ago</span>
                    </div>
                    <div className="text-sm text-emerald-200">
                      Automatic failover: LTE → Mesh Network (Signal degradation detected)
                    </div>
                    <Badge className="mt-2 bg-emerald-800 text-emerald-100 border-emerald-600">
                      System Event
                    </Badge>
                  </div>

                  <div className="p-4 rounded-lg border-2 border-red-600 bg-red-900/20">
                    <div className="flex items-center justify-between mb-2">
                      <span className="font-semibold text-red-100">Emergency Override</span>
                      <span className="text-xs text-red-300">5 min ago</span>
                    </div>
                    <div className="text-sm text-red-200">
                      Dr. Smith activated emergency override for patient record access (Record ID: p3)
                    </div>
                    <div className="text-xs text-red-300 mt-1">
                      Justification: Patient unconscious, life-threatening emergency
                    </div>
                    <Badge className="mt-2 bg-red-800 text-red-100 border-red-600">
                      Security Event
                    </Badge>
                  </div>

                  <div className="p-4 rounded-lg border-2 border-blue-600 bg-blue-900/20">
                    <div className="flex items-center justify-between mb-2">
                      <span className="font-semibold text-blue-100">LOGIQ Recommendation</span>
                      <span className="text-xs text-blue-300">7 min ago</span>
                    </div>
                    <div className="text-sm text-blue-200">
                      AI engine generated cardiac emergency protocol (Confidence: 85%)
                    </div>
                    <Badge className="mt-2 bg-blue-800 text-blue-100 border-blue-600">
                      AI Event
                    </Badge>
                  </div>

                  <div className="p-4 rounded-lg border-2 border-purple-600 bg-purple-900/20">
                    <div className="flex items-center justify-between mb-2">
                      <span className="font-semibold text-purple-100">Encryption Key Rotation</span>
                      <span className="text-xs text-purple-300">15 min ago</span>
                    </div>
                    <div className="text-sm text-purple-200">
                      Scheduled rotation of SafeShare encryption keys completed successfully
                    </div>
                    <Badge className="mt-2 bg-purple-800 text-purple-100 border-purple-600">
                      Security Event
                    </Badge>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="cultural" className="space-y-6">
            <Card className="border-2 border-emerald-600 bg-slate-800/50">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-emerald-100">
                  <Globe className="h-5 w-5" />
                  Cultural Protocol Configuration
                </CardTitle>
                <CardDescription className="text-slate-300">
                  Configure Indigenous cultural protocols and TLRT compliance
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <Card className="border-2 border-slate-600 bg-slate-700/50">
                    <CardHeader>
                      <CardTitle className="text-slate-100">Territory Recognition</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-3">
                      <div className="flex items-center justify-between">
                        <span className="text-slate-300">Auto-detect traditional territory:</span>
                        <input type="checkbox" defaultChecked className="w-4 h-4" />
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-slate-300">Display TLRT banner:</span>
                        <input type="checkbox" defaultChecked className="w-4 h-4" />
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-slate-300">Require territory acknowledgment:</span>
                        <input type="checkbox" defaultChecked className="w-4 h-4" />
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-slate-300">Multi-language support:</span>
                        <input type="checkbox" defaultChecked className="w-4 h-4" />
                      </div>
                    </CardContent>
                  </Card>

                  <Card className="border-2 border-slate-600 bg-slate-700/50">
                    <CardHeader>
                      <CardTitle className="text-slate-100">Cultural Protocols</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-3">
                      <div className="flex items-center justify-between">
                        <span className="text-slate-300">Elder consultation priority:</span>
                        <input type="checkbox" defaultChecked className="w-4 h-4" />
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-slate-300">Traditional medicine integration:</span>
                        <input type="checkbox" className="w-4 h-4" />
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-slate-300">Community notification protocols:</span>
                        <input type="checkbox" defaultChecked className="w-4 h-4" />
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-slate-300">Ceremonial considerations:</span>
                        <input type="checkbox" className="w-4 h-4" />
                      </div>
                    </CardContent>
                  </Card>
                </div>

                <Card className="border-2 border-emerald-600 bg-emerald-900/20">
                  <CardHeader>
                    <CardTitle className="text-emerald-100">OCAP Compliance</CardTitle>
                    <CardDescription className="text-emerald-200">
                      Ownership, Control, Access, and Possession principles
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <div className="p-3 rounded border-2 border-emerald-600 bg-emerald-800/20">
                      <div className="font-semibold text-emerald-100 mb-1">Data Sovereignty</div>
                      <div className="text-sm text-emerald-200">
                        All data collected within traditional territories remains under 
                        Indigenous community control and governance.
                      </div>
                    </div>
                    <div className="p-3 rounded border-2 border-emerald-600 bg-emerald-800/20">
                      <div className="font-semibold text-emerald-100 mb-1">Consent Protocols</div>
                      <div className="text-sm text-emerald-200">
                        Free, prior, and informed consent required for all data sharing 
                        beyond immediate emergency response needs.
                      </div>
                    </div>
                    <div className="p-3 rounded border-2 border-emerald-600 bg-emerald-800/20">
                      <div className="font-semibold text-emerald-100 mb-1">Community Benefit</div>
                      <div className="text-sm text-emerald-200">
                        All system improvements and insights derived from community data 
                        must directly benefit the originating communities.
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </section>
    </main>
  )
}
