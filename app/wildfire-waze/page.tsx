"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { UniversalNavigation } from "@/components/navigation/UniversalNavigation"
import { Flame, MapPin, AlertTriangle, Camera, Trophy, Star, Wind, Eye, Shield, Target, Zap } from "lucide-react"

const reportTypes = [
  { id: "smoke", label: "Smoke Spotted", icon: Eye, points: 50, color: "bg-gray-500" },
  { id: "fire", label: "Fire Confirmed", icon: Flame, points: 100, color: "bg-red-500" },
  { id: "evacuation", label: "Evacuation Route", icon: Shield, points: 75, color: "bg-orange-500" },
  { id: "hazard", label: "Road Hazard", icon: AlertTriangle, points: 25, color: "bg-yellow-500" },
  { id: "safe-zone", label: "Safe Zone", icon: Target, points: 40, color: "bg-green-500" },
  { id: "weather", label: "Weather Update", icon: Wind, points: 30, color: "bg-blue-500" },
]

const recentReports = [
  {
    id: 1,
    type: "smoke",
    location: "Highway 1, Mile 23",
    reporter: "Sarah M.",
    time: "2 min ago",
    verified: true,
    points: 50,
  },
  {
    id: 2,
    type: "fire",
    location: "Pine Ridge Trail",
    reporter: "Mike T.",
    time: "8 min ago",
    verified: true,
    points: 100,
  },
  {
    id: 3,
    type: "evacuation",
    location: "Cedar Valley Rd",
    reporter: "Lisa K.",
    time: "15 min ago",
    verified: false,
    points: 75,
  },
  {
    id: 4,
    type: "safe-zone",
    location: "Community Center",
    reporter: "David R.",
    time: "23 min ago",
    verified: true,
    points: 40,
  },
]

const topReporters = [
  { name: "Sarah Mitchell", points: 2850, reports: 47, badges: 8, avatar: "👩‍🚒" },
  { name: "Mike Thompson", points: 2340, reports: 39, badges: 6, avatar: "👨‍🌾" },
  { name: "Lisa Kim", points: 1920, reports: 32, badges: 5, avatar: "👩‍⚕️" },
  { name: "David Rodriguez", points: 1650, reports: 28, badges: 4, avatar: "👨‍🚒" },
]

const achievements = [
  { name: "First Reporter", description: "Submit your first hazard report", icon: Star, earned: true },
  { name: "Eagle Eye", description: "Report 10 verified incidents", icon: Eye, earned: true },
  { name: "Community Guardian", description: "Help 25 people with reports", icon: Shield, earned: false },
  { name: "Fire Spotter", description: "Report 5 confirmed fires", icon: Flame, earned: false },
]

