import { POST, GET } from "@/app/api/incidents/route"
import { createClient } from "@/lib/supabase/server"
import jest from "jest"

// Mock Supabase server client
jest.mock("@/lib/supabase/server", () => ({
  createClient: jest.fn(() => ({
    from: jest.fn(() => ({
      insert: jest.fn(() => ({
        select: jest.fn(() => ({
          single: jest.fn(),
        })),
      })),
      select: jest.fn(() => ({
        order: jest.fn(() => ({
          limit: jest.fn(),
        })),
      })),
    })),
    auth: {
      getUser: jest.fn(),
    },
  })),
}))

// Mock Next.js headers
jest.mock("next/headers", () => ({
  cookies: jest.fn(() => ({
    get: jest.fn(),
    set: jest.fn(),
  })),
}))

describe("/api/incidents", () => {
  const mockSupabase = createClient()

  beforeEach(() => {
    jest.clearAllMocks()
  })

  describe("POST /api/incidents", () => {
    it("should create new incident successfully", async () => {
      const mockUser = { id: "123", email: "responder@example.com" }
      const mockIncident = {
        id: "456",
        title: "Medical Emergency",
        type: "medical",
        priority: "high",
        status: "active",
      }
      ;(mockSupabase.auth.getUser as jest.Mock).mockResolvedValue({
        data: { user: mockUser },
        error: null,
      })

      const mockSingle = jest.fn().mockResolvedValue({
        data: mockIncident,
        error: null,
      })
      ;(mockSupabase.from as jest.Mock).mockReturnValue({
        insert: jest.fn().mockReturnValue({
          select: jest.fn().mockReturnValue({
            single: mockSingle,
          }),
        }),
      })

      const request = new Request("http://localhost:3000/api/incidents", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          title: "Medical Emergency",
          type: "medical",
          priority: "high",
          location: { lat: 49.2827, lng: -123.1207 },
          description: "Person collapsed at intersection",
        }),
      })

      const response = await POST(request)

      expect(response.status).toBe(201)
    })

    it("should require authentication", async () => {
      ;(mockSupabase.auth.getUser as jest.Mock).mockResolvedValue({
        data: { user: null },
        error: { message: "Not authenticated" },
      })

      const request = new Request("http://localhost:3000/api/incidents", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          title: "Test Incident",
          type: "fire",
          priority: "medium",
        }),
      })

      const response = await POST(request)

      expect(response.status).toBe(401)
    })
  })

  describe("GET /api/incidents", () => {
    it("should return list of incidents", async () => {
      const mockIncidents = [
        { id: "1", title: "Fire Emergency", type: "fire", priority: "high" },
        { id: "2", title: "Medical Call", type: "medical", priority: "medium" },
      ]

      const mockLimit = jest.fn().mockResolvedValue({
        data: mockIncidents,
        error: null,
      })
      ;(mockSupabase.from as jest.Mock).mockReturnValue({
        select: jest.fn().mockReturnValue({
          order: jest.fn().mockReturnValue({
            limit: mockLimit,
          }),
        }),
      })

      const request = new Request("http://localhost:3000/api/incidents")
      const response = await GET(request)

      expect(response.status).toBe(200)
    })
  })
})
