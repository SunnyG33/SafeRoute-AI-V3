"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { CheckCircle, XCircle, Database } from "lucide-react"
import { supabase } from "@/lib/supabase"

export default function TestDatabase() {
  const [connectionStatus, setConnectionStatus] = useState<"testing" | "connected" | "error">("testing")
  const [tableStatus, setTableStatus] = useState<Record<string, boolean>>({})
  const [testResults, setTestResults] = useState<string[]>([])

  useEffect(() => {
    testDatabaseConnection()
  }, [])

  const testDatabaseConnection = async () => {
    const results: string[] = []
    const tables = ["users", "incidents", "lab_beacons", "communications", "responders", "traditional_territories"]
    const status: Record<string, boolean> = {}

    try {
      // Test basic connection
      const { data, error } = await supabase.from("users").select("count", { count: "exact", head: true })

      if (error) {
        setConnectionStatus("error")
        results.push(`Connection failed: ${error.message}`)
        setTestResults(results)
        return
      }

      setConnectionStatus("connected")
      results.push("✅ Database connection successful")

      // Test each table
      for (const table of tables) {
        try {
          const { error: tableError } = await supabase.from(table).select("*").limit(1)
          if (tableError) {
            status[table] = false
            results.push(`❌ Table '${table}': ${tableError.message}`)
          } else {
            status[table] = true
            results.push(`✅ Table '${table}': Ready`)
          }
        } catch (err) {
          status[table] = false
          results.push(`❌ Table '${table}': Error testing`)
        }
      }

      setTableStatus(status)
      setTestResults(results)
    } catch (err) {
      setConnectionStatus("error")
      results.push(`❌ Connection test failed: ${err}`)
      setTestResults(results)
    }
  }

  const createTestUser = async () => {
    try {
      const { data, error } = await supabase
        .from("users")
        .insert([
          {
            email: "test@saferoute.ai",
            full_name: "Test User",
            role: "citizen",
            phone: "+1-555-0123",
          },
        ])
        .select()

      if (error) {
        setTestResults((prev) => [...prev, `❌ Test user creation failed: ${error.message}`])
      } else {
        setTestResults((prev) => [...prev, `✅ Test user created successfully: ${data[0].full_name}`])
      }
    } catch (err) {
      setTestResults((prev) => [...prev, `❌ Test user creation error: ${err}`])
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-indigo-900 p-8">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-white mb-4">SafeRoute AI Database Test</h1>
          <p className="text-gray-300">Testing your backend foundation</p>
        </div>

        {/* Connection Status */}
        <Card className="mb-6 bg-white/10 border-white/20">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-white">
              <Database className="w-5 h-5" />
              Database Connection
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center gap-2">
              {connectionStatus === "testing" && (
                <>
                  <div className="w-4 h-4 border-2 border-blue-400 border-t-transparent rounded-full animate-spin" />
                  <span className="text-gray-300">Testing connection...</span>
                </>
              )}
              {connectionStatus === "connected" && (
                <>
                  <CheckCircle className="w-5 h-5 text-green-400" />
                  <span className="text-green-400">Connected to Supabase</span>
                </>
              )}
              {connectionStatus === "error" && (
                <>
                  <XCircle className="w-5 h-5 text-red-400" />
                  <span className="text-red-400">Connection failed</span>
                </>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Table Status */}
        <Card className="mb-6 bg-white/10 border-white/20">
          <CardHeader>
            <CardTitle className="text-white">Database Tables</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              {Object.entries(tableStatus).map(([table, isWorking]) => (
                <div key={table} className="flex items-center gap-2">
                  {isWorking ? (
                    <CheckCircle className="w-4 h-4 text-green-400" />
                  ) : (
                    <XCircle className="w-4 h-4 text-red-400" />
                  )}
                  <span className="text-gray-300 capitalize">{table.replace("_", " ")}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Test Actions */}
        <Card className="mb-6 bg-white/10 border-white/20">
          <CardHeader>
            <CardTitle className="text-white">Test Actions</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex gap-4">
              <Button onClick={testDatabaseConnection} className="bg-blue-600 hover:bg-blue-700">
                Retest Connection
              </Button>
              <Button onClick={createTestUser} className="bg-green-600 hover:bg-green-700">
                Create Test User
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Test Results */}
        <Card className="bg-white/10 border-white/20">
          <CardHeader>
            <CardTitle className="text-white">Test Results</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2 max-h-96 overflow-y-auto">
              {testResults.map((result, index) => (
                <div key={index} className="text-sm font-mono text-gray-300 bg-black/20 p-2 rounded">
                  {result}
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
