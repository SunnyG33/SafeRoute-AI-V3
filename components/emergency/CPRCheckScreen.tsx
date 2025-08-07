"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Heart, Phone, AlertTriangle, CheckCircle, XCircle, Clock, Satellite, MapPin } from "lucide-react"
import { AppLayout } from "@/components/layout/AppLayout"

interface CPRCheckScreenProps {
  onStartCPR: () => void
  onExit: () => void
  autoCall911?: boolean
}

export default function CPRCheckScreen({ onStartCPR, onExit, autoCall911 = true }: CPRCheckScreenProps) {
  const [currentCheck, setCurrentCheck] = useState(0)
  const [checkResults, setCheckResults] = useState<boolean[]>([])
  const [timer, setTimer] = useState(0)
  const [call911Made, setCall911Made] = useState(false)
  const [satelliteConnected, setSatelliteConnected] = useState(true)

  const checks = [
    {
      title: "Check Responsiveness",
      description: "Tap shoulders firmly and shout 'Are you okay?'",
      icon: "👋",
      action: "Tap and Shout",
      guidance: "If no response, continue to next check",
    },
    {
      title: "Check Breathing",
      description: "Look for chest movement for no more than 10 seconds",
      icon: "🫁",
      action: "Look, Listen, Feel",
      guidance: "Normal breathing = chest rises and falls regularly",
    },
    {
      title: "Check Pulse (if trained)",
      description: "Feel for carotid pulse on neck for 5-10 seconds",
      icon: "💓",
      action: "Feel Neck Pulse",
      guidance: "Skip if untrained - go by breathing only",
    },
  ]

  useEffect(() => {
    const interval = setInterval(() => {
      setTimer((prev) => prev + 1)
    }, 1000)
    return () => clearInterval(interval)
  }, [])

  useEffect(() => {
    if (autoCall911 && !call911Made) {
      // Simulate automatic 911 call after 10 seconds
      const callTimer = setTimeout(() => {
        setCall911Made(true)
      }, 10000)
      return () => clearTimeout(callTimer)
    }
  }, [autoCall911, call911Made])

  const handleCheckResult = (result: boolean) => {
    const newResults = [...checkResults, result]
    setCheckResults(newResults)

    if (currentCheck < checks.length - 1) {
      setCurrentCheck(currentCheck + 1)
    }
  }

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins}:${secs.toString().padStart(2, "0")}`
  }

  const isEmergency = checkResults.length >= 2 && (!checkResults[0] || !checkResults[1])
  const allChecksComplete = checkResults.length === checks.length

  return (
    <AppLayout
      title="Emergency Assessment"
      previousLabel="Back to Hero Mode"
      nextLabel="Start CPR"
      onPrevious={onExit}
      onNext={allChecksComplete && isEmergency ? onStartCPR : undefined}
      className="bg-red-50"
    >
      <div className="p-4 max-w-md mx-auto">
        {/* Emergency Status */}
        <div className="bg-red-600 text-white p-4 rounded-lg mb-4 shadow-lg">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Heart className="h-6 w-6 animate-pulse" />
              <div>
                <div className="font-bold">HERO MODE ACTIVE</div>
                <div className="text-sm opacity-90">Emergency Assessment</div>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Clock className="h-4 w-4" />
              <span className="text-sm">{formatTime(timer)}</span>
            </div>
          </div>
        </div>

        {/* Connection Status */}
        <div className="flex items-center justify-between bg-blue-50 p-3 rounded-lg mb-4">
          <div className="flex items-center gap-2">
            <Satellite className={`h-5 w-5 ${satelliteConnected ? "text-green-600" : "text-red-600"}`} />
            <span className="text-sm font-medium">{satelliteConnected ? "Starlink Connected" : "Connecting..."}</span>
          </div>
          {call911Made && (
            <Badge variant="secondary" className="bg-green-100 text-green-800">
              911 Called
            </Badge>
          )}
        </div>

        {/* Current Check */}
        {currentCheck < checks.length && (
          <Card className="bg-white shadow-xl border-2 border-orange-500 mb-4">
            <CardHeader className="bg-gradient-to-r from-orange-500 to-red-500 text-white">
              <CardTitle className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="text-2xl">{checks[currentCheck].icon}</span>
                  {checks[currentCheck].title}
                </div>
                <Badge variant="secondary" className="bg-white text-orange-600">
                  {currentCheck + 1}/{checks.length}
                </Badge>
              </CardTitle>
            </CardHeader>

            <CardContent className="p-6">
              <div className="space-y-4">
                <p className="text-lg font-medium text-gray-800">{checks[currentCheck].description}</p>

                <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
                  <div className="flex items-start gap-2">
                    <AlertTriangle className="h-5 w-5 text-blue-600 mt-0.5" />
                    <div>
                      <div className="font-semibold text-blue-800 mb-1">Guidance</div>
                      <p className="text-sm text-blue-700">{checks[currentCheck].guidance}</p>
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <Button
                    onClick={() => handleCheckResult(true)}
                    className="bg-green-600 hover:bg-green-700 text-white py-4 flex items-center justify-center gap-2"
                  >
                    <CheckCircle className="h-5 w-5" />
                    Normal
                  </Button>
                  <Button
                    onClick={() => handleCheckResult(false)}
                    className="bg-red-600 hover:bg-red-700 text-white py-4 flex items-center justify-center gap-2"
                  >
                    <XCircle className="h-5 w-5" />
                    Abnormal/None
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Results Summary */}
        {checkResults.length > 0 && (
          <Card className="bg-white shadow-lg mb-4">
            <CardHeader>
              <CardTitle className="text-lg">Assessment Results</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                {checkResults.map((result, index) => (
                  <div key={index} className="flex items-center justify-between p-2 bg-gray-50 rounded">
                    <span className="text-sm font-medium">{checks[index].title}</span>
                    <div className="flex items-center gap-2">
                      {result ? (
                        <CheckCircle className="h-4 w-4 text-green-600" />
                      ) : (
                        <XCircle className="h-4 w-4 text-red-600" />
                      )}
                      <span className="text-sm">{result ? "Normal" : "Abnormal"}</span>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        )}

        {/* Emergency Decision */}
        {allChecksComplete && (
          <Card
            className={`shadow-xl border-2 ${isEmergency ? "border-red-500 bg-red-50" : "border-green-500 bg-green-50"}`}
          >
            <CardContent className="p-6 text-center">
              {isEmergency ? (
                <div className="space-y-4">
                  <div className="text-4xl">🚨</div>
                  <h3 className="text-xl font-bold text-red-800">CARDIAC EMERGENCY DETECTED</h3>
                  <p className="text-red-700">Person is unresponsive and not breathing normally</p>
                  <Button
                    onClick={onStartCPR}
                    className="w-full bg-red-600 hover:bg-red-700 text-white py-4 text-lg font-bold"
                  >
                    🫀 START CPR IMMEDIATELY
                  </Button>
                </div>
              ) : (
                <div className="space-y-4">
                  <div className="text-4xl">✅</div>
                  <h3 className="text-xl font-bold text-green-800">NO CPR NEEDED</h3>
                  <p className="text-green-700">Person is responsive and breathing normally</p>
                  <Button onClick={onExit} className="w-full bg-green-600 hover:bg-green-700 text-white py-4">
                    Continue Monitoring
                  </Button>
                </div>
              )}
            </CardContent>
          </Card>
        )}

        {/* 911 Status */}
        {call911Made && (
          <div className="mt-4 bg-blue-50 p-4 rounded-lg border border-blue-200">
            <div className="flex items-center gap-2 mb-2">
              <Phone className="h-5 w-5 text-blue-600" />
              <span className="font-semibold text-blue-800">911 Dispatcher</span>
            </div>
            <p className="text-sm text-blue-700 italic">
              "Emergency services have been notified. Continue your assessment. If the person is unresponsive and not
              breathing, begin CPR immediately."
            </p>
          </div>
        )}

        {/* Location Status */}
        <div className="mt-2 flex items-center gap-2 bg-green-50 p-3 rounded-lg">
          <MapPin className="h-4 w-4 text-green-600" />
          <span className="text-sm">Location shared: 54.7267° N, 113.3000° W (Fort McMurray, AB)</span>
        </div>
      </div>
    </AppLayout>
  )
}
