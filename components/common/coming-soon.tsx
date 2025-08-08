"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { X, Clock } from 'lucide-react'

interface ComingSoonButtonProps {
  label: string
  message: string
  className?: string
}

export function ComingSoonButton({ label, message, className = "" }: ComingSoonButtonProps) {
  const [showModal, setShowModal] = useState(false)

  return (
    <>
      <Button
        onClick={() => setShowModal(true)}
        variant="outline"
        className={`border-2 border-dashed border-gray-400 text-gray-600 hover:border-gray-500 ${className}`}
      >
        <Clock className="h-4 w-4 mr-2" />
        {label}
      </Button>

      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <Card className="w-full max-w-md">
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle className="text-lg">Coming Soon</CardTitle>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setShowModal(false)}
                className="h-6 w-6 p-0"
              >
                <X className="h-4 w-4" />
              </Button>
            </CardHeader>
            <CardContent>
              <p className="text-gray-700 mb-4">{message}</p>
              <Button onClick={() => setShowModal(false)} className="w-full">
                Got it
              </Button>
            </CardContent>
          </Card>
        </div>
      )}
    </>
  )
}
