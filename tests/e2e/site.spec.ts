import { expect, type Page, test } from "@playwright/test"
import { portfolioSections } from "../../app/portfolioSections"

// Keep interaction tests independent of Cloudinary availability.
// Full photos retain their real proportions; thumbnail delivery is square.
test.beforeEach(async ({ context }) => {
  await context.route(/https:\/\/res\.cloudinary\.com\//, async (route) => {
    const url = route.request().url()
    const image = portfolioSections.flatMap((section) => section.images).find((image) => url.endsWith(image.src))
    const square = url.includes("c_fill,")
    await route.fulfill({
      contentType: "image/svg+xml",
      body: `<svg xmlns="http://www.w3.org/2000/svg" width="${square ? 640 : image?.width ?? 640}" height="${square ? 640 : image?.height ?? 960}"><rect width="100%" height="100%" fill="#a8a29e"/></svg>`,
    })
  })
})

const thumbnails = (page: Page) => page.getByRole("link", { name: /^View .+ larger$/ })
const covers = (page: Page) => page.getByRole("navigation", { name: "Portfolio categories" })
// How far a cover photo is from resting at its 64px scroll margin under the header.
// Browsers round scroll positions to device pixels, so allow one CSS pixel.
const coverOffset = (page: Page, id: string) =>
  page.evaluate((id) => Math.abs(document.getElementById(`${id}-cover`)!.getBoundingClientRect().top - 64), id)

/** Opens the Fashion gallery from its cover photo on the one page. */
async function openFashion(page: Page) {
  await page.goto("/")
  await covers(page).getByRole("link", { name: "Fashion" }).click()
  await expect(thumbnails(page)).toHaveCount(10)
}

test("header links open each gallery on the one page at every viewport", async ({ page }) => {
  await page.goto("/")
  const primary = page.getByRole("navigation", { name: "Primary", exact: true })
  // One thin row at every viewport, with no category marked until a gallery opens.
  await expect(page.locator("header")).toHaveCSS("height", "45px")
  await expect(primary.locator("[aria-current]")).toHaveCount(0)
  await expect(thumbnails(page)).toHaveCount(0)
  for (const [title, count] of [["Hospitality", 45], ["Fashion", 10], ["Dining", 30]] as const) {
    await primary.getByRole("link", { name: title }).click()
    await expect(page).toHaveURL(new RegExp(`/#${title.toLowerCase()}$`))
    await expect(thumbnails(page)).toHaveCount(count)
    await expect(primary.locator("[aria-current]")).toHaveText(title)
    await expect(covers(page).getByRole("link", { name: title })).toHaveAttribute("aria-expanded", "true")
    await expect(page.getByRole("heading", { level: 1 })).toHaveCount(1)
    await expect(page.locator("header")).toHaveCSS("height", "45px")
    expect(await page.evaluate(() => document.documentElement.scrollWidth <= window.innerWidth)).toBe(true)
  }
})

