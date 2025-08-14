"use client"

import { UniversalNavigation } from "@/components/navigation/UniversalNavigation"
import { ProgressCard } from "@/components/progress/ProgressCard"
import { FeatureStatus } from "@/components/progress/FeatureStatus"

export default function DevProgressPage() {
  const frontendProgress = {
    category: "Frontend Development",
    completion: 85,
    completed: [
      "Landing Page with Inuksuk Logo",
      "Civilian Portal with Hero Mode",
      "Elder Portal with Cultural Elements",
      "Responder Portal with Emergency Tools",
      "Government Portal with Admin Features",
      "Community Portal with Engagement Tools",
      "Hero Profile System with Badges",
      "Incident Reporting Interface",
      "Fire Ban Portal",
      "AED Finder Integration",
      "Universal Navigation System",
      "Responsive Design Implementation",
    ],
    inProgress: ["Real-time UI Updates", "Mobile Optimization"],
    pending: ["Advanced Accessibility Features", "Offline Mode UI"],
  }

  const backendProgress = {
    category: "Backend Development",
    completion: 90,
    completed: [
      "Supabase Database Schema",
      "Authentication System (Login/Signup)",
      "User Profile Management",
      "Core API Routes (Incidents, Users, Resources)",
      "Real-time Subscriptions",
      "Role-based Access Control",
      "Server Actions for Forms",
      "Middleware for Session Management",
      "Database Helper Functions",
      "Error Handling & Validation",
    ],
    inProgress: ["Frontend-Backend Integration", "API Performance Optimization"],
    pending: ["Advanced Real-time Features", "Caching Layer"],
  }

  const databaseProgress = {
    category: "Database & Integration",
    completion: 95,
    completed: [
      "Complete Database Schema",
      "User Management Tables",
      "Incident Coordination Tables",
      "LAB Beacon Tracking",
      "Communications System",
      "Indigenous Governance (OCAP)",
      "Emergency Resources Database",
      "Traditional Territories Mapping",
      "Supabase Integration",
      "Real-time Database Subscriptions",
    ],
    inProgress: ["Data Migration Scripts"],
    pending: ["Advanced Analytics Tables"],
  }

  const designProgress = {
    category: "Design & UX",
    completion: 80,
    completed: [
      "SafeRoute AI Branding with Inuksuk",
      "Color System (Safety Green Primary)",
      "Typography System (2 Font Families)",
      "Portal-specific Color Schemes",
      "Consistent Button Styling",
      "Responsive Layout System",
      "Cultural Design Elements",
      "Accessibility Color Contrast",
      "Visual Hierarchy Implementation",
    ],
    inProgress: ["Advanced Animations", "Micro-interactions"],
    pending: ["Dark Mode Support", "Advanced Accessibility Features", "Print Stylesheets"],
  }

  const featuresProgress = {
    category: "Features & Functionality",
    completion: 75,
    completed: [
      "User Authentication & Roles",
      "Incident Reporting System",
      "Hero Profile & Badge System",
      "Community Engagement Tools",
      "Fire Ban Management",
      "AED Finder Integration",
      "Real-time Communications",
      "Emergency Coordination",
      "Cultural Protocol Automation",
      "Multi-language Support Framework",
    ],
    inProgress: ["Advanced Gamification", "Notification System", "Mobile App Features"],
    pending: [
      "AI-powered Recommendations",
      "Advanced Analytics Dashboard",
      "Third-party Integrations",
      "Offline Functionality",
    ],
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-indigo-900">
      <UniversalNavigation />

      <div className="container mx-auto px-4 py-8">
        <div className="text-center mb-12">
          <div className="flex items-center justify-center gap-4 mb-6">
            <div className="w-16 h-16 bg-gradient-to-br from-green-500 to-green-600 rounded-2xl flex items-center justify-center">
              <svg viewBox="0 0 100 100" className="w-10 h-10 fill-white">
                <circle cx="50" cy="15" r="8" />
                <rect x="20" y="35" width="60" height="8" rx="4" />
                <rect x="35" y="50" width="30" height="8" rx="4" />
                <rect x="25" y="65" width="50" height="8" rx="4" />
                <rect x="15" y="80" width="25" height="12" rx="6" />
                <rect x="60" y="80" width="25" height="12" rx="6" />
              </svg>
            </div>
            <div>
              <h1 className="text-4xl font-bold text-white">SafeRoute AI</h1>
              <p className="text-green-400 text-lg">Development Progress Tracker</p>
            </div>
          </div>

          <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 max-w-2xl mx-auto">
            <h2 className="text-2xl font-bold text-white mb-4">Overall Platform Status</h2>
            <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
              <div className="text-center">
                <div className="text-3xl font-bold text-green-400">85%</div>
                <div className="text-sm text-gray-300">Frontend</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-blue-400">90%</div>
                <div className="text-sm text-gray-300">Backend</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-purple-400">95%</div>
                <div className="text-sm text-gray-300">Database</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-orange-400">80%</div>
                <div className="text-sm text-gray-300">Design</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-teal-400">75%</div>
                <div className="text-sm text-gray-300">Features</div>
              </div>
            </div>
          </div>
        </div>

        <div className="grid gap-8">
          <ProgressCard {...frontendProgress} color="green" />
          <ProgressCard {...backendProgress} color="blue" />
          <ProgressCard {...databaseProgress} color="purple" />
          <ProgressCard {...designProgress} color="orange" />
          <ProgressCard {...featuresProgress} color="teal" />
        </div>

        <div className="mt-12 bg-white/10 backdrop-blur-sm rounded-2xl p-8">
          <h2 className="text-2xl font-bold text-white mb-6">Next Priority Items</h2>
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <h3 className="text-lg font-semibold text-green-400 mb-3">High Priority</h3>
              <div className="space-y-2">
                <FeatureStatus status="urgent" text="Complete Frontend-Backend Integration" />
                <FeatureStatus status="urgent" text="Mobile Optimization" />
                <FeatureStatus status="urgent" text="Advanced Real-time Features" />
              </div>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-blue-400 mb-3">Medium Priority</h3>
              <div className="space-y-2">
                <FeatureStatus status="medium" text="Dark Mode Support" />
                <FeatureStatus status="medium" text="Advanced Analytics Dashboard" />
                <FeatureStatus status="medium" text="Offline Functionality" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
