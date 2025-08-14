export default function HomePage() {
  return (
    <div style={{ minHeight: "100vh", backgroundColor: "#0f172a", color: "white", padding: "64px 16px" }}>
      <div style={{ textAlign: "center", maxWidth: "800px", margin: "0 auto" }}>
        <h1 style={{ fontSize: "48px", fontWeight: "bold", color: "#22c55e", marginBottom: "32px" }}>SafeRoute AI</h1>
        <p style={{ fontSize: "24px", marginBottom: "32px", color: "#d1d5db" }}>
          Indigenous-led Emergency Response Infrastructure
        </p>
        <button
          style={{
            backgroundColor: "#16a34a",
            color: "white",
            padding: "12px 32px",
            border: "none",
            borderRadius: "8px",
            fontSize: "18px",
            cursor: "pointer",
          }}
        >
          Get Started
        </button>
        <div style={{ marginTop: "16px", fontSize: "14px", color: "#9ca3af" }}>Testing basic HTML rendering</div>
      </div>
    </div>
  )
}
