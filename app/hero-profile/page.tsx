"use client"

import { useState } from "react"
import UniversalNavigation from "@/components/navigation/UniversalNavigation"
import {
  Award,
  Clock,
  MapPin,
  Users,
  Trophy,
  Heart,
  Shield,
  Zap,
  BookOpen,
  Calendar,
  CheckCircle,
  AlertTriangle,
  Activity,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"

export default function HeroProfile() {
  const [activeTab, setActiveTab] = useState("overview")

  // Demo Hero Profile Data
  const heroProfile = {
    name: "Sarah Blackhorse",
    title: "Community Hero - Level 7",
    location: "Musqueam Territory, BC",
    joinDate: "March 2024",
    totalPoints: 2847,
    nextLevelPoints: 3000,
    heroRank: "#3 in BC Region",
    avatar: "/indigenous-woman-responder.png",

    stats: {
      livesImpacted: 23,
      responseTime: "2.3 min avg",
      volunteeredHours: 156,
      trainingSessions: 12,
      communitiesServed: 4,
      emergenciesResponded: 18,
    },

    badges: [
      {
        name: "First Responder",
        icon: Shield,
        color: "bg-red-500",
        earned: "2024-03-15",
        description: "Completed advanced first aid certification",
      },
      {
        name: "CPR Master",
        icon: Heart,
        color: "bg-pink-500",
        earned: "2024-04-02",
        description: "Successfully performed CPR in emergency",
      },
      {
        name: "Community Guardian",
        icon: Users,
        color: "bg-blue-500",
        earned: "2024-05-20",
        description: "Served 3+ communities",
      },
      {
        name: "Lightning Response",
        icon: Zap,
        color: "bg-yellow-500",
        earned: "2024-06-10",
        description: "Sub-2 minute response time",
      },
      {
        name: "Elder Wisdom",
        icon: BookOpen,
        color: "bg-purple-500",
        earned: "2024-07-01",
        description: "Completed traditional knowledge training",
      },
      {
        name: "Territory Protector",
        icon: MapPin,
        color: "bg-green-500",
        earned: "2024-08-05",
        description: "Protected sacred sites during emergency",
      },
    ],

    recentActivity: [
      {
        date: "2024-08-12",
        action: "Responded to medical emergency",
        location: "Musqueam Village",
        points: 150,
        type: "emergency",
      },
      {
        date: "2024-08-10",
        action: "Completed Wilderness First Aid course",
        location: "BCIT Campus",
        points: 200,
        type: "training",
      },
      {
        date: "2024-08-08",
        action: "Assisted in evacuation drill",
        location: "Squamish Nation",
        points: 100,
        type: "drill",
      },
      {
        date: "2024-08-05",
        action: "Earned Territory Protector badge",
        location: "Sacred Grove",
        points: 300,
        type: "achievement",
      },
    ],

    certifications: [
      { name: "Advanced First Aid", issuer: "Red Cross", expiry: "2025-03-15", status: "active" },
      { name: "CPR Level C", issuer: "Heart & Stroke", expiry: "2025-04-02", status: "active" },
      { name: "Wilderness First Aid", issuer: "BCIT", expiry: "2025-08-10", status: "active" },
      { name: "Traditional Medicine", issuer: "Elder Council", expiry: "Lifetime", status: "active" },
      { name: "Emergency Communications", issuer: "EMBC", expiry: "2024-12-01", status: "expiring" },
    ],

    upcomingTraining: [
      { name: "Advanced Trauma Response", date: "2024-08-20", location: "VGH Training Center", spots: "2/12" },
      { name: "Indigenous Healing Practices", date: "2024-08-25", location: "Cultural Center", spots: "5/8" },
      { name: "Disaster Coordination", date: "2024-09-01", location: "EMBC Headquarters", spots: "1/15" },
    ],
  }

  const levelProgress = (heroProfile.totalPoints / heroProfile.nextLevelPoints) * 100

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-indigo-900">
      <UniversalNavigation />

      <div className="container mx-auto px-4 py-8">
        {/* Hero Header */}
        <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl p-6 mb-8">
          <div className="flex flex-col md:flex-row items-center gap-6">
            <div className="relative">
              <img
                src={heroProfile.avatar || "/placeholder.svg"}
                alt={heroProfile.name}
                className="w-32 h-32 rounded-full border-4 border-yellow-400"
              />
              <div className="absolute -bottom-2 -right-2 bg-yellow-400 text-black px-3 py-1 rounded-full text-sm font-bold">
                L7
              </div>
            </div>

            <div className="flex-1 text-center md:text-left">
              <h1 className="text-3xl font-bold text-white mb-2">{heroProfile.name}</h1>
              <p className="text-xl text-yellow-400 mb-2">{heroProfile.title}</p>
              <p className="text-gray-300 mb-4">
                {heroProfile.location} • Joined {heroProfile.joinDate}
              </p>

              <div className="flex flex-wrap gap-4 justify-center md:justify-start">
                <div className="bg-green-500/20 px-4 py-2 rounded-lg">
                  <span className="text-green-400 font-semibold">{heroProfile.stats.livesImpacted} Lives Impacted</span>
                </div>
                <div className="bg-blue-500/20 px-4 py-2 rounded-lg">
                  <span className="text-blue-400 font-semibold">{heroProfile.heroRank}</span>
                </div>
                <div className="bg-purple-500/20 px-4 py-2 rounded-lg">
                  <span className="text-purple-400 font-semibold">{heroProfile.totalPoints} Points</span>
                </div>
              </div>
            </div>

            <div className="text-center">
              <div className="bg-white/10 p-4 rounded-lg">
                <p className="text-gray-300 text-sm mb-2">Next Level Progress</p>
                <Progress value={levelProgress} className="w-32 mb-2" />
                <p className="text-white text-sm">
                  {heroProfile.totalPoints}/{heroProfile.nextLevelPoints}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Navigation Tabs */}
        <div className="flex flex-wrap gap-2 mb-8">
          {[
            { id: "overview", label: "Overview", icon: Activity },
            { id: "badges", label: "Badges & Achievements", icon: Award },
            { id: "training", label: "Training & Certs", icon: BookOpen },
            { id: "activity", label: "Recent Activity", icon: Clock },
            { id: "leaderboard", label: "Community Leaderboard", icon: Trophy },
          ].map((tab) => {
            const Icon = tab.icon
            return (
              <Button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                variant={activeTab === tab.id ? "default" : "outline"}
                className={`${
                  activeTab === tab.id ? "bg-cyan-500 text-white" : "bg-white/10 text-gray-300 hover:bg-white/20"
                }`}
              >
                <Icon className="w-4 h-4 mr-2" />
                {tab.label}
              </Button>
            )
          })}
        </div>

        {/* Tab Content */}
        {activeTab === "overview" && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Stats Cards */}
            {Object.entries(heroProfile.stats).map(([key, value]) => {
              const statIcons = {
                livesImpacted: Heart,
                responseTime: Zap,
                volunteeredHours: Clock,
                trainingSessions: BookOpen,
                communitiesServed: Users,
                emergenciesResponded: Shield,
              }
              const Icon = statIcons[key]
              const statLabels = {
                livesImpacted: "Lives Impacted",
                responseTime: "Avg Response Time",
                volunteeredHours: "Volunteer Hours",
                trainingSessions: "Training Sessions",
                communitiesServed: "Communities Served",
                emergenciesResponded: "Emergencies Responded",
              }

              return (
                <Card key={key} className="bg-white/10 border-white/20">
                  <CardContent className="p-6 text-center">
                    <Icon className="w-8 h-8 mx-auto mb-3 text-cyan-400" />
                    <p className="text-2xl font-bold text-white mb-1">{value}</p>
                    <p className="text-gray-300 text-sm">{statLabels[key]}</p>
                  </CardContent>
                </Card>
              )
            })}
          </div>
        )}

        {activeTab === "badges" && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {heroProfile.badges.map((badge, index) => {
              const Icon = badge.icon
              return (
                <Card key={index} className="bg-white/10 border-white/20 hover:bg-white/15 transition-colors">
                  <CardContent className="p-6 text-center">
                    <div
                      className={`w-16 h-16 ${badge.color} rounded-full flex items-center justify-center mx-auto mb-4`}
                    >
                      <Icon className="w-8 h-8 text-white" />
                    </div>
                    <h3 className="text-lg font-bold text-white mb-2">{badge.name}</h3>
                    <p className="text-gray-300 text-sm mb-3">{badge.description}</p>
                    <Badge variant="outline" className="text-gray-400 border-gray-400">
                      Earned {badge.earned}
                    </Badge>
                  </CardContent>
                </Card>
              )
            })}
          </div>
        )}

        {activeTab === "training" && (
          <div className="space-y-6">
            {/* Current Certifications */}
            <Card className="bg-white/10 border-white/20">
              <CardHeader>
                <CardTitle className="text-white flex items-center gap-2">
                  <CheckCircle className="w-5 h-5 text-green-400" />
                  Current Certifications
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {heroProfile.certifications.map((cert, index) => (
                    <div key={index} className="bg-white/5 p-4 rounded-lg border border-white/10">
                      <div className="flex justify-between items-start mb-2">
                        <h4 className="font-semibold text-white">{cert.name}</h4>
                        <Badge
                          variant={cert.status === "active" ? "default" : "destructive"}
                          className={cert.status === "active" ? "bg-green-500" : "bg-orange-500"}
                        >
                          {cert.status}
                        </Badge>
                      </div>
                      <p className="text-gray-300 text-sm mb-1">Issued by: {cert.issuer}</p>
                      <p className="text-gray-400 text-sm">Expires: {cert.expiry}</p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Upcoming Training */}
            <Card className="bg-white/10 border-white/20">
              <CardHeader>
                <CardTitle className="text-white flex items-center gap-2">
                  <Calendar className="w-5 h-5 text-blue-400" />
                  Upcoming Training Opportunities
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {heroProfile.upcomingTraining.map((training, index) => (
                    <div
                      key={index}
                      className="bg-white/5 p-4 rounded-lg border border-white/10 flex justify-between items-center"
                    >
                      <div>
                        <h4 className="font-semibold text-white mb-1">{training.name}</h4>
                        <p className="text-gray-300 text-sm">
                          {training.date} • {training.location}
                        </p>
                        <p className="text-gray-400 text-sm">Available spots: {training.spots}</p>
                      </div>
                      <Button className="bg-cyan-500 hover:bg-cyan-600">Register</Button>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        )}

        {activeTab === "activity" && (
          <Card className="bg-white/10 border-white/20">
            <CardHeader>
              <CardTitle className="text-white flex items-center gap-2">
                <Activity className="w-5 h-5 text-cyan-400" />
                Recent Hero Activity
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {heroProfile.recentActivity.map((activity, index) => {
                  const activityIcons = {
                    emergency: AlertTriangle,
                    training: BookOpen,
                    drill: Shield,
                    achievement: Trophy,
                  }
                  const Icon = activityIcons[activity.type]
                  const activityColors = {
                    emergency: "text-red-400",
                    training: "text-blue-400",
                    drill: "text-yellow-400",
                    achievement: "text-purple-400",
                  }

                  return (
                    <div
                      key={index}
                      className="bg-white/5 p-4 rounded-lg border border-white/10 flex items-center gap-4"
                    >
                      <Icon className={`w-6 h-6 ${activityColors[activity.type]}`} />
                      <div className="flex-1">
                        <h4 className="font-semibold text-white">{activity.action}</h4>
                        <p className="text-gray-300 text-sm">
                          {activity.location} • {activity.date}
                        </p>
                      </div>
                      <div className="text-right">
                        <p className="text-green-400 font-semibold">+{activity.points} pts</p>
                      </div>
                    </div>
                  )
                })}
              </div>
            </CardContent>
          </Card>
        )}

        {activeTab === "leaderboard" && (
          <Card className="bg-white/10 border-white/20">
            <CardHeader>
              <CardTitle className="text-white flex items-center gap-2">
                <Trophy className="w-5 h-5 text-yellow-400" />
                BC Region Community Heroes Leaderboard
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {[
                  { rank: 1, name: "Marcus Littlewolf", community: "Squamish Nation", points: 3247, badge: "🥇" },
                  { rank: 2, name: "Elena Riversong", community: "Tsilhqot'in Nation", points: 2956, badge: "🥈" },
                  {
                    rank: 3,
                    name: "Sarah Blackhorse",
                    community: "Musqueam Territory",
                    points: 2847,
                    badge: "🥉",
                    isCurrentUser: true,
                  },
                  { rank: 4, name: "David Strongbear", community: "Haida Gwaii", points: 2634, badge: "4" },
                  { rank: 5, name: "Lisa Moonfeather", community: "Nuu-chah-nulth", points: 2456, badge: "5" },
                ].map((hero) => (
                  <div
                    key={hero.rank}
                    className={`p-4 rounded-lg border flex items-center gap-4 ${
                      hero.isCurrentUser ? "bg-cyan-500/20 border-cyan-400" : "bg-white/5 border-white/10"
                    }`}
                  >
                    <div className="text-2xl font-bold text-yellow-400 w-8 text-center">{hero.badge}</div>
                    <div className="flex-1">
                      <h4 className={`font-semibold ${hero.isCurrentUser ? "text-cyan-300" : "text-white"}`}>
                        {hero.name} {hero.isCurrentUser && "(You)"}
                      </h4>
                      <p className="text-gray-300 text-sm">{hero.community}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-green-400 font-semibold">{hero.points} pts</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  )
}
