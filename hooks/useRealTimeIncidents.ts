"use client"

import { useEffect, useState } from "react"
import { createClient } from "@/lib/supabase/client"
import type { Database } from "@/lib/database.types"

type Incident = Database["public"]["Tables"]["incidents"]["Row"]

export function useRealTimeIncidents() {
  const [incidents, setIncidents] = useState<Incident[]>([])
  const [loading, setLoading] = useState(true)
  const supabase = createClient()

  useEffect(() => {
    const fetchIncidents = async () => {
      const { data, error } = await supabase.from("incidents").select("*").order("created_at", { ascending: false })

      if (error) {
        console.error("Error fetching incidents:", error)
      } else {
        setIncidents(data || [])
      }
      setLoading(false)
    }

    fetchIncidents()

    const channel = supabase
      .channel("incidents-changes")
      .on(
        "postgres_changes",
        {
          event: "*",
          schema: "public",
          table: "incidents",
        },
        (payload) => {
          if (payload.eventType === "INSERT") {
            setIncidents((prev) => [payload.new as Incident, ...prev])
          } else if (payload.eventType === "UPDATE") {
            setIncidents((prev) =>
              prev.map((incident) => (incident.id === payload.new.id ? (payload.new as Incident) : incident)),
            )
          } else if (payload.eventType === "DELETE") {
            setIncidents((prev) => prev.filter((incident) => incident.id !== payload.old.id))
          }
        },
      )
      .subscribe()

    return () => {
      supabase.removeChannel(channel)
    }
  }, [])

  return { incidents, loading }
}
