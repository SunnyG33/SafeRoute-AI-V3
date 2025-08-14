"use client"

import { useEffect, useState } from "react"
import { supabase } from "@/lib/supabase"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { CheckCircle, XCircle, Database } from "lucide-react"

export default function DatabaseStatus() {
  const [tables, setTables] = useState<string[]>([])
  const [loading, setLoading] = useState(true)
  const [connected, setConnected] = useState(false)

  useEffect(() => {
    checkDatabase()
  }, [])

  const checkDatabase = async () => {
    try {
      // Test connection and get table list
      const { data, error } = await supabase
        .from("information_schema.tables")
        .select("table_name")
        .eq("table_schema", "public")

      if (error) throw error

      const tableNames = data?.map((t) => t.table_name) || []
      setTables(tableNames)
      setConnected(true)
    } catch (error) {
      console.error("Database connection failed:", error)
      setConnected(false)
    } finally {
      setLoading(false)
    }
  }

  const expectedTables = [
    "users",
    "incidents",
    "lab_beacons",
    "communications",
    "responders",
    "government_agencies",
    "traditional_territories",
    "emergency_resources",
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-indigo-900 p-8">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-8">
          <div className="flex items-center justify-center gap-3 mb-4">
            <Database className="w-8 h-8 text-cyan-400" />
            <h1 className="text-4xl font-bold text-white">Database Status</h1>
          </div>
          <p className="text-gray-300">SafeRoute AI Backend Foundation</p>
        </div>

        <div className="grid gap-6">
          {/* Connection Status */}
          <Card className="bg-white/10 border-white/20">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-white">
                {connected ? (
                  <CheckCircle className="w-5 h-5 text-green-400" />
                ) : (
                  <XCircle className="w-5 h-5 text-red-400" />
                )}
                Database Connection
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className={`text-lg ${connected ? "text-green-300" : "text-red-300"}`}>
                {loading
                  ? "Testing connection..."
                  : connected
                    ? "Successfully connected to Supabase"
                    : "Connection failed"}
              </p>
            </CardContent>
          </Card>

          {/* Tables Status */}
          <Card className="bg-white/10 border-white/20">
            <CardHeader>
              <CardTitle className="text-white">Database Tables</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {expectedTables.map((tableName) => {
                  const exists = tables.includes(tableName)
                  return (
                    <div key={tableName} className="flex items-center gap-2">
                      {exists ? (
                        <CheckCircle className="w-4 h-4 text-green-400" />
                      ) : (
                        <XCircle className="w-4 h-4 text-red-400" />
                      )}
                      <span className={exists ? "text-green-300" : "text-red-300"}>{tableName}</span>
                    </div>
                  )
                })}
              </div>
              <div className="mt-4 p-3 bg-black/20 rounded">
                <p className="text-gray-300 text-sm">
                  Found {tables.length} tables total: {tables.join(", ")}
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Next Steps */}
          <Card className="bg-white/10 border-white/20">
            <CardHeader>
              <CardTitle className="text-white">Next Steps</CardTitle>
            </CardHeader>
            <CardContent className="text-gray-300">
              <ol className="list-decimal list-inside space-y-2">
                <li>Verify all tables are created (green checkmarks above)</li>
                <li>Test user registration and authentication</li>
                <li>Connect frontend portals to database operations</li>
                <li>Test real-time incident coordination</li>
                <li>Implement Indigenous governance features</li>
              </ol>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
