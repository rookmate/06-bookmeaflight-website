export function getTotalBatches(totalImages, criticalImageCount, batchSize) {
  const safeBatchSize = Math.max(1, batchSize);
  const safeCriticalCount = Math.max(0, criticalImageCount);
  const progressiveCount = Math.max(0, totalImages - safeCriticalCount);
  return Math.ceil(progressiveCount / safeBatchSize);
}

export function getVisibleImages(images, criticalImageCount, loadedBatches, batchSize) {
  const safeCriticalCount = Math.max(0, criticalImageCount);
  const safeBatchSize = Math.max(1, batchSize);
  const safeLoadedBatches = Math.max(0, loadedBatches);
  const criticalImages = images.slice(0, safeCriticalCount);
  const progressiveImages = images.slice(safeCriticalCount);

  return [
    ...criticalImages,
    ...progressiveImages.slice(0, safeLoadedBatches * safeBatchSize)
  ];
}

export function shouldAutoLoadMore(triggerTop, viewportHeight, preloadOffset = 240) {
  if (!Number.isFinite(triggerTop) || viewportHeight <= 0) {
    return false;
  }

  return triggerTop <= viewportHeight + preloadOffset;
}
