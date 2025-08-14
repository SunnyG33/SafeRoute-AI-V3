"use client"

import { useEffect, useState } from "react"
import { createClient } from "@/lib/supabase/client"
import type { Database } from "@/lib/database.types"

type LABBeacon = Database["public"]["Tables"]["lab_beacons"]["Row"]

export function useRealTimeBeacons() {
  const [beacons, setBeacons] = useState<LABBeacon[]>([])
  const [loading, setLoading] = useState(true)
  const supabase = createClient()

  useEffect(() => {
    const fetchBeacons = async () => {
      const { data, error } = await supabase
        .from("lab_beacons")
        .select("*")
        .eq("status", "active")
        .order("last_ping", { ascending: false })

      if (error) {
        console.error("Error fetching beacons:", error)
      } else {
        setBeacons(data || [])
      }
      setLoading(false)
    }

    fetchBeacons()

    const channel = supabase
      .channel("beacons-changes")
      .on(
        "postgres_changes",
        {
          event: "*",
          schema: "public",
          table: "lab_beacons",
        },
        (payload) => {
          if (payload.eventType === "INSERT") {
            setBeacons((prev) => [payload.new as LABBeacon, ...prev])
          } else if (payload.eventType === "UPDATE") {
            setBeacons((prev) =>
              prev.map((beacon) => (beacon.id === payload.new.id ? (payload.new as LABBeacon) : beacon)),
            )
          } else if (payload.eventType === "DELETE") {
            setBeacons((prev) => prev.filter((beacon) => beacon.id !== payload.old.id))
          }
        },
      )
      .subscribe()

    return () => {
      supabase.removeChannel(channel)
    }
  }, [])

  return { beacons, loading }
}
