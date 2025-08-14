"use client"

import { useActionState } from "react"
import { useFormStatus } from "react-dom"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Loader2 } from "lucide-react"
import Link from "next/link"
import { signUp } from "@/lib/auth-actions"

function SubmitButton() {
  const { pending } = useFormStatus()

  return (
    <Button
      type="submit"
      disabled={pending}
      className="w-full bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white py-6 text-lg font-medium rounded-lg h-[60px]"
    >
      {pending ? (
        <>
          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
          Creating account...
        </>
      ) : (
        "Join SafeRoute AI"
      )}
    </Button>
  )
}

export default function SignUpForm() {
  const [state, formAction] = useActionState(signUp, null)

  return (
    <div className="w-full max-w-md space-y-8 bg-white/10 backdrop-blur-sm p-8 rounded-2xl border border-white/20">
      <div className="space-y-2 text-center">
        <div className="flex items-center justify-center mb-4">
          <div className="w-16 h-16 bg-gradient-to-br from-green-400 to-green-600 rounded-2xl flex items-center justify-center">
            <svg viewBox="0 0 100 100" className="w-10 h-10 text-white">
              <circle cx="50" cy="50" r="45" fill="none" stroke="currentColor" strokeWidth="3" />
              <path
                d="M50 15 L50 25 M35 30 L65 30 M40 40 L60 40 M45 50 L55 50 M35 65 L45 65 M55 65 L65 65 M40 75 L45 85 M55 85 L60 75"
                fill="currentColor"
                stroke="currentColor"
                strokeWidth="2"
              />
            </svg>
          </div>
        </div>
        <h1 className="text-4xl font-semibold tracking-tight text-white">Join SafeRoute AI</h1>
        <p className="text-lg text-gray-300">Create your emergency response account</p>
      </div>

      <form action={formAction} className="space-y-6">
        {state?.error && (
          <div className="bg-red-500/10 border border-red-500/50 text-red-300 px-4 py-3 rounded-lg">{state.error}</div>
        )}

        {state?.success && (
          <div className="bg-green-500/10 border border-green-500/50 text-green-300 px-4 py-3 rounded-lg">
            {state.success}
          </div>
        )}

        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <label htmlFor="firstName" className="block text-sm font-medium text-gray-300">
                First Name
              </label>
              <Input
                id="firstName"
                name="firstName"
                type="text"
                required
                className="bg-white/10 border-white/20 text-white placeholder:text-gray-400"
              />
            </div>
            <div className="space-y-2">
              <label htmlFor="lastName" className="block text-sm font-medium text-gray-300">
                Last Name
              </label>
              <Input
                id="lastName"
                name="lastName"
                type="text"
                required
                className="bg-white/10 border-white/20 text-white placeholder:text-gray-400"
              />
            </div>
          </div>

          <div className="space-y-2">
            <label htmlFor="email" className="block text-sm font-medium text-gray-300">
              Email
            </label>
            <Input
              id="email"
              name="email"
              type="email"
              placeholder="you@example.com"
              required
              className="bg-white/10 border-white/20 text-white placeholder:text-gray-400"
            />
          </div>

          <div className="space-y-2">
            <label htmlFor="password" className="block text-sm font-medium text-gray-300">
              Password
            </label>
            <Input
              id="password"
              name="password"
              type="password"
              required
              className="bg-white/10 border-white/20 text-white"
            />
          </div>

          <div className="space-y-2">
            <label htmlFor="role" className="block text-sm font-medium text-gray-300">
              Account Type
            </label>
            <Select name="role" defaultValue="civilian">
              <SelectTrigger className="bg-white/10 border-white/20 text-white">
                <SelectValue placeholder="Select your role" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="civilian">Civilian</SelectItem>
                <SelectItem value="elder">Elder</SelectItem>
                <SelectItem value="responder">First Responder</SelectItem>
                <SelectItem value="government">Government Official</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        <SubmitButton />

        <div className="text-center text-gray-300">
          Already have an account?{" "}
          <Link href="/auth/login" className="text-green-400 hover:text-green-300 hover:underline">
            Sign in
          </Link>
        </div>
      </form>
    </div>
  )
}
