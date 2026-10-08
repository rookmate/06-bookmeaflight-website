import { expect, test } from "@playwright/test"
import type { Page, TestInfo } from "@playwright/test"

function imageTransfers(page: Page) {
  const transfers: Promise<{ url: string; bytes: number; contentType: string | undefined }>[] = []
  page.on("response", (response) => {
    if (response.request().resourceType() !== "image" || !response.url().includes("res.cloudinary.com/")) return
    transfers.push((async () => {
      expect(response.status(), response.url()).toBe(200)
      return { url: response.url(), bytes: (await response.body()).byteLength, contentType: response.headers()["content-type"] }
    })())
  })
  return async () => Promise.all(transfers)
}

async function checkHomepageBudget(page: Page, testInfo: TestInfo) {
  test.setTimeout(60_000)
  const collect = imageTransfers(page)
  await page.goto("/", { waitUntil: "networkidle" })
  const transfers = await collect()
  await testInfo.attach("homepage-image-bytes", { body: JSON.stringify(transfers, null, 2), contentType: "application/json" })
  const hero = transfers.find((image) => /homepage3[af]\.jpg$/.test(image.url))!
  expect(hero.bytes).toBeLessThanOrEqual(250_000)
  expect(["image/avif", "image/jxl"]).toContain(hero.contentType)
  expect(transfers).toHaveLength(4)
  expect(transfers.reduce((sum, image) => sum + image.bytes, 0)).toBeLessThanOrEqual(350_000)
}

test("homepage image bytes stay within budget", async ({ page }, testInfo) => {
  await checkHomepageBudget(page, testInfo)
})

test.describe("high-density phone", () => {
  test.use({ viewport: { width: 390, height: 844 }, deviceScaleFactor: 3, isMobile: true, hasTouch: true })

  test("3x phone hero and homepage stay within the image byte budgets", async ({ page }, testInfo) => {
    await checkHomepageBudget(page, testInfo)
  })
})

test.describe("wide high-density desktop image budget", () => {
  test.use({ viewport: { width: 1536, height: 900 }, deviceScaleFactor: 2, isMobile: false, hasTouch: false })

  test("direct gallery entry stays below the thumbnail request and byte budgets", async ({ page }, testInfo) => {
    test.setTimeout(90_000)
    const collect = imageTransfers(page)
    await page.goto("/#hospitality", { waitUntil: "networkidle" })
    const homepageSources = await page.locator('picture img, nav[aria-label="Portfolio categories"] img')
      .evaluateAll((images) => images.map((image) => (image as HTMLImageElement).currentSrc))
    const transfers = (await collect()).filter((image) => !homepageSources.includes(image.url))
    await testInfo.attach("gallery-image-bytes", { body: JSON.stringify(transfers, null, 2), contentType: "application/json" })
    expect(transfers.length).toBeGreaterThan(0)
    expect(transfers.length).toBeLessThanOrEqual(25)
    expect(transfers.reduce((sum, image) => sum + image.bytes, 0)).toBeLessThanOrEqual(1_250_000)
    const first = transfers.find((image) => image.url.endsWith("kanz-pool-room.jpg"))!
    expect(first.url).toContain("c_fill,w_512,h_512,g_center/")
    expect(first.bytes).toBeLessThanOrEqual(75_000)
    const photo = page.locator('#hospitality a[aria-haspopup="dialog"] img').first()
    const ratio = await photo.evaluate((img: HTMLImageElement) => img.naturalWidth / img.naturalHeight)
    expect(ratio).toBe(1)
  })
})

// Intentionally unmocked: exercises the configured loader, real crops and CDN.
test("Cloudinary delivers the hero, a thumbnail and an expanded photo", async ({ page }, testInfo) => {
  test.setTimeout(60_000)
  await page.goto("/")
  const hero = page.locator("picture img")
  await expect.poll(() => hero.evaluate((img: HTMLImageElement) => img.naturalWidth), { timeout: 20_000 }).toBeGreaterThan(0)
  const heroSource = await hero.evaluate((img: HTMLImageElement) => img.currentSrc)
  expect(heroSource).toMatch(/^https:\/\/res\.cloudinary\.com\/dnwbkkjpo\/image\/upload\//)
  await page.waitForLoadState("networkidle")
  await testInfo.attach("homepage", { body: await page.screenshot({ fullPage: true }), contentType: "image/png" })

  await page.getByRole("navigation", { name: "Portfolio categories" }).getByRole("link", { name: "Fashion" }).click()
  const thumbnail = page.getByRole("link", { name: "View Mustard purse larger", exact: true }).first()
  await expect.poll(() => thumbnail.locator("img").evaluate((img: HTMLImageElement) => img.naturalWidth), { timeout: 20_000 }).toBeGreaterThan(0)
  await expect.poll(() => page.locator("#fashion-cover").evaluate((e) => Math.abs(e.getBoundingClientRect().top - 64))).toBeLessThanOrEqual(1)
  await expect.poll(() => page.locator('#fashion a[aria-haspopup="dialog"]').evaluateAll((links) => links.every((link) => {
    const rect = link.getBoundingClientRect()
    if (rect.top >= innerHeight || rect.bottom <= 0) return true
    const image = link.querySelector("img")
    return image?.complete && image.naturalWidth > 0
  })), { timeout: 20_000 }).toBe(true)
  await testInfo.attach("gallery", { body: await page.screenshot(), contentType: "image/png" })
  await thumbnail.click()
  const photo = page.getByRole("dialog").getByRole("img", { name: "Mustard purse", exact: true })
  await expect(photo).toBeVisible({ timeout: 20_000 })
  expect(await photo.evaluate((img: HTMLImageElement) => img.naturalWidth)).toBeGreaterThan(0)
  const proportions = await photo.evaluate((img: HTMLImageElement) => ({
    original: img.naturalWidth / img.naturalHeight,
    displayed: img.getBoundingClientRect().width / img.getBoundingClientRect().height,
  }))
  expect(proportions.displayed).toBeCloseTo(proportions.original, 2)
  await testInfo.attach("lightbox", { body: await page.screenshot(), contentType: "image/png" })
})
