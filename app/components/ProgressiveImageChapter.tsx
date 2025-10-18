"use client"

import { useState, useEffect } from "react"
import ProgressiveImage from "./ProgressiveImage"

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

    // Split images into critical and progressive batches
    const criticalImages = images.slice(0, criticalImageCount)
    const progressiveImages = images.slice(criticalImageCount)

    // Calculate how many batches to show
    const totalBatches = Math.ceil(progressiveImages.length / batchSize)
    const visibleImages = [
        ...criticalImages,
        ...progressiveImages.slice(0, loadedBatches * batchSize)
    ]

    const loadMoreImages = () => {
        if (loadedBatches < totalBatches && !isLoadingMore) {
            setIsLoadingMore(true)

            // Simulate a small delay for better UX
            setTimeout(() => {
                setLoadedBatches(prev => prev + 1)
                setIsLoadingMore(false)
            }, 300)
        }
    }

    // Auto-load more images when user scrolls near bottom
    useEffect(() => {
        const handleScroll = () => {
            const scrollTop = window.pageYOffset || document.documentElement.scrollTop
            const windowHeight = window.innerHeight
            const documentHeight = document.documentElement.scrollHeight

            // Load more when user is 80% down the page
            if (scrollTop + windowHeight >= documentHeight * 0.8) {
                loadMoreImages()
            }
        }

        window.addEventListener('scroll', handleScroll, { passive: true })
        return () => window.removeEventListener('scroll', handleScroll)
    }, [loadedBatches, totalBatches, isLoadingMore])

    return (
        <div className="container mx-auto px-4 py-8">
            {/* Image Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4">
                {visibleImages.map((image, index) => (
                    <ProgressiveImage
                        key={`${image.src}-${index}`}
                        src={image.src}
                        alt={image.alt}
                        priority={index < criticalImageCount} // First 10 images get priority
                    />
                ))}
            </div>

            {/* Load More Button (fallback for manual loading) */}
            {loadedBatches < totalBatches && (
                <div className="flex justify-center mt-8">
                    <button
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
                            `Load More Images (${progressiveImages.length - (loadedBatches * batchSize)} remaining)`
                        )}
                    </button>
                </div>
            )}
        </div>
    )
}
