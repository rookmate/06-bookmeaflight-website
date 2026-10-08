import assert from "node:assert/strict"
import { readFile } from "node:fs/promises"
import test from "node:test"
import { gzipSync } from "node:zlib"

// No-JS images stay in the HTML; the hydrated gallery admits nearby thumbnails.
const routes = [
  {
    pathname: "/",
    file: "index.html",
    // The hero, three covers, and 85 gallery photos.
    imageCount: 89,
    lazyImageCount: 88,
    eagerImageCount: 1,
    highPriorityImageCount: 1,
    preloadCount: 0,
    lightboxTriggerCount: 85,
    boundedImageCount: 88,
  },
]

function countMatches(source, pattern) {
  return source.match(pattern)?.length ?? 0
}

for (const route of routes) {
  test(`${route.pathname} has the expected static structure`, async () => {
    const outputPath = new URL(
      `../.next/server/app/${route.file}`,
      import.meta.url,
    )
    const html = await readFile(outputPath, "utf8")

    assert.equal(countMatches(html, /<main(?:\s|>)/g), 1)
    assert.equal(
      countMatches(
        html,
        /<main(?=[^>]*\bid="main-content")(?=[^>]*\btabindex="-1")[^>]*>/g,
      ),
      1,
    )
    assert.equal(countMatches(html, /<h1(?:\s|>)/g), 1)
    assert.equal(countMatches(html, /<img(?:\s|>)/g), route.imageCount)
    assert.equal(
      countMatches(html, /\bloading="eager"/g),
      route.eagerImageCount,
    )
    assert.equal(
      countMatches(html, /\bloading="lazy"/g),
      route.lazyImageCount,
    )
    assert.equal(
      countMatches(html, /\bfetchPriority="high"/gi),
      route.highPriorityImageCount,
    )
    assert.equal(
      countMatches(
        html,
        /<link(?=[^>]*\brel="preload")(?=[^>]*\bas="image")[^>]*>/g,
      ),
      route.preloadCount,
    )
    assert.equal(countMatches(html, /\bhref="#main-content"/g), 1)
    assert.equal(
      countMatches(html, /\baria-label="View [^"]+ larger"/g),
      route.lightboxTriggerCount,
    )
    assert.equal(
      countMatches(
        html,
        /<nav(?=[^>]*\baria-label="Primary"(?:\s|>))[^>]*>/g,
      ),
      1,
    )
    assert.doesNotMatch(html, /\/_next\/image\?/)
    assert.doesNotMatch(html, /c_limit,w_(?:1920|2048|3840),/)

    const imageTags = html.match(/<img(?:\s|>)[^>]*>/g) ?? []
    assert.equal(
      imageTags.filter((tag) => tag.includes("res.cloudinary.com/dnwbkkjpo/image/upload/") && tag.includes("c_limit,w_")).length,
      route.boundedImageCount,
    )

    assert.doesNotMatch(html, /Load More Images/)
    assert.doesNotMatch(html, /<img[^>]*opacity-0/)

    const canonical = `https://www.bookmeaflight.eu${route.pathname === "/" ? "" : route.pathname}`
    assert.ok(html.includes(`<link rel="canonical" href="${canonical}"`))
    assert.match(html, /property="og:image" content="https:\/\/res\.cloudinary\.com\//)
    assert.match(html, /property="og:image:width" content="1200"/)
    assert.match(html, /name="twitter:card" content="summary_large_image"/)
  })
}

test("homepage has the expected portfolio navigation hierarchy", async () => {
  const outputPath = new URL("../.next/server/app/index.html", import.meta.url)
  const html = await readFile(outputPath, "utf8")

  assert.equal(
    countMatches(
      html,
      /<nav(?=[^>]*\baria-label="Portfolio categories"(?:\s|>))[^>]*>/g,
    ),
    1,
  )
  assert.equal(countMatches(html, /<picture(?:\s|>)/g), 1)
  assert.equal(countMatches(html, /<source(?:\s|>)/g), 6)
  assert.equal(
    countMatches(
      html,
      /<source(?=[^>]*\bmedia="\(orientation: landscape\), \(min-width: 768px\)")[^>]*>/g,
    ),
    3,
  )
  assert.equal(
    countMatches(html, /<source(?=[^>]*\bsrcSet=)(?![^>]*\bmedia=)[^>]*>/g),
    3,
  )
  assert.equal(countMatches(html, /<source[^>]*type="image\/avif"/g), 2)
  assert.equal(countMatches(html, /<source[^>]*type="image\/jxl"/g), 2)
  assert.equal(countMatches(html, /<noscript><img\b/g), 85)
  assert.equal(countMatches(html, /<h2(?:\s|>)/g), 3)
  assert.equal(countMatches(html, /<h3(?:\s|>)/g), 0)
})

test("category covers link to their gallery and the header to the same sections", async () => {
  const html = await readFile(new URL("../.next/server/app/index.html", import.meta.url), "utf8")
  for (const id of ["hospitality", "fashion", "dining"]) {
    assert.equal(countMatches(html, new RegExp(`<a(?=[^>]*\\bid="${id}-cover")(?=[^>]*\\bhref="#${id}")[^>]*>`, "g")), 1)
    assert.equal(countMatches(html, new RegExp(`\\bhref="/#${id}"`, "g")), 1)
  }
})

test("old category URLs redirect to their gallery", async () => {
  const manifest = JSON.parse(await readFile(new URL("../.next/routes-manifest.json", import.meta.url), "utf8"))
  const redirects = Object.fromEntries(manifest.redirects.map((redirect) => [redirect.source, redirect]))
  for (const [source, id] of [
    ["/hospitality", "hospitality"],
    ["/hotels", "hospitality"],
    ["/fashion", "fashion"],
    ["/brands", "fashion"],
    ["/dining", "dining"],
    ["/restaurants", "dining"],
  ]) {
    assert.equal(redirects[source]?.destination, `/#${id}`)
    assert.equal(redirects[source]?.statusCode, 308)
  }
})

test("sitemap lists canonical portfolio URLs and robots points to it", async () => {
  const sitemap = await readFile(new URL("../.next/server/app/sitemap.xml.body", import.meta.url), "utf8")
  const robots = await readFile(new URL("../.next/server/app/robots.txt.body", import.meta.url), "utf8")
  assert.equal(countMatches(sitemap, /<loc>/g), routes.length)
  for (const route of routes) {
    assert.ok(sitemap.includes(`<loc>https://www.bookmeaflight.eu${route.pathname}</loc>`))
  }
  assert.match(robots, /Sitemap: https:\/\/www\.bookmeaflight\.eu\/sitemap\.xml/)
})

test("production routes stay within compressed document and asset budgets", async () => {
  const budgets = {
    // Includes original photo dimensions, AVIF sources and the no-JS fallback.
    html: 18_000,
    javascript: 190_000,
    css: 6_000,
  }

  for (const route of routes) {
    const outputPath = new URL(
      `../.next/server/app/${route.file}`,
      import.meta.url,
    )
    const html = await readFile(outputPath, "utf8")
    const assetPaths = [
      ...html.matchAll(
        /(?:src|href)="(\/_next\/static\/[^"?]+\.(?:js|css))(?:\?[^"]*)?"/g,
      ),
    ].map((match) => match[1])

    const uniqueAssetPaths = [...new Set(assetPaths)]
    let javascriptBytes = 0
    let cssBytes = 0

    for (const assetPath of uniqueAssetPaths) {
      const assetUrl = new URL(
        `../.next/${assetPath.slice("/_next/".length)}`,
        import.meta.url,
      )
      const compressedBytes = gzipSync(await readFile(assetUrl)).byteLength

      if (assetPath.endsWith(".js")) {
        javascriptBytes += compressedBytes
      } else {
        cssBytes += compressedBytes
      }
    }

    assert.ok(
      gzipSync(html).byteLength <= budgets.html,
      `${route.pathname} HTML exceeds ${budgets.html} compressed bytes`,
    )
    assert.ok(
      javascriptBytes <= budgets.javascript,
      `${route.pathname} JavaScript exceeds ${budgets.javascript} compressed bytes`,
    )
    assert.ok(
      cssBytes <= budgets.css,
      `${route.pathname} CSS exceeds ${budgets.css} compressed bytes`,
    )
  }
})
