"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { Play, Pause, RotateCcw, Heart, Timer, Volume2, Phone, AlertTriangle } from "lucide-react"

export default function CPRLoopScreen() {
  const [isActive, setIsActive] = useState(false)
  const [compressions, setCompressions] = useState(0)
  const [cycles, setCycles] = useState(0)
  const [timeElapsed, setTimeElapsed] = useState(0)
  const [currentPhase, setCurrentPhase] = useState<"compressions" | "breaths">("compressions")
  const [compressionRate, setCompressionRate] = useState(0)

  // Timer for overall elapsed time
  useEffect(() => {
    let interval: NodeJS.Timeout
    if (isActive) {
      interval = setInterval(() => {
        setTimeElapsed((time) => time + 1)
      }, 1000)
    }
    return () => clearInterval(interval)
  }, [isActive])

  // Metronome for compression rate (100-120 BPM)
  useEffect(() => {
    let interval: NodeJS.Timeout
    if (isActive && currentPhase === "compressions") {
      // 110 BPM = 1.83 compressions per second
      interval = setInterval(() => {
        setCompressionRate((rate) => rate + 1)
        // Play metronome sound (in real app)
      }, 545) // 545ms for 110 BPM
    }
    return () => clearInterval(interval)
  }, [isActive, currentPhase])

  const handleCompressionClick = () => {
    setCompressions((prev) => {
      const newCount = prev + 1
      if (newCount === 30) {
        setCurrentPhase("breaths")
        setTimeout(() => {
          setCurrentPhase("compressions")
          setCycles((cycles) => cycles + 1)
        }, 4000) // 2 breaths, 2 seconds each
      }
      return newCount
    })
  }

  const resetCPR = () => {
    setIsActive(false)
    setCompressions(0)
    setCycles(0)
    setTimeElapsed(0)
    setCurrentPhase("compressions")
    setCompressionRate(0)
  }

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins}:${secs.toString().padStart(2, "0")}`
  }

  const compressionProgress = ((compressions % 30) / 30) * 100

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-6">
      {/* Status Header */}
      <Card className="bg-red-50 border-red-200">
        <CardContent className="p-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <AlertTriangle className="h-6 w-6 text-red-600" />
              <div>
                <h2 className="font-semibold text-red-900">CPR in Progress</h2>
                <p className="text-sm text-red-700">Continue chest compressions until help arrives</p>
              </div>
            </div>
            <Badge variant="destructive" className="animate-pulse">
              ACTIVE
            </Badge>
          </div>
        </CardContent>
      </Card>

      {/* Main CPR Interface */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Compression Counter */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Heart className="h-5 w-5 text-red-500" />
              <span>Chest Compressions</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Current Phase */}
            <div className="text-center">
              {currentPhase === "compressions" ? (
                <div className="space-y-2">
                  <div className="text-6xl font-bold text-red-600">{30 - (compressions % 30)}</div>
                  <p className="text-lg text-gray-600">compressions remaining</p>
                  <Progress value={compressionProgress} className="h-3" />
                </div>
              ) : (
                <div className="space-y-2">
                  <div className="text-4xl font-bold text-blue-600">Give 2 Breaths</div>
                  <p className="text-lg text-gray-600">Then continue compressions</p>
                  <div className="animate-pulse bg-blue-100 p-4 rounded-lg">
                    <p className="text-blue-800">Tilt head back, lift chin, give 2 breaths</p>
                  </div>
                </div>
              )}
            </div>

            {/* Compression Button */}
            {currentPhase === "compressions" && (
              <Button
                size="lg"
                onClick={handleCompressionClick}
                className="w-full h-20 text-xl bg-red-600 hover:bg-red-700"
                disabled={!isActive}
              >
                <Heart className="h-8 w-8 mr-2" />
                Press for Each Compression
              </Button>
            )}
          </CardContent>
        </Card>

        {/* Stats and Controls */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Timer className="h-5 w-5" />
              <span>CPR Statistics</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Stats Grid */}
            <div className="grid grid-cols-2 gap-4">
              <div className="text-center p-4 bg-gray-50 rounded-lg">
                <div className="text-2xl font-bold text-gray-900">{compressions}</div>
                <div className="text-sm text-gray-600">Total Compressions</div>
              </div>
              <div className="text-center p-4 bg-gray-50 rounded-lg">
                <div className="text-2xl font-bold text-gray-900">{cycles}</div>
                <div className="text-sm text-gray-600">Complete Cycles</div>
              </div>
              <div className="text-center p-4 bg-gray-50 rounded-lg">
                <div className="text-2xl font-bold text-gray-900">{formatTime(timeElapsed)}</div>
                <div className="text-sm text-gray-600">Time Elapsed</div>
              </div>
              <div className="text-center p-4 bg-gray-50 rounded-lg">
                <div className="text-2xl font-bold text-gray-900">110</div>
                <div className="text-sm text-gray-600">Target BPM</div>
              </div>
            </div>

            {/* Control Buttons */}
            <div className="space-y-3">
              <Button
                onClick={() => setIsActive(!isActive)}
                className={`w-full ${isActive ? "bg-yellow-600 hover:bg-yellow-700" : "bg-green-600 hover:bg-green-700"}`}
              >
                {isActive ? (
                  <>
                    <Pause className="h-4 w-4 mr-2" />
                    Pause CPR
                  </>
                ) : (
                  <>
                    <Play className="h-4 w-4 mr-2" />
                    Start CPR
                  </>
                )}
              </Button>

              <Button variant="outline" onClick={resetCPR} className="w-full bg-transparent">
                <RotateCcw className="h-4 w-4 mr-2" />
                Reset Counter
              </Button>

              <Button variant="destructive" className="w-full">
                <Phone className="h-4 w-4 mr-2" />
                Call 911 Again
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Instructions */}
      <Card>
        <CardHeader>
          <CardTitle>CPR Instructions</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <h3 className="font-semibold text-lg">Chest Compressions:</h3>
              <ul className="space-y-2 text-sm">
                <li className="flex items-start space-x-2">
                  <span className="font-semibold text-red-600">1.</span>
                  <span>Place heel of hand on center of chest, between nipples</span>
                </li>
                <li className="flex items-start space-x-2">
                  <span className="font-semibold text-red-600">2.</span>
                  <span>Place other hand on top, interlacing fingers</span>
                </li>
                <li className="flex items-start space-x-2">
                  <span className="font-semibold text-red-600">3.</span>
                  <span>Push hard and fast at least 2 inches deep</span>
                </li>
                <li className="flex items-start space-x-2">
                  <span className="font-semibold text-red-600">4.</span>
                  <span>Allow complete chest recoil between compressions</span>
                </li>
              </ul>
            </div>
            <div className="space-y-4">
              <h3 className="font-semibold text-lg">Rescue Breaths:</h3>
              <ul className="space-y-2 text-sm">
                <li className="flex items-start space-x-2">
                  <span className="font-semibold text-blue-600">1.</span>
                  <span>Tilt head back by lifting chin</span>
                </li>
                <li className="flex items-start space-x-2">
                  <span className="font-semibold text-blue-600">2.</span>
                  <span>Pinch nose closed</span>
                </li>
                <li className="flex items-start space-x-2">
                  <span className="font-semibold text-blue-600">3.</span>
                  <span>Make complete seal over mouth</span>
                </li>
                <li className="flex items-start space-x-2">
                  <span className="font-semibold text-blue-600">4.</span>
                  <span>Give 2 breaths, each lasting 1 second</span>
                </li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Audio Cues */}
      <Card className="bg-blue-50 border-blue-200">
        <CardContent className="p-4">
          <div className="flex items-center space-x-3">
            <Volume2 className="h-5 w-5 text-blue-600" />
            <div>
              <p className="font-medium text-blue-900">Audio Metronome Active</p>
              <p className="text-sm text-blue-700">Listen for the beat to maintain proper compression rate (110 BPM)</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
