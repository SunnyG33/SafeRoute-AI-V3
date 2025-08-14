import "@testing-library/jest-dom"
import jest from "jest"

// Mock environment variables
process.env.NEXT_PUBLIC_SUPABASE_URL = "https://test.supabase.co"
process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY = "test-anon-key"
process.env.NEXT_PUBLIC_BASE_URL = "http://localhost:3000"

// Mock window.location
Object.defineProperty(window, "location", {
  value: {
    href: "http://localhost:3000",
    origin: "http://localhost:3000",
  },
  writable: true,
})

// Mock geolocation
Object.defineProperty(navigator, "geolocation", {
  value: {
    getCurrentPosition: jest.fn((success) =>
      success({
        coords: {
          latitude: 49.2827,
          longitude: -123.1207,
        },
      }),
    ),
    watchPosition: jest.fn(),
    clearWatch: jest.fn(),
  },
  writable: true,
})
