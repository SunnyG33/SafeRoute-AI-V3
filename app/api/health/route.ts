import { NextResponse } from "next/server"
import { createClient } from "@/lib/supabase/server"

export async function GET() {
  try {
    // Check database connection
    const supabase = createClient()
    const { data, error } = await supabase.from("users").select("count").limit(1)

    if (error) {
      throw new Error(`Database connection failed: ${error.message}`)
    }

    // Check environment variables
    const requiredEnvVars = ["NEXT_PUBLIC_SUPABASE_URL", "NEXT_PUBLIC_SUPABASE_ANON_KEY", "SUPABASE_SERVICE_ROLE_KEY"]

    const missingEnvVars = requiredEnvVars.filter((envVar) => !process.env[envVar])

    if (missingEnvVars.length > 0) {
      throw new Error(`Missing environment variables: ${missingEnvVars.join(", ")}`)
    }

    return NextResponse.json({
      status: "healthy",
      timestamp: new Date().toISOString(),
      database: "connected",
      environment: "configured",
      version: process.env.npm_package_version || "1.0.0",
    })
  } catch (error) {
    return NextResponse.json(
      {
        status: "unhealthy",
        timestamp: new Date().toISOString(),
        error: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 },
    )
  }
}
