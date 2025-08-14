"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { UniversalNavigation } from "@/components/navigation/UniversalNavigation"
import {
  Flame,
  AlertTriangle,
  Shield,
  Wind,
  Thermometer,
  Droplets,
  Eye,
  Users,
  MapPin,
  Calendar,
  Megaphone,
  FileText,
} from "lucide-react"

const fireBanLevels = [
  {
    level: 1,
    name: "Category 1",
    color: "bg-blue-500",
    description: "Open fires prohibited",
    restrictions: ["No campfires", "No burning permits", "Fireworks prohibited"],
  },
  {
    level: 2,
    name: "Category 2",
    color: "bg-cyan-500",
    description: "All outdoor fires prohibited",
    restrictions: ["No campfires", "No burning permits", "No fireworks", "No smoking outdoors"],
  },
  {
    level: 3,
    name: "Category 3",
    color: "bg-red-500",
    description: "Extreme fire danger",
    restrictions: [
      "All Category 2 restrictions",
      "No outdoor cooking",
      "No vehicle access to forests",
      "Industrial restrictions",
    ],
  },
]

const currentConditions = {
  temperature: 32,
  humidity: 15,
  windSpeed: 25,
  fireWeatherIndex: "Extreme",
  lastRain: "18 days ago",
}

const activeAlerts = [
  { id: 1, region: "Kamloops Fire Centre", level: 2, issued: "2024-08-10", expires: "2024-08-20", population: 45000 },
  {
    id: 2,
    region: "Prince George Fire Centre",
    level: 1,
    issued: "2024-08-12",
    expires: "2024-08-18",
    population: 32000,
  },
  { id: 3, region: "Coastal Fire Centre", level: 3, issued: "2024-08-09", expires: "2024-08-25", population: 78000 },
]