test("a cover opens its gallery under the header, another replaces it, and the open one closes it", async ({ page }) => {
  await page.goto("/")
  const fashion = covers(page).getByRole("link", { name: "Fashion" })
  const dining = covers(page).getByRole("link", { name: "Dining" })
  const drawer = page.locator("#gallery-drawer")

  await fashion.click()
  await expect(thumbnails(page)).toHaveCount(10)
  // The row glides up under the header while the gallery opens beneath it.
  await expect.poll(() => coverOffset(page, "fashion")).toBeLessThanOrEqual(1)
  await expect(drawer).toHaveCSS("opacity", "1")

  await dining.click()
  await expect(thumbnails(page)).toHaveCount(30)
  await expect(fashion).toHaveAttribute("aria-expanded", "false")
  await expect.poll(() => coverOffset(page, "dining")).toBeLessThanOrEqual(1)

  await dining.click()
  await expect(page).toHaveURL(/\/$/)
  // The closed gallery collapses to nothing and its photos leave the tab order.
  await expect(thumbnails(page)).toHaveCount(0)
  await expect.poll(() => drawer.evaluate((element) => element.getBoundingClientRect().height)).toBe(0)

  await page.goBack()
  await expect(page).toHaveURL(/\/#fashion$/)
  await expect(thumbnails(page)).toHaveCount(10)
})

test("the footer sits as far below the category row as the hero sits above it", async ({ page }) => {
  await page.goto("/")
  const gaps = await page.evaluate(() => {
    const hero = document.querySelector("main > div section")!.getBoundingClientRect()
    const row = document.querySelector('nav[aria-label="Portfolio categories"]')!.getBoundingClientRect()
    const footer = document.querySelector("footer")!.getBoundingClientRect()
    return { above: Math.round(row.top - hero.bottom), below: Math.round(footer.top - row.bottom) }
  })
  expect(gaps.above).toBeGreaterThan(0)
  expect(gaps.below).toBe(gaps.above)
})

test("old category URLs land on their open gallery", async ({ page }) => {
  for (const [pathname, id, count] of [["/hospitality", "hospitality", 45], ["/brands", "fashion", 10], ["/dining", "dining", 30]] as const) {
    await page.goto(pathname)
    await expect(page).toHaveURL(new RegExp(`/#${id}$`))
    await expect(thumbnails(page)).toHaveCount(count)
  }
})

test.describe("with reduced motion", () => {
  test.use({ reducedMotion: "reduce" })

  test("a gallery opens and closes at once", async ({ page }) => {
    await openFashion(page)
    await expect(page.locator("#gallery-drawer")).toHaveCSS("transition-duration", "0s")
    expect(await coverOffset(page, "fashion")).toBeLessThanOrEqual(1)
    await covers(page).getByRole("link", { name: "Fashion" }).click()
    expect(await page.locator("#gallery-drawer").evaluate((element) => element.getBoundingClientRect().height)).toBe(0)
  })
})

test("keyboard opens, navigates, wraps, traps focus and restores the trigger", async ({ page }) => {
  await openFashion(page)
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
  await openFashion(page)
  await page.getByRole("link", { name: "View Mustard purse larger", exact: true }).first().click()
  const dialog = page.getByRole("dialog")
  await dialog.getByRole("button", { name: "Next image", exact: true }).click()
  await expect(dialog.getByRole("status")).toHaveText("Image 2 of 10")
  await dialog.getByRole("button", { name: "Previous image" }).click()
  await expect(dialog.getByRole("status")).toHaveText("Image 1 of 10")
  await dialog.getByRole("button", { name: "Close expanded image" }).click()
  await expect(dialog).toHaveCount(0)
  await expect(page).toHaveURL(/\/#fashion$/)
})

test("Back closes the lightbox and Forward reopens only the gallery", async ({ page }) => {
  await openFashion(page)
  await thumbnails(page).first().click()
  await expect(page.getByRole("dialog")).toBeVisible()
  await page.goBack()
  await expect(page).toHaveURL(/\/$/)
  await expect(page.getByRole("dialog")).toHaveCount(0)
  await expect(page.locator("html")).not.toHaveCSS("overflow", "hidden")
  await expect(page.locator("#gallery-drawer")).toHaveAttribute("inert", "")
  await page.goForward()
  await expect(thumbnails(page)).toHaveCount(10)
  await expect(page.getByRole("dialog")).toHaveCount(0)
  await thumbnails(page).first().click()
  await expect(page.getByRole("dialog")).toBeVisible()
})

test("the homepage does not download photos from hidden galleries", async ({ page }) => {
  const requestedImages = new Set<string>()
  page.on("request", (request) => {
    const url = new URL(request.url())
    if (url.hostname === "res.cloudinary.com") requestedImages.add(url.pathname.split("/").at(-1)!)
  })
  await page.goto("/", { waitUntil: "networkidle" })
  expect([...requestedImages]).toEqual(expect.arrayContaining([
    expect.stringMatching(/^homepage3[af]\.jpg$/),
  ]))
  expect([...requestedImages].every((name) => [
    "homepage3a.jpg", "homepage3f.jpg", "kanz-pool-room.jpg", "mp-mustard-purse.jpg", "coya-ceviche.jpg",
  ].includes(name))).toBe(true)
})

test("category focus prefetches only the first row without opening the gallery", async ({ page }) => {
  await page.goto("/")
  await covers(page).getByRole("link", { name: "Fashion" }).focus()
  const preloads = page.locator('link[rel="preload"][as="image"]')
  await expect(preloads).toHaveCount(5)
  await expect(thumbnails(page)).toHaveCount(0)
  await expect(page).toHaveURL(/\/$/)
  const sources = await preloads.evaluateAll((links) => links.map((link) => link.getAttribute("imagesrcset")))
  expect(sources.every((source) => source?.includes("res.cloudinary.com") && !source.includes("_next/image"))).toBe(true)
  await page.getByRole("navigation", { name: "Primary", exact: true }).getByRole("link", { name: "Fashion" }).focus()
  await expect(preloads).toHaveCount(5)
})

test("data saving disables speculative gallery requests", async ({ page }) => {
  await page.addInitScript(() => {
    Object.defineProperty(navigator, "connection", { configurable: true, value: { saveData: true } })
  })
  await page.goto("/")
  await covers(page).getByRole("link", { name: "Fashion" }).focus()
  await expect(page.locator('link[rel="preload"][as="image"]')).toHaveCount(0)
})

test("photo clicks keep the lightbox open and empty space dismisses it", async ({ page }) => {
  await openFashion(page)
  await page.getByRole("link", { name: "View Mustard purse larger", exact: true }).first().click()
  const dialog = page.getByRole("dialog")
  await dialog.getByRole("button", { name: "Next image", exact: true }).click()
  const photo = dialog.getByRole("img", { name: "Mustard purse", exact: true })
  await expect(photo).toBeVisible()
  await photo.click()
  await expect(dialog).toBeVisible()
  // Click beside the actual photograph, independently of its aspect ratio.
  const bounds = (await photo.boundingBox())!
  await page.mouse.click(bounds.x - 8, bounds.y + bounds.height / 2)
  await expect(dialog).toHaveCount(0)
})

test("thumbnail failures still allow opening the full-size image", async ({ page }) => {
  await page.route(/res\.cloudinary\.com\/.*c_fill,.*mp-mustard-purse\.jpg/, (route) => route.abort())
  await openFashion(page)
  const trigger = page.getByRole("link", { name: "View Mustard purse larger", exact: true }).first()
  await expect(trigger).toContainText("Image unavailable")
  await trigger.click()
  await expect(page.getByRole("dialog").getByRole("img", { name: "Mustard purse", exact: true })).toBeVisible()
})

test("failed full-size requests keep the preview and a direct link", async ({ page }) => {
  await page.route(/res\.cloudinary\.com\/.*c_limit,w_(?:1200|1600|2400),/, (route) => route.abort())
  await openFashion(page)
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
  await openFashion(page)
  await page.getByRole("link", { name: "View Mustard purse larger", exact: true }).first().click()
  const dialog = page.getByRole("dialog")
  await expect(dialog.getByText("Image unavailable.", { exact: false })).toBeVisible()
  await dialog.getByRole("button", { name: "Next image", exact: true }).click()
  await expect(dialog.getByRole("img", { name: "Mustard purse", exact: true })).toBeVisible()
  await expect(dialog.getByRole("status")).toHaveText("Image 2 of 10")
})

test("resizing an open lightbox keeps the image and controls within the viewport", async ({ page }) => {
  await openFashion(page)
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

  test("the hero and the three category covers still show", async ({ page }) => {
    await page.goto("/")
    await expect(page.getByRole("heading", { name: "Bookmeaflight", level: 1 })).toBeVisible()
    const photos = covers(page).locator("img")
    await expect(photos).toHaveCount(3)
    for (const photo of await photos.all()) {
      await expect(photo).toBeVisible()
      await expect.poll(() => photo.evaluate((img: HTMLImageElement) => img.naturalWidth)).toBeGreaterThan(0)
    }
  })

  test("category links reveal photos and direct image links without JavaScript", async ({ page }) => {
    await page.goto("/")
    await covers(page).getByRole("link", { name: "Fashion" }).click()
    await expect(thumbnails(page)).toHaveCount(10)
    const first = thumbnails(page).first()
    await expect(first).toHaveAttribute("href", /res\.cloudinary\.com\/.*w_2400,.*mp-mustard-purse\.jpg$/)
    await expect.poll(() => first.locator("img").evaluate((img: HTMLImageElement) => img.naturalWidth)).toBeGreaterThan(0)
    await page.getByRole("navigation", { name: "Primary", exact: true }).getByRole("link", { name: "Dining" }).click()
    await expect(thumbnails(page)).toHaveCount(30)
    await page.goBack()
    await expect(thumbnails(page)).toHaveCount(10)
  })

  test("an old category URL opens its gallery without JavaScript", async ({ page }) => {
    await page.goto("/hotels")
    await expect(page).toHaveURL(/\/#hospitality$/)
    await expect(thumbnails(page)).toHaveCount(45)
  })
})
