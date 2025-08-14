"use client"

import { useRealTimeBeacons } from "@/hooks/useRealTimeBeacons"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { MapPin, Battery, Signal } from "lucide-react"

export function LiveBeaconTracker() {
  const { beacons, loading } = useRealTimeBeacons()

  if (loading) {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <MapPin className="w-5 h-5 text-green-500" />
            Live Beacon Tracking
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
          <MapPin className="w-5 h-5 text-green-500" />
          Live Beacon Tracking
          <Badge variant="secondary" className="ml-auto">
            {beacons.length} Active
          </Badge>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {beacons.length === 0 ? (
          <p className="text-gray-500 text-center py-4">No active beacons</p>
        ) : (
          beacons.map((beacon) => (
            <div key={beacon.id} className="border rounded-lg p-4 space-y-2">
              <div className="flex items-center justify-between">
                <h4 className="font-semibold">Beacon {beacon.device_id}</h4>
                <Badge variant={beacon.status === "active" ? "default" : "secondary"}>{beacon.status}</Badge>
              </div>

              <div className="grid grid-cols-2 gap-4 text-sm">
                <div className="flex items-center gap-2">
                  <MapPin className="w-4 h-4 text-blue-500" />
                  <span>
                    {beacon.latitude?.toFixed(4)}, {beacon.longitude?.toFixed(4)}
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <Battery className="w-4 h-4 text-green-500" />
                  <span>{beacon.battery_level}%</span>
                </div>
                <div className="flex items-center gap-2">
                  <Signal className="w-4 h-4 text-blue-500" />
                  <span>{beacon.signal_strength} dBm</span>
                </div>
                <div className="text-gray-500">Last ping: {new Date(beacon.last_ping).toLocaleTimeString()}</div>
              </div>
            </div>
          ))
        )}
      </CardContent>
    </Card>
  )
}
