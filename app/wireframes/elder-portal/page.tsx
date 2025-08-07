"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ArrowLeft, Shield, Users, AlertTriangle, Satellite } from "lucide-react"

export default function ElderPortalWireframes() {
  return (
    <div className="min-h-screen bg-slate-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="mb-6">
          <Link href="/wireframes">
            <Button variant="outline" className="mb-4 bg-transparent">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Wireframes
            </Button>
          </Link>
          <h1 className="text-3xl font-bold text-slate-900">Elder & Leader Portal</h1>
          <p className="text-slate-600 mt-2">Community emergency oversight and cultural protocol management</p>
        </div>

        <div className="grid gap-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Shield className="h-5 w-5 mr-2 text-blue-600" />
                Elder Portal Overview
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <p className="text-slate-700">
                  The Elder & Leader Portal provides community leaders with oversight capabilities for emergency
                  response operations while ensuring cultural protocols are respected and maintained.
                </p>

                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <h4 className="font-semibold text-slate-900 mb-2">Key Features:</h4>
                    <ul className="text-sm text-slate-700 space-y-1">
                      <li>• Real-time incident monitoring</li>
                      <li>• Hero volunteer oversight</li>
                      <li>• Cultural protocol management</li>
                      <li>• Community status dashboard</li>
                      <li>• Emergency override capabilities</li>
                      <li>• Starlink network monitoring</li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-semibold text-slate-900 mb-2">Cultural Integration:</h4>
                    <ul className="text-sm text-slate-700 space-y-1">
                      <li>• Elder respect protocols</li>
                      <li>• Traditional territory acknowledgment</li>
                      <li>• Traditional medicine consultation</li>
                      <li>• Cultural liaison coordination</li>
                      <li>• Community-specific protocols</li>
                      <li>• Indigenous language support</li>
                    </ul>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <div className="grid md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <AlertTriangle className="h-5 w-5 mr-2 text-red-600" />
                  Active Incidents Management
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <p className="text-sm text-slate-700">
                    Real-time monitoring and oversight of all emergency incidents with cultural protocol integration.
                  </p>
                  <div className="bg-slate-100 p-3 rounded">
                    <h5 className="font-medium text-slate-900 mb-2">Features:</h5>
                    <ul className="text-xs text-slate-700 space-y-1">
                      <li>• Priority-based incident display</li>
                      <li>• Cultural protocol assignment</li>
                      <li>• Hero volunteer coordination</li>
                      <li>• Real-time status updates</li>
                      <li>• Elder guidance integration</li>
                    </ul>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Users className="h-5 w-5 mr-2 text-blue-600" />
                  Hero Volunteer Oversight
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <p className="text-sm text-slate-700">
                    Monitor and coordinate Hero volunteers with respect for cultural protocols and community values.
                  </p>
                  <div className="bg-slate-100 p-3 rounded">
                    <h5 className="font-medium text-slate-900 mb-2">Capabilities:</h5>
                    <ul className="text-xs text-slate-700 space-y-1">
                      <li>• Real-time volunteer status</li>
                      <li>• Skill and certification tracking</li>
                      <li>• Cultural training verification</li>
                      <li>• Assignment and coordination</li>
                      <li>• Performance and feedback</li>
                    </ul>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Satellite className="h-5 w-5 mr-2 text-green-600" />
                  Technology Integration
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <p className="text-sm text-slate-700">
                    Monitor Starlink connectivity and L.A.B. technology status across the community.
                  </p>
                  <div className="bg-slate-100 p-3 rounded">
                    <h5 className="font-medium text-slate-900 mb-2">Systems:</h5>
                    <ul className="text-xs text-slate-700 space-y-1">
                      <li>• Starlink network monitoring</li>
                      <li>• L.A.B. beacon status tracking</li>
                      <li>• Community connectivity overview</li>
                      <li>• Emergency broadcast capabilities</li>
                      <li>• Privacy setting oversight</li>
                    </ul>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Cultural Protocol Management</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <p className="text-sm text-slate-700">
                    Ensure all emergency responses respect and integrate Indigenous cultural protocols and traditions.
                  </p>
                  <div className="bg-slate-100 p-3 rounded">
                    <h5 className="font-medium text-slate-900 mb-2">Protocol Types:</h5>
                    <ul className="text-xs text-slate-700 space-y-1">
                      <li>• Elder respect and consultation</li>
                      <li>• Traditional territory protocols</li>
                      <li>• Traditional medicine integration</li>
                      <li>• Cultural liaison requirements</li>
                      <li>• Community-specific customs</li>
                    </ul>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Implementation Notes</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <h4 className="font-semibold text-slate-900 mb-2">Design Principles:</h4>
                  <ul className="text-sm text-slate-700 space-y-1">
                    <li>• Emergency service color scheme (red, blue, green, yellow)</li>
                    <li>• High contrast for accessibility</li>
                    <li>• Clear visual hierarchy for emergency situations</li>
                    <li>• Cultural sensitivity in design elements</li>
                    <li>• Mobile-responsive for field use</li>
                  </ul>
                </div>

                <div>
                  <h4 className="font-semibold text-slate-900 mb-2">Technical Integration:</h4>
                  <ul className="text-sm text-slate-700 space-y-1">
                    <li>• Real-time data from Starlink network</li>
                    <li>• L.A.B. technology status monitoring</li>
                    <li>• Integration with Hero volunteer mobile app</li>
                    <li>• Government dashboard connectivity</li>
                    <li>• Emergency service system integration</li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="mt-8 text-center">
          <Link href="/elder-portal">
            <Button className="bg-blue-600 hover:bg-blue-700 text-white">
              <Shield className="h-4 w-4 mr-2" />
              View Live Elder Portal Demo
            </Button>
          </Link>
        </div>
      </div>
    </div>
  )
}
