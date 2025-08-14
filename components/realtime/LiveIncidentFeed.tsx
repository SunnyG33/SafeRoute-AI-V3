"use client"

import { useRealTimeIncidents } from "@/hooks/useRealTimeIncidents"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { AlertTriangle, Clock, MapPin } from "lucide-react"

export function LiveIncidentFeed() {
  const { incidents, loading } = useRealTimeIncidents()

  if (loading) {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <AlertTriangle className="w-5 h-5 text-red-500" />
            Live Incident Feed
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="animate-pulse space-y-4">
            {[...Array(3)].map((_, i) => (
              <div key={i} className="h-16 bg-gray-200 rounded"></div>
            ))}
          </div>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <AlertTriangle className="w-5 h-5 text-red-500" />
          Live Incident Feed
          <Badge variant="secondary" className="ml-auto">
            {incidents.length} Active
          </Badge>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {incidents.length === 0 ? (
          <p className="text-gray-500 text-center py-4">No active incidents</p>
        ) : (
          incidents.slice(0, 10).map((incident) => (
            <div key={incident.id} className="border rounded-lg p-4 space-y-2">
              <div className="flex items-center justify-between">
                <h4 className="font-semibold">{incident.title}</h4>
                <Badge
                  variant={
                    incident.status === "critical"
                      ? "destructive"
                      : incident.status === "active"
                        ? "default"
                        : "secondary"
                  }
                >
                  {incident.status}
                </Badge>
              </div>
              <p className="text-sm text-gray-600">{incident.description}</p>
              <div className="flex items-center gap-4 text-xs text-gray-500">
                <div className="flex items-center gap-1">
                  <MapPin className="w-3 h-3" />
                  {incident.location}
                </div>
                <div className="flex items-center gap-1">
                  <Clock className="w-3 h-3" />
                  {new Date(incident.created_at).toLocaleTimeString()}
                </div>
              </div>
            </div>
          ))
        )}
      </CardContent>
    </Card>
  )
}
