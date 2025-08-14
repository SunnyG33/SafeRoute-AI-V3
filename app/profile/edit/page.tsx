import { createClient } from "@/lib/supabase/server"
import { redirect } from "next/navigation"
import { UniversalNavigation } from "@/components/navigation/UniversalNavigation"
import ProfileEditForm from "@/components/profile/ProfileEditForm"

export default async function ProfileEditPage() {
  const supabase = createClient()

  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    redirect("/auth/login")
  }

  // Get user profile from our users table
  const { data: profile } = await supabase.from("users").select("*").eq("id", user.id).single()

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-indigo-900">
      <UniversalNavigation />

      <div className="container mx-auto px-4 py-8">
        <div className="max-w-2xl mx-auto">
          <div className="text-center space-y-4 mb-8">
            <h1 className="text-4xl font-bold text-white">Edit Profile</h1>
            <p className="text-xl text-gray-300">Update your SafeRoute AI account information</p>
          </div>

          <ProfileEditForm user={user} profile={profile} />
        </div>
      </div>
    </div>
  )
}
