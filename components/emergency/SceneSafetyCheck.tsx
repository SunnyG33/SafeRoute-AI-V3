"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { AlertTriangle, Shield, CheckCircle } from "lucide-react"

interface SceneSafetyCheckProps {
  emergencyType: string
  onSafetyConfirmed: (isSafe: boolean) => void
  onUnsafeScene: () => void
}

export default function SceneSafetyCheck({ emergencyType, onSafetyConfirmed, onUnsafeScene }: SceneSafetyCheckProps) {
  const [checkedItems, setCheckedItems] = useState<boolean[]>([false, false, false, false, false])
  const [allChecked, setAllChecked] = useState(false)

  const safetyChecks = [
    { icon: "🔥", text: "No fire, smoke, or gas leaks" },
    { icon: "⚡", text: "No electrical hazards or downed wires" },
    { icon: "🚗", text: "No traffic or moving vehicles nearby" },
    { icon: "🐕", text: "No aggressive people or animals" },
    { icon: "🏗️", text: "Stable ground and structure" },
  ]

  const handleCheckItem = (index: number) => {
    const newCheckedItems = [...checkedItems]
    newCheckedItems[index] = !newCheckedItems[index]
    setCheckedItems(newCheckedItems)

    const allItemsChecked = newCheckedItems.every((item) => item)
    setAllChecked(allItemsChecked)
  }

  const handleSceneSafe = () => {
    onSafetyConfirmed(true)
  }

  const handleSceneNotSafe = () => {
    onSafetyConfirmed(false)
    onUnsafeScene()
  }

  return (
    <div className="min-h-screen bg-yellow-50 flex items-center justify-center p-4">
      <Card className="w-full max-w-2xl">
        <CardContent className="p-6">
          {/* Header */}
          <div className="text-center mb-6">
            <div className="flex items-center justify-center gap-2 mb-2">
              <AlertTriangle className="w-8 h-8 text-yellow-600" />
              <h1 className="text-2xl font-bold text-yellow-800">Scene Safety Check</h1>
            </div>
            <p className="text-lg text-gray-700">Before helping, ensure YOUR safety:</p>
          </div>

          {/* Safety Checklist */}
          <div className="space-y-4 mb-6">
            <div className="flex items-center gap-2 mb-4">
              <CheckCircle className="w-5 h-5 text-green-600" />
              <span className="font-semibold text-gray-800">Check for:</span>
            </div>

            {safetyChecks.map((check, index) => (
              <div
                key={index}
                className={`flex items-center gap-3 p-3 rounded-lg border-2 cursor-pointer transition-all duration-200 ${
                  checkedItems[index]
                    ? "bg-green-50 border-green-300"
                    : "bg-white border-gray-200 hover:border-gray-300"
                }`}
                onClick={() => handleCheckItem(index)}
              >
                <span className="text-2xl">{check.icon}</span>
                <span className="flex-1 text-gray-800">{check.text}</span>
                <div
                  className={`w-6 h-6 rounded-full border-2 flex items-center justify-center ${
                    checkedItems[index] ? "bg-green-500 border-green-500" : "border-gray-300"
                  }`}
                >
                  {checkedItems[index] && <CheckCircle className="w-4 h-4 text-white" />}
                </div>
              </div>
            ))}
          </div>

          {/* Warning Message */}
          <Card className="bg-red-50 border-red-200 mb-6">
            <CardContent className="p-4">
              <div className="flex items-start gap-3">
                <AlertTriangle className="w-6 h-6 text-red-600 mt-1" />
                <div>
                  <div className="font-semibold text-red-800 mb-2">If ANY danger is present:</div>
                  <div className="text-red-700 space-y-1">
                    <div>• Stay back and guide emergency services to the scene</div>
                    <div>• Do not put yourself at risk</div>
                    <div>• You can't help if you're hurt</div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Safety Priority Message */}
          <div className="text-center mb-6 p-4 bg-blue-50 border border-blue-200 rounded-lg">
            <div className="flex items-center justify-center gap-2 mb-2">
              <Shield className="w-6 h-6 text-blue-600" />
              <span className="font-bold text-blue-800">Your safety comes first</span>
            </div>
            <p className="text-blue-700">You can't help if you're hurt.</p>
          </div>

          {/* Action Buttons */}
          <div className="space-y-3">
            <Button
              onClick={handleSceneSafe}
              className={`w-full h-14 text-lg font-semibold transition-all duration-200 ${
                allChecked
                  ? "bg-green-600 hover:bg-green-700 text-white"
                  : "bg-gray-300 text-gray-500 cursor-not-allowed"
              }`}
              disabled={!allChecked}
            >
              <CheckCircle className="w-6 h-6 mr-2" />
              SCENE IS SAFE - CONTINUE
            </Button>

            <Button
              onClick={handleSceneNotSafe}
              variant="outline"
              className="w-full h-14 text-lg font-semibold border-2 border-red-300 text-red-700 hover:bg-red-50 bg-transparent"
            >
              <AlertTriangle className="w-6 h-6 mr-2" />
              NOT SAFE - GUIDE FROM DISTANCE
            </Button>
          </div>

          {/* Voice Commands */}
          <Card className="mt-6 bg-blue-50 border-blue-200">
            <CardContent className="p-4">
              <div className="flex items-center gap-2 mb-2">
                <span className="text-xl">🎤</span>
                <span className="font-semibold text-blue-800">Voice Commands:</span>
              </div>
              <div className="text-sm text-blue-700 space-y-1">
                <div>"Scene is safe" → Continue to emergency response</div>
                <div>"Not safe" → Switch to remote guidance mode</div>
                <div>"Help me check" → Repeat safety checklist</div>
              </div>
            </CardContent>
          </Card>

          {/* Beta Disclaimer */}
          <div className="mt-4 text-center">
            <Badge variant="outline" className="bg-gray-100">
              ⚠️ BETA - Professional training recommended
            </Badge>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
