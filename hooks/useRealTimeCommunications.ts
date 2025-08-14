"use client"

import { useEffect, useState } from "react"
import { createClient } from "@/lib/supabase/client"
import type { Database } from "@/lib/database.types"

type Communication = Database["public"]["Tables"]["communications"]["Row"]

export function useRealTimeCommunications(incidentId?: string) {
  const [messages, setMessages] = useState<Communication[]>([])
  const [loading, setLoading] = useState(true)
  const supabase = createClient()

  useEffect(() => {
    const fetchMessages = async () => {
      let query = supabase.from("communications").select("*").order("created_at", { ascending: true })

      if (incidentId) {
        query = query.eq("incident_id", incidentId)
      }

      const { data, error } = await query

      if (error) {
        console.error("Error fetching messages:", error)
      } else {
        setMessages(data || [])
      }
      setLoading(false)
    }

    fetchMessages()

    const channel = supabase
      .channel("communications-changes")
      .on(
        "postgres_changes",
        {
          event: "INSERT",
          schema: "public",
          table: "communications",
          ...(incidentId && { filter: `incident_id=eq.${incidentId}` }),
        },
        (payload) => {
          setMessages((prev) => [...prev, payload.new as Communication])
        },
      )
      .subscribe()

    return () => {
      supabase.removeChannel(channel)
    }
  }, [incidentId])

  const sendMessage = async (message: string, messageType = "text") => {
    const {
      data: { user },
    } = await supabase.auth.getUser()
    if (!user) return

    const { error } = await supabase.from("communications").insert({
      sender_id: user.id,
      incident_id: incidentId,
      message,
      message_type: messageType,
      created_at: new Date().toISOString(),
    })

    if (error) {
      console.error("Error sending message:", error)
    }
  }

  return { messages, loading, sendMessage }
}
