"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Activity, Zap, AlertTriangle, Timer } from 'lucide-react'
import { offlineFetch } from "@/lib/offline-queue"

interface VitalsPanelProps {
  incidentId: string
}

export function VitalsPanel({ incidentId }: VitalsPanelProps) {
  const [vitals, setVitals] = useState({
    pulse: "",
    bp_systolic: "",
    bp_diastolic: "",
    respiratory_rate: "",
    oxygen_saturation: "",
    temperature: "",
    consciousness: "alert"
  })
  const [aedDeployed, setAedDeployed] = useState(false)
  const [hazards, setHazards] = useState<string[]>([])
  const [taskTimers, setTaskTimers] = useState<{[key: string]: number}>({})

  async function saveVitals() {
    await offlineFetch(`/api/incidents/${incidentId}/events`, {
      method: "POST",
      body: {
        type: "vitals",
        from: "responder",
        payload: { ...vitals, timestamp: Date.now() }
      }
    })
  }

  async function toggleAED() {
    const newState = !aedDeployed
    setAedDeployed(newState)
    
    await offlineFetch(`/api/incidents/${incidentId}/events`, {
      method: "POST",
      body: {
        type: "aed_deployed",
        from: "responder",
        payload: { deployed: newState, timestamp: Date.now() }
      }
    })
  }

  async function addHazard(hazard: string) {
    const newHazards = [...hazards, hazard]
    setHazards(newHazards)
    
    await offlineFetch(`/api/incidents/${incidentId}/events`, {
      method: "POST",
      body: {
        type: "scene_hazard",
        from: "responder",
        payload: { hazards: newHazards, added: hazard }
      }
    })
  }

  function startTaskTimer(task: string) {
    setTaskTimers(prev => ({ ...prev, [task]: Date.now() }))
  }

  function getTaskDuration(task: string): string {
    const start = taskTimers[task]
    if (!start) return "00:00"
    const elapsed = Math.floor((Date.now() - start) / 1000)
    const mins = Math.floor(elapsed / 60)
    const secs = elapsed % 60
    return `${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`
  }

  return (
    <Card className="border">
      <CardHeader className="py-2">
        <CardTitle className="text-sm flex items-center gap-2">
          <Activity className="h-4 w-4" /> Vitals & Scene Data
        </CardTitle>
      </CardHeader>
      <CardContent className="text-sm space-y-3">
        {/* Quick Vitals */}
        <div className="grid grid-cols-2 gap-2">
          <Input
            placeholder="Pulse (BPM)"
            value={vitals.pulse}
            onChange={(e) => setVitals(v => ({ ...v, pulse: e.target.value }))}
          />
          <Input
            placeholder="Resp Rate"
            value={vitals.respiratory_rate}
            onChange={(e) => setVitals(v => ({ ...v, respiratory_rate: e.target.value }))}
          />
          <Input
            placeholder="BP Sys"
            value={vitals.bp_systolic}
            onChange={(e) => setVitals(v => ({ ...v, bp_systolic: e.target.value }))}
          />
          <Input
            placeholder="BP Dia"
            value={vitals.bp_diastolic}
            onChange={(e) => setVitals(v => ({ ...v, bp_diastolic: e.target.value }))}
          />
        </div>

        <select
          className="w-full border rounded px-2 py-1"
          value={vitals.consciousness}
          onChange={(e) => setVitals(v => ({ ...v, consciousness: e.target.value }))}
        >
          <option value="alert">Alert</option>
          <option value="verbal">Responds to Verbal</option>
          <option value="pain">Responds to Pain</option>
          <option value="unresponsive">Unresponsive</option>
        </select>

        <Button className="w-full border-2" onClick={saveVitals}>
          Save Vitals
        </Button>

        {/* AED Status */}
        <div className="flex items-center justify-between p-2 bg-yellow-50 border border-yellow-200 rounded">
          <div className="flex items-center gap-2">
            <Zap className="h-4 w-4 text-yellow-600" />
            <span>AED Deployed</span>
          </div>
          <button
            className={`w-12 h-6 rounded-full border-2 border-black ${aedDeployed ? "bg-red-600" : "bg-slate-300"}`}
            onClick={toggleAED}
          />
        </div>

        {/* Scene Hazards */}
        <div className="space-y-2">
          <div className="text-xs font-semibold">Scene Hazards</div>
          <div className="flex flex-wrap gap-1">
            {["Fire", "Traffic", "Electrical", "Chemical", "Structural"].map(hazard => (
              <Button
                key={hazard}
                variant="outline"
                size="sm"
                onClick={() => addHazard(hazard)}
                className={`text-xs ${hazards.includes(hazard) ? "bg-red-100 border-red-300" : ""}`}
              >
                {hazard}
              </Button>
            ))}
          </div>
          {hazards.length > 0 && (
            <div className="text-xs text-red-700 bg-red-50 border border-red-200 rounded p-2 flex items-center gap-2">
              <AlertTriangle className="h-4 w-4" />
              Active hazards: {hazards.join(", ")}
            </div>
          )}
        </div>

        {/* Task Timers */}
        <div className="space-y-2">
          <div className="text-xs font-semibold">Task Timers</div>
          {["CPR", "Medication", "Transport"].map(task => (
            <div key={task} className="flex items-center justify-between">
              <span className="text-xs">{task}</span>
              <div className="flex items-center gap-2">
                <Badge variant="outline" className="font-mono text-xs">
                  <Timer className="h-3 w-3 mr-1" />
                  {getTaskDuration(task)}
                </Badge>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => startTaskTimer(task)}
                  className="text-xs"
                >
                  Start
                </Button>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
