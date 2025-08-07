"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { CheckCircle, FileText } from "lucide-react"

interface CPRStats {
  duration: number // minutes
  totalCompressions: number
  cyclesCompleted: number
  averageBPM: number
  averageDepth: number
  techniqueScore: number // 0-100
}

interface ParamedicInfo {
  name: string
  unit: string
  certification: string
}

interface PatientStatus {
  pulseRestored: boolean
  breathingAssisted: boolean
  stableForTransport: boolean
}

interface ProfessionalHandoffProps {
  responseStats: CPRStats
  paramedicInfo: ParamedicInfo
  patientStatus: PatientStatus
  onHandoffComplete: () => void
  onViewFullReport: () => void
}

export default function ProfessionalHandoff({
  responseStats = {
    duration: 6,
    totalCompressions: 412,
    cyclesCompleted: 5,
    averageBPM: 112,
    averageDepth: 2.1,
    techniqueScore: 94,
  },
  paramedicInfo = {
    name: "Mike Rodriguez",
    unit: "Unit 47",
    certification: "Advanced Life Support",
  },
  patientStatus = {
    pulseRestored: true,
    breathingAssisted: true,
    stableForTransport: true,
  },
  onHandoffComplete,
  onViewFullReport,
}: ProfessionalHandoffProps) {
  const [showDetailedStats, setShowDetailedStats] = useState(false)

  const getAchievementLevel = (score: number) => {
    if (score >= 90) return { level: "Excellent", color: "text-green-600", icon: "🏆" }
    if (score >= 80) return { level: "Good", color: "text-blue-600", icon: "🥈" }
    if (score >= 70) return { level: "Satisfactory", color: "text-yellow-600", icon: "🥉" }
    return { level: "Needs Improvement", color: "text-orange-600", icon: "📈" }
  }

  const achievement = getAchievementLevel(responseStats.techniqueScore)

  return (
    <div className="min-h-screen bg-green-50 flex items-center justify-center p-4">
      <Card className="w-full max-w-2xl">
        <CardContent className="p-6">
          {/* Header */}
          <div className="text-center mb-6">
            <div className="flex items-center justify-center gap-2 mb-2">
              <span className="text-2xl">🚑</span>
              <h1 className="text-2xl font-bold text-green-800">Paramedics Have Arrived</h1>
            </div>
            <p className="text-lg text-gray-700">Professional medical care is now taking over</p>
          </div>

          {/* Paramedic Information */}
          <Card className="bg-blue-50 border-blue-200 mb-6">
            <CardContent className="p-4">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                  <span className="text-blue-600 font-bold">👨‍⚕️</span>
                </div>
                <div>
                  <div className="font-bold text-blue-800">Paramedic {paramedicInfo.name}</div>
                  <div className="text-sm text-blue-600">
                    {paramedicInfo.unit}, {paramedicInfo.certification}
                  </div>
                </div>
              </div>
              <div className="bg-white p-3 rounded-lg border border-blue-200">
                <div className="italic text-gray-700">
                  "Thank you for the excellent CPR. We'll take over now. You may have saved this person's life."
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Patient Status */}
          <Card className="bg-green-50 border-green-200 mb-6">
            <CardContent className="p-4">
              <div className="flex items-center gap-2 mb-3">
                <CheckCircle className="w-6 h-6 text-green-600" />
                <span className="font-bold text-green-800">Patient Status:</span>
              </div>
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-green-500" />
                  <span className={patientStatus.pulseRestored ? "text-green-700" : "text-red-700"}>
                    Pulse {patientStatus.pulseRestored ? "restored" : "not detected"}
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-green-500" />
                  <span className={patientStatus.breathingAssisted ? "text-green-700" : "text-red-700"}>
                    Breathing {patientStatus.breathingAssisted ? "assisted" : "not established"}
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-green-500" />
                  <span className={patientStatus.stableForTransport ? "text-green-700" : "text-red-700"}>
                    {patientStatus.stableForTransport ? "Stable for transport" : "Requires stabilization"}
                  </span>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Hero Response Summary */}
          <Card className="bg-white border-gray-200 mb-6">
            <CardContent className="p-4">
              <div className="flex items-center gap-2 mb-3">
                <span className="text-xl">📊</span>
                <span className="font-bold text-gray-800">Your Hero Response:</span>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="text-center">
                  <div className="text-2xl font-bold text-blue-600">{responseStats.duration}</div>
                  <div className="text-sm text-gray-600">Minutes CPR</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-blue-600">{responseStats.totalCompressions}</div>
                  <div className="text-sm text-gray-600">Total Compressions</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-blue-600">{responseStats.cyclesCompleted}</div>
                  <div className="text-sm text-gray-600">Cycles Completed</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-blue-600">{responseStats.techniqueScore}/100</div>
                  <div className="text-sm text-gray-600">Technique Score</div>
                </div>
              </div>

              {showDetailedStats && (
                <div className="mt-4 pt-4 border-t border-gray-200">
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <span className="text-gray-600">Average BPM:</span>
                      <span className="ml-2 font-semibold">{responseStats.averageBPM}</span>
                    </div>
                    <div>
                      <span className="text-gray-600">Average Depth:</span>
                      <span className="ml-2 font-semibold">{responseStats.averageDepth}"</span>
                    </div>
                  </div>
                </div>
              )}

              <Button
                onClick={() => setShowDetailedStats(!showDetailedStats)}
                variant="ghost"
                className="w-full mt-3 text-sm"
              >
                {showDetailedStats ? "Hide Details" : "Show Detailed Stats"}
              </Button>
            </CardContent>
          </Card>

          {/* Achievement */}
          <Card className="bg-yellow-50 border-yellow-200 mb-6">
            <CardContent className="p-4">
              <div className="text-center">
                <div className="text-4xl mb-2">{achievement.icon}</div>
                <div className="font-bold text-lg text-yellow-800 mb-1">Achievement Unlocked!</div>
                <div className="text-yellow-700 mb-2">"Life Saver" - First successful emergency response</div>
                <Badge className={`${achievement.color} bg-white`}>Performance: {achievement.level}</Badge>
              </div>
            </CardContent>
          </Card>

          {/* Action Buttons */}
          <div className="space-y-3 mb-6">
            <Button
              onClick={onViewFullReport}
              className="w-full h-12 bg-blue-600 hover:bg-blue-700 text-white font-semibold"
            >
              <FileText className="w-5 h-5 mr-2" />
              VIEW FULL INCIDENT REPORT
            </Button>

            <Button
              onClick={onHandoffComplete}
              className="w-full h-12 bg-green-600 hover:bg-green-700 text-white font-semibold"
            >
              <CheckCircle className="w-5 h-5 mr-2" />
              EXIT HERO MODE
            </Button>
          </div>

          {/* Community Impact */}
          <Card className="bg-purple-50 border-purple-200 mb-6">
            <CardContent className="p-4">
              <div className="flex items-center gap-2 mb-2">
                <span className="text-xl">👥</span>
                <span className="font-semibold text-purple-800">Community Impact:</span>
              </div>
              <div className="text-sm text-purple-700 space-y-1">
                <div>• Emergency response time improved by your quick action</div>
                <div>• Community safety network strengthened</div>
                <div>• Hero skills validated and recorded</div>
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
                <div>"Show report" → Display detailed incident report</div>
                <div>"Exit Hero Mode" → Return to normal app mode</div>
                <div>"What happened" → Explain patient outcome</div>
              </div>
            </CardContent>
          </Card>

          {/* Beta Disclaimer */}
          <div className="mt-4 text-center">
            <Badge variant="outline" className="bg-gray-100">
              ⚠️ BETA - Incident reporting in development
            </Badge>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
