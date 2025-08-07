import AppLayout from "@/components/layout/AppLayout"
import CommunityPortal from "@/components/community/CommunityPortal"

export default function CommunityPortalPage() {
  return (
    <AppLayout
      title="Community Portal"
      previousRoute="/landing"
      nextRoute="/hero-mode-landing"
      previousLabel="Back to Landing"
      nextLabel="Hero Mode"
    >
      <CommunityPortal />
    </AppLayout>
  )
}
