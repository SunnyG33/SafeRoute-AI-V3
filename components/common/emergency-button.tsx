"use client"

import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

interface EmergencyButtonProps {
  children: React.ReactNode
  onClick: () => void
  variant?: "primary" | "secondary" | "danger" | "success"
  size?: "sm" | "md" | "lg" | "xl"
  disabled?: boolean
  className?: string
  icon?: React.ReactNode
}

export function EmergencyButton({
  children,
  onClick,
  variant = "primary",
  size = "lg",
  disabled = false,
  className = "",
  icon
}: EmergencyButtonProps) {
  const baseClasses = "font-bold transition-all duration-200 border-4 shadow-lg hover:shadow-xl active:scale-95"
  
  const variantClasses = {
    primary: "bg-blue-600 hover:bg-blue-700 text-white border-blue-800",
    secondary: "bg-gray-100 hover:bg-gray-200 text-gray-800 border-gray-400",
    danger: "bg-red-600 hover:bg-red-700 text-white border-red-800",
    success: "bg-green-600 hover:bg-green-700 text-white border-green-800"
  }

  const sizeClasses = {
    sm: "h-12 px-4 text-sm",
    md: "h-14 px-6 text-base",
    lg: "h-16 px-8 text-lg",
    xl: "h-20 px-10 text-xl"
  }

  return (
    <Button
      onClick={onClick}
      disabled={disabled}
      className={cn(
        baseClasses,
        variantClasses[variant],
        sizeClasses[size],
        disabled && "opacity-50 cursor-not-allowed",
        className
      )}
    >
      <div className="flex items-center gap-3">
        {icon && <span className="text-2xl">{icon}</span>}
        <span>{children}</span>
      </div>
    </Button>
  )
}
