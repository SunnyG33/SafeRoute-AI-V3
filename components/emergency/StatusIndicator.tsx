"use client"

import { Badge } from "@/components/ui/badge"
import { Satellite, Wifi, Shield, MapPin, Activity } from "lucide-react"

interface StatusIndicatorProps {
  type: "satellite" | "network" | "emergency" | "gps" | "heroes"
  status: "connected" | "disconnected" | "weak" | "strong" | "ready" | "active" | "offline"
}

export function StatusIndicator({ type, status }: StatusIndicatorProps) {
  const getStatusConfig = () => {
    const baseConfig = {
      satellite: {
        connected: {
          icon: <Satellite className="h-4 w-4" />,
          text: "Starlink Connected",
          color: "bg-green-100 text-green-800 border-green-600",
          shape: "●", // Circle for connected
          pattern: "border-4",
        },
        disconnected: {
          icon: <Satellite className="h-4 w-4" />,
          text: "Satellite Offline",
          color: "bg-red-100 text-red-800 border-red-600",
          shape: "■", // Square for disconnected
          pattern: "border-4 border-dashed",
        },
        weak: {
          icon: <Satellite className="h-4 w-4" />,
          text: "Weak Signal",
          color: "bg-yellow-100 text-yellow-800 border-yellow-600",
          shape: "▲", // Triangle for warning
          pattern: "border-4 border-dotted",
        },
      },
      network: {
        strong: {
          icon: <Wifi className="h-4 w-4" />,
          text: "Strong Signal",
          color: "bg-green-100 text-green-800 border-green-600",
          shape: "●",
          pattern: "border-4",
        },
        weak: {
          icon: <Wifi className="h-4 w-4" />,
          text: "Weak Signal",
          color: "bg-yellow-100 text-yellow-800 border-yellow-600",
          shape: "▲",
          pattern: "border-4 border-dotted",
        },
        offline: {
          icon: <Wifi className="h-4 w-4" />,
          text: "No Network",
          color: "bg-red-100 text-red-800 border-red-600",
          shape: "■",
          pattern: "border-4 border-dashed",
        },
      },
      emergency: {
        ready: {
          icon: <Shield className="h-4 w-4" />,
          text: "Emergency Ready",
          color: "bg-blue-100 text-blue-800 border-blue-600",
          shape: "◆", // Diamond for standby
          pattern: "border-4",
        },
        active: {
          icon: <Shield className="h-4 w-4" />,
          text: "Emergency Active",
          color: "bg-red-100 text-red-800 border-red-600",
          shape: "●",
          pattern: "border-4 animate-pulse",
        },
      },
      gps: {
        connected: {
          icon: <MapPin className="h-4 w-4" />,
          text: "GPS Active",
          color: "bg-green-100 text-green-800 border-green-600",
          shape: "●",
          pattern: "border-4",
        },
        weak: {
          icon: <MapPin className="h-4 w-4" />,
          text: "GPS Weak",
          color: "bg-yellow-100 text-yellow-800 border-yellow-600",
          shape: "▲",
          pattern: "border-4 border-dotted",
        },
      },
      heroes: {
        active: {
          icon: <Activity className="h-4 w-4" />,
          text: "Heroes Online",
          color: "bg-purple-100 text-purple-800 border-purple-600",
          shape: "●",
          pattern: "border-4",
        },
        offline: {
          icon: <Activity className="h-4 w-4" />,
          text: "Heroes Offline",
          color: "bg-gray-100 text-gray-800 border-gray-600",
          shape: "■",
          pattern: "border-4 border-dashed",
        },
      },
    }

    const config = baseConfig[type]?.[status]
    if (!config) {
      return {
        icon: <Shield className="h-4 w-4" />,
        text: "Unknown Status",
        color: "bg-gray-100 text-gray-800 border-gray-600",
        shape: "✖",
        pattern: "border-4",
      }
    }

    return config
  }

  const config = getStatusConfig()

  return (
    <Badge
      variant="outline"
      className={`${config.color} ${config.pattern} flex items-center gap-2 px-3 py-1 font-bold`}
    >
      <span className="text-lg" aria-hidden="true">
        {config.shape}
      </span>
      {config.icon}
      <span className="text-sm font-bold">{config.text}</span>
    </Badge>
  )
}
