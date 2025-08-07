import { NextResponse } from "next/server"
import { DB_AUDIT } from "@/lib/memory-db"

export async function GET() {
  const data = [...DB_AUDIT].sort((a, b) => b.timestamp - a.timestamp).slice(0, 200)
  return NextResponse.json({ data })
}
