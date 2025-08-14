"use client"

import { useActionState } from "react"
import { useFormStatus } from "react-dom"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Loader2 } from "lucide-react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { useEffect } from "react"
import { signIn } from "@/lib/auth-actions"

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
          Signing in...
        </>
      ) : (
        "Sign In to SafeRoute AI"
      )}
    </Button>
  )
}

export default function LoginForm() {
  const router = useRouter()
  const [state, formAction] = useActionState(signIn, null)

  useEffect(() => {
    if (state?.success) {
      router.push("/dashboard")
    }
  }, [state, router])

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
        <h1 className="text-4xl font-semibold tracking-tight text-white">Welcome Back</h1>
        <p className="text-lg text-gray-300">Sign in to your SafeRoute AI account</p>
      </div>

      <form action={formAction} className="space-y-6">
        {state?.error && (
          <div className="bg-red-500/10 border border-red-500/50 text-red-300 px-4 py-3 rounded-lg">{state.error}</div>
        )}

        <div className="space-y-4">
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
        </div>

        <SubmitButton />

        <div className="text-center text-gray-300">
          Don't have an account?{" "}
          <Link href="/auth/signup" className="text-green-400 hover:text-green-300 hover:underline">
            Sign up
          </Link>
        </div>
      </form>
    </div>
  )
}
