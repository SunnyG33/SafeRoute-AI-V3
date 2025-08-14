"use client"

import { useState } from "react"
import Link from "next/link"
import { Users, Shield, Building2, Heart, Home, ArrowRight, Activity, Globe, Zap } from "lucide-react"
import UniversalNavigation from "@/components/navigation/UniversalNavigation"

const portals = [
  {
    id: "landing",
    name: "SafeRoute AI Home",
    path: "/landing",
    icon: Home,
    description: "Platform overview and mission statement",
    features: ["Company Overview", "Technology Stack", "Demo Access"],
    status: "active",
    color: "from-blue-500 to-cyan-400",
    bgPattern: "bg-gradient-to-br from-blue-900/20 to-cyan-900/20",
  },
  {
    id: "civilian",
    name: "Civilian Portal",
    path: "/civilian-portal-hero",
    icon: Heart,
    description: "HERO Mode emergency response for civilians",
    features: ["AI-Guided First Aid", "AED Finder", "Emergency Routing", "Family Safety"],
    status: "active",
    color: "from-red-500 to-pink-400",
    bgPattern: "bg-gradient-to-br from-red-900/20 to-pink-900/20",
  },
  {
    id: "responder",
    name: "Responder Portal",
    path: "/responder-portal-hero",
    icon: Shield,
    description: "HERO OS professional coordination system",
    features: ["Incident Management", "Resource Allocation", "Multi-Agency Coordination", "Real-time Analytics"],
    status: "active",
    color: "from-blue-600 to-purple-500",
    bgPattern: "bg-gradient-to-br from-blue-900/20 to-purple-900/20",
  },
  {
    id: "community",
    name: "Community Portal",
    path: "/community-portal",
    icon: Users,
    description: "Community coordination and resource management",
    features: ["Resource Sharing", "Event Coordination", "Community Alerts", "Volunteer Management"],
    status: "active",
    color: "from-green-500 to-teal-400",
    bgPattern: "bg-gradient-to-br from-green-900/20 to-teal-900/20",
  },
  {
    id: "elder",
    name: "Elder Portal",
    path: "/elder-portal",
    icon: Users,
    description: "Indigenous governance and traditional protocols",
    features: ["Cultural Protocols", "Traditional Knowledge", "Community Governance", "OCAP® Compliance"],
    status: "active",
    color: "from-amber-500 to-orange-400",
    bgPattern: "bg-gradient-to-br from-amber-900/20 to-orange-900/20",
  },
  {
    id: "government",
    name: "Government Dashboard",
    path: "/government-dashboard",
    icon: Building2,
    description: "Multi-agency coordination and oversight",
    features: ["Policy Management", "Multi-Agency Coordination", "Analytics Dashboard", "Compliance Monitoring"],
    status: "active",
    color: "from-indigo-500 to-blue-500",
    bgPattern: "bg-gradient-to-br from-indigo-900/20 to-blue-900/20",
  },
]

export default function PortalHub() {
  const [hoveredPortal, setHoveredPortal] = useState<string | null>(null)

  return (
    <div
      className="min-h-screen bg-gradient-to-br from-gray-900 via-slate-900 to-black"
      style={{ backgroundColor: "#0a0a0a" }}
    >
      <UniversalNavigation
        showBackButton={true}
        customBackPath="/landing"
        customBackLabel="Home"
        showNextPrevious={true}
      />
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-cyan-500/5 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-teal-500/5 to-transparent" />
      </div>

      <div className="relative z-10 container mx-auto px-6 py-12">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-3 mb-6">
            <div className="p-3 rounded-2xl bg-gradient-to-r from-cyan-500 to-teal-400">
              <Globe className="w-8 h-8 text-white" />
            </div>
            <h1 className="text-5xl font-bold bg-gradient-to-r from-white via-cyan-200 to-teal-300 bg-clip-text text-transparent">
              SafeRoute AI
            </h1>
          </div>
          <p className="text-xl text-white/80 mb-4">Emergency Response Infrastructure</p>
          <p className="text-lg text-cyan-300 font-medium">Portal Command Center</p>
          <div className="flex items-center justify-center gap-6 mt-8">
            <div className="flex items-center gap-2">
              <Activity className="w-5 h-5 text-green-400" />
              <span className="text-green-400 font-medium">All Systems Operational</span>
            </div>
            <div className="flex items-center gap-2">
              <Zap className="w-5 h-5 text-yellow-400" />
              <span className="text-white/70">6 Portals Active</span>
            </div>
          </div>
        </div>

        {/* Portal Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
          {portals.map((portal) => {
            const Icon = portal.icon
            const isHovered = hoveredPortal === portal.id

            return (
              <Link
                key={portal.id}
                href={portal.path}
                className="group block"
                onMouseEnter={() => setHoveredPortal(portal.id)}
                onMouseLeave={() => setHoveredPortal(null)}
              >
                <div
                  className={`
                  relative h-80 rounded-3xl border border-white/10 backdrop-blur-md overflow-hidden
                  transition-all duration-500 transform
                  ${isHovered ? "scale-105 shadow-2xl shadow-cyan-500/25" : "hover:scale-102"}
                  ${portal.bgPattern}
                `}
                >
                  {/* Status Indicator */}
                  <div className="absolute top-4 right-4 z-10">
                    <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-green-500/20 border border-green-400/30">
                      <div className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
                      <span className="text-green-400 text-xs font-medium">ACTIVE</span>
                    </div>
                  </div>

                  {/* Content */}
                  <div className="relative z-10 p-8 h-full flex flex-col">
                    {/* Icon */}
                    <div
                      className={`
                      inline-flex p-4 rounded-2xl bg-gradient-to-r ${portal.color} mb-6
                      transition-all duration-300
                      ${isHovered ? "shadow-lg shadow-cyan-500/25 scale-110" : ""}
                    `}
                    >
                      <Icon className="w-8 h-8 text-white" />
                    </div>

                    {/* Title & Description */}
                    <h3 className="text-2xl font-bold text-white mb-3 group-hover:text-cyan-300 transition-colors">
                      {portal.name}
                    </h3>
                    <p className="text-white/70 mb-6 flex-1">{portal.description}</p>

                    {/* Features */}
                    <div className="space-y-2 mb-6">
                      {portal.features.map((feature, index) => (
                        <div key={index} className="flex items-center gap-2">
                          <div className="w-1.5 h-1.5 rounded-full bg-cyan-400" />
                          <span className="text-white/60 text-sm">{feature}</span>
                        </div>
                      ))}
                    </div>

                    {/* Action */}
                    <div className="flex items-center justify-between">
                      <span className="text-cyan-400 font-medium">Access Portal</span>
                      <ArrowRight
                        className={`
                        w-5 h-5 text-cyan-400 transition-transform duration-300
                        ${isHovered ? "translate-x-2" : ""}
                      `}
                      />
                    </div>
                  </div>

                  {/* Hover Overlay */}
                  <div
                    className={`
                    absolute inset-0 bg-gradient-to-r from-cyan-500/10 to-teal-500/10 
                    transition-opacity duration-300
                    ${isHovered ? "opacity-100" : "opacity-0"}
                  `}
                  />
                </div>
              </Link>
            )
          })}
        </div>

        {/* Footer Info */}
        <div className="text-center mt-16">
          <div className="inline-flex items-center gap-4 px-6 py-3 rounded-2xl bg-black/20 backdrop-blur-md border border-white/10">
            <div className="text-white/60 text-sm">
              SafeRoute AI • Emergency Response Infrastructure • 12 Patents • Indigenous-Led Innovation
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
