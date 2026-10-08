import { expect, test } from "@playwright/test"

// Intentionally unmocked: exercises the configured loader, real crops and CDN.
test("Cloudinary delivers the hero, a thumbnail and an expanded photo", async ({ page }) => {
  test.setTimeout(60_000)
  await page.goto("/")
  const hero = page.locator("picture img")
  await expect.poll(() => hero.evaluate((img: HTMLImageElement) => img.naturalWidth), { timeout: 20_000 }).toBeGreaterThan(0)
  const heroSource = await hero.evaluate((img: HTMLImageElement) => img.currentSrc)
  expect(heroSource).toMatch(/^https:\/\/res\.cloudinary\.com\/dnwbkkjpo\/image\/upload\//)

  await page.getByRole("navigation", { name: "Portfolio categories" }).getByRole("link", { name: "Fashion" }).click()
  const thumbnail = page.getByRole("link", { name: "View Mustard purse larger", exact: true }).first()
  await expect.poll(() => thumbnail.locator("img").evaluate((img: HTMLImageElement) => img.naturalWidth), { timeout: 20_000 }).toBeGreaterThan(0)
  await thumbnail.click()
  const photo = page.getByRole("dialog").getByRole("img", { name: "Mustard purse", exact: true })
  await expect(photo).toBeVisible({ timeout: 20_000 })
  expect(await photo.evaluate((img: HTMLImageElement) => img.naturalWidth)).toBeGreaterThan(0)
})
