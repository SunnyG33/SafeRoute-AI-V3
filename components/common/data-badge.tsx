'use client'

import { cn } from '@/lib/utils'

type Source = 'mock' | 'live' | 'static' | 'planned'

const styles: Record<Source, string> = {
  mock: 'bg-amber-100 text-amber-900 border-amber-300',
  live: 'bg-emerald-100 text-emerald-900 border-emerald-300',
  static: 'bg-slate-100 text-slate-900 border-slate-300',
  planned: 'bg-violet-100 text-violet-900 border-violet-300',
}

export function DataBadge({
  source,
  className,
  label,
  title,
}: {
  source: Source
  className?: string
  label?: string
  title?: string
}) {
  const text = label ?? ({
    mock: 'Mock data',
    live: 'Live data',
    static: 'Static content',
    planned: 'Planned',
  }[source])

  return (
    <span
      title={title}
      className={cn(
        'inline-flex items-center rounded border text-xs px-2 py-0.5',
        'font-medium',
        styles[source],
        className,
      )}
    >
      {text}
    </span>
  )
}
