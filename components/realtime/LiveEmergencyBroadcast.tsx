"use client"

import { useState, useEffect } from "react"
import { createClient } from "@/lib/supabase/client"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { Radio, Send, AlertTriangle, Info, CheckCircle } from "lucide-react"

interface Broadcast {
  id: string
  message: string
  priority: "low" | "medium" | "high" | "critical"
  created_at: string
  created_by: string
  active: boolean
}

export function LiveEmergencyBroadcast() {
  const [broadcasts, setBroadcasts] = useState<Broadcast[]>([])
  const [newMessage, setNewMessage] = useState("")
  const [priority, setPriority] = useState<"low" | "medium" | "high" | "critical">("medium")
  const [loading, setLoading] = useState(false)

  const supabase = createClient()

  useEffect(() => {
    const fetchBroadcasts = async () => {
      const { data } = await supabase
        .from("emergency_broadcasts")
        .select("*")
        .eq("active", true)
        .order("created_at", { ascending: false })
        .limit(10)

      if (data) setBroadcasts(data)
    }

    fetchBroadcasts()

    const channel = supabase
      .channel("emergency-broadcasts")
      .on("postgres_changes", { event: "INSERT", schema: "public", table: "emergency_broadcasts" }, (payload) => {
        setBroadcasts((prev) => [payload.new as Broadcast, ...prev.slice(0, 9)])
      })
      .subscribe()

    return () => {
      supabase.removeChannel(channel)
    }
  }, [])

  const sendBroadcast = async () => {
    if (!newMessage.trim()) return

    setLoading(true)
    try {
      const {
        data: { user },
      } = await supabase.auth.getUser()

      await supabase.from("emergency_broadcasts").insert({
        message: newMessage,
        priority,
        created_by: user?.id || "system",
        active: true,
      })

      setNewMessage("")
      setPriority("medium")
    } catch (error) {
      console.error("Error sending broadcast:", error)
    } finally {
      setLoading(false)
    }
  }

  const getPriorityIcon = (priority: string) => {
    switch (priority) {
      case "critical":
        return <AlertTriangle className="h-4 w-4 text-red-500" />
      case "high":
        return <AlertTriangle className="h-4 w-4 text-orange-500" />
      case "medium":
        return <Info className="h-4 w-4 text-blue-500" />
      case "low":
        return <CheckCircle className="h-4 w-4 text-green-500" />
      default:
        return <Info className="h-4 w-4" />
    }
  }

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "critical":
        return "bg-red-500"
      case "high":
        return "bg-orange-500"
      case "medium":
        return "bg-blue-500"
      case "low":
        return "bg-green-500"
      default:
        return "bg-gray-500"
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Radio className="h-5 w-5 text-red-500" />
          Emergency Broadcast System
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Broadcast Form */}
        <div className="space-y-3">
          <Textarea
            placeholder="Enter emergency broadcast message..."
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            className="min-h-[100px]"
          />

          <div className="flex items-center justify-between">
            <div className="flex gap-2">
              {(["low", "medium", "high", "critical"] as const).map((p) => (
                <Button
                  key={p}
                  variant={priority === p ? "default" : "outline"}
                  size="sm"
                  onClick={() => setPriority(p)}
                  className={priority === p ? getPriorityColor(p) : ""}
                >
                  {p.charAt(0).toUpperCase() + p.slice(1)}
                </Button>
              ))}
            </div>

            <Button
              onClick={sendBroadcast}
              disabled={loading || !newMessage.trim()}
              className="bg-red-600 hover:bg-red-700"
            >
              <Send className="h-4 w-4 mr-2" />
              Broadcast
            </Button>
          </div>
        </div>

        {/* Active Broadcasts */}
        <div className="space-y-2">
          <h4 className="font-semibold text-sm">Active Broadcasts</h4>
          {broadcasts.length === 0 ? (
            <p className="text-sm text-muted-foreground">No active broadcasts</p>
          ) : (
            broadcasts.map((broadcast) => (
              <div key={broadcast.id} className="p-3 border rounded-lg space-y-2">
                <div className="flex items-center justify-between">
                  <Badge variant="outline" className="flex items-center gap-1">
                    {getPriorityIcon(broadcast.priority)}
                    {broadcast.priority.toUpperCase()}
                  </Badge>
                  <span className="text-xs text-muted-foreground">
                    {new Date(broadcast.created_at).toLocaleTimeString()}
                  </span>
                </div>
                <p className="text-sm">{broadcast.message}</p>
              </div>
            ))
          )}
        </div>
      </CardContent>
    </Card>
  )
}
