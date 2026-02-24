"use client"

import { useCallback, useEffect, useRef, useState } from "react"
import ProgressiveImage from "./ProgressiveImage"
import {
    getTotalBatches,
    getVisibleImages,
    shouldAutoLoadMore
} from "../../lib/gallery.mjs"

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
    const [loadedBatches, setLoadedBatches] = useState(1)
    const [isLoadingMore, setIsLoadingMore] = useState(false)
    const loadMoreTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null)

    const progressiveImages = images.slice(criticalImageCount)
    const totalBatches = getTotalBatches(images.length, criticalImageCount, batchSize)
    const visibleImages = getVisibleImages(images, criticalImageCount, loadedBatches, batchSize)

    const loadMoreImages = useCallback(() => {
        if (loadedBatches < totalBatches && !isLoadingMore) {
            setIsLoadingMore(true)

            if (loadMoreTimeoutRef.current) {
                clearTimeout(loadMoreTimeoutRef.current)
            }

            loadMoreTimeoutRef.current = setTimeout(() => {
                setLoadedBatches(prev => prev + 1)
                setIsLoadingMore(false)
                loadMoreTimeoutRef.current = null
            }, 300)
        }
    }, [isLoadingMore, loadedBatches, totalBatches])

    useEffect(() => {
        return () => {
            if (loadMoreTimeoutRef.current) {
                clearTimeout(loadMoreTimeoutRef.current)
            }
        }
    }, [])

    useEffect(() => {
        const handleScroll = () => {
            const scrollTop = window.pageYOffset || document.documentElement.scrollTop
            const windowHeight = window.innerHeight
            const documentHeight = document.documentElement.scrollHeight

            if (shouldAutoLoadMore(scrollTop, windowHeight, documentHeight)) {
                loadMoreImages()
            }
        }

        window.addEventListener('scroll', handleScroll, { passive: true })
        return () => window.removeEventListener('scroll', handleScroll)
    }, [loadMoreImages])

    return (
        <div className="container mx-auto px-4 py-8">
            {/* Image Grid */}
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

            {loadedBatches < totalBatches && (
                <div className="flex justify-center mt-8">
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
                            `Load More Images (${Math.max(0, progressiveImages.length - (loadedBatches * batchSize))} remaining)`
                        )}
                    </button>
                </div>
            )}
        </div>
    )
}
