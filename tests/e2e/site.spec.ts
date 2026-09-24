import { expect, test } from "@playwright/test"

// Keep interaction tests independent of Cloudinary and the image optimizer cache.
// Use different aspect ratios to exercise photo sizing when navigating.
test.beforeEach(async ({ context }) => {
  await context.route(/\/_next\/image\?|https:\/\/res\.cloudinary\.com\//, async (route) => {
    const landscape = route.request().url().includes("purse2")
    await route.fulfill({
      contentType: "image/svg+xml",
      body: `<svg xmlns="http://www.w3.org/2000/svg" width="${landscape ? 960 : 640}" height="${landscape ? 640 : 960}"><rect width="100%" height="100%" fill="#a8a29e"/></svg>`,
    })
  })
})

test("portfolio navigation, visible headings and contact work at every viewport", async ({ page }) => {
  await page.goto("/")
  for (const title of ["Hospitality", "Fashion", "Dining"]) {
    await page.getByRole("navigation", { name: "Primary", exact: true }).getByRole("link", { name: title }).click()
    await expect(page).toHaveURL(new RegExp(`/${title.toLowerCase()}$`))
    await expect(page.getByRole("heading", { name: title, level: 1 })).toBeVisible()
    await expect(page.getByRole("link", { name: "Discuss a project" })).toHaveAttribute("href", "mailto:hello@bookmeaflight.eu")
    expect(await page.evaluate(() => document.documentElement.scrollWidth <= window.innerWidth)).toBe(true)
  }
})

test("keyboard opens, navigates, wraps, traps focus and restores the trigger", async ({ page }) => {
  await page.goto("/fashion")
  const trigger = page.getByRole("link", { name: "View Mustard purse larger", exact: true }).first()
  await trigger.focus()
  await page.keyboard.press("Enter")
  const dialog = page.getByRole("dialog")
  await expect(dialog).toBeVisible()
  const close = dialog.getByRole("button", { name: "Close expanded image" })
  await expect(close).toBeFocused()
  await expect(dialog.getByRole("status")).toHaveText("Image 1 of 10")
  await page.keyboard.press("Shift+Tab")
  await expect(dialog.getByRole("button", { name: "Next image", exact: true })).toBeFocused()
  await page.keyboard.press("Tab")
  await expect(close).toBeFocused()
  await page.keyboard.press("ArrowLeft")
  await expect(dialog.getByRole("status")).toHaveText("Image 10 of 10")
  await page.keyboard.press("ArrowRight")
  await page.keyboard.press("ArrowRight")
  await expect(dialog.getByRole("status")).toHaveText("Image 2 of 10")
  await expect(dialog.getByRole("img", { name: "Mustard purse", exact: true })).toBeVisible()
  await expect(page.locator("html")).toHaveCSS("overflow", "hidden")
  await page.keyboard.press("Escape")
  await expect(dialog).toHaveCount(0)
  await expect(trigger).toBeFocused()
  await expect(page.locator("html")).not.toHaveCSS("overflow", "hidden")
})

test("buttons navigate and close without leaving the gallery", async ({ page }) => {
  await page.goto("/fashion")
  await page.getByRole("link", { name: "View Mustard purse larger", exact: true }).first().click()
  const dialog = page.getByRole("dialog")
  await dialog.getByRole("button", { name: "Next image", exact: true }).click()
  await expect(dialog.getByRole("status")).toHaveText("Image 2 of 10")
  await dialog.getByRole("button", { name: "Previous image" }).click()
  await expect(dialog.getByRole("status")).toHaveText("Image 1 of 10")
  await dialog.getByRole("button", { name: "Close expanded image" }).click()
  await expect(dialog).toHaveCount(0)
  await expect(page).toHaveURL(/\/fashion$/)
})

