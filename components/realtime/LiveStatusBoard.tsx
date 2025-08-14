"use client"

import { useState, useEffect } from "react"
import { useRealTimeIncidents } from "@/hooks/useRealTimeIncidents"
import { useRealTimeLocation } from "@/hooks/useRealTimeLocation"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { MapPin, Clock, Users, AlertTriangle } from "lucide-react"

export function LiveStatusBoard() {
  const { incidents, loading: incidentsLoading } = useRealTimeIncidents()
  const { locations, loading: locationsLoading } = useRealTimeLocation()
  const [activeResponders, setActiveResponders] = useState(0)

  useEffect(() => {
    // Count active responders from location data
    const active = locations.filter(
      (loc) => loc.status === "active" && Date.now() - new Date(loc.updated_at).getTime() < 300000, // 5 minutes
    ).length
    setActiveResponders(active)
  }, [locations])

  const criticalIncidents = incidents.filter((i) => i.priority === "critical")
  const activeIncidents = incidents.filter((i) => i.status === "active")

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Active Incidents</CardTitle>
          <AlertTriangle className="h-4 w-4 text-orange-500" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{activeIncidents.length}</div>
          <p className="text-xs text-muted-foreground">{criticalIncidents.length} critical</p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Active Responders</CardTitle>
          <Users className="h-4 w-4 text-blue-500" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{activeResponders}</div>
          <p className="text-xs text-muted-foreground">Currently deployed</p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Response Time</CardTitle>
          <Clock className="h-4 w-4 text-green-500" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">4.2m</div>
          <p className="text-xs text-muted-foreground">Average today</p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Coverage Area</CardTitle>
          <MapPin className="h-4 w-4 text-purple-500" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">98%</div>
          <p className="text-xs text-muted-foreground">Territory covered</p>
        </CardContent>
      </Card>
    </div>
  )
}
