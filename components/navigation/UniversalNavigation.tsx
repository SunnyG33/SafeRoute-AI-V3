"use client"

import { useState } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import {
  Home,
  ArrowLeft,
  ArrowRight,
  Menu,
  X,
  Shield,
  Heart,
  Users,
  Crown,
  Building2,
  Star,
  ChevronDown,
  Navigation,
} from "lucide-react"
import { Button } from "@/components/ui/button"

const navigationRoutes = [
  { path: "/landing", name: "Home", icon: Home, color: "from-blue-500 to-cyan-400" },
  { path: "/portal-hub", name: "Portal Hub", icon: Navigation, color: "from-purple-500 to-indigo-500" },
  { path: "/civilian-portal-hero", name: "Civilian Portal", icon: Heart, color: "from-red-500 to-pink-400" },
  { path: "/responder-portal-hero", name: "Responder Portal", icon: Shield, color: "from-blue-600 to-purple-500" },
  { path: "/elder-portal", name: "Elder Portal", icon: Crown, color: "from-amber-500 to-orange-400" },
  { path: "/community-portal", name: "Community Portal", icon: Users, color: "from-green-500 to-teal-400" },
  {
    path: "/government-dashboard",
    name: "Government Dashboard",
    icon: Building2,
    color: "from-indigo-500 to-blue-500",
  },
  { path: "/patent-wheel", name: "Patent Wheel", icon: Star, color: "from-purple-500 to-pink-500" },
]

interface UniversalNavigationProps {
  showBackButton?: boolean
  showNextPrevious?: boolean
  customBackPath?: string
  customBackLabel?: string
}

export default function UniversalNavigation({
  showBackButton = true,
  showNextPrevious = false,
  customBackPath,
  customBackLabel = "Back",
}: UniversalNavigationProps) {
  const [isOpen, setIsOpen] = useState(false)
  const pathname = usePathname()

  const currentRouteIndex = navigationRoutes.findIndex((route) => route.path === pathname)
  const previousRoute = currentRouteIndex > 0 ? navigationRoutes[currentRouteIndex - 1] : null
  const nextRoute = currentRouteIndex < navigationRoutes.length - 1 ? navigationRoutes[currentRouteIndex + 1] : null

  return (
    <>
      {/* Fixed Navigation Bar */}
      <div className="fixed top-0 left-0 right-0 z-50 bg-black/20 backdrop-blur-md border-b border-white/10">
        <div className="container mx-auto px-4 py-3">
          <div className="flex items-center justify-between">
            {/* Left Side - Back/Home Buttons */}
            <div className="flex items-center gap-2">
              {showBackButton && (
                <Link href={customBackPath || "/landing"}>
                  <Button
                    size="sm"
                    className="bg-white/10 hover:bg-white/20 text-white border border-white/20 backdrop-blur-sm"
                  >
                    <ArrowLeft className="w-4 h-4 mr-2" />
                    {customBackLabel}
                  </Button>
                </Link>
              )}

              <Link href="/landing">
                <Button
                  size="sm"
                  className="bg-blue-500/20 hover:bg-blue-500/30 text-blue-300 border border-blue-500/30 backdrop-blur-sm"
                >
                  <Home className="w-4 h-4 mr-2" />
                  Home
                </Button>
              </Link>

              <Link href="/portal-hub">
                <Button
                  size="sm"
                  className="bg-purple-500/20 hover:bg-purple-500/30 text-purple-300 border border-purple-500/30 backdrop-blur-sm"
                >
                  <Navigation className="w-4 h-4 mr-2" />
                  Portal Hub
                </Button>
              </Link>
            </div>

            {/* Center - Current Page Indicator */}
            <div className="hidden md:flex items-center gap-2 px-4 py-2 bg-white/10 rounded-lg backdrop-blur-sm border border-white/20">
              {navigationRoutes.find((route) => route.path === pathname) && (
                <>
                  {(() => {
                    const currentRoute = navigationRoutes.find((route) => route.path === pathname)!
                    const Icon = currentRoute.icon
                    return (
                      <>
                        <div className={`p-1 rounded bg-gradient-to-r ${currentRoute.color}`}>
                          <Icon className="w-4 h-4 text-white" />
                        </div>
                        <span className="text-white font-medium text-sm">{currentRoute.name}</span>
                      </>
                    )
                  })()}
                </>
              )}
            </div>

            {/* Right Side - Menu & Navigation */}
            <div className="flex items-center gap-2">
              {/* Previous/Next Buttons */}
              {showNextPrevious && (
                <>
                  {previousRoute && (
                    <Link href={previousRoute.path}>
                      <Button
                        size="sm"
                        className="bg-white/10 hover:bg-white/20 text-white border border-white/20 backdrop-blur-sm"
                      >
                        <ArrowLeft className="w-4 h-4 mr-2" />
                        Previous
                      </Button>
                    </Link>
                  )}

                  {nextRoute && (
                    <Link href={nextRoute.path}>
                      <Button
                        size="sm"
                        className="bg-white/10 hover:bg-white/20 text-white border border-white/20 backdrop-blur-sm"
                      >
                        Next
                        <ArrowRight className="w-4 h-4 ml-2" />
                      </Button>
                    </Link>
                  )}
                </>
              )}

              {/* Menu Toggle */}
              <Button
                size="sm"
                onClick={() => setIsOpen(!isOpen)}
                className="bg-white/10 hover:bg-white/20 text-white border border-white/20 backdrop-blur-sm"
              >
                {isOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
                <ChevronDown className={`w-3 h-3 ml-1 transition-transform ${isOpen ? "rotate-180" : ""}`} />
              </Button>
            </div>
          </div>
        </div>

        {/* Dropdown Menu */}
        {isOpen && (
          <div className="bg-black/40 backdrop-blur-md border-t border-white/10">
            <div className="container mx-auto px-4 py-4">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                {navigationRoutes.map((route) => {
                  const Icon = route.icon
                  const isActive = pathname === route.path

                  return (
                    <Link
                      key={route.path}
                      href={route.path}
                      onClick={() => setIsOpen(false)}
                      className={`
                        flex items-center gap-3 p-3 rounded-lg transition-all duration-200
                        ${
                          isActive
                            ? "bg-gradient-to-r from-cyan-500/20 to-teal-500/20 border border-cyan-400/30"
                            : "bg-white/5 hover:bg-white/10 border border-white/10 hover:border-white/20"
                        }
                      `}
                    >
                      <div className={`p-2 rounded-lg bg-gradient-to-r ${route.color}`}>
                        <Icon className="w-4 h-4 text-white" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="text-white text-sm font-medium truncate">{route.name}</div>
                      </div>
                    </Link>
                  )
                })}
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Spacer to prevent content from being hidden under fixed nav */}
      <div className="h-16" />
    </>
  )
}
