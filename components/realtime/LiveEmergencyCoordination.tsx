"use client"

import { useState } from "react"
import { useRealTimeIncidents } from "@/hooks/useRealTimeIncidents"
import { useRealTimeLocation } from "@/hooks/useRealTimeLocation"
import { useRealTimeChat } from "@/hooks/useRealTimeChat"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { MapPin, Users, MessageSquare, AlertTriangle, Clock, Radio } from "lucide-react"

interface EmergencyCoordinationProps {
  incidentId: string
  userRole: "civilian" | "responder" | "elder" | "government"
}

export function LiveEmergencyCoordination({ incidentId, userRole }: EmergencyCoordinationProps) {
  const { incidents, loading: incidentsLoading } = useRealTimeIncidents()
  const { locations, shareLocation, stopSharing } = useRealTimeLocation()
  const { messages, sendMessage, isConnected } = useRealTimeChat(`incident-${incidentId}`)
  const [isLocationSharing, setIsLocationSharing] = useState(false)
  const [coordinationStatus, setCoordinationStatus] = useState<"standby" | "active" | "resolved">("standby")

  const currentIncident = incidents.find((i) => i.id === incidentId)

  const handleLocationToggle = async () => {
    if (isLocationSharing) {
      stopSharing()
      setIsLocationSharing(false)
    } else {
      await shareLocation()
      setIsLocationSharing(true)
    }
  }

  const handleStatusUpdate = (status: "standby" | "active" | "resolved") => {
    setCoordinationStatus(status)
    sendMessage({
      type: "status_update",
      content: `Coordination status updated to: ${status}`,
      priority: "high",
    })
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "active":
        return "bg-red-500"
      case "resolved":
        return "bg-green-500"
      default:
        return "bg-yellow-500"
    }
  }

  if (incidentsLoading) {
    return (
      <div className="flex items-center justify-center p-8">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-green-500"></div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <Card className="border-red-200 bg-red-50/50">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Radio className="w-5 h-5 text-red-600" />
            Live Emergency Coordination
            <Badge className={`${getStatusColor(coordinationStatus)} text-white`}>
              {coordinationStatus.toUpperCase()}
            </Badge>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="flex items-center gap-2">
              <AlertTriangle className="w-4 h-4 text-red-500" />
              <span className="text-sm">Incident: {currentIncident?.type || "Unknown"}</span>
            </div>
            <div className="flex items-center gap-2">
              <Clock className="w-4 h-4 text-blue-500" />
              <span className="text-sm">
                Duration:{" "}
                {currentIncident?.created_at
                  ? Math.floor((Date.now() - new Date(currentIncident.created_at).getTime()) / 60000)
                  : 0}{" "}
                min
              </span>
            </div>
            <div className="flex items-center gap-2">
              <Users className="w-4 h-4 text-green-500" />
              <span className="text-sm">Active: {locations.length} responders</span>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <MapPin className="w-5 h-5 text-blue-600" />
            Live Location Coordination
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-sm">Share your location with coordination team</span>
              <Button onClick={handleLocationToggle} variant={isLocationSharing ? "destructive" : "default"} size="sm">
                {isLocationSharing ? "Stop Sharing" : "Share Location"}
              </Button>
            </div>

            {locations.length > 0 && (
              <div className="space-y-2">
                <h4 className="text-sm font-medium">Active Responders:</h4>
                {locations.map((location, index) => (
                  <div key={index} className="flex items-center justify-between p-2 bg-gray-50 rounded">
                    <span className="text-sm">
                      {location.user_role} - {location.user_id}
                    </span>
                    <Badge variant="outline">{Math.round(location.accuracy || 0)}m accuracy</Badge>
                  </div>
                ))}
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <MessageSquare className="w-5 h-5 text-green-600" />
            Live Coordination Chat
            <Badge variant={isConnected ? "default" : "destructive"}>
              {isConnected ? "Connected" : "Disconnected"}
            </Badge>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="h-48 overflow-y-auto border rounded p-3 bg-gray-50">
              {messages.length === 0 ? (
                <p className="text-sm text-gray-500 text-center py-8">
                  No coordination messages yet. Start the conversation.
                </p>
              ) : (
                messages.map((message, index) => (
                  <div key={index} className="mb-2 p-2 bg-white rounded shadow-sm">
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-xs font-medium text-gray-600">
                        {message.user_role} - {message.user_id}
                      </span>
                      <span className="text-xs text-gray-400">{new Date(message.created_at).toLocaleTimeString()}</span>
                    </div>
                    <p className="text-sm">{message.content}</p>
                    {message.priority === "high" && (
                      <Badge className="mt-1" variant="destructive" size="sm">
                        HIGH PRIORITY
                      </Badge>
                    )}
                  </div>
                ))
              )}
            </div>

            {userRole === "responder" || userRole === "government" ? (
              <div className="flex gap-2">
                <Button onClick={() => handleStatusUpdate("active")} variant="destructive" size="sm">
                  Activate Response
                </Button>
                <Button onClick={() => handleStatusUpdate("resolved")} variant="default" size="sm">
                  Mark Resolved
                </Button>
              </div>
            ) : null}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
