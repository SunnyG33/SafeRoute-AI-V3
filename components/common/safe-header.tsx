"use client"

import { ReactNode } from "react"
import { Button } from "@/components/ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Menu, Shield } from 'lucide-react'

type Props = {
  title: string
  right?: ReactNode
  onBack?: () => void
}

export function SafeHeader({ title, right, onBack }: Props) {
  return (
    <header className="sticky top-0 z-30 bg-white/90 backdrop-blur supports-[backdrop-filter]:bg-white/70 border-b">
      <div className="mx-auto max-w-6xl px-3 sm:px-4 py-3 flex items-center gap-2">
        <Shield className="h-5 w-5 text-emerald-600" aria-hidden="true" />
        <h1 className="text-base sm:text-lg font-semibold tracking-tight">{title}</h1>
        <div className="ml-auto flex items-center gap-2">
          {right}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" className="border-2" aria-label="More options">
                <Menu className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-56">
              <DropdownMenuItem onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}>
                Scroll to top
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => (window.location.href = "/about/data-provenance")}>
                Data provenance
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => (window.location.href = "/landing")}>
                Home
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </header>
  )
}
