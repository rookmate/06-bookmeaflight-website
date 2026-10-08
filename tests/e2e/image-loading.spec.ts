import { expect, test } from "@playwright/test"
import { hospitalityImages } from "../../app/galleryImages"

// Request scheduling is deterministic and does not need a live CDN.
test.beforeEach(async ({ page }) => {
  await page.route(/https:\/\/res\.cloudinary\.com\//, (route) => route.fulfill({
    contentType: "image/svg+xml",
    body: '<svg xmlns="http://www.w3.org/2000/svg" width="512" height="512"/>',
  }))
})

for (const entry of ["direct link", "category click"] as const) {
  test(`${entry} loads only nearby photos and scrolling loads the rest`, async ({ page }, testInfo) => {
    const requested = new Set<string>()
    page.on("request", (request) => {
      const url = request.url()
      if (url.includes("cloudinary.com") && url.includes("c_fill,")) requested.add(url)
    })
    await page.goto(entry === "direct link" ? "/#hospitality" : "/")
    if (entry === "category click") await page.locator("#hospitality-cover").click()
    await expect.poll(() => page.locator("#hospitality-cover").evaluate((e) => Math.abs(e.getBoundingClientRect().top - 64))).toBeLessThanOrEqual(1)
    await page.waitForLoadState("networkidle")
    const initialCount = requested.size
    expect(initialCount).toBeGreaterThan(0)
    expect(initialCount).toBeLessThanOrEqual(25)
    const last = page.locator('#hospitality a[aria-haspopup="dialog"]').last()
    await expect(last.locator("img")).toHaveCount(0)
    expect([...requested].some((url) => url.endsWith(hospitalityImages.at(-1)!.src))).toBe(false)

    await last.scrollIntoViewIfNeeded()
    await expect.poll(() => last.locator("img").evaluate((img: HTMLImageElement) => img.naturalWidth)).toBeGreaterThan(0)
    expect(requested.size).toBeGreaterThan(initialCount)
    await testInfo.attach("gallery-request-count", {
      body: JSON.stringify({ entry, initialCount, afterScroll: requested.size }), contentType: "application/json",
    })
  })
}

test.describe("wide high-density desktop", () => {
  test.use({ viewport: { width: 1536, height: 900 }, deviceScaleFactor: 2, isMobile: false, hasTouch: false })

  test("thumbnail sources match their displayed size and the hover preload", async ({ page }) => {
    const requested: string[] = []
    page.on("request", (request) => {
      if (request.url().includes("c_fill,") && request.url().endsWith(hospitalityImages[0].src)) requested.push(request.url())
    })
    await page.goto("/")
    const cover = page.locator("#hospitality-cover")
    await cover.hover()
    await expect(page.locator('link[rel="preload"][as="image"]')).toHaveCount(5)
    await page.waitForLoadState("networkidle")
    await cover.click()
    const photo = page.locator('#hospitality a[aria-haspopup="dialog"] img').first()
    await expect.poll(() => photo.evaluate((img: HTMLImageElement) => img.naturalWidth)).toBeGreaterThan(0)
    const dimensions = await photo.evaluate((img: HTMLImageElement) => ({ width: img.getBoundingClientRect().width, src: img.currentSrc }))
    expect(dimensions.width).toBeCloseTo(201.6, 0)
    expect(dimensions.src).toContain("c_fill,w_512,h_512,g_center/")
    // Routing disables HTTP caching in Playwright; WebKit may re-request a preload.
    // Both paths must select exactly the same responsive candidate.
    expect([...new Set(requested)]).toEqual([dimensions.src])
  })
})

test("an uncached lightbox photo starts at full size without waiting for its preview", async ({ page }) => {
  const last = hospitalityImages.at(-1)!
  // Never complete the preview. Full image delivery must be independent of it.
  await page.route((url) => url.pathname.includes("c_fill,") && url.pathname.endsWith(last.src), () => {})
  await page.goto("/#hospitality")
  await page.locator('#hospitality a[aria-haspopup="dialog"]').first().click()
  const fullRequest = page.waitForRequest((request) => request.url().endsWith(last.src) && !request.url().includes("c_fill,"))
  await page.getByRole("button", { name: "Previous image" }).click()
  await fullRequest
  const photo = page.getByRole("dialog").getByRole("img", { name: last.alt, exact: true })
  await expect(photo).toBeVisible()
  const bounds = (await photo.boundingBox())!
  expect(bounds.width / bounds.height).toBeCloseTo(last.width / last.height, 2)
})
