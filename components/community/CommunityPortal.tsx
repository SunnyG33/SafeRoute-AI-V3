"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
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
    <div className="max-w-7xl mx-auto p-6 space-y-8">
      {/* Welcome Section */}
      <div className="text-center space-y-4">
        <h1 className="text-4xl font-bold text-gray-900">Community Portal</h1>
        <p className="text-xl text-gray-600 max-w-3xl mx-auto">
          Connect with local heroes, track community safety, and participate in emergency response training
        </p>
      </div>

      {/* Community Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardContent className="p-6 text-center">
            <Users className="h-8 w-8 text-blue-600 mx-auto mb-2" />
            <div className="text-2xl font-bold text-gray-900">{communityStats.activeVolunteers}</div>
            <div className="text-sm text-gray-600">Active Volunteers</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6 text-center">
            <Shield className="h-8 w-8 text-green-600 mx-auto mb-2" />
            <div className="text-2xl font-bold text-gray-900">{communityStats.emergenciesHandled}</div>
            <div className="text-sm text-gray-600">Emergencies Handled</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6 text-center">
            <MapPin className="h-8 w-8 text-purple-600 mx-auto mb-2" />
            <div className="text-2xl font-bold text-gray-900">{communityStats.communitiesServed}</div>
            <div className="text-sm text-gray-600">Communities Served</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6 text-center">
            <Clock className="h-8 w-8 text-orange-600 mx-auto mb-2" />
            <div className="text-2xl font-bold text-gray-900">{communityStats.responseTime}</div>
            <div className="text-sm text-gray-600">Avg Response Time</div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Recent Activity */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <MessageCircle className="h-5 w-5" />
              <span>Recent Activity</span>
            </CardTitle>
            <CardDescription>Latest updates from your community</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {recentActivity.map((activity) => (
              <div key={activity.id} className="flex items-start space-x-3 p-3 rounded-lg bg-gray-50">
                <div className="flex-shrink-0">
                  {activity.type === "emergency" && <AlertTriangle className="h-5 w-5 text-red-500" />}
                  {activity.type === "training" && <Calendar className="h-5 w-5 text-blue-500" />}
                  {activity.type === "volunteer" && <Users className="h-5 w-5 text-green-500" />}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-gray-900">{activity.title}</p>
                  <p className="text-sm text-gray-500">
                    {activity.location} • {activity.volunteer}
                  </p>
                  <p className="text-xs text-gray-400">{activity.time}</p>
                </div>
                <Badge variant={activity.status === "completed" ? "default" : "secondary"} className="text-xs">
                  {activity.status}
                </Badge>
              </div>
            ))}
            <Button variant="outline" className="w-full bg-transparent">
              View All Activity
              <ChevronRight className="h-4 w-4 ml-2" />
            </Button>
          </CardContent>
        </Card>

        {/* Upcoming Events */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Calendar className="h-5 w-5" />
              <span>Upcoming Events</span>
            </CardTitle>
            <CardDescription>Training sessions and community events</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {upcomingEvents.map((event) => (
              <div key={event.id} className="p-4 border rounded-lg space-y-2">
                <h3 className="font-medium text-gray-900">{event.title}</h3>
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
                  <Button size="sm">Register</Button>
                </div>
              </div>
            ))}
            <Button variant="outline" className="w-full bg-transparent">
              View All Events
              <ChevronRight className="h-4 w-4 ml-2" />
            </Button>
          </CardContent>
        </Card>
      </div>

      {/* Quick Actions */}
      <Card>
        <CardHeader>
          <CardTitle>Quick Actions</CardTitle>
          <CardDescription>Common tasks and resources for community members</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Button className="h-20 flex flex-col items-center justify-center space-y-2">
              <Heart className="h-6 w-6" />
              <span>Become a Volunteer</span>
            </Button>
            <Button
              variant="outline"
              className="h-20 flex flex-col items-center justify-center space-y-2 bg-transparent"
            >
              <Calendar className="h-6 w-6" />
              <span>Schedule Training</span>
            </Button>
            <Button
              variant="outline"
              className="h-20 flex flex-col items-center justify-center space-y-2 bg-transparent"
            >
              <MessageCircle className="h-6 w-6" />
              <span>Community Chat</span>
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Community Heroes */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Star className="h-5 w-5" />
            <span>Community Heroes</span>
          </CardTitle>
          <CardDescription>Recognizing our top volunteers this month</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {[
              { name: "Sarah Mitchell", responses: 23, rating: 4.9, avatar: "SM" },
              { name: "David Chen", responses: 19, rating: 4.8, avatar: "DC" },
              { name: "Maria Rodriguez", responses: 17, rating: 4.9, avatar: "MR" },
            ].map((hero, index) => (
              <div key={index} className="flex items-center space-x-3 p-4 bg-gray-50 rounded-lg">
                <Avatar>
                  <AvatarFallback>{hero.avatar}</AvatarFallback>
                </Avatar>
                <div className="flex-1">
                  <p className="font-medium text-gray-900">{hero.name}</p>
                  <p className="text-sm text-gray-600">{hero.responses} responses</p>
                  <div className="flex items-center space-x-1">
                    <Star className="h-4 w-4 text-yellow-400 fill-current" />
                    <span className="text-sm text-gray-600">{hero.rating}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
