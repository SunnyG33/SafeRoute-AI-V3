"use client"

import { useEffect, useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { FileText, Download, Printer, Clock, User, MapPin, Activity } from 'lucide-react'

interface IncidentEvent {
  id: string
  type: string
  from: string
  payload: any
  at: number
}

export default function IncidentReportPage({ params }: { params: { id: string } }) {
  const { id } = params
  const [events, setEvents] = useState<IncidentEvent[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function loadEvents() {
      try {
        const res = await fetch(`/api/incidents/${id}/events?since=0`)
        const data = await res.json()
        setEvents(data.events || [])
      } catch (error) {
        console.error("Failed to load events:", error)
      } finally {
        setLoading(false)
      }
    }
    loadEvents()
  }, [id])

  const handlePrint = () => {
    window.print()
  }

  const handleExportMarkdown = async () => {
    try {
      const res = await fetch(`/api/incidents/${id}/report.md`)
      const blob = await res.blob()
      const url = URL.createObjectURL(blob)
      const a = document.createElement("a")
      a.href = url
      a.download = `incident-${id.slice(0, 8)}-report.md`
      document.body.appendChild(a)
      a.click()
      document.body.removeChild(a)
      URL.revokeObjectURL(url)
    } catch (error) {
      console.error("Failed to export markdown:", error)
    }
  }

  const formatTimestamp = (timestamp: number) => {
    return new Date(timestamp).toLocaleString()
  }

  const getEventIcon = (type: string) => {
    switch (type) {
      case "message": return <User className="h-4 w-4" />
      case "location": return <MapPin className="h-4 w-4" />
      case "vitals": return <Activity className="h-4 w-4" />
      case "911_call": return "📞"
      case "aed_deployed": return "⚡"
      case "consent": return "🔒"
      case "elder_override": return "🛡️"
      default: return <Clock className="h-4 w-4" />
    }
  }

  const getEventColor = (type: string) => {
    switch (type) {
      case "message": return "bg-blue-100 border-blue-300"
      case "location": return "bg-green-100 border-green-300"
      case "vitals": return "bg-red-100 border-red-300"
      case "911_call": return "bg-orange-100 border-orange-300"
      case "aed_deployed": return "bg-yellow-100 border-yellow-300"
      case "consent": return "bg-purple-100 border-purple-300"
      case "elder_override": return "bg-gray-100 border-gray-300"
      default: return "bg-gray-100 border-gray-300"
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p>Loading incident report...</p>
        </div>
      </div>
    )
  }

  return (
    <main className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-6 max-w-4xl">
        <Card className="border-2 border-blue-500 shadow-xl">
          <CardHeader className="bg-blue-600 text-white print:bg-white print:text-black">
            <div className="flex items-center justify-between">
              <CardTitle className="flex items-center gap-3 text-xl">
                <FileText className="h-6 w-6" />
                Incident Report
                <Badge variant="secondary" className="bg-blue-700 text-white">
                  {id.slice(0, 8)}
                </Badge>
              </CardTitle>
              <div className="flex gap-2 print:hidden">
                <Button
                  onClick={handlePrint}
                  variant="outline"
                  className="bg-white text-blue-600 border-2 border-white hover:bg-blue-50"
                >
                  <Printer className="h-4 w-4 mr-2" />
                  Print
                </Button>
                <Button
                  onClick={handleExportMarkdown}
                  variant="outline"
                  className="bg-white text-blue-600 border-2 border-white hover:bg-blue-50"
                >
                  <Download className="h-4 w-4 mr-2" />
                  Export MD
                </Button>
              </div>
            </div>
          </CardHeader>

          <CardContent className="p-6">
            {/* Report Header */}
            <div className="mb-6 p-4 bg-blue-50 border border-blue-200 rounded-lg">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                <div>
                  <span className="font-semibold">Incident ID:</span> {id}
                </div>
                <div>
                  <span className="font-semibold">Generated:</span> {formatTimestamp(Date.now())}
                </div>
                <div>
                  <span className="font-semibold">Total Events:</span> {events.length}
                </div>
              </div>
            </div>

            {/* Timeline */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-gray-800 border-b border-gray-300 pb-2">
                Event Timeline
              </h3>
              
              {events.length === 0 ? (
                <div className="text-center py-8 text-gray-500">
                  No events recorded for this incident.
                </div>
              ) : (
                <div className="space-y-3">
                  {events.map((event, index) => (
                    <Card key={event.id} className={`border-l-4 ${getEventColor(event.type)}`}>
                      <CardContent className="p-4">
                        <div className="flex items-start justify-between mb-2">
                          <div className="flex items-center gap-2">
                            {getEventIcon(event.type)}
                            <span className="font-semibold capitalize">
                              {event.type.replace("_", " ")}
                            </span>
                            <Badge variant="outline" className="text-xs">
                              {event.from}
                            </Badge>
                          </div>
                          <span className="text-xs text-gray-500">
                            {formatTimestamp(event.at)}
                          </span>
                        </div>
                        
                        <div className="text-sm text-gray-700">
                          {event.type === "message" && (
                            <div>
                              <strong>Message:</strong> {event.payload?.text}
                            </div>
                          )}
                          {event.type === "location" && (
                            <div>
                              <strong>Location:</strong> {event.payload?.lat?.toFixed(5)}, {event.payload?.lng?.toFixed(5)}
                              {event.payload?.acc && ` (±${Math.round(event.payload.acc)}m)`}
                            </div>
                          )}
                          {event.type === "vitals" && (
                            <div className="space-y-1">
                              <div><strong>Vitals Recorded:</strong></div>
                              {event.payload?.pulse && <div>Pulse: {event.payload.pulse} BPM</div>}
                              {event.payload?.bp_systolic && event.payload?.bp_diastolic && (
                                <div>BP: {event.payload.bp_systolic}/{event.payload.bp_diastolic}</div>
                              )}
                              {event.payload?.respiratory_rate && <div>Resp: {event.payload.respiratory_rate}</div>}
                              {event.payload?.consciousness && <div>Consciousness: {event.payload.consciousness}</div>}
                            </div>
                          )}
                          {event.type === "911_call" && (
                            <div>
                              <div><strong>Q:</strong> {event.payload?.question}</div>
                              <div><strong>A:</strong> {event.payload?.answer}</div>
                            </div>
                          )}
                          {event.type === "aed_deployed" && (
                            <div>
                              <strong>AED Status:</strong> {event.payload?.deployed ? "Deployed" : "Removed"}
                            </div>
                          )}
                          {event.type === "consent" && (
                            <div>
                              <strong>Consent:</strong> {event.payload?.action} for fields: {event.payload?.fields?.join(", ")}
                            </div>
                          )}
                          {event.type === "elder_override" && (
                            <div>
                              <strong>Elder Override:</strong> {event.payload?.active ? "Activated" : "Deactivated"}
                              {event.payload?.note && <div><strong>Note:</strong> {event.payload.note}</div>}
                            </div>
                          )}
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              )}
            </div>

            {/* Footer */}
            <div className="mt-8 pt-4 border-t border-gray-300 text-xs text-gray-500 text-center">
              Generated by SafeRoute AI HERO OS • Demo System • Not for clinical use
            </div>
          </CardContent>
        </Card>
      </div>
    </main>
  )
}
