export type Lang = "en" | "fr" | "hlk"
export const defaultLang: Lang = "en"

export const dictionaries: Record<Lang, Record<string, string>> = {
  en: {
    accessibility: "Accessibility",
    jumboText: "Jumbo Text",
    highContrast: "High Contrast",
    language: "Language",
    masterContext: "Master Context",
    back: "Back",
    openHeroMode: "Open Hero Mode",
  },
  fr: {
    accessibility: "Accessibilité",
    jumboText: "Texte Jumbo",
    highContrast: "Contraste Élevé",
    language: "Langue",
    masterContext: "Contexte Maître",
    back: "Retour",
    openHeroMode: "Ouvrir Mode Hero",
  },
  hlk: {
    // Placeholder strings; replace with community-approved translations
    accessibility: "Accessibility (HLK)",
    jumboText: "Jumbo Text (HLK)",
    highContrast: "High Contrast (HLK)",
    language: "Language (HLK)",
    masterContext: "Master Context (HLK)",
    back: "Back (HLK)",
    openHeroMode: "Open Hero Mode (HLK)",
  },
}
