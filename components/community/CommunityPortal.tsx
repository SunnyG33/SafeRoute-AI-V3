"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import FloatingEmergencyButtons from "@/components/emergency/FloatingEmergencyButtons"
import {
  Users,
  MessageCircle,
  Calendar,
  MapPin,
  Heart,
  Shield,
  AlertTriangle,
  Star,
  Clock,
  ChevronRight,
} from "lucide-react"

export default function CommunityPortal() {
  const communityStats = {
    activeVolunteers: 247,
    emergenciesHandled: 1834,
    communitiesServed: 12,
    responseTime: "3.2 min",
  }

  const recentActivity = [
    {
      id: 1,
      type: "emergency",
      title: "Medical Emergency Resolved",
      location: "Downtown Vancouver",
      time: "2 hours ago",
      volunteer: "Sarah M.",
      status: "completed",
    },
    {
      id: 2,
      type: "training",
      title: "CPR Training Session",
      location: "Community Center",
      time: "1 day ago",
      volunteer: "Training Team",
      status: "scheduled",
    },
    {
      id: 3,
      type: "volunteer",
      title: "New Volunteer Joined",
      location: "North Shore",
      time: "2 days ago",
      volunteer: "Mike T.",
      status: "active",
    },
  ]

  const upcomingEvents = [
    {
      id: 1,
      title: "First Aid Training Workshop",
      date: "Aug 15, 2024",
      time: "2:00 PM",
      location: "Community Hall",
      spots: 8,
    },
    {
      id: 2,
      title: "Emergency Response Drill",
      date: "Aug 22, 2024",
      time: "10:00 AM",
      location: "City Park",
      spots: 15,
    },
  ]

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header Section */}
      <div className="bg-gradient-to-r from-purple-700 via-purple-800 to-indigo-800 text-white">
        <div className="max-w-7xl mx-auto p-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <Users className="h-8 w-8 text-purple-200" />
              <Shield className="h-8 w-8 text-purple-200" />
              <div>
                <h1 className="text-3xl font-bold">Community Portal</h1>
                <p className="text-purple-200">Traditional Governance • Community Oversight • Volunteer Coordination</p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2 bg-green-500/20 px-3 py-1 rounded-full">
                <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                <span className="text-sm text-green-300">Community Connected</span>
                <span className="text-sm font-bold text-green-200">92%</span>
              </div>
              <div className="flex items-center space-x-2 bg-blue-500/20 px-3 py-1 rounded-full">
                <AlertTriangle className="h-4 w-4 text-blue-300" />
                <span className="text-sm text-blue-200">Active Response</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto p-6 space-y-8">
        {/* Welcome Section */}
        <div className="text-center space-y-4">
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Connect with local heroes, track community safety, and participate in emergency response training
          </p>
        </div>

        {/* Community Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <Card className="bg-white border-blue-200 shadow-sm hover:shadow-md transition-all duration-300">
            <CardContent className="p-6 text-center">
              <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full flex items-center justify-center mx-auto mb-3">
                <Users className="h-6 w-6 text-white" />
              </div>
              <div className="text-3xl font-bold text-gray-800">{communityStats.activeVolunteers}</div>
              <div className="text-sm text-blue-600">Active Volunteers</div>
            </CardContent>
          </Card>

          <Card className="bg-white border-green-200 shadow-sm hover:shadow-md transition-all duration-300">
            <CardContent className="p-6 text-center">
              <div className="w-12 h-12 bg-gradient-to-r from-green-500 to-emerald-500 rounded-full flex items-center justify-center mx-auto mb-3">
                <Shield className="h-6 w-6 text-white" />
              </div>
              <div className="text-3xl font-bold text-gray-800">{communityStats.emergenciesHandled}</div>
              <div className="text-sm text-green-600">Emergencies Handled</div>
            </CardContent>
          </Card>

          <Card className="bg-white border-purple-200 shadow-sm hover:shadow-md transition-all duration-300">
            <CardContent className="p-6 text-center">
              <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center mx-auto mb-3">
                <MapPin className="h-6 w-6 text-white" />
              </div>
              <div className="text-3xl font-bold text-gray-800">{communityStats.communitiesServed}</div>
              <div className="text-sm text-purple-600">Communities Served</div>
            </CardContent>
          </Card>

          <Card className="bg-white border-orange-200 shadow-sm hover:shadow-md transition-all duration-300">
            <CardContent className="p-6 text-center">
              <div className="w-12 h-12 bg-gradient-to-r from-orange-500 to-red-500 rounded-full flex items-center justify-center mx-auto mb-3">
                <Clock className="h-6 w-6 text-white" />
              </div>
              <div className="text-3xl font-bold text-gray-800">{communityStats.responseTime}</div>
              <div className="text-sm text-orange-600">Avg Response Time</div>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Recent Activity */}
          <Card className="bg-white border-gray-200 shadow-sm">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2 text-gray-800">
                <MessageCircle className="h-5 w-5 text-blue-500" />
                <span>Recent Activity</span>
              </CardTitle>
              <CardDescription className="text-gray-600">Latest updates from your community</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {recentActivity.map((activity) => (
                <div
                  key={activity.id}
                  className="flex items-start space-x-3 p-3 rounded-lg bg-gray-50 border border-gray-100"
                >
                  <div className="flex-shrink-0">
                    {activity.type === "emergency" && <AlertTriangle className="h-5 w-5 text-red-500" />}
                    {activity.type === "training" && <Calendar className="h-5 w-5 text-blue-500" />}
                    {activity.type === "volunteer" && <Users className="h-5 w-5 text-green-500" />}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-gray-800">{activity.title}</p>
                    <p className="text-sm text-gray-600">
                      {activity.location} • {activity.volunteer}
                    </p>
                    <p className="text-xs text-gray-500">{activity.time}</p>
                  </div>
                  <Badge
                    variant={activity.status === "completed" ? "default" : "secondary"}
                    className={`text-xs ${
                      activity.status === "completed"
                        ? "bg-green-100 text-green-700 border-green-200"
                        : "bg-blue-100 text-blue-700 border-blue-200"
                    }`}
                  >
                    {activity.status}
                  </Badge>
                </div>
              ))}
              <Button
                variant="outline"
                className="w-full border-gray-300 text-gray-700 hover:bg-gray-50 bg-transparent"
              >
                View All Activity
                <ChevronRight className="h-4 w-4 ml-2" />
              </Button>
            </CardContent>
          </Card>

          {/* Upcoming Events */}
          <Card className="bg-white border-gray-200 shadow-sm">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2 text-gray-800">
                <Calendar className="h-5 w-5 text-purple-500" />
                <span>Upcoming Events</span>
              </CardTitle>
              <CardDescription className="text-gray-600">Training sessions and community events</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {upcomingEvents.map((event) => (
                <div key={event.id} className="p-4 border border-gray-200 rounded-lg space-y-2 bg-gray-50">
                  <h3 className="font-medium text-gray-800">{event.title}</h3>
                  <div className="flex items-center space-x-4 text-sm text-gray-600">
                    <span className="flex items-center space-x-1">
                      <Calendar className="h-4 w-4" />
                      <span>{event.date}</span>
                    </span>
                    <span className="flex items-center space-x-1">
                      <Clock className="h-4 w-4" />
                      <span>{event.time}</span>
                    </span>
                  </div>
                  <div className="flex items-center space-x-1 text-sm text-gray-600">
                    <MapPin className="h-4 w-4" />
                    <span>{event.location}</span>
                  </div>
                  <div className="flex justify-between items-center pt-2">
                    <span className="text-sm text-gray-500">{event.spots} spots available</span>
                    <Button
                      size="sm"
                      className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600"
                    >
                      Register
                    </Button>
                  </div>
                </div>
              ))}
              <Button
                variant="outline"
                className="w-full border-gray-300 text-gray-700 hover:bg-gray-50 bg-transparent"
              >
                View All Events
                <ChevronRight className="h-4 w-4 ml-2" />
              </Button>
            </CardContent>
          </Card>
        </div>

        {/* Quick Actions */}
        <Card className="bg-white border-gray-200 shadow-sm">
          <CardHeader>
            <CardTitle className="text-gray-800">Quick Actions</CardTitle>
            <CardDescription className="text-gray-600">
              Common tasks and resources for community members
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Button className="h-20 flex flex-col items-center justify-center space-y-2 bg-gradient-to-r from-red-500 to-pink-500 hover:from-red-600 hover:to-pink-600">
                <Heart className="h-6 w-6" />
                <span>Become a Volunteer</span>
              </Button>
              <Button
                variant="outline"
                className="h-20 flex flex-col items-center justify-center space-y-2 border-blue-300 text-blue-600 hover:bg-blue-50 bg-transparent"
              >
                <Calendar className="h-6 w-6" />
                <span>Schedule Training</span>
              </Button>
              <Button
                variant="outline"
                className="h-20 flex flex-col items-center justify-center space-y-2 border-green-300 text-green-600 hover:bg-green-50 bg-transparent"
              >
                <MessageCircle className="h-6 w-6" />
                <span>Community Chat</span>
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Community Heroes */}
        <Card className="bg-white border-gray-200 shadow-sm">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2 text-gray-800">
              <Star className="h-5 w-5 text-yellow-500" />
              <span>Community Heroes</span>
            </CardTitle>
            <CardDescription className="text-gray-600">Recognizing our top volunteers this month</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {[
                { name: "Sarah Mitchell", responses: 23, rating: 4.9, avatar: "SM" },
                { name: "David Chen", responses: 19, rating: 4.8, avatar: "DC" },
                { name: "Maria Rodriguez", responses: 17, rating: 4.9, avatar: "MR" },
              ].map((hero, index) => (
                <div
                  key={index}
                  className="flex items-center space-x-3 p-4 bg-gradient-to-r from-yellow-50 to-orange-50 border border-yellow-200 rounded-lg"
                >
                  <Avatar className="border-2 border-yellow-400">
                    <AvatarFallback className="bg-gradient-to-r from-yellow-500 to-orange-500 text-white font-bold">
                      {hero.avatar}
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex-1">
                    <p className="font-medium text-gray-800">{hero.name}</p>
                    <p className="text-sm text-gray-600">{hero.responses} responses</p>
                    <div className="flex items-center space-x-1">
                      <Star className="h-4 w-4 text-yellow-500 fill-current" />
                      <span className="text-sm text-yellow-600">{hero.rating}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
      <FloatingEmergencyButtons />
    </div>
  )
}
