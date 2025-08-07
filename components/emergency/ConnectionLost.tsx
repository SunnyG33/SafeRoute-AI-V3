"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { AlertTriangle, Wifi, WifiOff, Satellite, RefreshCw, CheckCircle, XCircle } from "lucide-react"

interface OfflineCapability {
  feature: string
  available: boolean
  description: string
}

interface ConnectionLostProps {
  lastSyncTime?: Date
  connectionType?: "cellular" | "wifi" | "satellite" | "offline"
  onRetryConnection: () => void
  onContinueOffline: () => void
}

export default function ConnectionLost({
  lastSyncTime = new Date(Date.now() - 3 * 60 * 1000), // 3 minutes ago
  connectionType = "offline",
  onRetryConnection,
  onContinueOffline,
}: ConnectionLostProps) {
  const [retryProgress, setRetryProgress] = useState(0)
  const [isRetrying, setIsRetrying] = useState(false)
  const [signalStrength, setSignalStrength] = useState(0)

  const offlineCapabilities: OfflineCapability[] = [
    { feature: "CPR guidance", available: true, description: "Complete step-by-step instructions" },
    { feature: "Voice commands", available: true, description: "Local voice recognition active" },
    { feature: "Timer and counters", available: true, description: "Performance tracking continues" },
    { feature: "911 call", available: false, description: "May be interrupted or unavailable" },
    { feature: "Hero network", available: false, description: "Cannot contact nearby heroes" },
    { feature: "Real-time ETA updates", available: false, description: "Emergency services coordination limited" },
  ]

  const improvementTips = [
    { icon: "⛰️", text: "Move to higher ground or open area" },
    { icon: "🪟", text: "Go near windows or outside" },
    { icon: "🏗️", text: "Move away from metal structures" },
    { icon: "📱", text: "Check if other devices have signal" },
  ]

  useEffect(() => {
    if (isRetrying) {
      const interval = setInterval(() => {
        setRetryProgress((prev) => {
          if (prev >= 100) {
            setIsRetrying(false)
            return 0
          }
          return prev + 10
        })
      }, 200)
      return () => clearInterval(interval)
    }
  }, [isRetrying])

  const handleRetryConnection = () => {
    setIsRetrying(true)
    setRetryProgress(0)
    // Simulate connection attempt
    setTimeout(() => {
      onRetryConnection()
    }, 2000)
  }

  const getConnectionIcon = () => {
    switch (connectionType) {
      case "satellite":
        return <Satellite className="w-6 h-6 text-blue-500" />
      case "cellular":
        return <Wifi className="w-6 h-6 text-green-500" />
      case "wifi":
        return <Wifi className="w-6 h-6 text-blue-500" />
      default:
        return <WifiOff className="w-6 h-6 text-red-500" />
    }
  }

  const formatLastSync = (date: Date) => {
    const now = new Date()
    const diffMinutes = Math.floor((now.getTime() - date.getTime()) / (1000 * 60))
    if (diffMinutes < 1) return "Just now"
    if (diffMinutes === 1) return "1 minute ago"
    return `${diffMinutes} minutes ago`
  }

  return (
    <div className="min-h-screen bg-orange-50 flex items-center justify-center p-4">
      <Card className="w-full max-w-2xl">
        <CardContent className="p-6">
          {/* Header */}
          <div className="text-center mb-6">
            <div className="flex items-center justify-center gap-2 mb-2">
              {getConnectionIcon()}
              <h1 className="text-2xl font-bold text-orange-800">Connection Lost</h1>
            </div>
            <p className="text-lg text-gray-700">Limited connectivity detected</p>
          </div>

          {/* Connection Status */}
          <Card className="bg-red-50 border-red-200 mb-6">
            <CardContent className="p-4">
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2">
                  <AlertTriangle className="w-5 h-5 text-red-600" />
                  <span className="font-semibold text-red-800">Connection Status</span>
                </div>
                <Badge variant="outline" className="bg-red-100 text-red-700">
                  {connectionType.toUpperCase()}
                </Badge>
              </div>
              <div className="text-sm text-red-700">📶 Switching to cellular backup... • 🛰️ Satellite signal lost</div>
            </CardContent>
          </Card>

          {/* Offline Capabilities */}
          <Card className="bg-white border-gray-200 mb-6">
            <CardContent className="p-4">
              <div className="flex items-center gap-2 mb-4">
                <span className="text-xl">📱</span>
                <span className="font-bold text-gray-800">Offline Mode Capabilities:</span>
              </div>
              <div className="space-y-3">
                {offlineCapabilities.map((capability, index) => (
                  <div key={index} className="flex items-start gap-3">
                    {capability.available ? (
                      <CheckCircle className="w-5 h-5 text-green-500 mt-0.5" />
                    ) : (
                      <XCircle className="w-5 h-5 text-red-500 mt-0.5" />
                    )}
                    <div className="flex-1">
                      <div className={`font-semibold ${capability.available ? "text-green-700" : "text-red-700"}`}>
                        {capability.feature} {capability.available ? "still available" : "may be interrupted"}
                      </div>
                      <div className="text-sm text-gray-600">{capability.description}</div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Retry Connection */}
          <Card className="bg-blue-50 border-blue-200 mb-6">
            <CardContent className="p-4">
              <div className="flex items-center gap-2 mb-3">
                <RefreshCw className={`w-5 h-5 text-blue-600 ${isRetrying ? "animate-spin" : ""}`} />
                <span className="font-semibold text-blue-800">
                  {isRetrying ? "Attempting to reconnect..." : "Connection Recovery"}
                </span>
              </div>

              {isRetrying && (
                <div className="mb-4">
                  <div className="w-full bg-blue-200 rounded-full h-2">
                    <div
                      className="bg-blue-600 h-2 rounded-full transition-all duration-200"
                      style={{ width: `${retryProgress}%` }}
                    ></div>
                  </div>
                  <div className="text-sm text-blue-700 mt-1">{retryProgress}% complete</div>
                </div>
              )}

              <div className="text-sm text-blue-700 mb-4">Searching for: Satellite • Cellular • WiFi networks</div>
            </CardContent>
          </Card>

          {/* Signal Improvement Tips */}
          <Card className="bg-yellow-50 border-yellow-200 mb-6">
            <CardContent className="p-4">
              <div className="flex items-center gap-2 mb-3">
                <span className="text-xl">💡</span>
                <span className="font-semibold text-yellow-800">Try moving to:</span>
              </div>
              <div className="space-y-2">
                {improvementTips.map((tip, index) => (
                  <div key={index} className="flex items-center gap-3">
                    <span className="text-lg">{tip.icon}</span>
                    <span className="text-yellow-700">{tip.text}</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Action Buttons */}
          <div className="space-y-3 mb-6">
            <Button
              onClick={onContinueOffline}
              className="w-full h-14 bg-green-600 hover:bg-green-700 text-white font-semibold"
            >
              <CheckCircle className="w-6 h-6 mr-2" />
              CONTINUE OFFLINE - CPR GUIDANCE READY
            </Button>

            <Button
              onClick={handleRetryConnection}
              disabled={isRetrying}
              variant="outline"
              className="w-full h-14 border-2 border-blue-300 text-blue-700 hover:bg-blue-50 font-semibold bg-transparent"
            >
              <RefreshCw className={`w-6 h-6 mr-2 ${isRetrying ? "animate-spin" : ""}`} />
              {isRetrying ? "RETRYING CONNECTION..." : "RETRY CONNECTION"}
            </Button>
          </div>

          {/* Last Sync Info */}
          <Card className="bg-gray-50 border-gray-200 mb-6">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="text-gray-600">⚠️ Last synced:</span>
                  <span className="font-semibold text-gray-800">{formatLastSync(lastSyncTime)}</span>
                </div>
                <Badge variant="outline" className="bg-gray-100">
                  Offline Mode Active
                </Badge>
              </div>
            </CardContent>
          </Card>

          {/* Voice Commands */}
          <Card className="bg-blue-50 border-blue-200">
            <CardContent className="p-4">
              <div className="flex items-center gap-2 mb-2">
                <span className="text-xl">🎤</span>
                <span className="font-semibold text-blue-800">Voice Commands:</span>
              </div>
              <div className="text-sm text-blue-700 space-y-1">
                <div>"Continue offline" → Proceed with cached guidance</div>
                <div>"Retry connection" → Attempt reconnection</div>
                <div>"Find signal" → Show signal improvement tips</div>
                <div>"Emergency help" → Access offline emergency protocols</div>
              </div>
            </CardContent>
          </Card>

          {/* Beta Disclaimer */}
          <div className="mt-4 text-center">
            <Badge variant="outline" className="bg-gray-100">
              ⚠️ BETA - Offline capabilities continuously improving
            </Badge>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
