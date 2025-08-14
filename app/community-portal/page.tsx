"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import AppLayout from "@/components/layout/AppLayout"
import CommunityPortal from "@/components/community/CommunityPortal"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { LiveIncidentFeed } from "@/components/realtime/LiveIncidentFeed"
import { LiveCommunications } from "@/components/realtime/LiveCommunications"
import { createClient } from "@/lib/supabase/client"
import {
  Award,
  Users,
  Calendar,
  Trophy,
  AlertTriangle,
  Search,
  Bell,
  MessageCircle,
  MapPin,
  UserCheck,
  Radio,
  Satellite,
  Shield,
  Heart,
  Clock,
  Phone,
} from "lucide-react"
import Link from "next/link"

interface User {
  id: string
  email: string
  role: string
  first_name: string
  last_name: string
}

interface CommunityStats {
  activeIncidents: number
  peopleSafe: number
  heroesActive: number
  totalMembers: number
}

export default function CommunityPortalPage() {
  const router = useRouter()
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)
  const [stats, setStats] = useState<CommunityStats>({
    activeIncidents: 3,
    peopleSafe: 1847,
    heroesActive: 23,
    totalMembers: 234,
  })
  const [searchQuery, setSearchQuery] = useState("")
  const [safeReports, setSafeReports] = useState([
    { name: "Sarah Johnson", status: "Safe", time: "2 hrs ago" },
    { name: "Mike Chen", status: "Last seen", time: "6 hrs ago" },
  ])

  useEffect(() => {
    const checkAuth = async () => {
      const supabase = createClient()

      const {
        data: { session },
      } = await supabase.auth.getSession()

      if (!session) {
        router.push("/auth/login")
        return
      }

      // Get user profile
      const { data: profile } = await supabase.from("users").select("*").eq("id", session.user.id).single()

      if (!profile) {
        router.push("/dashboard")
        return
      }

      setUser(profile)
      setLoading(false)
    }

    checkAuth()
  }, [router])

  useEffect(() => {
    if (!user) return

    const supabase = createClient()

    const fetchCommunityStats = async () => {
      // Fetch real community statistics
      const { data: incidents } = await supabase.from("incidents").select("*").eq("status", "active")

      const { data: heroes } = await supabase.from("users").select("*").eq("role", "responder").eq("status", "active")

      const { data: members } = await supabase.from("users").select("id")

      if (incidents && heroes && members) {
        setStats({
          activeIncidents: incidents.length,
          peopleSafe: 1847, // This would come from safety reports
          heroesActive: heroes.length,
          totalMembers: members.length,
        })
      }
    }

    fetchCommunityStats()

    // Set up real-time subscriptions
    const incidentsSubscription = supabase
      .channel("community-incidents")
      .on("postgres_changes", { event: "*", schema: "public", table: "incidents" }, () => fetchCommunityStats())
      .subscribe()

    return () => {
      incidentsSubscription.unsubscribe()
    }
  }, [user])

  const handleSafetyReport = async () => {
    if (!user || !searchQuery.trim()) return

    const supabase = createClient()

    // In a real implementation, this would create a safety report
    const { error } = await supabase.from("safety_reports").insert({
      reporter_id: user.id,
      reported_person: searchQuery,
      status: "safe",
      location: "Community Center", // This would be dynamic
      created_at: new Date().toISOString(),
    })

    if (!error) {
      // Update local state
      setSafeReports((prev) => [{ name: searchQuery, status: "Safe", time: "Just now" }, ...prev])
      setSearchQuery("")
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-indigo-900 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 bg-gradient-to-br from-green-500 to-green-600 rounded-2xl flex items-center justify-center mb-4 mx-auto">
            <Users className="w-10 h-10 text-white" />
          </div>
          <p className="text-white">Loading Community Portal...</p>
        </div>
      </div>
    )
  }

  return (
    <AppLayout
      title="Community Portal"
      previousRoute="/landing"
      nextRoute="/hero-mode-landing"
      previousLabel="Back to Landing"
      nextLabel="Hero Mode"
    >
      <div className="space-y-6">
        {/* Welcome Message */}
        <div className="bg-gradient-to-r from-green-500/10 to-blue-500/10 border border-green-500/20 rounded-xl p-4">
          <h2 className="text-xl font-bold text-white mb-2">Welcome back, {user?.first_name}!</h2>
          <p className="text-gray-300">Stay connected with your community and help keep everyone safe.</p>
        </div>

        <Card className="border-red-500/30 bg-red-900/20">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-red-400">
              <AlertTriangle className="w-5 h-5" />
              Active Community Alerts
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="flex items-center justify-between p-3 bg-red-800/30 rounded-lg">
              <div className="flex items-center gap-3">
                <div className="w-3 h-3 bg-red-500 rounded-full animate-pulse"></div>
                <div>
                  <p className="text-white font-medium">Wildfire Warning - Evacuation Alert</p>
                  <p className="text-gray-300 text-sm">Issued 2 hours ago • Affects 1,200 residents</p>
                </div>
              </div>
              <Badge variant="destructive">CRITICAL</Badge>
            </div>

            <div className="flex items-center justify-between p-3 bg-yellow-800/30 rounded-lg">
              <div className="flex items-center gap-3">
                <div className="w-3 h-3 bg-yellow-500 rounded-full animate-pulse"></div>
                <div>
                  <p className="text-white font-medium">Severe Weather Watch</p>
                  <p className="text-gray-300 text-sm">Issued 4 hours ago • High winds expected</p>
                </div>
              </div>
              <Badge variant="secondary">WATCH</Badge>
            </div>

            <div className="flex gap-2 mt-4">
              <Button size="sm" className="bg-blue-600 hover:bg-blue-700">
                <Bell className="w-4 h-4 mr-2" />
                Enable Notifications
              </Button>
              <Button size="sm" variant="outline">
                <Search className="w-4 h-4 mr-2" />
                Search Other Regions
              </Button>
            </div>
          </CardContent>
        </Card>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card className="border-blue-500/30 bg-blue-900/20">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-blue-400">
                <Search className="w-5 h-5" />
                Find Family & Friends
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex gap-2">
                <Input
                  placeholder="Search by name, phone, or location..."
                  className="bg-gray-800 border-gray-600 flex-1"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
                <Button
                  size="sm"
                  className="bg-green-600 hover:bg-green-700"
                  onClick={handleSafetyReport}
                  disabled={!searchQuery.trim()}
                >
                  <Search className="w-4 h-4" />
                </Button>
              </div>
              <div className="space-y-2">
                {safeReports.map((report, index) => (
                  <div
                    key={index}
                    className={`flex items-center justify-between p-2 rounded ${
                      report.status === "Safe" ? "bg-green-800/30" : "bg-yellow-800/30"
                    }`}
                  >
                    <div className="flex items-center gap-2">
                      {report.status === "Safe" ? (
                        <UserCheck className="w-4 h-4 text-green-400" />
                      ) : (
                        <Clock className="w-4 h-4 text-yellow-400" />
                      )}
                      <span className="text-sm">
                        {report.name} - {report.status}
                      </span>
                    </div>
                    <span className="text-xs text-gray-400">{report.time}</span>
                  </div>
                ))}
              </div>
              <Button className="w-full bg-green-600 hover:bg-green-700" onClick={handleSafetyReport}>
                <Heart className="w-4 h-4 mr-2" />
                Report Someone Safe
              </Button>
            </CardContent>
          </Card>

          <Card className="border-purple-500/30 bg-purple-900/20">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-purple-400">
                <MessageCircle className="w-5 h-5" />
                Emergency Chat Rooms
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="space-y-2">
                <Button variant="outline" className="w-full justify-start bg-transparent">
                  <Radio className="w-4 h-4 mr-2" />
                  Wildfire Response Team (47 active)
                </Button>
                <Button variant="outline" className="w-full justify-start bg-transparent">
                  <Users className="w-4 h-4 mr-2" />
                  Community Coordination (123 active)
                </Button>
                <Button variant="outline" className="w-full justify-start bg-transparent">
                  <Shield className="w-4 h-4 mr-2" />
                  Elder & Vulnerable Support (28 active)
                </Button>
                <Button variant="outline" className="w-full justify-start bg-transparent">
                  <Satellite className="w-4 h-4 mr-2" />
                  Offline Communication Hub (15 active)
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>

        <Tabs defaultValue="emergency" className="w-full">
          <TabsList className="grid w-full grid-cols-6">
            <TabsTrigger value="emergency">Emergency</TabsTrigger>
            <TabsTrigger value="live-feed">Live Feed</TabsTrigger>
            <TabsTrigger value="communications">Communications</TabsTrigger>
            <TabsTrigger value="heroes">Heroes</TabsTrigger>
            <TabsTrigger value="events">Events</TabsTrigger>
            <TabsTrigger value="resources">Resources</TabsTrigger>
          </TabsList>

          <TabsContent value="emergency" className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              <Card className="border-red-500/30">
                <CardHeader className="pb-3">
                  <CardTitle className="text-sm text-red-400">Active Incidents</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-white">{stats.activeIncidents}</div>
                  <p className="text-xs text-gray-400">Requiring response</p>
                </CardContent>
              </Card>

              <Card className="border-green-500/30">
                <CardHeader className="pb-3">
                  <CardTitle className="text-sm text-green-400">People Safe</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-white">{stats.peopleSafe.toLocaleString()}</div>
                  <p className="text-xs text-gray-400">Confirmed safe</p>
                </CardContent>
              </Card>

              <Card className="border-blue-500/30">
                <CardHeader className="pb-3">
                  <CardTitle className="text-sm text-blue-400">Heroes Active</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-white">{stats.heroesActive}</div>
                  <p className="text-xs text-gray-400">Responding now</p>
                </CardContent>
              </Card>

              <Card className="border-purple-500/30">
                <CardHeader className="pb-3">
                  <CardTitle className="text-sm text-purple-400">Community Members</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-white">{stats.totalMembers}</div>
                  <p className="text-xs text-gray-400">Total registered</p>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="live-feed" className="space-y-4">
            <LiveIncidentFeed />
          </TabsContent>

          <TabsContent value="communications" className="space-y-4">
            <LiveCommunications />
          </TabsContent>

          <TabsContent value="heroes" className="space-y-4">
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/hero-profile">
                <Button className="bg-gradient-to-r from-yellow-500 to-orange-500 hover:from-yellow-600 hover:to-orange-600 text-white font-semibold px-6 py-3">
                  <Award className="w-5 h-5 mr-2" />
                  Hero Profiles & Badges
                </Button>
              </Link>

              <Button className="bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white font-semibold px-6 py-3">
                <Users className="w-5 h-5 mr-2" />
                Community Leaderboard
              </Button>

              <Button className="bg-gradient-to-r from-red-500 to-pink-500 hover:from-red-600 hover:to-pink-600 text-white font-semibold px-6 py-3">
                <Trophy className="w-5 h-5 mr-2" />
                Volunteer Recognition
              </Button>
            </div>
          </TabsContent>

          <TabsContent value="events" className="space-y-4">
            <Button className="bg-gradient-to-r from-green-500 to-teal-500 hover:from-green-600 hover:to-teal-600 text-white font-semibold px-6 py-3 w-full">
              <Calendar className="w-5 h-5 mr-2" />
              Community Events & Training
            </Button>
          </TabsContent>

          <TabsContent value="resources" className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Button variant="outline" className="h-auto p-4 flex-col bg-transparent">
                <MapPin className="w-6 h-6 mb-2" />
                <span>Emergency Shelters</span>
              </Button>
              <Button variant="outline" className="h-auto p-4 flex-col bg-transparent">
                <Phone className="w-6 h-6 mb-2" />
                <span>Emergency Contacts</span>
              </Button>
            </div>
          </TabsContent>
        </Tabs>

        <CommunityPortal />
      </div>
    </AppLayout>
  )
}
