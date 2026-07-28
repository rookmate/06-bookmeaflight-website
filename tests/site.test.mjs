import assert from "node:assert/strict"
import { readFile } from "node:fs/promises"
import test from "node:test"
import { gzipSync } from "node:zlib"

const routes = [
  {
    pathname: "/",
    file: "index.html",
    imageCount: 4,
    lazyImageCount: 3,
    eagerImageCount: 1,
    highPriorityImageCount: 1,
    preloadCount: 0,
    lightboxTriggerCount: 0,
    boundedImageCount: 3,
  },
  {
    pathname: "/hospitality",
    file: "hospitality.html",
    imageCount: 45,
    lazyImageCount: 44,
    eagerImageCount: 0,
    highPriorityImageCount: 0,
    preloadCount: 1,
    lightboxTriggerCount: 45,
    boundedImageCount: 45,
  },
  {
    pathname: "/fashion",
    file: "fashion.html",
    imageCount: 10,
    lazyImageCount: 9,
    eagerImageCount: 0,
    highPriorityImageCount: 0,
    preloadCount: 1,
    lightboxTriggerCount: 10,
    boundedImageCount: 10,
  },
  {
    pathname: "/dining",
    file: "dining.html",
    imageCount: 30,
    lazyImageCount: 29,
    eagerImageCount: 0,
    highPriorityImageCount: 0,
    preloadCount: 1,
    lightboxTriggerCount: 30,
    boundedImageCount: 30,
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
    assert.doesNotMatch(html, /\bw=(?:1920|2048|3840)\b/)

    const imageTags = html.match(/<img(?:\s|>)[^>]*>/g) ?? []
    assert.equal(
      imageTags.filter((tag) => tag.includes("c_limit%2Cw_1200")).length,
      route.boundedImageCount,
    )

    assert.doesNotMatch(html, /Load More Images/)
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
  assert.equal(countMatches(html, /<source(?:\s|>)/g), 2)
  assert.equal(
    countMatches(
      html,
      /<source(?=[^>]*\bmedia="\(orientation: landscape\), \(min-width: 768px\)")[^>]*>/g,
    ),
    1,
  )
  assert.equal(
    countMatches(html, /<source(?=[^>]*\bsrcSet=)(?![^>]*\bmedia=)[^>]*>/g),
    1,
  )
  assert.equal(countMatches(html, /<h2(?:\s|>)/g), 3)
  assert.equal(countMatches(html, /<h3(?:\s|>)/g), 0)
})

test("production routes stay within compressed document and asset budgets", async () => {
  const budgets = {
    html: 15_000,
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
