"use client"

import type React from "react"

import { Button } from "@/components/ui/button"
import { ArrowLeft, ArrowRight, Home, Menu } from "lucide-react"
import { useRouter } from "next/navigation"
import { useState } from "react"

interface AppLayoutProps {
  children: React.ReactNode
  title?: string
  previousRoute?: string
  nextRoute?: string
  previousLabel?: string
  nextLabel?: string
}

export { AppLayout }
export default function AppLayout({
  children,
  title = "SafeRoute AI",
  previousRoute,
  nextRoute,
  previousLabel = "Previous",
  nextLabel = "Next",
}: AppLayoutProps) {
  const router = useRouter()
  const [showMobileNav, setShowMobileNav] = useState(false)

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      {/* Top Navigation Bar */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* Left: Previous Button */}
            <div className="flex items-center space-x-4">
              {previousRoute && (
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => router.push(previousRoute)}
                  className="hidden sm:flex items-center space-x-2"
                >
                  <ArrowLeft className="h-4 w-4" />
                  <span>{previousLabel}</span>
                </Button>
              )}
              <Button variant="ghost" size="sm" onClick={() => setShowMobileNav(!showMobileNav)} className="sm:hidden">
                <Menu className="h-4 w-4" />
              </Button>
            </div>

            {/* Center: Title */}
            <div className="flex-1 text-center">
              <h1 className="text-lg font-semibold text-gray-900 truncate">{title}</h1>
            </div>

            {/* Right: Next Button */}
            <div className="flex items-center space-x-4">
              <Button
                variant="outline"
                size="sm"
                onClick={() => router.push("/landing")}
                className="flex items-center space-x-2"
              >
                <Home className="h-4 w-4" />
                <span className="hidden sm:inline">Return to Homebase</span>
              </Button>
              {nextRoute && (
                <Button
                  variant="default"
                  size="sm"
                  onClick={() => router.push(nextRoute)}
                  className="hidden sm:flex items-center space-x-2"
                >
                  <span>{nextLabel}</span>
                  <ArrowRight className="h-4 w-4" />
                </Button>
              )}
            </div>
          </div>
        </div>

        {/* Mobile Navigation */}
        {showMobileNav && (
          <div className="sm:hidden bg-gray-50 border-t px-4 py-3 space-y-2">
            {previousRoute && (
              <Button
                variant="outline"
                size="sm"
                onClick={() => router.push(previousRoute)}
                className="w-full flex items-center justify-center space-x-2"
              >
                <ArrowLeft className="h-4 w-4" />
                <span>{previousLabel}</span>
              </Button>
            )}
            {nextRoute && (
              <Button
                variant="default"
                size="sm"
                onClick={() => router.push(nextRoute)}
                className="w-full flex items-center justify-center space-x-2"
              >
                <span>{nextLabel}</span>
                <ArrowRight className="h-4 w-4" />
              </Button>
            )}
          </div>
        )}
      </div>

      {/* Main Content */}
      <main className="flex-1">{children}</main>

      {/* Bottom Navigation for Mobile */}
      <div className="sm:hidden bg-white border-t px-4 py-3 flex justify-between items-center">
        {previousRoute ? (
          <Button
            variant="outline"
            size="sm"
            onClick={() => router.push(previousRoute)}
            className="flex items-center space-x-1"
          >
            <ArrowLeft className="h-4 w-4" />
            <span className="text-xs">{previousLabel}</span>
          </Button>
        ) : (
          <div></div>
        )}

        <Button
          variant="ghost"
          size="sm"
          onClick={() => router.push("/landing")}
          className="flex items-center space-x-1"
        >
          <Home className="h-4 w-4" />
          <span className="text-xs">Home</span>
        </Button>

        {nextRoute ? (
          <Button
            variant="default"
            size="sm"
            onClick={() => router.push(nextRoute)}
            className="flex items-center space-x-1"
          >
            <span className="text-xs">{nextLabel}</span>
            <ArrowRight className="h-4 w-4" />
          </Button>
        ) : (
          <div></div>
        )}
      </div>
    </div>
  )
}
