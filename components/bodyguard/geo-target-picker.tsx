"use client"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Radius } from 'lucide-react'
import { useGeolocation } from "@/hooks/use-geolocation"
import { useEffect, useState } from "react"

export interface GeoTarget {
  lat: number
  lng: number
  radiusMeters: number
}

interface Props {
  value?: GeoTarget | null
  onChange?: (v: GeoTarget | null) => void
}

export default function GeoTargetPicker({ value, onChange }: Props) {
  const { coords, loading, error, refresh } = useGeolocation()
  const [lat, setLat] = useState<number>(value?.lat ?? 49.2827)
  const [lng, setLng] = useState<number>(value?.lng ?? -123.1207)
  const [radius, setRadius] = useState<number>(value?.radiusMeters ?? 1000)

  useEffect(() => {
    if (value) {
      setLat(value.lat)
      setLng(value.lng)
      setRadius(value.radiusMeters)
    }
  }, [value])

  useEffect(() => {
    onChange?.({ lat, lng, radiusMeters: radius })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [lat, lng, radius])

  return (
    <div className="grid gap-2">
      <div className="grid grid-cols-3 gap-2">
        <div>
          <label className="text-xs font-medium">Latitude</label>
          <Input
            type="number"
            step="0.0001"
            value={lat}
            onChange={(e) => setLat(Number(e.target.value))}
          />
        </div>
        <div>
          <label className="text-xs font-medium">Longitude</label>
          <Input
            type="number"
            step="0.0001"
            value={lng}
            onChange={(e) => setLng(Number(e.target.value))}
          />
        </div>
        <div>
          <label className="text-xs font-medium">Radius (m)</label>
          <Input type="number" value={radius} onChange={(e) => setRadius(Number(e.target.value))} />
        </div>
      </div>
      <div className="flex items-center gap-2">
        <Button
          type="button"
          variant="outline"
          onClick={() => {
            if (coords) {
              setLat(coords.lat)
              setLng(coords.lng)
            } else {
              refresh()
            }
          }}
        >
          <Radius className="h-4 w-4 mr-2" />
          {coords ? "Use Current Location" : loading ? "Locating..." : "Get Location"}
        </Button>
        {error ? <span className="text-xs text-red-600">{error}</span> : null}
      </div>
    </div>
  )
}