export default function WildfireWaze() {
  const [selectedReport, setSelectedReport] = useState("")
  const [userPoints, setUserPoints] = useState(1240)
  const [userReports, setUserReports] = useState(18)

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-900 via-red-900 to-yellow-900">
      <UniversalNavigation />

      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="p-3 rounded-xl bg-gradient-to-r from-orange-500 to-red-500">
              <Flame className="w-8 h-8 text-white" />
            </div>
            <h1 className="text-4xl font-bold text-white">Wildfire Waze</h1>
          </div>
          <p className="text-xl text-orange-200 max-w-3xl mx-auto mb-4">
            Community-Powered Wildfire Intelligence Network
          </p>
          <div className="flex items-center justify-center gap-6 text-sm text-orange-300">
            <span>🔥 Real-Time Reports</span>
            <span>🏆 Earn Points & Badges</span>
            <span>🤝 Save Lives Together</span>
          </div>
        </div>

        {/* User Stats Bar */}
        <div className="bg-black/20 backdrop-blur-sm border border-orange-500/30 rounded-xl p-4 mb-8">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-6">
              <div className="text-center">
                <div className="text-2xl font-bold text-orange-300">{userPoints}</div>
                <div className="text-sm text-orange-400">Points</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-orange-300">{userReports}</div>
                <div className="text-sm text-orange-400">Reports</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-orange-300">3</div>
                <div className="text-sm text-orange-400">Badges</div>
              </div>
            </div>
            <Button className="bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600">
              <Camera className="w-4 h-4 mr-2" />
              Quick Report
            </Button>
          </div>
        </div>

        <Tabs defaultValue="report" className="space-y-6">
          <TabsList className="grid w-full grid-cols-4 bg-black/20 border border-orange-500/30">
            <TabsTrigger value="report" className="data-[state=active]:bg-orange-500/30">
              Report Hazard
            </TabsTrigger>
            <TabsTrigger value="map" className="data-[state=active]:bg-orange-500/30">
              Live Map
            </TabsTrigger>
            <TabsTrigger value="leaderboard" className="data-[state=active]:bg-orange-500/30">
              Leaderboard
            </TabsTrigger>
            <TabsTrigger value="achievements" className="data-[state=active]:bg-orange-500/30">
              Achievements
            </TabsTrigger>
          </TabsList>

          {/* Report Hazard Tab */}
          <TabsContent value="report" className="space-y-6">
            <div className="grid md:grid-cols-2 gap-6">
              <Card className="bg-black/20 backdrop-blur-sm border-orange-500/30">
                <CardHeader>
                  <CardTitle className="text-orange-200 flex items-center gap-2">
                    <AlertTriangle className="w-5 h-5" />
                    Report Type
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  {reportTypes.map((type) => {
                    const Icon = type.icon
                    return (
                      <button
                        key={type.id}
                        onClick={() => setSelectedReport(type.id)}
                        className={`w-full p-4 rounded-lg border-2 transition-all ${
                          selectedReport === type.id
                            ? "border-orange-500 bg-orange-500/20"
                            : "border-orange-500/30 bg-black/10 hover:bg-orange-500/10"
                        }`}
                      >
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-3">
                            <div className={`p-2 rounded-lg ${type.color}`}>
                              <Icon className="w-4 h-4 text-white" />
                            </div>
                            <span className="text-orange-200 font-medium">{type.label}</span>
                          </div>
                          <Badge variant="secondary" className="bg-orange-500/20 text-orange-300">
                            +{type.points} pts
                          </Badge>
                        </div>
                      </button>
                    )
                  })}
                </CardContent>
              </Card>

              <Card className="bg-black/20 backdrop-blur-sm border-orange-500/30">
                <CardHeader>
                  <CardTitle className="text-orange-200 flex items-center gap-2">
                    <MapPin className="w-5 h-5" />
                    Location & Details
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-orange-300 mb-2">Current Location</label>
                    <div className="p-3 bg-black/20 rounded-lg border border-orange-500/30">
                      <div className="text-orange-200">📍 Highway 97, Mile Marker 45</div>
                      <div className="text-sm text-orange-400">GPS: 49.2827° N, 123.1207° W</div>
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-orange-300 mb-2">Description</label>
                    <textarea
                      className="w-full p-3 bg-black/20 border border-orange-500/30 rounded-lg text-orange-200 placeholder-orange-400"
                      placeholder="Describe what you're seeing..."
                      rows={3}
                    />
                  </div>

                  <div className="flex gap-3">
                    <Button className="flex-1 bg-orange-500/20 hover:bg-orange-500/30 text-orange-300 border border-orange-500/30">
                      <Camera className="w-4 h-4 mr-2" />
                      Add Photo
                    </Button>
                    <Button className="flex-1 bg-red-500 hover:bg-red-600 text-white">Submit Report</Button>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Recent Reports */}
            <Card className="bg-black/20 backdrop-blur-sm border-orange-500/30">
              <CardHeader>
                <CardTitle className="text-orange-200 flex items-center gap-2">
                  <Zap className="w-5 h-5" />
                  Live Community Reports
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {recentReports.map((report) => {
                    const reportType = reportTypes.find((t) => t.id === report.type)
                    const Icon = reportType?.icon || AlertTriangle
                    return (
                      <div
                        key={report.id}
                        className="flex items-center justify-between p-3 bg-black/10 rounded-lg border border-orange-500/20"
                      >
                        <div className="flex items-center gap-3">
                          <div className={`p-2 rounded-lg ${reportType?.color || "bg-gray-500"}`}>
                            <Icon className="w-4 h-4 text-white" />
                          </div>
                          <div>
                            <div className="text-orange-200 font-medium">{report.location}</div>
                            <div className="text-sm text-orange-400">
                              by {report.reporter} • {report.time}
                            </div>
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          {report.verified && (
                            <Badge className="bg-green-500/20 text-green-300 border-green-500/30">Verified</Badge>
                          )}
                          <Badge variant="secondary" className="bg-orange-500/20 text-orange-300">
                            +{report.points}
                          </Badge>
                        </div>
                      </div>
                    )
                  })}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Live Map Tab */}
          <TabsContent value="map">
            <Card className="bg-black/20 backdrop-blur-sm border-orange-500/30">
              <CardHeader>
                <CardTitle className="text-orange-200">Live Wildfire Intelligence Map</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-96 bg-black/20 rounded-lg border border-orange-500/30 flex items-center justify-center">
                  <div className="text-center text-orange-300">
                    <MapPin className="w-12 h-12 mx-auto mb-4" />
                    <p className="text-lg font-medium">Interactive Map Coming Soon</p>
                    <p className="text-sm text-orange-400">Real-time hazard overlay with community reports</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Leaderboard Tab */}
          <TabsContent value="leaderboard">
            <Card className="bg-black/20 backdrop-blur-sm border-orange-500/30">
              <CardHeader>
                <CardTitle className="text-orange-200 flex items-center gap-2">
                  <Trophy className="w-5 h-5" />
                  Community Heroes Leaderboard
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {topReporters.map((reporter, index) => (
                    <div
                      key={index}
                      className="flex items-center justify-between p-4 bg-black/10 rounded-lg border border-orange-500/20"
                    >
                      <div className="flex items-center gap-4">
                        <div className="text-2xl font-bold text-orange-300">#{index + 1}</div>
                        <div className="text-3xl">{reporter.avatar}</div>
                        <div>
                          <div className="text-orange-200 font-medium">{reporter.name}</div>
                          <div className="text-sm text-orange-400">
                            {reporter.reports} reports • {reporter.badges} badges
                          </div>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="text-xl font-bold text-orange-300">{reporter.points.toLocaleString()}</div>
                        <div className="text-sm text-orange-400">points</div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Achievements Tab */}
          <TabsContent value="achievements">
            <div className="grid md:grid-cols-2 gap-6">
              {achievements.map((achievement, index) => {
                const Icon = achievement.icon
                return (
                  <Card
                    key={index}
                    className={`bg-black/20 backdrop-blur-sm border-orange-500/30 ${achievement.earned ? "ring-2 ring-green-500/50" : ""}`}
                  >
                    <CardContent className="p-6">
                      <div className="flex items-center gap-4">
                        <div className={`p-3 rounded-lg ${achievement.earned ? "bg-green-500" : "bg-gray-500"}`}>
                          <Icon className="w-6 h-6 text-white" />
                        </div>
                        <div className="flex-1">
                          <h3 className="text-lg font-semibold text-orange-200">{achievement.name}</h3>
                          <p className="text-sm text-orange-400">{achievement.description}</p>
                        </div>
                        {achievement.earned && (
                          <Badge className="bg-green-500/20 text-green-300 border-green-500/30">Earned</Badge>
                        )}
                      </div>
                    </CardContent>
                  </Card>
                )
              })}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
