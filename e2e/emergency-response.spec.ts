import { test, expect } from "@playwright/test"

test.describe("Emergency Response Flow", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/")
  })

  test("should allow civilian to report emergency incident", async ({ page }) => {
    // Navigate to civilian portal
    await page.click('[data-testid="civilian-portal"]')

    // Should redirect to login if not authenticated
    await expect(page).toHaveURL("/auth/login")

    // Login as civilian user
    await page.fill('[data-testid="email-input"]', "civilian@test.com")
    await page.fill('[data-testid="password-input"]', "testpassword")
    await page.click('[data-testid="login-button"]')

    // Should redirect to civilian portal after login
    await expect(page).toHaveURL("/civilian-portal-hero")

    // Report new incident
    await page.click('[data-testid="report-incident-button"]')
    await page.fill('[data-testid="incident-title"]', "Medical Emergency")
    await page.selectOption('[data-testid="incident-type"]', "medical")
    await page.selectOption('[data-testid="incident-priority"]', "high")
    await page.fill('[data-testid="incident-description"]', "Person collapsed at intersection")

    // Submit incident report
    await page.click('[data-testid="submit-incident"]')

    // Verify incident was created
    await expect(page.locator('[data-testid="incident-success"]')).toBeVisible()
    await expect(page.locator('[data-testid="incident-success"]')).toContainText("Incident reported successfully")
  })

  test("should show real-time incident updates to responders", async ({ page, context }) => {
    // Open two pages - one for civilian, one for responder
    const responderPage = await context.newPage()

    // Civilian reports incident
    await page.goto("/auth/login")
    await page.fill('[data-testid="email-input"]', "civilian@test.com")
    await page.fill('[data-testid="password-input"]', "testpassword")
    await page.click('[data-testid="login-button"]')

    // Responder logs in
    await responderPage.goto("/auth/login")
    await responderPage.fill('[data-testid="email-input"]', "responder@test.com")
    await responderPage.fill('[data-testid="password-input"]', "testpassword")
    await responderPage.click('[data-testid="login-button"]')

    // Navigate to responder portal
    await responderPage.goto("/responder-portal-hero")

    // Civilian reports incident
    await page.goto("/civilian-portal-hero")
    await page.click('[data-testid="report-incident-button"]')
    await page.fill('[data-testid="incident-title"]', "Fire Emergency")
    await page.selectOption('[data-testid="incident-type"]', "fire")
    await page.selectOption('[data-testid="incident-priority"]', "critical")
    await page.click('[data-testid="submit-incident"]')

    // Verify responder sees the incident in real-time
    await expect(responderPage.locator('[data-testid="live-incident-feed"]')).toContainText("Fire Emergency")
    await expect(responderPage.locator('[data-testid="incident-priority-critical"]')).toBeVisible()
  })

  test("should handle mobile emergency reporting", async ({ page }) => {
    // Set mobile viewport
    await page.setViewportSize({ width: 375, height: 667 })

    await page.goto("/civilian-portal-hero")

    // Verify mobile-optimized emergency button is large enough
    const emergencyButton = page.locator('[data-testid="emergency-button"]')
    await expect(emergencyButton).toBeVisible()

    const buttonBox = await emergencyButton.boundingBox()
    expect(buttonBox?.width).toBeGreaterThan(44) // Minimum touch target
    expect(buttonBox?.height).toBeGreaterThan(44)

    // Test emergency reporting on mobile
    await emergencyButton.click()
    await expect(page.locator('[data-testid="mobile-incident-form"]')).toBeVisible()
  })

  test("should validate emergency response time requirements", async ({ page }) => {
    await page.goto("/government-dashboard")

    // Login as government user
    await page.fill('[data-testid="email-input"]', "government@test.com")
    await page.fill('[data-testid="password-input"]', "testpassword")
    await page.click('[data-testid="login-button"]')

    // Check response time analytics
    await expect(page.locator('[data-testid="response-time-metrics"]')).toBeVisible()

    // Verify critical incidents show response time warnings
    const criticalIncidents = page.locator('[data-testid="critical-incidents"]')
    await expect(criticalIncidents).toBeVisible()

    // Check for response time compliance indicators
    await expect(page.locator('[data-testid="response-time-compliance"]')).toBeVisible()
  })
})
