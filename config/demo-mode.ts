export function isDemoModeDefault(): boolean {
  // Prefer explicit env if exposed to the client, otherwise default to true.
  // Note: In Next.js, client env must be NEXT_PUBLIC_*
  if (typeof window !== 'undefined') {
    try {
      const forced = localStorage.getItem('sr_demo_mode_forced')
      if (forced === 'on') return true
      if (forced === 'off') return false
    } catch {}
  }
  // Default to demo mode to be safe.
  return true
}
