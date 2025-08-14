const { createClient } = require("@supabase/supabase-js")

async function checkMigrations() {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
  const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY

  if (!supabaseUrl || !supabaseKey) {
    console.error("❌ Missing Supabase environment variables")
    process.exit(1)
  }

  const supabase = createClient(supabaseUrl, supabaseKey)

  try {
    // Check if core tables exist
    const requiredTables = ["users", "incidents", "emergency_resources", "lab_beacons", "communications"]

    for (const table of requiredTables) {
      const { data, error } = await supabase.from(table).select("*").limit(1)

      if (error) {
        console.error(`❌ Table '${table}' not accessible:`, error.message)
        process.exit(1)
      }
    }

    console.log("✅ All required database tables are accessible")
    console.log("✅ Database migrations verified")
  } catch (error) {
    console.error("❌ Database migration check failed:", error.message)
    process.exit(1)
  }
}

checkMigrations()
