import AppLayout from "@/components/layout/AppLayout"
import CPRLoopScreen from "@/components/emergency/CPRLoopScreen"

export default function CPRLoopPage() {
  return (
    <AppLayout
      title="CPR in Progress"
      previousRoute="/cpr-check"
      nextRoute="/cpr-aed"
      previousLabel="Back to Assessment"
      nextLabel="AED Help"
    >
      <CPRLoopScreen />
    </AppLayout>
  )
}
