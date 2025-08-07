import { NextResponse } from "next/server"
import { promises as fs } from "fs"
import path from "path"

const ALLOWED_ROOTS = [
  "business-documents",
  "business-plan",
  "pitch-deck",
  "financial-projections",
  "product-specifications",
  "technical-architecture",
  "wireframes",
  "grants",
  "grants-starlink-enhanced",
  "docs/03-grant-applications",
]

const CONTENT_TYPES: Record<string, string> = {
  ".md": "text/markdown; charset=utf-8",
  ".markdown": "text/markdown; charset=utf-8",
  ".mdx": "text/markdown; charset=utf-8",
  ".txt": "text/plain; charset=utf-8",
  ".html": "text/html; charset=utf-8",
  ".htm": "text/html; charset=utf-8",
}

function isAllowedPath(relPath: string) {
  if (relPath.includes("..")) return false
  return ALLOWED_ROOTS.some((root) => relPath.startsWith(root + "/") || relPath === root)
}

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url)
  const relPathRaw = searchParams.get("path")
  if (!relPathRaw) {
    return NextResponse.json({ error: "Missing 'path' query parameter" }, { status: 400 })
  }

  const relPath = decodeURIComponent(relPathRaw).replace(/\\/g, "/")
  if (!isAllowedPath(relPath)) {
    return NextResponse.json({ error: "Path not allowed" }, { status: 403 })
  }

  const abs = path.join(process.cwd(), relPath)
  let stat
  try {
    stat = await fs.stat(abs)
  } catch {
    return NextResponse.json({ error: "File not found" }, { status: 404 })
  }
  if (!stat.isFile()) {
    return NextResponse.json({ error: "Not a file" }, { status: 400 })
  }

  const ext = path.extname(relPath).toLowerCase()
  const contentType = CONTENT_TYPES[ext] ?? "text/plain; charset=utf-8"
  const buf = await fs.readFile(abs)
  // Always return JSON wrapper for the UI
  return NextResponse.json({
    path: relPath,
    content: buf.toString("utf-8"),
    contentType,
  })
}
