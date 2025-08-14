import { createClient } from "@/lib/supabase/server"
import { redirect } from "next/navigation"
import { UniversalNavigation } from "@/components/navigation/UniversalNavigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { User, Settings, Shield, Users, Building, Crown } from "lucide-react"
import Link from "next/link"

export default async function DashboardPage() {
  const supabase = createClient()

  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    redirect("/auth/login")
  }

  // Get user profile from our users table
  const { data: profile } = await supabase.from("users").select("*").eq("id", user.id).single()

  const roleConfig = {
    civilian: {
      title: "Civilian Portal",
      description: "Access emergency services, report incidents, and connect with your community",
      icon: User,
      color: "bg-gradient-to-r from-emerald-500 to-emerald-600",
      href: "/civilian-portal-hero",
    },
    elder: {
      title: "Elder Portal",
      description: "Traditional governance, cultural protocols, and community guidance",
      icon: Crown,
      color: "bg-gradient-to-r from-amber-600 to-orange-600",
      href: "/elder-portal",
    },
    responder: {
      title: "Responder Portal",
      description: "Emergency coordination, incident management, and response tools",
      icon: Shield,
      color: "bg-gradient-to-r from-purple-600 to-purple-700",
      href: "/responder-portal",
    },
    government: {
      title: "Government Portal",
      description: "Multi-agency coordination, policy management, and oversight",
      icon: Building,
      color: "bg-gradient-to-r from-blue-100 to-blue-200 text-gray-800",
      href: "/government-dashboard",
    },
  }

  const userRole = profile?.role || "civilian"
  const config = roleConfig[userRole as keyof typeof roleConfig] || roleConfig.civilian

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-indigo-900">
      <UniversalNavigation />

      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto space-y-8">
          {/* Welcome Header */}
          <div className="text-center space-y-4">
            <h1 className="text-4xl font-bold text-white">Welcome back, {profile?.first_name || user.email}</h1>
            <p className="text-xl text-gray-300">Your SafeRoute AI Dashboard</p>
          </div>

          {/* User Profile Card */}
          <Card className="bg-white/10 backdrop-blur-sm border-white/20">
            <CardHeader>
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <div className="w-16 h-16 bg-gradient-to-br from-green-400 to-green-600 rounded-full flex items-center justify-center">
                    <User className="w-8 h-8 text-white" />
                  </div>
                  <div>
                    <CardTitle className="text-white">
                      {profile?.first_name} {profile?.last_name}
                    </CardTitle>
                    <CardDescription className="text-gray-300">{user.email}</CardDescription>
                  </div>
                </div>
                <Badge variant="secondary" className="capitalize">
                  {userRole}
                </Badge>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <p className="text-sm text-gray-400">Status</p>
                  <Badge variant={profile?.status === "active" ? "default" : "secondary"}>
                    {profile?.status || "Pending"}
                  </Badge>
                </div>
                <div className="space-y-2">
                  <p className="text-sm text-gray-400">Member Since</p>
                  <p className="text-white">
                    {profile?.created_at ? new Date(profile.created_at).toLocaleDateString() : "Recently"}
                  </p>
                </div>
              </div>

              <div className="flex space-x-4">
                <Link href="/profile/edit">
                  <Button variant="outline" className="border-white/20 text-white hover:bg-white/10 bg-transparent">
                    <Settings className="w-4 h-4 mr-2" />
                    Edit Profile
                  </Button>
                </Link>
                <Link href="/hero-profile">
                  <Button variant="outline" className="border-white/20 text-white hover:bg-white/10 bg-transparent">
                    <Users className="w-4 h-4 mr-2" />
                    Hero Profile
                  </Button>
                </Link>
              </div>
            </CardContent>
          </Card>

          {/* Primary Portal Access */}
          <Card className="bg-white/10 backdrop-blur-sm border-white/20">
            <CardHeader>
              <CardTitle className="text-white flex items-center">
                <config.icon className="w-6 h-6 mr-2" />
                Your Portal
              </CardTitle>
              <CardDescription className="text-gray-300">{config.description}</CardDescription>
            </CardHeader>
            <CardContent>
              <Link href={config.href}>
                <Button className={`w-full ${config.color} text-white py-6 text-lg font-medium`}>
                  Access {config.title}
                </Button>
              </Link>
            </CardContent>
          </Card>

          {/* Quick Access Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <Card className="bg-white/10 backdrop-blur-sm border-white/20">
              <CardHeader>
                <CardTitle className="text-white text-lg">Community Hub</CardTitle>
              </CardHeader>
              <CardContent>
                <Link href="/community-portal">
                  <Button
                    variant="outline"
                    className="w-full border-white/20 text-white hover:bg-white/10 bg-transparent"
                  >
                    <Users className="w-4 h-4 mr-2" />
                    Community Portal
                  </Button>
                </Link>
              </CardContent>
            </Card>

            <Card className="bg-white/10 backdrop-blur-sm border-white/20">
              <CardHeader>
                <CardTitle className="text-white text-lg">Report Incident</CardTitle>
              </CardHeader>
              <CardContent>
                <Link href="/incident-reporting">
                  <Button
                    variant="outline"
                    className="w-full border-white/20 text-white hover:bg-white/10 bg-transparent"
                  >
                    <Shield className="w-4 h-4 mr-2" />
                    Report Now
                  </Button>
                </Link>
              </CardContent>
            </Card>

            <Card className="bg-white/10 backdrop-blur-sm border-white/20">
              <CardHeader>
                <CardTitle className="text-white text-lg">Fire Bans</CardTitle>
              </CardHeader>
              <CardContent>
                <Link href="/fire-ban-portal">
                  <Button
                    variant="outline"
                    className="w-full border-white/20 text-white hover:bg-white/10 bg-transparent"
                  >
                    <Shield className="w-4 h-4 mr-2" />
                    Check Status
                  </Button>
                </Link>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
