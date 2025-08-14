const requiredEnvVars = [
  "NEXT_PUBLIC_SUPABASE_URL",
  "NEXT_PUBLIC_SUPABASE_ANON_KEY",
  "SUPABASE_SERVICE_ROLE_KEY",
  "JWT_SECRET",
  "MASTER_ENCRYPTION_KEY",
]

const missingVars = requiredEnvVars.filter((varName) => !process.env[varName])

if (missingVars.length > 0) {
  console.error("❌ Missing required environment variables:")
  missingVars.forEach((varName) => console.error(`  - ${varName}`))
  process.exit(1)
}

console.log("✅ All required environment variables are present")

// Validate Supabase connection
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
if (!supabaseUrl.includes("supabase.co")) {
  console.error("❌ Invalid Supabase URL format")
  process.exit(1)
}

console.log("✅ Environment configuration validated")
