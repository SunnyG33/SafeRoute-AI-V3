"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { UniversalNavigation } from "@/components/navigation/UniversalNavigation"
import {
  Flame,
  MapPin,
  AlertTriangle,
  Camera,
  Trophy,
  Star,
  Wind,
  Eye,
  Shield,
  Target,
  Zap,
  FileText,
} from "lucide-react"

const reportTypes = [
  { id: "smoke", label: "Smoke Spotted", icon: Eye, points: 50, color: "bg-gray-600" },
  { id: "fire", label: "Fire Confirmed", icon: Flame, points: 100, color: "bg-red-600" },
  { id: "evacuation", label: "Evacuation Route", icon: Shield, points: 75, color: "bg-amber-600" },
  { id: "hazard", label: "Road Hazard", icon: AlertTriangle, points: 25, color: "bg-yellow-600" },
  { id: "safe-zone", label: "Safe Zone", icon: Target, points: 40, color: "bg-green-600" },
  { id: "weather", label: "Weather Update", icon: Wind, points: 30, color: "bg-blue-600" },
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
  { name: "First Reporter", description: "Submit your first incident report", icon: Star, earned: true },
  { name: "Eagle Eye", description: "Report 10 verified incidents", icon: Eye, earned: true },
  { name: "Community Guardian", description: "Help 25 people with reports", icon: Shield, earned: false },
  { name: "Fire Spotter", description: "Report 5 confirmed fires", icon: Flame, earned: false },
]