export default function FireBanPortal() {
  const [selectedRegion, setSelectedRegion] = useState("all")
  const [alertType, setAlertType] = useState("fire-ban")

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-indigo-900">
      <UniversalNavigation />

      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="p-3 rounded-xl bg-gradient-to-r from-blue-500 to-cyan-500">
              <Shield className="w-8 h-8 text-white" />
            </div>
            <h1 className="text-4xl font-bold text-white">Fire Ban Command Center</h1>
          </div>
          <p className="text-xl text-blue-200 max-w-3xl mx-auto mb-4">
            Government Fire Ban Management & Community Communication Portal
          </p>
          <div className="flex items-center justify-center gap-6 text-sm text-cyan-300">
            <span>🔥 Real-Time Monitoring</span>
            <span>📢 Mass Communication</span>
            <span>🏛️ Multi-Agency Coordination</span>
          </div>
        </div>

        {/* Current Conditions Dashboard */}
        <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-8">
          <Card className="bg-white/10 backdrop-blur-sm border-blue-500/30">
            <CardContent className="p-4 text-center">
              <Thermometer className="w-6 h-6 text-orange-400 mx-auto mb-2" />
              <div className="text-2xl font-bold text-white">{currentConditions.temperature}°C</div>
              <div className="text-sm text-blue-300">Temperature</div>
            </CardContent>
          </Card>

          <Card className="bg-white/10 backdrop-blur-sm border-blue-500/30">
            <CardContent className="p-4 text-center">
              <Droplets className="w-6 h-6 text-blue-400 mx-auto mb-2" />
              <div className="text-2xl font-bold text-white">{currentConditions.humidity}%</div>
              <div className="text-sm text-blue-300">Humidity</div>
            </CardContent>
          </Card>

          <Card className="bg-white/10 backdrop-blur-sm border-blue-500/30">
            <CardContent className="p-4 text-center">
              <Wind className="w-6 h-6 text-cyan-400 mx-auto mb-2" />
              <div className="text-2xl font-bold text-white">{currentConditions.windSpeed} km/h</div>
              <div className="text-sm text-blue-300">Wind Speed</div>
            </CardContent>
          </Card>

          <Card className="bg-white/10 backdrop-blur-sm border-blue-500/30">
            <CardContent className="p-4 text-center">
              <Flame className="w-6 h-6 text-orange-400 mx-auto mb-2" />
              <div className="text-lg font-bold text-white">{currentConditions.fireWeatherIndex}</div>
              <div className="text-sm text-blue-300">Fire Weather</div>
            </CardContent>
          </Card>

          <Card className="bg-white/10 backdrop-blur-sm border-blue-500/30">
            <CardContent className="p-4 text-center">
              <Calendar className="w-6 h-6 text-cyan-400 mx-auto mb-2" />
              <div className="text-lg font-bold text-white">{currentConditions.lastRain}</div>
              <div className="text-sm text-blue-300">Last Rain</div>
            </CardContent>
          </Card>
        </div>

        <Tabs defaultValue="active-bans" className="space-y-6">
          <TabsList className="grid w-full grid-cols-4 bg-white/10 border border-blue-500/30">
            <TabsTrigger value="active-bans" className="data-[state=active]:bg-blue-500/30 text-white">
              Active Bans
            </TabsTrigger>
            <TabsTrigger value="issue-alert" className="data-[state=active]:bg-blue-500/30 text-white">
              Issue Alert
            </TabsTrigger>
            <TabsTrigger value="communication" className="data-[state=active]:bg-blue-500/30 text-white">
              Mass Communication
            </TabsTrigger>
            <TabsTrigger value="analytics" className="data-[state=active]:bg-blue-500/30 text-white">
              Analytics
            </TabsTrigger>
          </TabsList>

          {/* Active Fire Bans */}
          <TabsContent value="active-bans" className="space-y-6">
            <div className="grid md:grid-cols-3 gap-6 mb-6">
              {fireBanLevels.map((ban) => (
                <Card key={ban.level} className="bg-white/10 backdrop-blur-sm border-blue-500/30">
                  <CardHeader>
                    <CardTitle className="text-white flex items-center gap-2">
                      <div className={`w-4 h-4 rounded-full ${ban.color}`}></div>
                      {ban.name}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-blue-200 mb-3">{ban.description}</p>
                    <ul className="space-y-1">
                      {ban.restrictions.map((restriction, index) => (
                        <li key={index} className="text-sm text-blue-300 flex items-center gap-2">
                          <AlertTriangle className="w-3 h-3" />
                          {restriction}
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              ))}
            </div>

            <Card className="bg-white/10 backdrop-blur-sm border-blue-500/30">
              <CardHeader>
                <CardTitle className="text-white flex items-center gap-2">
                  <MapPin className="w-5 h-5" />
                  Current Active Fire Bans
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {activeAlerts.map((alert) => {
                    const banLevel = fireBanLevels.find((b) => b.level === alert.level)
                    return (
                      <div
                        key={alert.id}
                        className="flex items-center justify-between p-4 bg-white/5 rounded-lg border border-blue-500/20"
                      >
                        <div className="flex items-center gap-4">
                          <div className={`w-3 h-3 rounded-full ${banLevel?.color}`}></div>
                          <div>
                            <div className="text-white font-medium">{alert.region}</div>
                            <div className="text-sm text-blue-300">
                              {banLevel?.name} • Issued: {alert.issued} • Expires: {alert.expires}
                            </div>
                          </div>
                        </div>
                        <div className="text-right">
                          <div className="text-white font-medium">{alert.population.toLocaleString()}</div>
                          <div className="text-sm text-blue-300">people affected</div>
                        </div>
                      </div>
                    )
                  })}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Issue Alert */}
          <TabsContent value="issue-alert">
            <div className="grid md:grid-cols-2 gap-6">
              <Card className="bg-white/10 backdrop-blur-sm border-blue-500/30">
                <CardHeader>
                  <CardTitle className="text-white">Issue New Fire Ban</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-blue-200 mb-2">Fire Ban Category</label>
                    <select className="w-full p-3 bg-white/10 border border-blue-500/30 rounded-lg text-white">
                      <option>Category 1 - Open fires prohibited</option>
                      <option>Category 2 - All outdoor fires prohibited</option>
                      <option>Category 3 - Extreme fire danger</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-blue-200 mb-2">Affected Region</label>
                    <select className="w-full p-3 bg-white/10 border border-blue-500/30 rounded-lg text-white">
                      <option>Kamloops Fire Centre</option>
                      <option>Prince George Fire Centre</option>
                      <option>Coastal Fire Centre</option>
                      <option>Southeast Fire Centre</option>
                    </select>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-blue-200 mb-2">Effective Date</label>
                      <input
                        type="date"
                        className="w-full p-3 bg-white/10 border border-blue-500/30 rounded-lg text-white"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-blue-200 mb-2">Expiry Date</label>
                      <input
                        type="date"
                        className="w-full p-3 bg-white/10 border border-blue-500/30 rounded-lg text-white"
                      />
                    </div>
                  </div>

                  <Button className="w-full bg-orange-500 hover:bg-orange-600 text-white">
                    <AlertTriangle className="w-4 h-4 mr-2" />
                    Issue Fire Ban Alert
                  </Button>
                </CardContent>
              </Card>

              <Card className="bg-white/10 backdrop-blur-sm border-blue-500/30">
                <CardHeader>
                  <CardTitle className="text-white">Alert Preview</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="p-4 bg-orange-500/20 border border-orange-500/30 rounded-lg">
                    <div className="flex items-center gap-2 mb-3">
                      <AlertTriangle className="w-5 h-5 text-orange-400" />
                      <span className="font-semibold text-white">FIRE BAN ALERT</span>
                    </div>
                    <p className="text-blue-200 mb-2">
                      A Category 2 Fire Ban is now in effect for the Kamloops Fire Centre region.
                    </p>
                    <p className="text-sm text-blue-300">
                      Effective: August 13, 2024 at 12:00 PM
                      <br />
                      Expires: August 23, 2024 at 12:00 PM
                    </p>
                  </div>

                  <div className="mt-4 space-y-2">
                    <h4 className="font-medium text-white">Distribution Channels:</h4>
                    <div className="space-y-1 text-sm text-blue-300">
                      <div>✓ SafeRoute AI Community Portals</div>
                      <div>✓ Emergency Alert System</div>
                      <div>✓ Social Media Channels</div>
                      <div>✓ Local Radio Stations</div>
                      <div>✓ Municipal Websites</div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Mass Communication */}
          <TabsContent value="communication">
            <Card className="bg-white/10 backdrop-blur-sm border-blue-500/30">
              <CardHeader>
                <CardTitle className="text-white flex items-center gap-2">
                  <Megaphone className="w-5 h-5" />
                  Mass Communication Center
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid md:grid-cols-3 gap-4">
                  <Card className="bg-white/5 border-blue-500/20">
                    <CardContent className="p-4 text-center">
                      <Users className="w-8 h-8 text-cyan-400 mx-auto mb-2" />
                      <div className="text-2xl font-bold text-white">156,000</div>
                      <div className="text-sm text-blue-300">Active Users</div>
                    </CardContent>
                  </Card>

                  <Card className="bg-white/5 border-blue-500/20">
                    <CardContent className="p-4 text-center">
                      <Megaphone className="w-8 h-8 text-cyan-400 mx-auto mb-2" />
                      <div className="text-2xl font-bold text-white">23</div>
                      <div className="text-sm text-blue-300">Active Alerts</div>
                    </CardContent>
                  </Card>

                  <Card className="bg-white/5 border-blue-500/20">
                    <CardContent className="p-4 text-center">
                      <Eye className="w-8 h-8 text-cyan-400 mx-auto mb-2" />
                      <div className="text-2xl font-bold text-white">94%</div>
                      <div className="text-sm text-blue-300">Delivery Rate</div>
                    </CardContent>
                  </Card>
                </div>

                <div>
                  <label className="block text-sm font-medium text-blue-200 mb-2">Compose Alert Message</label>
                  <textarea
                    className="w-full p-4 bg-white/10 border border-blue-500/30 rounded-lg text-white placeholder-blue-300"
                    placeholder="Enter your fire ban or emergency alert message..."
                    rows={4}
                  />
                </div>

                <div className="flex gap-4">
                  <Button className="flex-1 bg-cyan-500/20 hover:bg-cyan-500/30 text-cyan-300 border border-cyan-500/30">
                    <FileText className="w-4 h-4 mr-2" />
                    Save Draft
                  </Button>
                  <Button className="flex-1 bg-blue-500 hover:bg-blue-600 text-white">
                    <Megaphone className="w-4 h-4 mr-2" />
                    Send Alert
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Analytics */}
          <TabsContent value="analytics">
            <div className="grid md:grid-cols-2 gap-6">
              <Card className="bg-white/10 backdrop-blur-sm border-blue-500/30">
                <CardHeader>
                  <CardTitle className="text-white">Fire Ban Compliance</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex justify-between items-center">
                      <span className="text-blue-200">Overall Compliance Rate</span>
                      <span className="text-2xl font-bold text-green-400">87%</span>
                    </div>
                    <div className="w-full bg-white/10 rounded-full h-3">
                      <div className="bg-green-500 h-3 rounded-full" style={{ width: "87%" }}></div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-white/10 backdrop-blur-sm border-blue-500/30">
                <CardHeader>
                  <CardTitle className="text-white">Community Reports</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span className="text-blue-300">Fire Ban Violations</span>
                      <span className="text-white font-medium">12</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-blue-300">Smoke Reports</span>
                      <span className="text-white font-medium">47</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-blue-300">Fire Confirmations</span>
                      <span className="text-white font-medium">3</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
