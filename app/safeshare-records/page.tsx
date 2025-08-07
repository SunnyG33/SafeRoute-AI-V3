"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ArrowLeft, Stethoscope, Shield, AlertTriangle, CheckCircle, Lock, Unlock, User, Clock, FileText } from 'lucide-react'

type PatientRecord = {
  id: string
  name: string
  age: number
  conditions: string[]
  medications: string[]
  allergies: string[]
  emergencyContact: string
  consentStatus: 'granted' | 'denied' | 'expired' | 'override'
  lastUpdated: string
}

type AuditEntry = {
  id: string
  timestamp: string
  action: string
  user: string
  justification?: string
  recordId: string
}

export default function SafeShareRecordsPage() {
  const [selectedRecord, setSelectedRecord] = useState<string | null>(null)
  const [showOverrideDialog, setShowOverrideDialog] = useState(false)

  const mockRecords: PatientRecord[] = [
    {
      id: 'p1',
      name: 'John D.',
      age: 45,
      conditions: ['Hypertension', 'Previous MI (2019)'],
      medications: ['Metoprolol', 'Lisinopril', 'Aspirin'],
      allergies: ['Penicillin'],
      emergencyContact: 'Sarah D. - (555) 123-4567',
      consentStatus: 'granted',
      lastUpdated: '2 min ago'
    },
    {
      id: 'p2',
      name: 'Maria S.',
      age: 67,
      conditions: ['Diabetes Type 2', 'COPD'],
      medications: ['Metformin', 'Albuterol'],
      allergies: ['None known'],
      emergencyContact: 'Carlos S. - (555) 987-6543',
      consentStatus: 'denied',
      lastUpdated: '5 min ago'
    },
    {
      id: 'p3',
      name: 'Anonymous',
      age: 32,
      conditions: ['Unknown'],
      medications: ['Unknown'],
      allergies: ['Unknown'],
      emergencyContact: 'Not provided',
      consentStatus: 'override',
      lastUpdated: '1 min ago'
    }
  ]

  const mockAuditTrail: AuditEntry[] = [
    {
      id: 'a1',
      timestamp: '2 min ago',
      action: 'Record accessed with consent',
      user: 'Responder #1',
      recordId: 'p1'
    },
    {
      id: 'a2',
      timestamp: '3 min ago',
      action: 'Consent granted by patient',
      user: 'John D.',
      recordId: 'p1'
    },
    {
      id: 'a3',
      timestamp: '1 min ago',
      action: 'Emergency override activated',
      user: 'Dr. Smith',
      justification: 'Patient unconscious, life-threatening emergency',
      recordId: 'p3'
    },
    {
      id: 'a4',
      timestamp: '5 min ago',
      action: 'Access denied - consent refused',
      user: 'Responder #2',
      recordId: 'p2'
    }
  ]

  const handleOverride = (recordId: string) => {
    setShowOverrideDialog(true)
    // In real app, would show override justification form
    setTimeout(() => {
      setShowOverrideDialog(false)
      alert('Override logged. Access granted for emergency purposes.')
    }, 2000)
  }

  return (
    <main className="min-h-screen bg-gradient-to-br from-amber-50 to-slate-50">
      <header className="sticky top-0 z-10 border-b bg-white/90 backdrop-blur">
        <div className="container mx-auto px-4 py-3 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Link href="/landing">
              <Button variant="outline" className="border-2">
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back
              </Button>
            </Link>
            <h1 className="text-xl font-bold">SafeShare™ Records</h1>
          </div>
          <Badge className="bg-amber-100 text-amber-800 border-2 border-amber-600">
            <Shield className="h-3 w-3 mr-1" />
            Encrypted • OCAP Compliant
          </Badge>
        </div>
      </header>

      <section className="container mx-auto px-4 py-6">
        <Tabs defaultValue="records" className="space-y-6">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="records">Patient Records</TabsTrigger>
            <TabsTrigger value="consent">Consent Management</TabsTrigger>
            <TabsTrigger value="audit">Audit Trail</TabsTrigger>
          </TabsList>

          <TabsContent value="records" className="space-y-6">
            <Card className="border-l-8 border-l-amber-600">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Stethoscope className="h-5 w-5 text-amber-700" />
                  Patient Record Viewer
                </CardTitle>
                <CardDescription>
                  Consent-based access to patient medical records with emergency override capability
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-4">
                  {mockRecords.map((record) => (
                    <Card 
                      key={record.id} 
                      className={`border-2 cursor-pointer transition-colors ${
                        selectedRecord === record.id 
                          ? 'border-amber-600 bg-amber-50' 
                          : 'border-slate-200 hover:border-slate-300'
                      }`}
                      onClick={() => setSelectedRecord(record.id)}
                    >
                      <CardHeader className="pb-3">
                        <div className="flex items-center justify-between">
                          <CardTitle className="text-lg">{record.name}</CardTitle>
                          <div className="flex items-center gap-1">
                            {record.consentStatus === 'granted' ? (
                              <Unlock className="h-4 w-4 text-emerald-600" />
                            ) : record.consentStatus === 'override' ? (
                              <AlertTriangle className="h-4 w-4 text-red-600" />
                            ) : (
                              <Lock className="h-4 w-4 text-slate-600" />
                            )}
                            <Badge className={`border-2 text-xs ${
                              record.consentStatus === 'granted' ? 'bg-emerald-100 text-emerald-800 border-emerald-600' :
                              record.consentStatus === 'override' ? 'bg-red-100 text-red-800 border-red-600' :
                              'bg-slate-100 text-slate-800 border-slate-600'
                            }`}>
                              {record.consentStatus}
                            </Badge>
                          </div>
                        </div>
                        <CardDescription>Age: {record.age} • Updated: {record.lastUpdated}</CardDescription>
                      </CardHeader>
                      <CardContent className="space-y-3">
                        {record.consentStatus === 'granted' || record.consentStatus === 'override' ? (
                          <>
                            <div>
                              <div className="font-semibold text-sm text-slate-700">Conditions:</div>
                              <div className="text-sm text-slate-600">{record.conditions.join(', ')}</div>
                            </div>
                            <div>
                              <div className="font-semibold text-sm text-slate-700">Medications:</div>
                              <div className="text-sm text-slate-600">{record.medications.join(', ')}</div>
                            </div>
                            <div>
                              <div className="font-semibold text-sm text-slate-700">Allergies:</div>
                              <div className="text-sm text-slate-600">{record.allergies.join(', ')}</div>
                            </div>
                            <div>
                              <div className="font-semibold text-sm text-slate-700">Emergency Contact:</div>
                              <div className="text-sm text-slate-600">{record.emergencyContact}</div>
                            </div>
                          </>
                        ) : (
                          <div className="text-center py-4">
                            <Lock className="h-8 w-8 text-slate-400 mx-auto mb-2" />
                            <div className="text-sm text-slate-600 mb-3">Access denied - consent required</div>
                            <Button 
                              onClick={(e) => {
                                e.stopPropagation()
                                handleOverride(record.id)
                              }}
                              className="bg-red-600 hover:bg-red-700 text-white border-2 border-black text-xs"
                            >
                              Emergency Override
                            </Button>
                          </div>
                        )}
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="consent" className="space-y-6">
            <Card className="border-l-8 border-l-blue-600">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Shield className="h-5 w-5 text-blue-700" />
                  Consent Management
                </CardTitle>
                <CardDescription>
                  Manage patient consent for medical record access during emergencies
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="p-4 rounded-lg border-2 border-emerald-200 bg-emerald-50 text-center">
                    <CheckCircle className="h-8 w-8 text-emerald-600 mx-auto mb-2" />
                    <div className="font-semibold text-emerald-800">Consent Granted</div>
                    <div className="text-2xl font-bold text-emerald-700">1</div>
                    <div className="text-xs text-emerald-600">Active consents</div>
                  </div>
                  <div className="p-4 rounded-lg border-2 border-red-200 bg-red-50 text-center">
                    <Lock className="h-8 w-8 text-red-600 mx-auto mb-2" />
                    <div className="font-semibold text-red-800">Access Denied</div>
                    <div className="text-2xl font-bold text-red-700">1</div>
                    <div className="text-xs text-red-600">Denied requests</div>
                  </div>
                  <div className="p-4 rounded-lg border-2 border-amber-200 bg-amber-50 text-center">
                    <AlertTriangle className="h-8 w-8 text-amber-600 mx-auto mb-2" />
                    <div className="font-semibold text-amber-800">Emergency Override</div>
                    <div className="text-2xl font-bold text-amber-700">1</div>
                    <div className="text-xs text-amber-600">Override active</div>
                  </div>
                </div>

                <Card className="border-2 border-blue-200">
                  <CardHeader>
                    <CardTitle className="text-lg">Consent Request Protocol</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="p-3 rounded-lg border-2 border-slate-200 bg-slate-50">
                      <div className="font-semibold text-slate-800 mb-2">Standard Consent Process:</div>
                      <ol className="text-sm text-slate-700 space-y-1">
                        <li>1. Patient receives consent request via SafeRoute app</li>
                        <li>2. Patient reviews requested data access scope</li>
                        <li>3. Patient grants/denies consent with digital signature</li>
                        <li>4. Decision logged in audit trail with timestamp</li>
                      </ol>
                    </div>
                    
                    <div className="p-3 rounded-lg border-2 border-red-200 bg-red-50">
                      <div className="font-semibold text-red-800 mb-2">Emergency Override Protocol:</div>
                      <ol className="text-sm text-red-700 space-y-1">
                        <li>1. Responder identifies life-threatening emergency</li>
                        <li>2. Override request submitted with medical justification</li>
                        <li>3. Senior medical officer approval required</li>
                        <li>4. Access granted with full audit logging</li>
                        <li>5. Patient notified post-emergency when possible</li>
                      </ol>
                    </div>
                  </CardContent>
                </Card>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="audit" className="space-y-6">
            <Card className="border-l-8 border-l-slate-600">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Clock className="h-5 w-5 text-slate-700" />
                  Access Audit Trail
                </CardTitle>
                <CardDescription>
                  Complete log of all record access attempts, consents, and overrides
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {mockAuditTrail.map((entry) => (
                    <div key={entry.id} className="p-4 rounded-lg border-2 border-slate-200 bg-white">
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center gap-2">
                          <User className="h-4 w-4 text-slate-600" />
                          <span className="font-semibold">{entry.user}</span>
                        </div>
                        <span className="text-xs text-slate-500">{entry.timestamp}</span>
                      </div>
                      <div className="text-sm text-slate-700 mb-2">{entry.action}</div>
                      {entry.justification && (
                        <div className="p-2 rounded border-2 border-amber-200 bg-amber-50">
                          <div className="text-xs font-semibold text-amber-800">Justification:</div>
                          <div className="text-xs text-amber-700">{entry.justification}</div>
                        </div>
                      )}
                      <Badge className="mt-2 bg-slate-100 text-slate-700 border-2 border-slate-400 text-xs">
                        Record ID: {entry.recordId}
                      </Badge>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </section>

      {showOverrideDialog && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <Card className="w-full max-w-md border-4 border-red-600">
            <CardHeader>
              <CardTitle className="text-red-800">Emergency Override</CardTitle>
              <CardDescription>Processing emergency access request...</CardDescription>
            </CardHeader>
            <CardContent className="text-center py-8">
              <AlertTriangle className="h-12 w-12 text-red-600 mx-auto mb-4 animate-pulse" />
              <div className="text-sm text-slate-600">
                Logging override justification and notifying senior medical officer...
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </main>
  )
}
