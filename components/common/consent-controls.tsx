"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Lock, Unlock, Shield, Trash2 } from 'lucide-react'

interface ConsentToken {
  id: string
  incidentId: string
  fields: string[]
  issuedAt: number
  revokedAt?: number
}

interface ConsentControlsProps {
  incidentId: string
}

export function ConsentControls({ incidentId }: ConsentControlsProps) {
  const [tokens, setTokens] = useState<ConsentToken[]>([])
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    loadTokens()
  }, [incidentId])

  async function loadTokens() {
    try {
      const res = await fetch(`/api/consent/${incidentId}`)
      const data = await res.json()
      setTokens(data.tokens || [])
    } catch (error) {
      console.error("Failed to load consent tokens:", error)
    }
  }

  async function issueToken() {
    setLoading(true)
    try {
      const res = await fetch(`/api/consent/${incidentId}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ fields: ["basic_info", "location", "medical_summary"] })
      })
      const data = await res.json()
      if (data.token) {
        await loadTokens()
      }
    } catch (error) {
      console.error("Failed to issue consent token:", error)
    } finally {
      setLoading(false)
    }
  }

  async function revokeToken(tokenId: string) {
    try {
      await fetch(`/api/consent/${incidentId}`, {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ tokenId })
      })
      await loadTokens()
    } catch (error) {
      console.error("Failed to revoke consent token:", error)
    }
  }

  const activeTokens = tokens.filter(t => !t.revokedAt)
  const revokedTokens = tokens.filter(t => t.revokedAt)

  return (
    <Card className="border">
      <CardHeader className="py-2">
        <CardTitle className="text-sm flex items-center gap-2">
          <Shield className="h-4 w-4" /> Consent Tokens
        </CardTitle>
      </CardHeader>
      <CardContent className="text-sm space-y-3">
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-xs font-medium">Active Consents</span>
            <Button
              size="sm"
              onClick={issueToken}
              disabled={loading}
              className="border-2"
            >
              <Lock className="h-3 w-3 mr-1" />
              Issue Token
            </Button>
          </div>
          
          {activeTokens.length === 0 ? (
            <div className="text-xs text-slate-500 bg-slate-50 border border-slate-200 rounded p-2">
              No active consent tokens
            </div>
          ) : (
            <div className="space-y-2">
              {activeTokens.map(token => (
                <div key={token.id} className="bg-green-50 border border-green-200 rounded p-2">
                  <div className="flex items-center justify-between mb-1">
                    <Badge variant="outline" className="text-xs bg-green-100 border-green-300">
                      Active
                    </Badge>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => revokeToken(token.id)}
                      className="h-6 px-2 text-xs border-red-300 text-red-600 hover:bg-red-50"
                    >
                      <Trash2 className="h-3 w-3" />
                    </Button>
                  </div>
                  <div className="text-xs text-green-700">
                    Fields: {token.fields.join(", ")}
                  </div>
                  <div className="text-xs text-green-600">
                    Issued: {new Date(token.issuedAt).toLocaleString()}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {revokedTokens.length > 0 && (
          <div className="space-y-2">
            <div className="text-xs font-medium">Revoked Consents</div>
            <div className="space-y-1">
              {revokedTokens.slice(0, 2).map(token => (
                <div key={token.id} className="bg-gray-50 border border-gray-200 rounded p-2">
                  <div className="flex items-center gap-2 mb-1">
                    <Badge variant="outline" className="text-xs bg-gray-100 border-gray-300">
                      Revoked
                    </Badge>
                    <Unlock className="h-3 w-3 text-gray-500" />
                  </div>
                  <div className="text-xs text-gray-600">
                    Revoked: {new Date(token.revokedAt!).toLocaleString()}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        <div className="text-xs text-slate-500 bg-slate-50 border border-slate-200 rounded p-2">
          🔒 Demo consent system. Tokens are JWT-signed and stored in Redis when available.
        </div>
      </CardContent>
    </Card>
  )
}
