"use client"

import Link from "next/link"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Heart, Shield, Users, Building2, Stethoscope, MapPin, Satellite, Radio, Zap, Globe, UserCheck, Activity } from 'lucide-react'

export default function LandingPage() {
  const [userType, setUserType] = useState<'civilian' | 'responder' | null>(null)

  if (userType === null) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-blue-50 to-slate-50 flex items-center justify-center p-4">
        <Card className="w-full max-w-2xl border-4 border-slate-800 shadow-2xl">
          <CardHeader className="text-center pb-8">
            <div className="mx-auto mb-6 w-24 h-24 bg-gradient-to-br from-emerald-600 to-blue-600 rounded-full flex items-center justify-center">
              <Shield className="h-12 w-12 text-white" />
            </div>
            <CardTitle className="text-4xl font-bold text-slate-800 mb-4">
              🛡️ SafeRoute AI
            </CardTitle>
            <CardDescription className="text-lg text-slate-600 max-w-lg mx-auto">
              Indigenous-First Emergency Response Platform powered by Starlink satellite technology, 
              connecting remote communities with life-saving emergency services.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="text-center mb-8">
              <h3 className="text-xl font-semibold text-slate-700 mb-4">Choose Your Portal</h3>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Button
                onClick={() => setUserType('civilian')}
                className="h-32 bg-emerald-600 hover:bg-emerald-700 text-white border-4 border-slate-800 flex flex-col items-center justify-center space-y-3 text-lg font-bold"
              >
                <UserCheck className="h-8 w-8" />
                <span>I'm a Civilian</span>
                <span className="text-sm font-normal opacity-90">Safety Check-In • Emergency Help</span>
              </Button>
              
              <Button
                onClick={() => setUserType('responder')}
                className="h-32 bg-blue-600 hover:bg-blue-700 text-white border-4 border-slate-800 flex flex-col items-center justify-center space-y-3 text-lg font-bold"
              >
                <Shield className="h-8 w-8" />
                <span>I'm a Responder</span>
                <span className="text-sm font-normal opacity-90">EMS • Fire • Hospital • SAR</span>
              </Button>
            </div>

            <div className="flex flex-wrap justify-center gap-2 pt-6">
              <Badge className="bg-emerald-100 text-emerald-800 border-2 border-emerald-600">
                <Satellite className="h-3 w-3 mr-1" />
                Starlink Ready
              </Badge>
              <Badge className="bg-blue-100 text-blue-800 border-2 border-blue-600">
                <Radio className="h-3 w-3 mr-1" />
                Mesh Network
              </Badge>
              <Badge className="bg-amber-100 text-amber-800 border-2 border-amber-600">
                <Globe className="h-3 w-3 mr-1" />
                TLRT Compliant
              </Badge>
            </div>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-blue-50 to-slate-50">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-white/90 backdrop-blur border-b-4 border-slate-800">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-br from-emerald-600 to-blue-600 rounded-full flex items-center justify-center">
              <Shield className="h-6 w-6 text-white" />
            </div>
            <h1 className="text-2xl font-bold text-slate-800">SafeRoute AI</h1>
          </div>
          <div className="flex items-center gap-3">
            <Badge className={`border-2 ${userType === 'civilian' ? 'bg-emerald-100 text-emerald-800 border-emerald-600' : 'bg-blue-100 text-blue-800 border-blue-600'}`}>
              {userType === 'civilian' ? 'Civilian Portal' : 'Responder Portal'}
            </Badge>
            <Button 
              variant="outline" 
              onClick={() => setUserType(null)}
              className="border-2 border-slate-800"
            >
              Switch Portal
            </Button>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="container mx-auto px-4 py-12">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-slate-800 mb-4">
            {userType === 'civilian' ? 'Civilian Emergency Portal' : 'Emergency Response Command'}
          </h2>
          <p className="text-xl text-slate-600 max-w-3xl mx-auto">
            {userType === 'civilian' 
              ? 'Indigenous-First emergency response with consent-based sharing, offline capabilities, and cultural protocols.'
              : 'Real-time incident management with LOGIQ recommendations, SafeShare records, and RAPTRnav routing.'
            }
          </p>
        </div>

        {/* Main Portal Buttons */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {userType === 'civilian' ? (
            <>
              <Link href="/civilian-portal">
                <Card className="h-48 border-4 border-emerald-600 hover:border-emerald-800 transition-colors cursor-pointer group">
                  <CardContent className="h-full flex flex-col items-center justify-center text-center p-6">
                    <UserCheck className="h-12 w-12 text-emerald-600 group-hover:text-emerald-800 mb-4" />
                    <h3 className="text-xl font-bold text-slate-800 mb-2">Safety Check-In</h3>
                    <p className="text-slate-600">Consent-first status updates with TLRT recognition</p>
                  </CardContent>
                </Card>
              </Link>

              <Link href="/hero-mode-landing">
                <Card className="h-48 border-4 border-red-600 hover:border-red-800 transition-colors cursor-pointer group">
                  <CardContent className="h-full flex flex-col items-center justify-center text-center p-6">
                    <Heart className="h-12 w-12 text-red-600 group-hover:text-red-800 mb-4" />
                    <h3 className="text-xl font-bold text-slate-800 mb-2">Hero Mode</h3>
                    <p className="text-slate-600">CPR • Bleeding • Choking • Stroke guidance</p>
                  </CardContent>
                </Card>
              </Link>

              <Link href="/raptrNav-civilian">
                <Card className="h-48 border-4 border-blue-600 hover:border-blue-800 transition-colors cursor-pointer group">
                  <CardContent className="h-full flex flex-col items-center justify-center text-center p-6">
                    <MapPin className="h-12 w-12 text-blue-600 group-hover:text-blue-800 mb-4" />
                    <h3 className="text-xl font-bold text-slate-800 mb-2">RAPTRnav</h3>
                    <p className="text-slate-600">Offline routing • Mesh • Satellite fallback</p>
                  </CardContent>
                </Card>
              </Link>
            </>
          ) : (
            <>
              <Link href="/responder-portal">
                <Card className="h-48 border-4 border-blue-600 hover:border-blue-800 transition-colors cursor-pointer group">
                  <CardContent className="h-full flex flex-col items-center justify-center text-center p-6">
                    <Shield className="h-12 w-12 text-blue-600 group-hover:text-blue-800 mb-4" />
                    <h3 className="text-xl font-bold text-slate-800 mb-2">Live Dashboard</h3>
                    <p className="text-slate-600">Real-time civilian check-ins and assignments</p>
                  </CardContent>
                </Card>
              </Link>

              <Link href="/logiq-panel">
                <Card className="h-48 border-4 border-purple-600 hover:border-purple-800 transition-colors cursor-pointer group">
                  <CardContent className="h-full flex flex-col items-center justify-center text-center p-6">
                    <Activity className="h-12 w-12 text-purple-600 group-hover:text-purple-800 mb-4" />
                    <h3 className="text-xl font-bold text-slate-800 mb-2">LOGIQ Engine</h3>
                    <p className="text-slate-600">Evidence evaluation • Protocol recommendations</p>
                  </CardContent>
                </Card>
              </Link>

              <Link href="/safeshare-records">
                <Card className="h-48 border-4 border-amber-600 hover:border-amber-800 transition-colors cursor-pointer group">
                  <CardContent className="h-full flex flex-col items-center justify-center text-center p-6">
                    <Stethoscope className="h-12 w-12 text-amber-600 group-hover:text-amber-800 mb-4" />
                    <h3 className="text-xl font-bold text-slate-800 mb-2">SafeShare Records</h3>
                    <p className="text-slate-600">Patient records • Consent • Audit trail</p>
                  </CardContent>
                </Card>
              </Link>
            </>
          )}
        </div>

        {/* Corner Portals */}
        <div className="relative">
          {/* Top Left - AED Finder */}
          <Link href="/aed-finder" className="absolute top-0 left-0">
            <Card className="w-48 h-32 border-4 border-red-600 hover:border-red-800 transition-colors cursor-pointer group">
              <CardContent className="h-full flex flex-col items-center justify-center text-center p-4">
                <Zap className="h-8 w-8 text-red-600 group-hover:text-red-800 mb-2" />
                <h4 className="font-bold text-slate-800">AED Finder</h4>
                <p className="text-xs text-slate-600">Locate nearest AED</p>
              </CardContent>
            </Card>
          </Link>

          {/* Top Right - Government Dashboard */}
          <Link href="/government-dashboard" className="absolute top-0 right-0">
            <Card className="w-48 h-32 border-4 border-slate-600 hover:border-slate-800 transition-colors cursor-pointer group">
              <CardContent className="h-full flex flex-col items-center justify-center text-center p-4">
                <Building2 className="h-8 w-8 text-slate-600 group-hover:text-slate-800 mb-2" />
                <h4 className="font-bold text-slate-800">Gov Dashboard</h4>
                <p className="text-xs text-slate-600">EOC • Policy • Oversight</p>
              </CardContent>
            </Card>
          </Link>

          {/* Bottom Left - Civilian Portal (stacked above AED) */}
          <Link href="/civilian-portal" className="absolute bottom-16 left-0">
            <Card className="w-48 h-32 border-4 border-emerald-600 hover:border-emerald-800 transition-colors cursor-pointer group">
              <CardContent className="h-full flex flex-col items-center justify-center text-center p-4">
                <UserCheck className="h-8 w-8 text-emerald-600 group-hover:text-emerald-800 mb-2" />
                <h4 className="font-bold text-slate-800">Civilian Portal</h4>
                <p className="text-xs text-slate-600">Safety check-in</p>
              </CardContent>
            </Card>
          </Link>

          {/* Bottom Left - Elder Portal */}
          <Link href="/elder-portal" className="absolute bottom-0 left-0">
            <Card className="w-48 h-32 border-4 border-amber-600 hover:border-amber-800 transition-colors cursor-pointer group">
              <CardContent className="h-full flex flex-col items-center justify-center text-center p-4">
                <Users className="h-8 w-8 text-amber-600 group-hover:text-amber-800 mb-2" />
                <h4 className="font-bold text-slate-800">Elder Portal</h4>
                <p className="text-xs text-slate-600">Cultural protocols</p>
              </CardContent>
            </Card>
          </Link>

          {/* Bottom Right - Responder Portal (stacked above Community) */}
          <Link href="/responder-portal" className="absolute bottom-16 right-0">
            <Card className="w-48 h-32 border-4 border-blue-600 hover:border-blue-800 transition-colors cursor-pointer group">
              <CardContent className="h-full flex flex-col items-center justify-center text-center p-4">
                <Shield className="h-8 w-8 text-blue-600 group-hover:text-blue-800 mb-2" />
                <h4 className="font-bold text-slate-800">Responder Portal</h4>
                <p className="text-xs text-slate-600">EMS • Fire • SAR</p>
              </CardContent>
            </Card>
          </Link>

          {/* Bottom Right - Community Portal */}
          <Link href="/community-portal" className="absolute bottom-0 right-0">
            <Card className="w-48 h-32 border-4 border-green-600 hover:border-green-800 transition-colors cursor-pointer group">
              <CardContent className="h-full flex flex-col items-center justify-center text-center p-4">
                <Users className="h-8 w-8 text-green-600 group-hover:text-green-800 mb-2" />
                <h4 className="font-bold text-slate-800">Community Portal</h4>
                <p className="text-xs text-slate-600">Local resources</p>
              </CardContent>
            </Card>
          </Link>

          {/* Center content area */}
          <div className="mx-auto max-w-4xl px-64 py-32">
            <Card className="border-4 border-slate-800 bg-white/90 backdrop-blur">
              <CardHeader>
                <CardTitle className="text-center text-2xl">
                  {userType === 'civilian' ? 'Civilian Features' : 'Responder Features'}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {userType === 'civilian' ? (
                    <>
                      <div className="space-y-3">
                        <h4 className="font-bold text-lg flex items-center gap-2">
                          <Satellite className="h-5 w-5 text-blue-600" />
                          SkyBridge Network
                        </h4>
                        <ul className="text-slate-600 space-y-1 text-sm">
                          <li>• Automatic LTE → Mesh → Satellite fallback</li>
                          <li>• LAB beacon for offline emergencies</li>
                          <li>• Cultural territory recognition (TLRT)</li>
                          <li>• Consent-based location sharing</li>
                        </ul>
                      </div>
                      <div className="space-y-3">
                        <h4 className="font-bold text-lg flex items-center gap-2">
                          <Heart className="h-5 w-5 text-red-600" />
                          HERO OS
                        </h4>
                        <ul className="text-slate-600 space-y-1 text-sm">
                          <li>• Gamified CPR training interface</li>
                          <li>• Bleeding control protocols</li>
                          <li>• Choking response guidance</li>
                          <li>• Stroke recognition checklist</li>
                        </ul>
                      </div>
                    </>
                  ) : (
                    <>
                      <div className="space-y-3">
                        <h4 className="font-bold text-lg flex items-center gap-2">
                          <Activity className="h-5 w-5 text-purple-600" />
                          LOGIQ Engine
                        </h4>
                        <ul className="text-slate-600 space-y-1 text-sm">
                          <li>• Evidence source evaluation</li>
                          <li>• Protocol recommendations</li>
                          <li>• Medical justification display</li>
                          <li>• Decision support (not decision making)</li>
                        </ul>
                      </div>
                      <div className="space-y-3">
                        <h4 className="font-bold text-lg flex items-center gap-2">
                          <Stethoscope className="h-5 w-5 text-amber-600" />
                          SafeShare Records
                        </h4>
                        <ul className="text-slate-600 space-y-1 text-sm">
                          <li>• Consent-based record access</li>
                          <li>• Emergency override with audit</li>
                          <li>• Encrypted data transmission</li>
                          <li>• Cultural protocol compliance</li>
                        </ul>
                      </div>
                    </>
                  )}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-slate-800 text-white py-8 mt-16">
        <div className="container mx-auto px-4 text-center">
          <div className="flex justify-center items-center gap-2 mb-4">
            <Shield className="h-6 w-6" />
            <span className="text-xl font-bold">SafeRoute AI</span>
          </div>
          <p className="text-slate-300 mb-4">
            Indigenous-First Emergency Response Platform • Patent-Protected Technology
          </p>
          <div className="flex flex-wrap justify-center gap-4 text-sm text-slate-400">
            <span>LOGIQ™ Evidence Engine</span>
            <span>•</span>
            <span>SafeShare™ Records</span>
            <span>•</span>
            <span>SkyBridge™ Network</span>
            <span>•</span>
            <span>HERO OS™ Training</span>
            <span>•</span>
            <span>RAPTRnav™ Routing</span>
          </div>
        </div>
      </footer>
    </div>
  )
}
