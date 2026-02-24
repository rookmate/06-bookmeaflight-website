export function getTotalBatches(totalImages, criticalImageCount, batchSize) {
  const safeBatchSize = Math.max(1, batchSize);
  const safeCriticalCount = Math.max(0, criticalImageCount);
  const progressiveCount = Math.max(0, totalImages - safeCriticalCount);
  return Math.ceil(progressiveCount / safeBatchSize);
}

export function getVisibleImages(images, criticalImageCount, loadedBatches, batchSize) {
  const safeCriticalCount = Math.max(0, criticalImageCount);
  const safeBatchSize = Math.max(1, batchSize);
  const safeLoadedBatches = Math.max(1, loadedBatches);
  const criticalImages = images.slice(0, safeCriticalCount);
  const progressiveImages = images.slice(safeCriticalCount);

  return [
    ...criticalImages,
    ...progressiveImages.slice(0, safeLoadedBatches * safeBatchSize)
  ];
}

export function shouldAutoLoadMore(scrollTop, windowHeight, documentHeight, threshold = 0.8) {
  if (documentHeight <= 0) {
    return false;
  }

  return scrollTop + windowHeight >= documentHeight * threshold;
}
