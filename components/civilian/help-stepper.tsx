"use client"

export function HelpStepper() {
  const steps = [
    { title: "1. Check safety", text: "Ensure the area is safe for you and others." },
    { title: "2. Call for help", text: "Use Hero Mode or dial 911 in an emergency." },
    { title: "3. Share location", text: "Share approx. location if you’re unsure." },
    { title: "4. Stay calm", text: "Use the Calming Overlay to breathe." },
  ]
  return (
    <ol className="space-y-3">
      {steps.map((s) => (
        <li key={s.title} className="rounded border p-3 bg-white">
          <div className="font-semibold">{s.title}</div>
          <div className="text-sm text-slate-600">{s.text}</div>
        </li>
      ))}
    </ol>
  )
}
