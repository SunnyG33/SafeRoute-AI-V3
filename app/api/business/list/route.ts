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

const ALLOWED_EXTS = new Set([".md", ".markdown", ".mdx", ".txt", ".html", ".htm"])

async function safeStat(p: string) {
  try {
    return await fs.stat(p)
  } catch {
    return null
  }
}

async function walk(dir: string, baseDir: string): Promise<string[]> {
  const entries = await fs.readdir(dir, { withFileTypes: true })
  const files: string[] = []
  for (const entry of entries) {
    const full = path.join(dir, entry.name)
    if (entry.isDirectory()) {
      const sub = await walk(full, baseDir)
      files.push(...sub)
    } else if (entry.isFile()) {
      const rel = path.relative(baseDir, full)
      const ext = path.extname(rel).toLowerCase()
      if (ALLOWED_EXTS.has(ext)) files.push(rel)
    }
  }
  return files
}

export async function GET() {
  const cwd = process.cwd()
  const results: { path: string; name: string; ext: string; size: number | null }[] = []

  for (const root of ALLOWED_ROOTS) {
    const absRoot = path.join(cwd, root)
    const st = await safeStat(absRoot)
    if (!st || !st.isDirectory()) continue
    const relFiles = await walk(absRoot, cwd)
    for (const rel of relFiles) {
      const abs = path.join(cwd, rel)
      const stat = await safeStat(abs)
      const ext = path.extname(rel).toLowerCase()
      results.push({
        path: rel.replace(/\\/g, "/"),
        name: path.basename(rel),
        ext,
        size: stat?.isFile() ? stat.size : null,
      })
    }
  }

  // Sort overall by path
  results.sort((a, b) => a.path.localeCompare(b.path))

  return NextResponse.json({ files: results, count: results.length })
}
