"use client"

import { useState, useEffect } from "react"
import { createClient } from "@/lib/supabase/client"

interface EmergencyResource {
  id: string
  type: "ambulance" | "fire_truck" | "police" | "helicopter" | "aed" | "hospital"
  name: string
  location: {
    latitude: number
    longitude: number
  }
  status: "available" | "dispatched" | "busy" | "maintenance"
  eta?: number
  assigned_incident?: string
  last_updated: string
}

export function useRealTimeResourceTracking() {
  const [resources, setResources] = useState<EmergencyResource[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const supabase = createClient()

  useEffect(() => {
    const fetchResources = async () => {
      try {
        const { data, error } = await supabase
          .from("emergency_resources")
          .select("*")
          .order("last_updated", { ascending: false })

        if (error) throw error
        setResources(data || [])
      } catch (err) {
        setError(err instanceof Error ? err.message : "Failed to fetch resources")
      } finally {
        setLoading(false)
      }
    }

    fetchResources()

    // Set up real-time subscription for resource updates
    const subscription = supabase
      .channel("emergency_resources_changes")
      .on("postgres_changes", { event: "*", schema: "public", table: "emergency_resources" }, (payload) => {
        if (payload.eventType === "INSERT") {
          setResources((prev) => [payload.new as EmergencyResource, ...prev])
        } else if (payload.eventType === "UPDATE") {
          setResources((prev) =>
            prev.map((resource) => (resource.id === payload.new.id ? (payload.new as EmergencyResource) : resource)),
          )
        } else if (payload.eventType === "DELETE") {
          setResources((prev) => prev.filter((resource) => resource.id !== payload.old.id))
        }
      })
      .subscribe()

    return () => {
      subscription.unsubscribe()
    }
  }, [])

  const dispatchResource = async (resourceId: string, incidentId: string) => {
    try {
      const { error } = await supabase
        .from("emergency_resources")
        .update({
          status: "dispatched",
          assigned_incident: incidentId,
          last_updated: new Date().toISOString(),
        })
        .eq("id", resourceId)

      if (error) throw error
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to dispatch resource")
    }
  }

  const updateResourceStatus = async (resourceId: string, status: EmergencyResource["status"]) => {
    try {
      const { error } = await supabase
        .from("emergency_resources")
        .update({
          status,
          last_updated: new Date().toISOString(),
        })
        .eq("id", resourceId)

      if (error) throw error
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to update resource status")
    }
  }

  const getAvailableResources = (type?: EmergencyResource["type"]) => {
    return resources.filter((resource) => {
      const isAvailable = resource.status === "available"
      return type ? isAvailable && resource.type === type : isAvailable
    })
  }

  const getResourcesByIncident = (incidentId: string) => {
    return resources.filter((resource) => resource.assigned_incident === incidentId)
  }

  return {
    resources,
    loading,
    error,
    dispatchResource,
    updateResourceStatus,
    getAvailableResources,
    getResourcesByIncident,
  }
}