test("photo clicks keep the lightbox open and empty space dismisses it", async ({ page }) => {
  await page.goto("/fashion")
  await page.getByRole("link", { name: "View Mustard purse larger", exact: true }).first().click()
  const dialog = page.getByRole("dialog")
  await dialog.getByRole("button", { name: "Next image", exact: true }).click()
  const photo = dialog.getByRole("img", { name: "Mustard purse", exact: true })
  await expect(photo).toBeVisible()
  await photo.click()
  await expect(dialog).toBeVisible()
  // Empty space well inside the photo area, beyond the dialog's padding.
  const viewport = page.viewportSize()!
  await page.mouse.click(viewport.width > 1000 ? 100 : viewport.width / 2, viewport.width > 1000 ? viewport.height / 2 : 140)
  await expect(dialog).toHaveCount(0)
})

test("thumbnail failures still allow opening the full-size image", async ({ page }) => {
  await page.route(/\/_next\/image\?.*mp-mustard-purse\.jpg/, (route) => route.abort())
  await page.goto("/fashion")
  const trigger = page.getByRole("link", { name: "View Mustard purse larger", exact: true }).first()
  await expect(trigger).toContainText("Image unavailable")
  await trigger.click()
  await expect(page.getByRole("dialog").getByRole("img", { name: "Mustard purse", exact: true })).toBeVisible()
})

test("failed full-size requests keep the preview and a direct link", async ({ page }) => {
  await page.route("https://res.cloudinary.com/**", (route) => route.abort())
  await page.goto("/fashion")
  const trigger = page.getByRole("link", { name: "View Mustard purse larger", exact: true }).first()
  await expect.poll(() => trigger.locator("img").evaluate((img: HTMLImageElement) => img.naturalWidth)).toBeGreaterThan(0)
  await trigger.click()
  const dialog = page.getByRole("dialog")
  await expect(dialog.getByText("Full-size image unavailable.", { exact: false })).toBeVisible()
  await expect(dialog.locator('img[aria-hidden="true"]')).toBeVisible()
  await expect(dialog.getByRole("link", { name: "Open image directly" })).toHaveAttribute("href", /res\.cloudinary\.com/)
})

test("a complete image failure reports the error and navigation still works", async ({ page }) => {
  await page.route(/.*mp-mustard-purse\.jpg.*/, (route) => route.abort())
  await page.goto("/fashion")
  await page.getByRole("link", { name: "View Mustard purse larger", exact: true }).first().click()
  const dialog = page.getByRole("dialog")
  await expect(dialog.getByText("Image unavailable.", { exact: false })).toBeVisible()
  await dialog.getByRole("button", { name: "Next image", exact: true }).click()
  await expect(dialog.getByRole("img", { name: "Mustard purse", exact: true })).toBeVisible()
  await expect(dialog.getByRole("status")).toHaveText("Image 2 of 10")
})

test("resizing an open lightbox keeps the image and controls within the viewport", async ({ page }) => {
  await page.goto("/fashion")
  await page.getByRole("link", { name: "View Mustard purse larger", exact: true }).first().click()
  await page.setViewportSize({ width: 844, height: 390 })
  const dialog = page.getByRole("dialog")
  const photo = dialog.getByRole("img", { name: "Mustard purse", exact: true })
  await expect(photo).toBeVisible()
  const bounds = await photo.boundingBox()
  expect(bounds!.y).toBeGreaterThanOrEqual(0)
  expect(bounds!.y + bounds!.height).toBeLessThanOrEqual(390)
  await expect(dialog.getByRole("button", { name: "Close expanded image" })).toBeInViewport()
  await expect(dialog.getByRole("button", { name: "Next image", exact: true })).toBeInViewport()
})

test.describe("without JavaScript", () => {
  test.use({ javaScriptEnabled: false })

  test("gallery photos remain visible and link directly to the image", async ({ page }) => {
    await page.goto("/fashion")
    const trigger = page.getByRole("link", { name: "View Mustard purse larger", exact: true }).first()
    const photo = trigger.locator("img")
    await expect(photo).toBeVisible()
    await expect(photo).toHaveCSS("opacity", "1")
    await expect.poll(() => photo.evaluate((img: HTMLImageElement) => img.naturalWidth)).toBeGreaterThan(0)
    const source = await trigger.getAttribute("href")
    await trigger.click()
    await expect(page).toHaveURL(source!)
  })
})
