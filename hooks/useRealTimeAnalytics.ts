"use client"

import { useState, useEffect } from "react"
import { createClient } from "@/lib/supabase/client"

interface AnalyticsData {
  responseTime: number
  incidentCount: number
  activeResponders: number
  coveragePercentage: number
  loading: boolean
}

export function useRealTimeAnalytics() {
  const [analytics, setAnalytics] = useState<AnalyticsData>({
    responseTime: 0,
    incidentCount: 0,
    activeResponders: 0,
    coveragePercentage: 0,
    loading: true,
  })

  const supabase = createClient()

  useEffect(() => {
    const fetchAnalytics = async () => {
      try {
        // Get incident statistics
        const { data: incidents } = await supabase.from("incidents").select("*").eq("status", "active")

        // Get responder locations
        const { data: locations } = await supabase
          .from("responder_locations")
          .select("*")
          .gte("updated_at", new Date(Date.now() - 300000).toISOString()) // Last 5 minutes

        // Calculate metrics
        const activeCount = incidents?.length || 0
        const activeResponders = locations?.length || 0

        // Mock response time calculation (would be real in production)
        const avgResponseTime =
          incidents?.reduce((acc, inc) => {
            const responseTime = inc.response_time || 300 // 5 minutes default
            return acc + responseTime
          }, 0) / Math.max(activeCount, 1)

        setAnalytics({
          responseTime: Math.round(avgResponseTime / 60), // Convert to minutes
          incidentCount: activeCount,
          activeResponders,
          coveragePercentage: Math.min(95 + Math.random() * 5, 100), // Mock coverage
          loading: false,
        })
      } catch (error) {
        console.error("Error fetching analytics:", error)
        setAnalytics((prev) => ({ ...prev, loading: false }))
      }
    }

    fetchAnalytics()

    const channel = supabase
      .channel("analytics-updates")
      .on("postgres_changes", { event: "*", schema: "public", table: "incidents" }, () => fetchAnalytics())
      .on("postgres_changes", { event: "*", schema: "public", table: "responder_locations" }, () => fetchAnalytics())
      .subscribe()

    // Refresh analytics every 30 seconds
    const interval = setInterval(fetchAnalytics, 30000)

    return () => {
      supabase.removeChannel(channel)
      clearInterval(interval)
    }
  }, [])

  return analytics
}
