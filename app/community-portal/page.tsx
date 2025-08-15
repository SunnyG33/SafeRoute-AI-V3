import AppLayout from "@/components/layout/AppLayout"
import CommunityPortal from "@/components/community/CommunityPortal"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
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

export default function CommunityPortalPage() {
  return (
    <AppLayout
      title="Community Portal"
      previousRoute="/landing"
      nextRoute="/hero-mode-landing"
      previousLabel="Back to Landing"
      nextLabel="Hero Mode"
    >
      <div className="space-y-6">
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
              <Input placeholder="Search by name, phone, or location..." className="bg-gray-800 border-gray-600" />
              <div className="space-y-2">
                <div className="flex items-center justify-between p-2 bg-green-800/30 rounded">
                  <div className="flex items-center gap-2">
                    <UserCheck className="w-4 h-4 text-green-400" />
                    <span className="text-sm">Sarah Johnson - Safe</span>
                  </div>
                  <span className="text-xs text-gray-400">2 hrs ago</span>
                </div>
                <div className="flex items-center justify-between p-2 bg-yellow-800/30 rounded">
                  <div className="flex items-center gap-2">
                    <Clock className="w-4 h-4 text-yellow-400" />
                    <span className="text-sm">Mike Chen - Last seen</span>
                  </div>
                  <span className="text-xs text-gray-400">6 hrs ago</span>
                </div>
              </div>
              <Button className="w-full bg-green-600 hover:bg-green-700">
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
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="emergency">Emergency</TabsTrigger>
            <TabsTrigger value="heroes">Heroes</TabsTrigger>
            <TabsTrigger value="events">Events</TabsTrigger>
            <TabsTrigger value="resources">Resources</TabsTrigger>
          </TabsList>

          <TabsContent value="emergency" className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              <Card className="border-red-500/30">
                <CardHeader className="pb-3">
                  <CardTitle className="text-sm text-red-400">Active Incidents</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-white">3</div>
                  <p className="text-xs text-gray-400">Requiring response</p>
                </CardContent>
              </Card>

              <Card className="border-green-500/30">
                <CardHeader className="pb-3">
                  <CardTitle className="text-sm text-green-400">People Safe</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-white">1,847</div>
                  <p className="text-xs text-gray-400">Confirmed safe</p>
                </CardContent>
              </Card>

              <Card className="border-blue-500/30">
                <CardHeader className="pb-3">
                  <CardTitle className="text-sm text-blue-400">Heroes Active</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-white">23</div>
                  <p className="text-xs text-gray-400">Responding now</p>
                </CardContent>
              </Card>
            </div>
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
