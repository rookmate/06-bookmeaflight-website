"use client"

import { useCallback, useEffect, useRef, useState } from "react"
import ProgressiveImage from "./ProgressiveImage"
import {
    getTotalBatches,
    getVisibleImages,
    shouldAutoLoadMore
} from "../../lib/gallery.mjs"

const LOAD_AHEAD_OFFSET = 240

interface ImageChapterProps {
    images: {
        src: string
        alt: string
    }[]
    criticalImageCount?: number
    batchSize?: number
}

export default function ProgressiveImageChapter({
    images,
    criticalImageCount = 10,
    batchSize = 20
}: ImageChapterProps) {
    const [loadedBatches, setLoadedBatches] = useState(0)
    const [isLoadingMore, setIsLoadingMore] = useState(false)
    const loadedBatchesRef = useRef(0)
    const isLoadingMoreRef = useRef(false)
    const loadMoreTriggerRef = useRef<HTMLDivElement>(null)
    const releaseLoadingFrameRef = useRef<number | null>(null)

    const progressiveImages = images.slice(criticalImageCount)
    const totalBatches = getTotalBatches(images.length, criticalImageCount, batchSize)
    const visibleImages = getVisibleImages(images, criticalImageCount, loadedBatches, batchSize)
    const hasMoreImages = loadedBatches < totalBatches
    const remainingImages = Math.max(0, progressiveImages.length - (loadedBatches * batchSize))

    useEffect(() => {
        loadedBatchesRef.current = loadedBatches
    }, [loadedBatches])

    const releaseLoadingState = useCallback(() => {
        if (releaseLoadingFrameRef.current !== null) {
            window.cancelAnimationFrame(releaseLoadingFrameRef.current)
        }

        releaseLoadingFrameRef.current = window.requestAnimationFrame(() => {
            isLoadingMoreRef.current = false
            setIsLoadingMore(false)
            releaseLoadingFrameRef.current = null
        })
    }, [])

    const loadMoreImages = useCallback(() => {
        if (loadedBatchesRef.current < totalBatches && !isLoadingMoreRef.current) {
            isLoadingMoreRef.current = true
            setIsLoadingMore(true)

            setLoadedBatches(prev => {
                const nextLoadedBatches = Math.min(prev + 1, totalBatches)
                loadedBatchesRef.current = nextLoadedBatches
                return nextLoadedBatches
            })

            releaseLoadingState()
        }
    }, [releaseLoadingState, totalBatches])

    useEffect(() => {
        return () => {
            if (releaseLoadingFrameRef.current !== null) {
                window.cancelAnimationFrame(releaseLoadingFrameRef.current)
            }
        }
    }, [])

    const maybeLoadMoreImages = useCallback(() => {
        const triggerTop = loadMoreTriggerRef.current?.getBoundingClientRect().top ?? Number.POSITIVE_INFINITY

        if (shouldAutoLoadMore(triggerTop, window.innerHeight, LOAD_AHEAD_OFFSET)) {
            loadMoreImages()
        }
    }, [loadMoreImages])

    useEffect(() => {
        if (!hasMoreImages || !loadMoreTriggerRef.current) {
            return
        }

        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    loadMoreImages()
                }
            },
            {
                rootMargin: `0px 0px ${LOAD_AHEAD_OFFSET}px 0px`
            }
        )

        observer.observe(loadMoreTriggerRef.current)
        return () => observer.disconnect()
    }, [hasMoreImages, loadMoreImages, visibleImages.length])

    useEffect(() => {
        if (!hasMoreImages) {
            return
        }

        const frameId = window.requestAnimationFrame(maybeLoadMoreImages)
        const handleResize = () => {
            maybeLoadMoreImages()
        }

        window.addEventListener("resize", handleResize)

        return () => {
            window.cancelAnimationFrame(frameId)
            window.removeEventListener("resize", handleResize)
        }
    }, [hasMoreImages, maybeLoadMoreImages, visibleImages.length])

    return (
        <div className="container mx-auto px-4 py-8">
            <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4">
                {visibleImages.map((image, index) => (
                    <ProgressiveImage
                        key={`${image.src}-${index}`}
                        src={image.src}
                        alt={image.alt}
                        priority={index < criticalImageCount}
                    />
                ))}
            </div>

            {hasMoreImages && (
                <div className="mt-8 flex flex-col items-center gap-3">
                    <div
                        ref={loadMoreTriggerRef}
                        aria-hidden="true"
                        className="h-px w-full"
                    />
                    <button
                        type="button"
                        onClick={loadMoreImages}
                        disabled={isLoadingMore}
                        className="px-6 py-3 bg-gray-800 text-white rounded-lg hover:bg-gray-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                    >
                        {isLoadingMore ? (
                            <div className="flex items-center gap-2">
                                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                                Loading more images...
                            </div>
                        ) : (
                            `Load More Images (${remainingImages} remaining)`
                        )}
                    </button>
                </div>
            )}
        </div>
    )
}
