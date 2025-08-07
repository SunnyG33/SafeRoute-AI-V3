"use client"

import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import { Globe } from 'lucide-react'

const SUPPORTED = [
  { code: "en", label: "EN" },
  { code: "fr", label: "FR" },
  { code: "hlk", label: "HLK" } // Halq’eméylem placeholder
] as const

export default function LanguageSwitcher() {
  const [lang, setLang] = useState<string>("en")

  useEffect(() => {
    const saved = localStorage.getItem("sr_lang")
    if (saved) setLang(saved)
  }, [])

  function set(code: string) {
    setLang(code)
    localStorage.setItem("sr_lang", code)
  }

  return (
    <div className="flex items-center gap-1">
      <Globe className="h-4 w-4 text-slate-600" aria-hidden />
      {SUPPORTED.map((l) => (
        <Button
          key={l.code}
          size="sm"
          variant={lang === l.code ? "default" : "outline"}
          className={lang === l.code ? "border-2 border-black" : "border-2"}
          onClick={() => set(l.code)}
          aria-pressed={lang === l.code}
          aria-label={`Set language to ${l.label}`}
        >
          {l.label}
        </Button>
      ))}
    </div>
  )
}

export { LanguageSwitcher }