export default function IncidentReporting() {
  const [selectedReport, setSelectedReport] = useState("")
  const [userPoints, setUserPoints] = useState(1240)
  const [userReports, setUserReports] = useState(18)

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-indigo-900">
      <UniversalNavigation />

      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="p-3 rounded-xl bg-gradient-to-r from-blue-500 to-cyan-500">
              <FileText className="w-8 h-8 text-white" />
            </div>
            <h1 className="text-4xl font-bold text-white">Report an Incident</h1>
          </div>
          <p className="text-xl text-blue-200 max-w-3xl mx-auto mb-4">
            Community-Powered Emergency Intelligence Network
          </p>
          <div className="flex items-center justify-center gap-6 text-sm text-blue-300">
            <span>🚨 Real-Time Reports</span>
            <span>🏆 Earn Hero Points</span>
            <span>🤝 Save Lives Together</span>
          </div>
        </div>

        {/* User Stats Bar */}
        <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl p-4 mb-8">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-6">
              <div className="text-center">
                <div className="text-2xl font-bold text-white">{userPoints}</div>
                <div className="text-sm text-blue-300">Hero Points</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-white">{userReports}</div>
                <div className="text-sm text-blue-300">Reports</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-white">3</div>
                <div className="text-sm text-blue-300">Badges</div>
              </div>
            </div>
            <div className="flex gap-3">
              <Button
                className="bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600"
                onClick={() => window.open("/hero-profile", "_blank")}
              >
                <Trophy className="w-4 h-4 mr-2" />
                View Hero Profile
              </Button>
              <Button className="bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-600 hover:to-teal-600">
                <Camera className="w-4 h-4 mr-2" />
                Quick Report
              </Button>
            </div>
          </div>
        </div>

        <Tabs defaultValue="report" className="space-y-6">
          <TabsList className="grid w-full grid-cols-4 bg-white/10 border border-white/20">
            <TabsTrigger value="report" className="data-[state=active]:bg-blue-500/30 text-white">
              Report Incident
            </TabsTrigger>
            <TabsTrigger value="map" className="data-[state=active]:bg-blue-500/30 text-white">
              Live Map
            </TabsTrigger>
            <TabsTrigger value="leaderboard" className="data-[state=active]:bg-blue-500/30 text-white">
              Hero Leaderboard
            </TabsTrigger>
            <TabsTrigger value="achievements" className="data-[state=active]:bg-blue-500/30 text-white">
              Achievements
            </TabsTrigger>
          </TabsList>

          {/* Report Incident Tab */}
          <TabsContent value="report" className="space-y-6">
            <div className="grid md:grid-cols-2 gap-6">
              <Card className="bg-white/10 backdrop-blur-sm border-white/20">
                <CardHeader>
                  <CardTitle className="text-white flex items-center gap-2">
                    <AlertTriangle className="w-5 h-5" />
                    Incident Type
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
                            ? "border-blue-400 bg-blue-500/20"
                            : "border-white/20 bg-white/5 hover:bg-blue-500/10"
                        }`}
                      >
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-3">
                            <div className={`p-2 rounded-lg ${type.color}`}>
                              <Icon className="w-4 h-4 text-white" />
                            </div>
                            <span className="text-white font-medium">{type.label}</span>
                          </div>
                          <Badge variant="secondary" className="bg-blue-500/20 text-blue-300 border-blue-500/30">
                            +{type.points} pts
                          </Badge>
                        </div>
                      </button>
                    )
                  })}
                </CardContent>
              </Card>

              <Card className="bg-white/10 backdrop-blur-sm border-white/20">
                <CardHeader>
                  <CardTitle className="text-white flex items-center gap-2">
                    <MapPin className="w-5 h-5" />
                    Location & Details
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-blue-300 mb-2">Current Location</label>
                    <div className="p-3 bg-white/5 rounded-lg border border-white/20">
                      <div className="text-white">📍 Highway 97, Mile Marker 45</div>
                      <div className="text-sm text-blue-300">GPS: 49.2827° N, 123.1207° W</div>
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-blue-300 mb-2">Description</label>
                    <textarea
                      className="w-full p-3 bg-white/5 border border-white/20 rounded-lg text-white placeholder-blue-300"
                      placeholder="Describe what you're seeing..."
                      rows={3}
                    />
                  </div>

                  <div className="flex gap-3">
                    <Button className="flex-1 bg-white/10 hover:bg-white/20 text-white border border-white/20">
                      <Camera className="w-4 h-4 mr-2" />
                      Add Photo/Video
                    </Button>
                    <Button className="flex-1 bg-emerald-500 hover:bg-emerald-600 text-white">Submit Report</Button>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Recent Reports */}
            <Card className="bg-white/10 backdrop-blur-sm border-white/20">
              <CardHeader>
                <CardTitle className="text-white flex items-center gap-2">
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
                        className="flex items-center justify-between p-3 bg-white/5 rounded-lg border border-white/10"
                      >
                        <div className="flex items-center gap-3">
                          <div className={`p-2 rounded-lg ${reportType?.color || "bg-gray-600"}`}>
                            <Icon className="w-4 h-4 text-white" />
                          </div>
                          <div>
                            <div className="text-white font-medium">{report.location}</div>
                            <div className="text-sm text-blue-300">
                              by {report.reporter} • {report.time}
                            </div>
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          {report.verified && (
                            <Badge className="bg-green-500/20 text-green-300 border-green-500/30">Verified</Badge>
                          )}
                          <Badge variant="secondary" className="bg-blue-500/20 text-blue-300 border-blue-500/30">
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
            <Card className="bg-white/10 backdrop-blur-sm border-white/20">
              <CardHeader>
                <CardTitle className="text-white">Live Emergency Intelligence Map</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-96 bg-white/5 rounded-lg border border-white/20 flex items-center justify-center">
                  <div className="text-center text-blue-300">
                    <MapPin className="w-12 h-12 mx-auto mb-4" />
                    <p className="text-lg font-medium text-white">Interactive Map Coming Soon</p>
                    <p className="text-sm text-blue-300">Real-time incident overlay with community reports</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Hero Leaderboard Tab */}
          <TabsContent value="leaderboard">
            <Card className="bg-white/10 backdrop-blur-sm border-white/20">
              <CardHeader>
                <CardTitle className="text-white flex items-center gap-2">
                  <Trophy className="w-5 h-5" />
                  Community Heroes Leaderboard
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {topReporters.map((reporter, index) => (
                    <div
                      key={index}
                      className="flex items-center justify-between p-4 bg-white/5 rounded-lg border border-white/10 cursor-pointer hover:bg-blue-500/10 transition-colors"
                      onClick={() => window.open("/hero-profile", "_blank")}
                    >
                      <div className="flex items-center gap-4">
                        <div className="text-2xl font-bold text-blue-300">#{index + 1}</div>
                        <div className="text-3xl">{reporter.avatar}</div>
                        <div>
                          <div className="text-white font-medium">{reporter.name}</div>
                          <div className="text-sm text-blue-300">
                            {reporter.reports} reports • {reporter.badges} badges
                          </div>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="text-xl font-bold text-white">{reporter.points.toLocaleString()}</div>
                        <div className="text-sm text-blue-300">hero points</div>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="mt-6 text-center">
                  <Button
                    className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600"
                    onClick={() => window.open("/community-portal", "_blank")}
                  >
                    <Trophy className="w-4 h-4 mr-2" />
                    View Full Community Hub
                  </Button>
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
                    className={`bg-white/10 backdrop-blur-sm border-white/20 cursor-pointer hover:bg-blue-500/10 transition-colors ${achievement.earned ? "ring-2 ring-green-500/50" : ""}`}
                    onClick={() => window.open("/hero-profile", "_blank")}
                  >
                    <CardContent className="p-6">
                      <div className="flex items-center gap-4">
                        <div className={`p-3 rounded-lg ${achievement.earned ? "bg-green-500" : "bg-gray-600"}`}>
                          <Icon className="w-6 h-6 text-white" />
                        </div>
                        <div className="flex-1">
                          <h3 className="text-lg font-semibold text-white">{achievement.name}</h3>
                          <p className="text-sm text-blue-300">{achievement.description}</p>
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
            <div className="mt-6 text-center">
              <Button
                className="bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600"
                onClick={() => window.open("/hero-profile", "_blank")}
              >
                <Star className="w-4 h-4 mr-2" />
                View Full Hero Profile
              </Button>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
