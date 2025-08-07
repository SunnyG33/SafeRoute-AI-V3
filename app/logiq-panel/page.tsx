"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ArrowLeft, Activity, AlertTriangle, CheckCircle, Brain, FileText, Clock, User } from 'lucide-react'

type Evidence = {
  id: string
  source: string
  type: 'vital' | 'symptom' | 'history' | 'environmental'
  data: string
  confidence: number
  timestamp: string
}

type Recommendation = {
  id: string
  protocol: string
  priority: 'high' | 'medium' | 'low'
  action: string
  justification: string
  evidence: string[]
}

export default function LOGIQPanelPage() {
  const [showJustification, setShowJustification] = useState(false)
  const [selectedEvidence, setSelectedEvidence] = useState<string | null>(null)

  const mockEvidence: Evidence[] = [
    {
      id: 'e1',
      source: 'Civilian Check-in',
      type: 'symptom',
      data: 'Chest pain, difficulty breathing',
      confidence: 85,
      timestamp: '2 min ago'
    },
    {
      id: 'e2',
      source: 'Location Data',
      type: 'environmental',
      data: 'Remote location, 15km from hospital',
      confidence: 95,
      timestamp: '2 min ago'
    },
    {
      id: 'e3',
      source: 'SafeShare Record',
      type: 'history',
      data: 'Previous cardiac event (2019)',
      confidence: 90,
      timestamp: '1 min ago'
    },
    {
      id: 'e4',
      source: 'Mesh Network',
      type: 'vital',
      data: 'Heart rate: 110 bpm (estimated)',
      confidence: 70,
      timestamp: '30 sec ago'
    }
  ]

  const mockRecommendations: Recommendation[] = [
    {
      id: 'r1',
      protocol: 'Cardiac Emergency Response',
      priority: 'high',
      action: 'Dispatch ALS unit immediately, prepare for cardiac intervention',
      justification: 'High probability cardiac event based on symptoms + history',
      evidence: ['e1', 'e3']
    },
    {
      id: 'r2',
      protocol: 'Remote Location Protocol',
      priority: 'high',
      action: 'Consider helicopter transport due to distance',
      justification: 'Remote location exceeds ground transport time thresholds',
      evidence: ['e2']
    },
    {
      id: 'r3',
      protocol: 'Continuous Monitoring',
      priority: 'medium',
      action: 'Establish continuous vital monitoring via mesh network',
      justification: 'Limited initial vitals data, need ongoing assessment',
      evidence: ['e4']
    }
  ]

  return (
    <main className="min-h-screen bg-gradient-to-br from-purple-50 to-slate-50">
      <header className="sticky top-0 z-10 border-b bg-white/90 backdrop-blur">
        <div className="container mx-auto px-4 py-3 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Link href="/landing">
              <Button variant="outline" className="border-2">
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back
              </Button>
            </Link>
            <h1 className="text-xl font-bold">LOGIQ™ Evidence Engine</h1>
          </div>
          <div className="flex items-center gap-3">
            <Badge className="bg-purple-100 text-purple-800 border-2 border-purple-600">
              <Brain className="h-3 w-3 mr-1" />
              AI Recommendations
            </Badge>
            <Button 
              variant={showJustification ? "default" : "outline"}
              onClick={() => setShowJustification(!showJustification)}
              className="border-2"
            >
              Show Medical Justification
            </Button>
          </div>
        </div>
      </header>

      <section className="container mx-auto px-4 py-6">
        <Tabs defaultValue="evidence" className="space-y-6">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="evidence">Evidence Sources</TabsTrigger>
            <TabsTrigger value="recommendations">Protocol Recommendations</TabsTrigger>
            <TabsTrigger value="audit">Decision Audit</TabsTrigger>
          </TabsList>

          <TabsContent value="evidence" className="space-y-6">
            <Card className="border-l-8 border-l-purple-600">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <FileText className="h-5 w-5 text-purple-700" />
                  Evidence Source Evaluation
                </CardTitle>
                <CardDescription>
                  Real-time analysis of incoming data sources with confidence scoring
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {mockEvidence.map((evidence) => (
                    <div 
                      key={evidence.id}
                      className={`p-4 rounded-lg border-2 cursor-pointer transition-colors ${
                        selectedEvidence === evidence.id 
                          ? 'border-purple-600 bg-purple-50' 
                          : 'border-slate-200 bg-white hover:border-slate-300'
                      }`}
                      onClick={() => setSelectedEvidence(evidence.id)}
                    >
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center gap-2">
                          <Badge className={`${
                            evidence.type === 'vital' ? 'bg-red-100 text-red-800 border-red-600' :
                            evidence.type === 'symptom' ? 'bg-amber-100 text-amber-800 border-amber-600' :
                            evidence.type === 'history' ? 'bg-blue-100 text-blue-800 border-blue-600' :
                            'bg-green-100 text-green-800 border-green-600'
                          } border-2`}>
                            {evidence.type}
                          </Badge>
                          <span className="font-semibold">{evidence.source}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <div className={`w-3 h-3 rounded-full ${
                            evidence.confidence >= 90 ? 'bg-emerald-500' :
                            evidence.confidence >= 70 ? 'bg-amber-500' :
                            'bg-red-500'
                          }`} />
                          <span className="text-sm font-medium">{evidence.confidence}%</span>
                          <span className="text-xs text-slate-500">{evidence.timestamp}</span>
                        </div>
                      </div>
                      <div className="text-slate-700">{evidence.data}</div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="recommendations" className="space-y-6">
            <Card className="border-l-8 border-l-blue-600">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Activity className="h-5 w-5 text-blue-700" />
                  Protocol Engine Recommendations
                </CardTitle>
                <CardDescription>
                  AI-generated protocol suggestions based on evidence analysis
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {mockRecommendations.map((rec) => (
                    <Card key={rec.id} className={`border-2 ${
                      rec.priority === 'high' ? 'border-red-600' :
                      rec.priority === 'medium' ? 'border-amber-600' :
                      'border-green-600'
                    }`}>
                      <CardHeader className="pb-3">
                        <div className="flex items-center justify-between">
                          <CardTitle className="text-lg">{rec.protocol}</CardTitle>
                          <Badge className={`border-2 ${
                            rec.priority === 'high' ? 'bg-red-100 text-red-800 border-red-600' :
                            rec.priority === 'medium' ? 'bg-amber-100 text-amber-800 border-amber-600' :
                            'bg-green-100 text-green-800 border-green-600'
                          }`}>
                            {rec.priority.toUpperCase()} PRIORITY
                          </Badge>
                        </div>
                      </CardHeader>
                      <CardContent className="space-y-3">
                        <div>
                          <div className="font-semibold text-slate-800 mb-1">Recommended Action:</div>
                          <div className="text-slate-700">{rec.action}</div>
                        </div>
                        
                        {showJustification && (
                          <div className="p-3 rounded-lg border-2 border-blue-200 bg-blue-50">
                            <div className="font-semibold text-blue-800 mb-1">Medical Justification:</div>
                            <div className="text-blue-700 text-sm">{rec.justification}</div>
                            <div className="mt-2">
                              <div className="text-xs text-blue-600 mb-1">Based on evidence:</div>
                              <div className="flex gap-2">
                                {rec.evidence.map((evidenceId) => {
                                  const evidence = mockEvidence.find(e => e.id === evidenceId)
                                  return evidence ? (
                                    <Badge key={evidenceId} className="bg-white text-blue-700 border-2 border-blue-600 text-xs">
                                      {evidence.source}
                                    </Badge>
                                  ) : null
                                })}
                              </div>
                            </div>
                          </div>
                        )}

                        <div className="flex gap-2">
                          <Button className="bg-emerald-600 hover:bg-emerald-700 text-white border-2 border-black">
                            <CheckCircle className="h-4 w-4 mr-2" />
                            Accept Recommendation
                          </Button>
                          <Button variant="outline" className="border-2">
                            Modify Protocol
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card className="border-2 border-amber-600 bg-amber-50">
              <CardContent className="p-4">
                <div className="flex items-start gap-3">
                  <AlertTriangle className="h-5 w-5 text-amber-700 mt-0.5" />
                  <div>
                    <div className="font-semibold text-amber-800">Important Notice</div>
                    <div className="text-sm text-amber-700">
                      LOGIQ recommendations are decision support tools only. All medical decisions 
                      must be made by qualified healthcare professionals based on their clinical judgment.
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="audit" className="space-y-6">
            <Card className="border-l-8 border-l-slate-600">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Clock className="h-5 w-5 text-slate-700" />
                  Decision Audit Trail
                </CardTitle>
                <CardDescription>
                  Complete log of recommendations, decisions, and outcomes
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="p-4 rounded-lg border-2 border-slate-200 bg-white">
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-2">
                        <User className="h-4 w-4 text-slate-600" />
                        <span className="font-semibold">Responder #1</span>
                      </div>
                      <span className="text-xs text-slate-500">2 min ago</span>
                    </div>
                    <div className="text-sm text-slate-700">
                      Accepted LOGIQ recommendation: "Dispatch ALS unit immediately"
                    </div>
                    <Badge className="mt-2 bg-emerald-100 text-emerald-800 border-2 border-emerald-600">
                      Recommendation Accepted
                    </Badge>
                  </div>

                  <div className="p-4 rounded-lg border-2 border-slate-200 bg-white">
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-2">
                        <Brain className="h-4 w-4 text-purple-600" />
                        <span className="font-semibold">LOGIQ Engine</span>
                      </div>
                      <span className="text-xs text-slate-500">3 min ago</span>
                    </div>
                    <div className="text-sm text-slate-700">
                      Generated cardiac emergency protocol based on 4 evidence sources (avg confidence: 85%)
                    </div>
                    <Badge className="mt-2 bg-purple-100 text-purple-800 border-2 border-purple-600">
                      AI Analysis Complete
                    </Badge>
                  </div>

                  <div className="p-4 rounded-lg border-2 border-slate-200 bg-white">
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-2">
                        <FileText className="h-4 w-4 text-blue-600" />
                        <span className="font-semibold">SafeShare System</span>
                      </div>
                      <span className="text-xs text-slate-500">4 min ago</span>
                    </div>
                    <div className="text-sm text-slate-700">
                      Medical history accessed with patient consent (Cardiac event 2019)
                    </div>
                    <Badge className="mt-2 bg-blue-100 text-blue-800 border-2 border-blue-600">
                      Consent Granted
                    </Badge>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </section>
    </main>
  )
}
