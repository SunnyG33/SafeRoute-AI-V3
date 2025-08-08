"use client"

import { createContext, useContext, useEffect, useMemo, useState } from "react"
import { dictionaries, type Lang, defaultLang } from "@/i18n/dictionaries"

type I18nContextType = {
  lang: Lang
  setLang: (lang: Lang) => void
  t: (key: string) => string
}

const I18nContext = createContext<I18nContextType | undefined>(undefined)

export function I18nProvider({ children }: { children: React.ReactNode }) {
  const [lang, setLangState] = useState<Lang>(() => {
    if (typeof window === "undefined") return defaultLang
    const saved = localStorage.getItem("sr_lang") as Lang | null
    return saved && dictionaries[saved] ? saved : defaultLang
  })

  useEffect(() => {
    localStorage.setItem("sr_lang", lang)
    if (typeof document !== "undefined") {
      document.documentElement.setAttribute("lang", lang)
    }
  }, [lang])

  const setLang = (l: Lang) => {
    if (dictionaries[l]) setLangState(l)
  }

  const t = (key: string) => {
    const dict = dictionaries[lang]
    return dict[key] ?? key
  }

  const value = useMemo(() => ({ lang, setLang, t }), [lang])

  return <I18nContext.Provider value={value}>{children}</I18nContext.Provider>
}

export function useI18n() {
  const ctx = useContext(I18nContext)
  if (!ctx) throw new Error("useI18n must be used within I18nProvider")
  return ctx
}
