"use client"
import CPRCheckScreen from "@/components/emergency/CPRCheckScreen"
import { useRouter } from "next/navigation"

export default function CPRCheckPage() {
  const router = useRouter()

  const handleStartCPR = () => {
    router.push("/cpr-loop")
  }

  const handleExit = () => {
    router.push("/hero-mode-landing")
  }

  return <CPRCheckScreen onStartCPR={handleStartCPR} onExit={handleExit} autoCall911={true} />
}
