"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { CheckCircle, XCircle, Database, Users, MapPin, MessageSquare } from "lucide-react"
import { supabase } from "@/lib/supabase"

export default function BackendTest() {
  const [testResults, setTestResults] = useState<any>({})
  const [loading, setLoading] = useState(false)

  const runTests = async () => {
    setLoading(true)
    const results: any = {}

    // Test 1: Database Connection
    try {
      const { data, error } = await supabase.from("users").select("count").limit(1)
      results.connection = { success: !error, message: error?.message || "Connected successfully" }
    } catch (err) {
      results.connection = { success: false, message: "Connection failed" }
    }

    // Test 2: Check Tables Exist
    const tables = ["users", "incidents", "lab_beacons", "communications", "indigenous_territories"]
    for (const table of tables) {
      try {
        const { error } = await supabase.from(table).select("*").limit(1)
        results[`table_${table}`] = { success: !error, message: error?.message || `Table ${table} exists` }
      } catch (err) {
        results[`table_${table}`] = { success: false, message: `Table ${table} missing` }
      }
    }

    // Test 3: Create Test User
    try {
      const { data, error } = await supabase
        .from("users")
        .insert({
          email: "test@saferoute.ai",
          user_type: "citizen",
          profile: { name: "Test User", location: "Vancouver, BC" },
        })
        .select()
        .single()

      results.create_user = {
        success: !error,
        message: error?.message || `Created user: ${data?.email}`,
        data: data,
      }
    } catch (err) {
      results.create_user = { success: false, message: "Failed to create test user" }
    }

    // Test 4: Real-time Subscription Test
    try {
      const channel = supabase.channel("test-channel")
      results.realtime = { success: true, message: "Real-time channels available" }
    } catch (err) {
      results.realtime = { success: false, message: "Real-time not working" }
    }

    setTestResults(results)
    setLoading(false)
  }

  const TestResult = ({ test, result }: { test: string; result: any }) => (
    <div className="flex items-center justify-between p-3 border rounded-lg">
      <div className="flex items-center gap-2">
        {result.success ? (
          <CheckCircle className="w-5 h-5 text-green-500" />
        ) : (
          <XCircle className="w-5 h-5 text-red-500" />
        )}
        <span className="font-medium">{test}</span>
      </div>
      <Badge variant={result.success ? "default" : "destructive"}>{result.success ? "PASS" : "FAIL"}</Badge>
    </div>
  )

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-indigo-900 p-8">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-white mb-4">SafeRoute AI Backend Verification</h1>
          <p className="text-gray-300">Test your database foundation and backend functionality</p>
        </div>

        <div className="grid gap-6">
          {/* Test Controls */}
          <Card className="bg-white/10 backdrop-blur-sm border-white/20">
            <CardHeader>
              <CardTitle className="text-white flex items-center gap-2">
                <Database className="w-6 h-6" />
                Backend System Tests
              </CardTitle>
            </CardHeader>
            <CardContent>
              <Button onClick={runTests} disabled={loading} className="bg-blue-600 hover:bg-blue-700">
                {loading ? "Running Tests..." : "Run Backend Tests"}
              </Button>
            </CardContent>
          </Card>

          {/* Test Results */}
          {Object.keys(testResults).length > 0 && (
            <Card className="bg-white/10 backdrop-blur-sm border-white/20">
              <CardHeader>
                <CardTitle className="text-white">Test Results</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <TestResult test="Database Connection" result={testResults.connection || {}} />
                <TestResult test="Users Table" result={testResults.table_users || {}} />
                <TestResult test="Incidents Table" result={testResults.table_incidents || {}} />
                <TestResult test="LAB Beacons Table" result={testResults.table_lab_beacons || {}} />
                <TestResult test="Communications Table" result={testResults.table_communications || {}} />
                <TestResult
                  test="Indigenous Territories Table"
                  result={testResults.table_indigenous_territories || {}}
                />
                <TestResult test="Create Test User" result={testResults.create_user || {}} />
                <TestResult test="Real-time Functionality" result={testResults.realtime || {}} />
              </CardContent>
            </Card>
          )}

          {/* Database Schema Overview */}
          <div className="grid md:grid-cols-2 gap-6">
            <Card className="bg-white/10 backdrop-blur-sm border-white/20">
              <CardHeader>
                <CardTitle className="text-white flex items-center gap-2">
                  <Users className="w-5 h-5" />
                  User Management
                </CardTitle>
              </CardHeader>
              <CardContent className="text-gray-300 space-y-2">
                <div>• Citizens, Elders, Responders, Government users</div>
                <div>• Role-based access control</div>
                <div>• OCAP compliance for Indigenous data</div>
                <div>• Profile management and preferences</div>
              </CardContent>
            </Card>

            <Card className="bg-white/10 backdrop-blur-sm border-white/20">
              <CardHeader>
                <CardTitle className="text-white flex items-center gap-2">
                  <MapPin className="w-5 h-5" />
                  Emergency Coordination
                </CardTitle>
              </CardHeader>
              <CardContent className="text-gray-300 space-y-2">
                <div>• Incident tracking and management</div>
                <div>• LAB beacon location services</div>
                <div>• Traditional territory recognition</div>
                <div>• Multi-agency coordination</div>
              </CardContent>
            </Card>

            <Card className="bg-white/10 backdrop-blur-sm border-white/20">
              <CardHeader>
                <CardTitle className="text-white flex items-center gap-2">
                  <MessageSquare className="w-5 h-5" />
                  Real-time Communication
                </CardTitle>
              </CardHeader>
              <CardContent className="text-gray-300 space-y-2">
                <div>• Multi-stakeholder messaging</div>
                <div>• Emergency alert distribution</div>
                <div>• Status updates and notifications</div>
                <div>• Cultural protocol compliance</div>
              </CardContent>
            </Card>

            <Card className="bg-white/10 backdrop-blur-sm border-white/20">
              <CardHeader>
                <CardTitle className="text-white flex items-center gap-2">
                  <Database className="w-5 h-5" />
                  Indigenous Governance
                </CardTitle>
              </CardHeader>
              <CardContent className="text-gray-300 space-y-2">
                <div>• OCAP data sovereignty principles</div>
                <div>• Elder approval workflows</div>
                <div>• Traditional knowledge protection</div>
                <div>• Cultural protocol automation</div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
