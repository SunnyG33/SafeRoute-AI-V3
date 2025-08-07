"use client"

import React from "react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import ReactMarkdown from "react-markdown"
import remarkGfm from "remark-gfm"

type FileInfo = {
  path: string
  name: string
  ext: string
  size: number | null
}

type ReadResponse = {
  path: string
  content: string
  contentType: string
}

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

function groupByTopLevel(files: FileInfo[]) {
  const groups: Record<string, FileInfo[]> = {}
  for (const f of files) {
    const top = ALLOWED_ROOTS.find((root) => f.path.startsWith(root)) ?? "other"
    if (!groups[top]) groups[top] = []
    groups[top].push(f)
  }
  // Sort groups and files within
  const sortedGroupEntries = Object.entries(groups).sort((a, b) => a[0].localeCompare(b[0]))
  for (const [, arr] of sortedGroupEntries) {
    arr.sort((a, b) => a.path.localeCompare(b.path))
  }
  return sortedGroupEntries
}

export default function BusinessFilesExplorer() {
  const [files, setFiles] = React.useState<FileInfo[]>([])
  const [filtered, setFiltered] = React.useState<FileInfo[]>([])
  const [query, setQuery] = React.useState("")
  const [loadingList, setLoadingList] = React.useState(true)

  const [activeFile, setActiveFile] = React.useState<FileInfo | null>(null)
  const [content, setContent] = React.useState<ReadResponse | null>(null)
  const [loadingContent, setLoadingContent] = React.useState(false)
  const [error, setError] = React.useState<string | null>(null)

  React.useEffect(() => {
    let cancelled = false
    async function load() {
      setLoadingList(true)
      setError(null)
      try {
        const res = await fetch("/api/business/list", { cache: "no-store" })
        if (!res.ok) throw new Error(`Failed to list files: ${res.status}`)
        const data = (await res.json()) as { files: FileInfo[] }
        if (!cancelled) {
          setFiles(data.files)
          setFiltered(data.files)
        }
      } catch (e: any) {
        if (!cancelled) setError(e?.message ?? "Failed to load file list.")
      } finally {
        if (!cancelled) setLoadingList(false)
      }
    }
    load()
    return () => {
      cancelled = true
    }
  }, [])

  React.useEffect(() => {
    if (!query) {
      setFiltered(files)
      return
    }
    const q = query.toLowerCase()
    setFiltered(
      files.filter((f) => f.name.toLowerCase().includes(q) || f.path.toLowerCase().includes(q)),
    )
  }, [files, query])

  async function openFile(file: FileInfo) {
    setActiveFile(file)
    setContent(null)
    setError(null)
    setLoadingContent(true)
    try {
      const url = `/api/business/read?path=${encodeURIComponent(file.path)}`
      const res = await fetch(url, { cache: "no-store" })
      if (!res.ok) throw new Error(`Failed to read file: ${res.status}`)
      const data = (await res.json()) as ReadResponse
      setContent(data)
    } catch (e: any) {
      setError(e?.message ?? "Failed to read file.")
    } finally {
      setLoadingContent(false)
    }
  }

  function downloadFile() {
    if (!content) return
    const blob = new Blob([content.content], { type: content.contentType || "text/plain" })
    const link = document.createElement("a")
    link.href = URL.createObjectURL(blob)
    const fileName = activeFile?.name || "document"
    link.download = fileName
    document.body.appendChild(link)
    link.click()
    link.remove()
    URL.revokeObjectURL(link.href)
  }

  const groups = groupByTopLevel(filtered)

  return (
    <div className="grid grid-cols-1 gap-4 lg:grid-cols-12">
      <Card className="col-span-1 p-4 lg:col-span-4">
        <div className="flex items-center gap-2">
          <Input
            placeholder="Search files..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="h-9"
          />
          <Button variant="outline" className="h-9" onClick={() => setQuery("")}>
            Clear
          </Button>
        </div>
        <div className="mt-4 max-h-[70vh] overflow-auto rounded-md border border-neutral-200">
          {loadingList ? (
            <div className="p-4 text-sm text-neutral-600">Loading file list...</div>
          ) : error ? (
            <div className="p-4 text-sm text-red-600">{error}</div>
          ) : groups.length === 0 ? (
            <div className="p-4 text-sm text-neutral-600">No files found.</div>
          ) : (
            <ul className="divide-y divide-neutral-100">
              {groups.map(([folder, items]) => (
                <li key={folder}>
                  <div className="sticky top-0 z-10 bg-neutral-50 px-3 py-2 text-xs font-medium uppercase tracking-wide text-neutral-600">
                    {folder}
                  </div>
                  <ul>
                    {items.map((f) => {
                      const isActive = activeFile?.path === f.path
                      return (
                        <li key={f.path}>
                          <button
                            onClick={() => openFile(f)}
                            className={`w-full cursor-pointer px-3 py-2 text-left text-sm hover:bg-neutral-50 ${
                              isActive ? "bg-neutral-100" : ""
                            }`}
                            aria-current={isActive ? "page" : undefined}
                          >
                            <span className="block font-medium text-neutral-800">{f.name}</span>
                            <span className="block truncate text-[11px] text-neutral-500">
                              {f.path}
                            </span>
                          </button>
                        </li>
                      )
                    })}
                  </ul>
                </li>
              ))}
            </ul>
          )}
        </div>
      </Card>

      <Card className="col-span-1 min-h-[60vh] p-4 lg:col-span-8">
        {!activeFile ? (
          <div className="flex h-full items-center justify-center text-sm text-neutral-600">
            Select a file to preview its contents.
          </div>
        ) : loadingContent ? (
          <div className="p-2 text-sm text-neutral-600">Loading {activeFile.name}...</div>
        ) : error ? (
          <div className="p-2 text-sm text-red-600">{error}</div>
        ) : content ? (
          <div className="flex h-full flex-col">
            <div className="mb-3 flex items-center justify-between gap-2">
              <div className="min-w-0">
                <h2 className="truncate text-lg font-semibold text-neutral-800">{activeFile.name}</h2>
                <p className="truncate text-xs text-neutral-500">{activeFile.path}</p>
              </div>
              <div className="flex shrink-0 items-center gap-2">
                <Button variant="secondary" onClick={downloadFile}>
                  Download
                </Button>
              </div>
            </div>

            <div className="relative min-h-0 flex-1 overflow-auto rounded-md border border-neutral-200 bg-white p-4">
              {activeFile.ext === ".md" ? (
                <article className="prose max-w-none prose-headings:mt-6 prose-headings:mb-2 prose-p:my-3 prose-ul:my-3 prose-ol:my-3 prose-li:my-1 prose-code:bg-neutral-100 prose-code:px-1 prose-code:py-0.5">
                  <ReactMarkdown remarkPlugins={[remarkGfm]}>{content.content}</ReactMarkdown>
                </article>
              ) : activeFile.ext === ".html" ? (
                <div
                  className="prose max-w-none"
                  dangerouslySetInnerHTML={{ __html: content.content }}
                />
              ) : (
                <pre className="whitespace-pre-wrap text-sm text-neutral-800">
                  {content.content}
                </pre>
              )}
            </div>
          </div>
        ) : null}
      </Card>
    </div>
  )
}
