"use client"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { BookOpenCheck } from 'lucide-react'
import { evidenceRegistry, type ModuleKey } from "@/data/evidence-registry"

export function EvidenceBadge({ moduleKey }: { moduleKey: ModuleKey }) {
  const items = evidenceRegistry[moduleKey] ?? []

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" className="border-2" title="Evidence notes" aria-label="Evidence notes">
          <BookOpenCheck className="h-4 w-4 mr-2" />
          Evidence
          <Badge variant="outline" className="ml-2">v1</Badge>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-80">
        <DropdownMenuLabel>Evidence Sources</DropdownMenuLabel>
        <DropdownMenuSeparator />
        {items.length === 0 ? (
          <DropdownMenuItem disabled>No evidence entries</DropdownMenuItem>
        ) : (
          items.map((it, idx) => (
            <DropdownMenuItem key={idx} className="flex flex-col items-start">
              <span className="font-medium">{it.title}</span>
              <span className="text-xs text-muted-foreground">{it.path}</span>
              {it.note ? <span className="text-xs">{it.note}</span> : null}
            </DropdownMenuItem>
          ))
        )}
        <DropdownMenuSeparator />
        <DropdownMenuItem disabled className="text-xs">
          Paths refer to in-repo docs for reviewer traceability.
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
