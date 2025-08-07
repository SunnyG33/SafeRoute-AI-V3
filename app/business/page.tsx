import React from "react"
import BusinessFilesExplorer from "@/components/business/business-files-explorer"

export const metadata = {
  title: "Business Files | SafeRoute AI",
  description: "Browse and read business documents within the project.",
}

export default function Page() {
  return (
    <main className="min-h-screen w-full bg-white">
      <section className="mx-auto w-full max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <header className="mb-6">
          <h1 className="text-2xl font-semibold tracking-tight text-neutral-800">
            Business Files
          </h1>
          <p className="mt-1 text-sm text-neutral-600">
            Browse, search, and preview your business documents directly in the app.
          </p>
        </header>
        <BusinessFilesExplorer />
      </section>
    </main>
  )
}
