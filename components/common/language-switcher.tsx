"use client"

import { useI18n } from "@/components/providers/i18n-provider"

export default function LanguageSwitcher() {
  const { lang, setLang, t } = useI18n()

  return (
    <label className="inline-flex items-center gap-2 text-sm">
      <span className="sr-only">{t("language")}</span>
      <select
        aria-label={t("language")}
        className="border rounded px-2 py-1"
        value={lang}
        onChange={(e) => setLang(e.target.value as any)}
      >
        <option value="en">EN</option>
        <option value="fr">FR</option>
        <option value="hlk">HLK</option>
      </select>
    </label>
  )
}
