"use server"

import { createClient } from "@/lib/supabase/server"
import { revalidatePath } from "next/cache"

export async function updateProfile(prevState: any, formData: FormData) {
  if (!formData) {
    return { error: "Form data is missing" }
  }

  const userId = formData.get("userId")
  const firstName = formData.get("firstName")
  const lastName = formData.get("lastName")
  const phone = formData.get("phone")
  const preferredName = formData.get("preferredName")
  const preferredLanguage = formData.get("preferredLanguage")
  const homeTerritory = formData.get("homeTerritory")
  const traditionalTerritory = formData.get("traditionalTerritory")
  const nationAffiliation = formData.get("nationAffiliation")

  if (!userId || !firstName || !lastName) {
    return { error: "Required fields are missing" }
  }

  const supabase = createClient()

  try {
    const { error } = await supabase
      .from("users")
      .update({
        first_name: firstName.toString(),
        last_name: lastName.toString(),
        phone: phone?.toString() || null,
        preferred_name: preferredName?.toString() || null,
        preferred_language: preferredLanguage?.toString() || "english",
        home_territory: homeTerritory?.toString() || null,
        traditional_territory: traditionalTerritory?.toString() || null,
        nation_affiliation: nationAffiliation?.toString() || null,
        updated_at: new Date().toISOString(),
      })
      .eq("id", userId.toString())

    if (error) {
      console.error("Profile update error:", error)
      return { error: error.message }
    }

    revalidatePath("/dashboard")
    revalidatePath("/profile/edit")
    return { success: true }
  } catch (error) {
    console.error("Profile update error:", error)
    return { error: "An unexpected error occurred. Please try again." }
  }
}
