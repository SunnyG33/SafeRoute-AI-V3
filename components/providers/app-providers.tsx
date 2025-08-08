"use client"

import { AccessibilityProvider } from "@/components/providers/accessibility-provider"
import { I18nProvider } from "@/components/providers/i18n-provider"
import RegisterSW from "@/components/pwa/register-sw"
import { OfflineBanner } from "@/components/common/offline-banner"

export default function AppProviders({ children }: { children: React.ReactNode }) {
  return (
    <AccessibilityProvider>
      <I18nProvider>
        <RegisterSW />
        <OfflineBanner />
        {children}
      </I18nProvider>
    </AccessibilityProvider>
  )
}
