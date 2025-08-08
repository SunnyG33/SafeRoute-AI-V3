"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Shield, AlertTriangle } from 'lucide-react'
import { offlineFetch } from "@/lib/offline-queue"

interface ElderOverrideToggleProps {
  incidentId: string
}

export function ElderOverrideToggle({ incidentId }: ElderOverrideToggleProps) {
  const [isActive, setIsActive] = useState(false)
  const [note, setNote] = useState("")
  const [showForm, setShowForm] = useState(false)

  async function toggleOverride() {
    if (!isActive && !note.trim()) {
      setShowForm(true)
      return
    }

    const newState = !isActive
    setIsActive(newState)
    
    await offlineFetch(`/api/incidents/${incidentId}/events`, {
      method: "POST",
      body: {
        type: "elder_override",
        from: "system",
        payload: { active: newState, note: note.trim() }
      }
    })

    if (newState) {
      setShowForm(false)
    }
  }

  return (
    <Card className="border">
      <CardHeader className="py-2">
        <CardTitle className="text-sm flex items-center gap-2">
          <Shield className="h-4 w-4" /> Elder Protocol Override
        </CardTitle>
      </CardHeader>
      <CardContent className="text-sm space-y-2">
        <div className="flex items-center justify-between">
          <span>Override active</span>
          <button
            aria-label="Toggle Elder Protocol Override"
            className={`w-12 h-6 rounded-full border-2 border-black ${isActive ? "bg-orange-600" : "bg-slate-300"}`}
            aria-pressed={isActive}
            onClick={toggleOverride}
          />
        </div>
        
        {showForm && (
          <div className="space-y-2">
            <div className="text-xs text-orange-700 bg-orange-50 border border-orange-200 rounded p-2 flex items-center gap-2">
              <AlertTriangle className="h-4 w-4" />
              Requires justification for audit trail
            </div>
            <Textarea
              placeholder="Reason for override (required)..."
              value={note}
              onChange={(e) => setNote(e.target.value)}
              rows={2}
            />
            <div className="flex gap-2">
              <Button size="sm" onClick={toggleOverride} disabled={!note.trim()}>
                Activate Override
              </Button>
              <Button variant="outline" size="sm" onClick={() => setShowForm(false)}>
                Cancel
              </Button>
            </div>
          </div>
        )}

        {isActive && (
          <div className="text-xs text-orange-700 bg-orange-50 border border-orange-200 rounded p-2">
            Override active. Cultural protocols may be bypassed. Logged for audit.
          </div>
        )}
        
        <div className="text-xs text-slate-500">
          Allows bypassing Indigenous cultural protocols in life-threatening emergencies.
        </div>
      </CardContent>
    </Card>
  )
}
