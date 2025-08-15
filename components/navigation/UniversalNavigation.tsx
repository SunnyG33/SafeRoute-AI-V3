"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Home, ArrowLeft, Menu } from "lucide-react"

export function UniversalNavigation() {
  return (
    <div className="fixed top-0 left-0 right-0 z-50 bg-black/20 backdrop-blur-md border-b border-white/10">
      <div className="container mx-auto px-4 py-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Link href="/landing">
              <Button
                size="sm"
                className="bg-white/10 hover:bg-white/20 text-white border border-white/20 backdrop-blur-sm"
              >
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back
              </Button>
            </Link>

            <Link href="/landing">
              <Button
                size="sm"
                className="bg-blue-500/20 hover:bg-blue-500/30 text-blue-300 border border-blue-500/30 backdrop-blur-sm"
              >
                <Home className="w-4 h-4 mr-2" />
                Home
              </Button>
            </Link>
          </div>

          <div className="text-white font-medium">SafeRoute AI</div>

          <Button
            size="sm"
            className="bg-white/10 hover:bg-white/20 text-white border border-white/20 backdrop-blur-sm"
          >
            <Menu className="w-4 h-4" />
          </Button>
        </div>
      </div>
      <div className="h-16" />
    </div>
  )
}

export default UniversalNavigation
