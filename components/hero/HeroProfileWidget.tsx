"use client"

import { useState } from "react"
import { Award } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"

interface HeroProfileWidgetProps {
  compact?: boolean
  showActions?: boolean
}

export default function HeroProfileWidget({ compact = false, showActions = true }: HeroProfileWidgetProps) {
  const [isExpanded, setIsExpanded] = useState(false)

  // Demo data - would come from database
  const heroData = {
    name: "Sarah Blackhorse",
    level: 7,
    points: 2847,
    nextLevelPoints: 3000,
    rank: "#3 in BC",
    recentBadges: ["Territory Protector", "Lightning Response"],
    stats: {
      livesImpacted: 23,
      volunteeredHours: 156,
      responseTime: "2.3 min",
    },
  }

  const levelProgress = (heroData.points / heroData.nextLevelPoints) * 100

  if (compact) {
    return (
      <Card className="bg-gradient-to-r from-purple-500/20 to-pink-500/20 border-purple-500/30">
        <CardContent className="p-4">
          <div className="flex items-center gap-3">
            <div className="relative">
              <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center">
                <Award className="w-6 h-6 text-white" />
              </div>
              <div className="absolute -bottom-1 -right-1 bg-yellow-400 text-black text-xs px-1 rounded-full font-bold">
                L{heroData.level}
              </div>
            </div>
            <div className="flex-1">
              <p className="font-semibold text-white">{heroData.name}</p>
              <p className="text-sm text-gray-300">
                {heroData.rank} • {heroData.points} pts
              </p>
            </div>
            {showActions && (
              <Button size="sm" className="bg-purple-500 hover:bg-purple-600">
                View Profile
              </Button>
            )}
          </div>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card className="bg-white/10 border-white/20">
      <CardHeader>
        <CardTitle className="text-white flex items-center gap-2">
          <Award className="w-5 h-5 text-yellow-400" />
          Hero Profile
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex items-center gap-4">
          <div className="relative">
            <div className="w-16 h-16 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center">
              <Award className="w-8 h-8 text-white" />
            </div>
            <div className="absolute -bottom-1 -right-1 bg-yellow-400 text-black px-2 py-1 rounded-full text-sm font-bold">
              L{heroData.level}
            </div>
          </div>
          <div>
            <h3 className="text-lg font-bold text-white">{heroData.name}</h3>
            <p className="text-gray-300">{heroData.rank}</p>
            <div className="flex gap-2 mt-1">
              {heroData.recentBadges.map((badge, index) => (
                <Badge key={index} variant="outline" className="text-xs">
                  {badge}
                </Badge>
              ))}
            </div>
          </div>
        </div>

        <div>
          <div className="flex justify-between text-sm mb-2">
            <span className="text-gray-300">Level Progress</span>
            <span className="text-white">
              {heroData.points}/{heroData.nextLevelPoints}
            </span>
          </div>
          <Progress value={levelProgress} className="h-2" />
        </div>

        {isExpanded && (
          <div className="grid grid-cols-3 gap-4 pt-4 border-t border-white/20">
            <div className="text-center">
              <p className="text-2xl font-bold text-green-400">{heroData.stats.livesImpacted}</p>
              <p className="text-xs text-gray-300">Lives Impacted</p>
            </div>
            <div className="text-center">
              <p className="text-2xl font-bold text-blue-400">{heroData.stats.volunteeredHours}</p>
              <p className="text-xs text-gray-300">Hours Volunteered</p>
            </div>
            <div className="text-center">
              <p className="text-2xl font-bold text-yellow-400">{heroData.stats.responseTime}</p>
              <p className="text-xs text-gray-300">Avg Response</p>
            </div>
          </div>
        )}

        {showActions && (
          <div className="flex gap-2">
            <Button size="sm" onClick={() => setIsExpanded(!isExpanded)} variant="outline" className="flex-1">
              {isExpanded ? "Show Less" : "Show Stats"}
            </Button>
            <Button size="sm" className="flex-1 bg-purple-500 hover:bg-purple-600">
              Full Profile
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  )
}
