"use client"
import CPRCheckScreen from "@/components/emergency/CPRCheckScreen"
import { useRouter } from "next/navigation"

export default function CPRGuidePage() {
  const router = useRouter()

  const handleStartCPR = () => {
    // Navigate to CPR loop screen
    router.push("/cpr-loop")
  }

  const handleExit = () => {
    router.push("/hero-mode-landing")
  }

  return <CPRCheckScreen onStartCPR={handleStartCPR} onExit={handleExit} autoCall911={true} />
}
