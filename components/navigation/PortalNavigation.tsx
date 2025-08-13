"use client"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { Users, Shield, Building2, Heart, Home, ChevronRight } from "lucide-react"

const portals = [
  {
    id: "landing",
    name: "Home",
    path: "/landing",
    icon: Home,
    description: "SafeRoute AI Overview",
    color: "from-blue-500 to-cyan-400",
  },
  {
    id: "civilian",
    name: "Civilian Portal",
    path: "/civilian-portal-hero",
    icon: Heart,
    description: "HERO Mode Emergency Response",
    color: "from-red-500 to-pink-400",
  },
  {
    id: "responder",
    name: "Responder Portal",
    path: "/responder-portal-hero",
    icon: Shield,
    description: "HERO OS Professional Coordination",
    color: "from-blue-600 to-purple-500",
  },
  {
    id: "community",
    name: "Community Portal",
    path: "/community-portal",
    icon: Users,
    description: "Community Coordination Hub",
    color: "from-green-500 to-teal-400",
  },
  {
    id: "elder",
    name: "Elder Portal",
    path: "/elder-portal",
    icon: Users,
    description: "Indigenous Governance & Protocols",
    color: "from-amber-500 to-orange-400",
  },
  {
    id: "government",
    name: "Government Dashboard",
    path: "/government-dashboard",
    icon: Building2,
    description: "Multi-Agency Coordination",
    color: "from-indigo-500 to-blue-500",
  },
]

export default function PortalNavigation() {
  const pathname = usePathname()

  return (
    <div className="fixed top-4 right-4 z-50">
      <div className="bg-black/20 backdrop-blur-md border border-white/10 rounded-2xl p-4">
        <div className="flex flex-col gap-2">
          {portals.map((portal) => {
            const Icon = portal.icon
            const isActive = pathname === portal.path

            return (
              <Link
                key={portal.id}
                href={portal.path}
                className={`
                  flex items-center gap-3 px-4 py-2 rounded-xl transition-all duration-300
                  ${
                    isActive
                      ? "bg-gradient-to-r from-cyan-500/20 to-teal-500/20 border border-cyan-400/30"
                      : "hover:bg-white/5 border border-transparent"
                  }
                `}
              >
                <div
                  className={`
                  p-2 rounded-lg bg-gradient-to-r ${portal.color}
                  ${isActive ? "shadow-lg shadow-cyan-500/25" : ""}
                `}
                >
                  <Icon className="w-4 h-4 text-white" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="text-white text-sm font-medium truncate">{portal.name}</div>
                  <div className="text-white/60 text-xs truncate">{portal.description}</div>
                </div>
                {isActive && <ChevronRight className="w-4 h-4 text-cyan-400" />}
              </Link>
            )
          })}
        </div>
      </div>
    </div>
  )
}

export { PortalNavigation }
