import assert from "node:assert/strict"
import { readFile } from "node:fs/promises"
import test from "node:test"

const routes = [
  {
    pathname: "/",
    file: "index.html",
    imageCount: 3,
    lazyImageCount: 3,
    preloadCount: 0,
  },
  {
    pathname: "/hospitality",
    file: "hospitality.html",
    imageCount: 45,
    lazyImageCount: 44,
    preloadCount: 1,
  },
  {
    pathname: "/fashion",
    file: "fashion.html",
    imageCount: 10,
    lazyImageCount: 9,
    preloadCount: 1,
  },
  {
    pathname: "/dining",
    file: "dining.html",
    imageCount: 30,
    lazyImageCount: 29,
    preloadCount: 1,
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
      countMatches(html, /\bloading="lazy"/g),
      route.lazyImageCount,
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
      countMatches(
        html,
        /<nav(?=[^>]*\baria-label="Primary"(?:\s|>))[^>]*>/g,
      ),
      1,
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
  assert.equal(countMatches(html, /<h2(?:\s|>)/g), 3)
  assert.equal(countMatches(html, /<h3(?:\s|>)/g), 0)
})
