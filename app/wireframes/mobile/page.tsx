"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import {
  Phone,
  MapPin,
  Heart,
  Users,
  AlertTriangle,
  Shield,
  Mic,
  Settings,
  User,
  Home,
  Battery,
  Wifi,
  Signal,
} from "lucide-react"
import { BackToHome } from "@/components/navigation/BackToHome"
import { HeroModeFloating } from "@/components/emergency/HeroModeFloating"

export default function MobileWireframePage() {
  const [activeTab, setActiveTab] = useState("home")
  const [batteryLevel, setBatteryLevel] = useState(85)

  return (
    <div className="min-h-screen bg-gray-100">
      <BackToHome />

      <div className="max-w-md mx-auto bg-white shadow-2xl min-h-screen relative">
        {/* Status Bar */}
        <div className="bg-black text-white px-4 py-2 flex justify-between items-center text-xs">
          <div className="flex items-center gap-1">
            <Signal className="h-3 w-3" />
            <span>Starlink</span>
            <Wifi className="h-3 w-3 ml-2" />
          </div>
          <div className="font-mono">9:41 AM</div>
          <div className="flex items-center gap-1">
            <Battery className="h-3 w-3" />
            <span>{batteryLevel}%</span>
          </div>
        </div>

        {/* Header */}
        <div className="bg-gradient-to-r from-red-600 to-orange-600 text-white p-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Shield className="h-6 w-6" />
              <h1 className="text-lg font-bold">SafeRoute AI</h1>
            </div>
            <div className="flex items-center gap-2">
              <Badge variant="secondary" className="bg-green-500 text-white">
                🛰️ Connected
              </Badge>
              <Settings className="h-5 w-5" />
            </div>
          </div>
        </div>

        {/* Main Content Area */}
        <div className="p-4 pb-20">
          {activeTab === "home" && (
            <div className="space-y-6">
              {/* Emergency Status */}
              <Card className="border-green-500 bg-green-50">
                <CardContent className="p-4">
                  <div className="flex items-center gap-3">
                    <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
                    <div>
                      <p className="font-semibold text-green-800">All Systems Operational</p>
                      <p className="text-sm text-green-600">GPS • Satellite • Emergency Beacon</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Quick Actions */}
              <div className="grid grid-cols-2 gap-4">
                <Card className="bg-red-50 border-red-200 hover:bg-red-100 transition-colors cursor-pointer">
                  <CardContent className="p-4 text-center">
                    <Heart className="h-8 w-8 mx-auto mb-2 text-red-600" />
                    <p className="font-semibold text-red-800">CPR Training</p>
                    <p className="text-xs text-red-600">Emergency guidance</p>
                  </CardContent>
                </Card>

                <Card className="bg-blue-50 border-blue-200 hover:bg-blue-100 transition-colors cursor-pointer">
                  <CardContent className="p-4 text-center">
                    <Phone className="h-8 w-8 mx-auto mb-2 text-blue-600" />
                    <p className="font-semibold text-blue-800">Emergency Call</p>
                    <p className="text-xs text-blue-600">Direct 911 line</p>
                  </CardContent>
                </Card>

                <Card className="bg-green-50 border-green-200 hover:bg-green-100 transition-colors cursor-pointer">
                  <CardContent className="p-4 text-center">
                    <MapPin className="h-8 w-8 mx-auto mb-2 text-green-600" />
                    <p className="font-semibold text-green-800">Share Location</p>
                    <p className="text-xs text-green-600">Send GPS coords</p>
                  </CardContent>
                </Card>

                <Card className="bg-purple-50 border-purple-200 hover:bg-purple-100 transition-colors cursor-pointer">
                  <CardContent className="p-4 text-center">
                    <Users className="h-8 w-8 mx-auto mb-2 text-purple-600" />
                    <p className="font-semibold text-purple-800">Find Heroes</p>
                    <p className="text-xs text-purple-600">Nearby helpers</p>
                  </CardContent>
                </Card>
              </div>

              {/* Voice Command Section */}
              <Card className="bg-gradient-to-r from-orange-50 to-red-50 border-orange-200">
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg flex items-center gap-2">
                    <Mic className="h-5 w-5 text-orange-600" />
                    Voice Commands
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="bg-white rounded-lg p-3 border border-orange-200">
                    <p className="font-semibold text-orange-800 mb-1">Emergency Activation:</p>
                    <p className="text-sm text-gray-600">"SafeRoute initiate Hero Mode"</p>
                  </div>
                  <div className="bg-white rounded-lg p-3 border border-orange-200">
                    <p className="font-semibold text-orange-800 mb-1">Quick CPR:</p>
                    <p className="text-sm text-gray-600">"CPR" or "Someone needs help"</p>
                  </div>
                  <div className="bg-white rounded-lg p-3 border border-orange-200">
                    <p className="font-semibold text-orange-800 mb-1">Personal Emergency:</p>
                    <p className="text-sm text-gray-600">"Heart attack" or "I need help"</p>
                  </div>
                </CardContent>
              </Card>

              {/* Location Status */}
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg flex items-center gap-2">
                    <MapPin className="h-5 w-5 text-blue-600" />
                    Current Location
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    <p className="font-semibold">Fort McMurray, Alberta</p>
                    <p className="text-sm text-gray-600">54.7267° N, 113.3000° W</p>
                    <div className="flex items-center gap-2 text-sm">
                      <Badge variant="outline" className="text-green-600 border-green-600">
                        🛰️ Satellite GPS
                      </Badge>
                      <Badge variant="outline" className="text-blue-600 border-blue-600">
                        ±3m accuracy
                      </Badge>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Community Heroes */}
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg flex items-center gap-2">
                    <Users className="h-5 w-5 text-purple-600" />
                    Community Heroes Nearby
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="flex items-center gap-3 p-2 bg-gray-50 rounded-lg">
                      <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center text-white text-sm font-bold">
                        JD
                      </div>
                      <div className="flex-1">
                        <p className="font-semibold text-sm">John Doe</p>
                        <p className="text-xs text-gray-600">Paramedic • 0.8 km away</p>
                      </div>
                      <Badge variant="outline" className="text-green-600 border-green-600">
                        Available
                      </Badge>
                    </div>
                    <div className="flex items-center gap-3 p-2 bg-gray-50 rounded-lg">
                      <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center text-white text-sm font-bold">
                        SM
                      </div>
                      <div className="flex-1">
                        <p className="font-semibold text-sm">Sarah Miller</p>
                        <p className="text-xs text-gray-600">Nurse • 1.2 km away</p>
                      </div>
                      <Badge variant="outline" className="text-green-600 border-green-600">
                        Available
                      </Badge>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          )}

          {activeTab === "emergency" && (
            <div className="space-y-6">
              <Card className="border-red-500 bg-red-50">
                <CardHeader>
                  <CardTitle className="text-red-800 flex items-center gap-2">
                    <AlertTriangle className="h-6 w-6" />
                    Emergency Response
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <Button className="w-full bg-red-600 hover:bg-red-700 text-white font-bold py-4 text-lg">
                    🚨 ACTIVATE HERO MODE
                  </Button>
                  <Button
                    variant="outline"
                    className="w-full border-red-500 text-red-700 hover:bg-red-50 bg-transparent"
                  >
                    📞 Call 911 Directly
                  </Button>
                  <Button
                    variant="outline"
                    className="w-full border-orange-500 text-orange-700 hover:bg-orange-50 bg-transparent"
                  >
                    📍 Send Location Beacon
                  </Button>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Heart className="h-5 w-5 text-red-600" />
                    CPR Quick Access
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <Button className="w-full bg-green-600 hover:bg-green-700 text-white">Start CPR Training</Button>
                  <Button variant="outline" className="w-full bg-transparent">
                    Choking Response
                  </Button>
                  <Button variant="outline" className="w-full bg-transparent">
                    First Aid Guide
                  </Button>
                </CardContent>
              </Card>
            </div>
          )}

          {activeTab === "heroes" && (
            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Users className="h-5 w-5 text-purple-600" />
                    Become a Hero
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p className="text-gray-600">
                    Join our community of trained volunteers ready to help in emergencies.
                  </p>
                  <Button className="w-full bg-purple-600 hover:bg-purple-700 text-white">Register as Hero</Button>
                  <Button variant="outline" className="w-full bg-transparent">
                    View Training Modules
                  </Button>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Active Heroes (3.2 km radius)</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="space-y-3">
                    {[
                      { name: "John Doe", role: "Paramedic", distance: "0.8 km", status: "Available" },
                      { name: "Sarah Miller", role: "Nurse", distance: "1.2 km", status: "Available" },
                      { name: "Mike Chen", role: "First Aid", distance: "2.1 km", status: "On Call" },
                      { name: "Lisa Johnson", role: "EMT", distance: "2.8 km", status: "Available" },
                    ].map((hero, index) => (
                      <div key={index} className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                        <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center text-white font-bold">
                          {hero.name
                            .split(" ")
                            .map((n) => n[0])
                            .join("")}
                        </div>
                        <div className="flex-1">
                          <p className="font-semibold">{hero.name}</p>
                          <p className="text-sm text-gray-600">
                            {hero.role} • {hero.distance} away
                          </p>
                        </div>
                        <Badge
                          variant="outline"
                          className={
                            hero.status === "Available"
                              ? "text-green-600 border-green-600"
                              : "text-yellow-600 border-yellow-600"
                          }
                        >
                          {hero.status}
                        </Badge>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          )}

          {activeTab === "profile" && (
            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <User className="h-5 w-5" />
                    Profile Settings
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center gap-4">
                    <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center text-white text-xl font-bold">
                      JD
                    </div>
                    <div>
                      <p className="font-semibold text-lg">John Doe</p>
                      <p className="text-gray-600">Community Member</p>
                    </div>
                  </div>
                  <Button variant="outline" className="w-full bg-transparent">
                    Edit Profile
                  </Button>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Emergency Contacts</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="flex items-center justify-between p-2 bg-gray-50 rounded-lg">
                    <span>Primary Contact</span>
                    <span className="text-sm text-gray-600">+1 (555) 123-4567</span>
                  </div>
                  <div className="flex items-center justify-between p-2 bg-gray-50 rounded-lg">
                    <span>Secondary Contact</span>
                    <span className="text-sm text-gray-600">+1 (555) 987-6543</span>
                  </div>
                  <Button variant="outline" className="w-full bg-transparent">
                    Manage Contacts
                  </Button>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Medical Information</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
                    <p className="font-semibold text-yellow-800">Allergies</p>
                    <p className="text-sm text-yellow-700">Penicillin, Shellfish</p>
                  </div>
                  <div className="p-3 bg-blue-50 border border-blue-200 rounded-lg">
                    <p className="font-semibold text-blue-800">Blood Type</p>
                    <p className="text-sm text-blue-700">O+</p>
                  </div>
                  <Button variant="outline" className="w-full bg-transparent">
                    Update Medical Info
                  </Button>
                </CardContent>
              </Card>
            </div>
          )}
        </div>

        {/* Bottom Navigation */}
        <div className="absolute bottom-0 left-0 right-0 bg-white border-t border-gray-200">
          <div className="grid grid-cols-4 gap-1">
            <button
              onClick={() => setActiveTab("home")}
              className={`p-3 text-center ${
                activeTab === "home" ? "text-red-600 bg-red-50" : "text-gray-600"
              } transition-colors`}
            >
              <Home className="h-5 w-5 mx-auto mb-1" />
              <span className="text-xs">Home</span>
            </button>
            <button
              onClick={() => setActiveTab("emergency")}
              className={`p-3 text-center ${
                activeTab === "emergency" ? "text-red-600 bg-red-50" : "text-gray-600"
              } transition-colors`}
            >
              <AlertTriangle className="h-5 w-5 mx-auto mb-1" />
              <span className="text-xs">Emergency</span>
            </button>
            <button
              onClick={() => setActiveTab("heroes")}
              className={`p-3 text-center ${
                activeTab === "heroes" ? "text-red-600 bg-red-50" : "text-gray-600"
              } transition-colors`}
            >
              <Users className="h-5 w-5 mx-auto mb-1" />
              <span className="text-xs">Heroes</span>
            </button>
            <button
              onClick={() => setActiveTab("profile")}
              className={`p-3 text-center ${
                activeTab === "profile" ? "text-red-600 bg-red-50" : "text-gray-600"
              } transition-colors`}
            >
              <User className="h-5 w-5 mx-auto mb-1" />
              <span className="text-xs">Profile</span>
            </button>
          </div>
        </div>

        {/* Floating Hero Mode Button */}
        <HeroModeFloating />
      </div>
    </div>
  )
}
