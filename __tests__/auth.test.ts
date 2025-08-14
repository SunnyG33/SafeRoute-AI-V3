import { signIn, signUp } from "@/lib/auth-actions"
import { createClient } from "@/lib/supabase/server"
import jest from "jest"

// Mock Supabase client
jest.mock("@/lib/supabase/server", () => ({
  createClient: jest.fn(() => ({
    auth: {
      signInWithPassword: jest.fn(),
      signUp: jest.fn(),
      signOut: jest.fn(),
    },
    from: jest.fn(() => ({
      insert: jest.fn(),
    })),
  })),
}))

// Mock Next.js functions
jest.mock("next/navigation", () => ({
  redirect: jest.fn(),
}))

jest.mock("next/cache", () => ({
  revalidatePath: jest.fn(),
}))

describe("Authentication", () => {
  const mockSupabase = createClient()

  beforeEach(() => {
    jest.clearAllMocks()
  })

  describe("signIn", () => {
    it("should successfully sign in with valid credentials", async () => {
      const mockUser = { id: "123", email: "test@example.com" }
      ;(mockSupabase.auth.signInWithPassword as jest.Mock).mockResolvedValue({
        data: { user: mockUser },
        error: null,
      })

      const formData = new FormData()
      formData.append("email", "test@example.com")
      formData.append("password", "password123")

      const result = await signIn(null, formData)

      expect(mockSupabase.auth.signInWithPassword).toHaveBeenCalledWith({
        email: "test@example.com",
        password: "password123",
      })
      expect(result).toEqual({ success: true })
    })

    it("should handle authentication errors", async () => {
      ;(mockSupabase.auth.signInWithPassword as jest.Mock).mockResolvedValue({
        data: { user: null },
        error: { message: "Invalid credentials" },
      })

      const formData = new FormData()
      formData.append("email", "invalid@example.com")
      formData.append("password", "wrongpassword")

      const result = await signIn(null, formData)

      expect(result).toEqual({
        error: "Invalid credentials",
      })
    })

    it("should require email and password", async () => {
      const formData = new FormData()
      formData.append("email", "test@example.com")
      // Missing password

      const result = await signIn(null, formData)

      expect(result).toEqual({
        error: "Email and password are required",
      })
    })
  })

  describe("signUp", () => {
    it("should successfully create new user account", async () => {
      const mockUser = { id: "456", email: "newuser@example.com" }
      ;(mockSupabase.auth.signUp as jest.Mock).mockResolvedValue({
        data: { user: mockUser },
        error: null,
      })
      ;(mockSupabase.from as jest.Mock).mockReturnValue({
        insert: jest.fn().mockResolvedValue({ error: null }),
      })

      const formData = new FormData()
      formData.append("email", "newuser@example.com")
      formData.append("password", "newpassword123")
      formData.append("firstName", "John")
      formData.append("lastName", "Doe")
      formData.append("role", "civilian")

      const result = await signUp(null, formData)

      expect(mockSupabase.auth.signUp).toHaveBeenCalledWith({
        email: "newuser@example.com",
        password: "newpassword123",
        options: {
          emailRedirectTo: expect.any(String),
          data: {
            first_name: "John",
            last_name: "Doe",
            role: "civilian",
          },
        },
      })
      expect(result).toEqual({
        success: "Check your email to confirm your account.",
      })
    })

    it("should require all fields", async () => {
      const formData = new FormData()
      formData.append("email", "test@example.com")
      // Missing other required fields

      const result = await signUp(null, formData)

      expect(result).toEqual({
        error: "All fields are required",
      })
    })
  })
})
