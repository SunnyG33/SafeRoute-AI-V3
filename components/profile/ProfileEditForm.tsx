"use client"

import { useActionState } from "react"
import { useFormStatus } from "react-dom"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Loader2, Save, ArrowLeft } from "lucide-react"
import Link from "next/link"
import { updateProfile } from "@/lib/profile-actions"

function SubmitButton() {
  const { pending } = useFormStatus()

  return (
    <Button
      type="submit"
      disabled={pending}
      className="bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white"
    >
      {pending ? (
        <>
          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
          Saving...
        </>
      ) : (
        <>
          <Save className="mr-2 h-4 w-4" />
          Save Changes
        </>
      )}
    </Button>
  )
}

interface ProfileEditFormProps {
  user: any
  profile: any
}

export default function ProfileEditForm({ user, profile }: ProfileEditFormProps) {
  const [state, formAction] = useActionState(updateProfile, null)

  return (
    <Card className="bg-white/10 backdrop-blur-sm border-white/20">
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="text-white">Profile Information</CardTitle>
          <Link href="/dashboard">
            <Button variant="outline" className="border-white/20 text-white hover:bg-white/10 bg-transparent">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Dashboard
            </Button>
          </Link>
        </div>
      </CardHeader>
      <CardContent>
        <form action={formAction} className="space-y-6">
          <input type="hidden" name="userId" value={user.id} />

          {state?.error && (
            <div className="bg-red-500/10 border border-red-500/50 text-red-300 px-4 py-3 rounded-lg">
              {state.error}
            </div>
          )}

          {state?.success && (
            <div className="bg-green-500/10 border border-green-500/50 text-green-300 px-4 py-3 rounded-lg">
              Profile updated successfully!
            </div>
          )}

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label htmlFor="firstName" className="block text-sm font-medium text-gray-300">
                First Name
              </label>
              <Input
                id="firstName"
                name="firstName"
                type="text"
                defaultValue={profile?.first_name || ""}
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
                defaultValue={profile?.last_name || ""}
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
              defaultValue={user.email}
              disabled
              className="bg-white/5 border-white/10 text-gray-400"
            />
            <p className="text-xs text-gray-400">Email cannot be changed. Contact support if needed.</p>
          </div>

          <div className="space-y-2">
            <label htmlFor="phone" className="block text-sm font-medium text-gray-300">
              Phone Number
            </label>
            <Input
              id="phone"
              name="phone"
              type="tel"
              defaultValue={profile?.phone || ""}
              className="bg-white/10 border-white/20 text-white placeholder:text-gray-400"
              placeholder="+1 (555) 123-4567"
            />
          </div>

          <div className="space-y-2">
            <label htmlFor="preferredName" className="block text-sm font-medium text-gray-300">
              Preferred Name
            </label>
            <Input
              id="preferredName"
              name="preferredName"
              type="text"
              defaultValue={profile?.preferred_name || ""}
              className="bg-white/10 border-white/20 text-white placeholder:text-gray-400"
              placeholder="How you'd like to be addressed"
            />
          </div>

          <div className="space-y-2">
            <label htmlFor="preferredLanguage" className="block text-sm font-medium text-gray-300">
              Preferred Language
            </label>
            <Select name="preferredLanguage" defaultValue={profile?.preferred_language || "english"}>
              <SelectTrigger className="bg-white/10 border-white/20 text-white">
                <SelectValue placeholder="Select language" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="english">English</SelectItem>
                <SelectItem value="french">French</SelectItem>
                <SelectItem value="cree">Cree</SelectItem>
                <SelectItem value="ojibwe">Ojibwe</SelectItem>
                <SelectItem value="inuktitut">Inuktitut</SelectItem>
                <SelectItem value="other">Other</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <label htmlFor="homeTerritory" className="block text-sm font-medium text-gray-300">
              Home Territory
            </label>
            <Input
              id="homeTerritory"
              name="homeTerritory"
              type="text"
              defaultValue={profile?.home_territory || ""}
              className="bg-white/10 border-white/20 text-white placeholder:text-gray-400"
              placeholder="Your home community or territory"
            />
          </div>

          <div className="space-y-2">
            <label htmlFor="traditionalTerritory" className="block text-sm font-medium text-gray-300">
              Traditional Territory
            </label>
            <Input
              id="traditionalTerritory"
              name="traditionalTerritory"
              type="text"
              defaultValue={profile?.traditional_territory || ""}
              className="bg-white/10 border-white/20 text-white placeholder:text-gray-400"
              placeholder="Traditional territory or nation"
            />
          </div>

          <div className="space-y-2">
            <label htmlFor="nationAffiliation" className="block text-sm font-medium text-gray-300">
              Nation Affiliation
            </label>
            <Input
              id="nationAffiliation"
              name="nationAffiliation"
              type="text"
              defaultValue={profile?.nation_affiliation || ""}
              className="bg-white/10 border-white/20 text-white placeholder:text-gray-400"
              placeholder="First Nation, Métis, or Inuit affiliation"
            />
          </div>

          <div className="flex justify-end space-x-4">
            <Link href="/dashboard">
              <Button variant="outline" className="border-white/20 text-white hover:bg-white/10 bg-transparent">
                Cancel
              </Button>
            </Link>
            <SubmitButton />
          </div>
        </form>
      </CardContent>
    </Card>
  )
}
