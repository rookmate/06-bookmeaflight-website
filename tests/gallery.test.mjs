import test from "node:test";
import assert from "node:assert/strict";
import {
  getTotalBatches,
  getVisibleImages,
  shouldAutoLoadMore
} from "../lib/gallery.mjs";

test("getTotalBatches returns expected batch count", () => {
  assert.equal(getTotalBatches(40, 10, 15), 2);
  assert.equal(getTotalBatches(10, 10, 15), 0);
  assert.equal(getTotalBatches(25, 0, 10), 3);
});

test("getVisibleImages includes critical plus progressive batches", () => {
  const images = Array.from({ length: 12 }, (_, index) => ({
    src: `img-${index}`,
    alt: `Image ${index}`
  }));

  const visible = getVisibleImages(images, 4, 2, 3);
  assert.equal(visible.length, 10);
  assert.deepEqual(
    visible.map((image) => image.src),
    ["img-0", "img-1", "img-2", "img-3", "img-4", "img-5", "img-6", "img-7", "img-8", "img-9"]
  );
});

test("shouldAutoLoadMore respects threshold", () => {
  assert.equal(shouldAutoLoadMore(650, 300, 1200), false);
  assert.equal(shouldAutoLoadMore(700, 300, 1200, 0.75), true);
  assert.equal(shouldAutoLoadMore(0, 0, 0), false);
});
