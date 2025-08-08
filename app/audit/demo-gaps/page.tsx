"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { CheckCircle, Circle, Clock, AlertTriangle, FileText, Users, Zap } from 'lucide-react'
import { DEMO_GAPS, type DemoGap } from "@/data/demo-gaps"

export default function DemoGapsAuditPage() {
  const [selectedCategory, setSelectedCategory] = useState<string>("All")
  const [selectedStatus, setSelectedStatus] = useState<string>("All")
  const [checkedItems, setCheckedItems] = useState<Set<string>>(new Set())

  // Load checked items from localStorage
  useEffect(() => {
    const saved = localStorage.getItem("demo-gaps-checked")
    if (saved) {
      setCheckedItems(new Set(JSON.parse(saved)))
    }
  }, [])

  // Save checked items to localStorage
  useEffect(() => {
    localStorage.setItem("demo-gaps-checked", JSON.stringify([...checkedItems]))
  }, [checkedItems])

  const toggleChecked = (id: string) => {
    const newChecked = new Set(checkedItems)
    if (newChecked.has(id)) {
      newChecked.delete(id)
    } else {
      newChecked.add(id)
    }
    setCheckedItems(newChecked)
  }

  const filteredGaps = DEMO_GAPS.filter(gap => {
    if (selectedCategory !== "All" && gap.category !== selectedCategory) return false
    if (selectedStatus !== "All" && gap.status !== selectedStatus) return false
    return true
  })

  const getStatusIcon = (status: DemoGap["status"]) => {
    switch (status) {
      case "Complete": return <CheckCircle className="h-4 w-4 text-green-600" />
      case "Partial": return <Circle className="h-4 w-4 text-yellow-600" />
      case "Coming Soon": return <Clock className="h-4 w-4 text-blue-600" />
      case "Missing": return <AlertTriangle className="h-4 w-4 text-red-600" />
    }
  }

  const getStatusColor = (status: DemoGap["status"]) => {
    switch (status) {
      case "Complete": return "bg-green-100 text-green-800 border-green-300"
      case "Partial": return "bg-yellow-100 text-yellow-800 border-yellow-300"
      case "Coming Soon": return "bg-blue-100 text-blue-800 border-blue-300"
      case "Missing": return "bg-red-100 text-red-800 border-red-300"
    }
  }

  const getPriorityColor = (priority: DemoGap["priority"]) => {
    switch (priority) {
      case "High": return "bg-red-100 text-red-800"
      case "Medium": return "bg-yellow-100 text-yellow-800"
      case "Low": return "bg-green-100 text-green-800"
    }
  }

  const getCategoryIcon = (category: DemoGap["category"]) => {
    switch (category) {
      case "Civilian": return <Users className="h-4 w-4" />
      case "Responder": return <FileText className="h-4 w-4" />
      case "Cross-cutting": return <Zap className="h-4 w-4" />
    }
  }

  // Calculate progress
  const totalGaps = DEMO_GAPS.length
  const completeGaps = DEMO_GAPS.filter(g => g.status === "Complete").length
  const partialGaps = DEMO_GAPS.filter(g => g.status === "Partial").length
  const progressPercent = Math.round(((completeGaps + partialGaps * 0.5) / totalGaps) * 100)

  return (
    <main className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-6 max-w-6xl">
        <Card className="border-2 border-blue-500 shadow-xl mb-6">
          <CardHeader className="bg-blue-600 text-white">
            <CardTitle className="flex items-center gap-3 text-xl">
              <FileText className="h-6 w-6" />
              Demo Gap Audit
              <Badge variant="secondary" className="bg-blue-700 text-white">
                {progressPercent}% Complete
              </Badge>
            </CardTitle>
          </CardHeader>
          <CardContent className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
              <div className="text-center">
                <div className="text-2xl font-bold text-green-600">{completeGaps}</div>
                <div className="text-sm text-gray-600">Complete</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-yellow-600">{partialGaps}</div>
                <div className="text-sm text-gray-600">Partial</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-blue-600">
                  {DEMO_GAPS.filter(g => g.status === "Coming Soon").length}
                </div>
                <div className="text-sm text-gray-600">Coming Soon</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-red-600">
                  {DEMO_GAPS.filter(g => g.status === "Missing").length}
                </div>
                <div className="text-sm text-gray-600">Missing</div>
              </div>
            </div>
            <Progress value={progressPercent} className="h-3" />
          </CardContent>
        </Card>

        {/* Filters */}
        <Card className="mb-6">
          <CardContent className="p-4">
            <div className="flex flex-wrap gap-4">
              <div className="flex items-center gap-2">
                <span className="text-sm font-medium">Category:</span>
                <select
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                  className="border rounded px-2 py-1 text-sm"
                >
                  <option value="All">All</option>
                  <option value="Civilian">Civilian</option>
                  <option value="Responder">Responder</option>
                  <option value="Cross-cutting">Cross-cutting</option>
                </select>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-sm font-medium">Status:</span>
                <select
                  value={selectedStatus}
                  onChange={(e) => setSelectedStatus(e.target.value)}
                  className="border rounded px-2 py-1 text-sm"
                >
                  <option value="All">All</option>
                  <option value="Complete">Complete</option>
                  <option value="Partial">Partial</option>
                  <option value="Coming Soon">Coming Soon</option>
                  <option value="Missing">Missing</option>
                </select>
              </div>
              <div className="ml-auto">
                <Button
                  variant="outline"
                  onClick={() => setCheckedItems(new Set())}
                  className="text-sm"
                >
                  Clear Checks
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Gap List */}
        <div className="space-y-4">
          {filteredGaps.map((gap) => (
            <Card key={gap.id} className="border-l-4 border-l-blue-500">
              <CardContent className="p-4">
                <div className="flex items-start justify-between mb-3">
                  <div className="flex items-center gap-3">
                    <button
                      onClick={() => toggleChecked(gap.id)}
                      className="text-blue-600 hover:text-blue-800"
                    >
                      {checkedItems.has(gap.id) ? (
                        <CheckCircle className="h-5 w-5" />
                      ) : (
                        <Circle className="h-5 w-5" />
                      )}
                    </button>
                    <div className="flex items-center gap-2">
                      {getCategoryIcon(gap.category)}
                      <span className="font-semibold text-lg">{gap.feature}</span>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Badge className={getPriorityColor(gap.priority)}>
                      {gap.priority}
                    </Badge>
                    <Badge className={`border ${getStatusColor(gap.status)}`}>
                      {getStatusIcon(gap.status)}
                      <span className="ml-1">{gap.status}</span>
                    </Badge>
                  </div>
                </div>

                <div className="mb-3">
                  <p className="text-gray-700">{gap.description}</p>
                </div>

                <div className="flex items-center justify-between text-sm">
                  <div className="flex items-center gap-4">
                    <Badge variant="outline" className="text-xs">
                      {gap.category}
                    </Badge>
                    {gap.patentRef && (
                      <span className="text-blue-600">📋 {gap.patentRef}</span>
                    )}
                    {gap.evidenceNeeded && (
                      <span className="text-orange-600">🔬 Evidence Needed</span>
                    )}
                  </div>
                  <span className="text-gray-500 font-mono">{gap.id}</span>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {filteredGaps.length === 0 && (
          <Card>
            <CardContent className="p-8 text-center">
              <div className="text-gray-500">No gaps match the current filters.</div>
            </CardContent>
          </Card>
        )}
      </div>
    </main>
  )
}
