"use client"

import { useEffect, useState, useCallback } from "react"

export interface GeoState {
  coords: { lat: number; lng: number } | null
  accuracy?: number
  error?: string | null
  loading: boolean
}

export function useGeolocation(options?: PositionOptions) {
  const [state, setState] = useState<GeoState>({ coords: null, loading: true, error: null })

  const get = useCallback(() => {
    if (typeof window === "undefined" || !("geolocation" in navigator)) {
      setState({ coords: null, loading: false, error: "Geolocation not available" })
      return
    }

    setState((s) => ({ ...s, loading: true, error: null }))
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        setState({
          coords: { lat: pos.coords.latitude, lng: pos.coords.longitude },
          accuracy: pos.coords.accuracy,
          loading: false,
          error: null,
        })
      },
      (err) => {
        setState({ coords: null, loading: false, error: err.message || "Permission denied" })
      },
      options ?? { enableHighAccuracy: true, timeout: 10000, maximumAge: 10000 }
    )
  }, [options])

  useEffect(() => {
    get()
  }, [get])

  return { ...state, refresh: get }
}
