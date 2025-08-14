"use client"

import type React from "react"

import { useState } from "react"
import { useRealTimeCommunications } from "@/hooks/useRealTimeCommunications"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Send, MessageSquare } from "lucide-react"

interface LiveCommunicationsProps {
  incidentId?: string
  title?: string
}

export function LiveCommunications({ incidentId, title = "Live Communications" }: LiveCommunicationsProps) {
  const { messages, loading, sendMessage } = useRealTimeCommunications(incidentId)
  const [newMessage, setNewMessage] = useState("")
  const [sending, setSending] = useState(false)

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!newMessage.trim() || sending) return

    setSending(true)
    await sendMessage(newMessage.trim())
    setNewMessage("")
    setSending(false)
  }

  return (
    <Card className="h-96 flex flex-col">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <MessageSquare className="w-5 h-5 text-blue-500" />
          {title}
        </CardTitle>
      </CardHeader>
      <CardContent className="flex-1 flex flex-col">
        <div className="flex-1 overflow-y-auto space-y-2 mb-4 border rounded p-2">
          {loading ? (
            <div className="animate-pulse space-y-2">
              {[...Array(3)].map((_, i) => (
                <div key={i} className="h-8 bg-gray-200 rounded"></div>
              ))}
            </div>
          ) : messages.length === 0 ? (
            <p className="text-gray-500 text-center py-4">No messages yet</p>
          ) : (
            messages.map((message) => (
              <div key={message.id} className="text-sm">
                <div className="flex items-center gap-2 mb-1">
                  <span className="font-semibold text-blue-600">User {message.sender_id.slice(0, 8)}</span>
                  <span className="text-xs text-gray-500">{new Date(message.created_at).toLocaleTimeString()}</span>
                </div>
                <p className="text-gray-800">{message.message}</p>
              </div>
            ))
          )}
        </div>

        <form onSubmit={handleSendMessage} className="flex gap-2">
          <Input
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            placeholder="Type your message..."
            disabled={sending}
          />
          <Button type="submit" disabled={!newMessage.trim() || sending}>
            <Send className="w-4 h-4" />
          </Button>
        </form>
      </CardContent>
    </Card>
  )
}
