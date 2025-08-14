import { createClient } from "@/lib/supabase/server"
import { redirect } from "next/navigation"
import SignUpForm from "@/components/auth/SignUpForm"

export default async function SignUpPage() {
  const supabase = createClient()
  const {
    data: { session },
  } = await supabase.auth.getSession()

  if (session) {
    redirect("/dashboard")
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-indigo-900 flex items-center justify-center px-4 py-12 sm:px-6 lg:px-8">
      <SignUpForm />
    </div>
  )
}
